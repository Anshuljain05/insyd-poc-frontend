import { Notification } from '@/types/notification';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'social': return '👍';
      case 'collaboration': return '🤝';
      case 'system': return '⚠️';
      case 'opportunity': return '💼';
      default: return '📱';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'social': return 'from-blue-500/20 to-blue-600/20 border-blue-500/30';
      case 'collaboration': return 'from-green-500/20 to-green-600/20 border-green-500/30';
      case 'system': return 'from-orange-500/20 to-red-500/20 border-orange-500/30';
      case 'opportunity': return 'from-purple-500/20 to-purple-600/20 border-purple-500/30';
      default: return 'from-slate-500/20 to-slate-600/20 border-slate-500/30';
    }
  };

  return (
    <div 
      className={`relative bg-gradient-to-r ${
        notification.isRead 
          ? 'from-slate-800/30 to-slate-700/30 border-slate-600/30' 
          : getNotificationColor(notification.type || 'default')
      } backdrop-blur-sm rounded-lg p-4 border transition-all duration-200 hover:scale-[1.02] cursor-pointer`}
      onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
    >
      {!notification.isRead && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
      )}
      
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
            notification.isRead 
              ? 'bg-slate-700/50' 
              : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30'
          }`}>
            {getNotificationIcon(notification.type || 'default')}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`font-semibold ${
                notification.isRead ? 'text-slate-300' : 'text-white'
              }`}>
                {notification.title}
              </h3>
              <p className={`mt-1 text-sm ${
                notification.isRead ? 'text-slate-400' : 'text-slate-200'
              }`}>
                {notification.body}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className={`text-xs ${
                  notification.isRead ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
                {!notification.isRead && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkAsRead(notification.id);
                    }}
                    className="text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-3 py-1 rounded-full transition-colors duration-200 border border-blue-400/30"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
