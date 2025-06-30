import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getInMemoryDB } from '@/lib/db';

export async function PATCH(request, { params }) {
  try {
    const appointmentId = params.id;
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