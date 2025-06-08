import { Clock } from 'lucide-react'

interface TimelineEvent {
  status: string
  timestamp: string
  note?: string
}

interface OrderTimelineProps {
  events: TimelineEvent[]
}

export default function OrderTimeline({ events }: OrderTimelineProps) {
  return (
    <div className="relative">
      {events.map((event, index) => (
        <div key={index} className="flex items-start mb-8 last:mb-0">
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center relative">
            <div className="w-4 h-4 rounded-full bg-primary-blue" />
            {index < events.length - 1 && (
              <div
                className="absolute w-0.5 h-8 bg-gray-700"
                style={{ left: '0.875rem', top: '2rem' }}
              />
            )}
          </div>
          <div className="ml-4">
            <div className="flex items-center gap-2">
              <p className="font-medium">{event.status}</p>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Clock size={14} />
                <span>{event.timestamp}</span>
              </div>
            </div>
            {event.note && (
              <p className="text-sm text-gray-400 mt-1">{event.note}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
} 