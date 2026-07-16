import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";

export function getDb() {
  let d1 = (process.env as any).DB ?? (globalThis as any).DB ?? null;

  if (!d1) {
    try {
      const { getCloudflareContext } = require("@opennextjs/cloudflare");
      const ctx = getCloudflareContext();
      d1 = ctx?.env?.DB;
    } catch (e) {
      // ignore
    }
  }

  if (!d1) {
    throw new Error(
      "D1 database connection unavailable. Ensure that the 'DB' binding is configured in wrangler.toml and available in the current environment context."
    );
  }
  return drizzle(d1, { schema });
}
export type DbClient = ReturnType<typeof getDb>;
