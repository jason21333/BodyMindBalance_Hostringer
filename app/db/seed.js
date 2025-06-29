import { sql } from '@vercel/postgres';

export async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Insert doctors
    const doctors = [
      {
        name: 'Dr. Agit Roy',
        email: 'agit.roy@bmb.com',
        phone: '+91-9876543210',
        specialty: 'General Medicine',
        bio: 'Experienced general physician with over 15 years of practice.'
      },
      {
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@bmb.com',
        phone: '+91-9876543211',
        specialty: 'Cardiology',
        bio: 'Specialist in cardiovascular diseases and preventive cardiology.'
      },
      {
        name: 'Dr. Michael Chen',
        email: 'michael.chen@bmb.com',
        phone: '+91-9876543212',
        specialty: 'Endocrinology',
        bio: 'Expert in diabetes management and hormonal disorders.'
      }
    ];

    for (const doctor of doctors) {
      await sql`
        INSERT INTO "Doctors" (name, email, phone, specialty, bio)
        VALUES (${doctor.name}, ${doctor.email}, ${doctor.phone}, ${doctor.specialty}, ${doctor.bio})
        ON CONFLICT (email) DO NOTHING;
      `;
    }

    // Insert services
    const services = [
      {
        name: 'General Consultation',
        description: 'Basic health checkup and consultation',
        duration: 30,
        price: 500.00
      },
      {
        name: 'Specialist Consultation',
        description: 'Specialized medical consultation',
        duration: 45,
        price: 800.00
      },
      {
        name: 'Health Screening',
        description: 'Comprehensive health screening package',
        duration: 60,
        price: 1200.00
      },
      {
        name: 'Follow-up Consultation',
        description: 'Follow-up appointment for existing patients',
        duration: 20,
        price: 300.00
      }
    ];

    for (const service of services) {
      await sql`
        INSERT INTO "Services" (name, description, duration, price)
        VALUES (${service.name}, ${service.description}, ${service.duration}, ${service.price})
        ON CONFLICT (name) DO NOTHING;
      `;
    }

    // Insert doctor availability for the next 30 days
    const today = new Date();
    const doctorsResult = await sql`SELECT id FROM "Doctors"`;
    
    for (const doctor of doctorsResult.rows) {
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        // Skip weekends (Saturday = 6, Sunday = 0)
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) continue;
        
        const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
        
        for (const time of timeSlots) {
          await sql`
            INSERT INTO "DoctorAvailability" (doctor_id, date, time, is_available)
            VALUES (${doctor.id}, ${date.toISOString().split('T')[0]}, ${time}, true)
            ON CONFLICT (doctor_id, date, time) DO NOTHING;
          `;
        }
      }
    }

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (typeof window === 'undefined') {
  seedDatabase().catch(console.error);
} 