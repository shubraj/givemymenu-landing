import { initDB } from './db';

// Run database initialization if this module is imported
export async function setupDatabase() {
  console.log('Setting up database...');
  try {
    await initDB();
    console.log('Database setup complete');
  } catch (error) {
    console.error('Database setup failed:', error);
  }
}

// Initialize database when running as a server component
if (typeof process !== 'undefined' && process.env.NEXT_RUNTIME !== 'edge') {
  setupDatabase();
} 