'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { OrderHistory } from './order-history'
import { ShippingAddresses } from './shipping-addresses'
import { PaymentMethods } from './payment-methords'
import { PersonalInfo } from './persona-info'
import { OrderColumn } from './orders/columns'
import ProductTracking from './order-tracking'

export default function ManageAccount({
  orders
}:{
  orders: OrderColumn[]
}) {
  const [activeTab, setActiveTab] = useState("personal-info")

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Manage Your Account</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payment">Track Item</TabsTrigger>
        </TabsList>
        <TabsContent value="personal-info">
          <PersonalInfo />
        </TabsContent>
        <TabsContent value="orders">
          <OrderHistory
          orders={orders}
          />
        </TabsContent>
        <TabsContent value="addresses">
          <ShippingAddresses />
        </TabsContent>
        <TabsContent value="payment">
          <ProductTracking />
        </TabsContent>
      </Tabs>
    </div>
  )
}

