import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { zodResolver } from '@hookform/resolvers/zod'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useNavigate, useSearchParams } from '@remix-run/react'
import { Loader } from 'lucide-react'
import { AGE_GROUP_OPTIONS, GENDER_OPTIONS } from '~/lib/constants'
import { ProfileType } from '~/types/types'
import countryList from 'react-select-country-list'

import { ScrollArea } from './scroll-area'

const FormSchema = z.object({
  gender: z.array(z.string()).optional(),
  age_group: z.array(z.string()).optional(),
  countries: z.array(z.string()).optional(),
  kids: z.boolean().optional(),
})

type FormProps = {
  profile?: ProfileType
}

export default function MatchFilters({ profile }: FormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const countries = countryList().getData()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      gender: profile?.gender ? [profile.gender] : [],
      age_group: profile?.age_group ? [profile.age_group] : [],
      kids: profile?.kids ?? true,
      countries: profile?.country ? [profile.country] : [],
    },
  })
  const { isDirty } = form.formState

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams(searchParams)

      if (data.gender && data.gender.length > 0) {
        params.set('gender', data.gender.join(','))
      } else {
        params.delete('gender')
      }
      if (data.age_group && data.age_group.length > 0) {
        params.set('age_group', data.age_group.join(','))
      } else {
        params.delete('age_group')
      }
      if (data.kids !== undefined) {
        params.set('kids', data.kids.toString())
      } else {
        params.delete('kids')
      }
      if (data.countries && data.countries.length > 0) {
        params.set('countries', data.countries.join(','))
      } else {
        params.delete('countries')
      }

      navigate(`?${params.toString()}`, { replace: true, preventScrollReset: true })
      // Here you can add any additional logic for form submission
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className=" sticky top-6 grid">
      <Form {...form}>
        {isLoading && <Loader className="absolute -top-2 right-2 animate-spin opacity-40" />}
        <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-12  ">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Gender</FormLabel>
                </div>
                {GENDER_OPTIONS.map((gender) => (
                  <FormItem key={gender} className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(gender)}
                        onCheckedChange={(checked) => {
                          const currentValue = Array.isArray(field.value) ? field.value : []
                          const newValue = checked ? [...currentValue, gender] : currentValue.filter((value) => value !== gender)
                          field.onChange(newValue)
                          form.handleSubmit(handleSubmit)()
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">{gender}</FormLabel>
                  </FormItem>
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age_group"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="">Age Group</FormLabel>
                </div>
                {AGE_GROUP_OPTIONS.map((item) => (
                  <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          const currentValue = Array.isArray(field.value) ? field.value : []
                          const newValue = checked ? [...currentValue, item.id] : currentValue.filter((value) => value !== item.id)
                          field.onChange(newValue)
                          form.handleSubmit(handleSubmit)()
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
                  </FormItem>
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="countries"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="">
                    Countries
                    {field.value && field.value.length > 0 && ` (${field.value.join(', ')})`}
                  </FormLabel>
                </div>
                <ScrollArea className="h-[200px] w-[320px]  border p-4">
                  {countries.map((item) => (
                    <FormItem key={item.value} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.value)}
                          onCheckedChange={(checked) => {
                            const currentValue = Array.isArray(field.value) ? field.value : []
                            const newValue = checked ? [...currentValue, item.value] : currentValue.filter((value) => value !== item.value)
                            field.onChange(newValue)
                            form.handleSubmit(handleSubmit)()
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
                    </FormItem>
                  ))}
                </ScrollArea>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-16">
            <FormField
              control={form.control}
              name="kids"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="w-48">Do they have kids?</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <FormLabel>No</FormLabel>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked)
                          form.handleSubmit(handleSubmit)()
                        }}
                      />
                      <FormLabel>Yes</FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {isDirty && (
            <div>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                  navigate(`/profile/matches`, { replace: true })
                }}
              >
                Reset
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}
