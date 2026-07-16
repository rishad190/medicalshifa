import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Admin dashboard
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-on-surface">
          Welcome, {session.user.name ?? "Administrator"}
        </h1>
        <p className="mt-4 text-sm leading-7 text-on-surface-variant">
          This dashboard is ready to host patient records, consultation
          requests, blog management, doctors, hospitals, and content moderation
          workflows.
        </p>
      </div>
    </div>
  );
}
