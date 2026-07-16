"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { company } from "@/lib/content";

export default function AboutPage() {
  const [selectedLeader, setSelectedLeader] = useState<number | null>(null);

  const values = [
    {
      title: "Unwavering Ethics",
      icon: "gavel",
      color: "text-primary",
      bg: "bg-primary-container/10",
      description:
        "We prioritize medical integrity above all else, ensuring unbiased advice and strictly confidential patient data management.",
    },
    {
      title: "Clinical Quality",
      icon: "verified",
      color: "text-secondary",
      bg: "bg-secondary-container/10",
      description:
        "Our network is restricted to JCI-accredited institutions and specialists with proven track records of excellence.",
    },
    {
      title: "Patient-First Approach",
      icon: "volunteer_activism",
      color: "text-on-primary-fixed-variant",
      bg: "bg-on-primary-fixed-variant/10",
      description:
        "Every decision starts and ends with the patient's well-being, comfort, and personalized healthcare journey.",
    },
  ];

  const timeline = [
    {
      year: "2012",
      title: "The Inception",
      description:
        "Founded in Zurich with a mission to simplify cross-border cardiac consultancy.",
      color: "bg-primary",
    },
    {
      year: "2015",
      title: "European Expansion",
      description:
        "Partnership with top 10 European oncology centers established.",
      color: "bg-secondary",
    },
    {
      year: "2019",
      title: "Global Digital Hub",
      description:
        "Launched the proprietary 'GlobalCare' digital platform for secure medical records.",
      color: "bg-primary",
    },
    {
      year: "2024",
      title: "A New Era",
      description:
        "Managing over 5,000 cases annually across 4 continents and 40+ medical specialties.",
      color: "bg-primary-fixed",
    },
  ];

  const leaders = [
    {
      name: "Dr. Julian Vance",
      role: "Chief Executive Officer",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAvErAvuWjkgK2xsRY0M5Ki5BZCdziCJZvndnbsFCFx-IEB_X4s1F_9y3GBQQ26-jEv7VPBFtzgIuxQteVgbrTKRz962sJV5Y8T4E6MQnHHg7B9gjYkf1TXrMAb37ZoFjDv4KxgshQQRlVNUjuEDvm6qu6nYDXnSRTNJsXwAQzykNa2ZDdz2Tmg52iYP6iaWoRyYS06SpsnYwm0duVVTrFBKnDc3w4XYGwfaPWQFw-whQvZcMXPSAJUCKFigF8q6CJlZpXkT3i9n_M",
      bio: "Julian Vance has over 25 years of medical management leadership and was previously Chief of Staff at Zurich General.",
    },
    {
      name: "Sarah Al-Fayez",
      role: "Chief Operations Officer",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDj15iel4u7hhT8qPvpcL_GgJzIU7hWg6jf_YoRJ5NVFYgx6opJIv76CL5Ymke99jSGT62uuR4rr0X8SVL956DhGM5MQGvSD1d3_M-WIftfqGdby0COMKV2J0fbf-PpW7WX_oUrV74GPfT9o-HP_sIagJ82Bt0JWSBXW5z0v2Cp4QYRL6r8BFEquNCy1eWVCUDpyCufbp6IvQ7YD7_N-wyZPQ8WrmepyPf573Ei3qXpnYEnQZEYLHpFPYccBZmRH2YnlECK15mcYkQ",
      bio: "Sarah oversees our global care hubs, coordinating clinical pathways and logistics managers internationally.",
    },
    {
      name: "Dr. Kenji Tanaka",
      role: "Head of Medical Ethics",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDEN7RTMgjPluZEwFlwahBz0BD6aai22JbKsJGVZ0Zy0c_TJ4wrV0KzZFBIQRHTBn6H-6jQI6iNYCPSHMVvVRN_wFx66qfhgW1TPwFmKpHQOiQ1na654eQ65k-QhxIPlmd-L-4HsibSJjVet3bZMKKpCPpUotGv-35QGbwwgae6I0K1Z4WoalEuYtgq8S566fXp2DNkjnf6ZN1opByuho7-sY1yv4Y_TPVH3VIMsmJBrnAsigC-iaEw_d_LGaEzMyFZxeoU3DjQ9PY",
      bio: "Dr. Tanaka ensures absolute clinical neutrality and ensures data alignment matches strict HIPAA & GDPR regulations.",
    },
    {
      name: "Dr. Elena Rossi",
      role: "Director of Global Network",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDpGQKjQRlIUuAhUeL_ErrdJywQnOJAVvr_97itJGV-6f1dBnGZQdmohbRPvkshu4pOWAHQYZ7vsAWKoVWNuKvoicsoftVE3WdZU-9CAzBqwZdDuhBRrVSTsfpTt6Qh8PoTvFlJg8b7_EFUTua5U2ZiAYF1bTUCu0jNAw-_LiEXuhCEFSvLZuwkB0Kvu5aDViRaGzQMHQxzQ7cm4UslSIueco9nEvVwVnVv70TN_438gGZidBNSAQmIsa80J_yyVJNu0ufCQlzvK7k",
      bio: "Elena handles vetting procedures for all JCI hospitals and private clinics added to the Shifa roster.",
    },
  ];

  useEffect(() => {
    // Scroll reveal animation observer
    const observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px -40px 0px",
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(".reveal")
      .forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  const triggerConsultation = () => {
    window.dispatchEvent(new CustomEvent("open-consultation"));
  };

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Hero Branding */}
      <section className="mx-auto max-w-360 px-6 md:px-12 lg:px-grid-margin-desktop py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <span className="text-primary font-label-sm tracking-widest block mb-4 uppercase">
              Who We Are
            </span>
            <h1 className="font-headline-xl text-headline-xl text-on-background leading-tight mb-6">
              Empowering Healthcare Beyond Boundaries.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-8">
              {company.description}
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-outline-variant/30">
              <div className="space-y-2">
                <h3 className="font-bold text-primary text-lg">Mission</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {company.mission}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-secondary text-lg">Vision</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {company.vision}
                </p>
              </div>
            </div>
          </div>
          <div className="relative reveal delay-200">
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl pointer-events-none" />
            <div className="aspect-4/5 rounded-4xl overflow-hidden shadow-2xl relative max-w-md mx-auto">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChoRYaZ9Z9Wr4DKzUpZSTm7NRycFOLMV3yDvqP3yEqy_jF-lP8jeAwJe_mn-IudNzrqWEGvIeDOrDnYaRnFgu4KXoN0gpvPYSCVqmc-XWehHF-WhVll7UdCK-BsRRYKK5oMeXlfElsiL_7qEyMcJxQblUi3Nw2u7YAJYqcVM7H6tsxkU4ZkaaokuUTFEfftQSw3poeDB_9fOg12uOTXAgoEixLt7tNUlvhtDIAdLOqdhhqWU3xsr-T3Cx_5dyIEaFVRCYnAx-FvNc"
                alt="Diverse team of doctors in a modern glass lobby"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-surface border-y border-outline-variant/20 relative z-10">
        <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-grid-margin-desktop">
          <div className="text-center mb-16 reveal">
            <h2 className="font-headline-lg text-headline-lg mb-4 text-on-surface">
              Our Core Values
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-sm">
              The principles that guide every consultation, patient journey, and
              institutional partnership.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div
                key={val.title}
                className="glass-card p-8 rounded-2xl glass-card-hover reveal"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div
                  className={`w-14 h-14 ${val.bg} ${val.color} rounded-xl flex items-center justify-center mb-6`}
                >
                  <span className="material-symbols-outlined text-3xl">
                    {val.icon}
                  </span>
                </div>
                <h3 className="font-bold text-on-surface mb-3 text-lg">
                  {val.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Journey - Timeline */}
      <section className="py-20 bg-surface-container-low overflow-hidden relative z-10">
        <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-grid-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl reveal">
              <h2 className="font-headline-lg text-headline-lg mb-4 text-on-surface">
                Our Growth Journey
              </h2>
              <p className="text-on-surface-variant text-sm">
                From a boutique consultancy to a global medical facilitator, our
                growth is a testament to the trust of thousands of patients.
              </p>
            </div>
            <div className="hidden md:block reveal delay-200">
              <span className="text-primary font-bold text-headline-xl opacity-10 uppercase tracking-widest">
                Est. 2012
              </span>
            </div>
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-outline-variant/30 hidden lg:block z-0" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {timeline.map((item, idx) => (
                <div
                  key={item.year}
                  className="space-y-6 reveal"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div
                    className={`w-12 h-12 ${item.color} ${idx % 2 === 1 ? "lg:mt-12" : ""} text-on-primary rounded-full flex items-center justify-center font-bold relative z-10 shadow-md`}
                  >
                    {item.year}
                  </div>
                  <div className="glass-card p-6 rounded-2xl bg-white/70">
                    <h4 className="font-bold mb-2 text-on-surface">
                      {item.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Medical Network - Footprint */}
      <section className="py-20 relative z-10" id="network">
        <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-grid-margin-desktop">
          <div className="glass-card rounded-[2.5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            <div className="lg:col-span-4 p-10 md:p-12 flex flex-col justify-center space-y-8 bg-on-tertiary-fixed text-white relative">
              <h2 className="font-headline-lg text-headline-lg leading-tight">
                Our Global Footprint
              </h2>
              <p className="opacity-80 text-sm leading-relaxed">
                We have hand-selected medical partners in over 15 countries,
                ensuring our patients receive the best care, regardless of
                geography.
              </p>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-fixed animate-ping" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-fixed absolute" />
                  <span>350+ Partner Hospitals</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-fixed" />
                  <span>1200+ Specialist Doctors</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-fixed" />
                  <span>18 Global Care Hubs</span>
                </div>
              </div>
              <button
                onClick={triggerConsultation}
                className="border border-white/30 text-white px-8 py-3 rounded-xl hover:bg-white/10 transition-colors self-start font-semibold text-sm cursor-pointer"
              >
                Explore Network
              </button>
            </div>

            {/* Interactive map visualization */}
            <div className="lg:col-span-8 bg-slate-100 relative flex items-center justify-center p-8 overflow-hidden min-h-[300px]">
              <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
                <span className="material-symbols-outlined text-[300px] text-slate-900 select-none">
                  public
                </span>
              </div>

              {/* Interactive map location cards */}
              <div className="relative w-full h-full min-h-[350px]">
                {/* Switzerland Marker */}
                <div className="absolute top-[30%] left-[25%] group">
                  <div className="w-3.5 h-3.5 bg-primary rounded-full animate-ping pointer-events-none" />
                  <div className="w-3.5 h-3.5 bg-primary rounded-full absolute top-0 shadow-[0_0_10px_rgba(0,104,95,0.7)] cursor-pointer" />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-on-surface text-xs font-bold py-1 px-2.5 rounded-lg shadow-md border border-outline-variant/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                    Zurich Care Hub
                  </div>
                </div>

                {/* USA Marker */}
                <div className="absolute top-[25%] left-[10%] group">
                  <div className="w-3.5 h-3.5 bg-secondary rounded-full animate-ping pointer-events-none" />
                  <div className="w-3.5 h-3.5 bg-secondary rounded-full absolute top-0 shadow-[0_0_10px_rgba(64,89,170,0.7)] cursor-pointer" />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-on-surface text-xs font-bold py-1 px-2.5 rounded-lg shadow-md border border-outline-variant/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                    USA Specialist Bridge
                  </div>
                </div>

                {/* UK Marker */}
                <div className="absolute top-[22%] left-[20%] group">
                  <div className="w-3.5 h-3.5 bg-primary rounded-full animate-ping pointer-events-none" />
                  <div className="w-3.5 h-3.5 bg-primary rounded-full absolute top-0 shadow-[0_0_10px_rgba(0,104,95,0.7)] cursor-pointer" />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-on-surface text-xs font-bold py-1 px-2.5 rounded-lg shadow-md border border-outline-variant/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                    London Referral Office
                  </div>
                </div>

                {/* Asia Marker */}
                <div className="absolute top-[45%] left-[65%] group">
                  <div className="w-3.5 h-3.5 bg-secondary rounded-full animate-ping pointer-events-none" />
                  <div className="w-3.5 h-3.5 bg-secondary rounded-full absolute top-0 shadow-[0_0_10px_rgba(64,89,170,0.7)] cursor-pointer" />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-on-surface text-xs font-bold py-1 px-2.5 rounded-lg shadow-md border border-outline-variant/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                    Tokyo Operations Centre
                  </div>
                </div>

                {/* Middle East Marker */}
                <div className="absolute top-[40%] left-[45%] group">
                  <div className="w-3.5 h-3.5 bg-primary rounded-full animate-ping pointer-events-none" />
                  <div className="w-3.5 h-3.5 bg-primary rounded-full absolute top-0 shadow-[0_0_10px_rgba(0,104,95,0.7)] cursor-pointer" />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-on-surface text-xs font-bold py-1 px-2.5 rounded-lg shadow-md border border-outline-variant/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                    Gulf Region Hub
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p className="text-xs text-on-surface-variant font-medium select-none bg-white/70 px-4 py-1.5 rounded-full border border-outline-variant/10 shadow-sm backdrop-blur-sm">
                    Hover over active markers to inspect global hubs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Ethics Advisory Board */}
      <section
        className="py-20 bg-surface border-t border-outline-variant/20 relative z-10"
        id="ethics"
      >
        <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-grid-margin-desktop">
          <div className="text-center mb-16 reveal">
            <h2 className="font-headline-lg text-headline-lg mb-4 text-on-surface">
              Leadership &amp; Advisory
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-sm">
              Led by medical visionaries and administrative experts committed to
              ethical global healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader, index) => (
              <div
                key={leader.name}
                className="group relative cursor-pointer reveal"
                style={{ transitionDelay: `${index * 80}ms` }}
                onClick={() =>
                  setSelectedLeader(selectedLeader === index ? null : index)
                }
              >
                <div className="relative overflow-hidden rounded-4xl mb-6 aspect-3/4 shadow-md border border-outline-variant/10">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover transition-all duration-500 scale-105 group-hover:scale-100 group-hover:filter-none filter grayscale"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-on-tertiary-fixed/90 via-on-tertiary-fixed/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 text-white">
                    <p className="text-xs leading-relaxed opacity-90">
                      {leader.bio}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-on-tertiary-fixed transition-colors">
                        <span className="material-symbols-outlined text-base">
                          share
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <h4 className="font-headline-md text-headline-md mb-1 text-on-surface text-lg md:text-xl">
                  {leader.name}
                </h4>
                <p className="text-primary font-bold text-xs uppercase tracking-wider">
                  {leader.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start Healing Journey CTA */}
      <section className="py-20 relative z-10">
        <div className="mx-auto max-w-360 px-6 md:px-12 lg:px-grid-margin-desktop">
          <div className="bg-primary-container p-10 md:p-16 rounded-[2.5rem] text-on-primary-container text-center relative overflow-hidden shadow-xl border border-primary/20">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed/20 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-fixed/10 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none" />

            <h2 className="font-headline-xl text-headline-xl mb-6 relative z-10 leading-tight">
              Start Your Global Healing Journey
            </h2>
            <p className="text-body-lg text-body-lg mb-10 max-w-2xl mx-auto opacity-95 relative z-10 text-sm md:text-base leading-relaxed">
              Our consultants are ready to provide the clarity and expertise you
              need for your healthcare decisions. Reach out for a confidential
              review today.
            </p>
            <button
              onClick={triggerConsultation}
              className="bg-primary text-on-primary hover:bg-primary/95 px-10 py-4 rounded-xl font-bold shadow-lg transition-all duration-200 active:scale-[0.98] z-10 relative cursor-pointer"
            >
              Contact Our Consultants
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
