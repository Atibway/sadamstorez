
import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
import {db} from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function SetupLayout({ children }: {
    children: React.ReactNode
}) {
    const session = await currentUser()
 
    const userId = session?.id

    // Allow browsing without login - only redirect if user is logged in as ADMIN
    if (userId && session.role === "USER") {
        redirect('/frontend')
    }
    
    // If user is ADMIN, continue to dashboard
    if (userId && session.role === "ADMIN") {
        const store = await db.store.findFirst()

        if(store){
            redirect(`/${store.id}`)
        }
    }

    return (
        <>
        {children}
        </>
    )
}
