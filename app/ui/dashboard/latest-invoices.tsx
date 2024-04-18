import { fetchLatestreviews } from '@/app/lib/data';
import { NanumMyeongjo } from '@/app/ui/fonts';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';

export default async function Latestreviews() { // Remove props
  const latestreviews = await fetchLatestreviews();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${NanumMyeongjo.className} mb-4 text-xl md:text-2xl`}>
        <a href="dashboard/reviews">Latest reviews</a>
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl  bg-default-100 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        { <div className="rounded-xl bg-opacity-20 bg-default-300 px-6">
          {latestreviews.map((review, i) => {
            return (
              <div
                key={review.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={review.image_url}
                    alt={`${review.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {review.name}
                    </p>
                    <p className="hidden text-sm text-violet-300 sm:block">
                      {review.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`${NanumMyeongjo.className} truncate text-sm font-medium md:text-base`}
                >
                  {review.amount}
                </p>
              </div>
            );
          })}
        </div> }
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
