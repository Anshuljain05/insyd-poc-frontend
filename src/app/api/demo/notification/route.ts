import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/config/api';

const API_BASE_URL = config.apiUrl;

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json();
    
    console.log('Creating demo notification:', eventData);
    console.log('API_BASE_URL:', API_BASE_URL);

    const response = await fetch(`${API_BASE_URL}/v1/notifications/events`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'Insyd-Frontend/1.0'
      },
      body: JSON.stringify(eventData)
    });

    console.log('Backend response status:', response.status);
    console.log('Backend response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      return NextResponse.json(
        { error: `API Error: ${response.status} - ${errorText}` }, 
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log('Demo notification created:', result.id);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Demo API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to create notification: ${errorMessage}` }, 
      { status: 500 }
    );
  }
}
