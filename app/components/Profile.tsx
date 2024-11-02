import { ExtendedProfile } from '@/types/types'
import Link from 'next/link'
import React from 'react'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

import { getIcon } from './Profile.utils'
import { cn } from '~/lib/utils'

interface ProfileProps {
  profile: ExtendedProfile
  context: 'yours' | 'matches' | 'pending' | 'explore'
}

export default async function Profile({ profile, context }: ProfileProps) {
  const supabase = createClient()
  const { id, gender, content, allow_connections } = profile
  //console.log(profile.content, profile.id, profile.allow_connections)
  // get all connections where current profile is the requester or the requestee
  const { data: connections } = await supabase.from('connections').select().or(`requestee_id.eq.${id}, requester_id.eq.${id}`)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  async function createConnection() {
    'use server'

    const { error } = await supabase.from('connections').insert({
      requester_id: user?.id,
      requestee_id: id,
      status: 'pending',
    })
    if (error)
      //console.log(`Error creating connection: ${error}`)
      revalidatePath(`/profile/${id}`)
  }

  //console.log('connection', connection)
  // get the first 8 chars of id

  //const { name, gender, hobbies, movies, shows, books } = JSON.parse(profile.content)
  const favourites = [
    { label: 'shows', icon: 'tv' },
    { label: 'movies', icon: 'clapperboard' },
    { label: 'music', icon: 'headphones' },
    { label: 'books', icon: 'library' },
    { label: 'hobbies', icon: 'chef-hat' },
    { label: 'podcasts', icon: 'podcast' },
    { label: 'travel', icon: 'plane' },
  ]

  const connection = connections?.find((connection) => connection.requestee_id === id)
  //console.log('profile.allow_connections:', profile.allow_connections)
  //console.log('allow_connections:', allow_connections)

  return profile.content ? (
    <div className={cn(``, context === 'explore' ? 'grid gap-8' : 'grid-cols-12')}>
      <div className="col-span-4 grid grid-cols-5 gap-8">
        <div className="mt-6 grid gap-1">
          <h3 className="small-heading">Name</h3>
          <Link href={`/profile/${id}`}>{JSON.parse(content as string)['name'] ?? id?.slice(0, 8)} </Link>
        </div>

        {context !== 'explore' && (
          <div className="mt-6 grid gap-1">
            <h3 className="small-heading">Connections</h3>
            <p>{allow_connections === true ? 'Enabled' : 'Disabled'}</p>
          </div>
        )}

        <div className="mt-6 grid gap-1">
          <h3 className="small-heading">Work</h3>
          <p>{JSON.parse(content as string)['work']}</p>
        </div>

        {/* {similarity && (
          <div className="mt-6 grid gap-1">
            <h3 className="small-heading ">Similarity</h3>
            <span className="flex items-center gap-2">
              <ActivityIcon width={14} /> {(similarity * 100).toFixed(1) + '%'}
            </span>
          </div>
        )} */}

        {context !== 'explore' && (
          <div className="mt-6 grid gap-1">
            <h3 className="small-heading">Gender</h3>
            <p>{JSON.parse(content as string)['gender']}</p>
          </div>
        )}
      </div>

      <div className="col-span-9 mt-12">
        <h2 className="text-lg">Favourite things</h2>
        <div className={cn(`my-8 grid gap-6`, context === 'explore' ? '' : 'grid-cols-2')}>
          {favourites &&
            favourites.map((favourite) => {
              const value = JSON.parse(content as string)[favourite.label]
              const valueArr = value.split('\n')
              return (
                <div
                  key={favourite.label}
                  className={cn(`bg-white-25 flex gap-4 rounded-md p-4 pl-4`, context === 'explore' ? 'bg-yellow-25' : '')}
                >
                  <div>{getIcon(favourite.icon)}</div>
                  <div className="grid gap-1">
                    <h3 className="small-heading">{favourite.label}</h3>
                    <p className="text-neutral-600">
                      {valueArr.length > 0 &&
                        valueArr.map((value: any, index: number) => (index === valueArr.length - 1 ? value : `${value}, `))}
                    </p>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
      {connection ? (connection.status === 'declined' ? 'connection declined' : `connection status: ${connection.status}`) : undefined}
      {context === 'matches' && connections && connections.length === 0 && allow_connections === true && (
        <form action={createConnection}>
          <button type="submit">Send a connection request</button>
        </form>
      )}
    </div>
  ) : (
    'No profile'
  )
}
