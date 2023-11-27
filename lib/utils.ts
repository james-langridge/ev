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
