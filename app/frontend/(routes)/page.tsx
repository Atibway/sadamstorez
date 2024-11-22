import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/frontentend/components/Billboard";
import ProductList from "@/components/frontentend/components/ProductList";
import { Container } from "@/components/frontentend/components/ui/Container";


export const revalidate = 0

export default async function HomePage() {
  const billboard = await getBillboard("948d4450-c148-4153-b3b7-7aba179ea708")
  const products = await getProducts({isFeatured: true})
  
  return (
   <Container >
    <div className ="space-y-10 pb-10">
<Billboard
data={billboard}
/>
    <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
      <ProductList title="Featured Products" items={products}/>
    </div>
    </div>
   </Container>
  );
}
