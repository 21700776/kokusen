import SideNav from '@/app/ui/dashboard/sidenav';
import { Navbar } from '@/components/navbar';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      {/* 상단에 Navbar를 추가 */}
      <Navbar />
      <div className="flex h-screen px-6 flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    </div>

 
  );
}