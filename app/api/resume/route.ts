import { NextResponse , NextRequest} from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";
import { checkRateLimit } from "@/app/lib/rate-limit";

// POST Resume
export async function POST(request: NextRequest) {
  try {

    // authenticate
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({success:false , error: "Unauthorized" },{ status: 401 });
    }

    // rate limiting
    const rateLimit = await checkRateLimit(userId , "builder");
    if(!rateLimit.success){
      return Response.json({success:false , error:"Too many requests. Please try again later."},{status:429});
    }


    const body = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json({error:"User not found"}, {status:404});
    }

    const existingResume = await prisma.resume.findFirst({
      where: {
        userId: existingUser.id,
      },
    });
    if(existingResume){
      return NextResponse.json({error:"You already have a resume."},{status:400});
    }

    const resume = await prisma.resume.create({
      data: {
        userId: existingUser.id,
        title:body.title,
        template:body.template,
        profileImage:body.profileImage,
        profileImagePublicId:body.profileImagePublicId,
        resumePdf:body.resumePdf,
        resumePdfPublicId:body.resumePdfPublicId,
        content: body.content,
      },
    });

    return NextResponse.json(resume, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: "Error creating resume" },
      { status: 500 }
    );
  }
}

// Get resume
export async function GET() {
  try {

    // authenticate
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ success:false ,error: "Unauthorized" },{ status: 401 });
    }

    // rate limiting
    const rateLimit = await checkRateLimit(userId , "normal");
    if(!rateLimit.success){
      return Response.json({success:false , error:"Too many requests. Please try again later."},{status:429});
    }
    
    console.log("1. Clerk user:", userId);
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      include: {
        resumes: true,
      },
    });


    if (!user) {
      return NextResponse.json({error:"User not found"}, {status:404});
    }

    console.log("2. User:", user);
    const resume = await prisma.resume.findFirst({
      where:{
        userId: user.id,
      },
      include:{
        analysis: true,
      },
    })

    console.log("3. Resume:", resume);
    return NextResponse.json(resume);


  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching resumes" },
      { status: 500 }
    );
  }
}


// Update resume
export async function PATCH(request: NextRequest) {
  try {
    // authenticate
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ success:false ,error: "Unauthorized" },{ status: 401 });
    }

    // rate limiting
    const rateLimit = await checkRateLimit(userId , "builder");
    if(!rateLimit.success){
      return Response.json({success:false , error:"Too many requests. Please try again later."},{status:429});
    }



    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json({error:"User not found"}, {status:404});
    }

    const body = await request.json();

    const existingResume = await  prisma.resume.findUnique({
        where: {
            id: body.resumeId,
        },
    });

    if(!existingResume){
        return NextResponse.json({error: "Resume not found"},{status:404});
    }

    if(existingResume.userId !== existingUser.id){
        return NextResponse.json({error:"Forbidden"},{status:403});
    }

  const updated_resume = await prisma.resume.update({
  where: {
    id: body.resumeId,
  },

  data: {

    ...(body.title && {
      title: body.title,
    }),

    ...(body.template && {
      template: body.template,
    }),

    ...(body.profileImage && {
      profileImage: body.profileImage,
    }),

    ...(body.profileImagePublicId && {
      profileImagePublicId: body.profileImagePublicId,
    }),

    ...(body.resumePdf && {
      resumePdf: body.resumePdf,
    }),

    ...(body.resumePdfPublicId && {
      resumePdfPublicId: body.resumePdfPublicId,
    }),

    ...(body.content && {
      content: body.content,
    }),

  },
});

    return NextResponse.json(updated_resume);

  } catch (error) {
    return NextResponse.json(
      { error: "Error updating resume" },
      { status: 500 }
    );
  }
}

// Delete resume
export async function DELETE(request:NextRequest) {
  try {
    // authenticate
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ success:false ,error: "Unauthorized" },{ status: 401 });
    }

    // rate limiting
    const rateLimit = await checkRateLimit(userId , "builder");
    if(!rateLimit.success){
      return Response.json({success:false , error:"Too many requests. Please try again later."},{status:429});
    }



    const existingUser = await prisma.user.findUnique({
        where:{
            clerkId:userId,
        },
    });

    if(!existingUser){
        return NextResponse.json({error:"User not found"},{status:404});
    }

    const body = await request.json();

    const existingResume = await  prisma.resume.findUnique({
        where: {
            id: body.resumeId,
        },
    });

    if(!existingResume){
        return NextResponse.json({error: "Resume not found"},{status:404});
    }

    if(existingResume.userId !== existingUser.id){
        return NextResponse.json({error:"Forbidden"},{status:403});
    }
    
    await prisma.resume.delete({
      where: {
        id: body.resumeId,
      },
    });

    return NextResponse.json({
      message: "Resume deleted successfully",
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting resume" },
      { status: 500 }
    );
  }
}



