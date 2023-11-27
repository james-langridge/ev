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

export default function PropertyCard() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Unique luxury estate</CardDescription>
        <X className="h-6 w-6" />
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
              <span>4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Feature</span>{' '}
              <span>345 m{`\u00B2`}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price</span>{' '}
              <span>865.000 EUR</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
