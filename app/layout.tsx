import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ModelProvider } from "@/providers/model-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import ModalProvider from "@/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bam Shopping Center",
  description: "Bam Shopping Center - Your one-stop shop for all your needs",
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
    return (
      <SessionProvider session={session}>
        <html lang="en" suppressHydrationWarning>
                <body className={inter.className}>
                    <ToastProvider/>
           <ModelProvider/>
           <ModalProvider/>
            {children}
          </body>
        </html>
        </SessionProvider>
    );
}
