import { NextResponse } from 'next/server';
import { createUser, createAppointment, createNotification, getAvailableTimeSlots, getAppointmentsByUserId } from '@/lib/db';

// Service mapping
const serviceMap = {
  'consultation': 1,
  'general consultation': 1,
  'specialist consultation': 2,
  'health screening': 3,
  'follow-up consultation': 4,
  'follow up consultation': 4
};

// Function to notify admin website about new appointment
async function notifyAdminWebsite(appointmentData) {
  try {
    const adminUrl = process.env.ADMIN_WEBSITE_URL || 'http://localhost:3002';
    const response = await fetch(`${adminUrl}/api/admin/appointments/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });
    
    if (!response.ok) {
      console.error('Failed to notify admin website:', response.statusText);
    } else {
      console.log('Successfully notified admin website about new appointment');
    }
  } catch (error) {
    console.error('Error notifying admin website:', error);
  }
}

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

    // Map service name to ID
    const serviceId = serviceMap[service.toLowerCase()] || 1; // Default to General Consultation

    // Get available time slots for the selected date
    const availableSlots = await getAvailableTimeSlots(1, date); // Assuming doctor ID 1 for now
    console.log('Available time slots:', availableSlots);
    console.log('Requested time:', time);
    
    // More flexible time slot validation
    const requestedTime = time.trim();
    const isTimeAvailable = availableSlots.some(slot => 
      slot.trim() === requestedTime || 
      slot.includes(requestedTime) || 
      requestedTime.includes(slot)
    );

    if (!isTimeAvailable) {
      console.log('Time slot not available. Available slots:', availableSlots);
      return NextResponse.json(
        { 
          success: false, 
          message: `Selected time slot (${time}) is not available. Available slots: ${availableSlots.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Create appointment
    const appointment = await createAppointment({
      patientId: user.id,
      doctorId: 1, // Assuming doctor ID 1 for now
      serviceId: serviceId,
      date: date,
      time: time,
      notes: message
    });

    // Create notification
    await createNotification({
      userId: user.id,
      appointmentId: appointment.id,
      notificationType: 'appointment_created',
      message: `Your appointment has been scheduled for ${date} at ${time}`
    });

    // Prepare data for admin website notification
    const appointmentData = {
      id: appointment.id,
      patient_id: user.id,
      doctor_id: 1,
      service_id: serviceId,
      date: date,
      time: time,
      notes: message,
      status: 'pending',
      patient: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: 'patient'
      },
      doctor: {
        id: 1,
        name: 'Dr. Agit Roy',
        specialty: 'General Medicine'
      },
      service: {
        id: serviceId,
        name: service
      }
    };

    // Notify admin website asynchronously (don't wait for response)
    notifyAdminWebsite(appointmentData);

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