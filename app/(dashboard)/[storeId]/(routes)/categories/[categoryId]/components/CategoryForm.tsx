"use client";
import { Billboard, Category, Subcategory } from "@prisma/client";
import { Trash } from "lucide-react";
import React, { useState } from "react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui1/form1";
import { Input } from "@/components/ui1/input";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/models/AlertModel";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui1/select";
import { FormDescription } from "@/components/ui/form";
import { SubcategoryForm } from "./subcategoryForm";

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
  icon: z.string().min(1, {
    message: "Icon is required.",
  }),
  subcategories: z
    .array(
      z.object({
        name: z.string().min(2, {
          message: "Subcategory name must be at least 2 characters.",
        }),
      })
    )
    .optional(),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData:
    | (Category & {
        subcategories: Subcategory[];
      })
    | null;
  billboards: Billboard[];
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, billboards }) => {
 

  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit category" : "Add a new category";
  const toastMessage = initialData ? "Category updated." : "Category created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      billboardId: initialData?.billboardId || "",
      icon: initialData?.icon || "",
      subcategories: initialData?.subcategories || [],
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);



      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        ).then(()=> {
          window.location.reload()
        })
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data) .then((res)=> {
          router.push(`/${params.storeId}/categories/${res.data.id}`);
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
      await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Category Deleted");
    } catch (error) {
      toast.error("Make sure you removed all products using this category first");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Billboard" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
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
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="smartphone"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the icon name (e.g., smartphone, tv, home).
                  </FormDescription>
                  <FormMessage />
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
        <SubcategoryForm initialData={initialData}/>
  )}
    </>
  );
};

export default CategoryForm;
