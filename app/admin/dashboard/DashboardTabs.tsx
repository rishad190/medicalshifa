"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  updateConsultationStatus,
  updateUserRole,
  deleteContent,
} from "@/app/actions/admin";

type DashboardTabsProps = {
  initialRole: string;
  consultations: any[];
  users: any[];
  services: any[];
  blogPosts: any[];
  doctors: any[];
  hospitals: any[];
  testimonials: any[];
  faqs: any[];
};

export default function DashboardTabs({
  initialRole,
  consultations,
  users,
  services,
  blogPosts,
  doctors,
  hospitals,
  testimonials,
  faqs,
}: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState("Consultations");
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleStatusChange = (id: string, newStatus: "new" | "contacted" | "closed") => {
    setErrorMsg(null);
    startTransition(async () => {
      const res = await updateConsultationStatus(id, newStatus);
      if (!res.success) {
        setErrorMsg(res.error || "Failed to update status");
      }
    });
  };

  const handleRoleChange = (userId: string, newRole: "ADMIN" | "STAFF" | "PATIENT") => {
    setErrorMsg(null);
    startTransition(async () => {
      const res = await updateUserRole(userId, newRole);
      if (!res.success) {
        setErrorMsg(res.error || "Failed to update role");
      }
    });
  };

  const handleDelete = (contentType: any, id: string) => {
    if (!confirm(`Are you sure you want to delete this ${contentType}?`)) return;
    setErrorMsg(null);
    startTransition(async () => {
      const res = await deleteContent(contentType, id);
      if (!res.success) {
        setErrorMsg(res.error || "Failed to delete item");
      }
    });
  };

  const tabs = [
    "Consultations",
    ...(initialRole === "ADMIN" ? ["Users"] : []),
    "Services",
    "Doctors",
    "Hospitals",
    "Blog Posts",
    "Testimonials",
    "FAQs",
  ];

  return (
    <div className="space-y-6">
      {/* Tabs selector */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === tab
                ? "bg-teal-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl text-xs font-semibold flex items-center gap-3">
          <span>⚠️ {errorMsg}</span>
        </div>
      )}

      {isPending && (
        <div className="text-xs text-teal-700 font-bold animate-pulse">
          Updating records...
        </div>
      )}

      {/* Main panel card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs min-h-[400px]">
        {activeTab === "Consultations" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800">Inbound consultations</h2>
              <span className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600 font-bold">
                {consultations.length} total
              </span>
            </div>

            {consultations.length === 0 ? (
              <p className="text-sm text-slate-500 py-10 text-center">No consultation requests found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="p-4">Patient</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Specialty Requested</th>
                      <th className="p-4">Received At</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {consultations.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-slate-950">{c.name}</td>
                        <td className="p-4 text-xs">
                          <div>{c.email}</div>
                          <div className="text-slate-400 mt-0.5">{c.phone}</div>
                        </td>
                        <td className="p-4 text-xs font-medium text-slate-700">{c.service}</td>
                        <td className="p-4 text-xs text-slate-400">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              c.status === "new"
                                ? "bg-red-50 text-red-700 border border-red-200"
                                : c.status === "contacted"
                                ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                                : "bg-green-50 text-green-700 border border-green-200"
                            }`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => handleStatusChange(c.id, "new")}
                            disabled={c.status === "new"}
                            className="px-2.5 py-1 text-2xs font-bold bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 rounded border border-slate-200 disabled:opacity-30 cursor-pointer"
                          >
                            New
                          </button>
                          <button
                            onClick={() => handleStatusChange(c.id, "contacted")}
                            disabled={c.status === "contacted"}
                            className="px-2.5 py-1 text-2xs font-bold bg-slate-100 hover:bg-yellow-50 hover:text-yellow-700 text-slate-600 rounded border border-slate-200 disabled:opacity-30 cursor-pointer"
                          >
                            Contacted
                          </button>
                          <button
                            onClick={() => handleStatusChange(c.id, "closed")}
                            disabled={c.status === "closed"}
                            className="px-2.5 py-1 text-2xs font-bold bg-slate-100 hover:bg-green-50 hover:text-green-700 text-slate-600 rounded border border-slate-200 disabled:opacity-30 cursor-pointer"
                          >
                            Close
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "Users" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800 mb-4">User & Role Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Assigned Role</th>
                    <th className="p-4">Registered Date</th>
                    <th className="p-4 text-right">Change Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-950">{u.name}</td>
                      <td className="p-4 text-xs">{u.email}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            u.role === "ADMIN"
                              ? "bg-purple-100 text-purple-800"
                              : u.role === "STAFF"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-slate-400">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <select
                          value={u.role}
                          onChange={(e) =>
                            handleRoleChange(u.id, e.target.value as any)
                          }
                          className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs font-semibold focus:outline-none"
                        >
                          <option value="PATIENT">PATIENT</option>
                          <option value="STAFF">STAFF</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Content Tabs (Services, Doctors, Hospitals, Blog Posts, Testimonials, FAQs) */}
        {["Services", "Doctors", "Hospitals", "Blog Posts", "Testimonials", "FAQs"].includes(
          activeTab
        ) && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800">{activeTab} Entries</h2>
              <Link
                href="/admin/upload"
                className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition"
              >
                Add New {activeTab.slice(0, -1)}
              </Link>
            </div>

            {/* List entries based on tab */}
            {(() => {
              let items: any[] = [];
              let contentType: any;
              let labelField = "title";

              if (activeTab === "Services") {
                items = services;
                contentType = "Service";
              } else if (activeTab === "Doctors") {
                items = doctors;
                contentType = "Doctor";
                labelField = "name";
              } else if (activeTab === "Hospitals") {
                items = hospitals;
                contentType = "Hospital";
                labelField = "name";
              } else if (activeTab === "Blog Posts") {
                items = blogPosts;
                contentType = "Blog Post";
              } else if (activeTab === "Testimonials") {
                items = testimonials;
                contentType = "Testimonial";
                labelField = "name";
              } else if (activeTab === "FAQs") {
                items = faqs;
                contentType = "FAQ";
                labelField = "question";
              }

              if (items.length === 0) {
                return (
                  <p className="text-sm text-slate-500 py-10 text-center">
                    No {activeTab} registered in D1 yet.
                  </p>
                );
              }

              return (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="p-4">Name / Title</th>
                        <th className="p-4">Category / Specialty</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Created Date</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {items.map((item) => (
                        <tr
                          key={item.id || item.slug}
                          className="hover:bg-slate-50/50"
                        >
                          <td className="p-4 font-semibold text-slate-950">
                            {item[labelField]}
                          </td>
                          <td className="p-4 text-xs font-medium text-slate-600">
                            {item.category || item.department || item.location || "General"}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                item.visibility === "Public"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {item.visibility || "Draft"}
                            </span>
                          </td>
                          <td className="p-4 text-xs text-slate-400">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() =>
                                handleDelete(contentType, item.id || item.slug)
                              }
                              className="px-3 py-1 bg-red-50 border border-red-100 text-red-700 rounded-lg hover:bg-red-100 text-xs font-bold transition cursor-pointer"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
