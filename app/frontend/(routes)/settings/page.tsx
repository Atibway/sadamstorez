import React from 'react'
import { ChevronRight, Camera, User, Contact, CreditCard, History, LogIn } from 'lucide-react';
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/prismadb'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const SettingsPage = async() => {
  const user = await currentUser()

  // Show login reminder instead of redirect
  if(!user){
    return (
      <div className="bg-surface min-h-screen flex flex-col">
        <main className="flex-grow w-full max-w-container-max mx-auto px-margin-desktop py-section-padding">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 p-section-padding text-center">
            <div className="flex justify-center mb-stack-md">
              <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center">
                <LogIn className="w-10 h-10 text-accent" />
              </div>
            </div>
            <h1 className="font-h2 text-h2 text-primary mb-stack-sm">Login Required</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-md mx-auto">
              Please log in to access your account settings. You'll need to be logged in to manage your profile, orders, and preferences.
            </p>
            <div className="flex gap-unit justify-center">
              <Link href="/auth/login">
                <Button className="bg-accent hover:bg-accent-hover text-white font-body-md text-body-md px-8">
                  Log In
                </Button>
              </Link>
              <Link href="/frontend">
                <Button variant="outline" className="font-body-md text-body-md px-8">
                  Back to Home
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
      <main className="flex-grow flex w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-padding gap-gutter">
        {/* Settings Sidebar */}
        <aside className="w-64 hidden lg:flex flex-col gap-stack-sm p-stack-lg border-r border-outline-variant/20 bg-surface-container-low shadow-sm h-min rounded-lg">
          <div className="mb-stack-lg">
            <div className="font-h4 text-h4 text-primary mb-1">Account Settings</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">Manage your preferences</div>
          </div>
          <nav className="flex flex-col gap-stack-sm">
            <a className="flex items-center gap-stack-sm p-stack-sm bg-secondary-container text-on-secondary-container rounded-lg font-semibold hover:pl-4 transition-all duration-300 ease-in-out" href="/frontend/settings">
              <User className="w-5 h-5" />
              <span className="font-body-md text-body-md">Profile Settings</span>
            </a>
            <a className="flex items-center gap-stack-sm p-stack-sm text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:pl-4 transition-all duration-300 ease-in-out" href="/frontend/settings/address">
              <Contact className="w-5 h-5" />
              <span className="font-body-md text-body-md">Address Book</span>
            </a>
            <a className="flex items-center gap-stack-sm p-stack-sm text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:pl-4 transition-all duration-300 ease-in-out" href="/frontend/settings/payment">
              <CreditCard className="w-5 h-5" />
              <span className="font-body-md text-body-md">Payment Methods</span>
            </a>
            <a className="flex items-center gap-stack-sm p-stack-sm text-on-surface-variant hover:bg-surface-container-high rounded-lg hover:pl-4 transition-all duration-300 ease-in-out" href="/frontend/settings/orders">
              <History className="w-5 h-5" />
              <span className="font-body-md text-body-md">Order History</span>
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <section className="flex-grow">
          {/* Breadcrumbs */}
          <nav className="flex text-on-surface-variant font-body-sm text-body-sm mb-stack-lg">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link className="inline-flex items-center hover:text-primary transition-colors" href="/frontend">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <Link className="hover:text-primary transition-colors" href="/frontend/settings">Account</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <span className="text-primary font-medium">Profile Settings</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="bg-surface rounded-xl shadow-sm border border-outline-variant/10 p-stack-lg md:p-section-padding">
            <h1 className="font-h2 text-h2 text-primary mb-stack-lg">Profile Settings</h1>
            <div className="flex flex-col md:flex-row gap-section-padding">
              {/* Avatar Upload Section */}
              <div className="flex flex-col items-center gap-stack-md shrink-0">
                <div className="relative group cursor-pointer">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-surface-container border-2 border-outline-variant/30">
                    <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
                      <User className="w-16 h-16 text-on-surface-variant" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-primary-container/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Camera className="w-8 h-8 text-on-primary" />
                  </div>
                </div>
                <button className="font-body-sm text-body-sm text-accent hover:text-ocean-blue font-medium transition-colors">Change Photo</button>
              </div>

              {/* Form Section */}
              <form className="flex-grow flex flex-col gap-stack-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
                  <div className="flex flex-col gap-unit">
                    <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="firstName">First Name</label>
                    <input 
                      className="font-body-md text-body-md bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-lg px-stack-md py-stack-sm focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all outline-none" 
                      id="firstName" 
                      type="text" 
                      defaultValue={userInfo?.name?.split(' ')[0] || ''}
                    />
                  </div>
                  <div className="flex flex-col gap-unit">
                    <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="lastName">Last Name</label>
                    <input 
                      className="font-body-md text-body-md bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-lg px-stack-md py-stack-sm focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all outline-none" 
                      id="lastName" 
                      type="text" 
                      defaultValue={userInfo?.name?.split(' ')[1] || ''}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-unit">
                  <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="email">Email Address</label>
                  <input 
                    className="font-body-md text-body-md bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-lg px-stack-md py-stack-sm focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all outline-none" 
                    id="email" 
                    type="email" 
                    defaultValue={userInfo?.email || ''}
                  />
                </div>
                <div className="flex flex-col gap-unit">
                  <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="phone">Phone Number</label>
                  <input 
                    className="font-body-md text-body-md bg-surface-container-low border border-outline-variant/30 text-on-surface rounded-lg px-stack-md py-stack-sm focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all outline-none" 
                    id="phone" 
                    type="tel" 
                    defaultValue={userInfo?.phone || ''}
                  />
                </div>
                <div className="flex justify-end gap-stack-md mt-stack-md">
                  <button className="px-stack-lg py-stack-sm rounded-lg font-h4 text-h4 font-medium text-on-surface border border-outline-variant/30 hover:bg-surface-container-low transition-colors" type="button">Cancel</button>
                  <button className="px-stack-lg py-stack-sm rounded-lg font-h4 text-h4 font-medium bg-accent text-white hover:bg-accent-hover transition-colors shadow-sm" type="submit">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SettingsPage