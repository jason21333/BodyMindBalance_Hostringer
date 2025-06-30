import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getInMemoryDB } from '@/lib/db';

export async function GET() {
  try {
    // Check if we have a real database connection
    let hasRealDB = false;
    try {
      await sql`SELECT 1`;
      hasRealDB = true;
    } catch (error) {
      hasRealDB = false;
    }

    if (hasRealDB) {
      // Use real database
      const result = await sql`
        SELECT DISTINCT
          u.id,
          u.name,
          u.email,
          u.phone,
          s.name as service_name
        FROM "Appointments" a
        JOIN "Users" u ON a.patient_id = u.id
        JOIN "Services" s ON a.service_id = s.id
        ORDER BY u.name ASC;
      `;
      return NextResponse.json({
        success: true,
        patients: result.rows
      });
    } else {
      // Use in-memory storage
      const inMemoryDB = getInMemoryDB();
      // Get all patients who have at least one appointment
      const patientsWithAppointments = inMemoryDB.appointments.map(apt => {
        const user = inMemoryDB.users.find(u => u.id === apt.patient_id);
        const service = inMemoryDB.services.find(s => s.id === apt.service_id);
        return user && service ? {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          service_name: service.name
        } : null;
      }).filter(Boolean);
      // Remove duplicates by patient id + service
      const uniquePatients = [];
      const seen = new Set();
      for (const p of patientsWithAppointments) {
        const key = `${p.id}-${p.service_name}`;
        if (!seen.has(key)) {
          uniquePatients.push(p);
          seen.add(key);
        }
      }
      return NextResponse.json({
        success: true,
        patients: uniquePatients
      });
    }
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch patients', error: error.message },
      { status: 500 }
    );
  }
} 