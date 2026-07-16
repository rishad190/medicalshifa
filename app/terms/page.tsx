"use client";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="mx-auto max-w-4xl px-6 py-20 sm:px-8 lg:px-12">
        <h1 className="text-4xl font-semibold tracking-tight text-on-surface sm:text-5xl">
          Terms & Conditions
        </h1>
        <p className="mt-6 text-sm leading-8 text-on-surface-variant">
          By using this website, you agree to interact with our services in a
          respectful and lawful manner. All consultation requests are handled as
          informational introductions to our medical support services.
        </p>
        <p className="mt-6 text-sm leading-8 text-on-surface-variant">
          Final medical decisions remain the responsibility of licensed
          healthcare providers. We do not provide medical advice beyond the
          scope of our coordination and support services.
        </p>
      </section>
    </div>
  );
}
