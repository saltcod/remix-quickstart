import { SupabaseClient } from '@supabase/supabase-js'

export const getConnections = async (supabase: SupabaseClient, id: string) => {
  const { data: connections, error } = await supabase.from('connections').select().or(`requestee_id.eq.${id}, requester_id.eq.${id}`)

  if (error) {
    console.error('Error fetching profiles:', error)
  }
  return connections || []
}
