


import React from 'react'
import MainNav from './MainNav'
import StoreSwitcher from './StoreSwitcher'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { ModeToggle } from './theme-tuggle'
import { auth } from '@/auth'

import MobileDrawer from './mobileMenue'

const Navbar = async() => {
  const session = await auth()
 
  if (!session?.user) return null

  const userId = session.user.id

    if (!userId) {
        redirect("/sign-in")
    }

    const stores = await prismadb.store.findMany({
        where: {
            userId 
        }
    });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className=" ml-3 hidden  lg:block " />
        <div className="ml-auto flex items-center space-x-3">
          <ModeToggle  />
          <div className=" ml-3  lg:hidden ">
          <MobileDrawer/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar

