

import { RegisterForm } from '@/components/auth/RegisterForm'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'


const RegisterPage = async() => {
  const isLoggedIn = await currentUser()

if(isLoggedIn){
  redirect("/settings")
} else{
  return (
    <RegisterForm/>
  )
}
}

export default RegisterPage