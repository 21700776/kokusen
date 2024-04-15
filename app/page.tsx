import AcmeLogo from '@/app/ui/acme-logo';
import { title } from "@/components/primitives";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Progress } from "@nextui-org/react";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-center justify-center rounded-lg p-4 md:h-36">
        <div className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
				)}>
        <AcmeLogo />
        </div>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-default-100 px-6 py-10 md:w-2/5 md:px-10">
        <div className="styles.shape"/>
          <p className={`text-xl text-inherit md:text-2xl md:leading-normal`}>
            <strong>모퉁이에 오신 것을 환영합니다.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-gray-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex flex-col rounded-md bg-default-300 items-center justify-center p-6 md:w-3/5 md:px-14 md:py-12 ">
        <h1 className={title({ color: "black", size: "mt"})} >&quot;Motoongi&quot;</h1>
        <br/>
        <div className= "overflow-auto scrollbar-hide md:px-14 h-64" >
        1. 동해물과 백두산이 마르고 닳도록
하느님이 보우하사 우리나라 만세
무궁화 삼천리 화려 강산
대한 사람 대한으로 길이 보전하세
2. 남산 위에 저 소나무 철갑을 두른 듯
바람 서리 불변함은 우리 기상일세
무궁화 삼천리 화려 강산
대한 사람 대한으로 길이 보전하세
3. 가을 하늘 공활한데 높고 구름 없이
밝은 달은 우리 가슴 일편단심일세
무궁화 삼천리 화려 강산
대한 사람 대한으로 길이 보전하세
4. 이 기상과 이 맘으로 충성을 다하여
괴로우나 즐거우나 나라 사랑하세
무궁화 삼천리 화려 강산
대한 사람 대한으로 길이 보전하세
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
