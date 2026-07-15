'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeStep, setActiveStep] = useState<number | null>(0);
  const [dbServices, setDbServices] = useState<any[]>([]);

  const categories = ['All', 'Clinical Care', 'Logistics', 'Governance'];

  const services = [
    {
      id: 'medical-consultation',
      title: 'Medical Consultation',
      category: 'Clinical Care',
      icon: 'medical_services',
      iconBg: 'bg-primary-fixed',
      iconColor: 'text-primary',
      description: 'Direct access to world-renowned specialists across multiple disciplines for diagnostic clarity and treatment planning.',
      features: ['Personalized Case Briefing', 'Expert Clinical Reviews', 'Video & Audio Consultation Slots']
    },
    {
      id: 'hospital-referral',
      title: 'Hospital Referral',
      category: 'Clinical Care',
      icon: 'domain',
      iconBg: 'bg-secondary-fixed',
      iconColor: 'text-secondary',
      description: 'We coordinate admissions to JCI-accredited global hospitals, ensuring you receive care at the most appropriate facility.',
      features: ['Priority Scheduling', 'Hospital Admissions Liaison', 'Accredited Network Access']
    },
    {
      id: 'second-opinion',
      title: 'Second Medical Opinion',
      category: 'Clinical Care',
      icon: 'clinical_notes',
      iconBg: 'bg-primary-container',
      iconColor: 'text-on-primary-container',
      description: 'Validate complex diagnoses with independent reviews from senior medical boards and international experts.',
      features: ['Multi-Disciplinary Board Review', 'Diagnostic Verification', 'Treatment Recommendation Reports']
    },
    {
      id: 'medical-tourism',
      title: 'Medical Tourism Assistance',
      category: 'Logistics',
      icon: 'flight_takeoff',
      iconBg: 'bg-tertiary-fixed',
      iconColor: 'text-tertiary',
      description: 'End-to-end logistics including visa support, medical air travel coordination, and local accommodation for families.',
      features: ['Medical Visa Fast-tracking', 'Flight & Hotel Logistics', 'Local Airport Transfers']
    },
    {
      id: 'telemedicine',
      title: 'Telemedicine Support',
      category: 'Clinical Care',
      icon: 'videocam',
      iconBg: 'bg-secondary-container',
      iconColor: 'text-on-secondary-container',
      description: 'Secure, HD video consultations from the comfort of your home, integrated with your existing medical records.',
      features: ['HIPAA Compliant Software', 'Digital Prescription Dispatch', 'Remote Patient Vital Tracking']
    },
    {
      id: 'insurance-guidance',
      title: 'Health Insurance Guidance',
      category: 'Governance',
      icon: 'verified_user',
      iconBg: 'bg-outline-variant',
      iconColor: 'text-on-surface-variant',
      description: 'Navigating international coverage and claims. We help maximize your benefits and handle pre-authorizations.',
      features: ['Pre-Authorization Handling', 'Global Claims Assistance', 'Coverage Policy Audits']
    }
  ];

  const steps = [
    {
      title: 'Initial Inquiry & Case Review',
      content: 'Submit your medical history and current concerns via our secure portal. Our medical directors perform a preliminary triage to identify the most relevant specialists in our global network.'
    },
    {
      title: 'Specialist Matchmaking',
      content: 'We present 2-3 top-tier medical facilities or specialists based on your specific condition, insurance, and personal preferences, providing transparent cost estimates for each.'
    },
    {
      title: 'Treatment Coordination',
      content: 'Once a choice is made, we handle all appointments, file transfers, and travel arrangements. Your dedicated case manager remains available 24/7 during your journey.'
    },
    {
      title: 'Post-Care Follow-up',
      content: 'Care doesn\'t end when you leave the hospital. We ensure your local doctors receive all reports and coordinate necessary follow-up telemedicine sessions.'
    }
  ];

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch('/api/admin/content?type=Service');
        if (res.ok) {
          const data = await res.json();
          const publicServices = data.filter((s: any) => s.visibility === 'Public');
          setDbServices(publicServices);
        }
      } catch (e) {
        console.error("Failed to fetch services", e);
      }
    }
    loadServices();
  }, []);

  const displayServices = dbServices.length > 0
    ? [
        ...dbServices.map(s => ({
          id: s.id,
          title: s.title,
          category: s.category,
          icon: s.category === 'Clinical Care' ? 'medical_services' : s.category === 'Logistics' ? 'flight_takeoff' : 'verified_user',
          iconBg: s.category === 'Clinical Care' ? 'bg-primary-fixed' : s.category === 'Logistics' ? 'bg-tertiary-fixed' : 'bg-outline-variant',
          iconColor: s.category === 'Clinical Care' ? 'text-primary' : s.category === 'Logistics' ? 'text-tertiary' : 'text-on-surface-variant',
          description: s.description,
          features: s.tags ? s.tags.split(',') : ['Personalized Care', 'Global Coordination']
        })),
        ...services
      ]
    : services;

  useEffect(() => {
    // Scroll reveal animation observer
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  const triggerConsultation = () => {
    window.dispatchEvent(new CustomEvent('open-consultation'));
  };

  const filteredServices = displayServices.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Background ambient glow shapes */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-0" />

      {/* Hero Header */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] py-16 relative z-10">
        <div className="max-w-3xl">
          <span className="text-primary font-label-sm tracking-widest block mb-4 uppercase">Our Expertise</span>
          <h1 className="font-headline-xl text-headline-xl mb-6 text-on-surface leading-tight">
            Curated Healthcare Services for Global Patients
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            We bridge the gap between world-class medical facilities and patients seeking excellence. Our services are designed with an empathetic touch and medical precision.
          </p>
        </div>
      </section>

      {/* Search & Category Filter Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] mb-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
          {/* Categories Tab */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'bg-white hover:bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:max-w-xs group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="bg-white border border-outline-variant/30 rounded-xl py-3 pl-12 pr-4 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] mb-24 relative z-10">
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, idx) => (
              <div 
                key={service.id}
                className="glass-card p-8 rounded-2xl flex flex-col justify-between h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/40 reveal"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${service.iconBg} ${service.iconColor} flex items-center justify-center mb-6 shadow-sm`}>
                    <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md mb-4 text-on-surface">{service.title}</h3>
                  <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feat: string, fIdx: number) => (
                      <li key={fIdx} className="flex items-center gap-2.5 text-xs text-on-surface-variant">
                        <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check_circle
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={triggerConsultation}
                  className="w-full py-3 rounded-xl border border-outline text-primary font-bold text-center hover:bg-primary/5 transition-colors text-sm cursor-pointer mt-auto"
                >
                  Inquire Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/20 rounded-2xl border border-dashed border-outline-variant/30">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4">search_off</span>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">No services found</h3>
            <p className="text-on-surface-variant max-w-xs mx-auto text-sm">
              We couldn&apos;t find any services matching &ldquo;{searchQuery}&rdquo;. Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </section>

      {/* Specialized Support (Asymmetric Layout) */}
      <section className="bg-surface-container-low py-20 overflow-hidden relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative reveal">
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <Image 
                className="object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiUI33W5j81jF88vKTrypcFzttWAcFtxLYZjOqP3GKDoN7r3dBCBpw6SkXJ6ZWpFNJsfqgkivlpzYlv4EEsbUQBupioOOsdyvrgj-a15QuWGy3GYYIG-5j4eQHkUAjmMUurIfE7J65gDXcKW7UG44Ycjy8GfpRji7RAjFzMfAc-5IhfKwCVIBYSVIOSYEVt-MxFayOGQLbFPzkBgrQ4bp8DMRbBWLxwNewz0dehX0QrZiyIVEMr_fQWzy81GyK-PkzEW00KlIdfyU"
                alt="Healthcare consultants collaborating in high tech space"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>
          <div className="reveal delay-150">
            <span className="text-secondary font-label-sm tracking-widest block mb-4 uppercase">Institutional Care</span>
            <h2 className="font-headline-lg text-headline-lg mb-8 leading-tight">Corporate Healthcare &amp; Patient Coordination</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-primary text-xl">groups</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface mb-2 text-base md:text-lg">Corporate Wellness</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Custom healthcare strategies for multinational organizations, ensuring employee health across borders.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-primary text-xl">person_search</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface mb-2 text-base md:text-lg">Dedicated Coordinators</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Every patient is assigned a personal advocate to navigate linguistic, cultural, and administrative barriers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Process (Accordion Step Guide) */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] py-20 relative z-10">
        <div className="text-center mb-16 reveal">
          <h2 className="font-headline-lg text-headline-lg mb-4 text-on-surface">How It Works</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-sm">
            Our streamlined process ensures you never feel lost in the medical maze.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {steps.map((step, idx) => {
            const isOpen = activeStep === idx;
            return (
              <div 
                key={idx}
                className={`border rounded-2xl overflow-hidden bg-white transition-all duration-300 shadow-sm reveal ${
                  isOpen ? 'border-primary/30 ring-1 ring-primary/10' : 'border-outline-variant/30'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <button
                  onClick={() => setActiveStep(isOpen ? null : idx)}
                  className={`w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none cursor-pointer ${
                    isOpen ? 'bg-primary-container/10' : 'hover:bg-primary-container/5'
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      isOpen ? 'bg-primary text-on-primary' : 'bg-outline-variant/20 text-on-surface-variant'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="font-bold text-on-surface text-base md:text-lg">{step.title}</span>
                  </span>
                  <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                <div 
                  className={`px-8 text-on-surface-variant text-sm leading-relaxed overflow-hidden transition-all duration-300 ${
                    isOpen ? 'pb-6 pt-2 max-h-40 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  {step.content}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Booking CTA */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] mb-20 relative z-10">
        <div className="bg-inverse-surface rounded-[2rem] p-10 md:p-20 text-center relative overflow-hidden shadow-xl">
          {/* Visual Background Ornaments */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-headline-xl text-headline-xl text-white mb-6 leading-tight">
              Your Path to Better Health Begins with a Conversation
            </h2>
            <p className="text-white/70 font-body-lg text-body-lg mb-10 text-sm md:text-base">
              Join thousands of patients who have found clarity and healing through Shifa Global Care&apos;s curated medical network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={triggerConsultation}
                className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:bg-primary/95 transition-all shadow-lg cursor-pointer"
              >
                Book a Free Consultation
              </button>
              <button 
                onClick={triggerConsultation}
                className="bg-white/10 text-white border border-white/20 backdrop-blur-md px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all cursor-pointer"
              >
                Speak to an Advisor
              </button>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/50 border-t border-white/10 pt-8 text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-fixed text-sm">verified</span>
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-fixed text-sm">security</span>
                <span>HIPAA Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-fixed text-sm">public</span>
                <span>Global Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
