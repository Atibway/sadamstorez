import React from 'react'
import { ChevronRight, Camera, User, Contact, CreditCard, History, LogIn } from 'lucide-react';
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/prismadb'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderHistory } from './_components/order-history'
import { OrderColumn } from './_components/orders/columns'
import ProductTracking from './_components/order-tracking'
import { ProfileForm } from "@/app/dashboard/profile/_components/profileForm"
import { Prisma } from "@/generated/prisma/client";
import { format } from "date-fns";
import { formatter } from '@/lib/utils';

type OrderWithRelations = Prisma.OrderGetPayload<{
  select: {
    id: true;
    createdAt: true;
    isPaid: true;
    delivered: true;
    user: {
      select: {
        name: true;
        phone: true;
        city: true;
        country: true;
      };
    };
    orderItems: {
      select: {
        quantity: true;
        product: {
          select: {
            name: true;
            price: true;
          };
        };
      };
    };
  };
}>;

const SettingsPage = async({
  searchParams,
}: {
  searchParams: { tab?: string }
}) => {
  const user = await currentUser()
  const defaultTab = searchParams.tab || 'personal-info'

  // Show login reminder instead of redirect
  if(!user){
    return (
      <div className="bg-surface min-h-screen flex flex-col">
        <main className="flex-grow w-full max-w-container-max mx-auto px-margin-desktop py-section-padding">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 p-section-padding text-center">
            <div className="flex justify-center mb-stack-md">
              <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center">
                <LogIn className="w-10 h-10 text-accent" />
              </div>
            </div>
            <h1 className="font-h2 text-h2 text-primary mb-stack-sm">Login Required</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-md mx-auto">
              Please log in to access your account settings. You'll need to be logged in to manage your profile, orders, and preferences.
            </p>
            <div className="flex gap-unit justify-center">
              <Link href="/auth/login">
                <Button className="bg-accent hover:bg-accent-hover text-white font-body-md text-body-md px-8">
                  Log In
                </Button>
              </Link>
              <Link href="/frontend">
                <Button variant="outline" className="font-body-md text-body-md px-8">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const userInfo = await db.user.findUnique({
    where:{
      id: user?.id
    }
  })

  const orders = await db.order.findMany({
    where: {
      userId: user.id
    },
    select: {
      id: true,
      createdAt: true,
      isPaid: true,
      delivered: true,
      user: {
        select: {
          name: true,
          phone: true,
          city: true,
          country: true,
        },
      },
      orderItems: {
        select: {
          quantity: true,
          product: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  }) as unknown as OrderWithRelations[];

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.user.phone,
    address: `${item.user.city}, ${item.user.country}`,
    delivered: item.delivered,
    products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    totalPrice: formatter.format(item.orderItems.reduce((total, orderItem) => {
      return total + Number(orderItem.product.price) * orderItem.quantity;
    }, 0)),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="bg-surface min-h-screen flex flex-col">
      <main className="flex-grow flex w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-padding gap-gutter">
        {/* Settings Sidebar */}
        <aside className="w-64 hidden lg:flex flex-col gap-stack-sm p-stack-lg border-r border-outline-variant/20 bg-surface-container-low shadow-sm h-min rounded-lg">
          <nav className="flex flex-col gap-stack-sm">
            <Link href="/frontend/settings?tab=personal-info" className={`flex items-center gap-stack-sm p-stack-sm rounded-lg font-semibold transition-all duration-300 ease-in-out ${defaultTab === 'personal-info' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container-high hover:pl-4'}`}>
              <User className="w-5 h-5" />
              <span className="font-body-md text-body-md">Profile</span>
            </Link>
            <Link href="/frontend/settings?tab=orders" className={`flex items-center gap-stack-sm p-stack-sm rounded-lg transition-all duration-300 ease-in-out ${defaultTab === 'orders' ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container-high hover:pl-4'}`}>
              <History className="w-5 h-5" />
              <span className="font-body-md text-body-md">Orders</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content Area */}
        <section className="flex-grow">
          {/* Breadcrumbs */}
          <nav className="flex text-on-surface-variant font-body-sm text-body-sm mb-stack-lg">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link className="inline-flex items-center hover:text-primary transition-colors" href="/frontend">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <Link className="hover:text-primary transition-colors" href="/frontend/settings">Account</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="text-primary font-medium">Profile Settings</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="bg-surface rounded-xl shadow-sm border border-outline-variant/10 p-stack-lg md:p-section-padding">
            <Tabs defaultValue={defaultTab} className="space-y-stack-lg">
              <TabsList className="bg-surface-container-low border border-outline-variant/20">
                <TabsTrigger value="personal-info" className="font-body-sm text-body-sm">Profile</TabsTrigger>
                <TabsTrigger value="orders" className="font-body-sm text-body-sm">Orders</TabsTrigger>
              </TabsList>
              <TabsContent value="personal-info">
                <ProfileForm userInfo={userInfo}/>
              </TabsContent>
              <TabsContent value="orders">
                <OrderHistory
                orders={formattedOrders}
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SettingsPage