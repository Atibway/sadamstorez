import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { getUserByEmail, getUserById } from "./data/user";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismadb from "./lib/prismadb";

const prism = new PrismaClient();


export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await prismadb.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow 0Auth without email verification
      if (account?.provider !== "credentials") return true;

      if (!user.id) {
        console.error("User ID is undefined");
        return false;
      }

      // const existingUser = await getUserById(user.id);

      // if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    
  },
  adapter: PrismaAdapter(prism),
  session: { strategy: "jwt" },
  ...authConfig,
});
