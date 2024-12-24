"use client";

import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import Currency from "@/components/frontentend/components/ui/Currency";
import { useEffect, useState } from "react";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Summary from "./Summary";
import { Product2 } from "@/types";

interface CartItemProps {
  products: Product2[];
}

export const CartItem: React.FC<CartItemProps> = ({ products }) => {
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onRemove = (productId: string) => {
    cart.removeItem(productId);
  };

  const handleQuantityChange = (quantity: number, productId: string) => {
    cart.updateQuantity(quantity, productId);
  };

  return (
    <div className="grid gap-4">
      {cart.items.map((data) => {
        const productInCartFromDb = products.find((product) => product.id === data.id);
        const totalPrice = productInCartFromDb
          ? Number(data.price) * (data.countInStock || 1)
          : 0;

        const isOutOfStock =
          productInCartFromDb?.isArchived || productInCartFromDb?.countInStock === 0;

        return (
          <div key={data.id} className="flex items-center bg-white dark:bg-gray-800 shadow rounded-lg p-4">
            <div className="relative h-24 w-24">
              <Image
                src={data.images?.[0]?.url || "/placeholder-image.png"} // Fallback image
                alt={data.name}
                height={100}
                width={100}
                className="rounded object-cover"
              />
            </div>
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{data.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Price: <Currency value={Number(data.price)} />
              </p>
              <div className="flex items-center space-x-2 mt-2">
                {isOutOfStock ? (
                  <p className="text-red-500">Out of Stock</p>
                ) : (
                  <select
                    value={data.countInStock}
                    onChange={(e) => handleQuantityChange(Number(e.target.value), data.id)}
                    className="p-2 w-[4rem] border border-slate-800 rounded-lg text-black"
                  >
                    {Array.from(
                      { length: productInCartFromDb?.countInStock || 1 },
                      (_, i) => i + 1
                    ).map((x) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                )}
                <Button
                  className="bg-white"
                  onClick={() => onRemove(data.id)}
                >
                  <Trash2Icon className="h-4 w-4 text-red-500" />
                  <span className="sr-only">Remove Item</span>
                </Button>
              </div>
              <p className="text-right text-gray-900 dark:text-white">
                Total: <Currency value={totalPrice} />
              </p>
            </div>
          </div>
        );
      })}
      <Summary />
    </div>
  );
};
