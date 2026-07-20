"use server";

import { getDb } from "@/lib/db";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/hash";
import { eq } from "drizzle-orm";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function registerUser(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate fields
  const validated = registerSchema.safeParse({ name, email, password });
  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues[0].message,
    };
  }

  try {
    const db = getDb();
    if (!db) return { success: false, error: "Database connection unavailable" };

    // Check if user already exists
    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (existingUsers.length > 0) {
      return {
        success: false,
        error: "A user with this email address already exists.",
      };
    }

    // Hash the password using Web Crypto PBKDF2
    const { hash, salt } = await hashPassword(password);
    const userId = crypto.randomUUID();

    // All users registering via the admin registration portal get ADMIN role
    const role = "ADMIN";

    await db.insert(users).values({
      id: userId,
      name,
      email: email.toLowerCase(),
      role,
      passwordHash: hash,
      salt,
      emailVerified: null,
    });

    return {
      success: true,
      message: "Registration successful! You can now log in.",
    };
  } catch (error: any) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred during registration.",
    };
  }
}
