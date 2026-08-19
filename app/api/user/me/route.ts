import { NextResponse , NextRequest} from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";
import { checkRateLimit } from "@/app/lib/rate-limit";


// Get user
export async function GET() {
  try {

    // authenticate
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" },{ status: 401 });
    }

    // rate Limiting
    const rateLimit = await checkRateLimit(userId,"normal");
    if(!rateLimit.success){
      return Response.json({success:false , error:"Too many requests. Please try again later."},{status:429});
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    return NextResponse.json(user);

  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching user" },
      { status: 500 }
    );
  }
}


// Update User
export async function PATCH(request: NextRequest) {
  try {
    // authenticate
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" },{ status: 401 });
    }

    // rate Limiting
    const rateLimit = await checkRateLimit(userId,"normal");
    if(!rateLimit.success){
      return Response.json({success:false , error:"Too many requests. Please try again later."},{status:429});
    }

    const body = await request.json();

    const user = await prisma.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        name: body.name,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json(user);

  } catch (error) {
    return NextResponse.json(
      { error: "Error updating user" },
      { status: 500 }
    );
  }
}

// Delete User
export async function DELETE() {
  try {
    // authenticate
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" },{ status: 401 });
    }

    // rate Limiting
    const rateLimit = await checkRateLimit(userId,"normal");
    if(!rateLimit.success){
      return Response.json({success:false , error:"Too many requests. Please try again later."},{status:429});
    }

    await prisma.user.delete({
      where: {
        clerkId: userId,
      },
    });

    return NextResponse.json({
      message: "User deleted successfully",
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting user" },
      { status: 500 }
    );
  }
}



