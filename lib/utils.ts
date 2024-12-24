import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "Shs", 
  minimumFractionDigits: 0, 
  maximumFractionDigits: 0
})

// git config --global user.email "you@example.com"
//   git config --global user.name "Your Name"