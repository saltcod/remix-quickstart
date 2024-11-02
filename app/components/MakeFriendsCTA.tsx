import { Button } from '@/components/ui/button'
import { Link } from '@remix-run/react'
import { ArrowRightIcon } from 'lucide-react'

export default function MakeFriendsCTA() {
  return (
    <div className="mx-auto my-24 grid  gap-4 border-b border-t py-12 text-center">
      <h3 className="text-4xl font-bold">Ready to make some friends?</h3>
      <p className="mx-auto max-w-md">Create a profile in a couple of minutes, explore your matches, and start making friends.</p>
      <p className="text-lg text-muted-foreground">
        <Button asChild>
          <Link to="" className="mt-6 flex items-center gap-2 place-self-start">
            Get started
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </p>
    </div>
  )
}
