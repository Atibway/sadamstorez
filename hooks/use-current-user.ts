import { auth } from '@/auth'

export let userId: any
export const useCurrentUser = async()=> {
    const session = await auth()
 
    if (!session?.user) return null
  

    userId = session.user.id
}