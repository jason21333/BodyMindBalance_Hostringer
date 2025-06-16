import { sql } from '@vercel/postgres';

async function seed() {
  try {
    // Create admin user
    const result = await sql`
      INSERT INTO "Users" (name, email, password, role)
      VALUES (
        'Admin User',
        'admin@example.com',
        'admin123',
        'admin'
      )
      ON CONFLICT (email) DO NOTHING
      RETURNING id;
    `;

    console.log('Admin user created or already exists:', result.rows[0]);

    // Create a doctor
    const doctorResult = await sql`
      INSERT INTO "Doctors" (name, specialization, email, phone)
      VALUES (
        'Dr. John Doe',
        'General Medicine',
        'doctor@example.com',
        '+1234567890'
      )
      ON CONFLICT (email) DO NOTHING
      RETURNING id;
    `;

    console.log('Doctor created or already exists:', doctorResult.rows[0]);

    // Create a service
    const serviceResult = await sql`
      INSERT INTO "Services" (name, description, duration, price)
      VALUES (
        'General Consultation',
        'Regular health checkup and consultation',
        30,
        50.00
      )
      ON CONFLICT (name) DO NOTHING
      RETURNING id;
    `;

    console.log('Service created or already exists:', serviceResult.rows[0]);

  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed(); 