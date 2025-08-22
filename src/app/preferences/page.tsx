import Link from 'next/link';
import { PreferencesForm } from '@/components/PreferencesForm';
import { config } from '@/config/api';

const API_URL = config.apiUrl;
// For demo purposes, we're using hardcoded values
const DEMO_USER_ID = 'demo-user-123';

export default function PreferencesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">I</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Insyd Notifications</h1>
                  <p className="text-slate-400 text-sm">Preferences</p>
                </div>
              </Link>
            </div>
            <Link
              href="/"
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-all duration-200 border border-slate-600 hover:border-slate-500"
            >
              ← Back to Notifications
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Notification Preferences</h2>
            <p className="text-slate-300">
              Customize how and when you receive notifications. Changes are saved automatically.
            </p>
          </div>
          
          <PreferencesForm apiUrl={API_URL} userId={DEMO_USER_ID} />
        </div>
      </main>
    </div>
  );
}
