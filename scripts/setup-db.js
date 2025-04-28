// Simple script to manually initialize the database
require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function setupDatabase() {
  console.log('Setting up database...');
  
  // Create connection
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    multipleStatements: true // Allow multiple statements
  });
  
  try {
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE || 'givemymenu'}`);
    console.log(`Database '${process.env.MYSQL_DATABASE || 'givemymenu'}' created or already exists`);
    
    // Use the database
    await connection.query(`USE ${process.env.MYSQL_DATABASE || 'givemymenu'}`);
    
    // Create tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tables created successfully');
    
    // Check if default admin exists
    const [admins] = await connection.query('SELECT * FROM admin_users');
    
    if (admins.length === 0) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash('givemymenu', 10);
      
      await connection.query(
        'INSERT INTO admin_users (username, password) VALUES (?, ?)',
        ['admin', hashedPassword]
      );
      
      console.log('Default admin user created with credentials:');
      console.log('Username: admin');
      console.log('Password: givemymenu');
    } else {
      console.log('Admin user already exists');
    }
    
    console.log('Database setup complete!');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await connection.end();
  }
}

// Run the setup
setupDatabase(); 