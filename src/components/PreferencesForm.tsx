'use client';

import { useState, useEffect } from 'react';
import { NotificationApi } from '@/lib/notification-api';
import { NotificationPreferences, NotificationType } from '@/types/notification';

interface PreferencesFormProps {
  apiUrl: string;
  userId: string;
}

export function PreferencesForm({ apiUrl, userId }: PreferencesFormProps) {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    channels: {
      in_app: true,
      email: true,
    },
    types: {
      social: true,
      collaboration: true,
      system: true,
    },
    digest_cadence: 'daily',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const api = new NotificationApi(apiUrl, userId);
    api.getPreferences()
      .then(setPreferences)
      .catch(error => {
        console.error('Failed to load preferences:', error);
        setMessage('Failed to load preferences');
      })
      .finally(() => setLoading(false));
  }, [apiUrl, userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const api = new NotificationApi(apiUrl, userId);
      await api.updatePreferences(preferences);
      setMessage('✅ Preferences saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to update preferences:', error);
      setMessage('❌ Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center space-x-3 text-slate-400">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
          <span>Loading preferences...</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Notification Channels */}
      <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/50">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          📱 <span className="ml-2">Notification Channels</span>
        </h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600/30 hover:border-slate-500/50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📲</span>
              <div>
                <span className="text-white font-medium">In-app notifications</span>
                <p className="text-slate-400 text-sm">Receive notifications while using the app</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={preferences.channels.in_app}
              onChange={e => setPreferences(prev => ({
                ...prev,
                channels: { ...prev.channels, in_app: e.target.checked }
              }))}
              className="w-5 h-5 text-blue-600 bg-slate-700 border-slate-500 rounded focus:ring-blue-500"
            />
          </label>
          
          <label className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600/30 hover:border-slate-500/50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📧</span>
              <div>
                <span className="text-white font-medium">Email notifications</span>
                <p className="text-slate-400 text-sm">Receive notifications via email</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={preferences.channels.email}
              onChange={e => setPreferences(prev => ({
                ...prev,
                channels: { ...prev.channels, email: e.target.checked }
              }))}
              className="w-5 h-5 text-blue-600 bg-slate-700 border-slate-500 rounded focus:ring-blue-500"
            />
          </label>
        </div>
      </div>

      {/* Notification Types */}
      <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/50">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          🔔 <span className="ml-2">Notification Types</span>
        </h3>
        <div className="space-y-4">
          {Object.entries({
            social: { icon: '👍', label: 'Social', desc: 'Likes, comments, and mentions' },
            collaboration: { icon: '🤝', label: 'Collaboration', desc: 'Team invites and project updates' },
            system: { icon: '⚠️', label: 'System', desc: 'Maintenance alerts and system updates' }
          }).map(([type, config]) => (
            <label key={type} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600/30 hover:border-slate-500/50 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{config.icon}</span>
                <div>
                  <span className="text-white font-medium">{config.label} notifications</span>
                  <p className="text-slate-400 text-sm">{config.desc}</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.types[type as NotificationType]}
                onChange={e => setPreferences(prev => ({
                  ...prev,
                  types: {
                    ...prev.types,
                    [type]: e.target.checked
                  }
                }))}
                className="w-5 h-5 text-blue-600 bg-slate-700 border-slate-500 rounded focus:ring-blue-500"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Email Digest */}
      <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/50">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          📊 <span className="ml-2">Email Digest Frequency</span>
        </h3>
        <select
          value={preferences.digest_cadence}
          onChange={e => setPreferences(prev => ({
            ...prev,
            digest_cadence: e.target.value as NotificationPreferences['digest_cadence']
          }))}
          className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="none">No digest</option>
          <option value="daily">Daily digest</option>
          <option value="weekly">Weekly digest</option>
        </select>
        <p className="text-slate-400 text-sm mt-2">
          Get a summary of your notifications delivered to your email
        </p>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={saving}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          {saving ? (
            <span className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Saving...</span>
            </span>
          ) : (
            'Save Preferences'
          )}
        </button>
        
        {message && (
          <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
            message.startsWith('✅') 
              ? 'bg-green-900/50 border border-green-700/50 text-green-300' 
              : 'bg-red-900/50 border border-red-700/50 text-red-300'
          }`}>
            {message}
          </div>
        )}
      </div>
    </form>
  );
}
