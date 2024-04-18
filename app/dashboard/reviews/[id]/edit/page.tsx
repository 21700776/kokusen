import { fetchCustomers, fetchreviewById } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/reviews/breadcrumbs';
import Form from '@/app/ui/reviews/edit-form';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Reviews',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [review, customers] = await Promise.all([
    fetchreviewById(id),
    fetchCustomers(),
  ]);

  if (!review) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Reviews', href: '/dashboard/reviews' },
          {
            label: 'Edit Reviews',
            href: `/dashboard/reviews/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form review={review} customers={customers} />
    </main>
  );
}