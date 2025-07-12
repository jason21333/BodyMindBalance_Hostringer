import { NextResponse } from 'next/server';
import { getPatientAppointments } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const appointments = await getPatientAppointments(parseInt(id));
    
    return NextResponse.json({
      success: true,
      appointments
    });
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch patient appointments' },
      { status: 500 }
    );
  }
} 