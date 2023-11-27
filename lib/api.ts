import {Property} from '@/lib/utils'

export async function getProperties(): Promise<Property[]> {
  const res = await fetch(`/api/properties`)

  const jsonRes = await res.json()

  if (!res.ok) {
    throw new Error(jsonRes.error || 'An error occurred')
  }

  return jsonRes.data
}

export async function deleteProperty({id}: {id: string}): Promise<Property[]> {
  const res = await fetch('/api/properties', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id}),
  })

  const jsonRes = await res.json()

  if (!res.ok) {
    throw new Error(jsonRes.error || 'An error occurred')
  }

  return jsonRes.data
}
