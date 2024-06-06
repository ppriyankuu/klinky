'use client';

import 'react-toastify/dist/ReactToastify.css';
import { inputLinkState, shortenedLinkState } from '@/utils/atoms';
import { useRecoilState } from 'recoil';
import { toast, ToastContainer } from 'react-toastify';
import { localURI } from '@/utils/source';

export const URLForm = () => {
  const [shortenedLink, setShortenedLink] = useRecoilState(shortenedLinkState);
  const [inputLink, setInputLink] = useRecoilState(inputLinkState);

  const handleLinkShortening = async () => {
    try {
      const response = await fetch(`${localURI}/api/link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputLink }),
      });

      if (!response.ok)
        return toast('Server issue', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error',
          position: 'top-right',
        });

      const data: { id: string } = await response.json();

      setShortenedLink(`${localURI}/${data.id}`);

      toast('Link shortened!', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'success',
        position: 'top-right',
      });
    } catch (error: any) {
      console.log(error.message);
      toast('Something went wrong!', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
        position: 'top-right',
      });
    }
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

  return (
    <>
      <div className="w-full mx-auto">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter the link
          </label>
          <input
            type="email"
            onChange={(e) => setInputLink(e.target.value)}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
          {shortenedLink !== '' ? (
            <div className="bg-gray-50 mt-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex justify-between items-center">
              <h2>{shortenedLink}</h2>{' '}
              <div
                onClick={copyToClipboard}
                className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                copy
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <button
          type="submit"
          onClick={handleLinkShortening}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Shorten
        </button>
        <button
          onClick={() => {
            setInputLink('');
            setShortenedLink('');
          }}
          className="text-white mx-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          clear
        </button>
      </div>
      <ToastContainer />
    </>
  );
};
