

import { ResetForm } from '@/components/auth/reset-form';
import { currentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';


const ResetPage = async() => {
  const isLoggedIn = await currentUser()

if(isLoggedIn){
  
  redirect("/settings")
} else{
  return (
    <ResetForm/>
  )
}
}

export default ResetPage;
