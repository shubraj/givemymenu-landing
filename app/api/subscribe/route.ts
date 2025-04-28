import { NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/db';
import { sendWelcomeEmail, sendAdminNotification } from '@/lib/email';

// Import setup to ensure database is initialized
import '@/lib/setup';

// In-memory storage for emails when database isn't available
const memoryEmails: string[] = [];

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { email } = body;
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    let isNewSubscriber = false;
    
    try {
      // Add subscriber to database
      const result = await addSubscriber(email);
      // Only count as new subscriber if affectedRows > 0
      // MySQL returns affectedRows=0 for duplicate emails due to ON DUPLICATE KEY UPDATE
      isNewSubscriber = !!result && 'affectedRows' in result && result.affectedRows > 0;
    } catch (error) {
      // Check if error is a duplicate entry
      const errorStr = String(error);
      if (errorStr.includes('Duplicate entry') || errorStr.includes('ER_DUP_ENTRY')) {
        // Email already exists - not a new subscriber
        isNewSubscriber = false;
      } else {
        // If database is not available, store email in memory
        if (!memoryEmails.includes(email)) {
          memoryEmails.push(email);
          console.log('Database unavailable, storing email in memory:', email);
          console.log('Current emails in memory:', memoryEmails);
          isNewSubscriber = true;
        } else {
          // Email already exists in memory
          isNewSubscriber = false;
        }
      }
    }
    
    // Send welcome email to new subscribers ONLY
    if (isNewSubscriber) {
      // Send welcome email asynchronously (non-blocking)
      sendWelcomeEmail(email).catch(err => 
        console.error('Failed to send welcome email:', err)
      );
      
      // Send admin notification asynchronously (non-blocking)
      sendAdminNotification(email).catch(err => 
        console.error('Failed to send admin notification:', err)
      );
      
      console.log('Emails sent for new subscriber:', email);
    } else {
      console.log('Skipping email notifications for existing subscriber:', email);
    }
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: isNewSubscriber 
          ? 'Thank you! You\'re on the early access list.' 
          : 'You are already subscribed to our list.',
        isNewSubscriber
      },
      { status: isNewSubscriber ? 201 : 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    
    // Check if error is a duplicate entry
    const errorStr = String(error);
    if (errorStr.includes('Duplicate entry') || errorStr.includes('ER_DUP_ENTRY')) {
      return NextResponse.json(
        { success: true, message: 'You are already subscribed to our list.' },
        { status: 200 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
} 