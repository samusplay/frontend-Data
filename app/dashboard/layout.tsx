import { ReactNode } from "react";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { ThemeToggle } from "./components/ThemeToggle";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] flex flex-col md:flex-row text-zinc-900 dark:text-white transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Fixed ThemeToggle on every page */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}