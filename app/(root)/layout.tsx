
import { currentUser } from "@/lib/auth";
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
    
    // If user is ADMIN, redirect to dashboard
    if (userId && session.role === "ADMIN") {
        redirect(`/dashboard`)
    }

    return (
        <>
        {children}
        </>
    )
}
