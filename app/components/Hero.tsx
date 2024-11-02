import { ArrowRightIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Link, useLocation } from '@remix-run/react'
import Header from './Header'
import { User } from '@supabase/supabase-js'

interface HeroProps {
  user: User | null
}
export default function Hero({ user }: HeroProps) {
  const location = useLocation()
  return (
    <>
      <Header user={user} />
      {location.pathname === '/' && (
        <div className="relative grid h-[680px] overflow-hidden justify-items-start align-top ">
          <img
            src="/images/hero-friends.jpg"
            alt="hero"
            className="absolute top-0 left-0 object-cover object-left-top	2xl:object-center -mt-16 z-0"
          />

          <div className="container  z-50 mx-auto mb-24 mt-40 grid  gap-4 self-end ">
            <div className="grid gap-2.5">
              {/* <p className="text-5xl font-bold text-white">The world can be a lonely place.</p>
          <p className="text-5xl font-bold text-white">Find people who are just like you.</p> */}
              <p className="text-6xl font-bold text-white">Life can be lonely.</p>
              <p className="text-6xl font-bold text-white">Find people just like you.</p>
            </div>
            <Button asChild variant="outline">
              <Link to="" className="flex items-center gap-2 place-self-start">
                Let's make some friends
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
