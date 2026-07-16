"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="mx-auto max-w-4xl px-6 py-20 sm:px-8 lg:px-12">
        <h1 className="text-4xl font-semibold tracking-tight text-on-surface sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-sm leading-8 text-on-surface-variant">
          We respect patient privacy and handle information responsibly. This
          policy outlines how personal information is collected, used, stored,
          and protected within our website and service workflow.
        </p>
        <p className="mt-6 text-sm leading-8 text-on-surface-variant">
          We only collect the data necessary to coordinate medical
          consultations, support travel arrangements, and provide patient care
          services. Access is restricted to authorized team members and secured
          using industry-standard controls.
        </p>
      </section>
    </div>
  );
}
