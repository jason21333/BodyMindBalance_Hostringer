'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="/healthcare-wellbeing.jpg"
              alt="Healthcare and Well-being at Body Mind Balance"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Committed to Your Health & Well-being
            </h2>
            <div className="h-1 w-20 bg-primary-600 rounded-full"></div>
            <p className="text-lg text-gray-600">
              At Body Mind Balance, we believe in a holistic approach to healthcare. 
              Our team of experienced medical professionals is dedicated to providing 
              comprehensive care that addresses both your physical and mental well-being.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {[
                {
                  title: 'Expert Team',
                  description: 'Board-certified physicians and specialists'
                },
                {
                  title: 'Modern Facilities',
                  description: 'State-of-the-art medical equipment and facilities'
                },
                {
                  title: 'Personalized Care',
                  description: 'Tailored treatment plans for each patient'
                },
                {
                  title: 'Holistic Approach',
                  description: 'Treating the whole person, not just symptoms'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 p-6 rounded-xl"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            
            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <button className="bg-primary-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary-700 transition-colors">
                Learn More About Us
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}