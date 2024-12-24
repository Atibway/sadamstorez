import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="bg-gray-100 dark:bg-background text-gray-600">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href={"/"}>
            <h3 className="mb-4 text-lg font-semibold text-primary">Sadamstores</h3>
            </Link>
            <p className="mb-4">Your one-stop shop for all things trendy and practical.</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary">FAQs</Link></li>
              <li><Link href="#" className="hover:text-primary">Shipping & Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="/frontend/settings" className="hover:text-primary">My Account</Link></li>
              <li><Link href="/frontend/settings" className="hover:text-primary">Track Your Order</Link></li>
              <li><Link href="#" className="hover:text-primary">Wishlist</Link></li>
              <li><Link href="#" className="hover:text-primary">Gift Cards</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">Newsletter</h4>
            <p className="mb-4">Subscribe to our newsletter for exclusive deals and updates.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-md border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
              />
              <button
                type="submit"
                className="rounded-r-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4">
        <div className="container text-center text-sm">
          &copy; {new Date().getFullYear()} Sadamstores. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

