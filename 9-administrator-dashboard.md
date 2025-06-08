
<summary_title>administrator dashboard</summary_title>

<image_analysis>
Core Purpose:
- Centralized control panel for system administration
- Monitor system health, user activity, and key metrics
- Manage users, permissions, and configurations

Key Components:
- Navigation sidebar with collapsible sections
- Quick action buttons for common tasks
- Real-time statistics dashboard
- User management table/grid
- System health indicators
- Activity logs viewer
- Settings/configuration panels

Layout Structure:
- Fixed header with system status and admin profile
- Responsive grid layout (12-column system)
- Card-based widgets for metrics
- Expandable sections for detailed views
- Mobile-first breakpoints

Component Architecture:
- AdminDashboard (parent container)
- DashboardHeader
- NavigationSidebar
- MetricsGrid
- UserManagementTable
- SystemHealthMonitor
- ActivityLogViewer
- ConfigurationPanel

Design System:
- Font: System UI (San Francisco/Segoe UI)
- Base spacing unit: 8px
- Color scheme: Neutral background, accent colors for actions
- Icon system: Material Icons or Font Awesome

Style Architecture:
- CSS Modules or Styled Components
- CSS Grid for layout structure
- Flexbox for component alignment
- Mobile breakpoints: 320px, 768px, 1024px, 1440px

Quality Assurance:
- Unit tests for individual components
- E2E testing for critical workflows
- WCAG 2.1 AA compliance
- Performance monitoring for data-heavy views
- Error boundary implementation
</image_analysis>

<development_planning>
Component Architecture:
- Component breakdown
- State management
- Data flow
</development_planning>