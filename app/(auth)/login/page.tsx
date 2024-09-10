
 "use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
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
import { loginSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState, useTransition } from "react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { signIn } from "next-auth/react"
import Link from "next/link";
import { login } from "@/actions/login";


export function LoginForm() {

    const [isPending, startTransition] = useTransition();

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    
    const onClick = (provider: "google" | "github") => {
      // signIn(provider, {
      //   callbackUrl: DEFAULT_LOGIN_REDIRECT,
      // });
    };

    function onSubmit(values: z.infer<typeof loginSchema>) {
      startTransition(() => {
        setError("");
        setSuccess("");
          login(values).then((data) => {
              if (data?.error) {
form.reset()
                  setError(data?.error);
              }
              if (data?.success) {
                  form.reset()
                  setSuccess(data?.success);
              }

      }).catch(()=> setError("Something went wrongg"))
    });
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="mt-40">

    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription>
        Enter your email and password below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} >
  <div className="grid gap-4">

<FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-2">

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
</div>


                      </FormItem>
                    )}
                  />


<FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid gap-2">
<div className="flex items-center">

  
                        <FormLabel>Password</FormLabel>
                        <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
</div>
                        <FormControl>
                        <Input
                            disabled={isPending}
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
</div>
                      </FormItem>
                    )}
                  />
<Button  className="w-full">
            Login
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
          You have an account?{" "}
          <Link href="/signup" className="underline">
            Sign Up
          </Link>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

export default LoginForm


