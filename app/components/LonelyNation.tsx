import { Button } from '@/components/ui/button'
import { Link } from '@remix-run/react'
import { ArrowRightIcon } from 'lucide-react'

export default function LonelyNation() {
  return (
    <div className="mt-12 grid grid-cols-12 gap-8">
      <div className="col-span-6 grid gap-3 align-top">
        <div className="grid gap-3 self-start">
          <h2 className="text-6xl font-bold ">{`We have become a lonely nation. It's Time to Fix That.`}</h2>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">—Vivek H. Murthy, US Surgeon General</p>

          <ul className="mt-12 grid list-none grid-cols-2 items-center gap-12">
            <li className="grid gap-2">
              <div className="text-2xl font-bold">61%</div>
              <div>61% of U.S. adults reported feeling lonely, up from 54% in 2018.</div>
            </li>
            <li className="grid gap-2">
              <div className="text-2xl font-bold">36%</div>
              <div>
                of respondents aged 18 to 24 reported feeling lonely {'frequently'} or {'almost all the time.'}
              </div>
            </li>
            <li className="grid gap-2">
              <div className="text-2xl font-bold">49%</div>
              <div>of adults in the U.S. reported feeling more lonely than before the pandemic.</div>
            </li>
            <li className="grid gap-2">
              <div className="text-2xl font-bold">26%</div>
              <div>of remote workers reported feelings of loneliness as one of the biggest struggles of working from home</div>
            </li>
          </ul>
          <Button asChild className="mt-12">
            <Link to="" className="flex items-center gap-2 place-self-start">
              {`Let\'s`} make some friends
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="col-span-6">
        <img src="/images/maksym-kaharlytskyi-1KdnEeZ-maze.jpg" alt="Maze" width={500} height={500} />
      </div>
    </div>
  )
}
