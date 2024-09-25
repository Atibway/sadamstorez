import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import {db as prismadb} from "@/lib/prismadb";

import { redirect } from "next/navigation";

export default async function DashboardLayout({ children, params }: {
    children: React.ReactNode;
    params: {storeId:string}
}) {
    const session = await auth()
 
    const userId = session?.user.id
    
    if (!userId) {
        redirect('/auth/login')
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if(!store){
redirect("/")
    }

    return (
        <>
            <Navbar/>
            {children}
        </>
    )
}
