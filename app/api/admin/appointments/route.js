import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'all';

    let query = `
      SELECT 
        a.id,
        a.date,
        a.time,
        a.status,
        a.notes,
        u.name as patient_name,
        u.email as patient_email,
        d.name as doctor_name,
        s.name as service_name
      FROM "Appointments" a
      JOIN "Users" u ON a.patient_id = u.id
      JOIN "Doctors" d ON a.doctor_id = d.id
      JOIN "Services" s ON a.service_id = s.id
    `;

    if (filter !== 'all') {
      query += ` WHERE a.status = '${filter}'`;
    }

    query += ` ORDER BY a.date DESC, a.time ASC`;

    const result = await sql.query(query);

    return NextResponse.json({
      success: true,
      appointments: result.rows
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch appointments' },
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

    // Update appointment status
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