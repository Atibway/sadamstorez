import getProduct from '@/actions/get-Product';
import getProducts from '@/actions/get-products';
import Gallery from '@/components/frontentend/components/Gallery';
import Info from '@/components/frontentend/components/Info';
import ProductList from '@/components/frontentend/components/ProductList';
import { Container } from '@/components/frontentend/components/ui/Container';
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui1/dropdown-menu";
import { db } from '@/lib/prismadb';
import Link from 'next/link';
  


interface ProductPageProps {
    params: {
        productId: string;
    }
}

const ProductPage: React.FC<ProductPageProps> = async({
    params
}) => {
    const product = await getProduct(params.productId)
    const product1 = await db.product.findUnique({
        where:{
            id: params.productId
        }
    })
    const suggestedProducts = await getProducts({
        categoryId: product?.category?.id
    })

    const categories = await db.category.findMany({
        include: {
          billboard: {
            include: {
              BillboardImages: true,
            },
          },
          subcategories: true,
        },
      });

      const category = await db.category.findUnique({
        where:{
            id:product.category.id
        },
        include:{
            subcategories: true
        }
      })

      const subcategory = await db.subcategory.findUnique({
        where:{
            id: product1?.subcategoryId
        }
      })

  return (
    <>
    <div className="m-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/frontend">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {categories?.map((item) => (
                    <div key={item.id}>
                      <Link href={`/frontend/category/${item.id}/`}>
                        <DropdownMenuItem>{item.name}</DropdownMenuItem>
                      </Link>
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/frontend/category/${category?.id}`}>
                {category?.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {subcategory && (
                <>
            <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {category?.subcategories?.map((item)=>(
                <div key={item.id}>
                  <Link href={`/frontend/category/${category.id}/${item.id}`}>
                  
                  <DropdownMenuItem>{item.name}</DropdownMenuItem>
                  </Link>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <Link href={`/frontend/category/${category?.id}/${subcategory?.id}`}>
              <BreadcrumbPage>{subcategory?.name}</BreadcrumbPage>
            </Link>
            </BreadcrumbItem>
                </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    <div className='bg-white dark:bg-background'>
<Container>
    <div className="px-4 py-10 sm:px-6 lg:gap-x-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-0">
            {/* Gallery */}
           <Gallery  images= {product.images}/>
            <div className="mt-10 px-4 sm:mt-16 sm:px0 lg:mt-0">
                {/* info */}
                <Info data ={product}/>
            </div>
        </div>
        <hr className='my-10' />
        <ProductList title='Related Items' items={suggestedProducts}/>
    </div>
</Container>
    </div>
    </>
  )
}

export default ProductPage