"use client";

import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { TrackingInfo } from './tracking-info';
import { Search } from 'lucide-react';

interface TrackingStage {
  name: string;
  completed: boolean;
  date: string | null;
}

interface TrackingData {
  orderNumber: string;
  status: string;
  estimatedDelivery: string;
  stages: TrackingStage[];
}

export default function ProductTracking() {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real application, you would make an actual API call here to fetch tracking data from the database
    // This is a placeholder - you should implement the actual database fetch
    try {
      // const response = await fetch(`/api/tracking/${orderNumber}`);
      // const data = await response.json();
      // setTrackingData(data);
      
      // For now, showing that this needs to be connected to the database
      console.log('Fetch tracking data for order:', orderNumber);
    } catch (error) {
      console.error('Error fetching tracking data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-container-max mx-auto py-section-padding px-margin-mobile md:px-margin-desktop">
      <h1 className="font-h1 text-h1 text-primary mb-stack-lg">Track Your Order</h1>
      
      <form onSubmit={handleSubmit} className="mb-stack-lg">
        <div className="space-y-unit">
          <Label htmlFor="order-number" className="font-label-caps text-label-caps text-on-surface-variant">Order Number</Label>
          <div className="flex gap-stack-sm">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
              <input
                id="order-number"
                placeholder="Enter your order number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all font-body-md text-body-md text-on-surface"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-accent hover:bg-accent-hover text-white font-body-md text-body-md px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Track'}
            </button>
          </div>
        </div>
      </form>
      
      {trackingData && <TrackingInfo data={trackingData} />}
      
      {!trackingData && !loading && (
        <div className="text-center py-section-padding bg-surface-container-low rounded-xl border border-outline-variant/20">
          <Search className="w-16 h-16 text-on-surface-variant mx-auto mb-stack-md" />
          <p className="font-body-md text-body-md text-on-surface-variant">
            Enter your order number above to track your shipment
          </p>
        </div>
      )}
    </div>
  );
}
