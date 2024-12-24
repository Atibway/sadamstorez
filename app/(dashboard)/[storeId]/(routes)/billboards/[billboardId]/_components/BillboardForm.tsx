"use client";
import { Billboard, BillboardImages } from "@prisma/client";
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

import Image from "next/image";
import { BillboardImagesForm } from "../../_components/billboardFormImages-form";

const formSchema = z.object({
  label: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
  initialData: Billboard & {BillboardImages: BillboardImages[]} | null;
}

const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
 

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit billboard" : "Add a new billboard";
  const toastMessage = initialData
    ? "Billboard updated."
    : "Billboard Created.";
  const action = initialData ? "Save changes" : "Create ";

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
    },
  });

  const onSubmit = async (data: BillboardFormValues) => {
    try {
        setLoading(true);
        if(initialData){
            await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data).then(()=> {
              window.location.reload()
            })
          } else {
            await axios.post(`/api/${params.storeId}/billboards`, data).then((res)=>{
            router.push(`/${params.storeId}/billboards/${res.data.id}`);
          });
        }

         
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
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
      router.refresh();
      toast.success("Billboard Deleted");
    } catch (error) {
      toast.error("Make sure you removed all categories using this billboard first");
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8 ddr">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
                      {...field}
                    />
                  </FormControl>
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
      <BillboardImagesForm initialData={initialData}/>
      )}
    </>
  );
};

export default BillboardForm;
