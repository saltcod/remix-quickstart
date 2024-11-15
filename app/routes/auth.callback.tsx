import type { ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { createClient } from '~/utils/supabase.server'

export const loader = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  if (code) {
    const { supabase, headers } = createClient(request)
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      return redirect('/sign-in')
    }
    return redirect('/dashboard', {
      headers,
    })
  }
  return new Response('Authentication faild', {
    status: 400,
  })
}
