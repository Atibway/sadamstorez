import React from 'react';
import { Prisma } from "@/generated/prisma/client";
import { db as prismadb } from "@/lib/prismadb";
import { OrderColumn } from './_components/columns';
import { format } from "date-fns";
import { formatter } from '@/lib/utils';
import OrderClient from './_components/Client';

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

const OrderPage = async () => {
  const orders = await prismadb.order.findMany({
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
    user: item.user.name,
    phone: item.user.phone,
    city: item.user.city,
    country: item.user.country,
    delivered: item.delivered,
    products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    totalPrice: formatter.format(item.orderItems.reduce((total, orderItem) => {
      return total + Number(orderItem.product.price) * orderItem.quantity;
    }, 0)),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-6 '>
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrderPage;
