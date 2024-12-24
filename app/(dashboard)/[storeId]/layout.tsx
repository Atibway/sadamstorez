"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ModeToggle } from "@/components/theme-tuggle";

import {
  MdDashboard,
  MdOutlineBusinessCenter,
  MdCategory,
  MdStraighten,
  MdColorLens,
  MdShoppingCart,
  MdReceipt,
  MdSettings,
  MdWeb,
} from "react-icons/md";
import { FaPeopleArrows } from "react-icons/fa";

export default function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const params = useParams();
  const user = useCurrentUser();

  const userId = user?.id;

  if (!userId) {
    redirect("/frontend");
  }

  const links = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathName === `/${params.storeId}`,
      icon: <MdDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathName === `/${params.storeId}/billboards`,
      icon: <MdOutlineBusinessCenter className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathName === `/${params.storeId}/categories`,
      icon: <MdCategory className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathName === `/${params.storeId}/sizes`,
      icon: <MdStraighten className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathName === `/${params.storeId}/colors`,
      icon: <MdColorLens className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathName === `/${params.storeId}/products`,
      icon: <MdShoppingCart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathName === `/${params.storeId}/orders`,
      icon: <MdReceipt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      href: `/${params.storeId}/users`,
      label: "Users",
      active: pathName === `/${params.storeId}/users`,
      icon: <FaPeopleArrows className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathName === `/${params.storeId}/settings`,
      icon: <MdSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      href: `/frontend`,
      label: "Frontend",
      active: pathName === `/frontend`,
      icon: <MdWeb className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "min-h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <SidebarLink
              link={{
                label: `${user.name}`,
                href: "#",
                icon: (
                  <Image
                    src={user.image || ""}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
            <ModeToggle />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="p-2 md:p-5 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <Link href="#" className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="h-8 w-8 text-black dark:text-white">
          <rect width="50" height="50" fill="none" />
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="25" cy="25" r="24" />
            <path d="M14 18 L25 29 L36 18" />
            <path d="M14 32 L25 21 L36 32" />
          </g>
        </svg>
      </div>
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium text-black dark:text-white whitespace-pre">
        SadamStores
      </motion.span>
    </Link>
  );
};
