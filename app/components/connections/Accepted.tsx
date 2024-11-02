import React from 'react'
import { createClient } from '~/utils/supabase/.server/server'

import { Database } from '@/types/supabase'

import { revalidatePath } from 'next/cache'
import Profile from '@/app/profile/Profile'
import ProfileCard from '@/app/profile/ProfileCard'

export default async function ConnectionsAccepted() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // get connections for which the current user is the requestee or the requester
  const { data: acceptedConnections } = await supabase
    .from('connections')
    .select()
    .or(`requestee_id.eq.${user?.id}, requester_id.eq.${user?.id}`)
    .eq('status', 'confirmed')

  const acceptedRequesteeEmailsArray = acceptedConnections?.map((connection) =>
    connection.requestee_id === user?.id ? connection.requester_id : connection.requestee_id || []
  )

  console.log(acceptedRequesteeEmailsArray)

  // get the email of the accepted requestee
  const { data: acceptedRequesteeEmails } = await supabase
    .from('users')
    .select()
    .in('id', acceptedRequesteeEmailsArray as [])

  console.log(acceptedRequesteeEmails)

  // return an array of ids that are not the current user
  const connectionIDs = acceptedConnections?.map((connection) =>
    connection.requestee_id === user?.id ? connection.requester_id : connection.requestee_id || []
  )
  console.log(connectionIDs)
  //console.log('acceptedConnections:', acceptedConnections)
  // from that, get an array of requester ids
  // filter out ids that are the current user
  // const requesterIds = acceptedConnections?.map((connection) => connection.requester_id) || []
  // const requesterIds =
  //   acceptedConnections?.filter((connection) => connection.requester_id !== user?.id).map((connection) => connection.requester_id) || []
  // //console.log('requesterIds:', requesterIds)

  const { data: acceptedConnectionProfiles, error } = await supabase
    .from('profiles')
    .select()
    .in('id', connectionIDs as [])
  if (error) console.log('failed to fetch pending connections', error)

  return acceptedConnectionProfiles && acceptedConnectionProfiles.length === 0 ? (
    <p>No accepted connections requests</p>
  ) : (
    <div>
      <div className="flex w-full gap-4">
        {acceptedConnectionProfiles?.map((profile) => (
          <>
            <ProfileCard
              key={profile.id}
              profile={profile}
              email={acceptedRequesteeEmails?.find((item) => item.id === profile.id)?.email}
              context="pending"
            />
          </>
        ))}
      </div>
    </div>
  )
}
