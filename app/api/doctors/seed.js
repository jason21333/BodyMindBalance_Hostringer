import { sql } from '@vercel/postgres';

export async function seedDoctors() {
  try {
    // Check if Dr. Agit Roy already exists
    const existingDoctor = await sql`
      SELECT id FROM "Doctors" WHERE name = 'Agit Roy';
    `;

    if (existingDoctor.rows.length === 0) {
      // Insert Dr. Agit Roy
      await sql`
        INSERT INTO "Doctors" (name, specialty, email, phone)
        VALUES (
          'Agit Roy',
          'Weight Loss & Nutrition Specialist',
          'dr.agitroy@example.com',
          '+1234567890'
        );
      `;
      console.log('Dr. Agit Roy added successfully');
    } else {
      console.log('Dr. Agit Roy already exists');
    }
  } catch (error) {
    console.error('Error seeding doctors:', error);
  }
} 