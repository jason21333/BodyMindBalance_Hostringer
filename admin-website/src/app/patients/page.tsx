'use client';

import { useState, useEffect } from 'react';

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchPatients = async () => {
    try {
        const response = await fetch('https://yourdomain.com/php-backend/api/patients.php');
        if (response.ok) {
      const data = await response.json();
          setPatients(data);
      }
    } catch (error) {
        console.error('Failed to fetch patients:', error);
    } finally {
      setLoading(false);
    }
  };

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Patient Database</h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                All Patients ({patients.length})
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {patients.map((patient) => (
                <li key={patient.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {patient.name.charAt(0)}
                          </span>
            </div>
          </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {patient.name}
        </div>
                        <div className="text-sm text-gray-500">
                          {patient.email}
      </div>
                        <div className="text-sm text-gray-500">
                          {patient.phone}
          </div>
        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Registered: {new Date(patient.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 