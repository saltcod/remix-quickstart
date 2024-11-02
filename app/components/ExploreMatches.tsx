import React from 'react'
import { createClient } from '~/utils/supabase/.server/server'

import { revalidatePath } from 'next/cache'
import ProfileCard from '../profile/ProfileCard'
import { Button } from '@/components/ui/button'
import { ExtendedProfile, ProfileType } from '@/types/types'

async function getRandomProfile() {
  'use server'
  const supabase = createClient()

  const { data: profileArray } = await supabase.rpc('get_random_profile')

  const profile = profileArray[0]

  if (profile) {
    const match: ExtendedProfile = await getProfileMatch(profile)

    revalidatePath('/')
    return { profile, match }
  } else {
    return { profile: null, match: null }
  }
}

async function getProfileMatch(profile: ProfileType): Promise<ProfileType> {
  const supabase = createClient()
  const { data: match } = await supabase.rpc('match_profiles', {
    query_embedding: profile.embedding,
    match_threshold: 0.78, // Choose an appropriate threshold for your data
    match_count: 1, // Choose the number of match
  })

  return match as ProfileType
}

export default async function Explorematch() {
  const supabase = createClient()
  const { profile, match } = await getRandomProfile()

  //console.log('the profiles', profile)
  return (
    <div className="scroll-m-t-24 bg-white-25 mt-12 border-t pt-12">
      <header className="flex items-center gap-4" id="explore">
        <h3 className="text-lg font-bold">Explore matches</h3>
      </header>
      <div className="mt-8">
        <p className="max-w-3xl text-lg">
          Have a peek at some matches.{' '}
          <span className="text-gray-500">
            With just a couple of inputs, the similarities between people are remarkable accurate. Turns out, it's pretty easy for the
            people who love the movie Titanic to find each other.
          </span>
        </p>
      </div>
      <h2 className="mt-12 text-lg">Look at this match made in heaven:</h2>
      <div className="relative mt-8 grid grid-cols-12 gap-12">
        <div className="col-span-5">{profile && profile.content && <ProfileCard profile={profile} context="explore" />}</div>
        {/* <span className="absolute left-[calc(50%-35px)] top-8 translate-x-1/2"> */}
        <span className="col-span-2 mt-24">
          <h3 className="small-heading text-center">A perfect match</h3>

          <form action={getRandomProfile}>
            <Button type="submit" variant="outline" className=" mx-auto mt-8 flex gap-2 ">
              See another
            </Button>
          </form>
        </span>
        <div className="col-span-5">
          {match ? (
            <>
              <div key={match.id} className="grid gap-8">
                <ProfileCard key={match.id} profile={match} context="explore" />
              </div>
            </>
          ) : (
            'No match found'
          )}
        </div>
      </div>
    </div>
  )
}
