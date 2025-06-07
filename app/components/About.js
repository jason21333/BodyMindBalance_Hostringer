'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import DoctorIntro from './DoctorIntro';

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Body Mind Balance
          </h2>
          <div className="h-1 w-20 bg-primary-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your trusted partner in holistic healthcare, providing comprehensive wellness solutions for a balanced and healthy life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 mb-4">
                At Body Mind Balance, we believe in a holistic approach to healthcare that addresses both physical and mental well-being. Our mission is to empower individuals to achieve optimal health through personalized care, education, and support.
              </p>
              <p className="text-gray-600 mb-4">
                We combine modern medical practices with traditional wellness principles to provide comprehensive healthcare solutions that promote long-term health and vitality.
              </p>
              <div className="mt-8 space-y-4">
                <h4 className="text-xl font-semibold text-gray-900">Our Approach:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Personalized Treatment Plans</li>
                  <li>Preventive Healthcare</li>
                  <li>Lifestyle Management</li>
                  <li>Continuous Support</li>
                  <li>Patient Education</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/clinc-bmb.webp"
                alt="Body Mind Balance Clinic"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Doctor Introduction Section */}
      <DoctorIntro />
    </section>
  );
}