import type { Metadata } from "next";
import { SiteHeader } from "./(routes)/_components/site-header";
import { db } from "@/lib/prismadb";
import { SiteFooter } from "./(routes)/_components/site-footer";

export const metadata: Metadata = {
  title: "Bam Shopping Center",
  description: "Bam Shopping Center - Your one-stop shop for all your needs",
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
