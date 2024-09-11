
import { auth } from '@/auth'
import { userId } from '@/hooks/use-current-user'
import React from 'react'



const page = async() => {

  
  const session = await auth()
 
  if (!session?.user) return null
  return (
    <div className='text-black'>
      {session.user.email}
      <h1>sdffghjkl;kjcfbvnm,.,mnbvbnm,.mnbbvbnnm,m,nbnmm,..mnbm</h1>
      <h1>sdffghjkl;kjcfbvnm,.,mnbvbnm,.mnbbvbnnm,m,nbnmm,..mnbm</h1>
      <h1>sdffghjkl;kjcfbvnm,.,mnbvbnm,.mnbbvbnnm,m,nbnmm,..mnbm</h1>
      <h1>sdffghjkl;kjcfbvnm,.,mnbvbnm,.mnbbvbnnm,m,nbnmm,..mnbm</h1>
      <h1>sdffghjkl;kjcfbvnm,.,mnbvbnm,.mnbbvbnnm,m,nbnmm,..mnbm</h1>
      <h1>sdffghjkl;kjcfbvnm,.,mnbvbnm,.mnbbvbnnm,m,nbnmm,..mnbm</h1>
      <h1>sdffghjkl;kjcfbvnm,.,mnbvbnm,.mnbbvbnnm,m,nbnmm,..mnbm</h1>
      <h1>sdffghjkl;kjcfbvnm,.,mnbvbnm,.mnbbvbnnm,m,nbnmm,..mnbm</h1>
      <h1>sdffghjkl;kjcfbvnm,.,mnbvbnm,.mnbbvbnnm,m,nbnmm,..mnbm</h1>
      <h1>sdffghjkl;kjcfbvnm,.,mnbvbnm,.mnbbvbnnm,m,nbnmm,..mnbm</h1>
    </div>
  )
}

export default page

