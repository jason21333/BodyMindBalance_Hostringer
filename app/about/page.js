'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Full-width Banner Image */}
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden mb-12">
        <Image
          src="/Nurse.jpeg"
          alt="Nurse at Body Mind Balance Clinic"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <section className="py-10">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
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
                  At Body Mind Balance, we believe in a holistic approach to healthcare that addresses both physical,mental and spiritual well-being. Our mission is to empower individuals to achieve optimal health through personalized care, education, and support.
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
          </div>
        </div>
      </section>

      {/* Health Camp Section */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">Health Camp Success Stories</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Body Mind Balance has successfully organized comprehensive Health Camps across various communities, making a significant impact on community health and wellness. Our camps have provided essential health services and educational opportunities to hundreds of residents.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8">
            {/* Camp Image Slider */}
            <CampSlider />

            {/* Health Camp Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mt-8"
            >
              <div className="space-y-6">
                <div className="bg-primary-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-4">Services Provided</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <span className="font-semibold text-gray-900">Blood Pressure Screening</span>
                        <p className="text-gray-600 mt-1">Successfully screened over 500 residents for blood pressure, identifying early signs of hypertension and providing immediate guidance for management.</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <span className="font-semibold text-gray-900">Obesity Screening by BMI</span>
                        <p className="text-gray-600 mt-1">Conducted BMI assessments for 450+ residents, providing personalized weight management plans and nutritional guidance to those at risk.</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <span className="font-semibold text-gray-900">Diabetes Screening</span>
                        <p className="text-gray-600 mt-1">Screened 600+ residents for diabetes, with early detection leading to better management and prevention of complications.</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <span className="font-semibold text-gray-900">Health Education Sessions</span>
                        <p className="text-gray-600 mt-1">Conducted 15+ interactive health talks on "An Introduction to Health," reaching over 800 residents with valuable information about lifestyle management and disease prevention.</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div>
                        <span className="font-semibold text-gray-900">ECG Services</span>
                        <p className="text-gray-600 mt-1">Provided 200+ ECG tests based on doctor's prescriptions, aiding in early detection of cardiovascular conditions.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-4">Community Impact</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">Over 1,500 residents benefited from our health camps</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">40% discount on blood tests provided to 300+ residents</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">Free expert consultations provided to 400+ residents</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Our Commitment</h3>
                  <p className="text-gray-600">
                    Through these health camps, we have demonstrated our commitment to making healthcare accessible and affordable. Our focus on early detection and prevention has helped many residents take proactive steps towards better health. We continue to work towards creating healthier communities through regular health checkups and educational initiatives.
                  </p>
                </div>

                <div className="mt-6">
                  <Link 
                    href="/appointment" 
                    className="inline-block bg-primary-600 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Book Your Health Check-up
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

// CampSlider component for future camp photos
function CampSlider() {
  const [current, setCurrent] = useState(0);
  const campSlides = [
    {
      image: '/camp-1.jpeg',
      alt: 'Diabetes Camp Photo 1'
    },
    {
      image: '/camp.jpeg',
      alt: 'Diabetes Camp Photo 2'
    },
    {
      image: '/camp-2.jpeg',
      alt: 'Diabetes Camp Photo 3'
    },
    {
      image: '/camp-3.jpeg',
      alt: 'Diabetes Camp Photo 4'
    },
    {
      image: '/camp-4.jpeg',
      alt: 'Diabetes Camp Photo 5'
    },
    {
      image: '/camp-5.jpeg',
      alt: 'Diabetes Camp Photo 6'
    },
    {
      image: '/camp-7.jpeg',
      alt: 'Diabetes Camp Photo 7'
    }
    // Add more images here in the future
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % campSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [campSlides.length]);

  return (
    <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden mb-12">
      {campSlides.map((slide, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: current === idx ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover rounded-2xl"
            sizes="100vw"
            priority={idx === 0}
          />
          <div className="absolute inset-0 bg-black/20 rounded-2xl" />
        </motion.div>
      ))}
    </div>
  );
} 