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
import { RegisterSchema } from "@/schemas"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { useState, useTransition } from "react"
import { register } from "@/actions/register"


export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const form = useForm<z.infer<typeof RegisterSchema>>({
resolver: zodResolver(RegisterSchema),
defaultValues:{
  email: "",
  password: "",
  name:""
}
  })

  const onSubmit=(values: z.infer<typeof RegisterSchema>)=>{
    setError("")
    setSuccess("");

    startTransition(()=> {
      register(values).then((data)=> {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })

  }

  return (
    <CardWrapper
    headerLabel="Create an account"
    backButtonLabel="Already have an account?"
    backButtonHref="/auth/login"
    showSocial
    >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                disabled={isPending}
                placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                disabled={isPending}
                type="email"
                placeholder="Enter your Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
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
        >Create an account</Button>
      </form>
    </Form>

    </CardWrapper>
  )
}
