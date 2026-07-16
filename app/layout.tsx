import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";

export const metadata: Metadata = { metadataBase: new URL("https://shifaglobalcare.org"), title: { default: "Shifa Global Care | Healthcare without borders", template: "%s | Shifa Global Care" }, description: "International medical tourism coordination for treatment in India.", robots: { index: true, follow: true } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><body><Header /><main className="pt-20">{children}</main><Footer /><ConsultationModal /></body></html>; }
