import type { Metadata } from "next";

import { SidebarDashboard } from "./_components/sidebar2";


export const metadata: Metadata = {
  title: "Admin",
  description: "Admin",
};

export default  function DashboardLayout({ children }: {
  children: React.ReactNode
}) {

  return (
    <>
<SidebarDashboard>
  {children}
</SidebarDashboard>
    </>
  );
}
