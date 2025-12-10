/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                         📦 DONNÉES & UTILITAIRES                          ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Ce fichier contient :                                                    ║
 * ║  • Les données des hôtels (mock data)                                     ║
 * ║  • Les fonctions de recherche                                             ║
 * ║  • Les utilitaires (formatage, classes CSS)                               ║
 * ║  • Les destinations et caractéristiques                                   ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ─────────────────────────────────────────────────────────────────────────────
// 🔧 UTILITAIRES
// ─────────────────────────────────────────────────────────────────────────────

/** Combine les classes CSS intelligemment avec Tailwind */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Formate un montant en Dirhams Marocains */
export function formatMAD(montant) {
  return new Intl.NumberFormat("fr-MA", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(montant) + " MAD";
}

// ─────────────────────────────────────────────────────────────────────────────
// 🏨 LISTE DES HÔTELS
// ─────────────────────────────────────────────────────────────────────────────

export const HOTELS = [
  {
    id: "hotel-1",
    name: "The Grand Atlas",
    description: "Resort de luxe en bord de mer avec vue panoramique sur l'océan et spa de classe mondiale.",
    city: "Casablanca",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    rating: 4.9,
    featured: true,
    amenities: ["Spa", "Piscine", "Restaurant", "WiFi", "Parking"],
    rooms: [
      { id: "r1a", name: "Standard", type: "Standard", price: 850, maxGuests: 2 },
      { id: "r1b", name: "Double", type: "Double", price: 1200, maxGuests: 3 },
      { id: "r1c", name: "Suite", type: "Suite", price: 2500, maxGuests: 4 },
    ],
  },
  {
    id: "hotel-2",
    name: "Riad Moonlight",
    description: "Riad traditionnel marocain au cœur de la médina avec décoration authentique.",
    city: "Marrakech",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
    rating: 4.8,
    featured: true,
    amenities: ["Hammam", "Terrasse", "Petit-déjeuner", "WiFi"],
    rooms: [
      { id: "r2a", name: "Chambre Traditionnelle", type: "Standard", price: 650, maxGuests: 2 },
      { id: "r2b", name: "Chambre Jardin", type: "Double", price: 950, maxGuests: 3 },
      { id: "r2c", name: "Suite Sultan", type: "Suite", price: 1800, maxGuests: 4 },
    ],
  },
  {
    id: "hotel-3",
    name: "Azure Bay Resort",
    description: "Éco-resort moderne surplombant la Méditerranée avec pratiques durables.",
    city: "Tanger",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
    rating: 4.7,
    featured: false,
    amenities: ["Plage privée", "Restaurant bio", "Yoga", "WiFi"],
    rooms: [
      { id: "r3a", name: "Chambre Éco", type: "Standard", price: 720, maxGuests: 2 },
      { id: "r3b", name: "Chambre Vue Mer", type: "Double", price: 1100, maxGuests: 3 },
      { id: "r3c", name: "Villa Falaise", type: "Suite", price: 3200, maxGuests: 5 },
    ],
  },
  {
    id: "hotel-4",
    name: "Desert Oasis Lodge",
    description: "Camp de luxe dans le désert avec observation des étoiles et excursions.",
    city: "Merzouga",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    rating: 4.95,
    featured: true,
    amenities: ["Excursions chameau", "Feu de camp", "Dîner berbère", "WiFi"],
    rooms: [
      { id: "r4a", name: "Tente Standard", type: "Standard", price: 580, maxGuests: 2 },
      { id: "r4b", name: "Tente Deluxe", type: "Double", price: 900, maxGuests: 3 },
      { id: "r4c", name: "Suite Royale", type: "Suite", price: 2200, maxGuests: 4 },
    ],
  },
  {
    id: "hotel-5",
    name: "Mountain Retreat",
    description: "Hôtel boutique dans la Ville Bleue avec vues sur les montagnes du Rif.",
    city: "Chefchaouen",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
    rating: 4.6,
    featured: false,
    amenities: ["Terrasse panoramique", "Randonnées", "Artisanat local", "WiFi"],
    rooms: [
      { id: "r5a", name: "Chambre Bleue", type: "Standard", price: 450, maxGuests: 2 },
      { id: "r5b", name: "Chambre Panorama", type: "Double", price: 680, maxGuests: 3 },
      { id: "r5c", name: "Loft Artiste", type: "Suite", price: 1200, maxGuests: 4 },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 🔍 FONCTIONS DE RECHERCHE
// ─────────────────────────────────────────────────────────────────────────────

/** Recherche des hôtels par ville ou nom */
export function searchHotels(filtre) {
  const ville = typeof filtre === "string" ? filtre : filtre?.city;
  if (!ville) return HOTELS;
  const terme = ville.toLowerCase();
  return HOTELS.filter(
    (h) => h.city.toLowerCase().includes(terme) || h.name.toLowerCase().includes(terme)
  );
}

/** Récupère un hôtel par son ID */
export function getHotelById(id) {
  return HOTELS.find((h) => h.id === id);
}

// ─────────────────────────────────────────────────────────────────────────────
// 📅 RÉSERVATIONS MOCK
// ─────────────────────────────────────────────────────────────────────────────

/** Génère des réservations de démonstration */
export function getMockBookings() {
  const now = new Date();
  return [
    {
      id: "booking-1",
      hotel: HOTELS[0],
      room: HOTELS[0].rooms[1],
      guests: 2,
      checkIn: formatDate(addDays(now, 7)),
      checkOut: formatDate(addDays(now, 10)),
      totalPrice: HOTELS[0].rooms[1].price * 3,
      status: "confirmed",
    },
    {
      id: "booking-2",
      hotel: HOTELS[1],
      room: HOTELS[1].rooms[0],
      guests: 2,
      checkIn: formatDate(addDays(now, -30)),
      checkOut: formatDate(addDays(now, -27)),
      totalPrice: HOTELS[1].rooms[0].price * 3,
      status: "completed",
    },
  ];
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date) {
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

// ─────────────────────────────────────────────────────────────────────────────
// 🗺️ DESTINATIONS POPULAIRES
// ─────────────────────────────────────────────────────────────────────────────

export const DESTINATIONS = [
  { city: "Marrakech", image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=400", hotels: 12 },
  { city: "Casablanca", image: "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=400", hotels: 8 },
  { city: "Chefchaouen", image: "https://images.unsplash.com/photo-1553522991-71439aa62779?w=400", hotels: 5 },
  { city: "Tanger", image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400", hotels: 6 },
];

// ─────────────────────────────────────────────────────────────────────────────
// ✨ CARACTÉRISTIQUES DE L'APP
// ─────────────────────────────────────────────────────────────────────────────

export const FEATURES = [
  { icon: "🏨", title: "Hôtels de luxe", description: "Une sélection des meilleurs établissements au Maroc." },
  { icon: "💳", title: "Réservation instantanée", description: "Confirmez votre séjour en quelques clics." },
  { icon: "🔒", title: "Paiement sécurisé", description: "Vos transactions sont protégées à 100%." },
];
