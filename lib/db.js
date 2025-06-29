import { sql } from '@vercel/postgres';

// In-memory storage for development when no database is available
// Make this a global variable that persists across requests
global.inMemoryDB = global.inMemoryDB || {
  users: [],
  appointments: [],
  doctors: [
    { id: 1, name: 'Dr. Agit Roy', specialty: 'General Medicine', email: 'agit.roy@bmb.com' },
    { id: 2, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', email: 'sarah.johnson@bmb.com' },
    { id: 3, name: 'Dr. Michael Chen', specialty: 'Endocrinology', email: 'michael.chen@bmb.com' }
  ],
  services: [
    { id: 1, name: 'General Consultation', price: 500.00 },
    { id: 2, name: 'Specialist Consultation', price: 800.00 },
    { id: 3, name: 'Health Screening', price: 1200.00 },
    { id: 4, name: 'Follow-up Consultation', price: 300.00 }
  ],
  notifications: []
};

// Global counters that persist across requests
global.userIdCounter = global.userIdCounter || 1;
global.appointmentIdCounter = global.appointmentIdCounter || 1;
global.notificationIdCounter = global.notificationIdCounter || 1;

// Check if we have a real database connection
let hasRealDB = false;

// Verify database connection
async function verifyConnection() {
  try {
    await sql`SELECT 1`;
    console.log('Database connection successful');
    hasRealDB = true;
    return true;
  } catch (error) {
    console.log('Database connection failed, using in-memory storage for development');
    hasRealDB = false;
    return false;
  }
}

// Initialize database connection check
verifyConnection().catch(() => {
  hasRealDB = false;
});

export async function createUser({ name, email, phone, password, role = 'patient' }) {
  try {
    if (hasRealDB) {
      const result = await sql`
        INSERT INTO "Users" (name, email, phone, password, role)
        VALUES (${name}, ${email}, ${phone}, ${password}, ${role})
        RETURNING id, name, email, role;
      `;
      return result.rows[0];
    } else {
      // In-memory storage
      const user = {
        id: global.userIdCounter++,
        name,
        email,
        phone,
        role
      };
      global.inMemoryDB.users.push(user);
      console.log('Created user in memory:', user);
      console.log('Total users in memory:', global.inMemoryDB.users.length);
      return user;
    }
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

export async function getUserByEmail(email) {
  try {
    if (hasRealDB) {
      const result = await sql`
        SELECT id, name, email, password, role
        FROM "Users"
        WHERE email = ${email};
      `;
      return result.rows[0];
    } else {
      return global.inMemoryDB.users.find(user => user.email === email);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function createAppointment({ patientId, doctorId, serviceId, date, time, notes }) {
  try {
    if (hasRealDB) {
      const result = await sql`
        INSERT INTO "Appointments" (patient_id, doctor_id, service_id, date, time, notes, status)
        VALUES (${patientId}, ${doctorId}, ${serviceId}, ${date}, ${time}, ${notes}, 'pending')
        RETURNING id, date, time, status;
      `;
      return result.rows[0];
    } else {
      // In-memory storage
      const appointment = {
        id: global.appointmentIdCounter++,
        patient_id: patientId,
        doctor_id: doctorId,
        service_id: serviceId,
        date,
        time,
        notes,
        status: 'pending'
      };
      global.inMemoryDB.appointments.push(appointment);
      console.log('Created appointment in memory:', appointment);
      console.log('Total appointments in memory:', global.inMemoryDB.appointments.length);
      return appointment;
    }
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw new Error('Failed to create appointment');
  }
}

export async function getAvailableTimeSlots(doctorId, date) {
  try {
    if (hasRealDB) {
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
    } else {
      // Return default time slots for development
      return ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
    }
  } catch (error) {
    console.error('Error fetching available time slots:', error);
    return ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
  }
}

export async function getAppointmentsByUserId(userId) {
  try {
    if (hasRealDB) {
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
    } else {
      // In-memory storage
      return global.inMemoryDB.appointments
        .filter(apt => apt.patient_id === userId)
        .map(apt => ({
          id: apt.id,
          date: apt.date,
          time: apt.time,
          status: apt.status,
          notes: apt.notes,
          doctor_name: global.inMemoryDB.doctors.find(d => d.id === apt.doctor_id)?.name || 'Unknown Doctor',
          service_name: global.inMemoryDB.services.find(s => s.id === apt.service_id)?.name || 'Unknown Service'
        }));
    }
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
}

export async function createNotification({ userId, appointmentId, notificationType, message }) {
  try {
    if (hasRealDB) {
      const result = await sql`
        INSERT INTO "Notifications" (user_id, appointment_id, notification_type, message)
        VALUES (${userId}, ${appointmentId}, ${notificationType}, ${message})
        RETURNING id, message, created_at;
      `;
      return result.rows[0];
    } else {
      // In-memory storage
      const notification = {
        id: global.notificationIdCounter++,
        user_id: userId,
        appointment_id: appointmentId,
        notification_type: notificationType,
        message,
        created_at: new Date().toISOString()
      };
      global.inMemoryDB.notifications.push(notification);
      return notification;
    }
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
}

export async function getUnreadNotifications(userId) {
  try {
    if (hasRealDB) {
      const result = await sql`
        SELECT id, message, notification_type, created_at
        FROM "Notifications"
        WHERE user_id = ${userId}
        AND read = false
        ORDER BY created_at DESC;
      `;
      return result.rows;
    } else {
      // In-memory storage
      return global.inMemoryDB.notifications
        .filter(notif => notif.user_id === userId)
        .map(notif => ({
          id: notif.id,
          message: notif.message,
          notification_type: notif.notification_type,
          created_at: notif.created_at
        }));
    }
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}

// Export the in-memory database for admin routes
export function getInMemoryDB() {
  return global.inMemoryDB;
} 