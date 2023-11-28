'use client'

import {Plus} from 'lucide-react'
import {useState} from 'react'
import * as React from 'react'

import {AddPropertyForm} from '@/components/add-property-form'
import PropertyCard from '@/components/property-card'
import {Button} from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
  const {properties} = useProperties()
  const [sortedProps, setSortedProps] = useState<Property[]>()
  const [sort, setSort] = useState<SortOrder>('priceDesc')
  const displayProps = sortedProps ? sortedProps : properties
  const [open, setOpen] = useState(false)

  return (
    <div>
      <header className="sticky flex border-b justify-between p-6 items-end">
        <Select
          value={sort}
          onValueChange={(value: SortOrder) => {
            setSort(value)
            if (properties) {
              const sorted = sortProperties(properties, value)
              setSortedProps(sorted)
            }
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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              className="text-lg"
              data-testid="add-button"
            >
              <Plus strokeWidth={1.25} className="mr-3" /> Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add property</DialogTitle>
              <DialogDescription>
                Add a new property here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <AddPropertyForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </header>
      <div className="flex flex-wrap justify-evenly items-center h-screen space-x-2 space-y-6 p-4">
        {displayProps &&
          displayProps.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
      </div>
    </div>
  )
}
