"use client"

import * as z from "zod"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useState } from "react"
import {  ImageIcon, Loader2, PlusCircle, Trash2 } from "lucide-react"
import {  Billboard, BillboardImages } from "@prisma/client"
import { FileUpload } from "@/components/file-upload"
import Image from "next/image"



const formSchema = z.object({
    url: z.string().min(1),
    });

interface  BillboardImagesFormProps {
    initialData: Billboard & {BillboardImages: BillboardImages[]} | null;
}

export const BillboardImagesForm = ({
    initialData
}: BillboardImagesFormProps) => {
const [isEditing, setIsEditing] = useState(false)
const[deletingId, setDeletingId] = useState<string | null>(null)
const router = useRouter()
const toggleEdit = ()=> setIsEditing((current)=> !current)

      const onSubmit = async (values: z.infer< typeof formSchema>)=> {
try {
  await axios.post(`/api/${initialData?.storeId}/billboards/${initialData?.id}/billbordimages`, values);
  toast.success('Image updated');
  toggleEdit()
  router.refresh()
} catch (error) {
  toast.error("Something went wrong")
}

        }
      const onDelete = async (id: string)=> {
try {
  setDeletingId(id)
  await axios.delete(`/api/${initialData?.storeId}/billboards/${initialData?.id}/billbordimages/${id}`);
  
  toast.success('Image Deleted');
  
  router.refresh()
} catch (error) {
  toast.error("Something went wrong")
} finally{
  setDeletingId(null)
}

        }
  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-700 rounded-md p-4">
<div className="font-medium flex items-center justify-between ">
  Billboard Images
<Button onClick={toggleEdit} variant={"ghost"}>
  {isEditing && (
    <>
    Cancel
    </>
  )}
{!isEditing && (initialData?.BillboardImages?.length ?? 0) >= 0 && (
  <>
    <PlusCircle className="h-4 w-4 mr-2" />
    Add Image
  </>
)}

  
</Button>
</div>

{!isEditing && (
 <>
 {initialData?.BillboardImages.length === 0 && (
  <div className="flex items-center justify-center h-60 bg-sky-200 rounded-md">
  <ImageIcon className="h-10 w-10 text-sky-500"/>
</div>
 )}
 </>
)}

{!isEditing  && (
  
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {initialData?.BillboardImages.map((image) => (
    <div key={image.id} className="relative p-2 bg-white shadow rounded-md">
      <div className="relative aspect-square mt-2">
        <Image
          alt="courseImage"
          fill
          className="object-cover rounded-md"
          src={image.url}
        />
      </div>
      {deletingId === image.id && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-md">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
      {deletingId !== image.id && (
        <Button
          onClick={() => onDelete(image.id)}
          className="absolute top-2 right-2 hover:opacity-75 hover:bg-slate-600 transition"
          variant="ghost"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      )}
    </div>
  ))}
</div>

)}
{isEditing && (
  <div>

  <FileUpload
   endpoint="courseImage"
  onChange={(url)=> {
    if(url){
      onSubmit({url: url})
    }
  }}
  />

<div className="text-xs text-muted-foreground mt-4">
    16:9 aspect ratio recommended
  </div>
  </div>
)}
    </div>
  )
}
