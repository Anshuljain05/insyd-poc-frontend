import { Notification } from '@/types/notification';

type NotificationCallback = (notification: Notification) => void;

export class NotificationSocket {
  private socket: WebSocket | null = null;
  private callbacks: NotificationCallback[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  constructor(private userId: string, private apiUrl: string) {}

  connect() {
    try {
      // Convert HTTP URL to WebSocket URL
      const wsUrl = this.apiUrl.replace(/^https:\/\//, 'wss://').replace(/^http:\/\//, 'ws://');
      this.socket = new WebSocket(`${wsUrl}?userId=${this.userId}`);
      
      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'notification.new') {
            this.callbacks.forEach(callback => callback(data.payload));
          }
        } catch (error) {
          console.error('Error parsing notification:', error);
        }
      };

      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectTimeout = setTimeout(() => {
            this.reconnectAttempts++;
            console.log(`Reconnecting... attempt ${this.reconnectAttempts}`);
            this.connect();
          }, Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000));
        }
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
    }
  }

  onNotification(callback: NotificationCallback) {
    this.callbacks.push(callback);
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.callbacks = [];
  }
}
