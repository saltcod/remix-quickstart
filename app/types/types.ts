import { Database } from './supabase'

export type ProfileType = Database['public']['Tables']['profiles']['Row']
export type ConnectionType = Database['public']['Tables']['connections']['Row']
export type UserType = Database['public']['Tables']['users']['Row']
export type Genders = Database['public']['Enums']['gender']
export type AgeGroups = Database['public']['Enums']['age_group']

export type ProfileTypeReduced = Pick<
  ProfileType,
  | 'id'
  | 'allow_connections'
  | 'name'
  | 'content'
  | 'gender'
  | 'age_group'
  | 'shows'
  | 'work'
  | 'kids'
  | 'pets'
  | 'movies'
  | 'music'
  | 'books'
  | 'hobbies'
  | 'podcasts'
  | 'travel'
  | 'fitness'
  | 'food'
  | 'personality'
>

export type ExtendedProfile = Partial<ProfileType> & {
  work_similarity?: number
  food_similarity?: number
  travel_similarity?: number
  entertainment_similarity?: number
  hobbies_similarity?: number
  personality_similarity?: number
  shows_similarity?: number
  movies_similarity?: number
  music_similarity?: number
  books_similarity?: number
  status?: 'pending' | 'ignore'
  connection_id?: string
  email?: string
}
