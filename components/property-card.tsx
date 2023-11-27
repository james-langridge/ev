import {X} from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import {Separator} from '@/components/ui/separator'
import {useProperties} from '@/hooks/useProperties'
import {Property} from '@/lib/utils'

export default function PropertyCard({property}: {property: Property}) {
  const {deleteProp} = useProperties()
  const {title, feature, price, rooms, id} = property

  function onClick() {
    deleteProp({id})
  }

  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <X className="h-6 w-6" onClick={onClick} />
      </CardHeader>
      <CardContent>
        <div className="flex space-x-3">
          <Image
            src={'https://picsum.photos/300/200'}
            width={300}
            height={200}
            alt="Property"
            className="w-1/2 h-auto"
          />
          <div className="flex w-1/2 flex-col justify-between py-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rooms</span>{' '}
              <span>{rooms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Feature</span>{' '}
              <span>
                {new Intl.NumberFormat('de-DE').format(feature)} m{`\u00B2`}
              </span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price</span>{' '}
              <span>{new Intl.NumberFormat('de-DE').format(price)} EUR</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
