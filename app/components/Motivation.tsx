import { ArrowUpRight, ExternalLink } from 'lucide-react'
import React from 'react'
import { Card } from '@/components/ui/card'

const links = [
  {
    title: 'The ‘Quiet Catastrophe’ Brewing in Our Social Lives',
    href: 'https://www.nytimes.com/2023/04/18/opinion/ezra-klein-podcast-sheila-liming.html',
    source: 'The Ezra Klein Show',
  },
  {
    title: 'Surgeon General: We Have Become a Lonely Nation. It’s Time to Fix That.',
    href: 'https://www.nytimes.com/2023/04/30/opinion/loneliness-epidemic-america.html',
    source: 'The New York Times',
  },
  {
    title: 'America has a loneliness epidemic. Here are 6 steps to address it',
    href: 'https://www.npr.org/2023/05/02/1173418268/loneliness-connection-mental-health-dementia-surgeon-general',
    source: 'NPR',
  },
  {
    title: 'We are in a loneliness epidemic. Where you live can make a difference for your health and happiness',
    href: 'https://fortune.com/well/2023/06/14/best-places-for-families-2023/',
    source: 'Fortune',
  },
]

export default function Motivation() {
  return (
    <div className="mx-auto mt-24 max-w-4xl pt-8">
      <header className="grid gap-4" id="explore">
        <h2 className="text-6xl font-bold">Need some more motivation?</h2>
        <p className="text-lg">Here are some articles to help you out</p>
      </header>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {links.map((link) => (
          <Card key={link.title} className="rounded-md bg-white p-8 text-sm">
            <a href={link.href} className="group  grid gap-4 text-lg ">
              <h3 className="group-hover:underline">{link.title}</h3>

              <p className="group mt-4 flex items-center gap-3 text-sm text-gray-500 hover:no-underline">
                {link.source} <ArrowUpRight width={14} />
              </p>
            </a>
          </Card>
        ))}
      </div>
    </div>
  )
}
