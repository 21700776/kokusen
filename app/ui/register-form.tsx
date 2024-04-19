'use client';

import { createUser } from '@/app/lib/regisaction';
import { NanumMyeongjo } from '@/app/ui/fonts';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { AtSymbolIcon, ExclamationCircleIcon, KeyIcon, UserIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from './button';

export default function RegisterForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createUser, initialState);
  const { pending } = useFormStatus();
  const router = useRouter();

  // 사용자 등록 후 처리
  if (state && state.message === 'User created successfully.') {
    // 계정 생성 성공 시 로그인 페이지로 이동
    router.push('/login');
  }

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${NanumMyeongjo.className} mb-3 text-2xl text-black`}>
          Please register to continue.
        </h1>

        {/* Name 입력 필드 */}
        <div>
          <label htmlFor="name" className="mb-3 mt-5 block text-xs font-medium text-gray-900">
            Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm"
              placeholder="Enter your name"
              required
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Email 입력 필드 */}
        <div className="mt-4">
          <label htmlFor="email" className="mb-3 block text-xs font-medium text-gray-900">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm"
              placeholder="Enter your email"
              required
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Password 입력 필드 */}
        <div className="mt-4">
          <label htmlFor="password" className="mb-3 block text-xs font-medium text-gray-900">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm"
              placeholder="Enter your password"
              required
              minLength={6}
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* 제출 버튼 */}
        <Button type="submit" className="mt-4 w-full bg-black" aria-disabled={pending}>
          Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        {/* 에러 메시지 표시 */}
        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
          {state && state.message && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state.message}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}