import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';

export async function POST() {
  try {
    console.log('Starting database setup...');

    // Read and execute schema
    const schemaPath = path.join(process.cwd(), 'app', 'db', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    // Execute each statement
    for (const statement of statements) {
      if (statement) {
        await sql.unsafe(statement);
      }
    }

    console.log('Schema executed successfully');

    // Import and run seed data
    const { seedDatabase } = await import('@/app/db/seed.js');
    await seedDatabase();

    return NextResponse.json({
      success: true,
      message: 'Database setup completed successfully'
    });
  } catch (error) {
    console.error('Database setup error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Database setup failed',
        error: error.message
      },
      { status: 500 }
    );
  }
} 