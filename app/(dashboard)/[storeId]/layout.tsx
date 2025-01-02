import type { Metadata } from "next";

import { SidebarDashboard } from "./(routes)/_components/sidebar2";


export const metadata: Metadata = {
  title: "Store",
  description: "Store",
};

export default  function FrontendLayout({ children }: {
  children: React.ReactNode
}) {

  return (
    <>

<div>
<SidebarDashboard children={children}/>
</div>
    </>
  );
}
