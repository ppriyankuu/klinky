import { useEffect, useState } from 'react';
import { getAnalytics } from '@/utils/action';
import { analyticsData, itemType } from '@/utils/types';

export const Analytics = ({ shortId }: { shortId: string }) => {
  const [analyticsData, setAnalyticsData] = useState<analyticsData | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    const data = await getAnalytics(shortId);
    setAnalyticsData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAnalytics();
  }, [shortId]);

  const convertTimestampToDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // seconds to milliseconds
    return date.toLocaleString(); // formating the date and time
  };

  if (loading)
    return (
      <div className="absolute right-[20%] top-[31%] mt-2 p-4 bg-white border border-gray-300 rounded-lg shadow-lg z-10 dark:bg-gray-700 dark:border-gray-600">
        Loading...
      </div>
    );

  if (!analyticsData) {
    return;
  }

  const { totalVisits, visitedHistory } = analyticsData;

  return (
    <div className="absolute right-[20%] top-[31%] mt-2 p-4 bg-white border border-gray-300 rounded-lg shadow-lg z-10 dark:bg-gray-700 dark:border-gray-600">
      <p className="font-mono font-bold">
        Total visits:{' '}
        <span className="px-2 py-1 bg-blue-600 rounded-full">
          {totalVisits}
        </span>
      </p>
      <p className="font-mono font-bold">Timestamps</p>
      {visitedHistory?.map((item: itemType, index: number) => (
        <p className="px-1 bg-green-600 rounded-lg mb-1" key={index}>
          {convertTimestampToDate(item.timestamp)}
        </p>
      ))}
    </div>
  );
};
