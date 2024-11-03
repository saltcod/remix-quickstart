import Hero from '~/components/Hero'

import { useLoaderData } from '@remix-run/react'
import SignUpUserSteps from '~/components/tutorial/SignUpUserSteps'
import ConnectSupabaseSteps from '~/components/tutorial/ConnectSupabaseSteps'
import { json } from '@remix-run/node'

export async function loader() {
  const hasEnvVars = !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY)
  return json({ hasEnvVars })
}

export default function Index() {
  const { hasEnvVars } = useLoaderData<typeof loader>()

  return (
    <div className="p-5">
      <Hero />

      <h2 className="font-medium text-xl mb-4">Next steps</h2>
      {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
    </div>
  )
}
