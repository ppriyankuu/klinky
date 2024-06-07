import {
  inputLinkState,
  shortUrlIdState,
  shortenedLinkState,
} from '@/utils/atoms';
import { localURI } from '@/utils/source';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';

export const Buttons = () => {
  const [inputLink, setInputLink] = useRecoilState(inputLinkState);
  const setShortenedLink = useSetRecoilState(shortenedLinkState);
  const setShortURLID = useSetRecoilState(shortUrlIdState);

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

      setShortURLID(data.id);
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

  return (
    <>
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
    </>
  );
};
