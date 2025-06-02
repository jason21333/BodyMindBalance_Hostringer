'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const specialties = [
  {
    title: 'Diabetes Care',
    description: 'Comprehensive diabetes management including blood sugar monitoring, medication management, and lifestyle guidance.',
    image: '/blood-disorders.jpg',
    features: ['Blood Sugar Monitoring', 'Medication Management', 'Diet Planning', 'Lifestyle Counseling']
  },
  {
    title: 'Hypertension',
    description: 'Expert care for high blood pressure with personalized treatment plans and regular monitoring.',
    image: '/hypertension.jpg',
    features: ['Blood Pressure Monitoring', 'Risk Assessment', 'Medication Review', 'Lifestyle Modifications']
  },
  {
    title: 'Weight Loss',
    description: 'Scientifically-backed weight management programs tailored to your unique needs and goals.',
    image: '/weightloss.jpg',
    features: ['Body Composition Analysis', 'Nutrition Planning', 'Exercise Programs', 'Behavioral Support']
  }
];

export default function Specialties() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Specialties
          </h2>
          <div className="h-1 w-20 bg-primary-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert medical care focused on chronic disease management and preventive healthcare
          </p>
        </motion.div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((specialty, index) => (
            <motion.div
              key={specialty.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.6, -0.05, 0.01, 0.99],
              }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64">
                  <Image
                    src={specialty.image}
                    alt={specialty.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{specialty.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{specialty.description}</p>
                  <ul className="space-y-3">
                    {specialty.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-primary-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-8 text-primary-600 font-semibold hover:text-primary-700 transition-colors group inline-flex items-center">
                    Learn More
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}