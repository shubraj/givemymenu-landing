import { NextResponse } from 'next/server';
import { getSubscribers } from '@/lib/db';
import { cookies } from 'next/headers';

// Import setup to ensure database is initialized
import '@/lib/setup';

// Helper function to authenticate admin
async function authenticate() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    
    if (!token) {
      return null;
    }
    
    // Verify token (you should use a proper JWT verification here)
    // For now, we'll just check if it's a non-empty string
    if (typeof token !== 'string' || token.length === 0) {
      return null;
    }
    
    return { isAuthenticated: true };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function GET() {
  try {
    // Authenticate the request
    const auth = await authenticate();
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get subscribers from database
    const subscribers = await getSubscribers();
    
    return NextResponse.json({
      data: subscribers
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
} 