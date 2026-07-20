/**
 * Secure password hashing utility using standard Web Crypto API (PBKDF2-HMAC-SHA256).
 * Compatible with Cloudflare Workers (Edge runtime) and modern Node.js.
 */

export async function hashPassword(
  password: string,
  salt?: string
): Promise<{ hash: string; salt: string }> {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  let saltBuffer: Uint8Array;
  let saltStr: string;

  if (salt) {
    saltStr = salt;
    const matches = salt.match(/.{1,2}/g);
    saltBuffer = new Uint8Array(
      matches ? matches.map((byte) => parseInt(byte, 16)) : []
    );
  } else {
    saltBuffer = new Uint8Array(16);
    crypto.getRandomValues(saltBuffer);
    saltStr = Array.from(saltBuffer)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // Import password as raw key
  const baseKey = await crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  // Derive 256 bits (32 bytes) of key material
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBuffer as any,
      iterations: 100000,
      hash: "SHA-256",
    },
    baseKey,
    256
  );

  const hashStr = Array.from(new Uint8Array(derivedBits))
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
