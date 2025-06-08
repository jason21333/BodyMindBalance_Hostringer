'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HypertensionPreventionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            Hypertension: Prevention Tips for a Healthier Life
          </h1>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Hypertension, or high blood pressure, is a leading cause of cardiovascular diseases worldwide. Often called the "silent killer," it can develop without noticeable symptoms, making prevention and management crucial. Adopting the right lifestyle habits can significantly reduce the risk of hypertension and its complications.
          </p>

          <div className="my-8 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full md:w-3/4 h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/blood.jpg"
                alt="Blood pressure monitor and healthy lifestyle elements"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 600px"
              />
            </motion.div>
          </div>

          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Effective Prevention and Management Strategies
          </h2>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">1. Maintain a Balanced Diet</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                <li>Follow the <strong className="font-bold">DASH (Dietary Approaches to Stop Hypertension)</strong> diet, which emphasizes fruits, vegetables, whole grains, lean proteins, and low-fat dairy products.</li>
                <li>Reduce salt intake to less than 2,300 mg per day (about one teaspoon), and ideally closer to 1,500 mg.</li>
                <li>Avoid processed foods high in sodium and trans fats.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">2. Engage in Regular Physical Activity</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                <li>Aim for at least <strong className="font-bold">30 minutes of moderate-intensity exercise</strong>, like brisk walking, five days a week.</li>
                <li>Incorporate strength training and flexibility exercises for overall cardiovascular health.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">3. Maintain a Healthy Weight</h3>
              <p className="text-gray-700 leading-relaxed">
                Excess weight increases strain on the heart. Losing even 5–10% of body weight can have a significant impact on blood pressure.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">4. Limit Alcohol and Avoid Smoking</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                <li>Alcohol should be consumed in moderation: up to one drink per day for women and two for men.</li>
                <li>Quit smoking to improve overall heart health and reduce the risk of hypertension.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">5. Manage Stress</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                <li>Chronic stress contributes to increased blood pressure.</li>
                <li>Practice mindfulness, yoga, or relaxation techniques to calm the mind and body.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">6. Monitor Your Blood Pressure Regularly</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                <li>Use a home blood pressure monitor to track readings and share results with your healthcare provider.</li>
                <li>Normal blood pressure should ideally be below 120/80 mmHg.</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Emerging Innovations in Hypertension Management
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 pl-4">
            <li><strong className="font-bold">Wearable Health Technology</strong>: Smartwatches and fitness trackers now include blood pressure monitoring, enabling early detection.</li>
            <li><strong className="font-bold">Personalized Medicine</strong>: Genetic testing and AI-driven insights are leading to more tailored treatments.</li>
            <li><strong className="font-bold">Salt Alternatives</strong>: Potassium-enriched salt substitutes are gaining popularity as a healthier option.</li>
          </ul>

          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Building a Supportive Environment
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Surround yourself with people who encourage healthy habits. Engage in community activities or join support groups focusing on heart health to stay motivated.
          </p>

          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Takeaway
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Hypertension prevention is achievable with consistent effort and informed choices. Small, sustainable changes in daily habits can lead to significant improvements in blood pressure and overall health. Start today to build a heart-healthy future!
          </p>
        </motion.div>
      </div>
    </div>
  );
} 