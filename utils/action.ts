'use server';

import { prisma } from './db';

export const getAnalytics = async (shortId: string) => {
  try {
    const data = await prisma.url.findUnique({
      where: { shortId },
      include: { visitHistory: true },
    });

    if (!data) return { totalVisits: 0, visitedHistory: [{ timestamp: 0 }] };

    return {
      totalVisits: data.visitHistory.length,
      visitedHistory: data.visitHistory,
    };
  } catch (error: any) {
    console.log(error.message);
  }
};
