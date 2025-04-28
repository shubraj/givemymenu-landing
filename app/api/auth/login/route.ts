import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/db';
import { cookies } from 'next/headers';
import { sign } from 'jsonwebtoken';

// Import setup to ensure database is initialized
import '@/lib/setup';

// JWT secret - in production, use a proper env variable
const JWT_SECRET = process.env.JWT_SECRET || 'givemymenu-dashboard-secret-key';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { username, password } = body;
    
    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    // Verify credentials
    const user = await verifyAdmin(username, password);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid username or password' },
        { status: 401 }
      );
    }
    
    // Generate JWT token
    const token = sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Set HTTP-only cookie
    cookies().set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
      sameSite: 'strict',
    });
    
    return NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 500 }
    );
  }
} 