"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Color, Size } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from "query-string";
import React from 'react';

interface FilterProps {
  name: string;
  valueKey: string;
  data: (Size | Color)[];
}

const Filter: React.FC<FilterProps> = ({
  name,
  valueKey,
  data
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    }, { skipNull: true });

    router.push(url);
  };

  return (
    <div className='mb-8'>
      <h3 className='text-lg font-semibold'>
        {name}
      </h3>
      <hr className='my-4' />
      <div className='flex flex-wrap gap-2'>
        {data.map((filter) => (
          <div key={filter.id} className='flex items-center'>
            <Button
              className={cn(
                "rounded-xl text-sm text-gray-800 p-2 bg-white border border-black grid grid-cols-2",
                selectedValue === filter.id && "bg-primary text-white"
              )}
              onClick={() => onClick(filter.id)}
            >
              {filter.name}
              {name === "Colors" && (
                <div
                  className="h-6 w-6 rounded-full border ml-2"
                  style={{ backgroundColor: filter.value }}
                />
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
