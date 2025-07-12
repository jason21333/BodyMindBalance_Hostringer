import { NextResponse } from 'next/server';
import { getAllAppointments, updateAppointmentStatus } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'all';

    const appointments = await getAllAppointments();
    
    let filteredAppointments = appointments;
    if (filter !== 'all') {
      filteredAppointments = appointments.filter((apt: any) => apt.status === filter);
    }

    return NextResponse.json({
      success: true,
      appointments: filteredAppointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const appointmentId = searchParams.get('id');
    const { status } = await request.json();

    if (!appointmentId || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await updateAppointmentStatus(Number(appointmentId), status);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Appointment status updated successfully'
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating appointment status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update appointment status' },
      { status: 500 }
    );
  }
} 