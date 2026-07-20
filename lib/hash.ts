/**
 * Secure password hashing utility using standard Web Crypto API (SHA-256 with Salt).
 * Compatible with Cloudflare Workers (Edge runtime) and Node.js environments.
 */

export async function hashPassword(
  password: string,
  salt?: string
): Promise<{ hash: string; salt: string }> {
  const encoder = new TextEncoder();

  let saltStr = salt;
  if (!saltStr) {
    const saltBuffer = new Uint8Array(16);
    crypto.getRandomValues(saltBuffer);
    saltStr = Array.from(saltBuffer)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  const data = encoder.encode(`${password}:${saltStr}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashStr = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return { hash: hashStr, salt: saltStr };
}

export async function verifyPassword(
  password: string,
  hash: string,
  salt: string
): Promise<boolean> {
  const result = await hashPassword(password, salt);
  return result.hash === hash;
}
