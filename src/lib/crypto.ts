import "server-only";

function getPasswordKey() {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(process.env.PASSWORD_SECRET!),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
}

function deriveKey(
  key: CryptoKey,
  salt: Uint8Array,
  keyUsage: Iterable<KeyUsage>,
) {
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 250000,
      hash: "SHA-256",
    },
    key,
    { name: "AES-GCM", length: 256 },
    false,
    keyUsage,
  );
}

export async function encrypt(payload: string) {
  // Create a random salt and iv
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Derive the AES key from the password and salt
  const passwordKey = await getPasswordKey();
  const AESKey = await deriveKey(passwordKey, salt, ["encrypt"]);

  // Encrypt the payload using the AES key
  const encryptedContent = new Uint8Array(
    await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      AESKey,
      new TextEncoder().encode(payload),
    ),
  );

  // Combine the salt, iv, and encrypted content into a single Uint8Array
  const encryptedPayload = new Uint8Array(
    salt.byteLength + iv.byteLength + encryptedContent.byteLength,
  );

  encryptedPayload.set(salt, 0);
  encryptedPayload.set(iv, salt.byteLength);
  encryptedPayload.set(encryptedContent, salt.byteLength + iv.byteLength);

  // Convert the Uint8Array to a base64-encoded string
  return btoa(
    encryptedPayload.reduce(
      (data, byte) => data + String.fromCharCode(byte),
      "",
    ),
  );
}

export async function match(password: string, hash: string) {
  // Convert the hash to a Uint8Array
  const encryptedPayload = Uint8Array.from(atob(hash), (c) => c.charCodeAt(0));

  // Extract the salt, iv, and database content from the encrypted payload
  const salt = encryptedPayload.slice(0, 16);
  const iv = encryptedPayload.slice(16, 16 + 12);
  const databaseContent = encryptedPayload.slice(16 + 12);

  // Derive the AES key from the password and salt
  const passwordKey = await getPasswordKey();
  const AESKey = await deriveKey(passwordKey, salt, ["encrypt"]);

  // Encrypt the payload using the AES key
  const encryptedContent = new Uint8Array(
    await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      AESKey,
      new TextEncoder().encode(password),
    ),
  );

  // Compare the request content with the stored content
  return encryptedContent.toString() === databaseContent.toString();
}
