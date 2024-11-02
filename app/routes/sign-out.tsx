import type { ActionFunctionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { createClient } from '~/utils/supabase/.server/server'

export async function action({ request }: ActionFunctionArgs) {
  const { supabase, headers } = createClient(request)

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error(error)
    return json({ success: false, error: error.message }, { headers })
  }

  // Redirect to dashboard or home page after successful sign-in
  return redirect('/', { headers })
}
