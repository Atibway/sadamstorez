"use client"

import IconButton from '@/components/frontentend/components/ui/iconButton';
import { Color, Size } from '@/types'
import { Dialog, DialogPanel } from '@headlessui/react';
import { Filter as FilterIcon, X } from 'lucide-react';
import React, { useState } from 'react'
import Filter from './Filter';

interface  MobileFilterProps {
    sizes: Size[];
    colors: Color[]
}

const MobileFilter: React.FC<MobileFilterProps> = ({
    sizes,
    colors
}) => {
const [open, setOpen] = useState(false)

const onOpen = () => setOpen(true)
const onClose = () => setOpen(false)

  return (
    <>
    <button onClick={onOpen} className='lg:hidden flex items-center gap-unit bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface p-stack-sm'>
      <FilterIcon className="w-5 h-5" />
      Filters
    </button>

    <Dialog open={open} as='div' className={"relative z-40 lg:hidden"} onClose={onClose}>
        {/* background */}
<div className='fixed inset-0 bg-primary/40'/>
{/* Dialog Position */}
<div className="fixed inset-0 z-40 flex">
<DialogPanel className={"relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-surface py-4 pb-6 shadow-xl"}>
    {/* close button */}
    <div className="flex items-center justify-end px-4">
<IconButton icon={<X className="text-on-surface" size={20}/>} onClick={onClose}/>
    </div>
{/* Render the filters */}
<div className='p-4'>
<Filter
  valueKey="sizeId"
  name="Sizes"
  data={sizes}
  />
  <Filter
  valueKey="colorId"
  name="Colors"
  data={colors}
  />
</div>
</DialogPanel>
</div>
    </Dialog>
    </>
  )
}

export default MobileFilter