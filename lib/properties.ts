import {generateProperties, Property} from '@/lib/utils'

let properties: Property[] = generateProperties()

export function getProperties() {
  return properties
}

export function setProperties(id: string) {
  properties = properties.filter(property => property.id !== id)

  return properties
}

export function addProperty(property: Property) {
  properties.unshift(property)

  return properties
}
