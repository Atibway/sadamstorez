"use client"
import { useEffect, useState } from 'react';
import { CartHome } from './_components/CartHome';
import { Product2 } from '@/types';
import { AllProducts } from '@/actions/get-all-products';
import { PacmanLoader } from 'react-spinners';

const CartPage = () => {
  const [products, setProducts] = useState<Product2[]>([]);
  const [loading, setLoading] = useState(true);

  // Define the getAllProducts function before using it in useEffect
  const getAllProducts = async () => {
    await AllProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false); // You may want to handle errors more gracefully
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PacmanLoader color={"orange"} loading={loading} size={25} margin={2} />
      </div>
    );
  }

  return (
    <div>
      <CartHome products={products} />
    </div>
  );
};

export default CartPage;
