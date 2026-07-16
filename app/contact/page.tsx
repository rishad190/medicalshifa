"use client";

import Link from "next/link";
import { company } from "@/lib/content";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Contact
          </p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-on-surface sm:text-5xl">
            Reach our team for a confidential consultation
          </h1>
          <p className="text-lg text-on-surface-variant">
            We are available to discuss your healthcare goals, treatment needs,
            and travel requirements with empathy and clarity.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-on-surface">
              Get in touch
            </h2>
            <div className="mt-6 space-y-4 text-sm text-on-surface-variant">
              <p>
                <span className="font-semibold text-on-surface">Email:</span>{" "}
                {company.email}
              </p>
              <p>
                <span className="font-semibold text-on-surface">Phone:</span>{" "}
                {company.phone}
              </p>
              <p>
                <span className="font-semibold text-on-surface">Location:</span>{" "}
                {company.address}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-on-surface">
              Start your journey
            </h2>
            <p className="mt-4 text-sm leading-7 text-on-surface-variant">
              Share your medical concern and preferred treatment area so we can
              connect you with the right specialists.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary"
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
