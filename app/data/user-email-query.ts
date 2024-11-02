import { SupabaseClient } from '@supabase/supabase-js'
import { UserType } from '~/types/types'

export async function getUserEmails(supabase: SupabaseClient, ids: string[]): Promise<UserType[]> {
  const { data: users, error: usersError } = await supabase.from('users').select().in('id', ids)

  if (usersError) {
    throw new Error(`Error fetching users: ${usersError.message}`)
  }

  return users
}
