import type { Metadata } from "next";
import { NavBar } from "@/components/frontentend/components/NavBar";
import {Footer} from "@/components/frontentend/components/Footer";

import { SiteHeader } from "./(routes)/_components/site-header";
import { db } from "@/lib/prismadb";
import { SiteFooter } from "./(routes)/_components/site-footer";

export const metadata: Metadata = {
  title: "Store",
  description: "Store",
};

export default async function FrontendLayout({ children }: {
  children: React.ReactNode
}) {
  const categories = await db.category.findMany({
      include: {
        billboard: {
          include: {
            BillboardImages: true,
          },
        },
        subcategories: true,
      },
    });
    
  return (
    <>
<SiteHeader data={categories}/>
<div className="dark:bg-background">

        {children}
</div>
       <SiteFooter/>
       
    </>
  );
}
