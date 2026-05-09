import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard } from 'lucide-react'

export function PaymentMethods() {
  const [paymentMethod, setPaymentMethod] = useState('credit-card')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle payment method update - this should fetch/save to database
    console.log('Updated payment method:', { paymentMethod })
  }

  return (
    <div className="space-y-stack-lg">
      <h2 className="font-h4 text-h4 text-primary mb-stack-lg">Payment Methods</h2>
      
      <form onSubmit={handleSubmit} className="space-y-stack-lg">
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          <div className="flex items-center gap-unit p-stack-sm border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">
            <RadioGroupItem value="credit-card" id="credit-card" className="accent-accent" />
            <Label htmlFor="credit-card" className="flex items-center gap-unit cursor-pointer font-body-md text-body-md text-on-surface">
              <CreditCard className="w-5 h-5" />
              Credit Card
            </Label>
          </div>
          <div className="flex items-center gap-unit p-stack-sm border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">
            <RadioGroupItem value="paypal" id="paypal" className="accent-accent" />
            <Label htmlFor="paypal" className="font-body-md text-body-md text-on-surface cursor-pointer">PayPal</Label>
          </div>
        </RadioGroup>

        {paymentMethod === 'credit-card' && (
          <div className="bg-surface-container-low p-stack-lg rounded-lg border border-outline-variant/20">
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-stack-md">
              Payment methods are managed securely. Add or update your payment information in the checkout process.
            </p>
            <button className="font-body-sm text-body-sm text-accent hover:text-accent-hover font-medium transition-colors">
              + Add New Card
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

