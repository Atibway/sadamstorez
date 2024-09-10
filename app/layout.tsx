import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ModelProvider } from "@/providers/model-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
    return (
      <SessionProvider session={session}>
        <html lang="en">
                <body className={inter.className}>
                <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >

                    <ToastProvider/>
           <ModelProvider/>
            {children}
          </ThemeProvider>
          </body>
        </html>
        </SessionProvider>
    );
}
