"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/schemas";
import prismadb from "@/lib/prismadb";
import { getUserByEmail } from "@/data/user";
import { error } from "console";
// import { generateVerificationToken } from "@/lib/tokens";
// import { sendVerificationEmail } from "@/lib/mail";

export const SignUp = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password, firstName, lastName } = validatedFields.data;
  console.log(email);
  
if(!email && !password && !firstName && !lastName){
    return {error: "Fill in all fields"}
}
  const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword);


  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  } 

    await prismadb.user.create({
      data: {
        email,
        password: hashedPassword,
        lastName,
        firstName
      },
    });

    return { success: "Registerd Successfully" };
  }

