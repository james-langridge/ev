import {faker} from '@faker-js/faker'
import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Property = {
  id: string
  title: string
  rooms: number
  feature: number
  price: number
}

export function generateProperties(): Property[] {
  const n = faker.number.int({min: 8, max: 64})

  return Array.from({length: n}, () => {
    const rooms = faker.number.int({max: 24})
    const feature = rooms * faker.number.int({min: 10, max: 75})
    const price = feature * faker.number.int({min: 1000, max: 5000})
    const leadTitleWord = faker.word.adjective()

    return {
      id: faker.string.uuid(),
      title: `${
        leadTitleWord.charAt(0).toUpperCase() + leadTitleWord.slice(1)
      } ${faker.word.adjective()} estate`,
      rooms,
      feature,
      price,
    }
  })
}

export type SortOrder = 'titleAsc' | 'titleDesc' | 'priceAsc' | 'priceDesc'

export function sortProperties(
  properties: Property[],
  sortBy: SortOrder,
): Property[] {
  switch (sortBy) {
    case 'titleAsc':
      return [...properties].sort((a, b) => (a.title > b.title ? 1 : -1))
    case 'titleDesc':
      return [...properties].sort((a, b) => (a.title > b.title ? -1 : 1))
    case 'priceAsc':
      return [...properties].sort((a, b) => a.price - b.price)
    case 'priceDesc':
      return [...properties].sort((a, b) => b.price - a.price)
    default:
      throw new Error('Invalid sorting criteria')
  }
}
