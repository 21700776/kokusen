import { handleSignOut } from '@/app/lib/actions';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function Logout() {
  return (
    <div>
    <form action={handleSignOut}>
        <button type="submit" className="flex items-center space-x-2">
            <PowerIcon className="w-4" />
            <div className="hidden sm:block">로그아웃</div>
        </button>
    </form>
    </div>
  );
}