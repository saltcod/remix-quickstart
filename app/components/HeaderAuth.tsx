//import { signOutAction } from '@/app/actions'

import { Form, Link, useLoaderData } from '@remix-run/react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { hasEnvVars } from '~/utils/check-env-vars'
import { loader } from '~/root'

export default function AuthButton() {
  const data = useLoaderData<typeof loader>()
  const user = data ? data.user : null

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge variant={'default'} className="font-normal pointer-events-none">
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button asChild size="sm" variant={'outline'} disabled className="opacity-75 cursor-none pointer-events-none">
              <Link to="/sign-in">Sign in</Link>
            </Button>
            <Form action="/sign-out" method="post" className="flex items-center">
              <Button asChild size="sm" variant={'outline'} disabled className="opacity-75 cursor-none pointer-events-none">
                <Link to="/sign-in">Sign ouet</Link>
              </Button>
            </Form>
          </div>
        </div>
      </>
    )
  }
  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <Form action="/sign-out" method="post">
        <Button type="submit" variant={'outline'}>
          Sign out
        </Button>
      </Form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={'outline'}>
        <Link to="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={'default'}>
        <Link to="/sign-up">Sign up</Link>
      </Button>
    </div>
  )
}
