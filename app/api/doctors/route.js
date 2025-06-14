import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const result = await sql`
      SELECT id, name, specialty, email, phone
      FROM "Doctors"
      ORDER BY name;
    `;

    return NextResponse.json({
      success: true,
      doctors: result.rows
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
} 