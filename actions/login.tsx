"use server";
import * as z from "zod";
import { loginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
// import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
// import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";

import { error } from "console";
import prismadb from "@/lib/prismadb";


export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  } else {
    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser?.password) {
      return { error: "Email does not exist!" };
    }

    // if (!existingUser.emailVerified) {
    //   const verificationToken = await generateVerificationToken(
    //     existingUser.email
    //     );

        // await sendVerificationEmail(
        //   verificationToken.email,
        //   verificationToken.token
        // );

    //   return {
    //     success: "Confirmation Email Sent To your Email Check and Tap in The Link to confirm",
    //   };
    //   }

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
      
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid credentials!" };

          default:
            return { error: "Something went wrong" };
        }
      }
      throw error;
    }
    return { success: "Successfully Logged In" };
  }
};
