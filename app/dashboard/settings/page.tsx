
import { redirect } from 'next/navigation';
import React from 'react'
import SettingsForm from './_components/SettingsForm';
import { auth } from '@/auth';
import SettingPage from "../profile/page";

const SettingsPage: React.FC = async() => {
    
    const session = await auth()

    const userId = session?.user.id

    
    if (!userId) {
        redirect("/auth/login")
    }

  return (
    <div className='grid lg:grid-cols-2 space-y-4'>
        <div className='flex-1 p-3 space-y-4 md:p-8 lg:pt-20'>
        <SettingPage/>
      </div>
          <div className='flex-1 p-3 space-y-4 md:p-8 lg:pt-6'>
         
              <SettingsForm />
      </div>
      
    </div>
  )
}

export default SettingsPage

