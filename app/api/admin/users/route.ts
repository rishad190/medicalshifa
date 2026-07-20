import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { ADMIN_ROLE, STAFF_ROLE } from "@/auth";
import { getDb } from "@/lib/db";
import { users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const runtime = "edge";

// GET: Fetch all users (ADMIN or STAFF only)
export const GET = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (req.auth.user as any)?.role;
  if (role !== ADMIN_ROLE && role !== STAFF_ROLE) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const db = getDb();
    if (!db) return NextResponse.json([]);
    const result = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt));

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { error: error.message || "Database query failed" },
      { status: 500 }
    );
  }
});

// POST: Modify a user's role (ADMIN only)
export const POST = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (req.auth.user as any)?.role;
  if (role !== ADMIN_ROLE) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const db = getDb();
    if (!db) return NextResponse.json({ error: "Database offline" }, { status: 503 });
    const body = (await req.json()) as any;
    const { userId, newRole } = body;

    if (!userId || !newRole || !["ADMIN", "STAFF", "PATIENT"].includes(newRole)) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    // Do not allow an admin to change their own role to prevent lockout
    if (userId === (req.auth.user as any).id) {
      return NextResponse.json(
        { error: "You cannot change your own role." },
        { status: 400 }
      );
    }

    await db
      .update(users)
      .set({ role: newRole })
      .where(eq(users.id, userId));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to update user role:", error);
    return NextResponse.json(
      { error: error.message || "Database update failed" },
      { status: 500 }
    );
  }
});
