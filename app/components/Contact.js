'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock8 } from './Clock8';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    console.log('Contact form submitted:', formData);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <div className="h-1 w-20 bg-primary-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for appointments, inquiries, or to learn more about our services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900">Phone</h4>
                  <p className="text-sm sm:text-base text-gray-600">9005003044</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900">Email</h4>
                  <p className="text-sm sm:text-base text-gray-600">bodymindbalancepalavacity@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900">Address</h4>
                  <p className="text-sm sm:text-base text-gray-600">Elite E- 006, Lakeshore green, Lodha Palava Phase 2<br />Dombivali East, 421204</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 mt-1">
                  <Clock8 className="w-full h-full" stroke="currentColor" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900">Hours</h4>
                  <p className="text-sm sm:text-base text-gray-600">
                    Monday - Wednesday, Friday - Sunday:<br />
                    Morning: 10:30 AM - 11:00 AM<br />
                    Evening: 5:45 PM - 10:00 PM<br />
                    Thursday: Closed
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}