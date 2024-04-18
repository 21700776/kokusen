import { fetchCardData } from '@/app/lib/data';
import { NanumMyeongjo } from '@/app/ui/fonts';
import {
    BanknotesIcon,
    ClockIcon,
    InboxIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  reviews: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfreviews,
    numberOfCustomers,
    totalPaidreviews,
    totalPendingreviews,
  } = await fetchCardData();
  return (
    <>
      <Card title="Collected" value={totalPaidreviews} type="collected" />
      <Card title="Pending" value={totalPendingreviews} type="pending" />
      <Card title="Total reviews" value={numberOfreviews} type="reviews" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'reviews' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-default-100 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-600" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${NanumMyeongjo.className}
          truncate rounded-xl bg-opacity-20 bg-default-300 px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
