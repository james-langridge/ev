import {NextRequest, NextResponse} from 'next/server'

import {getProperties, setProperties} from '@/lib/properties'

export async function GET() {
  try {
    const properties = getProperties()

    return NextResponse.json({data: properties}, {status: 200})
  } catch (e) {
    console.error(e)
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const {id} = await req.json()

    const properties = setProperties(id)

    return NextResponse.json({data: properties}, {status: 201})
  } catch (e) {
    console.error(e)
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
  }
}
