import React from 'react'

import { BillboardWithImages } from '@/types'

interface BillboardProps {
    data: BillboardWithImages | null
}

const Billboard: React.FC<BillboardProps> = ({
    data
}) => {
  return (
    <div className='p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden'>
<div
className=' rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover '
style={{backgroundImage: `url(${data?.BillboardImages?.[0]?.url ?? ''})`}}
>
<div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
<div className='font-bold uppercase text-white text-3xl sm:text-4xl lg:text-5xl sm:max-w-xl max-w-xs'>
{data?.label}
</div>
</div>
</div>
    </div>
  )
}

export default Billboard