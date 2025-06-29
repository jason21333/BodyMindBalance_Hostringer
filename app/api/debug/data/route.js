import { NextResponse } from 'next/server';

// This will be the same in-memory database from lib/db.js
// For now, we'll create a simple endpoint to show the structure

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: 'Debug data endpoint',
      instructions: [
        'To view appointment data, visit: /api/admin/appointments',
        'To view all data in console, check the server logs',
        'Data is stored in-memory and will be lost on server restart'
      ],
      endpoints: {
        appointments: '/api/admin/appointments',
        admin_panel: '/admin',
        book_appointment: '/appointment'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 