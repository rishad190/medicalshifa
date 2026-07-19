"use server";

import { getDb } from "@/lib/db";
import {
  consultationRequests,
  users,
  services,
  blogPosts,
  partners,
  doctors,
  hospitals,
  testimonials,
  faqs,
  teamMembers,
  galleryImages,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { ADMIN_ROLE, STAFF_ROLE } from "@/auth";
import { revalidatePath } from "next/cache";

async function verifyAdminOrStaff() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const role = (session.user as any).role;
  if (role !== ADMIN_ROLE && role !== STAFF_ROLE) {
    throw new Error("Forbidden");
  }
  return session;
}

export async function updateConsultationStatus(
  id: string,
  status: "new" | "contacted" | "closed"
) {
  await verifyAdminOrStaff();

  try {
    const db = getDb();
    await db
      .update(consultationRequests)
      .set({ status })
      .where(eq(consultationRequests.id, id));

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update consultation status:", error);
    return { success: false, error: error.message };
  }
}

export async function updateUserRole(
  userId: string,
  role: "ADMIN" | "STAFF" | "PATIENT"
) {
  const session = await verifyAdminOrStaff();
  const activeUserRole = (session.user as any).role;

  if (activeUserRole !== ADMIN_ROLE) {
    throw new Error("Forbidden: Only Administrators can change roles.");
  }

  // Prevent admin lockout
  if (userId === (session.user as any).id) {
    return { success: false, error: "You cannot change your own role." };
  }

  try {
    const db = getDb();
    await db.update(users).set({ role }).where(eq(users.id, userId));

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update user role:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteContent(
  contentType:
    | "Service"
    | "Blog Post"
    | "Partner"
    | "Doctor"
    | "Hospital"
    | "Testimonial"
    | "FAQ"
    | "Team Member"
    | "Gallery Image",
  id: string
) {
  await verifyAdminOrStaff();

  try {
    const db = getDb();

    if (contentType === "Service") {
      await db.delete(services).where(eq(services.id, id));
    } else if (contentType === "Blog Post") {
      await db.delete(blogPosts).where(eq(blogPosts.slug, id));
    } else if (contentType === "Partner") {
      await db.delete(partners).where(eq(partners.id, id));
    } else if (contentType === "Doctor") {
      await db.delete(doctors).where(eq(doctors.id, id));
    } else if (contentType === "Hospital") {
      await db.delete(hospitals).where(eq(hospitals.id, id));
    } else if (contentType === "Testimonial") {
      await db.delete(testimonials).where(eq(testimonials.id, id));
    } else if (contentType === "FAQ") {
      await db.delete(faqs).where(eq(faqs.id, id));
    } else if (contentType === "Team Member") {
      await db.delete(teamMembers).where(eq(teamMembers.id, id));
    } else if (contentType === "Gallery Image") {
      await db.delete(galleryImages).where(eq(galleryImages.id, id));
    } else {
      return { success: false, error: "Invalid Content Type" };
    }

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete content:", error);
    return { success: false, error: error.message };
  }
}
