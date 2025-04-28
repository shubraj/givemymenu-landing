import mysql from 'mysql2/promise';

// MySQL connection pool - only initialize in server components, not edge runtime
let pool: any;

// Initialize pool if not in edge runtime
if (typeof process !== 'undefined' && process.env.NEXT_RUNTIME !== 'edge') {
  try {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'givemymenu',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    console.log('MySQL connection pool created');
  } catch (error) {
    console.error('Error creating MySQL connection pool:', error);
  }
}

// Initialize database - only for server components
export async function initDB() {
  // Skip if in edge runtime
  if (typeof process !== 'undefined' && process.env.NEXT_RUNTIME === 'edge') {
    console.log('Skipping DB initialization in edge runtime');
    return;
  }

  try {
    // Create subscribers table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create admin users table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Database initialized successfully');
    
    // Check if default admin exists
    const [admins] = await pool.query('SELECT * FROM admin_users');
    const adminsArray = admins as any[];
    
    if (adminsArray.length === 0) {
      // Import bcrypt for hashing
      const bcrypt = require('bcryptjs');
      
      // Create default admin (username: admin, password: givemymenu)
      const hashedPassword = await bcrypt.hash('givemymenu', 10);
      
      await pool.query(
        'INSERT INTO admin_users (username, password) VALUES (?, ?)',
        ['admin', hashedPassword]
      );
      
      console.log('Default admin user created');
    }
    
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Execute DB query - check for edge runtime first
export async function query(sql: string, params?: any[]) {
  // Handle edge runtime gracefully
  if (typeof process !== 'undefined' && process.env.NEXT_RUNTIME === 'edge') {
    console.warn('MySQL queries not supported in edge runtime');
    return [];
  }

  try {
    const [results] = await pool.query(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Add a subscriber
export async function addSubscriber(email: string) {
  try {
    // In edge runtime, return a mock result
    if (typeof process !== 'undefined' && process.env.NEXT_RUNTIME === 'edge') {
      console.log('Mock storing email in edge runtime:', email);
      return { insertId: 1 };
    }

    const result = await query(
      'INSERT INTO subscribers (email) VALUES (?) ON DUPLICATE KEY UPDATE email=email',
      [email]
    );
    return result;
  } catch (error) {
    console.error('Error adding subscriber:', error);
    throw error;
  }
}

// Get all subscribers
export async function getSubscribers() {
  try {
    const subscribers = await query('SELECT * FROM subscribers ORDER BY created_at DESC');
    return subscribers;
  } catch (error) {
    console.error('Error getting subscribers:', error);
    throw error;
  }
}

// Verify admin credentials
export async function verifyAdmin(username: string, password: string) {
  try {
    const bcrypt = require('bcryptjs');
    
    const users = await query('SELECT * FROM admin_users WHERE username = ?', [username]);
    const usersArray = users as any[];
    
    if (usersArray.length === 0) {
      return null;
    }
    
    const user = usersArray[0];
    const isValid = await bcrypt.compare(password, user.password);
    
    if (isValid) {
      return { id: user.id, username: user.username };
    }
    
    return null;
  } catch (error) {
    console.error('Error verifying admin:', error);
    throw error;
  }
} 