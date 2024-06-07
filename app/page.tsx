import { URLForm } from '@/components/urlForm';
import logo from '../public/logo.png';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col py-20 items-center justify-center w-[60%] mx-auto">
      <div className="flex font-mono font-bold items-center gap-1">
        <Image className="rounded-lg" src={logo} width={50} alt="" />
        Klinky
      </div>
      <URLForm />
    </div>
  );
}
