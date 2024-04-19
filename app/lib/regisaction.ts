'use server';

import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const CreateUserSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email format.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

export type CreateUserState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function createUser(
  prevState: CreateUserState | undefined,
  formData: FormData
): Promise<CreateUserState> {
  // formData 유효성 검사
  if (!formData) {
    return {
      message: 'Form data is missing or invalid.',
    };
  }

  // 입력 데이터 유효성 검사
  const validatedFields = CreateUserSchema.safeParse({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your input fields.',
    };
  }

  const { name, email, password } = validatedFields.data;

  // 데이터베이스에서 기존 사용자를 확인합니다.
  const existingUser = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;

  if (existingUser.rows.length > 0) {
    return {
      errors: {
        email: ['Email already in use.'],
      },
      message: 'Email already in use. Please use a different email address.',
    };
  }

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    // 데이터베이스에 새로운 사용자를 추가합니다.
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;
    return { message: 'User created successfully.',

     };
  } catch (error) {
    return {
      message: 'Database error: Failed to create user.',
    };
  }
  
  revalidatePath('/login');
  redirect('/login');
}