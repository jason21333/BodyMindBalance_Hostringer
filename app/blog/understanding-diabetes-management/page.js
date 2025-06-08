'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function UnderstandingDiabetesManagementPage() {
  return (
    <main className="pt-24 pb-16 bg-background text-text">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-primary mb-8 text-center"
        >
          Understanding Diabetes Management: Latest Insights for Effective Control
        </motion.h1>

        {/* Images Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/type2-Diabites.png"
              alt="Type 2 Diabetes Information"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/type1.webp"
              alt="Type 1 Diabetes Information"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white shadow-lg rounded-lg p-6 md:p-8 space-y-6 prose max-w-none"
        >
          <p>
            Diabetes management is a lifelong journey that requires informed decision-making and consistent care. Advances in science and technology are continually improving how individuals manage this condition, promoting better health outcomes and quality of life.
          </p>

          <h2>Key Pillars of Diabetes Management</h2>

          <h3>1. Healthy Eating</h3>
          <ul>
            <li>Embrace a balanced diet rich in whole grains, lean proteins, healthy fats, and non-starchy vegetables.</li>
            <li>Monitor carbohydrate intake to manage blood sugar levels effectively.</li>
            <li>Stay hydrated and limit processed foods and added sugars.</li>
          </ul>

          <h3>2. Regular Physical Activity</h3>
          <ul>
            <li>Exercise helps improve insulin sensitivity and regulates blood sugar levels.</li>
            <li>Engage in activities like walking, swimming, or cycling for at least 150 minutes per week.</li>
          </ul>

          <h3>3. Medication and Insulin Therapy</h3>
          <ul>
            <li>Adhere to prescribed medications or insulin therapy to maintain target glucose levels.</li>
            <li>Advances like continuous glucose monitoring (CGM) and smart insulin pens can enhance precision and convenience.</li>
          </ul>

          <h3>4. Monitoring Blood Sugar Levels</h3>
          <ul>
            <li>Track glucose levels regularly to identify patterns and make necessary adjustments.</li>
            <li>Use technology like CGM devices for real-time monitoring and trend analysis.</li>
          </ul>

          <h3>5. Stress Management and Sleep</h3>
          <ul>
            <li>Chronic stress and poor sleep can elevate blood sugar levels.</li>
            <li>Practice mindfulness, yoga, or relaxation techniques to manage stress.</li>
            <li>Aim for 7–9 hours of quality sleep each night.</li>
          </ul>

          <h2>Emerging Innovations</h2>
          <ul>
            <li><strong>Personalized Treatment Plans</strong>: Genetic and metabolic profiling is enabling more tailored approaches.</li>
            <li><strong>Artificial Pancreas Systems</strong>: These closed-loop devices automate insulin delivery for improved control.</li>
            <li><strong>Digital Health Tools</strong>: Apps and wearable devices are empowering individuals to track their progress and make informed decisions.</li>
          </ul>

          <h2>Building a Support Network</h2>
          <p>
            Connect with healthcare providers, dietitians, and support groups. A strong support system fosters accountability and motivation, making diabetes management more effective.
          </p>
          <p>
            With the right strategies and tools, managing diabetes can lead to a healthy, fulfilling life. Stay informed, proactive, and connected to the latest advancements for optimal outcomes.
          </p>
        </motion.div>
      </div>
    </main>
  );
} 