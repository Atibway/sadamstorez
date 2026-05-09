
import OrderClient from "./orders/Client"
import { OrderColumn } from "./orders/columns"
  
  
  export function OrderHistory({
    orders
  }:{
    orders: OrderColumn[]
  }) {
    return (
      <div>
        <h2 className="font-h3 text-h3 text-primary mb-stack-lg">Order History</h2>
        <OrderClient
data={orders}
/>
      </div>
    )
  }
  
  