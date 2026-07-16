import NextAuth from "next-auth";
import { D1Adapter } from "@auth/d1-adapter";
import Credentials from "next-auth/providers/credentials";
import { getDb } from "@/lib/db";
import { users } from "@/db/schema";
import { verifyPassword } from "@/lib/hash";
import { eq } from "drizzle-orm";

const ADMIN_ROLE = "ADMIN";
const STAFF_ROLE = "STAFF";
const PATIENT_ROLE = "PATIENT";

function getRawD1Database() {
  return (process.env as any).DB ?? (globalThis as any).DB ?? null;
}

const useSecureCookies =
  process.env.NODE_ENV === "production" ||
  (process.env.AUTH_URL && process.env.AUTH_URL.startsWith("https://"))
    ? true
    : false;
const cookiePrefix = useSecureCookies ? "__Secure-" : "";

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  const rawDb = getRawD1Database();

  return {
    adapter: rawDb ? D1Adapter(rawDb) : undefined,
    providers: [
      Credentials({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const email = credentials?.email?.toString() ?? "";
          const password = credentials?.password?.toString() ?? "";

          if (!email || !password) {
            return null;
          }

          try {
            const db = getDb();
            const results = await db
              .select()
              .from(users)
              .where(eq(users.email, email.toLowerCase()))
              .limit(1);

            if (results.length === 0) {
              return null;
            }

            const user = results[0];
            if (!user.passwordHash || !user.salt) {
              return null;
            }

            const isValid = await verifyPassword(
              password,
              user.passwordHash,
              user.salt
            );
            if (!isValid) {
              return null;
            }

            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          } catch (error) {
            console.error("Authorize callback error:", error);
            return null;
          }
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
          token.id = user.id;
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          (session.user as any).role = token.role ?? PATIENT_ROLE;
          (session.user as any).id = token.id as string;
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
        name: `${cookiePrefix}authjs.session-token`,
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: useSecureCookies,
        },
      },
    },
  };
});

export { ADMIN_ROLE, STAFF_ROLE, PATIENT_ROLE };
