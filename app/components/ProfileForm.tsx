import { ProfileType } from '@/types/types'
import { useState } from 'react'
import { PROFILE_FORM_TEXT_AREA_FIELDS } from './Profile.utils'

import { Form, useNavigation } from '@remix-run/react'

import { AGE_GROUP_OPTIONS, GENDER_OPTIONS } from '~/lib/constants'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Loader } from 'lucide-react'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import countryList from 'react-select-country-list'

type FormProps = {
  profile?: ProfileType
}

type CountryOption = {
  value: string
  label: string
}

export default function ProfileForm({ profile }: FormProps) {
  const navigation = useNavigation()

  const useDefaultValues = true
  const countries: CountryOption[] = countryList().getData()

  const [formData, setFormData] = useState({
    allow_connections: profile?.allow_connections ?? true,
    gender: profile?.gender ?? 'prefer not to say',
    age_group: profile?.age_group ?? '20s',
    country: profile?.country ?? '',
    name: profile?.name ?? (useDefaultValues ? 'John Doe' : ''),
    work: profile?.work ?? (useDefaultValues ? 'Software Developer' : ''),
    kids: profile?.kids ?? useDefaultValues ?? true,
    pets: profile?.pets ?? (useDefaultValues ? 'Scruffy the Golden Doodle' : ''),
    movies: profile?.movies ?? (useDefaultValues ? 'The Matrix, Inception, The Dark Knight' : ''),
    music: profile?.music ?? (useDefaultValues ? 'Pearl Jam, Jazz' : ''),
    podcasts: profile?.podcasts ?? (useDefaultValues ? 'TED Radio Hour, Freakonomics, This American Life' : ''),
    shows: profile?.shows ?? (useDefaultValues ? 'Breaking Bad, The Office' : ''),
    travel: profile?.travel ?? (useDefaultValues ? 'Paris, Tokyo' : ''),
    fitness: profile?.fitness ?? (useDefaultValues ? 'Crossfit, lifting' : ''),
    food: profile?.food ?? (useDefaultValues ? 'Sushi, Italian' : ''),
    personality: profile?.personality ?? (useDefaultValues ? 'Extroverted, curious, ENFP' : ''),
    books: profile?.books ?? (useDefaultValues ? '1984, To Kill a Mockingbird, The Great Gatsby' : ''),
    hobbies: profile?.hobbies ?? (useDefaultValues ? 'Photography, Hiking, Reading, Cooking' : ''),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleAgeSelectChange = (value: string) => {
    console.log('value', value)
    const ageGroupIds = AGE_GROUP_OPTIONS.map((option) => option.id)

    setFormData({
      ...formData,
      age_group: ageGroupIds.includes(value) ? (value as typeof formData.age_group) : formData.age_group,
    })
  }

  const handleCountrySelectChange = (value: string) => {
    setFormData({
      ...formData,
      country: value,
    })
  }

  return (
    <div className="grid grid-cols-2 gap-16">
      <Form action="/api/profile/create" method="post">
        <div className="grid gap-12">
          <div>
            <label htmlFor="firstName">First name</label>
            <div>
              <Input id="firstName" type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <p className="text-sm text-muted-foreground">This is your public display name.</p>
          </div>

          <div className="flex gap-4">
            <input
              type="checkbox"
              id="allow_connections"
              name="allow_connections"
              checked={formData.allow_connections}
              onChange={(e) => setFormData({ ...formData, allow_connections: e.target.checked })}
            />
            <input type="hidden" name="allow_connections" value={formData.allow_connections ? 'true' : 'false'} />
            <div>
              <label htmlFor="allow_connections">Accept connection requests from other users</label>
              <p className="text-xs text-muted-foreground">You can turn this on / off if you have enough friends at the moment</p>
            </div>
          </div>

          <div className="flex gap-3">
            <label htmlFor="gender">Gender</label>
            <div className="grid gap-1">
              {GENDER_OPTIONS.map((gender) => (
                <div key={gender} className="flex items-center gap-1">
                  <input
                    type="radio"
                    id={`gender-${gender}`}
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                  />
                  <label htmlFor={`gender-${gender}`}>{gender}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-between">
            <div className="grid gap-2">
              <label htmlFor="age_group">Age group</label>
              <p className="text-xs text-muted-foreground">What age group are you in?</p>
            </div>
            <div className="grid gap-3 bg-background">
              <Select required value={formData.age_group} onValueChange={handleAgeSelectChange}>
                <SelectTrigger className="w-[180px]" name="age_group">
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {AGE_GROUP_OPTIONS.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" name="age_group" value={formData.age_group} />
            </div>
          </div>

          <div className="flex gap-3 justify-between">
            <div className="grid gap-2">
              <label htmlFor="country">Country</label>
              <p className="text-xs text-muted-foreground">Where are you from?</p>
            </div>
            <div className="grid gap-3 bg-background">
              <Select value={formData.country} onValueChange={handleCountrySelectChange}>
                <SelectTrigger className="w-[180px]" name="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" name="country" value={formData.country} />
            </div>
          </div>

          <div className="mt-16 grid gap-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Input type="hidden" name="kids" value="false" />
                <Input type="checkbox" id="kids" name="kids" checked={formData.kids} onChange={handleChange} />
                <label htmlFor="kids">Yes</label>
              </div>
              <label className="w-48" htmlFor="kids">
                Do you have kids?
              </label>
            </div>

            {PROFILE_FORM_TEXT_AREA_FIELDS.map((field) => (
              <div key={field.name} className="flex gap-6">
                <div className="w-72">
                  <label>{field.label}</label>
                  <p className="grid gap-2 text-xs text-muted-foreground">
                    <div>{field.description ? field.description : 'Add one item per line'}</div>
                    <div>{field.sublabel ?? field.sublabel}</div>
                  </p>
                </div>

                <Textarea
                  className="w-full"
                  rows={5}
                  placeholder={`${field.label}`}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]?.toString() || ''}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <Button type="submit" variant="outline" className="flex gap-4 rounded-sm">
            {navigation.state === 'submitting' ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </Form>
      <div>
        <div className="bg-white-25 sticky top-8 p-12 text-sm">
          <h2 className="font-bold">A note on privacy</h2>
          <div className="mt-2 grid gap-2">
            <p>
              <u>All</u> fields are optional.{' '}
            </p>
            <p>You can fill in whatever you want. Share as little or as much you want.</p>
            <p>If you don't want to share, or the fields don't apply, leave them blank.</p>
          </div>

          <h2 className="mt-8 font-bold">{`Will my matching results be worse if I don\'t share?`}</h2>
          <div className="mt-2 grid gap-2">
            <p>{`Yes. That's the downside.`}</p>
            <p>The less you put in your profile, the less data we can use to match you with others.</p>
            <p>
              {`That said, look closely at what you're providing. You probably aren't the only person in the world named Marco, who's favourite
            movie is My Cousin Vinny, who's favourite band is Phish. Actually, in that case, you probably are. But generally, you won't be.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
