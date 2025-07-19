'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const handleSubmit = async () => {
    // Redirect to admin website
    window.location.href = 'http://localhost:3002';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Image
              src="/bmb-logo.png"
              alt="Body Mind Balance Logo"
              width={250}
              height={100}
              className="mx-auto"
            />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Admin Access
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Click below to access the admin dashboard
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 space-y-6"
        >

          <div>
            <button
              onClick={handleSubmit}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Access Admin Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 