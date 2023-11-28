'use client'

import {useEffect, useState} from 'react'
import * as React from 'react'

import PropertyCard from '@/components/property-card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {useProperties} from '@/hooks/useProperties'
import {Property, SortOrder, sortProperties} from '@/lib/utils'

export default function DashBoard() {
  const {properties = []} = useProperties()
  const [sortedProps, setSortedProps] = useState<Property[]>()
  const [sort, setSort] = useState<SortOrder>()

  useEffect(() => {
    setSortedProps(properties)
  }, [])

  return (
    <div>
      <header className="sticky flex border-b">
        <div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 sm:px-6">
          <Select
            value={sort}
            onValueChange={(value: SortOrder) => {
              setSort(value)
              const sorted = sortProperties(properties, value)
              setSortedProps(sorted)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort properties" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="priceDesc">Price descending</SelectItem>
                <SelectItem value="priceAsc">Price ascending</SelectItem>
                <SelectItem value="titleDesc">Name descending</SelectItem>
                <SelectItem value="titleAsc">Name ascending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </header>
      <div className="flex flex-wrap justify-evenly items-center h-screen space-x-2 space-y-6 p-4">
        {sortedProps &&
          sortedProps.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
      </div>
    </div>
  )
}
