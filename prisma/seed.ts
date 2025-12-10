import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();
  await prisma.hotel.deleteMany();

  const hotels = [
    {
      name: "Aurora Bay Resort",
      description: "Floor-to-ceiling glass, private concierges, and an on-site chef’s lab for experimental cuisine.",
      city: "Lisbon",
      country: "Portugal",
      latitude: 38.7223,
      longitude: -9.1393,
      heroImage: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210cc",
      rating: 4.9,
      rooms: {
        create: [
          {
            name: "Skyline Suite",
            price: 520,
            maxGuests: 4,
            amenities: ["Sauna", "Balcony", "Workspace"],
          },
          {
            name: "Creators Loft",
            price: 310,
            maxGuests: 2,
            amenities: ["HiFi", "Coffee Lab"],
          },
        ],
      },
    },
    {
      name: "Monolith Desert Club",
      description: "Luxury glamping inspired by Burning Man with private plunge pools and AI-powered room service.",
      city: "Phoenix",
      country: "USA",
      latitude: 33.4484,
      longitude: -112.074,
      heroImage: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      rating: 4.8,
      rooms: {
        create: [
          {
            name: "Mirage Capsule",
            price: 420,
            maxGuests: 3,
            amenities: ["Pool", "Desert Views"],
          },
        ],
      },
    },
  ];

  for (const hotel of hotels) {
    await prisma.hotel.create({ data: hotel });
  }

  console.log("Seeded hotels with rooms.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
