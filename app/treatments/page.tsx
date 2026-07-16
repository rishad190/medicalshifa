"use client";

import Link from "next/link";
import { treatments } from "@/lib/content";

export default function TreatmentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Treatments
          </p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-on-surface sm:text-5xl">
            Specialized treatment pathways for complex and routine care
          </h1>
          <p className="text-lg text-on-surface-variant">
            We coordinate access to leading specialists, modern facilities, and
            tailored treatment plans for a broad range of conditions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {treatments.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-on-surface">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                {item.summary}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-primary px-8 py-10 text-on-primary">
          <h2 className="text-2xl font-semibold">
            Need a personalized treatment plan?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-on-primary/80">
            Speak with our coordinators to review your medical history, expected
            treatment timeline, and budget before you travel.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-on-primary px-5 py-3 text-sm font-semibold text-primary"
          >
            Request a consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
