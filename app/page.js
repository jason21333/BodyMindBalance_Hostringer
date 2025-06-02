'use client';

import Image from "next/image";
import Hero from "./components/Hero";
import Specialties from "./components/Specialties";
import About from "./components/About";
import LatestPosts from "./components/LatestPosts";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Component */}
        <Hero />
        
        {/* Specialties Component */}
        <Specialties />
        
        {/* About Component */}
        <About />
        
        {/* Latest Posts Component */}
        <LatestPosts />
        
        {/* Testimonials Component */}
        <Testimonials />
        
        {/* Contact Component */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
