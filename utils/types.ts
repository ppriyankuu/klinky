import { object, string } from 'zod';

export const generateLinkBody = object({ url: string() });

export const getAnalyticsBody = object({ shortId: string() });
