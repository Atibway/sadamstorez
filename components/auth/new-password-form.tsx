"use client"

import { CardWrapper } from "./card-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { NewPasswordSchema } from "@/schemas"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"

import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { newPassword } from "@/actions/new-password"



export const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
resolver: zodResolver(NewPasswordSchema),
defaultValues:{
  password: "",
}
  })

  const onSubmit=(values: z.infer<typeof NewPasswordSchema>)=>{
    setError("")
    setSuccess("");


    startTransition(()=> {
      newPassword(values, token).then((data)=> {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })

  }

  return (
    <CardWrapper
    headerLabel="Enter Your New Password"
    backButtonLabel="Back to login"
    backButtonHref="/auth/login"
    >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input 
                disabled={isPending}
                type="password"
                placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error}/>
        <FormSuccess message={success}/>

        <Button 
        disabled={isPending}
        type="submit"
        className="w-full"
        >
          Reset Password
        </Button>
      </form>
    </Form>

    </CardWrapper>
  )
}
