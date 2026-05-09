"use client"

import { cn } from '@/lib/utils';
import { Color, Size } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from "query-string"
import React from 'react'

interface FilterProps{
  name: string;
  valueKey: string,
  data:(Size | Color)[]
}

const Filter: React.FC<FilterProps> = ({
  name,
  valueKey,
  data
}) => {
  const searchParams = useSearchParams();
  const router = useRouter()

  const selectedValue = searchParams.get(valueKey)

  const onClick = (id: string) =>{
    const current = qs.parse(searchParams.toString())

    const query = {
      ...current,
      [valueKey]: id
    }

    if (current[valueKey]=== id) {
      query[valueKey]= null
    }

    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    }, {skipNull: true});

    router.push(url)
  }
  return (
    <div className='mb-stack-lg'>
      <h3 className='font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider mb-stack-sm'>
        {name}
      </h3>
      <div className='flex flex-wrap gap-unit'>
        {data.map((filter)=> (
          <div key={filter.id} className='flex items-center'>
            <button
              className={cn(
                "rounded-lg font-body-sm text-body-sm px-3 py-2 bg-surface border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors",
                selectedValue === filter.id && "bg-accent text-white border-accent hover:bg-accent-hover"
              )}
              onClick={()=> onClick(filter.id)}
            >
              <div className="flex items-center gap-2">
                {filter.name}
                {name === "Colors" && (
                  <div
                    className="h-4 w-4 rounded-full border border-outline-variant/30"
                    style={{backgroundColor: filter.value}}
                  />
                )}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter