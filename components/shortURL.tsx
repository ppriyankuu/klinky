import { shortUrlIdState, shortenedLinkState } from '@/utils/atoms';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { Analytics } from './analytics';

export const ShortURL = () => {
  const shortenedLink = useRecoilValue(shortenedLinkState);
  const shortId = useRecoilValue(shortUrlIdState);

  const [showAnalytics, setShowAnalytics] = useState<boolean>(false);

  const toggleAnalytics = () => {
    setShowAnalytics((prev) => !prev);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shortenedLink)
      .then(() => {
        toast('Link copied!', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success',
          position: 'top-right',
        });
      })
      .catch(() =>
        toast('Something went wron!', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error',
          position: 'top-right',
        })
      );
  };

  if (shortenedLink !== '')
    return (
      <div className="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex justify-between items-center">
        <h2>{shortenedLink}</h2>{' '}
        <div className="flex gap-3 items-center">
          <div
            onClick={copyToClipboard}
            className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            copy
          </div>
          <div
            onClick={toggleAnalytics}
            className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            analytics
          </div>
        </div>
        {showAnalytics && <Analytics shortId={shortId} />}
      </div>
    );
};
