"use client";

import { delivery } from "@/actions/mark-as-delivered";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCheck, Circle, XCircle } from "lucide-react";
import toast from "react-hot-toast";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  delivered: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  
  {
    accessorKey: "id",
    header: "Order Id",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell:({row})=> (
      <div>
        {row.original.isPaid? (
          <div className="flex items-center text-on-surface-container bg-surface-container-high rounded-full px-3 py-1 font-label-caps text-label-caps font-medium">
        <CheckCheck className="mr-2 h-4 w-4" />
        Paid
      </div>
        ):(
<div className="flex items-center text-error bg-error-container rounded-full px-3 py-1 font-label-caps text-label-caps font-medium">
      <XCircle className="mr-2 h-4 w-4" />
      Not Paid
    </div>
        )}
      </div>
    )
    },
  {
    accessorKey: "delivered",
    header: "Delivery Status",
    cell:({row})=> {
      return (
        <div className="">
{row.original.delivered? (
   <button
   className="text-on-surface-container bg-surface-container-high hover:bg-surface-container-highest px-3 py-1 rounded-full font-label-caps text-label-caps font-medium transition-colors"
 >
   <CheckCheck className="mr-2 h-4 w-4" />
   Delivered
 </button>
):(
  <button
      className="text-accent bg-surface-container-low hover:bg-surface-container px-3 py-1 rounded-full font-label-caps text-label-caps font-medium transition-colors"
    >
      <Circle className="mr-2 h-4 w-4" />
      Not Delivered
    </button>
)}

      </div>
      )
    }
    },
    

];
