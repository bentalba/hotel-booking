import { auth, currentUser } from "@clerk/nextjs/server";

export async function currentUserId() {
  const { userId } = await auth();
  return userId;
}

export async function requireUserId() {
  const id = await currentUserId();
  if (!id) {
    throw new Error("Authentication required to perform this action.");
  }
  return id;
}

export async function getViewerProfile() {
  const user = await currentUser();
  if (!user) return null;
  return {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress ?? "",
    fullName: user.fullName ?? "Guest",
    imageUrl: user.imageUrl ?? undefined,
  };
}
