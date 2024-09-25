

import { NewPasswordForm } from '@/components/auth/new-password-form'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'


const NewPasswordPage = async() => {
  const isLoggedIn = await currentUser()

  if(isLoggedIn){
    redirect("/settings")
  } else{
  
    return (
      <NewPasswordForm/>
    )
  }
}

export default NewPasswordPage