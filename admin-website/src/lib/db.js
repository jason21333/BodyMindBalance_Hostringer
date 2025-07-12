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
      // Check if user already exists
      const existingUser = await sql`
        SELECT id, name, email, role
        FROM "Users"
        WHERE email = ${email};
      `;
      
      if (existingUser.rows.length > 0) {
        console.log('User already exists:', existingUser.rows[0]);
        return existingUser.rows[0];
      }
      
      const result = await sql`
        INSERT INTO "Users" (name, email, phone, password, role)
        VALUES (${name}, ${email}, ${phone}, ${password}, ${role})
        RETURNING id, name, email, role;
      `;
      return result.rows[0];
    } else {
      // In-memory storage - check if user already exists
      const existingUser = global.inMemoryDB.users.find(user => user.email === email);
      if (existingUser) {
        console.log('User already exists in memory:', existingUser);
        return existingUser;
      }
      
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

// Admin-specific functions
export async function getAllAppointments() {
  try {
    if (hasRealDB) {
      const result = await sql`
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
        ORDER BY a.date DESC, a.time DESC;
      `;
      return result.rows;
    } else {
      // Sort in-memory appointments by date and time descending
      return global.inMemoryDB.appointments
        .slice()
        .sort((a, b) => {
          const dateA = new Date(a.date + 'T' + a.time);
          const dateB = new Date(b.date + 'T' + b.time);
          return dateB - dateA;
        })
        .map(apt => ({
          id: apt.id,
          date: apt.date,
          time: apt.time,
          status: apt.status,
          notes: apt.notes,
          patient_name: global.inMemoryDB.users.find(u => u.id === apt.patient_id)?.name || 'Unknown',
          patient_email: global.inMemoryDB.users.find(u => u.id === apt.patient_id)?.email || 'Unknown',
          patient_phone: global.inMemoryDB.users.find(u => u.id === apt.patient_id)?.phone || 'Unknown',
          doctor_name: global.inMemoryDB.doctors.find(d => d.id === apt.doctor_id)?.name || 'Unknown Doctor',
          service_name: global.inMemoryDB.services.find(s => s.id === apt.service_id)?.name || 'Unknown Service'
        }));
    }
  } catch (error) {
    console.error('Error fetching all appointments:', error);
    return [];
  }
}

export async function getAllPatients() {
  try {
    if (hasRealDB) {
      const result = await sql`
        SELECT 
          u.id,
          u.name,
          u.email,
          u.phone,
          u.role,
          COUNT(a.id) as total_appointments,
          MAX(a.date) as last_appointment
        FROM "Users" u
        LEFT JOIN "Appointments" a ON u.id = a.patient_id
        WHERE u.role = 'patient'
        GROUP BY u.id, u.name, u.email, u.phone, u.role
        ORDER BY u.name ASC;
      `;
      return result.rows.map(row => ({
        ...row,
        appointment_count: Number(row.total_appointments),
        total_appointments: Number(row.total_appointments)
      }));
    } else {
      const db = global.inMemoryDB;
      const patients = db.users.filter(user => user.role === 'patient');
      
      return patients.map(patient => {
        const patientAppointments = db.appointments.filter(apt => apt.patient_id === patient.id);
        const totalAppointments = patientAppointments.length;
        const lastAppointment = patientAppointments.length > 0 
          ? patientAppointments.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date
          : null;
        
        return {
          id: patient.id,
          name: patient.name,
          email: patient.email,
          phone: patient.phone,
          role: patient.role,
          appointment_count: totalAppointments,
          total_appointments: totalAppointments,
          last_appointment: lastAppointment
        };
      });
    }
  } catch (error) {
    console.error('Error fetching all patients:', error);
    return [];
  }
}

export async function getPatientAppointments(patientId) {
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
        WHERE a.patient_id = ${patientId}
        ORDER BY a.date DESC, a.time ASC;
      `;
      return result.rows;
    } else {
      const db = global.inMemoryDB;
      return db.appointments
        .filter(apt => apt.patient_id === patientId)
        .map(apt => ({
          id: apt.id,
          date: apt.date,
          time: apt.time,
          status: apt.status,
          notes: apt.notes,
          doctor_name: db.doctors.find(d => d.id === apt.doctor_id)?.name || 'Unknown Doctor',
          service_name: db.services.find(s => s.id === apt.service_id)?.name || 'Unknown Service'
        }));
    }
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    return [];
  }
}

export async function updateAppointmentStatus(appointmentId, newStatus) {
  try {
    if (hasRealDB) {
      const result = await sql`
        UPDATE "Appointments" 
        SET status = ${newStatus}
        WHERE id = ${appointmentId}
        RETURNING *;
      `;
      return result.rows[0] || null;
    } else {
      const db = global.inMemoryDB;
      const appointmentIndex = db.appointments.findIndex(apt => apt.id === appointmentId);
      
      if (appointmentIndex !== -1) {
        db.appointments[appointmentIndex].status = newStatus;
        return db.appointments[appointmentIndex];
      }
      return null;
    }
  } catch (error) {
    console.error('Error updating appointment status:', error);
    return null;
  }
}

export async function getDashboardStats() {
  try {
    if (hasRealDB) {
      // Total appointments
      const totalAppointmentsRes = await sql`SELECT COUNT(*) FROM "Appointments";`;
      const totalAppointments = Number(totalAppointmentsRes.rows[0].count);
      
      // Pending appointments
      const pendingAppointmentsRes = await sql`SELECT COUNT(*) FROM "Appointments" WHERE status = 'pending';`;
      const pendingAppointments = Number(pendingAppointmentsRes.rows[0].count);
      
      // Active patients
      const activePatientsRes = await sql`SELECT COUNT(DISTINCT patient_id) FROM "Appointments";`;
      const activePatients = Number(activePatientsRes.rows[0].count);
      
      // New patients this month
      const newPatientsRes = await sql`
        SELECT COUNT(DISTINCT patient_id) FROM "Appointments"
        WHERE date_trunc('month', date) = date_trunc('month', CURRENT_DATE)
      `;
      const newPatientsThisMonth = Number(newPatientsRes.rows[0].count);
      
      return {
        totalAppointments,
        pendingAppointments,
        activePatients,
        newPatientsThisMonth
      };
    } else {
      const db = global.inMemoryDB;
      const totalAppointments = db.appointments.length;
      const pendingAppointments = db.appointments.filter(a => a.status === 'pending').length;
      const activePatients = new Set(db.appointments.map(a => a.patient_id)).size;
      
      const now = new Date();
      const thisMonth = now.getMonth();
      const thisYear = now.getFullYear();
      const newPatientsThisMonth = new Set(
        db.appointments.filter(a => {
          const d = new Date(a.date);
          return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
        }).map(a => a.patient_id)
      ).size;
      
      return {
        totalAppointments,
        pendingAppointments,
        activePatients,
        newPatientsThisMonth
      };
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalAppointments: 0,
      pendingAppointments: 0,
      activePatients: 0,
      newPatientsThisMonth: 0
    };
  }
} 