import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function generateCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "RES-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      include: { 
        client: true,
        chambres: { include: { chambre: true } }
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(reservations);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const reservation = await prisma.reservation.create({
      data: {
        code: generateCode(),
        clientId: data.clientId,
        dateDebut: new Date(data.dateDebut),
        dateFin: new Date(data.dateFin),
        etat: "EnCours",
        chambres: {
          create: (data.chambreIds || []).map(chambreId => ({
            chambreId
          }))
        }
      },
      include: { client: true, chambres: true }
    });
    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const reservation = await prisma.reservation.update({
      where: { id: data.id },
      data: {
        etat: data.etat,
        dateDebut: data.dateDebut ? new Date(data.dateDebut) : undefined,
        dateFin: data.dateFin ? new Date(data.dateFin) : undefined
      }
    });
    return NextResponse.json(reservation);
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id"));
    
    await prisma.reservationChambre.deleteMany({ where: { reservationId: id } });
    await prisma.reservation.delete({ where: { id } });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Erreur lors de la suppression" }, { status: 500 });
  }
}
