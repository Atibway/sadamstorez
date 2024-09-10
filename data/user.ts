import prismadb from "@/lib/prismadb";
import { User } from '@prisma/client';


export const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const user = await prismadb.user.findUnique({
            where: { email },
        });
        return user; // This could return null if no user is found
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getUserById = async (id:string): Promise<User | null> =>{
    try {
        const user = await prismadb.user.findUnique({
            where: {id}
        })

        return user;
    } catch (error) {
        return null
    }
}