'use client'

import {useQuery} from '@tanstack/react-query'

import {getProperties} from '@/lib/api'

export function useProperties() {
  const {data: properties} = useQuery({
    queryKey: ['properties'],
    queryFn: () => getProperties(),
  })

  return {properties}
}
