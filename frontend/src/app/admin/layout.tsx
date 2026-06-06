"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, CalendarDays, LogOut, Home, Bed, MessageSquareQuote, Image as ImageIcon, BookOpen } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const navLinks = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/admin/rooms", label: "Rooms", icon: <Bed size={20} /> },
    { href: "/admin/bookings", label: "Bookings", icon: <CalendarDays size={20} /> },
    { href: "/admin/reviews", label: "Reviews", icon: <MessageSquareQuote size={20} /> },
    { href: "/admin/gallery", label: "Gallery", icon: <ImageIcon size={20} /> },
    { href: "/admin/blogs", label: "Blogs", icon: <BookOpen size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0908] flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#1a1815] border-r border-gray-200 dark:border-white/10 flex flex-col shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold font-serif text-xl">
            VR
          </div>
          <div>
            <h2 className="font-bold text-gray-800 dark:text-white">Admin Panel</h2>
            <p className="text-xs text-gray-500 dark:text-white/50">Vikas Residency</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-accent text-white" 
                    : "text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-white/10 space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <Home size={20} />
            <span className="font-medium">View Site</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white dark:bg-[#1a1815] border-b border-gray-200 dark:border-white/10 flex items-center px-8 shadow-sm">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            {navLinks.find((l) => l.href === pathname)?.label || "Dashboard"}
          </h1>
        </header>
        <div className="flex-1 overflow-auto p-8 text-foreground">
          {children}
        </div>
      </main>
    </div>
  );
}
