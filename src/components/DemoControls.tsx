'use client';

import { useState } from 'react';

interface DemoControlsProps {
  userId: string;
  onNotificationCreated?: () => void;
}

export default function DemoControls({ userId, onNotificationCreated }: DemoControlsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const notificationTypes = [
    {
      type: 'social',
      label: 'Project Liked',
      icon: '👍',
      color: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      data: {
        actorId: 'alice_chen',
        verb: 'social.like',
        objectId: 'project_123',
        context: 'Alice Chen liked your sustainable architecture project "Green Tower Complex"'
      }
    },
    {
      type: 'collaboration',
      label: 'Team Invite',
      icon: '🤝',
      color: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      data: {
        actorId: 'project_manager',
        verb: 'collaboration.invite',
        objectId: 'project_456',
        context: 'You have been invited to collaborate on the "Urban Planning Initiative" project'
      }
    },
    {
      type: 'system',
      label: 'System Alert',
      icon: '⚠️',
      color: 'from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600',
      data: {
        actorId: 'system',
        verb: 'system.maintenance',
        objectId: 'maintenance_001',
        context: 'Platform maintenance scheduled for tonight 2:00 AM - 4:00 AM EST'
      }
    },
    {
      type: 'opportunity',
      label: 'Job Match',
      icon: '💼',
      color: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      data: {
        actorId: 'job_board',
        verb: 'opportunity.match',
        objectId: 'job_789',
        context: 'New job opportunity: Senior Architect at Sustainable Design Studio - 95% match'
      }
    }
  ];

  const createNotification = async (notificationData: {
    actorId: string;
    verb: string;
    objectId: string;
    context: string;
  }) => {
    setIsLoading(true);
    setMessage('');

    try {
      const eventData = {
        ...notificationData,
        contextJson: { recipientId: userId },
        idempotencyKey: `demo-${notificationData.verb}-${Date.now()}`
      };

      const response = await fetch(`/api/demo/notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(`✅ Notification created successfully! ID: ${result.id?.substring(0, 8)}...`);
        onNotificationCreated?.();
      } else {
        const error = await response.text();
        setMessage(`❌ Failed to create notification: ${error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error}`);
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
          🎮 <span className="ml-2">Demo Controls</span>
        </h3>
        <p className="text-slate-300">
          Click the buttons below to create different types of notifications and see them appear in real-time.
          Perfect for demonstrating the system to stakeholders and reviewers.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {notificationTypes.map((notification) => (
          <button
            key={notification.type}
            onClick={() => createNotification(notification.data)}
            disabled={isLoading}
            className={`bg-gradient-to-r ${notification.color} text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2`}
          >
            <span className="text-lg">{notification.icon}</span>
            <span>{isLoading ? '⏳ Creating...' : notification.label}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-slate-400 mb-4 gap-2">
        <span className="flex items-center">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
          Real-time updates via WebSocket
        </span>
        <span>
          Demo User: <code className="bg-slate-700 px-2 py-1 rounded text-slate-300">{userId}</code>
        </span>
      </div>

      {message && (
        <div className={`text-sm p-4 rounded-lg border ${
          message.startsWith('✅') 
            ? 'bg-green-900/50 border-green-700/50 text-green-300' 
            : 'bg-red-900/50 border-red-700/50 text-red-300'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}
