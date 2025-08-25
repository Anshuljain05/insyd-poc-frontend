# Insyd Notification System - Frontend

## Overview

This is the frontend web application for the Insyd Notification System, built with Next.js, TypeScript, and Tailwind CSS. It provides a modern, real-time notification interface with demo controls for easy testing.

## 🚀 Live Demo

- **Frontend**: https://insyd-poc-frontend-nh4cpujbp-anshuljain05s-projects.vercel.app/
- **Backend API**: https://api-production-3aea.up.railway.app/
- **Demo Controls**: Built-in buttons for testing all notification types

## 🎯 Quick Demo Guide

### 5-Minute Demo Workflow
1. **Visit**: https://insyd-poc-frontend-nh4cpujbp-anshuljain05s-projects.vercel.app/
2. **Test Demo Controls**: Click the colorful notification buttons
3. **Watch Real-time**: Notifications appear instantly
4. **Interact**: Click notifications to mark as read
5. **Explore**: Visit preferences page for settings

### 🎮 Demo Controls
| Button | Creates | Result |
|--------|---------|--------|
| 👍 **Project Liked** | Social notification | Blue notification about project interaction |
| 🤝 **Team Invite** | Collaboration notification | Green notification about team invitation |
| ⚠️ **System Alert** | System notification | Orange notification about maintenance |
| 💼 **Job Match** | Opportunity notification | Purple notification about job opportunity |

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Theme**: Dark theme inspired by Insyd.app
- **Real-time**: WebSocket connections
- **Hosting**: Vercel (Production)
- **State Management**: React hooks + context

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── preferences/       # Preferences page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── NotificationList.tsx
│   ├── NotificationItem.tsx
│   ├── PreferencesForm.tsx
│   └── DemoControls.tsx   # Demo testing interface
├── lib/                   # Utilities
│   ├── notification-api.ts
│   └── notification-socket.ts
├── config/               # Configuration
│   └── api.ts            # API endpoints
└── types/                # TypeScript definitions
    └── notification.ts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd insyd-notification-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your API URLs

# Start development server
npm run dev
```

### Environment Variables
Create a `.env.local` file with:
```env
# Local Development URLs
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

**Note**: For production, these are configured in `src/config/api.ts` to use the live URLs:
- API: `https://api-production-3aea.up.railway.app`
- WebSocket: `wss://api-production-3aea.up.railway.app`

## ✨ Features

### 🎨 User Interface
- **Modern Dark Theme**: Inspired by Insyd.app design
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Notifications appear without page refresh
- **Interactive Elements**: Click to mark as read, preferences management

### 🔄 Real-time Functionality  
- **WebSocket Connections**: Instant notification delivery
- **Live Status Updates**: Unread counts update immediately  
- **Cross-tab Updates**: Changes appear across multiple browser tabs
- **Connection Recovery**: Automatic reconnection if connection drops

### 📊 Notification Types
- **Social**: Likes, mentions, comments (Blue theme)
- **Collaboration**: Team invites, project updates (Green theme)  
- **System**: Maintenance, alerts, updates (Orange/Red theme)
- **Opportunity**: Job matches, recommendations (Purple theme)

### ⚙️ Management Features
- **Mark as Read**: Individual notification management
- **Bulk Actions**: Mark all as read functionality
- **Preferences**: Configure notification types and delivery
- **Demo Controls**: Built-in testing interface

## 🧩 Component Overview

### DemoControls.tsx
Interactive testing interface that allows users to:
- Create different types of notifications
- Test real-time functionality
- Demonstrate system capabilities
- No CLI or technical knowledge required

### NotificationList.tsx
Main component that:
- Displays all notifications
- Handles real-time WebSocket updates
- Manages unread counts
- Provides mark-as-read functionality

### NotificationItem.tsx
Individual notification component with:
- Type-specific styling and icons
- Read/unread status indication
- Click-to-mark-read functionality
- Responsive design

### PreferencesForm.tsx
Settings interface for:
- Notification type preferences
- Delivery method configuration
- User customization options

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Development Workflow
1. **Start Backend**: Ensure the backend API is running
2. **Start Frontend**: `npm run dev`
3. **Open Browser**: http://localhost:3000
4. **Test Features**: Use demo controls to test functionality

### WebSocket Integration
The app automatically connects to the WebSocket server for real-time updates:
```typescript
// Automatically handles connection, reconnection, and message routing
const socket = useNotificationSocket(userId);
```

## 🎨 Styling & Design

### Tailwind CSS Configuration
- **Dark Theme**: Primary color scheme
- **Custom Colors**: Notification type-specific colors
- **Responsive Breakpoints**: Mobile-first approach
- **Component Variants**: Consistent styling patterns

### Color Scheme
- **Social (Blue)**: `bg-blue-500/20`, `border-blue-500/30`
- **Collaboration (Green)**: `bg-green-500/20`, `border-green-500/30`
- **System (Orange)**: `bg-orange-500/20`, `border-orange-500/30`
- **Opportunity (Purple)**: `bg-purple-500/20`, `border-purple-500/30`

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Vercel will automatically deploy on git push

### Environment Variables for Production
Set in Vercel dashboard:
```env
# These are automatically configured in production
# See src/config/api.ts for hardcoded production URLs
NEXT_PUBLIC_API_URL=https://api-production-3aea.up.railway.app
NEXT_PUBLIC_WS_URL=wss://api-production-3aea.up.railway.app
```

**Note**: The production deployment uses hardcoded URLs in the config file, so environment variables are optional for Vercel deployment.

### Build Configuration
The app uses Next.js App Router with:
- Static generation where possible
- Server-side rendering for dynamic content
- Optimized bundle splitting
- Progressive Web App capabilities

## 🧪 Testing

### Manual Testing with Demo Controls
1. **Open the application**
2. **Use demo buttons** to create notifications
3. **Verify real-time updates** work
4. **Test mark-as-read** functionality
5. **Check preferences** page

### Browser Testing
- **Chrome**: Version 88+
- **Firefox**: Version 85+
- **Safari**: Version 14+
- **Edge**: Version 88+

### Performance Expectations
- **Initial Load**: < 3000ms
- **Demo Button Response**: < 1000ms
- **WebSocket Connection**: < 2000ms
- **Navigation**: < 500ms

## 🐛 Troubleshooting

### Common Issues

**Demo Controls Not Working**
- Check browser console for JavaScript errors
- Verify backend API is running
- Refresh page to reset WebSocket connection

**Notifications Not Appearing**
- Check WebSocket connection in browser Network tab
- Verify real-time connection is established
- Try refreshing the page

**Styling Issues**
- Clear browser cache
- Check if Tailwind CSS is properly loaded
- Verify no conflicting CSS

**Build Errors**
- Check TypeScript errors: `npm run type-check`
- Verify all dependencies are installed
- Check Next.js configuration

## 📱 Mobile Support

The application is fully responsive and supports:
- **Touch Interactions**: Tap to mark as read
- **Mobile Navigation**: Optimized for small screens
- **Responsive Layout**: Adapts to all screen sizes
- **Progressive Web App**: Can be installed on mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Related

- **Backend Repository**: Backend API available separately  
- **Live Demo**: https://insyd-poc-frontend-nh4cpujbp-anshuljain05s-projects.vercel.app/
- **Backend API**: https://api-production-3aea.up.railway.app/health

## 📚 Additional Resources

- **Vercel Deployment**: https://vercel.com/docs/concepts/deployments
- **Next.js Documentation**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
