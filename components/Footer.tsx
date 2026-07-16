import Link from "next/link";
import { company } from "@/lib/content";

export default function Footer() {
  return <footer className="bg-slate-950 text-slate-300"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
    <div><div className="flex items-center gap-3 text-white"><span className="grid size-10 place-items-center rounded-xl bg-teal-500 text-xl font-black">✚</span><strong className="font-display">Shifa Global Care</strong></div><p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">{company.tagline} We help international patients navigate treatment in India with clarity, dignity, and ongoing support.</p></div>
    <div><h2 className="text-sm font-bold text-white">Explore</h2><div className="mt-4 grid gap-3 text-sm">{["About", "Services", "Treatments", "Hospitals"].map((label) => <Link key={label} href={`/${label.toLowerCase()}`} className="hover:text-teal-300">{label}</Link>)}</div></div>
    <div><h2 className="text-sm font-bold text-white">Patient support</h2><div className="mt-4 grid gap-3 text-sm"><Link href="/medical-visa" className="hover:text-teal-300">Medical visa</Link><Link href="/faq" className="hover:text-teal-300">Frequently asked questions</Link><Link href="/contact" className="hover:text-teal-300">Contact care team</Link></div></div>
    <div><h2 className="text-sm font-bold text-white">Important note</h2><p className="mt-4 text-sm leading-6 text-slate-400">Shifa coordinates care but does not replace advice from a licensed clinician. For urgent symptoms, seek local emergency care.</p></div>
  </div><div className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-slate-500 sm:flex-row sm:justify-between lg:px-8"><span>© {new Date().getFullYear()} Shifa Global Care Solution Limited.</span><span><Link href="/privacy-policy" className="hover:text-white">Privacy</Link> · <Link href="/terms" className="hover:text-white">Terms</Link></span></div></div></footer>;
}
