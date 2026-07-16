import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { consultationRequests } from "@/db/schema";
import { auth } from "@/auth";

export const runtime = "edge";

type ConsultationInput = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  consent?: boolean;
};

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as ConsultationInput | null;

  if (
    !body ||
    ![body.name, body.email, body.phone, body.consent].every(Boolean) ||
    typeof body.email !== "string" ||
    body.email.length > 254
  ) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const db = getDb();

    // Link to registered patient if authenticated
    const session = await auth();
    const userId = session?.user ? (session.user as any).id : null;

    const newId = crypto.randomUUID();

    await db.insert(consultationRequests).values({
      id: newId,
      name: String(body.name).slice(0, 120),
      email: body.email.toLowerCase(),
      phone: String(body.phone).slice(0, 40),
      service: String(body.service ?? "General consultation").slice(0, 100),
      status: "new",
      userId: userId,
    });

    return NextResponse.json({ ok: true, id: newId }, { status: 201 });
  } catch (error: any) {
    console.error("Consultation request submission error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit consultation" },
      { status: 500 }
    );
  }
}
