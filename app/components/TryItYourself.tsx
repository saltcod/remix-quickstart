import { Button } from '@/components/ui/button'
import { createClient } from '~/utils/supabase/.server/server'

import Link from 'next/link'

export default async function TryItYourself() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return (
    <div className="my-32 text-center">
      <h2 className="small-heading text-center">Try it yourself</h2>
      <p className="mt-12">
        <Button asChild>
          <Link
            href={user ? `/profile/${user.id}/matches` : '/sign-in'}
            className="rounded-sm bg-cyan-50 px-4 py-2 transition-colors hover:bg-cyan-100"
          >
            Find your new best friend →
          </Link>
        </Button>
      </p>
    </div>
  )
}
