
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderHistory } from './order-history'
import { OrderColumn } from './orders/columns'
import ProductTracking from './order-tracking'
import { ProfileForm } from "@/app/dashboard/profile/_components/profileForm"

export default function ManageAccount({
  orders,
  userInfo
}:{
  orders: OrderColumn[],
  userInfo: any
}) {
  

  return (
    <div className="max-w-container-max mx-auto py-section-padding px-margin-mobile md:px-margin-desktop">
      <h1 className="font-h1 text-h1 text-primary mb-stack-lg">Manage Your Account</h1>
      <Tabs defaultValue="personal-info" className="space-y-stack-lg">
        <TabsList className="bg-surface-container-low border border-outline-variant/20">
          <TabsTrigger value="personal-info" className="font-body-sm text-body-sm">Profile</TabsTrigger>
          <TabsTrigger value="orders" className="font-body-sm text-body-sm">Orders</TabsTrigger>
          {/* <TabsTrigger value="tracking">Track Item</TabsTrigger> */}
        </TabsList>
        <TabsContent value="personal-info">
          <ProfileForm userInfo={userInfo}/>
        </TabsContent>
        <TabsContent value="orders">
          <OrderHistory
          orders={orders}
          />
        </TabsContent>
        <TabsContent value="tracking">
          <ProductTracking />
        </TabsContent>
      </Tabs>
    </div>
  )
}

