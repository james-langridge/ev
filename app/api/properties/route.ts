import {NextRequest, NextResponse} from 'next/server'
import {v4 as uuidv4} from 'uuid'

import {addProperty, getProperties, setProperties} from '@/lib/properties'
import {Property} from '@/lib/utils'

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

export async function POST(req: NextRequest) {
  try {
    const body: Property = await req.json()

    const properties = addProperty({...body, id: uuidv4()})

    return NextResponse.json({data: properties}, {status: 201})
  } catch (e) {
    console.error(e)
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
  }
}
