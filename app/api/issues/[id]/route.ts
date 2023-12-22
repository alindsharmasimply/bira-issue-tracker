import { patchIssueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //   const session = await getServerSession(authOptions);
  //   if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });

  const { assignedToUserId, title, description } = body;

  if (assignedToUserId) {
    // const user = await prisma.user.findUnique({
    //   where: { id: assignedToUserId },
    // });
    // if (!user)
    //   return NextResponse.json(
    //     { error: "Invalid user." },
    //     { status: 400 }
    //   );
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
    },
  });

  return NextResponse.json(updatedIssue);
}
