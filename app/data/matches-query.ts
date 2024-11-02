import { SupabaseClient } from '@supabase/supabase-js'

export const getMatchedProfiles = async (supabase: SupabaseClient, searchParams: URLSearchParams, id: string) => {
  const queryGenderString = searchParams.get('gender')
  const queryAgeGroup = searchParams.get('age_group')

  const { data: currentUserProfile } = await supabase.from('profiles').select().eq('id', id).single()

  const personal_embedding = currentUserProfile?.personal_embedding
  const hobbies_embedding = currentUserProfile?.hobbies_embedding
  const work_embedding = currentUserProfile?.work_embedding
  const personality_embedding = currentUserProfile?.personality_embedding
  const entertainment_embedding = currentUserProfile?.entertainment_embedding
  const travel_embedding = currentUserProfile?.travel_embedding
  const food_embedding = currentUserProfile?.food_embedding

  const genderFilter = queryGenderString ? queryGenderString.split(',') : null // Converts 'male,female' to ['male', 'female']
  const ageGroupFilter = queryAgeGroup ? queryAgeGroup.split(',') : null // Converts 'male,female' to ['male', 'female']
  console.log({ queryGenderString }, { genderFilter })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: matchedProfiles, error } = await supabase.rpc('match_profiles', {
    user_id: user?.id,
    personal_query_embedding: personal_embedding,
    work_query_embedding: work_embedding,
    hobbies_query_embedding: hobbies_embedding,
    entertainment_query_embedding: entertainment_embedding,
    personality_query_embedding: personality_embedding,
    travel_query_embedding: travel_embedding,
    food_query_embedding: food_embedding,
    match_threshold: 0.78,
    match_count: 2,
    filter_gender: genderFilter, // This needs to be passed as an array (['male', 'female']) in JS
    filter_age_group: ageGroupFilter,
  })

  if (error) {
    console.error('Error fetching profiles:', error)
  }

  // returns ExtendedProfile not Profile type
  return matchedProfiles
}
