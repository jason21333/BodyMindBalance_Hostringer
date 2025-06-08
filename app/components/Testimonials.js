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
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-2 sm:px-4"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-3 sm:p-4">
                    <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-3">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                        <OptimizedImage
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <p className="text-sm sm:text-base text-gray-600 italic mb-1 sm:mb-2">"{testimonial.quote}"</p>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-primary-600 text-xs sm:text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}