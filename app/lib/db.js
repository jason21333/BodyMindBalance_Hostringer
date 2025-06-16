import { sql } from '@vercel/postgres';

export async function createUser({ name, email, phone, password, role = 'patient' }) {
  try {
    const result = await sql`
      INSERT INTO "Users" (name, email, phone, password, role)
      VALUES (${name}, ${email}, ${phone}, ${password}, ${role})
      RETURNING id, name, email, phone, role;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getUserByEmail(email) {
  try {
    const result = await sql`
      SELECT * FROM "Users"
      WHERE email = ${email};
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

export async function createAppointment({
  patientId,
  doctorId,
  serviceId,
  appointmentDate,
  appointmentTime,
  notes = ''
}) {
  try {
    const result = await sql`
      INSERT INTO "Appointments" (
        patient_id,
        doctor_id,
        service_id,
        appointment_date,
        appointment_time,
        notes
      )
      VALUES (
        ${patientId},
        ${doctorId},
        ${serviceId},
        ${appointmentDate},
        ${appointmentTime},
        ${notes}
      )
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
}

export async function getAvailableTimeSlots(doctorId, date) {
  try {
    // Get doctor's availability for the day of week
    const dayOfWeek = new Date(date).getDay();
    const result = await sql`
      SELECT start_time, end_time
      FROM "DoctorAvailability"
      WHERE doctor_id = ${doctorId}
      AND day_of_week = ${dayOfWeek}
      AND is_available = true;
    `;

    // Get booked appointments for the date
    const bookedSlots = await sql`
      SELECT appointment_time
      FROM "Appointments"
      WHERE doctor_id = ${doctorId}
      AND appointment_date = ${date}
      AND status != 'cancelled';
    `;

    // Process and return available time slots
    const bookedTimes = new Set(bookedSlots.rows.map(slot => slot.appointment_time));
    const availableSlots = [];

    result.rows.forEach(availability => {
      let currentTime = new Date(`2000-01-01T${availability.start_time}`);
      const endTime = new Date(`2000-01-01T${availability.end_time}`);

      while (currentTime < endTime) {
        const timeString = currentTime.toTimeString().slice(0, 5);
        if (!bookedTimes.has(timeString)) {
          availableSlots.push(timeString);
        }
        currentTime.setMinutes(currentTime.getMinutes() + 30); // 30-minute slots
      }
    });

    return availableSlots;
  } catch (error) {
    console.error('Error getting available time slots:', error);
    throw error;
  }
}

export async function getAppointmentsByUserId(userId) {
  try {
    const result = await sql`
      SELECT 
        a.*,
        d.name as doctor_name,
        d.specialty as doctor_specialty,
        s.name as service_name,
        s.duration as service_duration
      FROM "Appointments" a
      JOIN "Doctors" d ON a.doctor_id = d.id
      JOIN "Services" s ON a.service_id = s.id
      WHERE a.patient_id = ${userId}
      ORDER BY a.appointment_date DESC, a.appointment_time DESC;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error getting appointments:', error);
    throw error;
  }
}

export async function createNotification({
  userId,
  appointmentId,
  notificationType,
  message
}) {
  try {
    const result = await sql`
      INSERT INTO "Notifications" (
        user_id,
        appointment_id,
        notification_type,
        message
      )
      VALUES (
        ${userId},
        ${appointmentId},
        ${notificationType},
        ${message}
      )
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

export async function getUnreadNotifications(userId) {
  try {
    const result = await sql`
      SELECT * FROM "Notifications"
      WHERE user_id = ${userId}
      AND is_read = false
      ORDER BY created_at DESC;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error getting notifications:', error);
    throw error;
  }
} 