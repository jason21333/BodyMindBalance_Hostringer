import { sql } from '@vercel/postgres';

// In-memory storage for development when no database is available
let inMemoryDB = {
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

let userIdCounter = 1;
let appointmentIdCounter = 1;
let notificationIdCounter = 1;

// Verify database connection
async function verifyConnection() {
  try {
    await sql`SELECT 1`;
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.log('Database connection failed, using in-memory storage for development');
    return false;
  }
}

// Check if we have a real database connection
let hasRealDB = false;
verifyConnection().then(result => {
  hasRealDB = result;
}).catch(() => {
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
        id: userIdCounter++,
        name,
        email,
        phone,
        role
      };
      inMemoryDB.users.push(user);
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
      return inMemoryDB.users.find(user => user.email === email);
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
        id: appointmentIdCounter++,
        patient_id: patientId,
        doctor_id: doctorId,
        service_id: serviceId,
        date,
        time,
        notes,
        status: 'pending'
      };
      inMemoryDB.appointments.push(appointment);
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
      return inMemoryDB.appointments
        .filter(apt => apt.patient_id === userId)
        .map(apt => ({
          id: apt.id,
          date: apt.date,
          time: apt.time,
          status: apt.status,
          notes: apt.notes,
          doctor_name: inMemoryDB.doctors.find(d => d.id === apt.doctor_id)?.name || 'Unknown Doctor',
          service_name: inMemoryDB.services.find(s => s.id === apt.service_id)?.name || 'Unknown Service'
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
        id: notificationIdCounter++,
        user_id: userId,
        appointment_id: appointmentId,
        notification_type: notificationType,
        message,
        created_at: new Date().toISOString()
      };
      inMemoryDB.notifications.push(notification);
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
      return inMemoryDB.notifications
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