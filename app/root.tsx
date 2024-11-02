import { ThemeProvider, useTheme, PreventFlashOnWrongTheme } from 'remix-themes'

import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useRouteError } from '@remix-run/react'
import Footer from './components/Footer'
import { createClient } from '~/utils/supabase/.server/server'
import { LinksFunction, LoaderFunctionArgs } from '@remix-run/node'
import stylesheet from '~/tailwind.css?url'

import { themeSessionResolver } from './utils/session.server'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }]

import clsx from 'clsx'
import Header from '~/components/Header'

// Return the theme from the session storage using the loader
export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase } = createClient(request)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { getTheme } = await themeSessionResolver(request)

  return {
    theme: getTheme(),
    user: user ?? undefined,
  }
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
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
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
