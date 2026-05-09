import React from 'react'
import Header from '@/components/frontend/Header';
import { Lock, Verified, Shield, LogIn } from 'lucide-react';
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const page= async()=>{
    const user = await currentUser()
    
    // Show login reminder instead of redirect
    if(!user){
        return (
            <div className="bg-surface min-h-screen flex flex-col">
                <Header />
                
                <main className="flex-grow w-full max-w-container-max mx-auto px-margin-desktop py-section-padding">
                    <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 p-section-padding text-center">
                        <div className="flex justify-center mb-stack-md">
                            <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center">
                                <LogIn className="w-10 h-10 text-accent" />
                            </div>
                        </div>
                        <h1 className="font-h2 text-h2 text-primary mb-stack-sm">Login Required</h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-md mx-auto">
                            Please log in to continue with checkout. You'll need an account to track your order and manage your purchases.
                        </p>
                        <div className="flex gap-unit justify-center">
                            <Link href="/auth/login">
                                <Button className="bg-accent hover:bg-accent-hover text-white font-body-md text-body-md px-8">
                                    Log In
                                </Button>
                            </Link>
                            <Link href="/frontend/cart">
                                <Button variant="outline" className="font-body-md text-body-md px-8">
                                    Back to Cart
                                </Button>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
    
    const userInfo = await db.user.findUnique({
      where:{
        id: user?.id
      }
     })
     
  return (
    <div className="bg-surface min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-desktop py-section-padding">
        {/* Checkout Header & Progress */}
        <div className="mb-stack-lg">
          <h1 className="font-h2 text-h2 mb-stack-md text-primary">Checkout</h1>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between w-full max-w-2xl bg-surface-container-low rounded-lg p-stack-sm shadow-sm relative z-0">
            {/* Active Step */}
            <div className="flex flex-col items-center flex-1 relative z-10">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-caps text-label-caps mb-2">1</div>
              <span className="font-label-caps text-label-caps text-primary-container">Shipping</span>
            </div>
            <div className="flex-1 h-px bg-outline-variant/50 relative -top-3 z-0"></div>
            
            {/* Inactive Step */}
            <div className="flex flex-col items-center flex-1 relative z-10 opacity-50">
              <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-caps text-label-caps mb-2 border border-outline-variant/30">2</div>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Payment</span>
            </div>
            <div className="flex-1 h-px bg-outline-variant/50 relative -top-3 z-0"></div>
            
            {/* Inactive Step */}
            <div className="flex flex-col items-center flex-1 relative z-10 opacity-50">
              <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-caps text-label-caps mb-2 border border-outline-variant/30">3</div>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Review</span>
            </div>
          </div>
        </div>

        {/* Checkout Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Form Area (Left Column) */}
          <div className="lg:col-span-8 bg-surface rounded-[12px] shadow-sm p-stack-lg">
            <h2 className="font-h4 text-h4 mb-stack-md text-primary border-b border-outline-variant/20 pb-2">Shipping Information</h2>
            
            <form className="space-y-stack-md">
              {/* Contact Info */}
              <div className="space-y-stack-sm">
                <label className="block font-label-caps text-label-caps text-on-surface-variant" htmlFor="email">Email Address</label>
                <input 
                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg p-3 text-body-md outline-none transition-colors focus:ring-2 focus:ring-accent" 
                  id="email" 
                  placeholder="your@email.com" 
                  type="email"
                  defaultValue={userInfo?.email || ''}
                />
              </div>

              {/* Name Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md mt-stack-md">
                <div className="space-y-stack-sm">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant" htmlFor="firstName">First Name</label>
                  <input 
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg p-3 text-body-md outline-none transition-colors focus:ring-2 focus:ring-accent" 
                    id="firstName" 
                    placeholder="First Name" 
                    type="text"
                    defaultValue={userInfo?.name?.split(' ')[0]}
                  />
                </div>
                <div className="space-y-stack-sm">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant" htmlFor="lastName">Last Name</label>
                  <input 
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg p-3 text-body-md outline-none transition-colors focus:ring-2 focus:ring-accent" 
                    id="lastName" 
                    placeholder="Last Name" 
                    type="text"
                    defaultValue={userInfo?.name?.split(' ')[1] || ''}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-stack-sm mt-stack-md">
                <label className="block font-label-caps text-label-caps text-on-surface-variant" htmlFor="address">Street Address</label>
                <input 
                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg p-3 text-body-md outline-none transition-colors focus:ring-2 focus:ring-accent" 
                  id="address" 
                  placeholder="123 Luxury Ave" 
                  type="text"
                />
              </div>

              {/* City/State/Zip Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md mt-stack-md">
                <div className="space-y-stack-sm md:col-span-1">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant" htmlFor="city">City</label>
                  <input 
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg p-3 text-body-md outline-none transition-colors focus:ring-2 focus:ring-accent" 
                    id="city" 
                    placeholder="New York" 
                    type="text"
                  />
                </div>
                <div className="space-y-stack-sm">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant" htmlFor="state">State/Province</label>
                  <select 
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg p-3 text-body-md outline-none transition-colors focus:ring-2 focus:ring-accent appearance-none" 
                    id="state"
                  >
                    <option value="">Select State</option>
                    <option value="NY">New York</option>
                    <option value="CA">California</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                  </select>
                </div>
                <div className="space-y-stack-sm">
                  <label className="block font-label-caps text-label-caps text-on-surface-variant" htmlFor="zip">ZIP Code</label>
                  <input 
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg p-3 text-body-md outline-none transition-colors focus:ring-2 focus:ring-accent" 
                    id="zip" 
                    placeholder="10001" 
                    type="text"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-stack-sm mt-stack-md">
                <label className="block font-label-caps text-label-caps text-on-surface-variant" htmlFor="phone">Phone Number (Optional)</label>
                <input 
                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg p-3 text-body-md outline-none transition-colors focus:ring-2 focus:ring-accent" 
                  id="phone" 
                  placeholder="(555) 123-4567" 
                  type="tel"
                />
              </div>

              {/* Shipping Method */}
              <h3 className="font-body-lg text-body-lg mt-stack-lg mb-stack-sm text-primary">Shipping Method</h3>
              <div className="space-y-stack-sm border border-outline-variant/30 rounded-lg p-4 bg-surface-container-lowest">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input 
                      defaultChecked 
                      className="text-accent focus:ring-accent h-4 w-4" 
                      name="shipping" 
                      type="radio"
                    />
                    <span className="font-body-md text-body-md">Standard Shipping (3-5 Business Days)</span>
                  </div>
                  <span className="font-h4 text-h4 text-[#0f4c75]">Free</span>
                </label>
              </div>
              <div className="space-y-stack-sm border border-outline-variant/30 rounded-lg p-4 mt-2 bg-surface-container-lowest opacity-70 hover:opacity-100 transition-opacity">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input 
                      className="text-accent focus:ring-accent h-4 w-4" 
                      name="shipping" 
                      type="radio"
                    />
                    <span className="font-body-md text-body-md">Express Shipping (1-2 Business Days)</span>
                  </div>
                  <span className="font-h4 text-h4 text-[#0f4c75]">Shs15.00</span>
                </label>
              </div>

              {/* CTA */}
              <div className="pt-stack-lg mt-stack-lg border-t border-outline-variant/20 flex justify-end">
                <button 
                  className="bg-accent text-white font-h4 text-h4 py-3 px-8 rounded-lg shadow-sm hover:bg-accent-hover transition-colors w-full md:w-auto" 
                  type="button"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar (Right Column) */}
          <div className="lg:col-span-4">
            <div className="sticky top-[100px] bg-surface rounded-[12px] shadow-sm p-stack-lg">
              <h2 className="font-h4 text-h4 mb-stack-md text-primary border-b border-outline-variant/20 pb-2">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-stack-md mb-stack-md border-b border-outline-variant/20 pb-stack-md">
                <div className="flex gap-4">
                  <div className="w-20 h-24 bg-surface-container-low rounded-lg border border-outline-variant/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <span className="text-on-surface-variant font-body-sm text-body-sm">Product 1</span>
                  </div>
                  <div className="flex flex-col flex-grow justify-between py-1">
                    <div>
                      <h3 className="font-body-md text-body-md text-primary font-semibold">Product Name</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Size: M | Color: Default</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Qty: 1</span>
                      <span className="font-h4 text-h4 text-[#0f4c75]">Shs0.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-stack-md flex gap-unit">
                <input 
                  className="flex-grow bg-surface-container-low border border-outline-variant/50 rounded-lg p-2 font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-accent" 
                  placeholder="Promo code" 
                  type="text"
                />
                <button className="bg-primary-container text-on-primary px-4 py-2 rounded-lg font-label-caps text-label-caps hover:bg-primary-container/90 transition-colors">Apply</button>
              </div>

              {/* Totals */}
              <div className="space-y-2 mb-stack-md font-body-sm text-body-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>Shs0.00</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Taxes</span>
                  <span>Shs0.00</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-outline-variant/20 pt-stack-sm">
                <span className="font-h4 text-h4 text-primary">Total</span>
                <span className="font-h3 text-h3 text-[#0f4c75] font-bold">Shs0.00</span>
              </div>

              {/* Trust Badges */}
              <div className="mt-stack-lg flex items-center justify-center gap-unit text-outline border-t border-outline-variant/10 pt-stack-sm">
                <Lock className="w-5 h-5" />
                <Verified className="w-5 h-5" />
                <Shield className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default page