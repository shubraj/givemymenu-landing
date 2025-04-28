import { NextResponse } from 'next/server';
import { getSubscribers } from '@/lib/db';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

// Import setup to ensure database is initialized
import '@/lib/setup';

// JWT secret - should match login route
const JWT_SECRET = process.env.JWT_SECRET || 'givemymenu-dashboard-secret-key';

// Authentication middleware
async function authenticate() {
  try {
    const token = cookies().get('admin_token')?.value;
    
    if (!token) {
      return null;
    }
    
    // Verify JWT token
    const decoded = verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

export async function GET() {
  try {
    // Authenticate request
    const user = await authenticate();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get subscribers from database
    const subscribers = await getSubscribers();
    
    return NextResponse.json(
      { success: true, data: subscribers },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
} 