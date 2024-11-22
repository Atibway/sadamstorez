"use client"

import { settings } from "@/actions/settings"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useSession } from "next-auth/react"
import { useState, useTransition } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {  SettingsSchema } from "@/schemas"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { useCurrentUser } from "@/hooks/use-current-user"




const SettingPage = () => {
   const {update}= useSession()
  const [isPending] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  
  const user = useCurrentUser()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues:{
      name: user?.name || undefined
    }
      })
const onSubmit = (values: z.infer<typeof SettingsSchema>)=> {
  settings(values)
  .then((data)=> {
    if(data.error){
      setError(data.error)
    }

    if(data.success){
      update()
      setSuccess(data.success)
    }
  })
  .catch(()=> setError("Something went wrong"))
}
  return (
    <Card className="">
<CardHeader>
  <p className="text-2xl font-semibold text-center">
⚙ Settings
  </p>
  <p className="text-xl font-semibold text-muted-foreground text-center">
Manage Your User Name
  </p>
 
</CardHeader>
<CardContent>
<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                disabled={isPending}
                placeholder="john Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <FormError message={error}/>
        <FormSuccess message={success}/>

        <Button 
        disabled={isPending}
        type="submit"
        className="w-full"
        >
          Save
        </Button>
      </form>
    </Form>
</CardContent>
    </Card>
  )
}

export default SettingPage