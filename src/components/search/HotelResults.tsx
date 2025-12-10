import { Suspense } from "react";

import { db } from "@/lib/db";
import { searchSchema, type SearchFilters } from "@/lib/validators";
import { BookingForm } from "@/components/booking/BookingForm";
import { ResultsMap, type MapHotel } from "@/components/maps/ResultsMap";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type HotelWithRooms = Awaited<ReturnType<typeof db.hotel.findMany>>[number];

interface HotelResultsProps {
  searchParams: SearchFilters;
}

async function getHotels(filters: SearchFilters): Promise<HotelWithRooms[]> {
  const parsed = searchSchema.safeParse(filters);
  if (!parsed.success) {
    return [];
  }
  const { city, guests, start, end } = parsed.data;
  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end) : null;

  const hotels = await db.hotel.findMany({
    where: city
      ? {
          OR: [
            { city: { contains: city, mode: "insensitive" } },
            { name: { contains: city, mode: "insensitive" } },
          ],
        }
      : undefined,
    include: {
      rooms: {
        include: {
          bookings: {
            select: {
              startDate: true,
              endDate: true,
            },
          },
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return hotels
    .map((hotel: HotelWithRooms) => {
      const availableRooms = hotel.rooms.filter((room: HotelWithRooms["rooms"][number]) => {
        if (guests && room.maxGuests < guests) return false;
        if (!startDate || !endDate) return true;
        return room.bookings.every(
          (booking: (typeof room.bookings)[number]) =>
            endDate <= booking.startDate || startDate >= booking.endDate
        );
      });
      return { ...hotel, rooms: availableRooms };
    })
    .filter((hotel: HotelWithRooms) => hotel.rooms.length > 0) as HotelWithRooms[];
}

export async function HotelResults({ searchParams }: HotelResultsProps) {
  const hotels = await getHotels(searchParams);

  if (!hotels.length) {
    return (
      <Card className="border-dashed border-emerald-200 bg-emerald-50/40">
        <CardHeader>
          <CardTitle>No stays match these filters yet</CardTitle>
          <CardDescription>Try widening your date range or pick a nearby city to see available rooms.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const mapHotels: MapHotel[] = hotels.map((hotel: HotelWithRooms) => ({
    id: hotel.id,
    name: hotel.name,
    latitude: hotel.latitude,
    longitude: hotel.longitude,
    price: hotel.rooms[0]?.price ?? 0,
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-6">
  {hotels.map((hotel: HotelWithRooms) => (
          <Card key={hotel.id} className="border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-xl">
                <span>{hotel.name}</span>
                <span className="text-sm font-normal text-muted-foreground">{hotel.city}</span>
              </CardTitle>
              <CardDescription>{hotel.description}</CardDescription>
            </CardHeader>
            <CardContent className="gap-4 lg:flex lg:items-start">
              <div className="flex-1 space-y-3">
                {hotel.rooms.map((room: HotelWithRooms["rooms"][number]) => (
                  <div key={room.id} className="rounded-2xl border border-border/60 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{room.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Sleeps {room.maxGuests} · ${room.price} / night
                        </p>
                      </div>
                    </div>
                    <BookingForm
                      roomId={room.id}
                      nightlyRate={room.price}
                      maxGuests={room.maxGuests}
                      defaultRange={searchParams.start && searchParams.end ? { from: new Date(searchParams.start), to: new Date(searchParams.end) } : undefined}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              <p>We guarantee atomic bookings via PostgreSQL exclusion constraints—double-bookings are impossible.</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="h-[600px] w-full">
        <Suspense fallback={<Skeleton className="h-full w-full rounded-3xl" />}>
          <ResultsMap hotels={mapHotels} />
        </Suspense>
      </div>
    </div>
  );
}
