'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

const testimonials = [
  {
    id: 1,
    name: 'Sonali Girase',
    role: 'Diabetes Care Patient',
    quote: 'Taking treatment for my mother, she is high diabetic and had very unusual condition and admitted. We came to know about Dr. Ajit Roy in hospital and he visited my mother and started cure her and in 2-3 days we have seen a tremendous change in her health....he not only treat but also studied her pattern of fluctuations in sugar and given treatment in every way of manner like doses, exercises, diet plan and mental peace. He explained us in such a way that never ever any diabetologist had. I really appreciate that he has shared his no. for patients emergency and replied also as and when needed. I would really recommend him to diabetic patients.',
    image: '/agit-roy.jpg'
  },
  {
    id: 2,
    name: 'OnKeshwar Tiwari',
    role: 'Diabetes Care Patient',
    quote: 'My sugar level was 497 after just 3 months of treatment my sugar level dropped to 122. I am truly thankful to Dr Ajit roy for the care and guidance.',
    image: '/agit-roy.jpg'
  },
  {
    id: 3,
    name: 'Anuj Tiwari',
    role: 'General patient',
    quote: 'Dr. Ajit is an outstanding medical professional. His composed and attentive approach ensures a comfortable experience for every patient. His examinations are thorough and precise. I have been going there for regular checkups on my grandmother, and the results have been truly remarkable. Her health has seen steady improvement under his expert guidance.',
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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
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
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden">
                        <OptimizedImage
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <p className="text-xl text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                        <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-primary-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === activeIndex ? 'bg-primary-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}