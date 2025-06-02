'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Your Journey to{' '}
              <span className="text-primary-600">Complete Wellness</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl lg:max-w-none">
              Expert care for diabetes, hypertension, and weight management. 
              Our holistic approach ensures your path to better health and well-being.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-primary-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl">
                Book Appointment
              </button>
              <button className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-50 transition-colors">
                Learn More
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16">
              <div>
                <h3 className="text-3xl font-bold text-primary-600">10+</h3>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary-600">5k+</h3>
                <p className="text-gray-600">Happy Patients</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary-600">99%</h3>
                <p className="text-gray-600">Success Rate</p>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/agit-roy.jpg"
              alt="Professional medical team"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}