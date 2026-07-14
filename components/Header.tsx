'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ConsultationModal from './ConsultationModal';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerConsultation = () => {
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent('open-consultation'));
  };

  const navLinks = [
    { label: 'Consultancy', href: '/' },
    { label: 'Medical Services', href: '/services' },
    { label: 'About Us', href: '/about' },
    { label: 'Admin Portal', href: '/admin/upload' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-3 bg-surface/75 backdrop-blur-xl border-b border-outline-variant/20 shadow-md' 
            : 'py-5 bg-surface/60 backdrop-blur-md border-b border-outline-variant/10'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] flex items-center justify-between h-14">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-headline-md text-headline-md font-bold text-primary tracking-tight hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_hospital
            </span>
            <span>Shifa Global</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body-md text-body-md font-medium transition-all duration-300 relative py-1 ${
                    isActive 
                      ? 'text-primary font-semibold' 
                      : 'text-on-surface-variant hover:text-primary hover:-translate-y-[1px]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA & Hamburger Menu */}
          <div className="flex items-center gap-6">
            <button 
              onClick={triggerConsultation}
              className="hidden sm:inline-flex bg-primary hover:bg-primary/95 text-on-primary px-6 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95 text-sm cursor-pointer hover:shadow-lg"
            >
              Book Consultation
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-on-surface flex items-center justify-center p-1.5 rounded-lg hover:bg-outline-variant/20 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-surface/95 backdrop-blur-xl border-b border-outline-variant/20 shadow-xl py-6 px-6 transition-all duration-300 ease-in-out">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-body-md text-body-md py-2 border-b border-outline-variant/10 transition-colors ${
                      isActive 
                        ? 'text-primary font-bold pl-2 border-l-4 border-l-primary' 
                        : 'text-on-surface-variant hover:text-primary pl-0'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <button
                onClick={triggerConsultation}
                className="w-full bg-primary hover:bg-primary/95 text-on-primary py-3.5 rounded-xl font-bold transition-all shadow-md text-center text-sm mt-2"
              >
                Book Consultation
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Consultation Portal Modal */}
      <ConsultationModal />
    </>
  );
}
