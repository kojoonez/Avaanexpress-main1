<summary_title>
Delivery Driver Status and Demand Map Interface
</summary_title>

<image_analysis>
1. Content Structure:
- Main Content Elements: Interactive map view, demand status panel, action button
- Content Grouping: Two main sections - map view (top) and status panel (bottom)
- Visual Hierarchy: Map dominates view, status panel overlays bottom
- Content Types: Map visualization, status indicators, buttons, icons, text
- Text Elements: "Quieter than usual", "Delivery demand", "No upcoming boosts", "Go online"

2. Layout Structure:
- Content Distribution: 70/30 split between map and status panel
- Spacing Patterns: Clear separation between map and panel, consistent padding
- Container Structure: Full-width map with overlay panel
- Grid/Alignment: Single column layout with centered elements
- Responsive Behavior: Panel maintains fixed height, map scales to fill space

3. UI Components (Page-Specific):
- Content Cards/Containers: Dark overlay panel with rounded top corners
- Interactive Elements: "Go online" button, boost status button, map interactions
- Data Display Elements: Demand indicator (0.8), map markers and labels
- Status Indicators: Delivery demand metric, boost availability
- Media Components: Interactive map with custom styling, location markers

4. Interactive Patterns:
- Content Interactions: Map panning/zooming, button taps
- State Changes: Button hover/active states, map interaction feedback
- Dynamic Content: Real-time demand updates, location tracking
- Mobile Interactions: Touch-optimized map controls, swipe gestures

</image_analysis>

<development_planning>
1. Component Structure:
- MapView component with custom styling
- StatusPanel component with demand indicator
- ActionButton component for "Go online"
- BoostStatus component for promotions
- DemandIndicator component for metrics

2. Content Layout:
- Flexbox layout for main container
- Absolute positioning for overlay panel
- Dynamic height calculations for map
- Safe area insets handling

3. Integration Points:
- Map service integration (mapping API)
- Real-time demand data service
- Location tracking service
- Theme system for dark mode support

4. Performance Considerations:
- Map tile optimization
- Demand data polling strategy
- Location update throttling
- Component lazy loading
- Map marker clustering for scale
</development_planning>

<implementation>
1. DemandIndicator Component:
```typescript
'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

type DemandLevel = 'high' | 'medium' | 'low'

interface DemandIndicatorProps {
  level: DemandLevel
}

const demandConfig = {
  high: {
    text: 'High Demand',
    color: 'text-green-500',
    icon: TrendingUp,
    description: 'Many delivery requests in your area'
  },
  medium: {
    text: 'Medium Demand',
    color: 'text-yellow-500',
    icon: Minus,
    description: 'Steady delivery requests in your area'
  },
  low: {
    text: 'Low Demand',
    color: 'text-red-500',
    icon: TrendingDown,
    description: 'Few delivery requests in your area'
  }
}

export function DemandIndicator({ level }: DemandIndicatorProps) {
  const { text, color, icon: Icon, description } = demandConfig[level]

  return (
    <div className="bg-card-background rounded-lg p-4">
      <div className="flex items-center gap-2">
        <Icon className={`${color} w-6 h-6`} />
        <div>
          <h3 className={`font-semibold ${color}`}>{text}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  )
}
```

2. StatusPanel Component:
```typescript
'use client'

import { DemandIndicator } from './DemandIndicator'
import { Button } from '../ui/Button'
import { Clock, Zap } from 'lucide-react'

export function StatusPanel() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm rounded-t-2xl p-4 shadow-lg">
      <div className="max-w-md mx-auto space-y-4">
        <DemandIndicator level="high" />
        
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Best time to go online</span>
        </div>

        <div className="bg-card-background rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Zap className="text-yellow-500 w-5 h-5" />
            <div>
              <h4 className="font-medium text-white">Boost Available</h4>
              <p className="text-sm text-gray-400">Earn 1.2x more during peak hours</p>
            </div>
          </div>
        </div>

        <Button className="w-full bg-primary-blue hover:bg-secondary-blue text-white font-semibold py-3 rounded-lg">
          Go Online
        </Button>
      </div>
    </div>
  )
}
```

3. Button Component:
```typescript
'use client'

import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ 
  children, 
  className = '', 
  variant = 'primary',
  size = 'md',
  ...props 
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
```

4. RiderDashboard Component:
```typescript
'use client'

import { RiderMap } from '../admin/RiderMap'
import { StatusPanel } from './StatusPanel'

export function RiderDashboard() {
  // Example location - this would come from the rider's GPS in production
  const currentLocation = {
    lat: 51.5074,
    lng: -0.1278
  }

  return (
    <div className="h-screen relative">
      <RiderMap 
        location={currentLocation}
        orderId="live-view" // Using a placeholder ID for the live view
      />
      <StatusPanel />
    </div>
  )
}
```

5. DeliveryRidersPage:
```typescript
import { RiderDashboard } from '@/components/features/RiderDashboard'

export default function DeliveryRidersPage() {
  return <RiderDashboard />
}
```
</implementation>

<features>
1. Demand Level Indicators:
- Visual indicators with icons (trending up, horizontal, trending down)
- Color-coded status (green, yellow, red)
- Descriptive text for each demand level
- Real-time demand updates

2. Status Information:
- Current demand level display
- Best time to go online indicator
- Boost availability status
- Quick links to important features

3. Map Integration:
- Real-time location tracking
- Interactive map controls
- Custom map styling for dark theme
- Location markers with animations

4. UI/UX Features:
- Dark theme optimized interface
- Responsive layout design
- Smooth transitions and animations
- Touch-optimized controls
- Backdrop blur effects
</features>