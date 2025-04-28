// Email service for sending notifications

import nodemailer from 'nodemailer';

// Create a transporter using SMTP configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Send a welcome email to a new subscriber
 * In a real implementation, this would use an email service like SendGrid, Mailchimp, etc.
 * For now, we'll just log the email content to the console
 */
export async function sendWelcomeEmail(email: string) {
  try {
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: 'Welcome to Give My Menu!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #eb8036;">Welcome to Give My Menu!</h1>
          <p>Thank you for joining our early access program. We're excited to have you on board!</p>
          <p>We'll keep you updated on our progress and let you know as soon as we're ready to launch.</p>
          <p>In the meantime, feel free to reach out if you have any questions.</p>
          <p>Best regards,<br>The Give My Menu Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully to:', email);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}

/**
 * Send a notification email to admin when a new subscriber signs up
 */
export async function sendAdminNotification(email: string) {
  try {
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_FROM_EMAIL,
      subject: 'New Early Access Signup',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #eb8036;">New Early Access Signup</h1>
          <p>A new user has signed up for early access:</p>
          <p><strong>Email:</strong> ${email}</p>
          <p>You can view all signups in your admin dashboard.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Admin notification sent successfully for:', email);
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw error;
  }
} 