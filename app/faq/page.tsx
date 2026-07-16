"use client";

import { useState } from "react";
import { faqItems } from "@/lib/content";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            FAQ
          </p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-on-surface sm:text-5xl">
            Frequently asked questions about medical tourism support
          </h1>
          <p className="text-lg text-on-surface-variant">
            We help patients and families understand the steps, timelines, and
            support available throughout the journey.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-6 shadow-sm"
              >
                <button
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-lg font-semibold text-on-surface">
                    {item.question}
                  </span>
                  <span className="text-2xl text-primary">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen ? (
                  <p className="mt-4 text-sm leading-7 text-on-surface-variant">
                    {item.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
