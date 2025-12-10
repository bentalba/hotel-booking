import { bookingSchema } from "@/lib/validators";

describe("bookingSchema", () => {
  it("parses valid payloads", () => {
    const result = bookingSchema.safeParse({
      roomId: "room_123",
      guests: 2,
      startDate: new Date("2025-01-01").toISOString(),
      endDate: new Date("2025-01-05").toISOString(),
      notes: "Looking forward to it",
    });

    expect(result.success).toBe(true);
  });

  it("rejects overlapping dates", () => {
    const result = bookingSchema.safeParse({
      roomId: "room_123",
      guests: 2,
      startDate: new Date("2025-01-05").toISOString(),
      endDate: new Date("2025-01-02").toISOString(),
    });

    expect(result.success).toBe(false);
  });
});
