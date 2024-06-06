import { NextRequest, NextResponse } from 'next/server';
import { generateLinkBody, getAnalyticsBody } from '@/utils/types';
import { prisma } from '@/utils/db';
import { nanoid } from 'nanoid';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { success, data } = generateLinkBody.safeParse(body);

    if (!success)
      return NextResponse.json({ message: 'invalid input' }, { status: 401 });

    if (!data.url || data.url === '')
      return NextResponse.json({ message: 'invalid input' }, { status: 401 });

    const shortId = nanoid();

    const shortURL = await prisma.url.create({
      data: {
        shortId,
        redirectURL: data.url,
      },
    });

    return NextResponse.json({ id: shortURL.shortId }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'something went wrong', error: error.message },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl;
    const shortId = searchParams.get('shortId');

    const { success } = getAnalyticsBody.safeParse({ shortId });

    if (!success)
      return NextResponse.json({ message: 'invalid input' }, { status: 401 });

    if (!shortId)
      return NextResponse.json({ message: 'invalid input' }, { status: 401 });

    const foundURL = await prisma.url.findUnique({
      where: { shortId },
      include: { visitHistory: true },
    });

    return NextResponse.json(
      {
        totalClicks: foundURL?.visitHistory.length,
        analytics: foundURL?.visitHistory,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'something went wrong', error: error.message },
      { status: 500 }
    );
  }
};
