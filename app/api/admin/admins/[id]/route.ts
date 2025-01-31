import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Não autorizado. Faça login primeiro." }, { status: 401 })
  }

  try {
    const id = (await params).id
    const admin = await prisma.admin.findUnique({
      where: { id: Number(id) },
    })
    if (!admin) {
      return NextResponse.json({ error: "Admin não encontrado" }, { status: 404 })
    }
    return NextResponse.json(admin)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Não autorizado. Faça login primeiro." }, { status: 401 })
  }

  try {
    const id = (await params).id
    const adminId = Number(id)
    await prisma.admin.delete({
      where: { id: adminId },
    })
    return NextResponse.json({ message: "Admin deletado com sucesso" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Erro ao deletar o admin." }, { status: 500 })
  }
}