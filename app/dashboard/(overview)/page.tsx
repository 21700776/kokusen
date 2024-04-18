// import { fetchCardData } from '@/app/lib/data';
// import { Card } from '@/app/ui/dashboard/cards';
import CardWrapper from '@/app/ui/dashboard/cards';
import Latestreviews from '@/app/ui/dashboard/latest-reviews';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { NanumMyeongjo } from '@/app/ui/fonts';
import {
  CardsSkeleton,
  LatestreviewsSkeleton,
  RevenueChartSkeleton
} from '@/app/ui/skeletons';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default async function Page() {
  return (
    <main>
      <h1 className={`${NanumMyeongjo.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestreviewsSkeleton />}>
          <Latestreviews />
        </Suspense>
      </div>
    </main>
  );
}