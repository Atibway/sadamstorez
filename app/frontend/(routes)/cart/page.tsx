
import {CartHome}from './_components/CartHome'
import getProducts from '@/actions/get-products'

const CartPage =async()=>{

    const products = await getProducts({isFeatured: true})
  return (
    <div>
        <CartHome
        products = {products}
        />
    </div>
  )
}

export default CartPage