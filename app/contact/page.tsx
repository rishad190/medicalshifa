"use client";

import { useState } from "react";
import { company } from "@/lib/content";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");

    const data = Object.fromEntries(new FormData(e.currentTarget));
    // Check consent check
    if (!data.consent) {
      setError("You must consent to our coordination procedures.");
      setBusy(false);
      return;
    }

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          consent: true,
        }),
      });

      setBusy(false);
      if (response.ok) {
        setSent(true);
      } else {
        const errData = (await response.json().catch(() => ({}))) as any;
        setError(errData.error || "We could not send your request right now. Please try again.");
      }
    } catch (err) {
      setBusy(false);
      setError("An error occurred during submission. Please check your connection.");
    }
  }

  const offices = [
    {
      country: "Bangladesh Liaison Office",
      city: "Dhaka",
      address: "Meghna Air Overseas, Shatabdi Centre, Room No-9/B (9th Flr), 292, Inner Circular Road, Fakirapool, Dhaka-1000.",
      phone: "+8801999910930",
      email: "asumi782@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-3xl mb-12">
          <span className="text-teal-700 font-bold text-xs uppercase tracking-widest block mb-4">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Contact Our Care Coordinators
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            Have questions about hospitals, medical visas, or treatment cost estimations? Fill out the brief form below, or contact one of our regional offices directly.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Contact Form card */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-8 shadow-xs">
            {sent ? (
              <div className="py-12 text-center">
                <div className="mx-auto grid size-16 place-items-center rounded-full bg-teal-50 text-2xl text-teal-800 mb-6">
                  ✓
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Message Sent Successfully</h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. A dedicated Shifa coordinator will review your inquiry and contact you shortly through your provided details.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-6 py-3 rounded-full shadow-xs transition"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Submit a Case Consultation Request</h2>
                
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Full Name
                    </label>
                    <input
                      required
                      name="name"
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 rounded-xl py-3 px-4 text-xs focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Treatment Area / Specialty
                    </label>
                    <select
                      name="service"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 rounded-xl py-3 px-4 text-xs focus:outline-none transition-all"
                    >
                      <option value="General consultation">General consultation</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Oncology">Oncology</option>
                      <option value="Organ transplantation">Organ transplantation</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="IVF & Fertility">IVF & Fertility</option>
                      <option value="Other specialty">Other specialty</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Email Address
                    </label>
                    <input
                      required
                      name="email"
                      type="email"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 rounded-xl py-3 px-4 text-xs focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Phone Number (WhatsApp Preferred)
                    </label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="e.g. +880 1700-000000"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 rounded-xl py-3 px-4 text-xs focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-start gap-2.5 text-2xs leading-relaxed text-slate-500">
                    <input required name="consent" type="checkbox" className="mt-1" />
                    <span>
                      I consent to Shifa Global Care contacting me and processing my basic contact records. We enforce strict data encryption; do not submit medical reports here.
                    </span>
                  </label>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl text-xs font-semibold">
                    ⚠️ {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-teal-900/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {busy ? "Sending Inquiry..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>

          {/* Regional Offices */}
          <div className="lg:col-span-5 space-y-6">
            {offices.map((office) => (
              <div
                key={office.country}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                  {office.country}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-4">{office.city} Office</h3>
                <p className="text-2xs text-slate-500 mt-2 leading-relaxed">{office.address}</p>
                
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-xs font-semibold text-slate-700">
                  <div>📞 {office.phone}</div>
                  <div>✉ {office.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
