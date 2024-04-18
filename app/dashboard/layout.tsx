import { Navbar } from '@/components/navbar';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <nav className="fixed top-0 w-full z-50">
            <Navbar />
      </nav>
      <div className="flex h-screen px-6 flex-col md:flex-row md:overflow-hidden">
        
        <main className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</main>
      </div>
    </div>
  );
}