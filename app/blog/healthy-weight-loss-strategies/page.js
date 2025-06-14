'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';


export default function HealthyWeightLossStrategiesPage() {
  // Force recompile
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            Healthy Weight Loss Strategies
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/Weight.jpg"
                alt="Healthy lifestyle image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/food.jpg"
                alt="Healthy food image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Achieving and maintaining a healthy weight is crucial for overall well-being and reducing the risk of chronic diseases. Sustainable weight management involves more than just dieting; it requires a holistic approach that integrates balanced nutrition, regular physical activity, and mindful habits.
          </p>

          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Evidence-Based Strategies for Sustainable Weight Management
          </h2>

          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">1. Balanced Nutrition for Weight Loss</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                <li>Focus on whole, unprocessed foods like fruits, vegetables, lean proteins, and whole grains.</li>
                <li>Control portion sizes and be mindful of calorie intake without drastic restriction.</li>
                <li>Prioritize protein and fiber to increase satiety and reduce cravings.</li>
                <li>Limit sugary drinks, unhealthy fats, and highly processed foods.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">2. Consistent Physical Activity</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                <li>Combine cardiovascular exercises (e.g., brisk walking, jogging) with strength training to build muscle and boost metabolism.</li>
                <li>Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity activity per week.</li>
                <li>Incorporate physical activity into daily routines, such as taking stairs or walking during breaks.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">3. Mindful Eating Practices</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                <li>Pay attention to hunger and fullness cues, eating slowly and without distractions.</li>
                <li>Practice emotional awareness to differentiate between physical hunger and emotional eating.</li>
                <li>Keep a food journal to track intake and identify patterns.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">4. Adequate Sleep and Stress Management</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                <li>Aim for 7-9 hours of quality sleep per night, as poor sleep can affect appetite-regulating hormones.</li>
                <li>Develop strategies to manage stress, such as meditation, yoga, or spending time in nature, as stress can lead to weight gain.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">5. Seek Professional Guidance</h3>
              <p className="text-gray-700 leading-relaxed">
                Consult with a healthcare provider, registered dietitian, or certified personal trainer for personalized plans and support. They can help set realistic goals and address individual needs.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Long-Term Success and Healthy Habits
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Sustainable weight loss is a journey, not a destination. Focus on building healthy habits that you can maintain over time, rather than quick fixes. Celebrate small victories and be patient with yourself throughout the process. Consistency is key to long-term success and a healthier life!
          </p>

          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Takeaway
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By integrating balanced nutrition, regular physical activity, mindful eating, and stress management, you can achieve and sustain a healthy weight. These evidence-based strategies contribute to overall well-being and a reduced risk of chronic diseases. Start your journey today for a healthier and happier life!
          </p>
        </motion.div>
      </div>
    </div>
  );
} 