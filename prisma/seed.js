/* Seed minimal Prisma (SQLite)
   - Ajoute quelques hôtels
   - Optionnel: crée aucune réservation par défaut
*/

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const hotels = [
    {
      nom: "Atlas Palace",
      ville: "Marrakech",
      image: "/images/hotels/marrakech-1.jpg",
      prixBase: 1200,
    },
    {
      nom: "Riad Médina",
      ville: "Fès",
      image: "/images/hotels/fes-1.jpg",
      prixBase: 850,
    },
    {
      nom: "Ocean View",
      ville: "Agadir",
      image: "/images/hotels/agadir-1.jpg",
      prixBase: 950,
    },
  ];

  for (const h of hotels) {
    await prisma.hotel.upsert({
      where: { id: `seed-${h.ville}-${h.nom}`.toLowerCase().replace(/\s+/g, "-") },
      update: h,
      create: {
        id: `seed-${h.ville}-${h.nom}`.toLowerCase().replace(/\s+/g, "-"),
        ...h,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("✅ Seed terminé");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
