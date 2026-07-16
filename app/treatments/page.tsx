"use client";

import { useState } from "react";
import Link from "next/link";

type TreatmentItem = {
  title: string;
  category: "Critical Care" | "Specialized Surgery" | "Chronic & Organ" | "Wellness & Elective";
  description: string;
  procedures: string[];
  icon: string;
};

export default function TreatmentsPage() {
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = ["All", "Critical Care", "Specialized Surgery", "Chronic & Organ", "Wellness & Elective"];

  const treatments: TreatmentItem[] = [
    {
      title: "Cardiology",
      category: "Critical Care",
      icon: "❤️",
      description:
        "Advanced cardiovascular care including minimally invasive heart valve replacements, coronary artery bypass grafts (CABG), angioplasty, and pediatric heart surgeries.",
      procedures: ["Bypass Surgery (CABG)", "TAVR / Valve Replacement", "Angioplasty & Stents"],
    },
    {
      title: "Oncology",
      category: "Critical Care",
      icon: "🧬",
      description:
        "Comprehensive cancer therapies ranging from robotic surgeries, radiation therapy (cyberknife), chemotherapy, targeted immunotherapy, and bone marrow transplants.",
      procedures: ["Robotic Cancer Surgery", "Immunotherapy & Chemo", "Cyberknife Radiation"],
    },
    {
      title: "Organ Transplantation",
      category: "Chronic & Organ",
      icon: "🔄",
      description:
        "State-of-the-art liver and kidney transplantation programs at India's leading transplant centers, offering outstanding post-operative survival rates.",
      procedures: ["Living Donor Liver Transplant", "Kidney Transplantation", "Bone Marrow Transplant"],
    },
    {
      title: "Neurology & Neurosurgery",
      category: "Critical Care",
      icon: "🧠",
      description:
        "Surgical and medical management of brain tumors, deep brain stimulation (DBS) for Parkinson's, spinal disc corrections, and stroke rehabilitation.",
      procedures: ["Brain Tumor Resection", "Deep Brain Stimulation", "Spinal Fusion Surgery"],
    },
    {
      title: "Orthopedics & Joint Replacement",
      category: "Specialized Surgery",
      icon: "🦴",
      description:
        "Highly successful joint reconstruction programs including computer-assisted total knee and hip replacements, arthroscopy, and complex trauma surgeries.",
      procedures: ["Total Knee Replacement", "Hip Joint Reconstruction", "Spine Decompression"],
    },
    {
      title: "Gastroenterology & Nephrology",
      category: "Chronic & Organ",
      icon: "💧",
      description:
        "Clinical care for complex GI tract disorders, liver cirrhosis, chronic kidney disease (CKD) management, hemodialysis, and renal transplants.",
      procedures: ["GI Endoscopy & Colonoscopy", "Dialysis Services", "Chronic Nephritis Management"],
    },
    {
      title: "Fertility & IVF",
      category: "Wellness & Elective",
      icon: "👶",
      description:
        "Advanced reproductive medicine featuring ICSI, egg freezing, pre-implantation genetic diagnostics (PGD), and evidence-based IVF therapies.",
      procedures: ["In Vitro Fertilization (IVF)", "ICSI Procedures", "Blastocyst Culture"],
    },
    {
      title: "Cosmetic & Reconstructive Surgery",
      category: "Wellness & Elective",
      icon: "✨",
      description:
        "Aesthetic and reconstructive procedures focusing on safety, recovery, and natural outcomes, managed by accredited plastic surgeons.",
      procedures: ["Reconstructive Surgeries", "Liposuction & Contouring", "Hair Restoration"],
    },
    {
      title: "Pediatrics & Vision Care",
      category: "Specialized Surgery",
      icon: "👁️",
      description:
        "Comprehensive pediatric medicine alongside advanced ophthalmology treatments, including corneal transplants, LASIK, and cataract procedures.",
      procedures: ["Pediatric Cardiac Care", "LASIK Eye Correction", "Corneal Grafting"],
    },
  ];

  const filtered = selectedCat === "All" ? treatments : treatments.filter((t) => t.category === selectedCat);

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="max-w-3xl mb-12">
          <span className="text-teal-700 font-bold text-xs uppercase tracking-widest block mb-4">
            SPECIALTIES & PATHWAYS
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Specialized Treatment Pathways
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            We connect patients with specialized clinical desks in India, managing coordinates for major medical interventions, oncology protocols, organ transplants, and elective surgeries.
          </p>
        </header>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-6 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition cursor-pointer ${
                selectedCat === cat
                  ? "bg-teal-700 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Treatments Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.title}
              className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="size-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center text-xl font-bold mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-5 mt-auto">
                <h4 className="text-2xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Common Procedures:
                </h4>
                <ul className="space-y-2">
                  {item.procedures.map((proc) => (
                    <li key={proc} className="flex items-center gap-2 text-2xs text-slate-600">
                      <span className="text-teal-700">✦</span>
                      <span>{proc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Contact Box */}
        <div className="mt-16 rounded-3xl bg-teal-900 px-8 py-12 text-center text-white relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(20,184,166,0.15),transparent_25%)]" />
          <h2 className="text-2xl font-bold mb-3 relative z-10">
            Need a Personalized Treatment Plan?
          </h2>
          <p className="mx-auto max-w-xl text-xs text-teal-100 leading-relaxed mb-8 relative z-10">
            Speak with our coordinators to review your medical history, expected treatment timeline, and hospital budget before you travel.
          </p>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-white text-teal-900 font-bold px-6 py-3.5 text-xs shadow-md hover:bg-slate-50 transition cursor-pointer relative z-10"
          >
            Request a Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
