import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { ADMIN_ROLE, STAFF_ROLE } from "@/auth";
import { getDb } from "@/lib/db";
import {
  services,
  blogPosts,
  partners,
  doctors,
  hospitals,
  testimonials,
  faqs,
  teamMembers,
} from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const runtime = "edge";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

// GET handler: Fetch content lists (publicly readable or for portal viewing)
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type"); // "Service" | "Blog Post" | "Partner" | "Doctor" | "Hospital" | "Testimonial" | "FAQ" | "Team Member"

  try {
    const db = getDb();

    if (type === "Service") {
      const results = await db.select().from(services).orderBy(desc(services.createdAt));
      return NextResponse.json(results);
    } else if (type === "Blog Post") {
      const results = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
      return NextResponse.json(results);
    } else if (type === "Partner") {
      const results = await db.select().from(partners).orderBy(desc(partners.createdAt));
      return NextResponse.json(results);
    } else if (type === "Doctor") {
      const results = await db.select().from(doctors).orderBy(desc(doctors.createdAt));
      return NextResponse.json(results);
    } else if (type === "Hospital") {
      const results = await db.select().from(hospitals).orderBy(desc(hospitals.createdAt));
      return NextResponse.json(results);
    } else if (type === "Testimonial") {
      const results = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
      return NextResponse.json(results);
    } else if (type === "FAQ") {
      const results = await db.select().from(faqs).orderBy(desc(faqs.createdAt));
      return NextResponse.json(results);
    } else if (type === "Team Member") {
      const results = await db.select().from(teamMembers).orderBy(desc(teamMembers.createdAt));
      return NextResponse.json(results);
    } else {
      // Fetch all contents for initial dashboard sync
      const s = await db.select().from(services);
      const b = await db.select().from(blogPosts);
      const p = await db.select().from(partners);
      const d = await db.select().from(doctors);
      const h = await db.select().from(hospitals);
      const t = await db.select().from(testimonials);
      const f = await db.select().from(faqs);
      const tm = await db.select().from(teamMembers);

      return NextResponse.json({
        services: s,
        blogPosts: b,
        partners: p,
        doctors: d,
        hospitals: h,
        testimonials: t,
        faqs: f,
        teamMembers: tm,
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Database query failed" },
      { status: 500 }
    );
  }
}

// POST handler: Create / Update content (restricted to Authenticated Admins/Staff)
export const POST = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (req.auth.user as any)?.role ?? "PATIENT";
  if (role !== ADMIN_ROLE && role !== STAFF_ROLE) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const db = getDb();
    const body = (await req.json()) as any;
    const { contentType, ...data } = body;

    if (!contentType) {
      return NextResponse.json(
        { error: "Content Type is required" },
        { status: 400 }
      );
    }

    const visibility = data.visibility || "Draft";

    if (contentType === "Service") {
      if (!data.title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
      const id = data.id || slugify(data.title);
      await db
        .insert(services)
        .values({
          id,
          title: data.title,
          category: data.category || "General Consultation",
          duration: data.duration || "",
          description: data.description || "",
          image: data.image || "",
          tags: Array.isArray(data.tags) ? data.tags.join(",") : "",
          visibility,
        })
        .onConflictDoUpdate({
          target: services.id,
          set: {
            title: data.title,
            category: data.category || "General Consultation",
            duration: data.duration || "",
            description: data.description || "",
            image: data.image || "",
            tags: Array.isArray(data.tags) ? data.tags.join(",") : "",
            visibility,
          },
        });
      return NextResponse.json({ success: true, id });
    } else if (contentType === "Blog Post") {
      if (!data.title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
      const slug = data.slug || slugify(data.title);
      const excerpt = data.description ? data.description.substring(0, 150) + "..." : "";
      const author = req.auth.user?.name || "Dr. Sarah Khalil";
      const authorImage = req.auth.user?.image || "";

      await db
        .insert(blogPosts)
        .values({
          slug,
          title: data.title,
          category: data.category || "Medical Tourism",
          excerpt,
          content: data.description || "",
          image: data.image || "",
          author,
          authorImage,
          tags: Array.isArray(data.tags) ? data.tags.join(",") : "",
          visibility,
        })
        .onConflictDoUpdate({
          target: blogPosts.slug,
          set: {
            title: data.title,
            category: data.category || "Medical Tourism",
            excerpt,
            content: data.description || "",
            image: data.image || "",
            tags: Array.isArray(data.tags) ? data.tags.join(",") : "",
            visibility,
          },
        });
      return NextResponse.json({ success: true, slug });
    } else if (contentType === "Partner") {
      if (!data.title) return NextResponse.json({ error: "Name/Title is required" }, { status: 400 });
      const id = data.id || slugify(data.title);
      await db
        .insert(partners)
        .values({
          id,
          name: data.title,
          image: data.image || "",
          visibility,
        })
        .onConflictDoUpdate({
          target: partners.id,
          set: {
            name: data.title,
            image: data.image || "",
            visibility,
          },
        });
      return NextResponse.json({ success: true, id });
    } else if (contentType === "Doctor") {
      if (!data.title) return NextResponse.json({ error: "Name is required" }, { status: 400 });
      const id = data.id || slugify(data.title);
      await db
        .insert(doctors)
        .values({
          id,
          name: data.title,
          title: data.jobTitle || "Specialist",
          department: data.category || "General Medicine",
          experience: data.duration || "5 years",
          bio: data.description || "",
          image: data.image || "",
          hospitalId: data.hospitalId || null,
          visibility,
        })
        .onConflictDoUpdate({
          target: doctors.id,
          set: {
            name: data.title,
            title: data.jobTitle || "Specialist",
            department: data.category || "General Medicine",
            experience: data.duration || "5 years",
            bio: data.description || "",
            image: data.image || "",
            hospitalId: data.hospitalId || null,
            visibility,
          },
        });
      return NextResponse.json({ success: true, id });
    } else if (contentType === "Hospital") {
      if (!data.title) return NextResponse.json({ error: "Name is required" }, { status: 400 });
      const id = data.id || slugify(data.title);
      await db
        .insert(hospitals)
        .values({
          id,
          name: data.title,
          location: data.category || "India",
          focus: data.duration || "Multi-specialty",
          description: data.description || "",
          image: data.image || "",
          visibility,
        })
        .onConflictDoUpdate({
          target: hospitals.id,
          set: {
            name: data.title,
            location: data.category || "India",
            focus: data.duration || "Multi-specialty",
            description: data.description || "",
            image: data.image || "",
            visibility,
          },
        });
      return NextResponse.json({ success: true, id });
    } else if (contentType === "Testimonial") {
      if (!data.title) return NextResponse.json({ error: "Name is required" }, { status: 400 });
      const id = data.id || crypto.randomUUID();
      await db
        .insert(testimonials)
        .values({
          id,
          name: data.title,
          role: data.category || "Patient",
          quote: data.description || "",
          rating: Number(data.duration) || 5,
          image: data.image || "",
          visibility,
        })
        .onConflictDoUpdate({
          target: testimonials.id,
          set: {
            name: data.title,
            role: data.category || "Patient",
            quote: data.description || "",
            rating: Number(data.duration) || 5,
            image: data.image || "",
            visibility,
          },
        });
      return NextResponse.json({ success: true, id });
    } else if (contentType === "FAQ") {
      if (!data.title) return NextResponse.json({ error: "Question is required" }, { status: 400 });
      const id = data.id || crypto.randomUUID();
      await db
        .insert(faqs)
        .values({
          id,
          question: data.title,
          answer: data.description || "",
          category: data.category || "General",
          visibility,
        })
        .onConflictDoUpdate({
          target: faqs.id,
          set: {
            question: data.title,
            answer: data.description || "",
            category: data.category || "General",
            visibility,
          },
        });
      return NextResponse.json({ success: true, id });
    } else if (contentType === "Team Member") {
      if (!data.title) return NextResponse.json({ error: "Name is required" }, { status: 400 });
      const id = data.id || crypto.randomUUID();
      await db
        .insert(teamMembers)
        .values({
          id,
          name: data.title,
          role: data.category || "Staff",
          bio: data.description || "",
          image: data.image || "",
          visibility,
        })
        .onConflictDoUpdate({
          target: teamMembers.id,
          set: {
            name: data.title,
            role: data.category || "Staff",
            bio: data.description || "",
            image: data.image || "",
            visibility,
          },
        });
      return NextResponse.json({ success: true, id });
    } else {
      return NextResponse.json(
        { error: "Invalid Content Type" },
        { status: 400 }
      );
    }
  } catch (err: any) {
    console.error("Content operation failed:", err);
    return NextResponse.json(
      { error: err.message || "Database insert/update operation failed" },
      { status: 500 }
    );
  }
});
