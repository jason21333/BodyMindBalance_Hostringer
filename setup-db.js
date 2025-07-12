#!/usr/bin/env node

/**
 * Database Setup Script
 * Run this script to set up your database for development
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Setting up BMB Website Database...\n');

try {
  // Check if POSTGRES_URL is set
  if (!process.env.POSTGRES_URL) {
    console.log('⚠️  POSTGRES_URL environment variable not found.');
    console.log('📝 Please set up your database connection:');
    console.log('');
    console.log('For local PostgreSQL:');
    console.log('export POSTGRES_URL="postgresql://username:password@localhost:5432/bmb_website"');
    console.log('');
    console.log('For Vercel Postgres:');
    console.log('export POSTGRES_URL="postgresql://username:password@host:port/database"');
    console.log('');
    console.log('Or create a .env.local file with:');
    console.log('POSTGRES_URL=your_connection_string_here');
    console.log('');
    process.exit(1);
  }

  console.log('✅ Database connection configured');
  console.log('📊 Setting up database schema and seed data...\n');

  // Call the setup API
  const response = await fetch('http://localhost:3000/api/db/setup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  if (result.success) {
    console.log('✅ Database setup completed successfully!');
    console.log('');
    console.log('🎉 Your appointment booking system is ready!');
    console.log('📍 Main Website: http://localhost:3000');
    console.log('📅 Book Appointment: http://localhost:3000/appointment');
    console.log('👨‍⚕️  Admin Website: http://localhost:3002 (separate website)');
  } else {
    console.error('❌ Database setup failed:', result.message);
    if (result.error) {
      console.error('Error details:', result.error);
    }
    process.exit(1);
  }

} catch (error) {
  console.error('❌ Setup failed:', error.message);
  console.log('');
  console.log('💡 Make sure your development server is running:');
  console.log('npm run dev');
  console.log('');
  process.exit(1);
} 