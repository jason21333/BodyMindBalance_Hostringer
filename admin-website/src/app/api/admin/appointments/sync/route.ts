import { NextRequest, NextResponse } from 'next/server';
import { createUser, createAppointment } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const appointmentData = await request.json();
    
    console.log('Received appointment sync data:', appointmentData);

    // Extract patient data
    const { patient, doctor, service, ...appointment } = appointmentData;

    // Create or get user in admin database
    let user = await createUser({
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      password: 'default_password',
      role: 'patient'
    });

    // Create appointment in admin database
    const newAppointment = await createAppointment({
      patientId: user.id,
      doctorId: doctor.id,
      serviceId: service.id,
      date: appointment.date,
      time: appointment.time,
      notes: appointment.notes
    });

    console.log('Successfully synced appointment to admin database:', newAppointment);

    return NextResponse.json({
      success: true,
      message: 'Appointment synced successfully',
      appointment: newAppointment
    });
  } catch (error) {
    console.error('Error syncing appointment:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to sync appointment',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 