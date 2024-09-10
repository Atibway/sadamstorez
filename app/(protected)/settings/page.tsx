
import { auth } from '@/auth'
import { userId } from '@/hooks/use-current-user'
import React from 'react'



const page = async() => {

  
  const session = await auth()
 
  if (!session?.user) return null
  return (
    <div className=' text-white'>
      {session.expires}
      hello
    </div>
  )
}

export default page

