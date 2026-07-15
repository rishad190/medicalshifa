import { D1Database } from "@cloudflare/workers-types";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB: D1Database;
      AUTH_SECRET: string;
      AUTH_GITHUB_ID?: string;
      AUTH_GITHUB_SECRET?: string;
    }
  }
}
