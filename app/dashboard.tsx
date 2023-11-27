'use client'

import PropertyCard from '@/components/property-card'
import {useProperties} from '@/hooks/useProperties'

export default function DashBoard() {
  const {properties} = useProperties()

  if (!properties) {
    return null
  }

  return (
    <div className="flex flex-wrap justify-evenly items-center h-screen space-x-2 space-y-6 p-4">
      {properties &&
        properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
    </div>
  )
}
