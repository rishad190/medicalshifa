import NextAuth from "next-auth";
import { D1Adapter } from "@auth/d1-adapter";
import Credentials from "next-auth/providers/credentials";

const ADMIN_ROLE = "ADMIN";
const STAFF_ROLE = "STAFF";
const PATIENT_ROLE = "PATIENT";

function getD1Database() {
  return (process.env as any).DB ?? (globalThis as any).DB ?? null;
}

async function getPasswordHash(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function comparePasswords(input: string, expected: string) {
  const inputHash = await getPasswordHash(input);
  return inputHash === expected.toLowerCase();
}

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  const db = getD1Database();

  return {
    adapter: db ? D1Adapter(db) : undefined,
    providers: [
      Credentials({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const username = credentials?.username?.toString() ?? "";
          const password = credentials?.password?.toString() ?? "";

          const configuredUsername = process.env.ADMIN_USERNAME || "admin";
          const configuredPasswordHash = process.env.ADMIN_PASSWORD_HASH || "";

          if (!configuredPasswordHash) {
            return null;
          }

          if (
            username === configuredUsername &&
            (await comparePasswords(password, configuredPasswordHash))
          ) {
            return {
              id: "admin-id",
              name: "Administrator",
              email: "admin@shifa.care",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBzQL-tqoi4mBI4rAj-vnlNIljOiw2PZRLb5hUxqSfsI0elcXXJiqk2IJlFw8vt6tw1MLr_TCP9pZC4CMTAZ0S4wbZooZvksKcFBNLok_ndGfWUbo5eROBFoiAujUv5bRmZTqpHmgCeOFVpW53IP-rGf4Vx-fJ6c4EcBdTgGqP0a3agXDmCZBzRI-tvjZOtHqCVmmDEg2AOtZCUUamX55TFgrGF0f52avx1tlTxH3USRVfZXv04r8E0IBx0dOAgUFjOZ7OSmIwJTFg",
              role: ADMIN_ROLE,
            };
          }

          return null;
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.role = (user as any).role ?? PATIENT_ROLE;
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          (session.user as any).role = token.role ?? PATIENT_ROLE;
        }
        return session;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
    trustHost: true,
    secret: process.env.AUTH_SECRET,
    cookies: {
      sessionToken: {
        name: `__Secure-authjs.session-token`,
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: true,
        },
      },
    },
  };
});

export { ADMIN_ROLE, STAFF_ROLE, PATIENT_ROLE, getPasswordHash };
