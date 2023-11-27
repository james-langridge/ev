import {NextResponse} from 'next/server'

import {generateProperties} from '@/lib/utils'

export async function GET() {
  try {
    const properties = generateProperties()

    return NextResponse.json({data: properties}, {status: 200})
  } catch (e) {
    console.error(e)
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
  }
}
