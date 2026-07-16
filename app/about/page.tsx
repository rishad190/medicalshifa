"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { company } from "@/lib/content";

export default function AboutPage() {
  const [selectedLeader, setSelectedLeader] = useState<number | null>(null);

  const values = [
    {
      title: "Unwavering Ethics",
      icon: "⚖️",
      color: "text-teal-700",
      bg: "bg-teal-50",
      description:
        "We prioritize medical integrity above all else, ensuring unbiased advice and strictly confidential patient data management.",
    },
    {
      title: "Clinical Quality",
      icon: "✓",
      color: "text-sky-700",
      bg: "bg-sky-50",
      description:
        "Our network is restricted to accredited institutions and specialists with proven track records of clinical excellence.",
    },
    {
      title: "Patient-First Approach",
      icon: "🤝",
      color: "text-teal-700",
      bg: "bg-teal-50",
      description:
        "Every decision starts and ends with the patient's well-being, comfort, and personalized healthcare journey.",
    },
  ];

  const timeline = [
    {
      year: "2007",
      title: "The Inception",
      description:
        "Founded Shifa Global Care to simplify cross-border medical travel and hospital coordination for international patients.",
      color: "bg-teal-700",
    },
    {
      year: "2012",
      title: "Bangladeshi Liaison Office",
      description:
        "Established dedicated offices to streamline visas and case evaluations for patients traveling from Bangladesh.",
      color: "bg-sky-700",
    },
    {
      year: "2018",
      title: "Hospital Network Expansion",
      description:
        "Partnered with over 50 leading JCI-accredited hospitals across major Indian cities (Delhi, Chennai, Mumbai, Bangalore).",
      color: "bg-teal-700",
    },
    {
      year: "2026",
      title: "Trusted Facilitation",
      description:
        "Over 10,000+ patients assisted globally with seamless visa support, case evaluation, and compassionate coordinates.",
      color: "bg-sky-700",
    },
  ];

  const leaders = [
    {
      name: "Mr. Farhan Shafi",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
      bio: "Farhan has over 18 years of cross-border medical tourism leadership, dedicating his career to making advanced care accessible and affordable.",
    },
    {
      name: "Dr. Sarah Khalil",
      role: "Chief Medical Adviser",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      bio: "Dr. Sarah Khalil oversees our clinical board reviews, ensuring that each patient's medical history is accurately evaluated and matched with the absolute best-fit specialists in India.",
    },
    {
      name: "Ms. Jannat Ara",
      role: "Head of Operations & Visa Liaison",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      bio: "Jannat manages our travel logistics, medical visa fast-tracking coordination, and hotel/airport transfer managers globally.",
    },
    {
      name: "Mr. Sandeep Verma",
      role: "India Network Director",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      bio: "Based in New Delhi, Sandeep coordinates directly with Fortis, Apollo, Medanta, and other tertiary partner hospital desks to support priority booking and patient arrival reception.",
    },
  ];

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-4");
          }
        });
      },
      { threshold: 0.05 }
    );

    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  const triggerConsultation = () => {
    window.dispatchEvent(new CustomEvent("open-consultation"));
  };

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      {/* Hero Branding */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal transition duration-700 ease-out transform opacity-0 translate-y-4">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-widest block mb-4">
              ABOUT SHIFA GLOBAL CARE
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              Advancing Healthcare. Building Trust.
            </h1>
            <p className="text-base text-slate-600 leading-relaxed mb-8">
              {company.description} {company.about}
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200">
              <div className="space-y-2">
                <h3 className="font-bold text-teal-800 text-base">Our Mission</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {company.mission}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-sky-800 text-base">Our Vision</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {company.vision}
                </p>
              </div>
            </div>
          </div>

          <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl reveal transition duration-700 delay-100 ease-out transform opacity-0 translate-y-4 bg-slate-200">
            <Image
              src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80"
              alt="Medical team consulting"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Corporate Values */}
      <section className="bg-white border-y border-slate-200/80 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal transition duration-700 ease-out transform opacity-0 translate-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">Our Core Values</h2>
            <p className="text-sm text-slate-500 mt-4 leading-relaxed">
              We operate under a strict code of ethics, focusing entirely on facilitating optimal clinical outcomes with absolute transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-xs hover:shadow-md transition reveal duration-700 ease-out transform opacity-0 translate-y-4"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`size-12 rounded-2xl ${v.bg} ${v.color} flex items-center justify-center text-xl font-bold mb-6 shadow-inner`}>
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{v.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal transition duration-700 ease-out transform opacity-0 translate-y-4">
          <h2 className="text-3xl font-extrabold text-slate-900">Nearly Two Decades of Care</h2>
          <p className="text-sm text-slate-500 mt-4 leading-relaxed">
            Since 2007, we have walked alongside patients to provide security, transparency, and hope.
          </p>
        </div>

        <div className="relative border-l border-slate-200/85 ml-4 md:ml-32 space-y-12">
          {timeline.map((t, idx) => (
            <div key={t.year} className="relative pl-8 md:pl-12 reveal transition duration-700 ease-out transform opacity-0 translate-y-4">
              {/* Timeline dot */}
              <div className={`absolute -left-3 top-1.5 size-6 rounded-full border-4 border-white ${t.color} shadow-sm`} />
              
              <div className="absolute -left-4 md:-left-32 top-1.5 text-lg font-extrabold text-slate-900">
                {t.year}
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs max-w-2xl">
                <h3 className="text-base font-bold text-slate-950">{t.title}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-white border-t border-slate-200/80 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal transition duration-700 ease-out transform opacity-0 translate-y-4">
            <h2 className="text-3xl font-extrabold text-slate-900">Our Leadership Team</h2>
            <p className="text-sm text-slate-500 mt-4 leading-relaxed">
              Meet the healthcare professionals and visa facilitation coordinators behind Shifa Global Care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader, index) => (
              <div
                key={leader.name}
                onClick={() => setSelectedLeader(selectedLeader === index ? null : index)}
                className={`group cursor-pointer bg-slate-50 border rounded-3xl overflow-hidden transition-all duration-300 reveal ${
                  selectedLeader === index ? "border-teal-600 ring-2 ring-teal-50 shadow-lg scale-102" : "border-slate-200 hover:border-slate-300 shadow-xs"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-square bg-slate-200 overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-sm">{leader.name}</h3>
                  <p className="text-teal-700 text-2xs font-bold uppercase tracking-wider mt-1">{leader.role}</p>
                  
                  {/* Bio Reveal */}
                  <div className={`transition-all duration-300 overflow-hidden ${selectedLeader === index ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="text-4xs text-slate-500 leading-relaxed border-t border-slate-200 pt-3">
                      {leader.bio}
                    </p>
                  </div>
                  <div className="text-teal-700 text-4xs font-bold mt-4 flex items-center justify-end">
                    {selectedLeader === index ? "Hide bio ▲" : "Show bio ▼"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Branding */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-teal-800 to-cyan-950 px-8 py-16 text-center text-white shadow-xl relative overflow-hidden reveal transition duration-700 ease-out transform opacity-0 translate-y-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(20,184,166,0.15),transparent_25%)]" />
          <h2 className="text-3xl font-extrabold mb-4 relative z-10">We Are Ready to Help You</h2>
          <p className="text-slate-200 text-sm max-w-xl mx-auto mb-8 relative z-10">
            For nearly two decades, we have supported patients from Bangladesh and other countries in accessing treatment across India. Reach out for a private consultation review.
          </p>
          <button
            onClick={triggerConsultation}
            className="inline-flex rounded-full bg-white text-teal-900 font-bold px-8 py-4 shadow-lg hover:bg-slate-50 transition cursor-pointer relative z-10"
          >
            Start Your Care Journey
          </button>
        </div>
      </section>
    </div>
  );
}
