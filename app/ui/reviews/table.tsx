import { fetchFilteredreviews } from '@/app/lib/data';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';
import { Deletereview, Updatereview } from '@/app/ui/reviews/buttons';
import Image from 'next/image';

export default async function reviewsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const reviews = await fetchFilteredreviews(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {reviews?.map((review) => (
              <div
                key={review.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={review.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${review.name}'s profile picture`}
                      />
                      <p>{review.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{review.email}</p>
                  </div>
                  <reviewStatus status={review.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(review.amount)}
                    </p>
                    <p>{formatDateToLocal(review.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Updatereview id={review.id} />
                    <Deletereview id={review.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {reviews?.map((review) => (
                <tr
                  key={review.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={review.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${review.name}'s profile picture`}
                      />
                      <p>{review.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {review.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(review.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(review.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <reviewStatus status={review.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <Updatereview id={review.id} />
                      <Deletereview id={review.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
