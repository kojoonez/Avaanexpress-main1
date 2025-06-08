'use client'

import { useState } from 'react'
import { Calendar, Clock, TrendingUp } from 'lucide-react'

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const timeSlots = [
  { id: 1, day: 'Mon', time: '11:00 - 15:00', boost: 1.2 },
  { id: 2, day: 'Mon', time: '18:00 - 22:00', boost: 1.5 },
  { id: 3, day: 'Tue', time: '11:00 - 15:00', boost: 1.1 },
  { id: 4, day: 'Wed', time: '18:00 - 22:00', boost: 1.4 },
  { id: 5, day: 'Fri', time: '18:00 - 23:00', boost: 1.6 },
  { id: 6, day: 'Sat', time: '12:00 - 16:00', boost: 1.3 },
  { id: 7, day: 'Sun', time: '12:00 - 16:00', boost: 1.2 }
]

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState('Mon')

  return (
    <div className="px-4 py-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-1">Schedule</h1>
        <p className="text-gray-400 text-sm">
          View available time slots and boost multipliers
        </p>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto -mx-4 px-4 pb-2">
        {weekDays.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`min-w-[4.5rem] px-4 py-3 rounded-lg transition-colors text-center ${
              selectedDay === day
                ? 'bg-primary-blue text-white'
                : 'bg-card-background text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Time Slots */}
      <div className="space-y-3">
        {timeSlots
          .filter((slot) => slot.day === selectedDay)
          .map((slot) => (
            <div
              key={slot.id}
              className="bg-card-background border border-gray-800 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar size={14} />
                  <span>{slot.day}</span>
                  <Clock size={14} className="ml-1" />
                  <span>{slot.time}</span>
                </div>
                <div className="flex items-center gap-1 text-primary-blue">
                  <TrendingUp size={14} />
                  <span className="font-semibold">{slot.boost}x</span>
                </div>
              </div>
              <button className="w-full py-3 bg-primary-blue/10 text-primary-blue rounded-lg hover:bg-primary-blue/20 transition-colors text-sm font-medium">
                Reserve Slot
              </button>
            </div>
          ))}
      </div>
    </div>
  )
} 