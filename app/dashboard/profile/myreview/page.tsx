import { NanumMyeongjo } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Review',
};

export default async function Page() {
    return (
      <h1 className={`${NanumMyeongjo.className} mb-4 text-xl md:text-2xl`}>
        내 리뷰
      </h1>
    );
};