"use client";
import {Category, Color, Image, Product, Size, Subcategory } from "@prisma/client";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui1/button";
import Heading from "@/components/ui1/Heading";
import { Separator } from "@/components/ui1/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui1/form1";
import { Input } from "@/components/ui1/input";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/models/AlertModel";

import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui1/image-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui1/select";

import { Checkbox } from "@/components/ui1/checkbox";

const formSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(1),
  priceDiscount: z.coerce.number().optional(),
  countInStock: z.coerce.number(),
  categoryId: z.string().min(1),
  subcategoryId: z.string().min(1),
  colorId: z.string().min(1),
  sizeId: z.string().min(1),
  description: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional()
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: Product & {
    images: Image[]
  } | null;
  categories: (Category & { subcategories: Subcategory[]; })[];
  sizes: Size[];
  colors: Color[]
}
import { Editor } from "@/components/editor";
import { ProductImagesForm } from "./Productmages-form";
const ProductForm: React.FC<ProductFormProps> = ({ initialData,
  categories,
  sizes,
  colors,
 }) => {
  const params = useParams();
  const router = useRouter();
  

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<(Category & { subcategories: Subcategory[]; })>()
  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit product" : "Add a new product";
  const toastMessage = initialData
    ? "Product updated."
    : "Product Created.";
  const action = initialData ? "Save changes" : "Create ";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData? {
...initialData,
price: parseFloat(String(initialData?.price)),
    }: {
      name: "",
      price: 0,
      priceDiscount: 0,
      categoryId: "",
      subcategoryId:"",
      colorId: "",
      sizeId: "",
      countInStock: 0,
      description: "",
      isFeatured:false,
      isArchived:false
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
        setLoading(true);
        if(initialData){
            await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data).then(()=>{
              window.location.reload()
            })
        } else {
          await axios.post(`/api/${params.storeId}/products`, data).then((res)=>{
            router.push(`/${params.storeId}/products/${res.data.id}`);
          })
        }
        router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
     router.push(`/${params.storeId}/products`);
      toast.success("Product Deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => { if (initialData && initialData.categoryId) { const selectedCategory = categories.find(category => category.id === initialData.categoryId); setSelectedCategory(selectedCategory as (Category & { subcategories: Subcategory[]; })); } }, [initialData, categories])

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant={"destructive"}
            size={"icon"}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                  <Editor
  {...field}
  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="countInStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Count In Stock</FormLabel>
                  <FormControl>
                    <Input
                    type="number"
                      disabled={loading}
                      placeholder="1..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-x-2">

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                    type="number"
                      disabled={loading}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priceDiscount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Discount</FormLabel>
                  <FormControl>
                    <Input
                    type="number"
                      disabled={loading}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
<FormField
  control={form.control}
  name="categoryId"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Category</FormLabel>
      <Select
        disabled={loading}
        onValueChange={(value) => {
          field.onChange(value);
          const selectedCategory = categories.find(category => category.id === value);
          setSelectedCategory(selectedCategory as (Category & { subcategories: Subcategory[]; }));
        }}
        value={field.value}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue defaultValue={field.value} placeholder="Select a Category" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {categories?.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

{(selectedCategory?.subcategories?.length ?? 0)>= 0 && (
  <FormField
    control={form.control}
    name="subcategoryId"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Subcategory</FormLabel>
        <Select
          disabled={loading}
          onValueChange={field.onChange}
          value={field.value }
          defaultValue={field.value }
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue defaultValue={field.value} placeholder="Select a Subcategory" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {selectedCategory?.subcategories.map((subcategory) => (
              <SelectItem key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
)}

</div>



<FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                  >
<FormControl>
  <SelectTrigger>
    <SelectValue
    defaultValue={field.value}
    placeholder="Select a Size"
    />
  </SelectTrigger>
</FormControl>
<SelectContent>
{sizes?.map((size)=> (
  <SelectItem
  key={size.id}
  value={size.id}
  >
{size.name}
  </SelectItem>
))}
</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
<FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                  >
<FormControl>
  <SelectTrigger>
    <SelectValue
    defaultValue={field.value}
    placeholder="Select a Color"
    />
  </SelectTrigger>
</FormControl>
<SelectContent>
{colors?.map((color)=> (
  <SelectItem
  key={color.id}
  value={color.id}
  >
{color.name}
  </SelectItem>
))}
</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                    checked={field.value}
                    //@ts-ignoreon
                    onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <div className="space-y-1 leading-none">
<FormLabel>
  Featured
</FormLabel>
<FormDescription>
  This product will appear on the home page
</FormDescription>
                  </div>
                </FormItem>
              )}
            />


<FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                    checked={field.value}
                    //@ts-ignoreon
                    onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <div className="space-y-1 leading-none">
<FormLabel>
  Archived
</FormLabel>
<FormDescription>
  This product will not appear anywhere in the store
</FormDescription>
                  </div>
                </FormItem>
              )}
            />


          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
 {initialData && (
      <ProductImagesForm initialData={initialData}/>
      )}
    </>
  );
};

export default ProductForm;
