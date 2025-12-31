"use server";

import {
  prisma,
  creerReservationAvecChambres,
  ajouterChambreReservation,
  supprimerChambreReservation,
  autoCloturerReservationsDuJour,
  reservationsCreeesAujourdhui,
  reservationsQuiSeTerminantAujourdhui,
  reservationExiste,
  afficherReservation,
  modifierReservation,
  supprimerReservation,
  listerReservations,
  changerEtatReservation,
} from "@/lib/hotelService.js";

export async function creerReservation({ clientId, chambreIds = [], dateDebut, dateFin }) {
  const reservation = await creerReservationAvecChambres({ clientId, chambreIds, dateDebut, dateFin });
  return { success: true, reservation };
}

export async function ajouterChambre({ reservationId, chambreId, dateDebut, dateFin }) {
  const reservation = await ajouterChambreReservation({ reservationId, chambreId, dateDebut, dateFin });
  return { success: true, reservation };
}

export async function retirerChambre({ reservationId, chambreId }) {
  await supprimerChambreReservation({ reservationId, chambreId });
  return { success: true };
}

export async function annulerReservation(reservationId) {
  await prisma.reservation.update({
    where: { id: reservationId },
    data: { etat: "Annulee" },
  });
  return { success: true };
}

export async function validerReservationParCode(code) {
  await changerEtatReservation(code, "Validee");
  return { success: true };
}

export async function annulerReservationParCode(code) {
  await changerEtatReservation(code, "Annulee");
  return { success: true };
}

export async function reservationExisteAction(code) {
  return { exists: await reservationExiste(code) };
}

export async function afficherReservationAction(code) {
  const r = await afficherReservation(code);
  return { reservation: r };
}

export async function modifierReservationAction({ code, dateDebut, dateFin, etat }) {
  const r = await modifierReservation({ code, dateDebut, dateFin, etat });
  return { reservation: r };
}

export async function supprimerReservationAction(code) {
  await supprimerReservation(code);
  return { success: true };
}

export async function listerReservationsAction() {
  const r = await listerReservations();
  return { reservations: r };
}

export async function listeReservationsDuJour() {
  const creees = await reservationsCreeesAujourdhui();
  const expirant = await reservationsQuiSeTerminantAujourdhui();
  return { creees, expirant };
}

export async function cloturerReservationsQuiExpirent() {
  const nb = await autoCloturerReservationsDuJour({ etat: "Expiree" });
  return { success: true, count: nb };
}
