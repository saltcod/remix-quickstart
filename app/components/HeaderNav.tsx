import { Form, Link, NavLink, useLoaderData } from '@remix-run/react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { loader } from '~/root'
import { cn } from '~/utils/utils'

export default function HeaderNav() {
  const data = useLoaderData<typeof loader>()
  const { hasEnvVars } = useLoaderData<typeof loader>()
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
                <Link to="/sign-in">Sign out</Link>
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
      <NavLink
        to="/sign-in"
        className={({ isActive, isPending }) =>
          cn('transition-colors hover:underline', isPending ? 'pending' : isActive ? 'underline' : '')
        }
      >
        Sign in
      </NavLink>

      <NavLink
        to="/sign-up"
        className={({ isActive, isPending }) =>
          cn('transition-colors hover:underline', isPending ? 'pending' : isActive ? 'underline' : '')
        }
      >
        Sign up
      </NavLink>
    </div>
  )
}
