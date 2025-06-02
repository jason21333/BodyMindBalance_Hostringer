'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="menu-logo-wrapper">
                <Image
                  src="/bmb-logo.png"
                  alt="Body Mind Balance Logo"
                  width={250}
                  height={100}
                  className="menu-logo"
                  priority
                />
              </div>
            </Link>
            <div className="company-header ml-3">
              <span className="text-xl font-bold">Body Mind Balance</span>
              <div className="text-xs text-gray-600">WELLNESS & MEDICAL CENTER</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {pathname !== '/login' && (
              <Link
                href="/login"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Login
              </Link>
            )}
            <button className="bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition-colors">
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-md">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {pathname !== '/login' && (
            <Link
              href="/login"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
          <button
            className="w-full text-center bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition-colors mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </nav>
  );
}