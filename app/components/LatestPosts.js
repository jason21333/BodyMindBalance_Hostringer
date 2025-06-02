'use client';

import { motion } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

export default function LatestPosts() {
  const posts = [
    {
      id: 1,
      title: 'Understanding Diabetes Management',
      description: 'Learn about the latest approaches to managing diabetes effectively.',
      image: '/agit-roy.jpg',
    },
    {
      id: 2,
      title: 'Hypertension: Prevention Tips',
      description: 'Discover lifestyle changes that can help prevent and manage hypertension.',
      image: '/hypertension.jpg',
    },
    {
      id: 3,
      title: 'Healthy Weight Loss Strategies',
      description: 'Evidence-based strategies for sustainable weight management.',
      image: '/blood-disorders.jpg',
    },
  ];

  return (
    <section className="py-16 w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Health Insights</h2>
          <p className="text-lg text-gray-600">Stay informed with our latest medical articles and health tips</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <OptimizedImage
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={300}
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.description}</p>
                <button className="mt-4 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                  Read More →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}