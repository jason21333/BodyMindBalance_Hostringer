-- Users table
CREATE TABLE IF NOT EXISTS "Users" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'patient',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Doctors table
CREATE TABLE IF NOT EXISTS "Doctors" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS "Services" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL, -- in minutes
    price DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE IF NOT EXISTS "Appointments" (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES "Users"(id),
    doctor_id INTEGER REFERENCES "Doctors"(id),
    service_id INTEGER REFERENCES "Services"(id),
    date DATE NOT NULL,
    time TIME NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, confirmed, cancelled, completed
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE IF NOT EXISTS "Notifications" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "Users"(id),
    appointment_id INTEGER REFERENCES "Appointments"(id),
    notification_type VARCHAR(50) NOT NULL, -- appointment_created, appointment_confirmed, appointment_reminder, etc.
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Availability table for doctors
CREATE TABLE IF NOT EXISTS "DoctorAvailability" (
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER REFERENCES "Doctors"(id),
    date DATE NOT NULL,
    time TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON "Appointments"(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON "Appointments"(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON "Appointments"(date);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON "Notifications"(user_id);
CREATE INDEX IF NOT EXISTS idx_doctor_availability_doctor_id ON "DoctorAvailability"(doctor_id);
CREATE INDEX IF NOT EXISTS idx_doctor_availability_date ON "DoctorAvailability"(date); 