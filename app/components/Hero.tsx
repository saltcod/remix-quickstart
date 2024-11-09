import NextLogo from './next-logo'
import SupabaseLogo from './supabase-logo'

export default function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        <a href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs" target="_blank" rel="noreferrer">
          <SupabaseLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <img src="/logo-light.png" alt="Remix" className="block dark:hidden w-28" />
          <img src="/logo-dark.png" alt="Remix" className="hidden dark:block w-28" />
        </a>
      </div>
      <h1 className="sr-only">Supabase and Remix Starter Template</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        The fastest way to build apps with{' '}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>{' '}
        and{' '}
        <a href="https://remix.run" target="_blank" className="font-bold hover:underline" rel="noreferrer">
          Remix
        </a>
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  )
}
