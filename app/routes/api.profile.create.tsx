import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { createClient } from '~/utils/supabase/.server/server'
import {
  constructPersonalSentence,
  constructHobbiesSentence,
  constructWorkSentence,
  constructPersonalitySentence,
  constructEntertainmentSentence,
  constructTravelSentence,
  constructFoodSentence,
} from '~/lib/utils'

import { openai } from '@ai-sdk/openai'
import { embedMany } from 'ai'

export async function action({ request }: ActionFunctionArgs) {
  const { supabase } = createClient(request)
  const formData = await request.formData()
  const formDataEntries = Object.fromEntries(formData.entries())
  console.log({ formDataEntries })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const personalSentence = constructPersonalSentence(formDataEntries)
  const hobbiesSentence = constructHobbiesSentence(formDataEntries)
  const workSentence = constructWorkSentence(formDataEntries)
  const personalitySentence = constructPersonalitySentence(formDataEntries)
  const entertainmentSentence = constructEntertainmentSentence(formDataEntries)
  const travelSentence = constructTravelSentence(formDataEntries)
  const foodSentence = constructFoodSentence(formDataEntries)
  //console.log({ data })
  try {
    const { embeddings } = await embedMany({
      model: openai.embedding('text-embedding-ada-002'),
      values: [personalSentence, hobbiesSentence, workSentence, personalitySentence, entertainmentSentence, travelSentence, foodSentence],
    })

    const personal_embedding = embeddings[0]
    const hobbies_embedding = embeddings[1]
    const work_embedding = embeddings[2]
    const personality_embedding = embeddings[3]
    const entertainment_embedding = embeddings[4]
    const travel_embedding = embeddings[5]
    const food_embedding = embeddings[6]

    const { data: newProfile, error: upsertError } = await supabase
      .from('profiles')
      .upsert({
        ...formDataEntries,
        id: user?.id ?? undefined,
        personal_embedding,
        hobbies_embedding,
        work_embedding,
        personality_embedding,
        entertainment_embedding,
        travel_embedding,
        food_embedding,
      })
      .eq('id', user?.id)
      .select()
      .single()

    if (upsertError) {
      throw new Error(upsertError.message)
    }
    return redirect('/profile/matches')
  } catch (error) {
    console.error(error)
    return json({ error: 'An error occurred' })
  }
}
