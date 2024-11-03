import { Link } from '@remix-run/react'
import { TutorialStep } from './TutorialStep'

export default function SignUpUserSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <TutorialStep title="Sign up your first user">
        <p>
          Head over to the{' '}
          <Link to="/sign-up" className="font-bold hover:underline text-foreground/80">
            Sign up
          </Link>{' '}
          page and sign up your first user. It's okay if this is just you for now. Your awesome idea will have plenty of users later!
        </p>
      </TutorialStep>
    </ol>
  )
}
