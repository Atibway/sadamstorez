"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState, useTransition } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { SignUp } from "@/actions/register"

const description =
"A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account"


export function RegisterForm() {

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  
  const onClick = (provider: "google" | "github") => {
    // signIn(provider, {
    //   callbackUrl: DEFAULT_LOGIN_REDIRECT,
    // });
  };

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    startTransition(() => {
      setError("");
      setSuccess("");
    SignUp(values).then((data) => {
      data?.success
        setError(data?.error);
        setSuccess(data?.success);
    });
  });
}

  return (
    <Card className="mx-auto max-w-sm mt-10">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} >
  <div>

<FormField
control={form.control}
name="firstName"
render={({field})=> (
  <FormItem>
    <FormLabel>
    First name
    </FormLabel>
    <FormControl>
      <Input
       disabled={isPending}
placeholder="Your First name"
{...field}
      />
    </FormControl>
    <FormMessage/>
  </FormItem>
)}
/>
<FormField
control={form.control}
name="lastName"
render={({field})=> (
  <FormItem>
    <FormLabel>
    Last name
    </FormLabel>
    <FormControl>
      <Input
       disabled={isPending}
placeholder="Your Last Name"
{...field}
      />
    </FormControl>
    <FormMessage/>
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
                            placeholder="Enter your user email"
                            {...field}
                          />
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
                            placeholder="Enter your Password"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
<Button  className="w-full mt-4">
            Register
          </Button>
  
  </div>
</form>
        </Form>

        <CardDescription className="m-3">
          {`  You may also Login with`}
        </CardDescription>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => onClick("google")}
            className="w-[8rem] mr-2"
            variant="outline"
          >
             <FcGoogle size={30} />
          </Button>
          OR
          <Button onClick={() => onClick("github")} className="ml-2">
          <FaGithub className="w-[7rem]" size={30} />
          </Button>
        </CardFooter>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}


export default RegisterForm;


