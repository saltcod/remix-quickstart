import {
  ChefHatIcon,
  ClapperboardIcon,
  HammerIcon,
  HeadphonesIcon,
  LibraryIcon,
  Mail,
  MapPin,
  Mountain,
  PersonStanding,
  PlaneIcon,
  PodcastIcon,
  Ruler,
  TvIcon,
  User,
  UserCircle2,
} from 'lucide-react'

export function getIcon(icon: string) {
  switch (icon) {
    case 'country':
      return <MapPin size={16} className="text-gray-500" />
    case 'email':
      return <Mail size={16} className="text-gray-500" />
    case 'gender':
      return <User size={16} className="text-gray-500" />
    case 'personality':
      return <PersonStanding size={16} className="text-gray-500" />
    case 'hobbies':
      return <Mountain size={16} className="text-gray-500" />
    case 'entertainment':
      return <TvIcon size={16} className="text-gray-500" />
    case 'shows':
      return <TvIcon size={16} className="text-gray-500" />
    case 'name':
      return <UserCircle2 size={16} className="text-gray-500" />
    case 'age_group':
      return <Ruler size={16} className="text-gray-500" />
    case 'movies':
      return <ClapperboardIcon size={16} className="text-gray-500" />
    case 'music':
      return <HeadphonesIcon size={16} className="text-gray-500" />
    case 'books':
      return <LibraryIcon size={16} className="text-gray-500" />
    case 'food':
      return <ChefHatIcon size={16} className="text-gray-500" />
    case 'podcasts':
      return <PodcastIcon size={16} className="text-gray-500" />
    case 'travel':
      return <PlaneIcon size={16} className="text-gray-500" />
    case 'work':
      return <HammerIcon size={16} className="text-gray-500" />
  }
}

export const PROFILE_FORM_TEXT_AREA_FIELDS = [
  {
    name: 'work',
    label: 'Work',
    description:
      'What do you do for a living? If something general like "software engineer", add your languages. If it\'s "teacher" add elementary school teacher, etc',
  },
  { name: 'pets', label: 'Pets', description: 'Any furry friends? How many? What kind?', sublabel: 'Leave blank if none' },
  { name: 'hobbies', label: 'Favourite hobbies', description: 'What do you do for fun? Add details if you have them!.' },
  { name: 'shows', label: 'Favourite shows', description: 'What are your favourite TV shows?', sublabel: 'Leave blank if none' },
  {
    name: 'movies',
    label: 'Favourite movies',
    sublabel: 'Leave blank if none',
  },
  { name: 'music', label: 'Favourite music or bands' },
  { name: 'books', label: 'Favourite books', sublabel: 'Leave blank if none' },
  { name: 'podcasts', label: 'Favourite podcasts', sublabel: 'Leave blank if none' },
  { name: 'travel', label: 'Favourite places to travel' },
  { name: 'personality', label: 'Personality', description: 'Introverted, extroverted, curious, happy?' },
  { name: 'food', label: 'What do you like to eat?' },
  { name: 'fitness', label: 'Are you into fitness?', description: 'Lift weights? Run? Crossfit? ', sublabel: 'Leave blank if no' },
]
