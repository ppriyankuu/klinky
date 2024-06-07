'use client';

import 'react-toastify/dist/ReactToastify.css';
import { inputLinkState } from '@/utils/atoms';
import { useRecoilState } from 'recoil';
import { ToastContainer } from 'react-toastify';
import { ShortURL } from './shortURL';
import { Buttons } from './buttons';

export const URLForm = () => {
  const [inputLink, setInputLink] = useRecoilState(inputLinkState);

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
            type="text"
            value={inputLink}
            onChange={(e) => setInputLink(e.target.value)}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@something.com"
            required
          />
          <ShortURL />
        </div>
        <Buttons />
      </div>
      <ToastContainer />
    </>
  );
};
