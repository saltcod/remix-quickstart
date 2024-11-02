// import { cancelConnection } from '@/app/actions/cancel-connection-action'
// import { confirmConnection } from '@/app/actions/confirm-connection-action'
// import { createConnection } from '@/app/actions/create-connection-action'
// import { declineConnection } from '@/app/actions/decline-connection-action'
// import { deleteConnection } from '@/app/actions/delete-connection-action' // Import deleteConnection
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Form, useSubmit, useFetcher, useNavigation } from '@remix-run/react'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface AlertProps {
  title: string
  message: string
  formAction: string
  buttonText: string
  triggerText: string
  icon?: React.ReactNode
  requesteeId?: string
  connectionId?: string
}

export const ConnectionsAlert = ({ title, message, requesteeId, connectionId, formAction, triggerText, icon, buttonText }: AlertProps) => {
  const fetcher = useFetcher()

  const [open, setOpen] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData()

    if (requesteeId) formData.append('requestee_id', requesteeId)
    if (connectionId) formData.append('id', connectionId)

    fetcher.submit(formData, { method: 'post', action: fn })
  }

  const actions = {
    'create-connection': '/connection/create',
    'delete-connection': '/connection/delete', // delete the connection b/c you've requested but changed your mind
    'accept-connection': '/connection/accept',
    'ignore-connection': '/connection/ignore',
    'decline-connection': '/connection/decline',
  }

  const fn = actions[formAction as keyof typeof actions]

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="link" className="  px-3 py-1 text-sm font-medium">
          {icon ?? icon}

          {triggerText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0">
        <AlertDialogHeader className="p-6">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <fetcher.Form method="post" action={fn} onSubmit={handleSubmit}>
          {requesteeId && <input type="hidden" name="requestee_id" value={requesteeId} />}
          {connectionId && <input type="hidden" name="id" value={connectionId} />}
        </fetcher.Form>
        <AlertDialogFooter className="bg-neutral-100 rounded-b-lg p-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant={'primary'} onClick={handleSubmit} disabled={fetcher.state !== 'idle'}>
              {fetcher.state !== 'idle' ? 'Submitting...' : buttonText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
