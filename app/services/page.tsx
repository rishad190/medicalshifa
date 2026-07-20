"use client";

import { useState, useEffect } from "react";
import { company } from "@/lib/content";

type ServiceItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  icon: string;
};

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dbServices, setDbServices] = useState<any[]>([]);

  const categories = ["All", "Clinical Care", "Logistics & Visas", "Support Services"];

  // 9 Core Services defined in company guidelines
  const coreServices: ServiceItem[] = [
    {
      id: "consultation-evaluation",
      title: "Medical Consultation & Case Evaluation",
      category: "Clinical Care",
      icon: "🩺",
      description:
        "Comprehensive review of medical records by leading clinicians to provide clear treatment recommendations and roadmap guidelines.",
      features: [
        "Specialist second opinions",
        "Clinical pathway mapping",
        "Initial records evaluation",
      ],
    },
    {
      id: "hospital-selection",
      title: "Hospital & Specialist Selection",
      category: "Clinical Care",
      icon: "🏥",
      description:
        "Matching patient requirements with JCI-accredited hospitals and renowned surgeons across major Indian metropolitan areas.",
      features: ["Accredited hospital networks", "Surgeon success-rate audits", "Budget optimization"],
    },
    {
      id: "cost-estimation",
      title: "Treatment Planning & Cost Estimation",
      category: "Clinical Care",
      icon: "📊",
      description:
        "Drafting complete care plans including hospital cost estimations, rehabilitation schedules, and total budget allocations.",
      features: ["Itemized cost sheets", "Priority procedure scheduling", "Timeline planning"],
    },
    {
      id: "visa-assistance",
      title: "Medical Visa Assistance",
      category: "Logistics & Visas",
      icon: "🛂",
      description:
        "End-to-end guidance for medical visas (MED & MED-Attendant) including hospital invitation letters and fast-track clearance support.",
      features: ["Visa invitation coordination", "Embassy document review", "Fast-track processing advisory"],
    },
    {
      id: "travel-arrangements",
      title: "Travel & Accommodation Arrangements",
      category: "Logistics & Visas",
      icon: "✈️",
      description:
        "Coordinating flight bookings and vetting nearby hotels or guest houses matching patient recovery constraints and companion needs.",
      features: ["Disability-friendly stays", "Companion lodging vetting", "Flexible flight options"],
    },
    {
      id: "airport-transfers",
      title: "Airport Reception & Transfers",
      category: "Logistics & Visas",
      icon: "🚗",
      description:
        "On-arrival pickup and ambulance or private vehicle transfer directly to the hospital or hotel to ensure patient safety and comfort.",
      features: ["Ambulance transfers if required", "Dedicated airport assistants", "Secure transit logistics"],
    },
    {
      id: "interpreter-support",
      title: "Interpreter & Language Support",
      category: "Support Services",
      icon: "🗣️",
      description:
        "Overcoming language barriers with dedicated patient coordinators speaking Bangla, English, Hindi, and local dialects.",
      features: ["On-site interpreters", "Translating medical briefs", "24/7 care desk access"],
    },
    {
      id: "appointment-coordination",
      title: "Appointment Coordination",
      category: "Support Services",
      icon: "📅",
      description:
        "Securing priority outpatient consultations, lab tests, and hospital admission queues to reduce unnecessary travel stays.",
      features: ["Zero-wait OPD queues", "Same-day diagnostics schedules", "Follow-up scheduling"],
    },
    {
      id: "post-treatment",
      title: "Post-Treatment Follow-up",
      category: "Support Services",
      icon: "❤️",
      description:
        "Continuous coordinate support after returning home, helping transmit diagnostic charts back to the operating surgeon.",
      features: ["Teleconsultation scheduling", "Prescription renewal guides", "Care continuity audits"],
    },
  ];

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/admin/content?type=Service");
        if (res.ok) {
          const text = await res.text();
          const data = text ? JSON.parse(text) : [];
          if (Array.isArray(data)) {
            const publicServices = data.filter((s: any) => s.visibility === "Public");
            setDbServices(publicServices);
          }
        }
      } catch (e) {
        console.error("Failed to fetch D1 services", e);
      }
    }
    loadServices();
  }, []);

  // Format D1 services to fit ServiceItem interface
  const formattedDbServices: ServiceItem[] = dbServices.map((s: any) => ({
    id: s.id,
    title: s.title,
    category: s.category || "Clinical Care",
    icon: "🌟",
    description: s.description || "",
    features: s.tags ? s.tags.split(",") : [],
  }));

  const allServices = [...coreServices, ...formattedDbServices];

  // Filtering Logic
  const filteredServices = allServices.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openConsultation = () => {
    window.dispatchEvent(new Event("open-consultation"));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <header className="max-w-3xl mb-12">
          <span className="text-teal-700 font-bold text-xs uppercase tracking-widest block mb-4">
            OUR CARE SERVICES
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            End-to-End Medical Travel Facilitation
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            Shifa Global Care coordinates every aspect of your treatment journey in India. From initial specialist case reviews to airport pickups, hotel lodging, and post-discharge follow-ups.
          </p>
        </header>

        {/* Search and Filters Bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-teal-700 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-4 pr-10 text-xs focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-50 transition"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🔍
            </span>
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 text-slate-500 bg-white border border-slate-200 rounded-3xl">
            <p className="text-sm">No services matched your filters.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service, index) => (
              <article
                key={service.id}
                className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="size-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center text-xl font-bold mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {service.features.length > 0 && (
                  <div className="border-t border-slate-100 pt-5 mt-auto">
                    <h4 className="text-2xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Features Included:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-2xs text-slate-600">
                          <span className="text-teal-700">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        {/* Global CTA Box */}
        <div className="mt-16 bg-gradient-to-br from-teal-800 to-cyan-950 text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(20,184,166,0.15),transparent_25%)]" />
          <h2 className="text-2xl font-bold mb-3 relative z-10">Need Assistance Choosing a Pathway?</h2>
          <p className="text-slate-200 text-xs max-w-xl mx-auto mb-6 relative z-10">
            Tell us about your diagnostic briefs and treatment goals. A case coordinator will evaluate and estimate costs with leading specialists.
          </p>
          <button
            onClick={openConsultation}
            className="inline-flex rounded-full bg-white text-teal-900 font-bold px-6 py-3.5 text-xs shadow-md hover:bg-slate-50 transition cursor-pointer relative z-10"
          >
            Schedule Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
