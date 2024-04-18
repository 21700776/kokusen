import { Navbar } from '@/components/navbar';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex h-screen px-6 flex-col md:flex-row md:overflow-hidden">
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    </div>
  );
}