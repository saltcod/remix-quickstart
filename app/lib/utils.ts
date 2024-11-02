import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
//import { redirect } from 'next/navigation'
//import { Resend } from 'resend'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
function formatParts(res: Record<string, any>, formatters: { key: string; format: (v: any) => string }[]) {
  return formatters
    .map(({ key, format }) => (res[key] !== undefined ? format(res[key]) : ''))
    .filter(Boolean)
    .join('\n')
}

// export function constructSentence(res: Record<string, any>) {
//   const formatters: { key: string; format: (v: any) => string }[] = [
//     { key: 'name', format: (v: string) => `Name: ${v}` },
//     { key: 'gender', format: (v: string) => `Gender: ${v}` },
//     { key: 'age_group', format: (v: string) => `Age: ${v}` },
//     { key: 'kids', format: (v: boolean) => `Kids: ${v ? 'Yes' : 'No'}` },
//     { key: 'pets', format: (v: string) => `Pets: ${v}` },
//     { key: 'work', format: (v: string) => `Occupation: ${v}` },
//     { key: 'shows', format: (v: string) => `Favorite TV Shows: ${v}` },
//     { key: 'movies', format: (v: string) => `Favorite Movies: ${v}` },
//     { key: 'music', format: (v: string) => `Favorite Music: ${v}` },
//     { key: 'books', format: (v: string) => `Favorite Books: ${v}` },
//     { key: 'hobbies', format: (v: string) => `Hobbies: ${v}` },
//     { key: 'podcasts', format: (v: string) => `Podcasts: ${v}` },
//     { key: 'travel', format: (v: string) => `Travel: ${v}` },
//     { key: 'fitness', format: (v: string) => `Fitness: ${v}` },
//     { key: 'personality', format: (v: string) => `Personality: ${v}` },
//     { key: 'food', format: (v: string) => `Food: ${v}` },
//   ]

//   return formatParts(res, formatters)
// }

export function constructPersonalSentence(res: Record<string, any>) {
  const formatters: { key: string; format: (v: any) => string }[] = [
    { key: 'age', format: (v: string) => `Age: ${v}` },
    { key: 'gender', format: (v: string) => `Gender: ${v}` },
    { key: 'kids', format: (v: string) => `Kids: ${v}` },
    { key: 'pets', format: (v: string) => `Pets: ${v}` },
  ]

  return formatParts(res, formatters)
}
export function constructHobbiesSentence(res: Record<string, any>) {
  const formatters: { key: string; format: (v: any) => string }[] = [
    { key: 'hobbies', format: (v: string) => `Hobbies: ${v}` },
    { key: 'fitness', format: (v: string) => `Fitness: ${v}` },
  ]

  return formatParts(res, formatters)
}

export function constructWorkSentence(res: Record<string, any>) {
  const formatters: { key: string; format: (v: any) => string }[] = [{ key: 'work', format: (v: string) => `Work: ${v}` }]

  return formatParts(res, formatters)
}

export function constructPersonalitySentence(res: Record<string, any>) {
  const formatters: { key: string; format: (v: any) => string }[] = [{ key: 'personality', format: (v: string) => `Personality: ${v}` }]

  return formatParts(res, formatters)
}

export function constructEntertainmentSentence(res: Record<string, any>) {
  const formatters: { key: string; format: (v: any) => string }[] = [
    { key: 'shows', format: (v: string) => `Favorite TV Shows: ${v}` },
    { key: 'movies', format: (v: string) => `Favorite Movies: ${v}` },
    { key: 'music', format: (v: string) => `Favorite Music: ${v}` },
    { key: 'books', format: (v: string) => `Favorite Books: ${v}` },
  ]

  return formatParts(res, formatters)
}

export function constructTravelSentence(res: Record<string, any>) {
  const formatters: { key: string; format: (v: any) => string }[] = [{ key: 'travel', format: (v: string) => `Travel: ${v}` }]

  return formatParts(res, formatters)
}
export function constructFoodSentence(res: Record<string, any>) {
  const formatters: { key: string; format: (v: any) => string }[] = [{ key: 'food', format: (v: string) => `Favourite food: ${v}` }]

  return formatParts(res, formatters)
}

// ... existing code ...

// async function sendConnectionEmail(firstName: string, scheduledAt: string) {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: ['delivered@resend.dev'],
//       subject: 'Hello world',
//       react: EmailTemplate({ firstName }),
//       scheduledAt,
//     })

//     if (error) {
//       console.error('Error sending email:', error)
//       return { error }
//     }

//     return { data }
//   } catch (error) {
//     console.error('Error sending email:', error)
//     return { error }
//   }
// }

// export async function sendEmail({
//   to,
//   subject,
//   firstName,
// }: {
//   to: string
//   subject: string
//   firstName: string
// }): Promise<{ success: boolean; data?: any; error?: string }> {
//   const resend = new Resend(process.env.RESEND_API_KEY)
//   try {
//     const { data, error } = await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: ['delivered@resend.dev'], // switch this to the right domain when s
//       subject: subject,
//       react: EmailTemplate({ firstName }),
//     })

//     if (error) {
//       return { success: false, error: error.message }
//     }

//     return { success: true, data }
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
//     return { success: false, error: errorMessage }
//   }
// }

// export function encodedRedirect(type: 'error' | 'success', path: string, message: string) {
//   return redirect(`${path}?${type}=${encodeURIComponent(message)}`)
// }
