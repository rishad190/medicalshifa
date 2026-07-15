'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [dbPartners, setDbPartners] = useState<any[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadPartners() {
      try {
        const res = await fetch('/api/admin/content?type=Partner');
        if (res.ok) {
          const data = await res.json();
          const publicPartners = data.filter((p: any) => p.visibility === 'Public');
          setDbPartners(publicPartners);
        }
      } catch (e) {
        console.error("Failed to fetch partners", e);
      }
    }
    loadPartners();
  }, []);

  const testimonials = [
    {
      text: "Shifa Global Care transformed what felt like an impossible situation into a smooth path to recovery. Their expertise in the UK healthcare system is unmatched.",
      name: "Elena Rodriguez",
      location: "Cardiology Patient, Spain",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCh_xmAs7bBqSd8uY-FUJxWE7d2d1pII__LBRZjfhNdIIxbvvKyD6C5TOuGudI5YmH2KLThZOMmm10h6VKISOP24jNQvX46TCPGilIwtHjkIGjORYXf7UVQYZYOu_hD2g-Dtg6OegFmCIeyGf4znlYvQRv2nSoyLOogN5EBLJXdpFk-Qqj640LlPCtFeVnODmqD-8A480MkUWLJIXAYHlugC3SAfxc85wmtclztmssrslwgBpDv254pSDxB08rLjJ6mr7iOtalvcdE"
    },
    {
      text: "The second opinion I received through Shifa completely changed my treatment plan for the better. I am forever grateful for their attention to detail.",
      name: "Mark Thompson",
      location: "Oncology Patient, Canada",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1FfJI94iwclTLOgbgoQSw3W34C9BiqWWNpzUaTFIrMv23xrJy8W8TwuuFTvKIkwlMy_J44qXQjHZpnOU2edJHx7OqJ1hJkQ-AD_SdS7hDUQQGRcWhOHw36rIOyXPRZzz-q7fewr9BTqBfp9b4ba3E8qdnmO02gBanGhulFTNpm3CZ9bJenvs7nLsnrIztwBqmLrgseMmjUYpo5mTxYopCuPsUI8m6Nk37GKKgIt_EqfmQ6RaN-nMFbEo2YV2-baZ0cuwcEMa291w"
    }
  ];

  const faqs = [
    {
      q: "How do you select your partner hospitals?",
      a: "We only partner with JCI-accredited institutions and world-renowned centers of excellence that meet our rigorous standards for clinical outcomes and patient safety."
    },
    {
      q: "What is included in the initial case review?",
      a: "Our initial review includes a comprehensive analysis of your medical history by our expert consultants and a preliminary recommendation for specialists and treatment paths."
    },
    {
      q: "Do you handle travel and visa arrangements?",
      a: "Yes, our dedicated care managers handle all logistics, including medical visas, travel bookings, and local accommodation for patients and their families."
    }
  ];

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

    // Testimonial auto-carousel
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      revealObserver.disconnect();
      clearInterval(interval);
    };
  }, [testimonials.length]);

  // Scroll handler for testimonial container
  useEffect(() => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({
        left: activeTestimonial * (cardWidth + 32), // includes gap
        behavior: 'smooth'
      });
    }
  }, [activeTestimonial]);

  const triggerConsultation = () => {
    window.dispatchEvent(new CustomEvent('open-consultation'));
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-surface via-surface-container-low to-surface-container/30">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] grid md:grid-cols-2 gap-16 items-center relative z-10 py-16">
          <div className="reveal">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm mb-6">
              Pioneering Global Health Access
            </span>
            <h1 className="font-headline-xl text-headline-xl mb-6 text-on-surface leading-tight">
              World-Class Healthcare, <br />
              <span className="text-primary">Personalized for You</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg">
              Connecting you with elite medical specialists and world-renowned hospitals. Our expert consultants handle the complexity so you can focus on healing.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={triggerConsultation}
                className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-primary/95 transition-all flex items-center gap-2 active:scale-95 cursor-pointer hover:shadow-xl"
              >
                Book a Consultation
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
              <Link 
                href="/services" 
                className="glass-card px-8 py-4 rounded-xl font-bold border border-secondary text-secondary hover:bg-secondary/5 transition-all text-center flex items-center justify-center"
              >
                Our Services
              </Link>
            </div>
          </div>

          <div className="relative reveal delay-200">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative w-full max-w-md mx-auto md:ml-auto">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTn36zkimxWp-Bj7EBHq5J-p4ged_DA7LjKX4raZpSkNSt8kPUG1q4vme1BNmvqsoKlxniXuhWNSlNJhrGYeYhJBeVVyfsHAQ1ncoeC5r_QmW3pE7UIqlmY2EWYYK-ZBzbbvnPzmyy0DD5_yOaccDPHXB0IOcB6zcymzf9EoRWGX-VCaULkgwdQk8DNK-fThrwVy_PbZkxMECG9MMfojPYDrVTpMGM6KIrnxUtErGivVxpaFNBVTzTNQ0r58viQ4ryJWBnHT1P3i4"
                alt="A professional medical environment featuring a high-end consultation suite"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                preload={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            {/* Overlapping Glass Card */}
            <div className="absolute -bottom-6 -left-6 md:-left-10 glass-card p-6 md:p-8 rounded-2xl max-w-xs animate-bounce-subtle hidden sm:block">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">Certified Care</p>
                  <p className="text-xs text-on-surface-variant">Global Accreditation</p>
                </div>
              </div>
              <p className="text-xs md:text-sm italic text-on-surface-variant">
                &ldquo;Shifa handled everything from my second opinion to travel logistics. Exceptional care.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-primary text-on-primary py-12 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] relative z-10 flex flex-wrap justify-around gap-12">
          <div className="text-center reveal">
            <p className="font-headline-lg text-headline-lg font-bold">10k+</p>
            <p className="font-label-sm text-label-sm opacity-80 uppercase tracking-widest mt-1">Patients Assisted</p>
          </div>
          <div className="text-center reveal delay-100">
            <p className="font-headline-lg text-headline-lg font-bold">500+</p>
            <p className="font-label-sm text-label-sm opacity-80 uppercase tracking-widest mt-1">Global Specialists</p>
          </div>
          <div className="text-center reveal delay-200">
            <p className="font-headline-lg text-headline-lg font-bold">25+</p>
            <p className="font-label-sm text-label-sm opacity-80 uppercase tracking-widest mt-1">Partner Countries</p>
          </div>
          <div className="text-center reveal delay-300">
            <p className="font-headline-lg text-headline-lg font-bold">15min</p>
            <p className="font-label-sm text-label-sm opacity-80 uppercase tracking-widest mt-1">Response Time</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Bento Grid */}
      <section className="py-20 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px]">
        <div className="text-center mb-16 reveal">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Why Global Patients Trust Shifa</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 glass-card p-8 md:p-10 rounded-2xl glass-card-hover reveal">
            <span className="material-symbols-outlined text-primary text-5xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            <h3 className="font-headline-md text-headline-md mb-4 text-on-surface">Medical Expertise</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              Our panel consists of retired chief medical officers and consultants with decades of experience in navigating international healthcare standards.
            </p>
          </div>
          <div className="glass-card p-8 md:p-10 rounded-2xl glass-card-hover reveal delay-100">
            <span className="material-symbols-outlined text-secondary text-5xl mb-6">language</span>
            <h3 className="font-headline-md text-headline-md mb-4 text-on-surface">Global Network</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              Direct bridges to the world&apos;s most prestigious medical institutions in the UK, USA, and Germany.
            </p>
          </div>
          <div className="glass-card p-8 md:p-10 rounded-2xl glass-card-hover reveal delay-200">
            <span className="material-symbols-outlined text-primary text-5xl mb-6">shield_with_heart</span>
            <h3 className="font-headline-md text-headline-md mb-4 text-on-surface">Trust</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              Absolute patient confidentiality and ethical medical practices are our core pillars.
            </p>
          </div>
          <div className="md:col-span-4 glass-card p-8 md:p-10 rounded-2xl flex flex-col md:flex-row items-center gap-10 glass-card-hover reveal delay-300">
            <div className="flex-1">
              <span className="material-symbols-outlined text-secondary text-5xl mb-6">support_agent</span>
              <h3 className="font-headline-md text-headline-md mb-4 text-on-surface">Unwavering Support</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">
                From the first call to post-treatment recovery, our dedicated care managers are by your side 24/7 across timezones.
              </p>
            </div>
            <div className="hidden md:block w-1/3 relative aspect-square rounded-xl overflow-hidden shadow-md">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxe0NLh6Euto7ih2DWJ2YnFFzIhoiLLt9feQowKsjPwK11Ps3HEFAxtLJDoJlTOu6EmSPiwSNHQTsYGxZXo4cL-vXiH8GWjmqVHx7ToL7j2cFu4kW5nmbXaBGu3RyeXRYtyaq2Vzmfznvr2sg1z2BBPgqxVFqS2QrLXykLRkfPco0TgWLzYDaZiYJd2Gn09sl0WJWcNRRUe550ZhWpz0o8JkwtcH5NansDPkCJnovmIkHQvRIXjXrqNSJuGBU0loXexDULOxhvt50"
                alt="Concierge agent speaking reassuringly"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Curated Services */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px]">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 reveal">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Curated Medical Services</h2>
              <p className="text-on-surface-variant max-w-xl">
                We provide end-to-end medical logistics and consultancy to ensure you receive the best treatment outcomes globally.
              </p>
            </div>
            <Link 
              className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all group" 
              href="/services"
            >
              <span>View All Services</span> 
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">trending_flat</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 reveal">
              <div className="h-48 overflow-hidden relative">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3swiEmHkXxPC_B5CJhxoWqJgOC15n0z4khyy9qd8U63knib1IGz10lxtFm3zt8seFDCLZA3upr9nb8RzGw129XMZipEepi_HsJSsjOgiBM7RFMY-Fgihx9EA-Q1TIY9DD-9_ZdxEqMOKks98Gy8gl0qf15tF1An2zhEwYtCi-hhsVZy64vJf6-2k2gnewl-AyhB6PyOm1Q4hFdT77QZfaKd2ijuXtye0Yj6zpEXLarg9IVRTkK0P48CELSFKJH4luyFXTKRF2wGA"
                  alt="Futuristic medical consultation room"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>
              <div className="p-8">
                <h3 className="font-headline-md text-headline-md mb-4 text-on-surface group-hover:text-primary transition-colors">
                  Medical Consultation
                </h3>
                <p className="text-on-surface-variant mb-6 text-sm">
                  Direct access to elite physicians for diagnosis confirmation and treatment planning.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Case Review
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Video Consultations
                  </li>
                </ul>
                <Link 
                  href="/services"
                  className="block w-full py-3 rounded-xl border border-outline text-primary font-semibold text-center hover:bg-primary/5 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 reveal delay-100">
              <div className="h-48 overflow-hidden relative">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC88CV2AtUJ6V0BMhBzTf1OQTv3vtqf8J_lkmuxYfz54SuJNeuivrk4VDGsyKiM3YV5bhagpuuzW6CWaxbLiVlZrcLgr9wLHQ3NmDBpRr6HNpDK4Q-v-o8o2qtRL3u-Z8k4OpuEfznp-B-Zq0iBSbqkH_R--g-XQ-zQ0_96k3eQ2kNbqLH0pfmUzrVXYOStLXHqR_Jlvae0RSIlID8tiejjGmm974vHuWu26yMQzZWW8LRetzP7QSHknLzbuaBTXxhMlnemnfbJ0g"
                  alt="Serene world class hospital lobby"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>
              <div className="p-8">
                <h3 className="font-headline-md text-headline-md mb-4 text-on-surface group-hover:text-primary transition-colors">
                  Hospital Referral
                </h3>
                <p className="text-on-surface-variant mb-6 text-sm">
                  Seamless admission to top-tier international hospitals with priority appointment scheduling.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Global Admissions
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Logistics Support
                  </li>
                </ul>
                <Link 
                  href="/services"
                  className="block w-full py-3 rounded-xl border border-outline text-primary font-semibold text-center hover:bg-primary/5 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 reveal delay-200">
              <div className="h-48 overflow-hidden relative">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-u1FJUQxwuIbQnhKty85NNGoh7m3Te2Ute6KrOx_zMe0ulLZM6Yc3uVWDXJMRppWzCf70MwBfePCzokLJ8bbzcNrMryMJ_swYiA__IxyI5MtEXG87gquS5HqJmw3Wxs-g9H9BSDEgz-ZZqaCybQTClrKGqZX3R7qy-1eWLeDNdbdpQQM5Dn9VROBsrfkZfvJ0nQS0a4RquzloQV2C6L6cVfA1kXg7-cjj50ShIo40x6yFQy-kIuvjhGGQBokcxRgSDKKXgfnI9Yc"
                  alt="Medical experts reviewing chart"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>
              <div className="p-8">
                <h3 className="font-headline-md text-headline-md mb-4 text-on-surface group-hover:text-primary transition-colors">
                  Second Opinion
                </h3>
                <p className="text-on-surface-variant mb-6 text-sm">
                  Receive a comprehensive medical review from a multi-disciplinary team of international experts.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Expert Peer Review
                  </li>
                  <li className="flex items-center gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Treatment Optimization
                  </li>
                </ul>
                <Link 
                  href="/services"
                  className="block w-full py-3 rounded-xl border border-outline text-primary font-semibold text-center hover:bg-primary/5 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px]">
        <div className="text-center mb-16 reveal">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Your Journey to Recovery</h2>
          <p className="text-on-surface-variant text-sm">Simple, transparent, and expert-led steps.</p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant/30 -translate-y-1/2 z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div className="flex flex-col items-center text-center reveal bg-background p-4 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xl mb-6 shadow-lg">1</div>
              <h3 className="font-headline-md text-headline-md mb-3 text-on-surface">Initial Assessment</h3>
              <p className="text-on-surface-variant text-sm max-w-xs">
                Share your medical history and goals with our consultants through a secure digital portal.
              </p>
            </div>
            <div className="flex flex-col items-center text-center reveal delay-100 bg-background p-4 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xl mb-6 shadow-lg">2</div>
              <h3 className="font-headline-md text-headline-md mb-3 text-on-surface">Expert Matching</h3>
              <p className="text-on-surface-variant text-sm max-w-xs">
                We match your case with the top 3 global specialists and present a detailed digital care plan.
              </p>
            </div>
            <div className="flex flex-col items-center text-center reveal delay-200 bg-background p-4 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xl mb-6 shadow-lg">3</div>
              <h3 className="font-headline-md text-headline-md mb-3 text-on-surface">Care Execution</h3>
              <p className="text-on-surface-variant text-sm max-w-xs">
                We manage all appointments, travel, and follow-ups while you focus entirely on getting better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Partners */}
      <section className="py-16 bg-surface-container-highest/30">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px]">
          <p className="text-center font-label-sm text-label-sm text-on-surface-variant mb-10 uppercase tracking-widest">
            Collaborating with the World&apos;s Finest Institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {dbPartners.length > 0 ? (
              dbPartners.map(p => (
                <div key={p.id} className="flex items-center gap-3">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="h-10 object-contain" />
                  ) : (
                    <span className="font-headline-md text-headline-md font-bold text-on-surface">{p.name}</span>
                  )}
                </div>
              ))
            ) : (
              <>
                <span className="font-headline-md text-headline-md font-bold text-on-surface">Mayo Clinic</span>
                <span className="font-headline-md text-headline-md font-bold text-on-surface">Cleveland Clinic</span>
                <span className="font-headline-md text-headline-md font-bold text-on-surface">Johns Hopkins</span>
                <span className="font-headline-md text-headline-md font-bold text-on-surface">Guy&apos;s Hospital</span>
                <span className="font-headline-md text-headline-md font-bold text-on-surface">Charité Berlin</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Testimonial Slider */}
      <section className="py-20 bg-surface-container-low overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px]">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 reveal">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Voices of Hope &amp; Healing</h2>
              <p className="text-on-surface-variant text-sm">Empathetic support makes all the difference.</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-12 h-12 rounded-full border border-outline/30 bg-surface hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
              </button>
              <button 
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="w-12 h-12 rounded-full border border-outline/30 bg-surface hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Next Testimonial"
              >
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
          
          <div 
            ref={sliderRef}
            className="flex gap-8 overflow-hidden snap-x snap-mandatory"
          >
            {testimonials.map((t, index) => (
              <div 
                key={index} 
                className="min-w-full md:min-w-[calc(50%-16px)] glass-card p-10 md:p-12 rounded-2xl snap-start reveal flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-secondary mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="font-body-lg text-body-lg text-on-surface-variant italic mb-8">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-14 h-14 rounded-full bg-surface-container-high overflow-hidden relative">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">{t.name}</p>
                    <p className="text-xs md:text-sm text-on-surface-variant">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px]">
        <div className="text-center mb-16 reveal">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Frequently Asked Questions</h2>
          <p className="text-on-surface-variant text-sm">Everything you need to know about our global healthcare consultancy.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div key={index} className="glass-card rounded-2xl overflow-hidden reveal transition-all duration-300">
                <button 
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-primary/5 transition-colors font-bold text-on-surface focus:outline-none cursor-pointer text-sm md:text-base"
                >
                  <span>{faq.q}</span>
                  <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                <div 
                  className={`px-6 text-on-surface-variant text-sm leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'pb-6 max-h-40 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px]">
          <div className="bg-primary rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden text-center reveal shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-headline-xl text-headline-xl text-on-primary mb-6">
                Ready to Experience World-Class Care?
              </h2>
              <p className="font-body-lg text-body-lg text-on-primary/80 mb-10 text-sm md:text-base">
                Start your journey with a complimentary case review by our expert medical consultants today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={triggerConsultation}
                  className="bg-on-primary text-primary px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-on-primary/95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined">calendar_today</span>
                  Schedule Your Call
                </button>
                <button 
                  onClick={triggerConsultation}
                  className="bg-transparent border border-on-primary/30 text-on-primary px-8 py-4 rounded-xl font-bold hover:bg-on-primary/10 transition-all cursor-pointer"
                >
                  Contact Our Team
                </button>
              </div>
            </div>
            {/* Background Decorative Rings */}
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full border border-on-primary/5 pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full border border-on-primary/5 pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
}
