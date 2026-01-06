import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      include: { reservations: true },
      orderBy: { nom: "asc" }
    });
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const client = await prisma.client.create({
      data: {
        nom: data.nom,
        prenom: data.prenom,
        adresse: data.adresse
      }
    });
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id"));
    await prisma.client.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Erreur lors de la suppression" }, { status: 500 });
  }
}
