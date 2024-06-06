import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const links = await prisma.url.deleteMany({});

    await prisma.visit.deleteMany({});

    return NextResponse.json(
      { message: 'data deleted', links },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'something went wrong', error: error.message },
      { status: 500 }
    );
  }
};
