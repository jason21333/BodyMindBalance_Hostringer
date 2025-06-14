import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

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

    console.log('Creating/updating user...');
    // First, create or get the user
    const userResult = await sql`
      INSERT INTO "Users" (name, email, phone, password, role)
      VALUES (${name}, ${email}, ${phone}, 'default_password', 'patient')
      ON CONFLICT (email) DO UPDATE
      SET name = EXCLUDED.name, phone = EXCLUDED.phone
      RETURNING id;
    `;
    console.log('User result:', userResult.rows[0]);

    const userId = userResult.rows[0].id;

    console.log('Checking for available doctors...');
    // Get the first available doctor
    const doctorResult = await sql`
      SELECT id FROM "Doctors" LIMIT 1;
    `;
    console.log('Doctor result:', doctorResult.rows);

    if (doctorResult.rows.length === 0) {
      console.error('No doctors available in the database');
      throw new Error('No doctors available');
    }

    const doctorId = doctorResult.rows[0].id;
    console.log('Selected doctor ID:', doctorId);

    console.log('Creating appointment...');
    // Create the appointment
    const appointmentResult = await sql`
      INSERT INTO "Appointments" (
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        status
      )
      VALUES (
        ${userId},
        ${doctorId},
        ${date},
        ${time},
        'pending'
      )
      RETURNING id;
    `;
    console.log('Appointment created:', appointmentResult.rows[0]);

    const appointmentId = appointmentResult.rows[0].id;

    console.log('Creating notification...');
    // Create a notification for the appointment
    await sql`
      INSERT INTO "Notifications" (
        user_id,
        appointment_id,
        notification_type,
        notification_date
      )
      VALUES (
        ${userId},
        ${appointmentId},
        'appointment_created',
        CURRENT_DATE
      );
    `;
    console.log('Notification created successfully');

    return NextResponse.json({
      success: true,
      message: 'Appointment booked successfully',
      appointmentId
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
        error: error.message,
        details: error.stack
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('Fetching appointments...');
    const result = await sql`
      SELECT 
        a.id,
        a.appointment_date,
        a.appointment_time,
        a.status,
        u.name as patient_name,
        u.email as patient_email,
        d.name as doctor_name,
        d.specialty
      FROM "Appointments" a
      JOIN "Users" u ON a.patient_id = u.id
      JOIN "Doctors" d ON a.doctor_id = d.id
      ORDER BY a.appointment_date DESC, a.appointment_time DESC;
    `;
    console.log('Found appointments:', result.rows.length);

    return NextResponse.json({
      success: true,
      appointments: result.rows
    });
  } catch (error) {
    console.error('Error fetching appointments:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch appointments',
        error: error.message,
        details: error.stack
      },
      { status: 500 }
    );
  }
} 