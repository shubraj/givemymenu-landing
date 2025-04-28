// Script to create a starter .env.local file
const fs = require('fs');
const path = require('path');

const envContent = `# Base URL for the application
PUBLIC_URL=http://localhost:3000

# Database configuration
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=givemymenu

# JWT secret for authentication
JWT_SECRET=givemymenu-dashboard-secret-key

# SMTP configuration for email sending
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASSWORD=your_smtp_password
SMTP_FROM_EMAIL=no-reply@givemymenu.com
SMTP_FROM_NAME=Give My Menu
`;

const envPath = path.join(__dirname, '..', '.env.local');

// Check if file already exists
if (fs.existsSync(envPath)) {
  console.log('\x1b[33m%s\x1b[0m', '.env.local already exists. Rename or delete it to create a new one.');
} else {
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\x1b[32m%s\x1b[0m', '.env.local created successfully!');
    console.log('\x1b[36m%s\x1b[0m', 'Make sure to update the values with your actual configuration.');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error creating .env.local file:', error.message);
  }
} 