import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
    CustomerField,
    CustomersTableType,
    LatestreviewRaw,
    Revenue,
    User,
    reviewForm,
    reviewsTable,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestreviews() {
  noStore();
  try {
    const data = await sql<LatestreviewRaw>`
      SELECT reviews.amount, customers.name, customers.image_url, customers.email, reviews.id
      FROM reviews
      JOIN customers ON reviews.customer_id = customers.id
      ORDER BY reviews.date DESC
      LIMIT 5`;

    const latestreviews = data.rows.map((review) => ({
      ...review,
      amount: formatCurrency(review.amount),
    }));
    return latestreviews;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest reviews.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const reviewCountPromise = sql`SELECT COUNT(*) FROM reviews`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const reviewStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM reviews`;

    const data = await Promise.all([
      reviewCountPromise,
      customerCountPromise,
      reviewStatusPromise,
    ]);

    const numberOfreviews = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidreviews = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingreviews = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfreviews,
      totalPaidreviews,
      totalPendingreviews,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredreviews(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const reviews = await sql<reviewsTable>`
      SELECT
        reviews.id,
        reviews.amount,
        reviews.date,
        reviews.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM reviews
      JOIN customers ON reviews.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        reviews.amount::text ILIKE ${`%${query}%`} OR
        reviews.date::text ILIKE ${`%${query}%`} OR
        reviews.status ILIKE ${`%${query}%`}
      ORDER BY reviews.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return reviews.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch reviews.');
  }
}

export async function fetchreviewsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM reviews
    JOIN customers ON reviews.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      reviews.amount::text ILIKE ${`%${query}%`} OR
      reviews.date::text ILIKE ${`%${query}%`} OR
      reviews.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of reviews.');
  }
}

export async function fetchreviewById(id: string) {
  noStore();
  try {
    const data = await sql<reviewForm>`
      SELECT
        reviews.id,
        reviews.customer_id,
        reviews.amount,
        reviews.status
      FROM reviews
      WHERE reviews.id = ${id};
    `;

    const review = data.rows.map((review) => ({
      ...review,
      // Convert amount from cents to dollars
      amount: review.amount / 100,
    }));

    return review[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch review.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(reviews.id) AS total_reviews,
		  SUM(CASE WHEN reviews.status = 'pending' THEN reviews.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN reviews.status = 'paid' THEN reviews.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN reviews ON customers.id = reviews.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}