import { NextResponse } from 'next/server';
import { createUser, createAppointment, createNotification, getAvailableTimeSlots } from '@/app/lib/db';

export async function POST(request) {
  try {
    console.log('Starting appointment booking process...');
    
    const requestData = await request.json();
    console.log('Received appointment data:', requestData);

    const {
      name,
      email,
      phone,
      date,
      time,
      service,
      message
    } = requestData;

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !service) {
      console.error('Missing required fields:', { name, email, phone, date, time, service });
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create or get user
    const user = await createUser({
      name,
      email,
      phone,
      password: 'default_password', // In a real app, you'd want to handle this differently
      role: 'patient'
    });

    // Get available time slots for the selected date
    const availableSlots = await getAvailableTimeSlots(1, date); // Assuming doctor ID 1 for now
    if (!availableSlots.includes(time)) {
      return NextResponse.json(
        { success: false, message: 'Selected time slot is not available' },
        { status: 400 }
      );
    }

    // Create appointment
    const appointment = await createAppointment({
      patientId: user.id,
      doctorId: 1, // Assuming doctor ID 1 for now
      serviceId: 1, // You'll need to map service names to IDs
      appointmentDate: date,
      appointmentTime: time,
      notes: message
    });

    // Create notification
    await createNotification({
      userId: user.id,
      appointmentId: appointment.id,
      notificationType: 'appointment_created',
      message: `Your appointment has been scheduled for ${date} at ${time}`
    });

    return NextResponse.json({
      success: true,
      message: 'Appointment booked successfully',
      appointmentId: appointment.id
    });
  } catch (error) {
    console.error('Detailed error in appointment booking:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to book appointment',
        error: error.message
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const appointments = await getAppointmentsByUserId(userId);
    
    return NextResponse.json({
      success: true,
      appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch appointments',
        error: error.message
      },
      { status: 500 }
    );
  }
} 