import NextAuth from "next-auth";
import { D1Adapter } from "@auth/d1-adapter";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth((request) => {
  let db: any = null;

  // Retrieve Cloudflare bindings dynamically from the request context
  try {
    const { getCloudflareContext } = require("@opennextjs/cloudflare");
    const ctx = getCloudflareContext();
    db = ctx?.env?.DB;
  } catch (e) {
    try {
      const { getRequestContext } = require("@cloudflare/next-on-pages");
      const ctx = getRequestContext();
      db = ctx?.env?.DB;
    } catch (e2) {
      // Fallback for local Node dev or fallback env configurations
      db = (process.env as any).DB;
    }
  }

  return {
    adapter: db ? D1Adapter(db) : undefined,
    providers: [
      Github({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
      }),
      Credentials({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          const adminUsername = process.env.ADMIN_USERNAME || "admin";
          const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
          
          if (
            credentials?.username === adminUsername &&
            credentials?.password === adminPassword
          ) {
            return {
              id: "admin-id",
              name: "Administrator",
              email: "admin@shifa.care",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzQL-tqoi4mBI4rAj-vnlNIljOiw2PZRLb5hUxqSfsI0elcXXJiqk2IJlFw8vt6tw1MLr_TCP9pZC4CMTAZ0S4wbZooZvksKcFBNLok_ndGfWUbo5eROBFoiAujUv5bRmZTqpHmgCeOFVpW53IP-rGf4Vx-fJ6c4EcBdTgGqP0a3agXDmCZBzRI-tvjZOtHqCVmmDEg2AOtZCUUamX55TFgrGF0f52avx1tlTxH3USRVfZXv04r8E0IBx0dOAgUFjOZ7OSmIwJTFg",
            };
          }
          return null;
        }
      })
    ],
    session: {
      strategy: "jwt",
    },
    pages: {
      signIn: "/admin/login",
    },
    trustHost: true,
  };
});
