'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/30 w-full relative z-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding & Socials */}
        <div className="md:col-span-1">
          <Link href="/" className="font-headline-md text-headline-md font-bold text-primary mb-6 block">
            Shifa Global
          </Link>
          <p className="text-on-surface-variant mb-6 text-sm leading-relaxed max-w-xs">
            Excellence in international healthcare consultancy, bridging the gap between patients and elite medical care worldwide.
          </p>
          <div className="flex gap-4">
            <a 
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300" 
              href="#"
              aria-label="Website"
            >
              <span className="material-symbols-outlined text-lg">public</span>
            </a>
            <a 
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300" 
              href="mailto:info@shifaglobal.care"
              aria-label="Email"
            >
              <span className="material-symbols-outlined text-lg">alternate_email</span>
            </a>
            <a 
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-300" 
              href="#"
              aria-label="Contact Chat"
            >
              <span className="material-symbols-outlined text-lg">chat_bubble</span>
            </a>
          </div>
        </div>

        {/* Services Sitemap */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-on-surface mb-2 text-sm uppercase tracking-wider">Our Services</h4>
          <Link className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="/services">
            Medical Consultation
          </Link>
          <Link className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="/services">
            Hospital Referral
          </Link>
          <Link className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="/services">
            Second Opinion Services
          </Link>
          <Link className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="/services">
            Telemedicine Support
          </Link>
        </div>

        {/* Corporate Sitemap */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-on-surface mb-2 text-sm uppercase tracking-wider">Company</h4>
          <Link className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="/about">
            About Us
          </Link>
          <Link className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="/about#ethics">
            Medical Ethics Board
          </Link>
          <Link className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="/about#network">
            Global Specialists Network
          </Link>
          <Link className="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">
            Careers
          </Link>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-on-surface mb-2 text-sm uppercase tracking-wider">Newsletter</h4>
          <p className="text-xs text-on-surface-variant mb-3 leading-relaxed">
            Stay updated with the latest medical breakthroughs, specialist advice, and global care logistics.
          </p>
          <form onSubmit={handleSubscribe} className="relative w-full group">
            <input 
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Email address"
              className="bg-surface-container border border-outline-variant/30 rounded-xl py-3 px-4 pr-12 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <button 
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 bg-primary text-on-primary px-3.5 rounded-lg hover:bg-primary/95 transition-all flex items-center justify-center cursor-pointer"
              aria-label="Subscribe"
            >
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
          {error && <p className="text-xs text-error font-medium mt-1">{error}</p>}
          {subscribed && (
            <p className="text-xs text-primary font-semibold mt-1 flex items-center gap-1 animate-pulse">
              <span className="material-symbols-outlined text-xs">check_circle</span>
              Successfully subscribed!
            </p>
          )}
        </div>
      </div>

      {/* Footer Bottom Strip */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] py-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p className="text-on-surface-variant opacity-80">
          © {new Date().getFullYear()} Shifa Global Care. Excellence in Healthcare Consultancy.
        </p>
        <div className="flex gap-6">
          <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Patient Rights</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}
