"use client";

import { doctors } from "@/lib/content";

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Doctors
          </p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-on-surface sm:text-5xl">
            Trusted specialists supporting multidisciplinary care
          </h1>
          <p className="text-lg text-on-surface-variant">
            We help patient families connect with experienced physicians who
            understand both clinical excellence and international care pathways.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {doctors.map((doctor) => (
            <article
              key={doctor.name}
              className="rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-on-surface">
                {doctor.name}
              </h2>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                {doctor.title}
              </p>
              <p className="mt-4 text-sm leading-7 text-on-surface-variant">
                Experience: {doctor.experience}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
