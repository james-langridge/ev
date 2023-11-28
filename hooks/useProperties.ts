'use client'

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'

import {addProperty, deleteProperty, getProperties} from '@/lib/api'
import {Property} from '@/lib/utils'

export function useProperties() {
  const queryClient = useQueryClient()

  const {data: properties} = useQuery({
    queryKey: ['properties'],
    queryFn: () => getProperties(),
  })

  const {mutate: deleteProp} = useMutation({
    mutationFn: deleteProperty,
    onMutate: async deletedProp => {
      const newProperties = properties?.filter(
        property => property.id !== deletedProp.id,
      )

      await queryClient.cancelQueries({queryKey: ['properties']})
      const oldProperties = queryClient.getQueryData(['properties'])
      queryClient.setQueryData(['properties'], newProperties)

      return {oldProperties}
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['properties']})
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['properties'], context?.oldProperties)
    },
  })

  const {mutate: addProp} = useMutation({
    mutationFn: addProperty,
    onMutate: async newProp => {
      await queryClient.cancelQueries({queryKey: ['properties']})
      const oldProperties = queryClient.getQueryData<Property[]>(['properties'])
      queryClient.setQueryData(['properties'], old => {
        if (!Array.isArray(old)) {
          throw new Error('Expected an array of properties')
        }

        return [...old, {...newProp, id: -1}]
      })

      return {oldProperties}
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['properties']})
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['properties'], context?.oldProperties)
    },
  })

  return {properties, deleteProp, addProp}
}
