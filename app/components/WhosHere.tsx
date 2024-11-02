import { ConnectionType, ProfileType, ExtendedProfile } from '~/types/types'
import MatchFilters from './MatchFilters'
import ProfileCard from './ProfileCard'
import { User } from '@supabase/supabase-js'

interface WhosHereProps {
  profiles: ExtendedProfile[]
  connections: ConnectionType[]
  user: User | null
}

export default function WhosHere({ profiles, connections, user }: WhosHereProps) {
  return (
    <div className="relative mt-12 border-b-2 py-12">
      <h2 className="text-5xl font-bold">{`See who's here`}</h2>
      <div className="mt-12 grid grid-cols-12 gap-8">
        <div className="col-span-3">{/* <MatchFilters /> */}</div>

        <div className="col-span-9">
          {profiles && profiles.length > 0 ? (
            <div className="grid grid-cols-12 gap-8">
              {profiles.map((profile) => (
                <div key={profile.name} className="col-span-6">
                  <ProfileCard profile={profile} context="explore" connections={connections} user={user} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8">
              <p className="text-gray-500">No profiles found, try changing your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
