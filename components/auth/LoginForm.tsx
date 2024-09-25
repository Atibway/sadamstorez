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
import { LoginSChema } from "@/schemas"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { login } from "@/actions/login"
import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"


export const LoginForm = () => {
  const searchParams = useSearchParams()
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"? "Email already in use with a different provider": "";
  const callbackUrl =searchParams.get("callbackUrl")
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
 

  const form = useForm<z.infer<typeof LoginSChema>>({
resolver: zodResolver(LoginSChema),
defaultValues:{
  email: "",
  password: "",
  code: ""
}
  })

  const onSubmit=(values: z.infer<typeof LoginSChema>)=>{
    setError("")
    setSuccess("");

    startTransition(()=> {
      login(values, callbackUrl)
      
      .then((data)=> {
       if(data?.error){
        form.reset();
        setError(data.error)
       }

       if(data?.success){
setSuccess(data.success)

       }
       if(data?.twoFactor){
        setShowTwoFactor(true)
       }
      })
    })
    

  }

  return (
    <CardWrapper
    headerLabel="Welcome back"
    backButtonLabel="Don't have an account?"
    backButtonHref="/auth/register"
    showSocial
    >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
{showTwoFactor && (
  <FormField
  control={form.control}
  name="code"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Two Factor Code</FormLabel>
      <FormControl>
        <Input 
        disabled={isPending}
        placeholder="123456" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
)}
        {!showTwoFactor && (
<>

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
        placeholder="********"
         {...field} />
      </FormControl>
      <FormMessage />
      <Button
      size={"sm"}
      variant={"link"}
      asChild
      className="px-0 font-normal"
      >
        <Link href={"/auth/reset"}>
        Forgot password?
        </Link>
      </Button>
      
    </FormItem>
  )}
/>
</>
        )}
        <FormError message={error  || urlError}/>
        <FormSuccess message={success}/>

        <Button 
        disabled={isPending}
        type="submit"
        className="w-full"
        >
          {showTwoFactor? "Confirm": "Login"}
        </Button>
      </form>
    </Form>

    </CardWrapper>
  )
}
