"use client";

export default function MedicalVisaPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Medical visa
          </p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-on-surface sm:text-5xl">
            Guided medical travel support for patients and companions
          </h1>
          <p className="text-lg text-on-surface-variant">
            We provide practical support for international treatment travel,
            including documentation guidance and travel coordination.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-on-surface">
            What we help with
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-on-surface-variant">
            <li>
              • Medical appointment scheduling and documentation preparation
            </li>
            <li>
              • Travel planning and stay coordination for patients and
              attendants
            </li>
            <li>• Airport pickup and local transport arrangements</li>
            <li>
              • Coordination with hospitals and case managers for a smooth
              arrival
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
