import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { consultationRequests } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";

export const revalidate = 0; // Fresh updates for patient timeline

export default async function PatientPortalPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login?callbackUrl=/patient/dashboard");
  }

  const userId = (session.user as any).id;
  let patientConsultations: any[] = [];
  let errorMsg: string | null = null;

  try {
    const db = getDb();
    if (db) {
      patientConsultations = await db
        .select()
        .from(consultationRequests)
        .where(eq(consultationRequests.userId, userId))
        .orderBy(desc(consultationRequests.createdAt));
    }
  } catch (error) {
    console.error("Failed to fetch patient consultations:", error);
    errorMsg = "We could not load your care coordinate records at this time.";
  }

  const journeySteps = [
    { title: "Consultation Request", description: "Reviewing details and clinical records." },
    { title: "Hospital Selection", description: "Choosing the best specialist matching your budget." },
    { title: "Visa & Logistics", description: "Assisting with medical visa invitation letters and flights." },
    { title: "Treatment", description: "Admitted at accredited partner hospital." },
    { title: "Recovery & Follow-Up", description: "Returning home with continuous follow-up care." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
              Shifa patient portal
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
              Welcome back, {session.user.name}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track your cross-border care pathways and consultations
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex rounded-full bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-teal-800 transition text-center self-start"
          >
            Go to website
          </Link>
        </header>

        {errorMsg && (
          <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-12 items-start">
          {/* Timeline and status updates */}
          <div className="md:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-800 mb-6">Your active care pathways</h2>

              {patientConsultations.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  <p className="text-sm">You haven't requested any medical consultations yet.</p>
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new Event("open-consultation"));
                      }
                    }}
                    className="mt-4 inline-flex text-xs font-bold text-teal-700 border border-teal-200 hover:bg-teal-50 px-4 py-2 rounded-xl transition"
                  >
                    Request a Consultation
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {patientConsultations.map((c) => {
                    const statusStep =
                      c.status === "new" ? 0 : c.status === "contacted" ? 1 : 2;

                    return (
                      <div key={c.id} className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm md:text-base">
                              {c.service} Care Request
                            </h3>
                            <p className="text-2xs text-slate-400">
                              Ref: {c.id.substring(0, 8)} · Received:{" "}
                              {new Date(c.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-3xs font-extrabold uppercase ${
                              c.status === "new"
                                ? "bg-red-50 text-red-700 border border-red-100"
                                : c.status === "contacted"
                                ? "bg-yellow-50 text-yellow-700 border border-yellow-100"
                                : "bg-green-50 text-green-700 border border-green-100"
                            }`}
                          >
                            {c.status === "new"
                              ? "Coordinator Reviewing"
                              : c.status === "contacted"
                              ? "Specialist Matching"
                              : "Care Set Completed"}
                          </span>
                        </div>

                        {/* Interactive Steps Visual */}
                        <div className="mt-6 grid grid-cols-5 gap-1.5 relative">
                          <div className="absolute top-3 left-6 right-6 h-0.5 bg-slate-100 -z-10" />
                          <div
                            className="absolute top-3 left-6 h-0.5 bg-teal-600 -z-10 transition-all duration-500"
                            style={{ width: `${statusStep * 25 + 12.5}%` }}
                          />

                          {journeySteps.map((step, idx) => {
                            const isCurrent = idx === statusStep;
                            const isDone = idx < statusStep;
                            const isFuture = idx > statusStep;

                            return (
                              <div key={step.title} className="flex flex-col items-center text-center">
                                <div
                                  className={`size-6 rounded-full flex items-center justify-center text-3xs font-bold transition-colors ${
                                    isDone
                                      ? "bg-teal-700 text-white"
                                      : isCurrent
                                      ? "bg-teal-600 text-white ring-4 ring-teal-100"
                                      : "bg-slate-200 text-slate-500"
                                  }`}
                                >
                                  {isDone ? "✓" : idx + 1}
                                </div>
                                <span
                                  className={`mt-2 text-4xs font-bold uppercase tracking-wider block hidden sm:block ${
                                    isCurrent ? "text-teal-800" : "text-slate-400"
                                  }`}
                                >
                                  {step.title}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-4 bg-slate-50 rounded-xl p-4 text-xs text-slate-600 border border-slate-200/50">
                          <strong className="block text-slate-900 font-semibold mb-1">
                            Current Stage: {journeySteps[statusStep].title}
                          </strong>
                          <p>{journeySteps[statusStep].description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar contacts */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-teal-800 to-cyan-950 text-white rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-teal-100 text-xs uppercase tracking-wider">
                Assigned Care Team
              </h3>
              <div className="flex items-center gap-4 mt-4">
                <div className="size-11 rounded-full bg-teal-700 text-teal-100 flex items-center justify-center font-bold">
                  SG
                </div>
                <div>
                  <h4 className="font-bold text-sm">Shifa Support Hub</h4>
                  <p className="text-2xs text-teal-200">International Coordinator</p>
                </div>
              </div>
              <p className="text-xs text-teal-100/80 leading-relaxed mt-4">
                Our team is coordinating details with hospitals in India. For document uploads
                and urgent updates, please email us directly.
              </p>
              <div className="mt-6 pt-4 border-t border-white/10 space-y-2 text-2xs font-semibold">
                <div>✉ info@shifaglobal.care</div>
                <div>📞 +91 98765 43210</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <h3 className="font-bold text-slate-800 text-sm">Security Advisory</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-2">
                Shifa Global Care enforces strict HIPAA and data integrity standards. Never share
                medical records in insecure chats or public emails. Your patient dashboard lists only
                operational statuses for safety.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
