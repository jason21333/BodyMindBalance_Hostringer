'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function OptimizedImage({ src, alt, className, width, height, ...props }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AnimatePresence>
      <div className={`relative overflow-hidden ${className}`}>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gray-200 animate-pulse"
          />
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0.5 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            onLoad={() => setIsLoading(false)}
            quality={90}
            {...props}
            className={`transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}