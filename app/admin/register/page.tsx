"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/app/actions/register";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [callbackUrl, setCallbackUrl] = useState("/admin/dashboard");
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cb = params.get("callbackUrl");
    if (cb) {
      setCallbackUrl(cb);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    startTransition(async () => {
      const res = await registerUser(null, formData);
      if (!res.success) {
        setError(res.error || "Failed to register.");
      } else {
        setSuccess(res.message || "Registration successful!");
        setTimeout(() => {
          router.push(`/admin/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        }, 1500);
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 -mt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(20,184,166,0.05),transparent_25%),radial-gradient(circle_at_20%_85%,rgba(59,130,246,0.05),transparent_25%)] pointer-events-none" />

      <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl relative z-10 sm:p-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="grid size-9 place-items-center rounded-xl bg-teal-700 text-sm font-black text-white shadow-md">
              ✚
            </span>
            <span className="text-left leading-tight">
              <strong className="block text-sm font-bold text-slate-950">
                Shifa Global Care
              </strong>
            </span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Create Account
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Register as a patient to track your consultation requests and treatment timeline
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl text-xs font-semibold mb-6 flex items-center gap-3">
            <span className="text-base">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-teal-50 border border-teal-100 text-teal-800 p-4 rounded-xl text-xs font-semibold mb-6 flex items-center gap-3">
            <span className="text-base">✓</span>
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full bg-slate-50 border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 rounded-xl py-2.5 px-4 text-sm focus:outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. john@example.com"
              className="w-full bg-slate-50 border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 rounded-xl py-2.5 px-4 text-sm focus:outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 rounded-xl py-2.5 px-4 text-sm focus:outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 rounded-xl py-2.5 px-4 text-sm focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-teal-900/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-6"
          >
            {isPending ? "Registering..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
          <p>
            Already have an account?{" "}
            <Link
              href={`/admin/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="text-teal-700 font-bold hover:underline"
            >
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
