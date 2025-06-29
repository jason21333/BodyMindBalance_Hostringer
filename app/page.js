'use client';

import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import LatestPosts from './components/LatestPosts';
import DoctorIntro from './components/DoctorIntro';
import Contact from './components/Contact';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen pt-20">
      <Hero />
      <DoctorIntro />
      <Services />
      <Testimonials />
      <LatestPosts />
      <Contact />
    </main>
  );
}
