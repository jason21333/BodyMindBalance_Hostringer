'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import DoctorIntro from '../components/DoctorIntro';

const slides = [
  {
    image: '/clinc-bmb.jpg',
    alt: 'Body Mind Balance Clinic Front View'
  },
  {
    image: '/Doc.jpeg',
    alt: 'Dr. Ajit Roy at Clinic'
  },
  {
    image: '/Nurse.jpeg',
    alt: 'Nurse at Body Mind Balance Clinic'
  }
];

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Body Mind Balance
            </h1>
            <div className="h-1 w-20 bg-primary-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your trusted partner in holistic healthcare, providing comprehensive wellness solutions for a balanced and healthy life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
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
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative w-full max-w-2xl mx-auto h-[400px] rounded-2xl overflow-hidden shadow-2xl mb-8">
                {slides.map((slide, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: currentSlide === idx ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </motion.div>
                ))}
                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                        currentSlide === idx ? 'bg-primary-600' : 'bg-white/60'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Doctor Introduction Section */}
      <DoctorIntro />
    </main>
  );
} 