"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type DoctorItem = {
  id: string;
  name: string;
  title: string;
  department: string;
  experience: string;
  bio?: string;
  image?: string;
};

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [dbDoctors, setDbDoctors] = useState<any[]>([]);

  const departments = ["All", "Cardiology", "Oncology", "Orthopedics", "Neurosurgery"];

  const defaultDoctors: DoctorItem[] = [
    {
      id: "dr-amina-rahman",
      name: "Dr. Amina Rahman",
      title: "Senior Cardiologist",
      department: "Cardiology",
      experience: "18 years",
      bio: "Specializes in interventional adult cardiology, transcatheter aortic valve replacements (TAVR), and diagnostic cardiac imaging protocols.",
      image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "dr-sandeep-verma",
      name: "Dr. Sandeep Verma",
      title: "Oncology Specialist",
      department: "Oncology",
      experience: "22 years",
      bio: "Renowned surgical oncologist targeting solid tumor resection, robotic-assisted oncology procedures, and targeted chemotherapy programs.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "dr-priya-nair",
      name: "Dr. Priya Nair",
      title: "Orthopedic Surgeon",
      department: "Orthopedics",
      experience: "15 years",
      bio: "Expert in computer-assisted knee and hip arthroplasties, spinal decompression surgeries, and regenerative joint treatment coordinates.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: "dr-farhan-malik",
      name: "Dr. Farhan Malik",
      title: "Senior Neurosurgeon",
      department: "Neurosurgery",
      experience: "20 years",
      bio: "Pioneering micro-neurosurgery specialist focusing on brain tumor resections, deep brain stimulation (DBS), and complex spine trauma recovery.",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
    },
  ];

  useEffect(() => {
    async function loadDoctors() {
      try {
        const res = await fetch("/api/admin/content?type=Doctor");
        if (res.ok) {
          const data = (await res.json()) as any[];
          const publicDoctors = data.filter((d: any) => d.visibility === "Public");
          setDbDoctors(publicDoctors);
        }
      } catch (e) {
        console.error("Failed to load D1 doctors", e);
      }
    }
    loadDoctors();
  }, []);

  const formattedDbDoctors: DoctorItem[] = dbDoctors.map((d: any) => ({
    id: d.id,
    name: d.name,
    title: d.title || "Specialist",
    department: d.department || "General Medicine",
    experience: d.experience || "5 years",
    bio: d.bio || "",
    image: d.image || "",
  }));

  const allDoctors = [...defaultDoctors, ...formattedDbDoctors];

  // Filtering
  const filtered = allDoctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept =
      selectedDept === "All" || doctor.department.toLowerCase() === selectedDept.toLowerCase();
    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="max-w-3xl mb-12">
          <span className="text-teal-700 font-bold text-xs uppercase tracking-widest block mb-4">
            RENOWNED MEDICAL SPECIALISTS
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            Partner Specialists & Surgeons
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            We connect you with highly experienced surgeons and clinical experts in India. All specialists in our network hold advanced qualifications, maintain high procedural success rates, and coordinate pre-travel digital case discussions.
          </p>
        </header>

        {/* Search & Department Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 mb-10">
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition cursor-pointer ${
                  selectedDept === dept
                    ? "bg-teal-700 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <input
              type="text"
              placeholder="Search specialists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-4 pr-10 text-xs focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-50 transition"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🔍
            </span>
          </div>
        </div>

        {/* Doctor Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-500 bg-white border border-slate-200 rounded-3xl">
            <p className="text-sm">No specialists found matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {filtered.map((doctor) => (
              <article
                key={doctor.id}
                className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-4 items-center mb-6">
                    <div className="relative size-16 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex-shrink-0">
                      {doctor.image ? (
                        <Image
                          src={doctor.image}
                          alt={doctor.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold bg-teal-50 text-teal-800">
                          🩺
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
                      <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mt-1">
                        {doctor.title}
                      </p>
                    </div>
                  </div>

                  <span className="inline-block text-3xs font-extrabold uppercase bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-1 rounded-full mb-4">
                    {doctor.experience} Experience
                  </span>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {doctor.bio}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5 mt-6 flex justify-between items-center">
                  <span className="text-4xs text-slate-400 font-bold uppercase tracking-wider">
                    {doctor.department} Department
                  </span>
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new Event("open-consultation"));
                      }
                    }}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 hover:underline"
                  >
                    Request Board Opinion →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
