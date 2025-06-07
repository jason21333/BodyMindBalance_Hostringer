'use client';

import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LatestPosts from './components/LatestPosts';
import DoctorIntro from './components/DoctorIntro';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <DoctorIntro />
      <Services />
      <LatestPosts />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
