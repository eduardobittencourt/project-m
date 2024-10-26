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
      salt: salt,
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
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  console.log(salt, iv);

  const passwordKey = await getPasswordKey();
  const aesKey = await deriveKey(passwordKey, salt, ["encrypt"]);

  const encryptedContent = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    aesKey,
    new TextEncoder().encode(payload),
  );

  const encryptedContentArr = new Uint8Array(encryptedContent);

  const buff = new Uint8Array(
    salt.byteLength + iv.byteLength + encryptedContentArr.byteLength,
  );

  buff.set(salt, 0);
  buff.set(iv, salt.byteLength);
  buff.set(encryptedContentArr, salt.byteLength + iv.byteLength);

  const base64Buff = btoa(
    buff.reduce((data, byte) => data + String.fromCharCode(byte), ""),
  );

  return base64Buff;
}

export async function match(password: string, hash: string) {
  const encryptedDataBuff = Uint8Array.from(atob(hash), (c) => c.charCodeAt(0));
  const salt = encryptedDataBuff.slice(0, 16);
  const iv = encryptedDataBuff.slice(16, 16 + 12);
  const payload = encryptedDataBuff.slice(16 + 12);

  const passwordKey = await getPasswordKey();
  const aesKey = await deriveKey(passwordKey, salt, ["encrypt"]);

  const encryptedContent = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    aesKey,
    new TextEncoder().encode(password),
  );

  const encryptedContentArr = new Uint8Array(encryptedContent);

  return encryptedContentArr.toString() === payload.toString();
}
