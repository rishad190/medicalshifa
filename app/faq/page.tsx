"use client";

import { useState, useEffect } from "react";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState("All");
  const [dbFaqs, setDbFaqs] = useState<any[]>([]);

  const categories = ["All", "General Care", "Visa & Travel", "Medical & Safety"];

  const defaultFaqs: FaqItem[] = [
    {
      id: "hospital-selection",
      question: "How do you select partner hospitals?",
      category: "General Care",
      answer:
        "We coordinate exclusively with hospitals and specialists in India holding JCI (Joint Commission International) or NABH accreditations. We audit clinical success records, emergency support, and international relations desks to ensure safety.",
    },
    {
      id: "visa-support",
      question: "Do you help with Indian medical visas?",
      category: "Visa & Travel",
      answer:
        "Yes, we provide extensive support. We request official Medical Visa Invitation Letters from partner hospitals and review passport/referral details to ensure alignment with embassy guidelines for fast-tracked clearances.",
    },
    {
      id: "second-opinion",
      question: "Can I receive a medical second opinion before traveling?",
      category: "Medical & Safety",
      answer:
        "Absolutely. Before any travel coordinates are scheduled, we present your medical charts to senior specialists in our network to provide second opinion reviews, estimated treatment lines, and cost breakdowns.",
    },
    {
      id: "logistics-charge",
      question: "Are there any hidden coordination fees?",
      category: "General Care",
      answer:
        "No. Shifa Global Care maintains transparency. Patients pay treatment costs directly to the operating hospital in India. We outline all logistics, guest lodging, and interpreter estimates clearly prior to departure.",
    },
    {
      id: "attendants-travel",
      question: "How many companions can travel with the patient?",
      category: "Visa & Travel",
      answer:
        "Under the Indian Medical Visa guidelines, up to two family members or attendants can apply for Medical Attendant (MED-2) visas concurrently with the patient. We assist in filing all companion papers.",
    },
    {
      id: "post-discharge-followup",
      question: "What happens after I return to my home country?",
      category: "Medical & Safety",
      answer:
        "We schedule regular teleconsultation follow-ups with your operating surgeon and help forward local lab tests or recovery charts back to the hospital. Your Shifa coordinator remains available for care continuity.",
    },
  ];

  useEffect(() => {
    async function loadFaqs() {
      try {
        const res = await fetch("/api/admin/content?type=FAQ");
        if (res.ok) {
          const text = await res.text();
          const data = text ? JSON.parse(text) : [];
          if (Array.isArray(data)) {
            const publicFaqs = data.filter((f: any) => f.visibility === "Public");
            setDbFaqs(publicFaqs);
          }
        }
      } catch (e) {
        console.error("Failed to load D1 FAQs", e);
      }
    }
    loadFaqs();
  }, []);

  const formattedDbFaqs: FaqItem[] = dbFaqs.map((f: any) => ({
    id: f.id,
    question: f.question,
    answer: f.answer || "",
    category: f.category || "General Care",
  }));

  const allFaqs = [...defaultFaqs, ...formattedDbFaqs];

  // Filtering
  const filtered = selectedCat === "All" ? allFaqs : allFaqs.filter((f) => f.category === selectedCat);

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <span className="text-teal-700 font-bold text-xs uppercase tracking-widest block mb-4">
            HELP CENTER
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-500 mt-4 leading-relaxed max-w-xl mx-auto">
            Find answers to common queries about medical travel logistics, visa invitation clearances, payment methods, and treatment coordinates.
          </p>
        </header>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-6 mb-10">
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

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filtered.map((faq) => {
            const isOpen = openIndex === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : faq.id)}
                  className="w-full flex justify-between items-center text-left p-6 font-bold text-slate-800 text-sm md:text-base hover:bg-slate-50 transition cursor-pointer focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <span className="text-teal-700 text-base">{isOpen ? "▲" : "▼"}</span>
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="p-6 pt-0 text-xs md:text-sm text-slate-500 leading-relaxed border-t border-slate-50">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Support CTA */}
        <div className="mt-16 text-center border-t border-slate-200 pt-8">
          <p className="text-xs text-slate-500">
            Still have questions? Contact our dedicated 24/7 care coordination desk.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs font-bold text-teal-700">
            <div>✉ info@shifaglobal.care</div>
            <div>📞 +91 98765 43210</div>
          </div>
        </div>
      </div>
    </div>
  );
}
