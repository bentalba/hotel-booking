/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                         📋 PAGE MES RÉSERVATIONS                           ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Affiche la liste des réservations de l'utilisateur :                     ║
 * ║  • Réservations à venir                                                   ║
 * ║  • Historique des séjours                                                 ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { getMockBookings, formatMAD } from "@/lib/donnees.js";
import { Card, CardContent, Badge, Button, Skeleton } from "@/composants.jsx";

// ─────────────────────────────────────────────────────────────────────────────
// 🎫 CARTE DE RÉSERVATION
// ─────────────────────────────────────────────────────────────────────────────

function CarteReservation({ reservation }) {
  const couleurStatut = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-gray-100 text-gray-800",
  };

  const labelStatut = {
    confirmed: "✅ Confirmée",
    pending: "⏳ En attente",
    cancelled: "❌ Annulée",
    completed: "✓ Terminée",
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/3 h-48 md:h-auto">
          <img
            src={reservation.hotel.image}
            alt={reservation.hotel.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Détails */}
        <CardContent className="flex-1 p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold text-lg">{reservation.hotel.name}</h3>
              <p className="text-sm text-gray-500">📍 {reservation.hotel.city}</p>
            </div>
            <Badge className={couleurStatut[reservation.status]}>
              {labelStatut[reservation.status]}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <span className="text-gray-500">Arrivée</span>
              <p className="font-medium">{reservation.checkIn}</p>
            </div>
            <div>
              <span className="text-gray-500">Départ</span>
              <p className="font-medium">{reservation.checkOut}</p>
            </div>
            <div>
              <span className="text-gray-500">Chambre</span>
              <p className="font-medium">{reservation.room.name}</p>
            </div>
            <div>
              <span className="text-gray-500">Voyageurs</span>
              <p className="font-medium">{reservation.guests} personne(s)</p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div>
              <span className="text-sm text-gray-500">Total payé</span>
              <p className="text-xl font-bold text-emerald-600">{formatMAD(reservation.totalPrice)}</p>
            </div>
            {reservation.status === "confirmed" && (
              <Button variant="outline" className="text-red-600 hover:bg-red-50">
                Annuler
              </Button>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 📋 LISTE DES RÉSERVATIONS
// ─────────────────────────────────────────────────────────────────────────────

function ListeReservations() {
  const { user, isLoaded } = useUser();
  const reservations = getMockBookings();

  if (!isLoaded) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-32 w-full" />
          </Card>
        ))}
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="p-12 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h3 className="text-xl font-semibold mb-2">Connexion requise</h3>
        <p className="text-gray-500 mb-4">Connectez-vous pour voir vos réservations</p>
      </Card>
    );
  }

  if (reservations.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-semibold mb-2">Aucune réservation</h3>
        <p className="text-gray-500 mb-4">Vous n'avez pas encore de réservations</p>
        <Button asChild>
          <Link href="/recherche">🔍 Rechercher un hôtel</Link>
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <CarteReservation key={reservation.id} reservation={reservation} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 🚀 EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export default function PageReservations() {
  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline">← Retour</Button>
        </Link>
        <h1 className="text-2xl font-bold">📋 Mes réservations</h1>
      </div>

      {/* Liste */}
      <ListeReservations />
    </div>
  );
}
