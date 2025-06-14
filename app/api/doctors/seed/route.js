import { NextResponse } from 'next/server';
import { seedDoctors } from '../seed';

export async function POST() {
  try {
    await seedDoctors();
    return NextResponse.json({ success: true, message: 'Doctors seeded successfully' });
  } catch (error) {
    console.error('Error seeding doctors:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to seed doctors' },
      { status: 500 }
    );
  }
} 