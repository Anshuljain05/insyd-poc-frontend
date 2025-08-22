'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NotificationList } from '@/components/NotificationList';
import DemoControls from '@/components/DemoControls';
import { config } from '@/config/api';

// For demo purposes, we're using hardcoded values
const DEMO_USER_ID = 'demo-user-123';
const API_URL = config.apiUrl;

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleNotificationCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">I</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Insyd Notifications</h1>
                <p className="text-slate-400 text-sm">Real-time notification system for architects</p>
              </div>
            </div>
            <Link
              href="/preferences"
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-all duration-200 border border-slate-600 hover:border-slate-500"
            >
              ⚙️ Preferences
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Notification System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Demo</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Experience real-time notifications designed for the architecture community. 
            Test different notification types and see them appear instantly.
          </p>
        </div>

        {/* Demo Controls */}
        <div className="mb-8">
          <DemoControls 
            userId={DEMO_USER_ID} 
            onNotificationCreated={handleNotificationCreated}
          />
        </div>

        {/* Notifications Panel */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Your Notifications</h3>
            <div className="text-sm text-slate-400">
              Demo User: <code className="bg-slate-700 px-2 py-1 rounded text-slate-300">{DEMO_USER_ID}</code>
            </div>
          </div>
          <NotificationList 
            userId={DEMO_USER_ID} 
            apiUrl={API_URL}
            refreshTrigger={refreshTrigger}
          />
        </div>

        {/* Technical Info */}
        <div className="mt-8 text-center">
          <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/30">
            <h4 className="text-lg font-semibold text-white mb-3">🏗️ Architecture</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-slate-300">
                <span className="text-blue-400 font-medium">Frontend:</span> Next.js + Tailwind CSS
              </div>
              <div className="text-slate-300">
                <span className="text-purple-400 font-medium">Backend:</span> Node.js + Express + WebSocket
              </div>
              <div className="text-slate-300">
                <span className="text-green-400 font-medium">Database:</span> PostgreSQL + Prisma ORM
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
