import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {render} from '@testing-library/react'
import {rest} from 'msw'
import * as React from 'react'
import {v4 as uuidv4} from 'uuid'

import {addProperty, getProperties, setProperties} from '@/lib/properties'
import {Property} from '@/lib/utils'

export const handlers = [
  rest.get('/api/properties', (req, res, ctx) => {
    const properties = getProperties()

    return res(
      ctx.status(200),
      ctx.json({
        data: properties,
      }),
    )
  }),
  rest.post('/api/properties', async (req, res, ctx) => {
    const body = (await req.json()) as Omit<Property, 'id'>

    const properties = addProperty({...body, id: uuidv4()})

    return res(
      ctx.status(201),
      ctx.json({
        data: properties,
      }),
    )
  }),
  rest.delete('/api/properties', async (req, res, ctx) => {
    const {id} = (await req.json()) as {id: string}

    const properties = setProperties(id)

    return res(
      ctx.status(201),
      ctx.json({
        data: properties,
      }),
    )
  }),
]

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient()
  const {rerender, ...result} = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>,
  )

  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>,
      ),
  }
}
