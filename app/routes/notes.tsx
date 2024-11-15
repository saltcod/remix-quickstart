import { json, LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData, useFetcher } from '@remix-run/react'
import { createClient } from '~/utils/supabase.server'
import { useRef, useEffect } from 'react'

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase } = createClient(request)

  const { data: notes } = await supabase.from('notes').select()

  return json({
    notes,
  })
}

export async function action({ request }: ActionFunctionArgs) {
  const { supabase } = createClient(request)
  const formData = await request.formData()
  const title = formData.get('title')

  if (typeof title !== 'string' || !title) {
    return json({ error: 'Title is required' }, { status: 400 })
  }

  await supabase.from('notes').insert({ title })
  return json({ success: true })
}

type ActionResponse = { success: boolean } | { error: string }

export default function Page() {
  const { notes } = useLoaderData<typeof loader>()
  const fetcher = useFetcher<ActionResponse>()
  const formRef = useRef<HTMLFormElement>(null)

  // Reset form when submission is successful
  useEffect(() => {
    if (fetcher.state === 'idle' && !('error' in (fetcher.data || {}))) {
      formRef.current?.reset()
    }
  }, [fetcher])

  return (
    <div>
      <h1>Notes</h1>

      <fetcher.Form ref={formRef} method="post" className="mb-6">
        <div className="grid gap-4">
          <textarea name="title" className="border rounded p-2" placeholder="Write your note..." />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {fetcher.state === 'submitting' ? 'Adding note...' : 'Add Note'}
          </button>
        </div>
      </fetcher.Form>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  )
}
