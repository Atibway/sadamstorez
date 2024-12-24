'use client';

import { Product } from '@/types';
import React from 'react';
import Currency from './ui/Currency';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Preview } from './preview';
import { ShareButton } from '@/app/frontend/(routes)/favorites/_components/ShareButton';

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onClick = () => {
    cart.addItem(data);
  };

  return (
    <div className="p-4 bg-white dark:bg-slate-900 dark:text-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-primary-foreground">{data.name}</h1>
        <p className="text-2xl text-gray-900 dark:text-primary-foreground">
          <Currency value={data.price} />
        </p>
      </div>

      <hr className="my-4 dark:border-primary-foreground" />

      <Preview  value={data.description as string} />

      <hr className="my-4 dark:border-primary-foreground" />

      <div className="flex justify-between dark:text-primary-foreground items-center">
        <div className="grid grid-cols-2">
          <div className="flex items-center gap-x-2">
            <h3 className="font-semibold text-black dark:text-primary-foreground">Size:</h3>
            <p className="mr-2">{data.size?.name}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <h3 className="font-semibold text-black dark:text-primary-foreground">Color:</h3>
            <div
              className="h-6 w-6 rounded-full border border-gray-600 dark:border-primary-foreground"
              style={{ backgroundColor: data.color?.value }}
            />
          </div>
          <div className="flex items-center gap-x-2">
            {data.countInStock === 0 ? (
              <p className="font-bold bg-red-500 text-white rounded-full px-3">
                Out Of Stock
              </p>
            ) : (
              <>
                <p>In Stock:</p>
                <p>{data.countInStock}</p>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <Button
            disabled={data.countInStock === 0}
            onClick={onClick}
            className="flex items-center gap-x-2 mb-1"
          >
            <ShoppingCart />
          </Button>
          <ShareButton
            url={`/frontend/product/${data.id}`}
            title={data.name}
            text="Check Our Amazing Product"
          />
        </div>
      </div>
    </div>
  );
};

export default Info;
