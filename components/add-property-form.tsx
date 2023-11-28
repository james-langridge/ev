import {zodResolver} from '@hookform/resolvers/zod'
import {Dispatch, SetStateAction} from 'react'
import {useForm} from 'react-hook-form'
import * as z from 'zod'

import {Button} from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {useProperties} from '@/hooks/useProperties'

const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  rooms: z.string().refine(
    val => {
      const number = parseFloat(val)

      return !isNaN(number) && isFinite(number) && number >= 0
    },
    {
      message: 'Rooms must be a non-negative number.',
    },
  ),
  feature: z.string().refine(
    val => {
      const number = parseFloat(val)

      return !isNaN(number) && isFinite(number) && number >= 0
    },
    {
      message: 'Feature must be a non-negative number.',
    },
  ),
  price: z.string().refine(
    val => {
      const number = parseFloat(val)

      return !isNaN(number) && isFinite(number) && number >= 0
    },
    {
      message: 'Price must be a non-negative number.',
    },
  ),
})

export function AddPropertyForm({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>
}) {
  const {addProp} = useProperties()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      rooms: '0',
      feature: '0',
      price: '0',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      addProp(data)

      setOpen(false)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Fantastic property..." {...field} />
              </FormControl>
              <FormDescription>Display title of the property.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rooms"
          render={({field}) => (
            <FormItem>
              <FormLabel>Rooms</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormDescription>Number of rooms.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="feature"
          render={({field}) => (
            <FormItem>
              <FormLabel>Feature</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormDescription>Number of square metres.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({field}) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormDescription>Price in EUR.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
