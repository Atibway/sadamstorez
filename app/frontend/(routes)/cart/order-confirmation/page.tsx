"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/hooks/use-cart";

const OrderConfirmationPage: React.FC = () => {
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    removeAll();
  }, [removeAll]);

  return (
    <div className="bg-surface min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-section-padding px-margin-mobile md:px-margin-desktop">
        <div className="max-w-2xl w-full bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/20 p-stack-lg md:p-section-padding text-center relative overflow-hidden">
          {/* Decorative background element for celebratory feel */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary-fixed/30 to-transparent pointer-events-none"></div>
          
          {/* Success Icon */}
          <div className="mx-auto w-24 h-24 bg-primary-fixed rounded-full flex items-center justify-center mb-stack-lg relative z-10 shadow-sm ring-8 ring-surface-container-low">
            <CheckCircle className="w-16 h-16 text-primary" />
          </div>
          
          {/* Header */}
          <h1 className="font-h1 text-h1 text-primary mb-stack-sm relative z-10">Thank you for your order!</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg relative z-10">
            We've received your order and are getting it ready to ship. A confirmation email has been sent to your inbox.
          </p>
          
          {/* Order Details Card */}
          <div className="bg-surface-container-low rounded-lg p-stack-lg mb-stack-lg text-left shadow-sm relative z-10 border border-outline-variant/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-stack-sm">Order Number</p>
                <p className="font-h4 text-h4 text-primary">#LUX-8924-A7</p>
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant mb-stack-sm">Estimated Delivery</p>
                <p className="font-h4 text-h4 text-primary">Oct 24 - Oct 26</p>
              </div>
            </div>
            <div className="border-t border-outline-variant/20 mt-stack-md pt-stack-md">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-stack-sm">Shipping To</p>
              <p className="font-body-md text-body-md text-on-surface">
                Eleanor Vance<br/>
                1240 High Street, Apt 4B<br/>
                San Francisco, CA 94109
              </p>
            </div>
          </div>
          
          {/* Next Steps / Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-stack-md relative z-10 mt-stack-lg">
            <Link href="/frontend">
              <button className="w-full sm:w-auto px-8 py-3 bg-accent text-white font-h4 text-body-md rounded-lg hover:bg-accent-hover transition-all shadow-sm">
                Continue Shopping
              </button>
            </Link>
            <Link href="/frontend/settings/orders">
              <button className="w-full sm:w-auto px-8 py-3 bg-primary-container text-white font-h4 text-body-md rounded-lg border border-primary-container hover:bg-transparent hover:text-primary-container transition-all">
                View Order Status
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmationPage;
