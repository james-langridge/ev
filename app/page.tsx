import PropertyCard from '@/components/property-card'
import {generateProperties} from '@/lib/utils'

export default function Home() {
  const data = generateProperties()

  return (
    <div className="flex flex-wrap justify-evenly items-center h-screen space-x-2 space-y-6 p-4">
      {data &&
        data.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
    </div>
  )
}
