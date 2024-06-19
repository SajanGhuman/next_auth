// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import bigintToString from '../../../../utils/bigintToString';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password, name, role } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Email already in use' }, { status: 400 });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'USER', // default to USER if role is not provided
      },
    });

    // Convert BigInt values to strings
    const userResponse = bigintToString(user);

    return NextResponse.json({ message: 'User created successfully', user: userResponse }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

