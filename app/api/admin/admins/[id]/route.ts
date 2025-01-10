import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

// GET /api/admin/admins/:id
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const admin = await prisma.admin.findUnique({
      where: { id: Number(id) },
    })
    if (!admin) {
      return NextResponse.json({ error: 'Admin não encontrado' }, { status: 404 })
    }
    return NextResponse.json(admin, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT /api/admin/admins/:id
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
  const adminId = Number(params.id);
  const { username, email } = await request.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
        { error: "Não autorizado. Faça login primeiro." },
        { status: 401 }
    );
  }

  try {
    const updatedAdmin = await prisma.admin.update({
      where: { id: adminId },
      data: { username, email },
    });

    return NextResponse.json(updatedAdmin, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
        { error: "Erro ao atualizar o usuário." },
        { status: 500 }
    );
  }
}

// DELETE /api/admin/admins/:id
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const adminId = Number(params.id);

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Não autorizado. Faça login primeiro." },
      { status: 401 }
    );
  }

  try {
    await prisma.admin.delete({
      where: { id: adminId },
    });
    return NextResponse.json(
      { message: "Admin deletado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao deletar o admin." },
      { status: 500 }
    );
  }
}

