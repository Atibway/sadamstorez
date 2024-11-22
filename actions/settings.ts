"use server"
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/prismadb";
import { SettingsSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import * as z from "zod"


export const settings = async(
    values: z.infer<typeof SettingsSchema>
)=> {
const user = await currentUser();
if(!user) {
    return {error: "Unauthorized"}
}
const dbUser = await getUserById(user.id)

if(!dbUser) {
    return {error: "Unauthorized"}
}

if(user.isOAuth){
values.email = undefined;
values.password = undefined;
values.newPassword = undefined;
values.isTwoFactorEnabled = undefined;
}




await db.user.update({
    where: {id: dbUser.id},
    data:{
        ...values
    }
});

return {success: "Settings Updated"}
}