import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { ADMIN_ROLE } from "@/auth";

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

function getD1Database() {
  return (process.env as any).DB ?? (globalThis as any).DB ?? null;
}

// GET handler: Fetch content list (accessible to frontend)
export async function GET(req: NextRequest) {
  const db = getD1Database();
  if (!db) {
    return NextResponse.json(
      { error: "D1 database connection unavailable" },
      { status: 500 },
    );
  }

  const url = new URL(req.url);
  const type = url.searchParams.get("type"); // "Service" | "Blog Post" | "Partner"

  try {
    if (type === "Service") {
      const { results } = await db
        .prepare("SELECT * FROM services ORDER BY createdAt DESC")
        .all();
      return NextResponse.json(results);
    } else if (type === "Blog Post") {
      const { results } = await db
        .prepare("SELECT * FROM blog_posts ORDER BY createdAt DESC")
        .all();
      return NextResponse.json(results);
    } else if (type === "Partner") {
      const { results } = await db
        .prepare("SELECT * FROM partners ORDER BY createdAt DESC")
        .all();
      return NextResponse.json(results);
    } else {
      // Fetch all
      const services = await db.prepare("SELECT * FROM services").all();
      const posts = await db.prepare("SELECT * FROM blog_posts").all();
      const partners = await db.prepare("SELECT * FROM partners").all();
      return NextResponse.json({
        services: services.results,
        posts: posts.results,
        partners: partners.results,
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Database query failed" },
      { status: 500 },
    );
  }
}

// POST handler: Create content (restricted to Authenticated Admins)
export const POST = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (req.auth.user as any)?.role ?? "PATIENT";
  if (role !== ADMIN_ROLE) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const db = getD1Database();
  if (!db) {
    return NextResponse.json(
      { error: "D1 database connection unavailable" },
      { status: 500 },
    );
  }

  try {
    const body = await req.json();
    const {
      contentType,
      title,
      category,
      duration,
      description,
      image,
      tags,
      visibility,
    } = body;

    if (!title || !contentType) {
      return NextResponse.json(
        { error: "Title and Content Type are required" },
        { status: 400 },
      );
    }

    const tagsStr = Array.isArray(tags) ? tags.join(",") : "";
    const status = visibility || "Draft";

    if (contentType === "Service") {
      const id = slugify(title);
      await db
        .prepare(
          "INSERT OR REPLACE INTO services (id, title, category, duration, description, image, tags, visibility) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(
          id,
          title,
          category || "General Consultation",
          duration || "",
          description || "",
          image || "",
          tagsStr,
          status,
        )
        .run();

      return NextResponse.json({ success: true, id });
    } else if (contentType === "Blog Post") {
      const slug = slugify(title);
      const excerpt = description ? description.substring(0, 150) + "..." : "";

      const author = req.auth.user?.name || "Dr. Sarah Khalil";
      const authorImage =
        req.auth.user?.image ||
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBzQL-tqoi4mBI4rAj-vnlNIljOiw2PZRLb5hUxqSfsI0elcXXJiqk2IJlFw8vt6tw1MLr_TCP9pZC4CMTAZ0S4wbZooZvksKcFBNLok_ndGfWUbo5eROBFoiAujUv5bRmZTqpHmgCeOFVpW53IP-rGf4Vx-fJ6c4EcBdTgGqP0a3agXDmCZBzRI-tvjZOtHqCVmmDEg2AOtZCUUamX55TFgrGF0f52avx1tlTxH3USRVfZXv04r8E0IBx0dOAgUFjOZ7OSmIwJTFg";

      await db
        .prepare(
          "INSERT OR REPLACE INTO blog_posts (slug, title, category, excerpt, content, image, author, authorImage, tags, visibility) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(
          slug,
          title,
          category || "Medical Innovation",
          excerpt,
          description || "",
          image || "",
          author,
          authorImage,
          tagsStr,
          status,
        )
        .run();

      return NextResponse.json({ success: true, slug });
    } else if (contentType === "Partner") {
      const id = slugify(title);
      await db
        .prepare(
          "INSERT OR REPLACE INTO partners (id, name, image, visibility) VALUES (?, ?, ?, ?)",
        )
        .bind(id, title, image || "", status)
        .run();

      return NextResponse.json({ success: true, id });
    } else {
      return NextResponse.json(
        { error: "Invalid Content Type" },
        { status: 400 },
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Insert operation failed" },
      { status: 500 },
    );
  }
});
