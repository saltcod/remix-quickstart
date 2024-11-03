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
      <div className="grid gap-4">
        {/* Test if CSS variables are being set */}
        <div
          className="p-4"
          style={{
            border: '1px solid red',
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
          }}
        >
          Direct CSS Variable Test
        </div>

        {/* Test Tailwind classes */}
        <div className="p-4 border border-red-500 bg-background text-foreground">Tailwind Classes Test</div>

        {/* Reference that we know works */}
        <div className="p-4 border border-red-500 bg-white dark:bg-black text-black dark:text-white">Working Reference</div>
      </div>

      <h2 className="font-medium text-xl mb-4">Next steps</h2>
      {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
    </div>
  )
}
