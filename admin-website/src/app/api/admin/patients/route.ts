import { NextResponse } from 'next/server';
import { getAllPatients } from '@/lib/db';

export async function GET() {
  try {
    const patients = await getAllPatients();
    
    return NextResponse.json({
      success: true,
      patients
    });
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
} 