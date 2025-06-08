'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

const testimonials = [
  {
    id: 1,
    name: 'Raman Sharma',
    role: 'Diabetes Patient',
    quote: 'Dr. Roy\'s approach to diabetes reversal is truly groundbreaking. I never thought I could manage my condition so effectively without constant medication. Highly recommended!',
    image: '/agit-roy.jpg'
  },
  {
    id: 2,
    name: 'Priya Singh',
    role: 'Hypertension Patient',
    quote: 'I struggled with high blood pressure for years, but with Body Mind Balance, I\'ve seen incredible improvements. Their holistic plan changed my life.',
    image: '/agit-roy.jpg'
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Weight Management Client',
    quote: 'The personalized weight management program helped me achieve my goals safely and sustainably. I feel more energetic and healthier than ever.',
    image: '/agit-roy.jpg'
  },
  {
    id: 4,
    name: 'Omprakash Suvarna',
    role: 'Diabetes Care Patient',
    quote: 'Overall Good experience....Dr has good knowledge about diabetes...above all he talks about Diabetes reversal which other Doctors never talk about they just say Diabetes will be there till you are alive...I was looking out for a Diabtologist for my mother in Palava city and the search ends here...',
    image: '/agit-roy.jpg'
  },
  {
    id: 5,
    name: 'Monika Rathore',
    role: 'Diabetes Care Patient',
    quote: 'Dr. Roy\'s clinic in Thane is a haven for individuals seeking effective diabetes reversal. His personalized nutrition plans, and emphasis on overall well-being have made a significant difference in my life.',
    image: '/agit-roy.jpg'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(timer);
  }, [isPaused]);

  // Pause auto-scroll when user interacts with navigation
  const handleManualNavigation = (direction) => {
    setIsPaused(true);
    if (direction === 'next') {
      nextTestimonial();
    } else {
      prevTestimonial();
    }
    // Resume auto-scroll after 10 seconds of no interaction
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
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
            Patient Success Stories
          </h2>
          <div className="h-1 w-20 bg-primary-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our patients about their journey to better health with Body Mind Balance
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10"
              >
                <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0">
                    <OptimizedImage
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">{testimonials[currentIndex].name}</h3>
                    <p className="text-primary-600 text-sm md:text-base lg:text-lg">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic text-base md:text-lg lg:text-xl leading-relaxed">"{testimonials[currentIndex].quote}"</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => handleManualNavigation('prev')}
              className="p-2 md:p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleManualNavigation('next')}
              className="p-2 md:p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsPaused(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsPaused(false), 10000);
                }}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}