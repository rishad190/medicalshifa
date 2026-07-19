"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut } from "next-auth/react";
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
  teamMembers?: any[];
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
  teamMembers = [],
}: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState("Consultations");
  const [isAdding, setIsAdding] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  // UPLOAD / EDIT FORM STATES
  const [formContentType, setFormContentType] = useState<
    "Service" | "Doctor" | "Hospital" | "Blog Post" | "Testimonial" | "FAQ" | "Partner" | "Team Member"
  >("Service");
  const [formEditId, setFormEditId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Clinical Care");
  const [formDuration, setFormDuration] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formVisibility, setFormVisibility] = useState<"Draft" | "Public">("Draft");
  const [formTags, setFormTags] = useState<string[]>(["Cardiology", "Wellness"]);
  const [formTagInput, setFormTagInput] = useState("");
  const [formImagePreview, setFormImagePreview] = useState<string | null>(null);
  const [formExtra, setFormExtra] = useState<Record<string, any>>({});
  const [publishStatus, setPublishStatus] = useState<"idle" | "publishing" | "published">("idle");
  const [publishError, setPublishError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // CROP MODAL STATES
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [cropZoom, setCropZoom] = useState(1);
  const [cropOffset, setCropOffset] = useState({ x: 0, y: 0 });
  const [isDraggingCrop, setIsDraggingCrop] = useState(false);
  const [cropDragStart, setCropDragStart] = useState({ x: 0, y: 0 });
  const [cropImageDimensions, setCropImageDimensions] = useState({ width: 200, height: 200 });

  // File change handler (opens interactive crop modal)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCropImageSrc(event.target?.result as string);
        setCropZoom(1);
        setCropOffset({ x: 0, y: 0 });
        setCropImageDimensions({ width: 200, height: 200 });
      };
      reader.readAsDataURL(file);
    }
  };

  // Tag list handlers
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && formTagInput.trim()) {
      e.preventDefault();
      if (!formTags.includes(formTagInput.trim())) {
        setFormTags([...formTags, formTagInput.trim()]);
      }
      setFormTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormTags(formTags.filter((t) => t !== tagToRemove));
  };

  // Switch to Edit Mode
  const handleStartEdit = (type: typeof formContentType, item: any) => {
    setFormContentType(type);
    setFormEditId(item.id || item.slug || null);
    setFormTitle(item.title || item.name || item.question || "");
    setFormDescription(item.description || item.content || item.bio || item.quote || item.answer || "");
    setFormVisibility(item.visibility || "Draft");
    setFormImagePreview(item.image || null);

    if (type === "Service") {
      setFormCategory(item.category || "Clinical Care");
      setFormDuration(item.duration || "");
      setFormTags(item.tags ? item.tags.split(",") : []);
      setFormExtra({});
    } else if (type === "Doctor") {
      setFormCategory(item.department || "Cardiology");
      setFormExtra({
        designation: item.title || "", // Designation is saved as title in doctor table
        experience: item.experience || "",
        hospitalId: item.hospitalId || "",
      });
    } else if (type === "Hospital") {
      setFormCategory("");
      setFormExtra({
        location: item.location || "Delhi, India",
        focus: item.focus || "",
      });
    } else if (type === "Testimonial") {
      setFormCategory("");
      setFormExtra({
        designation: item.role || "",
        rating: item.rating || 5,
      });
    } else if (type === "FAQ") {
      setFormCategory(item.category || "General Care");
      setFormExtra({});
    } else if (type === "Blog Post") {
      setFormCategory(item.category || "Care Insights");
      setFormExtra({
        excerpt: item.excerpt || "",
        author: item.author || "Dr. Sarah Khalil",
        authorImage: item.authorImage || "",
      });
      setFormTags(item.tags ? item.tags.split(",") : []);
    } else if (type === "Team Member") {
      setFormCategory(item.role || "Staff");
      setFormExtra({});
    }

    setIsAdding(true);
  };

  // Submit content publish handler
  const handlePublish = async () => {
    setPublishStatus("publishing");
    setPublishError(null);

    try {
      // Build body based on content type
      const payload: Record<string, any> = {
        contentType: formContentType,
        visibility: formVisibility,
        image: formImagePreview,
      };

      // Pass ID/Slug if editing
      if (formEditId) {
        if (formContentType === "Blog Post") {
          payload.slug = formEditId;
        } else {
          payload.id = formEditId;
        }
      }

      if (formContentType === "Service") {
        payload.title = formTitle;
        payload.category = formCategory;
        payload.duration = formDuration;
        payload.description = formDescription;
        payload.tags = formTags;
      } else if (formContentType === "Blog Post") {
        payload.title = formTitle;
        payload.category = formCategory;
        payload.content = formDescription;
        payload.excerpt = formExtra.excerpt || "";
        payload.tags = formTags;
        payload.author = formExtra.author || "Dr. Sarah Khalil";
        payload.authorImage = formExtra.authorImage || "";
      } else if (formContentType === "Partner") {
        payload.name = formTitle;
      } else if (formContentType === "Doctor") {
        payload.title = formTitle; // Doctor Name
        payload.jobTitle = formExtra.designation || ""; // Designation
        payload.category = formCategory; // Department
        payload.duration = formExtra.experience || ""; // Experience
        payload.description = formDescription; // Bio
        payload.hospitalId = formExtra.hospitalId || "";
      } else if (formContentType === "Hospital") {
        payload.title = formTitle; // Hospital Name
        payload.category = formExtra.location || ""; // Location
        payload.duration = formExtra.focus || ""; // Focus Specialties
        payload.description = formDescription;
      } else if (formContentType === "Testimonial") {
        payload.title = formTitle; // Patient Name
        payload.category = formExtra.designation || ""; // Role/Location
        payload.description = formDescription; // Quote
        payload.duration = String(formExtra.rating || 5); // Rating
      } else if (formContentType === "FAQ") {
        payload.question = formTitle;
        payload.answer = formDescription;
        payload.category = formCategory;
      } else if (formContentType === "Team Member") {
        payload.title = formTitle;
        payload.category = formCategory;
        payload.description = formDescription;
      }

      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json()) as any;
        throw new Error(data.error || "Failed to publish content");
      }

      setPublishStatus("published");
      setTimeout(() => {
        setPublishStatus("idle");
        // Clear form
        setFormTitle("");
        setFormDuration("");
        setFormDescription("");
        setFormImagePreview(null);
        setFormTags(["Cardiology", "Wellness"]);
        setFormExtra({});
        setFormEditId(null);
        
        // Refresh server components data
        router.refresh();
        // Go back to the list view
        setIsAdding(false);
      }, 1500);
    } catch (err: any) {
      setPublishStatus("idle");
      setPublishError(err.message || "An error occurred while publishing.");
    }
  };

  const handleStatusChange = (id: string, newStatus: "new" | "contacted" | "closed") => {
    setErrorMsg(null);
    startTransition(async () => {
      const res = await updateConsultationStatus(id, newStatus);
      if (!res.success) {
        setErrorMsg(res.error || "Failed to update status");
      } else {
        router.refresh();
      }
    });
  };

  const handleRoleChange = (userId: string, newRole: "ADMIN" | "STAFF" | "PATIENT") => {
    setErrorMsg(null);
    startTransition(async () => {
      const res = await updateUserRole(userId, newRole);
      if (!res.success) {
        setErrorMsg(res.error || "Failed to update role");
      } else {
        router.refresh();
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
      } else {
        router.refresh();
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
    "Team"
  ];

  return (
    <div className="space-y-6">
      {/* Tabs selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setIsAdding(false);
              }}
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
        <button
          onClick={() => {
            if (confirm("Are you sure you want to sign out?")) {
              signOut({ callbackUrl: "/admin/login" });
            }
          }}
          className="px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
        >
          Sign Out
        </button>
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
        {isAdding ? (
          /* Dynamic Inline Upload Form */
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {formEditId ? "Edit" : "Add New"} {formContentType} Entry
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Compile and register updates directly into the production Cloudflare D1 index.
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setFormTitle("");
                    setFormDescription("");
                    setFormImagePreview(null);
                    setFormEditId(null);
                    setIsAdding(false);
                  }}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublish}
                  disabled={publishStatus === "publishing"}
                  className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {publishStatus === "publishing" ? "Saving..." : formEditId ? "Save Changes" : "Publish Content"}
                </button>
              </div>
            </div>

            {publishStatus === "published" && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-xs font-bold flex items-center gap-3 animate-pulse">
                <span>✓ Successfully saved and registered item in database!</span>
              </div>
            )}

            {publishError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs font-bold flex items-center gap-3">
                <span>⚠️ {publishError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form entries */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title or Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {formContentType === "FAQ"
                      ? "Question"
                      : ["Doctor", "Hospital", "Testimonial", "Partner", "Team Member"].includes(formContentType)
                      ? "Name"
                      : "Title"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder={`Enter ${formContentType.toLowerCase()} header/title...`}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 rounded-xl py-3 px-4 text-sm focus:outline-none transition-all"
                  />
                </div>

                {/* Conditional Fields based on type */}
                {formContentType === "Service" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Category</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-teal-600"
                      >
                        <option value="Clinical Care">Clinical Care</option>
                        <option value="Logistics & Visas">Logistics & Visas</option>
                        <option value="Support Services">Support Services</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Est. Duration</label>
                      <input
                        type="text"
                        value={formDuration}
                        onChange={(e) => setFormDuration(e.target.value)}
                        placeholder="e.g. 45 - 60 mins"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-teal-600"
                      />
                    </div>
                  </div>
                )}

                {formContentType === "Doctor" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Department</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-teal-600"
                      >
                        <option value="Cardiology">Cardiology</option>
                        <option value="Oncology">Oncology</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Neurosurgery">Neurosurgery</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Designation</label>
                      <input
                        type="text"
                        placeholder="e.g. Senior Cardiologist"
                        value={formExtra.designation || ""}
                        onChange={(e) => setFormExtra({ ...formExtra, designation: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-teal-600"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Experience</label>
                      <input
                        type="text"
                        placeholder="e.g. 15 years"
                        value={formExtra.experience || ""}
                        onChange={(e) => setFormExtra({ ...formExtra, experience: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-teal-600"
                      />
                    </div>
                  </div>
                )}

                {formContentType === "Hospital" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Location</label>
                      <select
                        value={formExtra.location || "Delhi, India"}
                        onChange={(e) => setFormExtra({ ...formExtra, location: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-teal-600"
                      >
                        <option value="Delhi, India">Delhi, India</option>
                        <option value="Chennai, India">Chennai, India</option>
                        <option value="Gurugram, India">Gurugram, India</option>
                        <option value="Bangalore, India">Bangalore, India</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Focus Specialties</label>
                      <input
                        type="text"
                        placeholder="e.g. Oncology, cardiology"
                        value={formExtra.focus || ""}
                        onChange={(e) => setFormExtra({ ...formExtra, focus: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-teal-600"
                      />
                    </div>
                  </div>
                )}

                {formContentType === "Testimonial" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Role / Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Oncology patient, Bangladesh"
                        value={formExtra.designation || ""}
                        onChange={(e) => setFormExtra({ ...formExtra, designation: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-teal-600"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Rating (1-5)</label>
                      <select
                        value={formExtra.rating || 5}
                        onChange={(e) => setFormExtra({ ...formExtra, rating: Number(e.target.value) })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-teal-600"
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                      </select>
                    </div>
                  </div>
                )}

                {formContentType === "FAQ" && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">FAQ Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-teal-600"
                    >
                      <option value="General Care">General Care</option>
                      <option value="Visa & Travel">Visa & Travel</option>
                      <option value="Medical & Safety">Medical & Safety</option>
                    </select>
                  </div>
                )}

                {formContentType === "Team Member" && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Role / Designation</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CEO & Founder, Executive..."
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>
                )}

                {formContentType === "Blog Post" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Blog Category</label>
                        <input
                          type="text"
                          placeholder="e.g. Care Insights"
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-teal-600"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Author Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Dr. Sarah Khalil"
                          value={formExtra.author || ""}
                          onChange={(e) => setFormExtra({ ...formExtra, author: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-teal-600"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Brief Excerpt</label>
                      <input
                        type="text"
                        placeholder="A short summary of the blog post to display in grids..."
                        value={formExtra.excerpt || ""}
                        onChange={(e) => setFormExtra({ ...formExtra, excerpt: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-teal-600"
                      />
                    </div>
                  </div>
                )}

                {/* Description / Content Body */}
                {formContentType !== "Partner" && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      {formContentType === "FAQ"
                        ? "Answer"
                        : formContentType === "Testimonial"
                        ? "Quote"
                        : "Description / Content"}
                    </label>
                    <textarea
                      required
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Start typing details..."
                      rows={6}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 rounded-xl py-3 px-4 text-sm focus:outline-none transition-all resize-none"
                    />
                  </div>
                )}
              </div>

              {/* Sidebar Upload Settings */}
              <div className="space-y-6">
                {/* Visibility and image */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Visibility</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setFormVisibility("Draft")}
                        className={`flex-1 py-2 px-3 border rounded-xl text-xs font-semibold transition cursor-pointer ${
                          formVisibility === "Draft"
                            ? "bg-teal-50 border-teal-600 text-teal-700 font-bold"
                            : "bg-white border-slate-200 text-slate-600"
                        }`}
                      >
                        Draft
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormVisibility("Public")}
                        className={`flex-1 py-2 px-3 border rounded-xl text-xs font-semibold transition cursor-pointer ${
                          formVisibility === "Public"
                            ? "bg-teal-50 border-teal-600 text-teal-700 font-bold"
                            : "bg-white border-slate-200 text-slate-600"
                        }`}
                      >
                        Public
                      </button>
                    </div>
                  </div>

                  {/* Image picker */}
                  {formContentType !== "FAQ" && (
                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Featured Image</label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                      
                      {formImagePreview ? (
                        <div className="relative w-full h-32 rounded-xl overflow-hidden shadow-inner bg-slate-100">
                          <img
                            src={formImagePreview}
                            alt="Upload preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setFormImagePreview(null)}
                            className="absolute right-2 top-2 bg-black/60 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-black transition"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full h-24 border border-dashed border-slate-300 rounded-xl hover:border-teal-700 text-center flex flex-col items-center justify-center gap-1 bg-white transition cursor-pointer"
                        >
                          <span className="text-lg">📁</span>
                          <span className="text-2xs font-semibold text-slate-600">Select Image File</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Tags input */}
                  {["Service", "Blog Post"].includes(formContentType) && (
                    <div className="space-y-2 pt-2 border-t border-slate-200">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Tags</label>
                      <input
                        type="text"
                        value={formTagInput}
                        onChange={(e) => setFormTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="Add tag and press enter..."
                        className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs focus:outline-none"
                      />
                      <div className="flex flex-wrap gap-1 pt-1">
                        {formTags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-teal-50 border border-teal-100 text-teal-700 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="text-teal-900 font-bold hover:text-red-500"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Normal Tab List Panes */
          <>
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

            {/* Content Tabs (Services, Doctors, Hospitals, Blog Posts, Testimonials, FAQs, Team) */}
            {["Services", "Doctors", "Hospitals", "Blog Posts", "Testimonials", "FAQs", "Team"].includes(
              activeTab
            ) && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-slate-800">{activeTab} Entries</h2>
                  <button
                    onClick={() => {
                      const typeMap: Record<string, typeof formContentType> = {
                        "Services": "Service",
                        "Doctors": "Doctor",
                        "Hospitals": "Hospital",
                        "Blog Posts": "Blog Post",
                        "Testimonials": "Testimonial",
                        "FAQs": "FAQ",
                        "Team": "Team Member"
                      };
                      const type = typeMap[activeTab] || "Service";
                      setFormContentType(type);
                      setFormTitle("");
                      setFormDescription("");
                      setFormImagePreview(null);
                      setFormEditId(null);
                      
                      // Initialize correct category/extra defaults
                      if (type === "Service") {
                        setFormCategory("Clinical Care");
                        setFormExtra({});
                      } else if (type === "Doctor") {
                        setFormCategory("Cardiology");
                        setFormExtra({ designation: "", experience: "", hospitalId: "" });
                      } else if (type === "Hospital") {
                        setFormCategory("");
                        setFormExtra({ location: "Delhi, India", focus: "" });
                      } else if (type === "FAQ") {
                        setFormCategory("General Care");
                        setFormExtra({});
                      } else if (type === "Team Member") {
                        setFormCategory("Staff");
                        setFormExtra({});
                      } else {
                        setFormCategory("");
                        setFormExtra({});
                      }
                      setIsAdding(true);
                    }}
                    className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition cursor-pointer"
                  >
                    Add New {activeTab === "Team" ? "Team Member" : activeTab.slice(0, -1)}
                  </button>
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
                  } else if (activeTab === "Team") {
                    items = teamMembers || [];
                    contentType = "Team Member";
                    labelField = "name";
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
                                {item.category || item.department || item.location || item.role || "General"}
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
                              <td className="p-4 text-right whitespace-nowrap">
                                <button
                                  onClick={() => handleStartEdit(contentType, item)}
                                  className="px-3 py-1 bg-teal-50 border border-teal-100 text-teal-700 rounded-lg hover:bg-teal-100 text-xs font-bold transition cursor-pointer mr-2"
                                >
                                  Edit
                                </button>
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
          </>
        )}
      </div>

      {cropImageSrc && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Adjust Photo Position</h3>
              <p className="text-xs text-slate-400 mt-1">Drag to position, and slide to zoom your crop area.</p>
            </div>

            {/* Interactive Crop Container */}
            <div
              className="relative w-[320px] h-[320px] mx-auto bg-slate-900 rounded-2xl overflow-hidden cursor-move select-none"
              onMouseDown={(e) => {
                setIsDraggingCrop(true);
                setCropDragStart({ x: e.clientX - cropOffset.x, y: e.clientY - cropOffset.y });
              }}
              onMouseMove={(e) => {
                if (isDraggingCrop) {
                  setCropOffset({
                    x: e.clientX - cropDragStart.x,
                    y: e.clientY - cropDragStart.y,
                  });
                }
              }}
              onMouseUp={() => setIsDraggingCrop(false)}
              onMouseLeave={() => setIsDraggingCrop(false)}
              onTouchStart={(e) => {
                setIsDraggingCrop(true);
                const touch = e.touches[0];
                setCropDragStart({ x: touch.clientX - cropOffset.x, y: touch.clientY - cropOffset.y });
              }}
              onTouchMove={(e) => {
                if (isDraggingCrop) {
                  const touch = e.touches[0];
                  setCropOffset({
                    x: touch.clientX - cropDragStart.x,
                    y: touch.clientY - cropDragStart.y,
                  });
                }
              }}
              onTouchEnd={() => setIsDraggingCrop(false)}
            >
              {/* Image underneath */}
              <img
                id="cropping-image"
                src={cropImageSrc}
                alt="Original upload"
                className="absolute origin-center"
                onLoad={(e) => {
                  const img = e.currentTarget;
                  const naturalWidth = img.naturalWidth;
                  const naturalHeight = img.naturalHeight;
                  
                  let w = 200;
                  let h = 200;
                  if (naturalWidth > naturalHeight) {
                    w = 200 * (naturalWidth / naturalHeight);
                  } else {
                    h = 200 * (naturalHeight / naturalWidth);
                  }
                  setCropImageDimensions({ width: w, height: h });
                }}
                style={{
                  transform: `translate(${cropOffset.x}px, ${cropOffset.y}px) scale(${cropZoom})`,
                  top: "50%",
                  left: "50%",
                  marginTop: `-${cropImageDimensions.height / 2}px`,
                  marginLeft: `-${cropImageDimensions.width / 2}px`,
                  width: `${cropImageDimensions.width}px`,
                  height: `${cropImageDimensions.height}px`,
                  maxWidth: "none",
                }}
              />

              {/* Viewport Mask Ring */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-[200px] h-[200px] border border-teal-500 rounded-xl shadow-[0_0_0_9999px_rgba(15,23,42,0.65)]" />
              </div>
            </div>

            {/* Zoom Slider Controls */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Zoom Scale</span>
                <span>{Math.round(cropZoom * 100)}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                step="0.01"
                value={cropZoom}
                onChange={(e) => setCropZoom(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
            </div>

            {/* Modal actions */}
            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => setCropImageSrc(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  const img = document.getElementById("cropping-image") as HTMLImageElement;
                  if (img) {
                    const canvas = document.createElement("canvas");
                    const size = 400;
                    canvas.width = size;
                    canvas.height = size;
                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                      const naturalWidth = img.naturalWidth;
                      const naturalHeight = img.naturalHeight;

                      const dispWidth = cropImageDimensions.width * cropZoom;
                      const dispHeight = cropImageDimensions.height * cropZoom;

                      // Image top-left offset inside the 320x320 container
                      const imgLeft = 160 - dispWidth / 2 + cropOffset.x;
                      const imgTop = 160 - dispHeight / 2 + cropOffset.y;

                      // Crop viewport top-left is at (60, 60) relative to the 320x320 container
                      const cropLeft = 60;
                      const cropTop = 60;

                      // Top-left of the viewport relative to the image
                      const relX = cropLeft - imgLeft;
                      const relY = cropTop - imgTop;

                      // Convert back to original image scale
                      const srcX = relX * (naturalWidth / dispWidth);
                      const srcY = relY * (naturalHeight / dispHeight);
                      const srcWidth = 200 * (naturalWidth / dispWidth);
                      const srcHeight = 200 * (naturalHeight / dispHeight);

                      ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, 0, 0, size, size);

                      const finalBase64 = canvas.toDataURL("image/jpeg", 0.85);
                      setFormImagePreview(finalBase64);
                      setCropImageSrc(null);
                    }
                  }
                }}
                className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
