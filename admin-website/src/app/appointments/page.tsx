'use client';

import { useState, useEffect } from 'react';

interface Appointment {
  id: string;
  name?: string;
  patient_name?: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  status?: string;
  created_at: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchAppointments = async () => {
    try {
        const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${API_BASE}/appointments.php`);
        if (response.ok) {
      const data = await response.json();
          setAppointments(data);
      }
    } catch (error) {
        console.error('Failed to fetch appointments:', error);
    } finally {
      setLoading(false);
    }
  };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Appointments Management</h1>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                All Appointments ({appointments.length})
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {appointments.map((appointment) => {
                const patientName = appointment.name || appointment.patient_name || 'Unknown';
                const status = appointment.status || 'New';
                return (
                <li key={appointment.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {patientName.charAt(0).toUpperCase()}
                          </span>
            </div>
          </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {patientName}
        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.email} • {appointment.phone}
            </div>
          </div>
        </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        <div>{appointment.date}</div>
                        <div>{appointment.time}</div>
            </div>
                      <div className="text-sm text-gray-500">
                        {appointment.service}
            </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                              {status}
                            </span>
                          </div>
                  </div>
                </li>
              )})}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 