import { NanumMyeongjo } from '@/app/ui/fonts';
import { JuKaiLogo } from "@/components/icons";
import Link from 'next/link';


export default function AcmeLogo() {
  return (
    <div 
      className={`${NanumMyeongjo.className} flex justify-center items-center leading-none text-white`}
    >
      <Link className="flex justify-center items-center gap-1" href="/">
						<JuKaiLogo width={36} height={36} alt={""}/>
						<p className="font-bold text-inherit">Motoongi</p>
			</Link>
    </div>
  );
}
