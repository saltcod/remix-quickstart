CREATE EXTENSION vector;

CREATE TYPE gender AS ENUM (
  'male',
  'female',
  'non-binary',
  'other',
  'prefer not to say'
);

CREATE TYPE age_group AS ENUM (
  'late teens',
  '20s',
  '30s',
  '40s',
  '50s',
  '60s',
  '70s',
  '80s',
  '90s',
  '100s'
);

CREATE TABLE profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  allow_connections boolean NOT NULL DEFAULT true,
  name text,
  content text,
  gender gender NOT NULL,
  age_group age_group NOT NULL,
  kids boolean,
  pets text,
  work text,
  shows text,
  movies text,
  music text,
  books text,
  hobbies text,
  podcasts text,
  travel text,
  fitness text,
  food text,
  personality text,
  country text,
  embedding vector(1536), -- all together
  personal_embedding vector(1536), -- age, gender, kids, pets
  work_embedding vector(1536), -- work
  hobbies_embedding vector(1536), -- hobbies, fitness
  entertainment_embedding vector(1536), -- shows, movies, music, books, podcasts, travel
  personality_embedding vector(1536), -- personality
  travel_embedding vector(1536), -- travel
  food_embedding vector(1536), -- food
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
  id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  email text UNIQUE
);

CREATE TABLE connections (
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id uuid,
  requestee_id uuid,
  status text,
  FOREIGN KEY (requester_id) REFERENCES users(id),
  FOREIGN KEY (requestee_id) REFERENCES users(id)
);

ALTER TABLE
  profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR
SELECT
  USING (true);

CREATE POLICY "Users can insert their own profiles" ON public.profiles FOR
INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles FOR
UPDATE
  USING (auth.uid() = id);

ALTER TABLE
  connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert connections" ON connections FOR
INSERT
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Connections profiles are viewable by everyone" ON connections FOR
SELECT
  USING (true);

CREATE POLICY "Users can update connections" ON connections FOR
UPDATE
  USING (auth.uid() = requestee_id);

CREATE POLICY "Users can delete connections" ON connections FOR DELETE USING (auth.uid() = requester_id);

-- automatically add new user to profiles and users tables
CREATE
OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger AS $$ BEGIN
INSERT INTO
  public.users (id, email)
VALUES
  (NEW.id, NEW.email);

INSERT INTO
  public.profiles (id, allow_connections, gender, age_group)
VALUES
  (NEW.id, true, 'prefer not to say', '20s');

RETURN NEW;

END;

$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER
INSERT
  ON auth.users FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- drop the function from the ui first
CREATE
OR REPLACE FUNCTION match_profiles (
  user_id uuid,
  personal_query_embedding vector(1536),
  work_query_embedding vector(1536),
  hobbies_query_embedding vector(1536),
  entertainment_query_embedding vector(1536),
  personality_query_embedding vector(1536),
  travel_query_embedding vector(1536),
  food_query_embedding vector(1536),
  match_threshold float,
  match_count int,
  filter_gender gender [] DEFAULT NULL,
  -- Allow filtering by multiple genders (array of enums)
  filter_age_group age_group [] DEFAULT NULL
) RETURNS TABLE (
  id uuid,
  allow_connections boolean,
  name text,
  content text,
  gender gender,
  age_group age_group,
  kids boolean,
  pets text,
  work text,
  country text,
  hobbies text,
  shows text,
  movies text,
  music text,
  books text,
  podcasts text,
  travel text,
  fitness text,
  food text,
  personality text,
  personal_similarity float,
  work_similarity float,
  hobbies_similarity float,
  entertainment_similarity float,
  personality_similarity float,
  travel_similarity float,
  food_similarity float,
  created_at timestamptz,
  updated_at timestamptz
) LANGUAGE sql STABLE AS $$
SELECT
  profiles.id,
  profiles.allow_connections,
  profiles.name,
  profiles.content,
  profiles.gender,
  profiles.age_group,
  profiles.kids,
  profiles.pets,
  profiles.work,
  profiles.country,
  profiles.hobbies,
  profiles.shows,
  profiles.movies,
  profiles.music,
  profiles.books,
  profiles.podcasts,
  profiles.travel,
  profiles.fitness,
  profiles.food,
  profiles.personality,
  1 - (
    profiles.personal_embedding <=> personal_query_embedding
  ) AS personal_similarity,
  1 - (profiles.work_embedding <=> work_query_embedding) AS work_similarity,
  1 - (
    profiles.hobbies_embedding <=> hobbies_query_embedding
  ) AS hobbies_similarity,
  1 - (
    profiles.entertainment_embedding <=> entertainment_query_embedding
  ) AS entertainment_similarity,
  1 - (
    profiles.personality_embedding <=> personality_query_embedding
  ) AS personality_similarity,
  1 - (
    profiles.travel_embedding <=> travel_query_embedding
  ) AS travel_similarity,
  1 - (profiles.food_embedding <=> food_query_embedding) AS food_similarity,
  profiles.created_at,
  profiles.updated_at
FROM
  profiles
  LEFT JOIN connections ON (
    (
      profiles.id = connections.requester_id
      AND connections.requestee_id = user_id
    )
    OR (
      profiles.id = connections.requestee_id
      AND connections.requester_id = user_id
    )
  )
WHERE
  1 - (
    profiles.personal_embedding <=> personal_query_embedding
  ) > match_threshold
  AND 1 - (profiles.work_embedding <=> work_query_embedding) > match_threshold
  AND 1 - (
    profiles.hobbies_embedding <=> hobbies_query_embedding
  ) > match_threshold
  AND 1 - (
    profiles.entertainment_embedding <=> entertainment_query_embedding
  ) > match_threshold
  AND 1 - (
    profiles.personality_embedding <=> personality_query_embedding
  ) > match_threshold
  AND profiles.id != user_id
  AND connections.id IS NULL -- Apply gender filter only if filter_gender is not NULL
  AND (
    filter_gender IS NULL
    OR profiles.gender = ANY(filter_gender) -- Check if gender matches any value in the array
  ) -- Apply age group filter only if filter_age_group is not NULL
  AND (
    filter_age_group IS NULL
    OR profiles.age_group = filter_age_group
  )
ORDER BY
  personal_similarity DESC,
  work_similarity DESC,
  hobbies_similarity DESC,
  entertainment_similarity DESC,
  personality_similarity DESC
LIMIT
  match_count;

$$;
-- create a view to grab a random user
CREATE
OR REPLACE FUNCTION get_random_profile() RETURNS TABLE (
  id uuid,
  content text,
  embedding vector(1536)
) LANGUAGE sql STABLE AS $$
SELECT
  id,
  content,
  embedding
FROM
  profiles
ORDER BY
  random()
LIMIT
  1;

$$;