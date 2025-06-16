import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Return dummy data for now
    const stats = {
      totalAppointments: 25,
      pendingAppointments: 8,
      totalPatients: 50,
      totalDoctors: 5
    };

    return NextResponse.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
} 