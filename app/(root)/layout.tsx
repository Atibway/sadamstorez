
import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function SetupLayout({ children }: {
    children: React.ReactNode
}) {
    const session = await auth()
 
    if (!session?.user) return null

    const userId = session.user.id

    if (!userId) {
redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    })

    if(store){
        redirect(`/${store.id}`)
    }

    return (
        <>
        {children}
        </>
    )
}
