import { json, redirect } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import type { ActionFunctionArgs } from '@remix-run/node'
import { createClient } from '~/utils/supabase/.server/server'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

export const action = async ({ request }: ActionFunctionArgs) => {
  const { supabase, headers } = createClient(request)
  const formData = await request.formData()

  const { error } = await supabase.auth.resetPasswordForEmail(formData.get('email') as string, {
    redirectTo: 'https://example.com/update-password',
  })

  if (error) {
    return json({ success: false, error: error.message }, { headers })
  }

  // Redirect to dashboard or home page after successful sign-in
  return redirect('/profile', { headers })
}

const ForgotPassword = () => {
  const actionData = useActionData<typeof action>()

  return (
    <div className="max-w-md mx-auto mt-24">
      <p>Forgot your password? </p>
      <Form method="post" className="grid gap-4 mt-4">
        <Input type="email" name="email" placeholder="Email" required />
        <br />
        <Button type="submit">Send reset email</Button>
      </Form>
      {actionData?.error && <p style={{ color: 'red' }}>{actionData.error}</p>}
    </div>
  )
}

export default ForgotPassword
