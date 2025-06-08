'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { Calendar, Clock } from 'lucide-react'
import 'react-datepicker/dist/react-datepicker.css'

interface DeliverySchedulerProps {
  selectedDate: Date | null
  onDateChange: (date: Date | null) => void
}

export default function DeliveryScheduler({
  selectedDate,
  onDateChange,
}: DeliverySchedulerProps) {
  const [isNow, setIsNow] = useState(true)

  const handleNowClick = () => {
    setIsNow(true)
    onDateChange(new Date())
  }

  const handleScheduleClick = () => {
    setIsNow(false)
    if (!selectedDate) {
      onDateChange(new Date())
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-400">
        Delivery Time
      </label>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleNowClick}
          className={`flex items-center justify-center p-4 rounded-lg border ${
            isNow
              ? 'border-primary-blue bg-primary-blue/10 text-white'
              : 'border-gray-800 text-gray-400 hover:border-gray-600'
          }`}
        >
          <Clock size={18} className="mr-2" />
          As soon as possible
        </button>
        <button
          onClick={handleScheduleClick}
          className={`flex items-center justify-center p-4 rounded-lg border ${
            !isNow
              ? 'border-primary-blue bg-primary-blue/10 text-white'
              : 'border-gray-800 text-gray-400 hover:border-gray-600'
          }`}
        >
          <Calendar size={18} className="mr-2" />
          Schedule for later
        </button>
      </div>

      {!isNow && (
        <div className="mt-4">
          <DatePicker
            selected={selectedDate}
            onChange={onDateChange}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date()}
            className="w-full pl-10 pr-4 py-3 bg-card-background border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue"
            wrapperClassName="w-full"
            customInput={
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Calendar size={18} className="text-gray-400" />
                </div>
                <input
                  className="w-full pl-10 pr-4 py-3 bg-card-background border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  placeholder="Select date and time"
                />
              </div>
            }
          />
        </div>
      )}
    </div>
  )
} 