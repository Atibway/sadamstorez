import React from 'react'
import { LogIn } from 'lucide-react';
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/prismadb'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ManageAccount from './_components/Home-settings-page'
import { Prisma } from "@/generated/prisma/client";
import { OrderColumn } from './_components/orders/columns'
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

const SettingsPage = async() => {
  const user = await currentUser()

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
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-padding">
        <ManageAccount orders={formattedOrders} userInfo={userInfo} />
      </main>
    </div>
  )
}

export default SettingsPage