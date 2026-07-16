"use client";

import Link from "next/link";

export default function MedicalVisaPage() {
  const visaPhases = [
    {
      step: "01",
      title: "Receive Hospital invitation Letter",
      desc: "Our team coordinates with the selected partner hospital in India to issue an official Medical Visa Invitation Letter detailing your clinical booking and estimated stay duration.",
    },
    {
      step: "02",
      title: "Embassy Application Submission",
      desc: "Submit your online visa application on the official government portal. We review your document attachments (passport scans, native doctor referrals, bank statements) to prevent administrative delays.",
    },
    {
      step: "03",
      title: "IVAC Biometrics & processing",
      desc: "Attend your biometric appointment at the local Indian Visa Application Center (IVAC) in Bangladesh or your home country. Medical visas are fast-tracked compared to tourist visas.",
    },
    {
      step: "04",
      title: "Attendant Visa Coordinates",
      desc: "India allows up to two companions to travel under Medical Attendant (MED-2) visas. We assist in filing these companion applications concurrently with the patient's request.",
    },
  ];

  const requiredDocuments = [
    { name: "Accredited Hospital Invitation Letter", desc: "Issued by our Indian partner hospital desk (we manage this)." },
    { name: "Native Referral Letter", desc: "Recommendation summary from a registered doctor in your home country." },
    { name: "Valid Passport", desc: "Must have at least 6 months remaining validity with 2 blank pages." },
    { name: "Financial Solvency proof", desc: "Recent bank statements showing adequate funds for clinical and stay budgets." },
    { name: "Passport Sized Photographs", desc: "Recent color photographs matching Indian visa size guidelines." },
    { name: "Utility Bill Copy", desc: "National residency proof matching your current address details." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="max-w-3xl mb-12">
          <span className="text-teal-700 font-bold text-xs uppercase tracking-widest block mb-4">
            MEDICAL TRAVEL CONVERSION
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Indian Medical Visa Guidance
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            Obtaining a Medical Visa (MED) is a critical step for your treatment journey. Shifa Global Care guides you through embassy prerequisites, fast-tracks hospital invitation letters, and ensures compliant documentation.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Phase Steps */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 mb-8">Step-by-Step Visa Coordination</h2>
              
              <div className="grid gap-8">
                {visaPhases.map((phase) => (
                  <div key={phase.step} className="flex gap-5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-800 text-sm font-extrabold">
                      {phase.step}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm md:text-base">{phase.title}</h3>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Documents checklist sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 mb-6">Required Attachments</h2>
              <ul className="space-y-4">
                {requiredDocuments.map((doc) => (
                  <li key={doc.name} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <strong className="text-xs text-slate-800 font-semibold block">{doc.name}</strong>
                    <span className="text-4xs text-slate-400 block mt-0.5 leading-relaxed">{doc.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-teal-900 text-white rounded-3xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(20,184,166,0.15),transparent_25%)]" />
              <h3 className="font-bold text-sm mb-2 relative z-10">Need a Visa invitation Letter?</h3>
              <p className="text-xs text-teal-100/90 leading-relaxed mb-6 relative z-10">
                Submit your case consultation. Once matched, we will initiate request procedures for your embassy letter with Apollo, Fortis, or Medanta desks.
              </p>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new Event("open-consultation"));
                  }
                }}
                className="w-full bg-white text-teal-900 font-bold text-xs py-3 rounded-xl shadow-md hover:bg-slate-50 transition cursor-pointer relative z-10"
              >
                Start Visa Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
