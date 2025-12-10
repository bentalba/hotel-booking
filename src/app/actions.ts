'use server';

import { revalidatePath } from "next/cache";


import { requireUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { bookingSchema } from "@/lib/validators";

export type BookingActionState = {
  status: "idle" | "pending" | "success" | "error";
  message: string;
};

export async function createBooking(formData: FormData): Promise<BookingActionState> {
  const userId = await requireUserId().catch(() => null);
  if (!userId) {
    return { status: "error", message: "Please sign in before booking." };
  }

  const parsed = bookingSchema.safeParse({
    roomId: formData.get("roomId"),
    guests: formData.get("guests"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid data." };
  }

  const payload = parsed.data;

  try {
    await db.booking.create({
      data: {
        roomId: payload.roomId,
        userId,
        guests: payload.guests,
        startDate: new Date(payload.startDate),
        endDate: new Date(payload.endDate),
        notes: payload.notes?.trim() || null,
      },
    });
  } catch (error) {
    if (isPrismaKnownError(error)) {
      if (error.code === "P2002") {
        return { status: "error", message: "Someone just booked this time. Try different dates." };
      }
      if (error.code === "P2004") {
        return { status: "error", message: "Those dates overlap an existing trip." };
      }
    }
    console.error(error);
    return { status: "error", message: "Unexpected error. Please retry." };
  }

  revalidatePath("/my-bookings");
  return { status: "success", message: "We locked the room. You’ll see it under My Bookings." };
}

function isPrismaKnownError(error: unknown): error is { code: string } {
  return typeof error === "object" && error !== null && "code" in error && typeof (error as { code?: unknown }).code === "string";
}
