'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      title: 'Diabetes Care',
      description: 'Comprehensive diabetes management and treatment plans tailored to your needs.',
      icon: '🩺',
      href: '#' // Placeholder, no specific page yet
    },
    {
      title: 'Hypertension Management',
      description: 'Expert care and monitoring for blood pressure control and heart health.',
      icon: '❤️',
      href: '/blog/hypertension-prevention'
    },
    {
      title: 'Weight Loss Programs',
      description: 'Personalized weight management solutions for sustainable results.',
      icon: '⚖️',
      href: '/blog/healthy-weight-loss-strategies'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Our Services
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">
            Comprehensive healthcare solutions for your well-being
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <Link href={service.href} key={service.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-5 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{service.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 flex-grow">
                  {service.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 