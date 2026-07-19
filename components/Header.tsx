"use client";

import Link from "next/link";
import { useState } from "react";
import { navItems } from "@/lib/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const openConsultation = () => window.dispatchEvent(new Event("open-consultation"));

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/logoshifa.png"
            alt="Shifa Global Care Logo"
            style={{ height: "40px", width: "auto" }}
            className="object-contain flex-shrink-0"
          />
          <span className="leading-tight"><strong className="block font-display text-base text-slate-950">Shifa Global Care</strong><span className="text-[10px] font-bold uppercase tracking-[.18em] text-teal-700">Solution Limited</span></span>
        </Link>
        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
          {navItems.slice(1, 8).map((item) => <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-teal-700">{item.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <Link href="/contact" className="text-sm font-semibold text-slate-700">Contact us</Link>
          <button onClick={openConsultation} className="rounded-full bg-teal-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-900/20 transition hover:bg-teal-800">Book consultation</button>
        </div>
        <button className="grid size-11 place-items-center rounded-xl border border-slate-200 text-xl md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? "×" : "☰"}</button>
      </div>
      {open && <div className="border-t border-slate-100 bg-white px-5 py-5 md:hidden"><nav className="grid gap-1" aria-label="Mobile navigation">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-teal-50">{item.label}</Link>)}<button onClick={() => { setOpen(false); openConsultation(); }} className="mt-2 rounded-lg bg-teal-700 px-3 py-3 text-left text-sm font-bold text-white">Book consultation</button></nav></div>}
    </header>
  );
}
