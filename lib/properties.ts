import {generateProperties, Property} from '@/lib/utils'

const properties: Property[] = generateProperties()

export function getProperties() {
  return properties
}
