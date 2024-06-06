import { prisma } from '@/utils/db';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  _req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  try {
    const shortId = params.slug;

    const url = await prisma.url.findUnique({
      where: { shortId },
      include: { visitHistory: true },
    });

    if (!url) {
      return NextResponse.json({ message: 'URL not found' }, { status: 404 });
    }

    const currentTimeStamp = Math.floor(Date.now() / 1000);

    // url?.visitHistory.push({
    //   urlId: url.id,
    //   timestamp: currentTimeStamp,
    //   id: nanoid(),
    // });

    await prisma.visit.create({
      data: {
        urlId: url.id,
        timestamp: currentTimeStamp,
        id: nanoid(),
      },
    });

    return NextResponse.redirect(url.redirectURL);
  } catch (error: any) {
    return NextResponse.json(
      { message: 'something went wrong', error: error.message },
      { status: 500 }
    );
  }
};
