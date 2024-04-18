import { fetchCustomers } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/reviews/breadcrumbs';
import Form from '@/app/ui/reviews/create-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create',
};

export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Reviews', href: '/dashboard/reviews' },
          {
            label: 'Create reviews',
            href: '/dashboard/reviews/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}