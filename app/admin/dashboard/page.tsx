import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import {
  consultationRequests,
  users,
  services,
  blogPosts,
  doctors,
  hospitals,
  testimonials,
  faqs,
  teamMembers,
  galleryImages,
} from "@/db/schema";
import { desc } from "drizzle-orm";
import DashboardTabs from "./DashboardTabs";

export const runtime = "edge";
export const revalidate = 0; // Disable static caching for dashboard

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const role = (session.user as any).role;
  if (role !== "ADMIN" && role !== "STAFF") {
    redirect("/");
  }

  let consultationsData: any[] = [];
  let usersData: any[] = [];
  let servicesData: any[] = [];
  let blogPostsData: any[] = [];
  let doctorsData: any[] = [];
  let hospitalsData: any[] = [];
  let testimonialsData: any[] = [];
  let faqsData: any[] = [];
  let teamMembersData: any[] = [];
  let galleryImagesData: any[] = [];

  try {
    const db = getDb();

    consultationsData = await db
      .select()
      .from(consultationRequests)
      .orderBy(desc(consultationRequests.createdAt));

    // Only administrators can view users list
    if (role === "ADMIN") {
      usersData = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
          createdAt: users.createdAt,
        })
        .from(users)
        .orderBy(desc(users.createdAt));
    }

    servicesData = await db.select().from(services).orderBy(desc(services.createdAt));
    blogPostsData = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    doctorsData = await db.select().from(doctors).orderBy(desc(doctors.createdAt));
    hospitalsData = await db.select().from(hospitals).orderBy(desc(hospitals.createdAt));
    testimonialsData = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
    faqsData = await db.select().from(faqs).orderBy(desc(faqs.createdAt));
    teamMembersData = await db.select().from(teamMembers).orderBy(desc(teamMembers.createdAt));
    galleryImagesData = await db.select().from(galleryImages).orderBy(desc(galleryImages.createdAt));
  } catch (error) {
    console.error("Dashboard database fetch error:", error);
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
              Shifa global portal
            </p>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
              Management Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-teal-100 text-teal-800 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {role} Account
            </span>
            <span className="text-sm font-semibold text-slate-600">
              {session.user.name}
            </span>
          </div>
        </header>

        <DashboardTabs
          initialRole={role}
          consultations={consultationsData}
          users={usersData}
          services={servicesData}
          blogPosts={blogPostsData}
          doctors={doctorsData}
          hospitals={hospitalsData}
          testimonials={testimonialsData}
          faqs={faqsData}
          teamMembers={teamMembersData}
          galleryImages={galleryImagesData}
        />
      </div>
    </div>
  );
}
