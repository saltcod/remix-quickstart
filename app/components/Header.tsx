import { Link } from '@remix-run/react'
import { hasEnvVars } from '~/utils/check-env-vars'
import { EnvVarWarning } from './EnvVarWarning'
import HeaderAuth from './HeaderAuth'

export default function Header() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link to={'/'}>Remix Supabase Starter</Link>
        </div>
        {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
      </div>
    </nav>
  )
}
