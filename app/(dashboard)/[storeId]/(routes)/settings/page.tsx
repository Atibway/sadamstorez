"use client"
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import React from 'react'
import SettingsForm from './components/SettingsForm';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { logout } from '@/actions/logout';

interface SettingsPageProps {
    params: {
        storeId: string;
    }
}

const SettingsPage: React.FC<SettingsPageProps> = async({ params }) => {
    const onClick = () => {
        logout()
        }

    const session = await auth()
 
    if (!session?.user) return null

    const userId = session.user.id

    if (!userId) {
        redirect("/sign-in")
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if (!store) {
        redirect("/")
    }
  return (
    <div className='flex-col'>
          <div className='flex-1 space-y-4 p-8 pt-6'>
         
              <SettingsForm initialData={store } />
      </div>
    </div>
  )
}

export default SettingsPage

