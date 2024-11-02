import { json, redirect } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import type { ActionFunctionArgs } from '@remix-run/node'
import { createClient } from '~/utils/supabase/.server/server'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

export const action = async ({ request }: ActionFunctionArgs) => {
  const { supabase, headers } = createClient(request)
  const formData = await request.formData()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    return json({ success: false, error: error.message }, { headers })
  }

  // Redirect to dashboard or home page after successful sign-in
  return redirect('/profile/matches', { headers })
}

const SignIn = () => {
  const actionData = useActionData<typeof action>()

  return (
    <div className="max-w-md mx-auto mt-24">
      <p>
        Don&apos;t have an account?{' '}
        <Link to="/sign-up" className="underline">
          Sign up
        </Link>
      </p>
      <Form method="post" className="grid gap-4 mt-4">
        <Input type="email" name="email" placeholder="Email" required />
        <Input type="password" name="password" placeholder="Password" required />
        <br />
        <Button type="submit">Sign in</Button>
      </Form>
      <Link to="/forgot-password" className="underline">
        Forgot your password?
      </Link>
      {actionData?.error && <p style={{ color: 'red' }}>{actionData.error}</p>}
    </div>
  )
}

export default SignIn
