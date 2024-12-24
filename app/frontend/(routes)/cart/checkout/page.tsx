import React from 'react'
import { ProfileUpdateOrProceedPage } from '../_components/checkout'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/prismadb'
import { redirect } from 'next/navigation'

const page= async()=>{
    const user = await currentUser()
    if(!user){
        redirect("/frontend")
    }
     const userInfo = await db.user.findUnique({
      where:{
        id: user?.id
      }
     })
  return (
    <div>
        <ProfileUpdateOrProceedPage
        userInfo={userInfo}
        />
    </div>
  )
}

export default page