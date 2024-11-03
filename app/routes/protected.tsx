import type { LoaderFunctionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { InfoIcon } from 'lucide-react'
import FetchDataSteps from '~/components/tutorial/FetchDataSteps'
import { createClient } from '~/utils/supabase/.server/server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase } = createClient(request)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect to sign-in page if user is not authenticated
  if (!user) {
    return redirect('/sign-in')
  }

  return json({ user })
}

const ProtectedPage = () => {
  const { user } = useLoaderData<typeof loader>()
  return (
    <div className="flex-1 w-full flex flex-col gap-12 max-w-5xl mx-auto">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">{JSON.stringify(user, null, 2)}</pre>
      </div>
      <div>
        <h2 className="font-bold text-2xl mb-4">Next steps</h2>
        <FetchDataSteps />
      </div>
    </div>
  )
}

export default ProtectedPage