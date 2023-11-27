'use client'

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {useEffect} from 'react'

import {deleteProperty, getProperties} from '@/lib/api'

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

  return {properties, deleteProp}
}
