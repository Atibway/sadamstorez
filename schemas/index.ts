import * as z from "zod";

export const ProfileUpdateSchema = z.object({
  name: z.string().min(1, { error: "Name is required" }),
  phone: z.string().min(10, { error: "Phone is required" }),
  city: z.string().min(1, { error: "City is required" }),
  country: z.string().min(1, { error: "Country is required" }),
});

export const SettingsSchema = z.object({
  name: z.string().min(1, { error: "Name is required" }),
  phone: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, 
        {
            error: "Minimum of 6 characters required"
        }
    )
})

export const ResetSchema = z.object({
email: z.string().email({
    error: "Email is Required"
})
})

export const LoginSchema = z.object({
email: z.string().email({
    error: "Email is Required"
}),
password: z.string().min(1, 
    {
        error: "Password is Required"
    }
),
code: z.optional(z.string()),
}) 

export const RegisterSchema = z.object({
email: z.string().email({
    error: "Email is Required"
}),
password: z.string().min(6, 
    {
        error: "Minimum 6 characters Required"
    }
),
name: z.string().min(1, {
    error: "Name is required"
})
})