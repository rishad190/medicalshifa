import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";

export function getDb() {
  let d1 =
    (process.env as any).DB ??
    (globalThis as any).DB ??
    (globalThis as any).__env__?.DB ??
    (globalThis as any).__env?.DB ??
    null;

  if (!d1 || typeof d1 !== "object" || typeof d1.prepare !== "function") {
    try {
      const { getCloudflareContext } = require("@opennextjs/cloudflare");
      const ctx = getCloudflareContext();
      if (
        ctx?.env?.DB &&
        typeof ctx.env.DB === "object" &&
        typeof ctx.env.DB.prepare === "function"
      ) {
        d1 = ctx.env.DB;
      }
    } catch (e) {
      // ignore
    }
  }

  if (!d1 || typeof d1 !== "object" || typeof d1.prepare !== "function") {
    console.warn(
      "D1 database connection unavailable. Ensure 'DB' is bound as a D1 Database Binding in Cloudflare."
    );
    return null;
  }
  return drizzle(d1, { schema });
}
export type DbClient = NonNullable<ReturnType<typeof getDb>>;
