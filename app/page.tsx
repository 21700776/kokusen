import AcmeLogo from '@/app/ui/acme-logo';
import { title } from "@/components/primitives";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Progress } from "@nextui-org/react";
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-center justify-center rounded-lg bg-gradient-to-b from-[#e8daab] to-[#f4f3ed] p-4 md:h-36">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-10">
        <div className="styles.shape"/>
          <p className={`text-xl text-gray-800 md:text-4xl md:leading-normal`}>
            <strong>모퉁이에 오신 것을 환영합니다.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex flex-col rounded-md bg-gradient-to-b from-[#878683] to-[#fcfbf9] items-center justify-center p-6 md:w-3/5 md:px-14 md:py-12 ">
        <h1 className={title({ color: "black", size: "mt"})} >&quot;Motoongi&quot;</h1>
        <br/>
        <div className= "overflow-auto scrollbar-hide md:px-14 h-64" >
        글 추가하면 스크롤 생김 아마도 아마도 아마도 아마도
        </div>
        <br/>
        <Progress
        color="default"
      size="sm"
      isIndeterminate
      aria-label="Loading..."
      className="max-w-md"
    />
        </div>
      </div>
    </main>
  );
}
