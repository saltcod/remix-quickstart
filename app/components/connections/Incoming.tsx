import { ProfileTypeReduced } from '~/types/types'
import ProfileCard from '../ProfileCard'
import { Link } from '@remix-run/react'

interface ConnectionProfilesProps {
  profiles: ProfileTypeReduced[]
  context: 'connections_incoming' | 'connections_outgoing' | 'matches' | 'connections_ignored'
}

export default function ConnectionProfiles({ profiles, context }: ConnectionProfilesProps) {
  return profiles && profiles.length === 0 ? (
    <div className="mt-8 p-4 bg-text-sm text-center text-neutral-500 border-dashed border-2 border-neutral-200 rounded-md">
      No pending requests, go look for some{' '}
      <Link to="/profile/matches" className="underline">
        matches
      </Link>
      !
    </div>
  ) : (
    <div>
      {profiles?.map((profile) => (
        <>
          <ProfileCard key={profile.id} profile={profile} context={context} />
        </>
      ))}
    </div>
  )
}
