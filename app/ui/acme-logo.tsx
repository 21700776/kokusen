import { NanumMyeongjo } from '@/app/ui/fonts';
import { JuKaiLogo } from "@/components/icons";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import Link from 'next/link';


export default function AcmeLogo() {
  return (
    <div 
      className={`${NanumMyeongjo.className} flex justify-center items-center leading-none text-white`}
    >
      <Link className="flex justify-center items-center gap-1" href="/">
						<JuKaiLogo width={36} height={36} />
						<p className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}>Jujutsu Kaisen</p>
			</Link>
    </div>
  );
}
