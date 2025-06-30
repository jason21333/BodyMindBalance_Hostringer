import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getInMemoryDB } from '@/lib/db';

export async function GET(request) {
  try {
    // Get filter from query params
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'all';

    // Check if we have a real database connection
    let hasRealDB = false;
    try {
      await sql`SELECT 1`;
      hasRealDB = true;
    } catch (error) {
      hasRealDB = false;
    }

    if (hasRealDB) {
      // Use real database
      let result;
      if (filter === 'all') {
        result = await sql`
          SELECT 
            a.id,
            a.date,
            a.time,
            a.status,
            a.notes,
            u.name as patient_name,
            u.email as patient_email,
            u.phone as patient_phone,
            d.name as doctor_name,
            s.name as service_name
          FROM "Appointments" a
          JOIN "Users" u ON a.patient_id = u.id
          JOIN "Doctors" d ON a.doctor_id = d.id
          JOIN "Services" s ON a.service_id = s.id
          ORDER BY a.date DESC, a.time ASC;
        `;
      } else {
        result = await sql`
          SELECT 
            a.id,
            a.date,
            a.time,
            a.status,
            a.notes,
            u.name as patient_name,
            u.email as patient_email,
            u.phone as patient_phone,
            d.name as doctor_name,
            s.name as service_name
          FROM "Appointments" a
          JOIN "Users" u ON a.patient_id = u.id
          JOIN "Doctors" d ON a.doctor_id = d.id
          JOIN "Services" s ON a.service_id = s.id
          WHERE a.status = ${filter}
          ORDER BY a.date DESC, a.time ASC;
        `;
      }
      return NextResponse.json({
        success: true,
        appointments: result.rows,
        source: 'database'
      });
    } else {
      // Use in-memory storage
      const inMemoryDB = getInMemoryDB();
      console.log('Admin API - In-memory DB state:', {
        users: inMemoryDB.users.length,
        appointments: inMemoryDB.appointments.length,
        doctors: inMemoryDB.doctors.length,
        services: inMemoryDB.services.length
      });

      let appointments = inMemoryDB.appointments.map(apt => ({
        id: apt.id,
        date: apt.date,
        time: apt.time,
        status: apt.status,
        notes: apt.notes,
        patient_name: inMemoryDB.users.find(u => u.id === apt.patient_id)?.name || 'Unknown',
        patient_email: inMemoryDB.users.find(u => u.id === apt.patient_id)?.email || 'Unknown',
        patient_phone: inMemoryDB.users.find(u => u.id === apt.patient_id)?.phone || 'Unknown',
        doctor_name: inMemoryDB.doctors.find(d => d.id === apt.doctor_id)?.name || 'Unknown Doctor',
        service_name: inMemoryDB.services.find(s => s.id === apt.service_id)?.name || 'Unknown Service'
      }));

      if (filter !== 'all') {
        appointments = appointments.filter(apt => apt.status === filter);
      }

      return NextResponse.json({
        success: true,
        appointments,
        source: 'in-memory',
        total_appointments: appointments.length,
        total_users: inMemoryDB.users.length,
        debug_info: {
          users: inMemoryDB.users,
          appointments: inMemoryDB.appointments
        }
      });
    }
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

export async function PATCH(request) {
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

    // Check if we have a real database connection
    let hasRealDB = false;
    try {
      await sql`SELECT 1`;
      hasRealDB = true;
    } catch (error) {
      hasRealDB = false;
    }

    if (hasRealDB) {
      // Update appointment status in real DB
      await sql`
        UPDATE "Appointments"
        SET status = ${status}
        WHERE id = ${appointmentId}
      `;

      // Create notification for the patient
      const appointment = await sql`
        SELECT patient_id, date, time
        FROM "Appointments"
        WHERE id = ${appointmentId}
      `;

      if (appointment.rows[0]) {
        await sql`
          INSERT INTO "Notifications" (user_id, title, message, type)
          VALUES (
            ${appointment.rows[0].patient_id},
            'Appointment Status Updated',
            ${`Your appointment on ${new Date(appointment.rows[0].date).toLocaleDateString()} at ${appointment.rows[0].time} has been ${status}`},
            'appointment'
          )
        `;
      }
    } else {
      // Update appointment status in in-memory DB
      const inMemoryDB = getInMemoryDB();
      const apt = inMemoryDB.appointments.find(a => String(a.id) === String(appointmentId));
      if (!apt) {
        return NextResponse.json(
          { success: false, error: 'Appointment not found (in-memory)' },
          { status: 404 }
        );
      }
      apt.status = status;
    }

    return NextResponse.json({
      success: true,
      message: 'Appointment status updated successfully'
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update appointment' },
      { status: 500 }
    );
  }
} 