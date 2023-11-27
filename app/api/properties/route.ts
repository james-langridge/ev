import {NextResponse} from 'next/server'

import {getProperties} from '@/lib/properties'

export async function GET() {
  try {
    const properties = getProperties()

    return NextResponse.json({data: properties}, {status: 200})
  } catch (e) {
    console.error(e)
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
  }
}
