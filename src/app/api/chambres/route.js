import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const chambres = await prisma.chambre.findMany({
      include: { reservations: true },
      orderBy: { numero: "asc" }
    });
    return NextResponse.json(chambres);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const chambre = await prisma.chambre.create({
      data: {
        numero: data.numero,
        telephone: data.telephone
      }
    });
    return NextResponse.json(chambre, { status: 201 });
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json({ message: "Ce numéro de chambre existe déjà" }, { status: 400 });
    }
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id"));
    await prisma.chambre.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Erreur lors de la suppression" }, { status: 500 });
  }
}
