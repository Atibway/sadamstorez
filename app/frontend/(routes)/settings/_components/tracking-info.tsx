import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle } from 'lucide-react'

interface Stage {
  name: string
  completed: boolean
  date: string | null
}

interface TrackingData {
  orderNumber: string
  status: string
  estimatedDelivery: string
  stages: Stage[]
}

interface TrackingInfoProps {
  data: TrackingData
}

export function TrackingInfo({ data }: TrackingInfoProps) {
  return (
    <div className="bg-surface-container-low rounded-xl shadow-sm border border-outline-variant/20 p-stack-lg">
      <div className="mb-stack-lg pb-stack-sm border-b border-outline-variant/20">
        <h3 className="font-h3 text-h3 text-primary">Order #{data.orderNumber}</h3>
      </div>
      
      <CardContent className="p-0">
        <div className="space-y-stack-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-unit">Status</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full font-body-sm text-body-sm bg-accent text-white">
                {data.status}
              </span>
            </div>
            <div className="text-right">
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-unit">Estimated Delivery</p>
              <p className="font-body-md text-body-md text-on-surface">{data.estimatedDelivery}</p>
            </div>
          </div>

          <div className="relative pt-stack-lg">
            <div className="absolute left-0 top-0 w-full h-1 bg-surface-container rounded-full" />
            <div 
              className="absolute left-0 top-0 h-1 bg-accent rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${(data.stages.filter(stage => stage.completed).length / data.stages.length) * 100}%` }}
            />
            <div className="relative flex justify-between">
              {data.stages.map((stage, index) => (
                <div key={stage.name} className="flex flex-col items-center">
                  {stage.completed ? (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center">
                      <Circle className="w-4 h-4 text-on-surface-variant" />
                    </div>
                  )}
                  <p className="mt-2 font-body-sm text-body-sm text-on-surface">{stage.name}</p>
                  {stage.date && (
                    <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{stage.date}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  )
}

