import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// 1. Users and Roles
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "timestamp" }),
  image: text("image"),
  role: text("role", { enum: ["ADMIN", "STAFF", "PATIENT"] }).default("PATIENT").notNull(),
  passwordHash: text("password_hash"),
  salt: text("salt"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 2. Auth.js NextAuth Accounts
export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

// 3. Auth.js NextAuth Sessions
export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  sessionToken: text("sessionToken").notNull().unique(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp" }).notNull(),
});

// 4. Auth.js NextAuth Verification Tokens
export const verificationTokens = sqliteTable(
  "verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp" }).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.identifier, table.token] }),
  })
);

// 5. Services
export const services = sqliteTable("services", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  duration: text("duration"),
  description: text("description"),
  image: text("image"),
  tags: text("tags"),
  visibility: text("visibility", { enum: ["Draft", "Public"] }).default("Draft").notNull(),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 6. Blog Posts
export const blogPosts = sqliteTable("blog_posts", {
  slug: text("slug").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  image: text("image"),
  author: text("author"),
  authorImage: text("authorImage"),
  tags: text("tags"),
  visibility: text("visibility", { enum: ["Draft", "Public"] }).default("Draft").notNull(),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 7. Partners
export const partners = sqliteTable("partners", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image"),
  visibility: text("visibility", { enum: ["Draft", "Public"] }).default("Draft").notNull(),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 8. Doctors
export const doctors = sqliteTable("doctors", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  department: text("department").notNull(),
  experience: text("experience").notNull(),
  bio: text("bio"),
  image: text("image"),
  visibility: text("visibility", { enum: ["Draft", "Public"] }).default("Draft").notNull(),
  hospitalId: text("hospitalId").references(() => partners.id, { onDelete: "set null" }),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 9. Hospitals Detail Table
export const hospitals = sqliteTable("hospitals", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  focus: text("focus").notNull(),
  description: text("description"),
  image: text("image"),
  visibility: text("visibility", { enum: ["Draft", "Public"] }).default("Draft").notNull(),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 10. Testimonials
export const testimonials = sqliteTable("testimonials", {
  id: text("id").primaryKey(),
  quote: text("quote").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  rating: integer("rating").default(5).notNull(),
  image: text("image"),
  visibility: text("visibility", { enum: ["Draft", "Public"] }).default("Draft").notNull(),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 11. FAQs
export const faqs = sqliteTable("faqs", {
  id: text("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull(),
  visibility: text("visibility", { enum: ["Draft", "Public"] }).default("Draft").notNull(),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// 12. Consultation / Inquiry Requests
export const consultationRequests = sqliteTable("consultation_requests", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  status: text("status", { enum: ["new", "contacted", "closed"] }).default("new").notNull(),
  userId: text("userId").references(() => users.id, { onDelete: "set null" }),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});
