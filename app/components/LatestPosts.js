'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function LatestPosts() {
  const posts = [
    {
      id: 1,
      title: 'Understanding Diabetes Management',
      description: 'Learn about the latest approaches to managing diabetes effectively.',
      image: '/Diabetes.jpg',
      link: '/blog/understanding-diabetes-management'
    },
    {
      id: 2,
      title: 'Hypertension: Prevention Tips',
      description: 'Discover lifestyle changes that can help prevent and manage hypertension.',
      image: '/hypertension.jpg',
      link: '/blog/hypertension-prevention'
    },
    {
      id: 3,
      title: 'Healthy Weight Loss Strategies',
      description: 'Evidence-based strategies for sustainable weight management.',
      image: '/Weight.jpg',
      link: '/blog/healthy-weight-loss-strategies'
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
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover rounded-t-2xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                  quality={100}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.description}</p>
                <Link href={post.link || '#'} className="mt-4 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                  Read More →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}