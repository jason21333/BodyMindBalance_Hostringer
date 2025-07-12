import { NextRequest, NextResponse } from 'next/server';
import { updateAppointmentStatus } from '@/lib/db';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        { success: false, message: 'Status is required' },
        { status: 400 }
      );
    }

    const updatedAppointment = await updateAppointmentStatus(id, status);

    if (!updatedAppointment) {
      return NextResponse.json(
        { success: false, message: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Appointment status updated successfully',
      appointment: updatedAppointment
    });

  } catch (error) {
    console.error('Error updating appointment status:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to update appointment status',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 