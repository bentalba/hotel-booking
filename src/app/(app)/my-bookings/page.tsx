import type { Metadata } from "next";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUserId, getViewerProfile } from "@/lib/auth";
import { db } from "@/lib/db";

type BookingWithRoom = Awaited<ReturnType<typeof db.booking.findMany>>[number];

export const metadata: Metadata = {
  title: "My bookings | Atlas",
};

export default async function MyBookingsPage() {
  const userId = await currentUserId();
  const profile = await getViewerProfile();

  if (!userId) {
    return (
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle>You need to sign in</CardTitle>
          <CardDescription>Bookings are tied to a Clerk session. Once signed in, you’ll see every stay with live status.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const bookings = await db.booking.findMany({
    where: { userId },
    include: {
      room: {
        include: {
          hotel: true,
        },
      },
    },
    orderBy: { startDate: "asc" },
  });

  if (!bookings.length) {
    return (
      <Card className="border-dashed border-emerald-200/70 bg-emerald-50/40">
        <CardHeader>
          <CardTitle>No trips yet</CardTitle>
          <CardDescription>
            {profile?.fullName ?? "You"} haven’t booked any rooms. Head to the search page to lock in the first stay.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
  {bookings.map((booking: BookingWithRoom) => {
        const isPast = booking.endDate < new Date();
        const status = isPast ? "Completed" : "Confirmed";
        return (
          <Card key={booking.id} className="border-border/70">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{booking.room.hotel.name}</CardTitle>
                <CardDescription>
                  {booking.room.hotel.city} · {booking.room.name}
                </CardDescription>
              </div>
              <Badge variant={isPast ? "outline" : "default"}>{status}</Badge>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                {format(booking.startDate, "PPP")} – {format(booking.endDate, "PPP")} · {booking.room.maxGuests} guests · ${booking.room.price}
                / night
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
