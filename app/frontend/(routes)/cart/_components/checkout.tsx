"use client";

import { checkout } from "@/actions/checkout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfileUpdateSchema } from "@/schemas";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { useCart } from "@/hooks/use-cart";

export const ProfileUpdateOrProceedPage = ({ userInfo }: { userInfo: User | null }) => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const user = useCurrentUser();
  const router = useRouter();
  const cartItems = useCart((state)=> state.items)

  const form = useForm<z.infer<typeof ProfileUpdateSchema>>({
    resolver: zodResolver(ProfileUpdateSchema),
    defaultValues: {
      name: userInfo?.name || "",
      phone: userInfo?.phone || "",
      city: userInfo?.city || "",
      country: userInfo?.country || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ProfileUpdateSchema>) => {
    startTransition(() => {
      checkout(values, cartItems)  // Pass cart items along with values
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
            router.push('/frontend/cart/order-confirmation');
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <Card className="">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Checkout</p>
        <p className="text-xl font-semibold text-muted-foreground text-center">
          {user && (userInfo?.phone && userInfo?.city && userInfo?.country)
            ? "Your information is complete. Please review and proceed."
            : "Please update your profile information to proceed with the order."}
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
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Phone Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="City"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Country"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              {user && (userInfo?.phone && userInfo?.city && userInfo?.country) ? "Proceed to Confirm Order" : "Save and Proceed"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
