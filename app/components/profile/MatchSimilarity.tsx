import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ExtendedProfile } from '~/types/types'
import { getIcon } from '../Profile.utils'

interface MatchSimilarityProps {
  profile: ExtendedProfile
}
export default function MatchSimilarity({ profile }: MatchSimilarityProps) {
  const {
    work_similarity,
    food_similarity,
    travel_similarity,
    entertainment_similarity,
    hobbies_similarity,
    personality_similarity,
    shows_similarity,
    movies_similarity,
    music_similarity,
    books_similarity,
  } = profile

  //console.log('profile match percentages', profile)
  return (
    <div className="my-4 border-b  py-2">
      <div className="ml-auto mt-2 flex flex-wrap items-center gap-2">
        <h2>Similarity</h2>
        {(() => {
          const similarities = [
            { label: 'Work', value: work_similarity },
            { label: 'Food', value: food_similarity },
            { label: 'Travel', value: travel_similarity },
            { label: 'Entertainment', value: entertainment_similarity },
            { label: 'Hobbies', value: hobbies_similarity },
            { label: 'Personality', value: personality_similarity },
            { label: 'Shows', value: shows_similarity },
            { label: 'Movies', value: movies_similarity },
            { label: 'Music', value: music_similarity },
            { label: 'Books', value: books_similarity },
          ]

          const validSimilarities = similarities.filter(({ value }) => value !== null && value !== undefined)
          const averageSimilarity =
            validSimilarities.length > 0
              ? validSimilarities.reduce((sum, { value }) => sum + (value as number), 0) / validSimilarities.length
              : 0

          return (
            <>
              <div className="flex h-6 items-center justify-center rounded-lg border  px-2 text-xs font-semibold ">
                Avg: {(averageSimilarity * 100).toFixed(0)}%
              </div>
              {similarities.map(({ label, value }) =>
                value ? (
                  <div key={label} className="flex h-6 items-center justify-center gap-2 rounded-lg border  px-2 text-xs font-semibold">
                    <TooltipProvider delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger className="flex items-center gap-2">
                          {getIcon(label.toLowerCase())}
                          <span>{(value * 100).toFixed(0)}%</span>
                        </TooltipTrigger>
                        <TooltipContent className="text-xs">{label}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ) : null
              )}
            </>
          )
        })()}
      </div>
    </div>
  )
}
