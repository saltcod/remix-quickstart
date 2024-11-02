import { SupabaseClient } from '@supabase/supabase-js'

export const getProfiles = async (supabase: SupabaseClient, searchParams: URLSearchParams) => {
  const { age_group, kids, gender } = Object.fromEntries(searchParams)

  // note:
  // returns ExtendedProfile not Profile type
  let query = supabase
    .from('profiles')
    .select(
      'name, gender, age_group,country, kids, content, shows, work, pets, movies, music, books, hobbies, podcasts, travel, fitness, food, personality'
    )
    .limit(8)

  if (gender) {
    const genderValues = Array.isArray(gender) ? gender : gender.split(',')
    const genderFilter = genderValues.map((g) => `gender.eq.${g}`).join(',')
    query = query.or(genderFilter)
  }

  if (age_group) {
    const ageGroupValues = Array.isArray(age_group) ? age_group : age_group.split(',')
    const ageGroupFilter = ageGroupValues.map((g) => `age_group.eq.${g}`).join(',')
    query = query.or(ageGroupFilter)
  }

  if (kids) {
    const kidsValues = Array.isArray(kids) ? kids : kids.split(',')
    const kidsFilter = kidsValues.map((g) => `kids.eq.${g}`).join(',')
    query = query.or(kidsFilter)
  }

  const { data: profiles, error } = await query

  if (error) {
    console.error('Error fetching profiles:', error)
  }

  // returns ExtendedProfile not Profile type
  return profiles
}
