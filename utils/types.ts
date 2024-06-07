import { object, string } from 'zod';

export const generateLinkBody = object({ url: string() });

export const getAnalyticsBody = object({ shortId: string() });

export type analyticsData = {
  totalVisits: number;
  visitedHistory:
    | {
        id: string;
        timestamp: number;
        urlId: string;
      }[]
    | { timestamp: number }[];
};

export type itemType =
  | {
      id: string;
      timestamp: number;
      urlId: string;
    }
  | { timestamp: number };
