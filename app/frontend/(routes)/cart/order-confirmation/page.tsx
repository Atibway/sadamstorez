"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "lucide-react"; // Assuming you have heroicons installed
import { useEffect } from "react";
import { useCart } from "@/hooks/use-cart";

const OrderConfirmationPage: React.FC = () => {
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    removeAll();
  }, [removeAll]);

  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
      <div className="flex items-center mb-4">
        <CheckCircleIcon className="h-12 w-12 text-green-500" />
        <h1 className="text-3xl font-bold ml-2 text-green-500">Order Confirmed</h1>
      </div>
      <div className="bg-green-100 dark:text-slate-900 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Thank you for your order!</h2>
        <p className="mb-4">Your order has been placed successfully. We will process it soon.</p>
        <Link href="/frontend">
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
