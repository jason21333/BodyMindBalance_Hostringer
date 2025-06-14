'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DoctorIntro() {
  return (
    <section className="pb-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Dr. Ajit Roy
          </h2>
          <div className="h-1 w-20 bg-primary-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A Pioneer in Holistic Diabetes Care & Reversal
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Doctor's Photo and Quote */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex flex-col h-full"
          >
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[800px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/agit-roy.jpg"
                alt="Dr. Ajit Roy"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 50vw"
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none"></div>
            </div>
            {/* Quote adjusted to be in the empty space below the photo */}
            <div className="text-center max-w-2xl mx-auto flex-grow flex items-center justify-center py-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900 italic leading-relaxed tracking-wide">
                "Diabetes is a Disease, not a life sentence."
              </p>
            </div>
          </motion.div>

          {/* Doctor's Introduction */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                In the dynamic realm of healthcare, where innovation and tradition converge, there emerges a luminary in the field of diabetes reversal — the esteemed Dr. Ajit Roy. With a fusion of cutting-edge modern medicine, ancient wisdom from Ayurveda, and the transformative power of spiritual healing, Dr. Roy stands as a beacon of hope for those seeking not just treatment, but a holistic revival of their well-being.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    🌿 Mastering Modern Medicine
                  </h3>
                  <p className="text-gray-600">
                    Dr. Roy, with over two decades of experience, is a trailblazer in modern medical practices. His proficiency in the latest advancements ensures that patients receive state-of-the-art care backed by evidence-based methodologies. As the landscape of healthcare evolves, Dr. Roy remains at the forefront, seamlessly integrating innovation into his diabetes reversal protocols.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    🌺 Ayurvedic Alchemy
                  </h3>
                  <p className="text-gray-600">
                    Dr. Roy's unique approach doesn't stop at modern medicine; it extends to the ancient art of Ayurveda. Understanding that true healing often requires a harmonious balance, he employs Ayurvedic principles to tailor personalized treatment plans. This amalgamation of time-honored wisdom and contemporary science forms the cornerstone of his practice.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    🌌 Spiritual Healing for Wholeness
                  </h3>
                  <p className="text-gray-600">
                    Beyond the physical, Dr. Ajit Roy recognizes the profound impact of spirituality on healing. With a deep understanding of the mind-body connection, he incorporates spiritual practices into his approach. This not only aids in stress management but also cultivates a holistic environment for diabetes reversal, fostering a sense of peace and balance.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    ⚖️ Balancing the Art and Science of Healing
                  </h3>
                  <p className="text-gray-600">
                    Dr. Roy is not just a diabetologist; he's an artist in the realm of healing, blending the precision of science with the elegance of art. His patients aren't mere cases; they're individuals on a path to rejuvenation, guided by a maestro who understands the intricacies of their unique health narratives.
                  </p>
                </div>

                <div className="bg-primary-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    🔍 Why Dr. Ajit Roy?
                  </h3>
                  <p className="text-gray-600">
                    The answer lies in his unwavering commitment to patient-centric care. Dr. Roy doesn't merely treat symptoms; he partners with patients on a transformative journey towards reclaiming their health. His multidimensional expertise, seamlessly weaving together modern science, ancient wisdom, and spiritual insights, is a testament to his dedication to comprehensive well-being.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 