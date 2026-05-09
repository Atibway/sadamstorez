"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"

export default function Component() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: `/dashboard`,
      label: "Overview",
      active: pathname === `/dashboard`,
    },
    {
      href: `/dashboard/billboards`,
      label: "Billboards",
      active: pathname === `/dashboard/billboards`,
    },
    {
      href: `/dashboard/categories`,
      label: "Categories",
      active: pathname === `/dashboard/categories`,
    },
    {
      href: `/dashboard/sizes`,
      label: "Sizes",
      active: pathname === `/dashboard/sizes`,
    },
    {
      href: `/dashboard/colors`,
      label: "Colors",
      active: pathname === `/dashboard/colors`,
    },
    {
      href: `/dashboard/products`,
      label: "Products",
      active: pathname === `/dashboard/products`,
    },
    {
      href: `/dashboard/orders`,
      label: "Orders",
      active: pathname === `/dashboard/orders`,
    },
    {
      href: `/dashboard/settings`,
      label: "Settings",
      active: pathname === `/dashboard/settings`,
    },
        {
          href: `/frontend`,
          label: "Frontend",
          active: pathname === `/frontend`,
        }

  ]

  return (
    <div className="block md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle mobile sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full py-4">
            <nav className="space-y-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setOpen(false)}
                >
                  <Button
                    variant={route.active ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    {route.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}