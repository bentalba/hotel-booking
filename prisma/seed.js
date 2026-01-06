const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with extended data...');

  // Clean existing data
  await prisma.reservationChambre.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.chambre.deleteMany();
  await prisma.client.deleteMany();

  // Create 50 Chambres across 5 floors
  const chambreData = [];
  const types = ['Standard', 'Deluxe', 'Suite', 'Royale'];
  
  for (let floor = 1; floor <= 5; floor++) {
    for (let room = 1; room <= 10; room++) {
      const numero = `${floor}${room.toString().padStart(2, '0')}`;
      chambreData.push({
        numero,
        telephone: `+212 522 000 ${numero}`
      });
    }
  }
  
  const chambres = await Promise.all(
    chambreData.map(data => prisma.chambre.create({ data }))
  );
  console.log(`✅ Created ${chambres.length} chambres (5 floors x 10 rooms)`);

  // Create 20 Clients
  const clientsData = [
    { nom: 'ALAMI', prenom: 'Mohammed', adresse: 'Casablanca, Maarif' },
    { nom: 'BENNANI', prenom: 'Fatima', adresse: 'Rabat, Agdal' },
    { nom: 'TAZI', prenom: 'Ahmed', adresse: 'Marrakech, Guéliz' },
    { nom: 'FASSI', prenom: 'Sara', adresse: 'Fès, Ville Nouvelle' },
    { nom: 'IDRISSI', prenom: 'Youssef', adresse: 'Tanger, Centre' },
    { nom: 'CHRAIBI', prenom: 'Leila', adresse: 'Casablanca, Anfa' },
    { nom: 'KETTANI', prenom: 'Omar', adresse: 'Rabat, Hassan' },
    { nom: 'BENJELLOUN', prenom: 'Nadia', adresse: 'Meknès, Hamria' },
    { nom: 'SLAOUI', prenom: 'Karim', adresse: 'Oujda, Centre' },
    { nom: 'BERRADA', prenom: 'Amina', adresse: 'Agadir, Talborjt' },
    { nom: 'ZNIBER', prenom: 'Hassan', adresse: 'Tétouan, Centre' },
    { nom: 'LAHLOU', prenom: 'Meryem', adresse: 'Casablanca, Palmier' },
    { nom: 'SQALLI', prenom: 'Rachid', adresse: 'Fès, Atlas' },
    { nom: 'BENMOUSSA', prenom: 'Khadija', adresse: 'Marrakech, Hivernage' },
    { nom: 'FILALI', prenom: 'Mehdi', adresse: 'Rabat, Souissi' },
    { nom: 'DOUKKALI', prenom: 'Zineb', adresse: 'El Jadida, Centre' },
    { nom: 'ALAOUI', prenom: 'Amine', adresse: 'Casablanca, Gauthier' },
    { nom: 'TAHIRI', prenom: 'Salma', adresse: 'Tanger, Malabata' },
    { nom: 'REGRAGUI', prenom: 'Walid', adresse: 'Casablanca, Sidi Maarouf' },
    { nom: 'BENKIRANE', prenom: 'Houda', adresse: 'Rabat, Hay Riad' },
  ];

  const clients = await Promise.all(
    clientsData.map(data => prisma.client.create({ data }))
  );
  console.log(`✅ Created ${clients.length} clients`);

  // Create 15 Reservations with various states
  const today = new Date();
  const reservationsData = [
    { code: 'RES-2024001', clientIdx: 0, etat: 'Confirmee', daysStart: -2, daysEnd: 3, chambreIdxs: [0] },
    { code: 'RES-2024002', clientIdx: 1, etat: 'Confirmee', daysStart: 1, daysEnd: 5, chambreIdxs: [1, 2] },
    { code: 'RES-2024003', clientIdx: 2, etat: 'EnCours', daysStart: 3, daysEnd: 7, chambreIdxs: [10] },
    { code: 'RES-2024004', clientIdx: 3, etat: 'Confirmee', daysStart: 5, daysEnd: 10, chambreIdxs: [11, 12] },
    { code: 'RES-2024005', clientIdx: 4, etat: 'Annulee', daysStart: 2, daysEnd: 4, chambreIdxs: [20] },
    { code: 'RES-2024006', clientIdx: 5, etat: 'EnCours', daysStart: 7, daysEnd: 14, chambreIdxs: [21] },
    { code: 'RES-2024007', clientIdx: 6, etat: 'Confirmee', daysStart: 10, daysEnd: 15, chambreIdxs: [30, 31] },
    { code: 'RES-2024008', clientIdx: 7, etat: 'EnCours', daysStart: -5, daysEnd: 0, chambreIdxs: [32] },
    { code: 'RES-2024009', clientIdx: 8, etat: 'Confirmee', daysStart: 14, daysEnd: 21, chambreIdxs: [40] },
    { code: 'RES-2024010', clientIdx: 9, etat: 'EnCours', daysStart: 0, daysEnd: 3, chambreIdxs: [41, 42] },
    { code: 'RES-2024011', clientIdx: 10, etat: 'Confirmee', daysStart: 20, daysEnd: 25, chambreIdxs: [3] },
    { code: 'RES-2024012', clientIdx: 11, etat: 'EnCours', daysStart: 1, daysEnd: 4, chambreIdxs: [13] },
    { code: 'RES-2024013', clientIdx: 12, etat: 'Annulee', daysStart: 8, daysEnd: 12, chambreIdxs: [23] },
    { code: 'RES-2024014', clientIdx: 13, etat: 'Confirmee', daysStart: 15, daysEnd: 20, chambreIdxs: [33, 34] },
    { code: 'RES-2024015', clientIdx: 14, etat: 'EnCours', daysStart: 2, daysEnd: 6, chambreIdxs: [43] },
  ];

  for (const resData of reservationsData) {
    await prisma.reservation.create({
      data: {
        code: resData.code,
        clientId: clients[resData.clientIdx].id,
        etat: resData.etat,
        dateDebut: new Date(today.getTime() + resData.daysStart * 24 * 60 * 60 * 1000),
        dateFin: new Date(today.getTime() + resData.daysEnd * 24 * 60 * 60 * 1000),
        chambres: {
          create: resData.chambreIdxs.map(idx => ({ chambreId: chambres[idx].id }))
        }
      }
    });
  }
  console.log(`✅ Created ${reservationsData.length} reservations`);

  console.log('🎉 Database seeded successfully with extended data!');
  console.log('   - 50 Chambres (Floors 1-5, Rooms 01-10)');
  console.log('   - 20 Clients');
  console.log('   - 15 Reservations (Confirmee, EnCours, Annulee)');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
