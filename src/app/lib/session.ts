import "server-only";

import { db } from "@/db";
import { User, usersTable } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";

const encryptionKey = new TextEncoder().encode(process.env.SESSION_SECRET);

export const cookie = {
  name: "@project-m/session",
  duration: 1000 * 60 * 60 * 24, // 1 day
  options: {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: true,
  },
} as const;

type Session = {
  userId: number;
  expires: Date;
};

export async function encrypt(payload: Session) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encryptionKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify<Session>(session, encryptionKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch {
    return null;
  }
}

export async function createSession(userId: User["id"]) {
  const expires = new Date(Date.now() + cookie.duration);

  const encryptedSession = await encrypt({ userId, expires });

  const cookieStore = await cookies();
  cookieStore.set(cookie.name, encryptedSession, {
    ...cookie.options,
    expires,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookie.name);
}

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(cookie.name)?.value;
  if (!cookieValue) return null;

  const session = await decrypt(cookieValue);
  if (!session?.userId) return null;

  return { userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, session.userId),
      columns: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  } catch (error) {
    console.log("Failed to fetch user", error);

    return null;
  }
});
