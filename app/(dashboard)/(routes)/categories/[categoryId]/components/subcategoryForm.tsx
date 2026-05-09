"use client";

import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { File, Loader2, PlusCircle, Trash2, Edit } from "lucide-react";
import { Category, Subcategory } from "@prisma/client";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1),
});

interface SubcategoryFormProps {
  initialData: (Category & { subcategories: Subcategory[] }) | null;
}

export const SubcategoryForm = ({ initialData }: SubcategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const toggleEdit = () => {
    setIsEditing((current) => !current);
    if (isEditing) {
      form.reset({ name: "" });
      setEditingId(null);
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    try {
      if (editingId) {
        await axios.patch(`/api/${initialData?.storeId}/categories/${initialData?.id}/subcategories/${editingId}`, values);
        toast.success("Subcategory Updated");
      } else {
        await axios.post(`/api/${initialData?.storeId}/categories/${initialData?.id}/subcategories`, values);
        toast.success("Subcategory Created");
      }
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/${initialData?.storeId}/categories/${initialData?.id}/subcategories/${id}`);
      toast.success("Subcategory Deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  const onEdit = (subcategory: Subcategory) => {
    form.setValue("name", subcategory.name);
    setEditingId(subcategory.id);
    setIsEditing(true);
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-700 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Subcategory
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? "Cancel" : (initialData?.subcategories?.length ?? 0) >= 0 && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add more
            </>
          )}
        </Button>
      </div>

      {!isEditing && initialData?.subcategories.length === 0 && (
        <p className="text-sm mt-2 text-slate-500 dark:text-muted-foreground italic">No subcategories yet</p>
      )}

      {!isEditing && (
        <div className="space-y-2">
          {initialData?.subcategories.map((subcategory) => (
            <div key={subcategory.id} className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md">
              <File className="h-4 w-4 mr-2 flex-shrink-0" />
              <p className="text-xs line-clamp-1">{subcategory.name}</p>
              {deletingId === subcategory.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Button onClick={() => onEdit(subcategory)} className="ml-auto hover:opacity-75 transition" variant="ghost">
                    <Edit className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button onClick={() => onDelete(subcategory.id)} className="ml-2 hover:opacity-75 transition" variant="ghost">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Subcategory name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {editingId ? "Update" : "Create"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
