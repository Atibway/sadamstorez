"use client"

import { cn } from "@/lib/utils"
import { Category } from "@/types"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Menu from "./mobileMenue"

interface MainNavProps {
    data:  Category[]
}

const MainNav: React.FC<MainNavProps> = ({
    data
}) => {

    const pathname= usePathname()


     const routes = data?.map((route)=> ({
        href: `/frontend/category/${route.id}`,
        label: route.name,
        active: pathname === `/frontend/category/${route.id}`
     }))

     
  return (
    <div
    className="mx-6 flex items-center gap-x-3 lg:gap-x-5"
    >
      <div className="hidden md:block">
      {routes.map((route)=> (
        <div className="flex gap-x-2">
 <Link
        key={route.href}
        href={route.href}
        className={cn(
          "text-sm font-medium   transition-colors hover:text-black",
          route.active?"text-blue-400 underline": "text-neutral-500"
        )}
        >
          {route.label}
        </Link>
        </div>
       
      ))}
      </div>
      <div>
        <Menu
        categories={data}
        />
      </div>
    </div>
  )
}

export default MainNav