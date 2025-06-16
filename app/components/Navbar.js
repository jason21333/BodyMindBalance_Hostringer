'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Grip from './Grip';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: pathname === '/' ? '#services' : '/#services', label: 'Services' },
    { href: pathname === '/' ? '#about' : '/#about', label: 'About' },
    { href: pathname === '/' ? '#testimonials' : '/#testimonials', label: 'Testimonials' },
    { href: pathname === '/' ? '#contact' : '/#contact', label: 'Contact' },
  ];

  return (
    <nav className={`w-full z-50 transition-all duration-300 ${
      isScrolled ? 'py-1' : 'bg-transparent py-1'
    }`}>
      <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              <Image
                src="/bmb-logo.png"
                alt="Body Mind Balance Logo"
                fill
                className="object-contain scale-110 hover:scale-125 transition-transform duration-300"
              />
            </div>
            <span className="text-lg md:text-xl font-bold text-gray-900">Body Mind Balance</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-900 hover:text-black transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-900 hover:text-black transition-colors">
              About
            </Link>
            <Link href="/#services" className="text-gray-900 hover:text-black transition-colors">
              Services
            </Link>
            <Link href="/#contact" className="text-gray-900 hover:text-black transition-colors">
              Contact
            </Link>
            <Link 
              href="/appointment" 
              className="bg-primary-600 text-white px-5 py-2 rounded-full text-base font-semibold hover:bg-black transition-colors"
            >
              Book Appointment
            </Link>
            <Link 
              href="/admin/login" 
              className="text-gray-900 hover:text-black transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-900"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="px-2 pt-2 pb-3 space-y-3">
              <Link href="/" className="block px-3 py-2 text-gray-900 hover:text-black transition-colors">
                Home
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-900 hover:text-black transition-colors">
                About
              </Link>
              <Link href="/#services" className="block px-3 py-2 text-gray-900 hover:text-black transition-colors">
                Services
              </Link>
              <Link href="/#contact" className="block px-3 py-2 text-gray-900 hover:text-black transition-colors">
                Contact
              </Link>
              <Link 
                href="/appointment" 
                className="block w-full text-left px-3 py-2 bg-primary-600 text-white rounded-full text-base font-semibold hover:bg-black transition-colors"
              >
                Book Appointment
              </Link>
              <Link 
                href="/admin/login" 
                className="block px-3 py-2 text-gray-900 hover:text-black transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}