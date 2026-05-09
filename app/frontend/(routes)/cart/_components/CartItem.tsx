"use client";

import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import Currency from "@/components/frontentend/components/ui/Currency";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Summary from "./Summary";
import { ProductSummary } from "@/types";

interface CartItemProps {
  products: ProductSummary[];
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
    <div className="grid gap-gutter">
      {cart.items.map((data) => {
        const productInCartFromDb = products.find((product) => product.id === data.id);
        const totalPrice = productInCartFromDb
          ? Number(data.price) * (data.countInStock || 1)
          : 0;

        const isOutOfStock =
          productInCartFromDb?.isArchived || productInCartFromDb?.countInStock === 0;

        return (
          <div key={data.id} className="flex items-center bg-surface-container-lowest shadow-sm rounded-xl p-stack-md border border-outline-variant/10">
            <div className="relative h-24 w-24 shrink-0">
              <Image
                src={data.images?.[0]?.url || "/placeholder-image.png"}
                alt={data.name}
                height={100}
                width={100}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="ml-stack-md flex-1 min-w-0">
              <h2 className="font-h4 text-h4 text-primary truncate">{data.name}</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Price: <Currency value={Number(data.price)} />
              </p>
              <div className="flex items-center gap-stack-sm mt-stack-md">
                {isOutOfStock ? (
                  <p className="font-body-sm text-body-sm text-error">Out of Stock</p>
                ) : (
                  <select
                    value={data.countInStock}
                    onChange={(e) => handleQuantityChange(Number(e.target.value), data.id)}
                    className="p-2 w-[4rem] bg-surface border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-accent"
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
                  variant="ghost"
                  className="bg-transparent hover:bg-surface-container-low"
                  onClick={() => onRemove(data.id)}
                >
                  <Trash2 className="h-4 w-4 text-error" />
                  <span className="sr-only">Remove Item</span>
                </Button>
              </div>
              <p className="text-right font-body-md text-body-md text-on-surface mt-stack-md">
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
