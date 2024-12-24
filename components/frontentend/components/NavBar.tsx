
import Link from 'next/link'
import React from 'react'
import MainNav from './MainNav'
import getCategories from '@/actions/get-categories'
import NavbarActions from './NavbarActions'
import { UserButton } from './user-button'
import { Button } from './ui/button'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/prismadb'

export const revalidate = 0

export const NavBar = async() => {

  const user = await currentUser()

const store = await db.store.findFirst()
  return (
    
        <div className='border-b'>
            <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center'>
            <Link href={"/frontend"} className='ml-4 flex lg:ml-0 gap-x-2'>
        <p className='font-bold text-xl'>sadmstores</p>
            </Link>
        
            <NavbarActions
            store={store}
            />
            <div className='ml-2'>
            {user?(
<UserButton/>
):(
    <Link
    href={"/auth/login"}>
    <Button>
Login
    </Button>
    </Link>
)}
            </div>
            </div>
        </div>
       
  )
}
