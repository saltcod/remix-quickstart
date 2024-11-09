import { ThemeProvider, useTheme, PreventFlashOnWrongTheme } from 'remix-themes'

import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import Footer from './components/Footer'
import { createClient } from '~/utils/supabase/.server/server'
import { json, LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import stylesheet from '~/tailwind.css?url'

import { themeSessionResolver } from './utils/session.server'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }]

import Header from '~/components/Header'
import { cn } from './lib/utils'

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase } = createClient(request)

  const hasEnvVars = !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { getTheme } = await themeSessionResolver(request)

  return json({
    theme: getTheme(),
    user: user ?? undefined,
    hasEnvVars,
  })
}
// Wrap your app with ThemeProvider.
// `specifiedTheme` is the stored theme in the session storage.
// `themeAction` is the action name that's used to change the theme in the session storage.
export default function AppWithProviders() {
  const { theme } = useLoaderData<typeof loader>()

  return (
    <ThemeProvider specifiedTheme={theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  )
}

export function App() {
  const data = useLoaderData<typeof loader>()
  const [theme] = useTheme()

  return (
    <html lang="en" className={cn(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body>
        <main className="min-h-screen flex flex-col items-center">
          <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <Header />
            <Outlet />
            <Footer />
            <ScrollRestoration />
            <Scripts />
          </div>
        </main>
      </body>
    </html>
  )
}

// export function ErrorBoundary() {
//   const error = useRouteError()
//   console.error(error)
//   return (
//     <html lang="en">
//       <head>
//         <title>Oh no!</title>
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         <div>
//           <h1>Something went wrong!</h1>
//           <p>{error?.message}</p>
//           <pre>{error?.stack}</pre>
//         </div>
//         <Scripts />
//       </body>
//     </html>
//   )
// }
