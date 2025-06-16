import { sql } from '@vercel/postgres';

// Verify database connection
async function verifyConnection() {
  try {
    await sql`SELECT 1`;
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw new Error('Database connection failed. Please check your environment variables.');
  }
}

// Call verifyConnection when the module is loaded
verifyConnection().catch(console.error);

export async function createUser({ name, email, password, role = 'patient' }) {
  try {
    const result = await sql`
      INSERT INTO "Users" (name, email, password, role)
      VALUES (${name}, ${email}, ${password}, ${role})
      RETURNING id, name, email, role;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

export async function getUserByEmail(email) {
  try {
    const result = await sql`
      SELECT id, name, email, password, role
      FROM "Users"
      WHERE email = ${email};
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function createAppointment({ patientId, doctorId, serviceId, date, time, notes }) {
  try {
    const result = await sql`
      INSERT INTO "Appointments" (patient_id, doctor_id, service_id, date, time, notes, status)
      VALUES (${patientId}, ${doctorId}, ${serviceId}, ${date}, ${time}, ${notes}, 'pending')
      RETURNING id, date, time, status;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw new Error('Failed to create appointment');
  }
}

export async function getAvailableTimeSlots(doctorId, date) {
  try {
    const result = await sql`
      SELECT time
      FROM "DoctorAvailability"
      WHERE doctor_id = ${doctorId}
      AND date = ${date}
      AND time NOT IN (
        SELECT time
        FROM "Appointments"
        WHERE doctor_id = ${doctorId}
        AND date = ${date}
        AND status != 'cancelled'
      );
    `;
    return result.rows.map(row => row.time);
  } catch (error) {
    console.error('Error fetching available time slots:', error);
    throw new Error('Failed to fetch available time slots');
  }
}

export async function getAppointmentsByUserId(userId) {
  try {
    const result = await sql`
      SELECT 
        a.id,
        a.date,
        a.time,
        a.status,
        a.notes,
        d.name as doctor_name,
        s.name as service_name
      FROM "Appointments" a
      JOIN "Doctors" d ON a.doctor_id = d.id
      JOIN "Services" s ON a.service_id = s.id
      WHERE a.patient_id = ${userId}
      ORDER BY a.date DESC, a.time ASC;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw new Error('Failed to fetch appointments');
  }
}

export async function createNotification({ userId, title, message, type }) {
  try {
    const result = await sql`
      INSERT INTO "Notifications" (user_id, title, message, type)
      VALUES (${userId}, ${title}, ${message}, ${type})
      RETURNING id, title, message, created_at;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error creating notification:', error);
    throw new Error('Failed to create notification');
  }
}

export async function getUnreadNotifications(userId) {
  try {
    const result = await sql`
      SELECT id, title, message, type, created_at
      FROM "Notifications"
      WHERE user_id = ${userId}
      AND read = false
      ORDER BY created_at DESC;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw new Error('Failed to fetch notifications');
  }
} 