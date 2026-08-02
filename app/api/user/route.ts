import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (existingUser) {
      return NextResponse.json(existingUser);
    }

    const user = await prisma.user.create({
      data: {
        clerkId: userId,
        email: body.email,
        name: body.name,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json(user, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: "Error creating user" },
      { status: 500 }
    );
  }
}