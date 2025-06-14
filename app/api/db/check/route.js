import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Check Users table
    const usersCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'Users'
      );
    `;

    // Check Doctors table
    const doctorsCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'Doctors'
      );
    `;

    // Check Appointments table
    const appointmentsCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'Appointments'
      );
    `;

    // Check if we have any doctors
    const doctorsCount = await sql`
      SELECT COUNT(*) FROM "Doctors";
    `;

    return NextResponse.json({
      success: true,
      databaseStatus: {
        usersTableExists: usersCheck.rows[0].exists,
        doctorsTableExists: doctorsCheck.rows[0].exists,
        appointmentsTableExists: appointmentsCheck.rows[0].exists,
        doctorsCount: parseInt(doctorsCount.rows[0].count)
      }
    });
  } catch (error) {
    console.error('Database check error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Database check failed',
        error: error.message 
      },
      { status: 500 }
    );
  }
} 