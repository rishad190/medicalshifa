"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type HospitalItem = {
  id: string;
  name: string;
  location: string;
  focus: string;
  description: string;
  image?: string;
};

export default function HospitalsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLoc, setSelectedLoc] = useState("All");
  const [dbHospitals, setDbHospitals] = useState<any[]>([]);

  const locations = ["All", "India", "Thailand", "Nepal", "Singapore"];

  const defaultHospitals: HospitalItem[] = [
    {
      id: "fortis-healthcare",
      name: "Fortis Healthcare",
      location: "Delhi, India",
      focus: "Multi-specialty tertiary care and transplant services",
      description:
        "Renowned for organ transplantations, cardiac interventions, and robotic surgical operations with state-of-the-art facilities.",
    },
    {
      id: "apollo-hospitals",
      name: "Apollo Hospitals",
      location: "Chennai, India",
      focus: "Oncology, cardiology, and advanced diagnostics",
      description:
        "One of the largest JCI-accredited tertiary care networks specializing in proton-beam oncology, structural heart care, and robotics.",
    },
    {
      id: "bumrungrad-international",
      name: "Bumrungrad International Hospital",
      location: "Bangkok, Thailand",
      focus: "Premium quaternary care and wellness services",
      description:
        "One of the largest JCI-accredited clinical hubs in Southeast Asia, specializing in comprehensive health screenings, cardiology, and advanced oncology care.",
    },
    {
      id: "norvic-international",
      name: "Norvic International Hospital",
      location: "Kathmandu, Nepal",
      focus: "Multi-specialty tertiary & emergency medical care",
      description:
        "Renowned facility in Kathmandu offering state-of-the-art diagnostic services, cardiology, and priority case evaluation coordination.",
    },
    {
      id: "mount-elizabeth-orchard",
      name: "Mount Elizabeth Hospital",
      location: "Orchard, Singapore",
      focus: "Advanced surgical procedures and oncology excellence",
      description:
        "Elite private healthcare institution famous for cardiovascular surgery, robotic-assisted operations, and high-success treatment pathways.",
    },
  ];

  useEffect(() => {
    async function loadHospitals() {
      try {
        const res = await fetch("/api/admin/content?type=Hospital");
        if (res.ok) {
          const data = (await res.json()) as any[];
          const publicHospitals = data.filter((h: any) => h.visibility === "Public");
          setDbHospitals(publicHospitals);
        }
      } catch (e) {
        console.error("Failed to load D1 hospitals", e);
      }
    }
    loadHospitals();
  }, []);

  const formattedDbHospitals: HospitalItem[] = dbHospitals.map((h: any) => ({
    id: h.id,
    name: h.name,
    location: h.location || "India",
    focus: h.focus || "Multi-specialty",
    description: h.description || "",
  }));

  const allHospitals = [...defaultHospitals, ...formattedDbHospitals];

  // Filtering
  const filtered = allHospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.focus.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLoc =
      selectedLoc === "All" || hospital.location.toLowerCase().includes(selectedLoc.toLowerCase());
    return matchesSearch && matchesLoc;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="max-w-3xl mb-12">
          <span className="text-teal-700 font-bold text-xs uppercase tracking-widest block mb-4">
            OUR PARTNER HOSPITALS
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            World-Class Hospital Networks
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            We collaborate exclusively with leading accredited medical institutions across India, Thailand, Nepal, and Singapore. These hospitals feature modern diagnostic labs, ICU capabilities, and dedicated desks for international patient relations.
          </p>
        </header>

        {/* Search & Location Filter */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 mb-10">
          <div className="flex flex-wrap gap-2">
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLoc(loc)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition cursor-pointer ${
                  selectedLoc === loc
                    ? "bg-teal-700 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Search hospitals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-4 pr-10 text-xs focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-50 transition"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🔍
            </span>
          </div>
        </div>

        {/* Hospital Cards Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500 bg-white border border-slate-200 rounded-3xl">
            <p className="text-sm">No partner hospitals found matching your selection.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {filtered.map((hospital) => (
              <article
                key={hospital.id}
                className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                    {hospital.location}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-4 mb-2">{hospital.name}</h3>
                  <p className="text-xs font-semibold text-sky-800 uppercase tracking-wide mb-4">
                    Focus: {hospital.focus}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {hospital.description}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5 mt-6 flex justify-between items-center">
                  <span className="text-4xs text-slate-400 font-bold uppercase tracking-wider">
                    JCI Accredited Partner
                  </span>
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new Event("open-consultation"));
                      }
                    }}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 hover:underline"
                  >
                    Select Hospital & Plan →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
