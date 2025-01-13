import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const admins = await prisma.admin.findMany()
    return NextResponse.json(admins, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Não autorizado. Faça login primeiro." },
      { status: 401 }
    );
  }

  try {
    const { username, email, password } = await request.json()

    // encrypt
    const hashedPassword = await bcrypt.hash(password, 10)

    const newAdmin = await prisma.admin.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json(newAdmin, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}