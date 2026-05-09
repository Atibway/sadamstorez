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
import { User } from "@/generated/prisma/client";
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
      checkout(values, cartItems)
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
    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 p-section-padding">
      <div className="mb-stack-lg pb-stack-sm border-b border-outline-variant/20">
        <h2 className="font-h2 text-h2 text-primary text-center">Checkout</h2>
        <p className="font-body-md text-body-md text-on-surface-variant text-center mt-stack-sm">
          {user && (userInfo?.phone && userInfo?.city && userInfo?.country)
            ? "Your information is complete. Please review and proceed."
            : "Please update your profile information to proceed with the order."}
        </p>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-stack-lg">
            <div className="space-y-stack-lg">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-label-caps text-label-caps text-on-surface-variant">Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="John Doe"
                        className="bg-surface-container-low border-outline-variant/30 focus:border-accent"
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
                    <FormLabel className="font-label-caps text-label-caps text-on-surface-variant">Phone</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Phone Number"
                        className="bg-surface-container-low border-outline-variant/30 focus:border-accent"
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
                    <FormLabel className="font-label-caps text-label-caps text-on-surface-variant">City</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="City"
                        className="bg-surface-container-low border-outline-variant/30 focus:border-accent"
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
                    <FormLabel className="font-label-caps text-label-caps text-on-surface-variant">Country</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Country"
                        className="bg-surface-container-low border-outline-variant/30 focus:border-accent"
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
            <Button disabled={isPending} type="submit" className="w-full bg-accent hover:bg-accent-hover text-white font-body-md text-body-md">
              {user && (userInfo?.phone && userInfo?.city && userInfo?.country) ? "Proceed to Confirm Order" : "Save and Proceed"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
