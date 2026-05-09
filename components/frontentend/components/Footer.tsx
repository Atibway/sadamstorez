"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    
    setIsSubmitting(true)
    try {
      const response = await fetch("https://www.mailminted.com/api/subscribe", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
          email: email
        }),
      })
      
      if (response.ok) {
        toast.success("Subscribed successfully")
        setEmail("")
      } else {
        throw new Error('Subscription failed')
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <footer className="bg-primary-container text-on-primary-container border-t border-outline-variant/10 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop py-section-padding max-w-container-max mx-auto">
        {/* Brand & Copyright */}
        <div className="flex flex-col gap-stack-sm">
          <div className="font-h4 text-h4 text-on-primary">SadamStorez</div>
          <p className="font-body-sm text-body-sm text-on-primary-container/80">
            Curating modern elegance for the sophisticated consumer.
          </p>
        </div>
        
        {/* Links Column 1 */}
        <div className="flex flex-col gap-stack-sm font-body-sm text-body-sm">
          <h4 className="font-label-caps text-label-caps text-on-primary mb-unit">COMPANY</h4>
          <Link className="text-on-primary-container/80 hover:text-on-primary hover:underline decoration-secondary underline-offset-4 transition-colors duration-200" href="#">About Us</Link>
          <Link className="text-on-primary-container/80 hover:text-on-primary hover:underline decoration-secondary underline-offset-4 transition-colors duration-200" href="#">Sustainability</Link>
        </div>
        
        {/* Links Column 2 */}
        <div className="flex flex-col gap-stack-sm font-body-sm text-body-sm">
          <h4 className="font-label-caps text-label-caps text-on-primary mb-unit">SUPPORT</h4>
          <Link className="text-on-primary-container/80 hover:text-on-primary hover:underline decoration-secondary underline-offset-4 transition-colors duration-200" href="#">Shipping Policy</Link>
          <Link className="text-on-primary-container/80 hover:text-on-primary hover:underline decoration-secondary underline-offset-4 transition-colors duration-200" href="#">Returns & Exchanges</Link>
        </div>
        
        {/* Links Column 3 */}
        <div className="flex flex-col gap-stack-sm font-body-sm text-body-sm">
          <h4 className="font-label-caps text-label-caps text-on-primary mb-unit">LEGAL</h4>
          <Link className="text-on-primary-container/80 hover:text-on-primary hover:underline decoration-secondary underline-offset-4 transition-colors duration-200" href="#">Terms of Service</Link>
          <Link className="text-on-primary-container/80 hover:text-on-primary hover:underline decoration-secondary underline-offset-4 transition-colors duration-200" href="#">Privacy Policy</Link>
        </div>
      </div>
      
      {/* Newsletter / Extra */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop pt-section-padding max-w-container-max mx-auto border-t border-outline-variant/10">
        <div className="col-span-1 md:col-span-3">
          <div className="col-span-1 md:col-span-4 text-center font-body-sm text-body-sm">
            {new Date().getFullYear()} SadamStorez. All rights reserved.
          </div>
        </div>
        <div className="col-span-1">
          <span className="font-label-caps text-label-caps text-on-primary-container uppercase tracking-wider">Stay Connected</span>
          <div className="flex mt-2">
            <input 
              className="bg-surface-container-lowest/10 border border-outline-variant/30 text-on-primary px-3 py-2 rounded-l-lg focus:outline-none focus:border-accent w-full font-body-sm" 
              placeholder="Email address" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-accent text-white px-3 py-2 rounded-r-lg hover:bg-accent-hover transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
