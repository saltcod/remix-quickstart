import { Button } from '@/components/ui/button'
import { Check, Mail, Trash, X } from 'lucide-react'
// import { cancelConnection } from '../actions/cancel-connection-action'
import { Link } from '@remix-run/react'
import { User } from '@supabase/supabase-js'
import { ConnectionType, ExtendedProfile } from '~/types/types'
import { ConnectionsAlert } from '../components/connections/ConnectionsAlert'
import { getIcon } from './Profile.utils'

import countryList from 'react-select-country-list'
import MatchSimilarity from './profile/MatchSimilarity'

interface ProfileProps {
  profile: ExtendedProfile
  context: 'yours' | 'matches' | 'pending' | 'explore' | 'connections_incoming' | 'connections_outgoing' | 'connections_ignored'
  connections?: ConnectionType[]
  user?: User | null
}

export default function ProfileCard({ profile, context, connections, user }: ProfileProps) {
  const { id, allow_connections, name, work, country, gender, age_group, status, connection_id, email } = profile

  const countryName = country
    ? countryList()
        .getData()
        .find((c) => c.value === country)?.label
    : undefined

  const favourites = [
    { label: 'shows' },
    { label: 'movies' },
    { label: 'music' },
    { label: 'books' },
    { label: 'hobbies' },
    { label: 'podcasts' },
    { label: 'travel' },
  ]

  const connection = connections?.find((connection) => connection.requestee_id === id)

  const yourProfile = user?.id === id

  return (
    <div className=" rounded-lg bg-background text-sm">
      <div className="p-4">
        <header className="border-black-500 flex items-center justify-between border-b pb-3 ">
          <div className="flex w-full items-center justify-between gap-2">
            <div>
              <Link to={`/profile/${id}`} className="font-bold">
                {yourProfile ? `${name} (you)` ?? 'You' : name ?? id?.slice(0, 8)}{' '}
              </Link>
            </div>
          </div>

          {connections && connections.length === 0 && allow_connections === true && (
            <ConnectionsAlert
              title="Ignore profile"
              message="Ignore this profile? You will no longer see them in your match suggestions."
              formAction="ignore-connection"
              buttonText="Ignore"
              triggerText="Ignore"
              requesteeId={id as string}
            />
          )}
          <span className="text-lg">&middot;</span>
          {connections && connections.length === 0 && allow_connections === true && (
            <ConnectionsAlert
              title="Confirm connection"
              message="When this person accepts your request, they will be able to see your email address and contact you. Be certain you want to connect with them."
              formAction="create-connection"
              buttonText="Confirm"
              triggerText="Connect"
              requesteeId={id as string}
            />
          )}

          {connection?.status === 'declined' && <span className="text-xs">Connection declined</span>}

          {context === 'connections_incoming' && status === 'pending' && (
            <ConnectionsAlert
              title="Accept request"
              message="Are you sure you wish to accept this connection request?"
              formAction="accept-connection"
              buttonText="Accept"
              connectionId={connection_id}
              triggerText="Accept request"
              icon={<Check width={14} />}
            />
          )}
          {context === 'connections_incoming' && status === 'pending' && (
            <ConnectionsAlert
              title="Decline request"
              message="Are you sure you wish to decline this connection request?"
              formAction="decline-connection"
              buttonText="Decline"
              connectionId={connection_id}
              triggerText="Decline request"
              icon={<X width={14} />}
            />
          )}

          {context === 'connections_outgoing' && status === 'pending' && (
            <ConnectionsAlert
              title="Cancel connection request"
              message="Are you sure you wish to cancel this connection request?"
              formAction="delete-connection"
              buttonText="Confirm"
              connectionId={connection_id}
              triggerText="Connection pending"
              icon={<Trash width={14} />}
            />
          )}

          {context === 'connections_ignored' && status === 'ignore' && (
            <ConnectionsAlert
              title="Unignore this profile"
              message="Are you sure you wish to unignore? This person will now be shown in your matches."
              formAction="delete-connection"
              buttonText="Unignore"
              connectionId={connection_id}
              triggerText="Unignore"
            />
          )}

          {/* <ConnectionsAlert
                title="Delete connection"
                message="Are you sure you wish to delete this connection?"
                formAction="delete-connection"
                buttonText="Confirm"
                triggerText="Connected"
                connectionId={connection?.id}
                icon={<Settings width={14} />}
              /> */}
        </header>
        {context !== 'explore' && context !== 'connections_incoming' && context !== 'connections_outgoing' && !yourProfile && (
          <MatchSimilarity profile={profile} />
        )}

        {gender && (
          <div className="flex items-center gap-4 border-b py-3">
            <div className="flex w-24  items-center gap-2 rounded-lg bg-neutral-1100 p-1">
              {getIcon('gender')}

              <span className="text-xs font-bold uppercase">gender</span>
            </div>
            <div className="grid gap-1">
              <p className="capitalize ">{gender}</p>
            </div>
          </div>
        )}
        {age_group && (
          <div className="flex items-center gap-4 border-b py-3">
            <div className="flex w-24 items-center gap-2 rounded-lg bg-neutral-1100 p-1">
              {getIcon('age_group')}

              <span className="text-xs font-bold uppercase">age</span>
            </div>
            <div className="grid gap-1">
              <p className="">{age_group}</p>
            </div>
          </div>
        )}

        {work && (
          <div className="flex items-center gap-4 border-b py-3">
            <div className="flex w-24 items-center gap-2 rounded-lg bg-neutral-1100 p-1">
              {getIcon('work')}

              <span className="text-xs font-bold uppercase">work</span>
            </div>
            <div className="grid gap-1">
              <p className="capitalize ">{work}</p>
            </div>
          </div>
        )}

        {country && (
          <div className="flex items-center gap-4 border-b py-3">
            <div className="flex w-24 items-center gap-2 rounded-lg bg-neutral-1100 p-1">
              {getIcon('country')}
              <span className="text-xs font-bold uppercase">country</span>
            </div>
            <div className="grid gap-1">
              <p className="capitalize ">{countryName || country}</p>
            </div>
          </div>
        )}

        <div>
          <div className="grid gap-2">
            {favourites.map((favourite) => {
              const value = profile[favourite.label as keyof typeof profile]
              if (!value) return null // Skip if value is not present
              return (
                <div key={favourite.label} className="flex items-center gap-4 border-b py-3">
                  <div className="flex w-24 items-center gap-2 rounded-lg bg-neutral-1100 p-1">
                    {getIcon(favourite.label)}
                    <div className="w-24">
                      <span className="text-xs font-bold uppercase">{favourite.label}</span>
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <p className="">{value}</p>
                  </div>
                </div>
              )
            })}

            {email && (
              <div className="flex items-center gap-4 border-b py-3">
                <div className="flex w-24 items-center gap-2 rounded-lg bg-neutral-1100 p-1">
                  {getIcon('email')}

                  <span className="text-xs font-bold uppercase">email</span>
                </div>
                <div className="grid gap-1">
                  <p className=" ">{email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* {pendingConnections?.find((connection) => connection.requestee_id == profile.id)?.id && (
          <div className="mt-4">
            <ConnectionsAlert
              title="Cancel connection request"
              message="Are you sure you wish to cancel this connection request? This can't be undone."
              formAction="cancel-connection"
              buttonText="Confirm"
              triggerText="Cancel conection request"
              icon={<X width={14} />}
              connectionId={pendingConnections?.find((connection) => connection.requestee_id === profile.id)?.id}
            />
          </div>
        )} */}
      </div>
    </div>
  )
}
