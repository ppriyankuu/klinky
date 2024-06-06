import { atom } from 'recoil';

export const inputLinkState = atom<string>({
  key: 'inputLinkState',
  default: '',
});

export const shortenedLinkState = atom<string>({
  key: 'shortenedLinkState',
  default: '',
});
