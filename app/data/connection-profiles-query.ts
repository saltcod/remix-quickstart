import { SupabaseClient } from '@supabase/supabase-js'
import { ProfileType, ProfileTypeReduced } from '~/types/types'

export async function getConnectionProfiles(supabase: SupabaseClient, ids: string[]): Promise<ProfileTypeReduced[]> {
  const fields = `id,
      allow_connections,
      name,
      content,
      gender,
      age_group,
      shows,
      work,
      kids,
      pets,
      movies,
      music,
      books,
      hobbies,
      podcasts,
      travel,
      fitness,
      food,
      personality`
  const { data: profiles, error: profilesError } = await supabase.from('profiles').select(fields).in('id', ids)

  if (profilesError) {
    throw new Error(`Error fetching profiles: ${profilesError.message}`)
  }

  return profiles
}
