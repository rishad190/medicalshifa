"use client";

import { hospitals } from "@/lib/content";

export default function HospitalsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Hospitals
          </p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-on-surface sm:text-5xl">
            Partner hospitals chosen for quality, trust, and clinical excellence
          </h1>
          <p className="text-lg text-on-surface-variant">
            We collaborate with internationally recognized institutions across
            India and other leading destinations to support patient care.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {hospitals.map((hospital) => (
            <article
              key={hospital.name}
              className="rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-on-surface">
                {hospital.name}
              </h2>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                {hospital.location}
              </p>
              <p className="mt-4 text-sm leading-7 text-on-surface-variant">
                {hospital.focus}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
