'use server';

import { signIn, signOut } from '@/auth';
import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
      invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
      invalid_type_error: 'Please select an review status.',
    }),
    date: z.string(),
  });

const Createreview = FormSchema.omit({ id: true, date: true });
const Updatereview = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
  };

export async function createreview(prevState: State, formData: FormData) {
    const validatedFields = Createreview.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create review.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
    await sql`
        INSERT INTO reviews (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    } catch (error) {
    return {
        message: 'Database Error: Failed to Create review.',
    };
    }

    revalidatePath('/dashboard/reviews');
    redirect('/dashboard/reviews');
}

export async function updatereview(
    id: string,
    prevState: State,
    formData: FormData,
  ) {
    const validatedFields = Updatereview.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update review.',
      };
    }
   
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
   
    try {
      await sql`
        UPDATE reviews
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
    } catch (error) {
      return { message: 'Database Error: Failed to Update review.' };
    }
   
    revalidatePath('/dashboard/reviews');
    redirect('/dashboard/reviews');
  }

export async function deletereview(id: string) {

    try {
    await sql`DELETE FROM reviews WHERE id = ${id}`;
    revalidatePath('/dashboard/reviews');
    return { message: 'Deleted review.' };
    } catch (error) {
    return { message: 'Database Error: Failed to Delete review.' };
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }

  export async function handleSignOut() {
    await signOut();
}