"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  CalendarDays, 
  LogOut, 
  Home, 
  Bed, 
  MessageSquareQuote, 
  Image as ImageIcon, 
  BookOpen,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarContentProps {
  navLinks: any[];
  pathname: string;
  handleLogout: () => void;
  onClose?: () => void;
}

function SidebarContent({ navLinks, pathname, handleLogout, onClose }: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1815]">
      <div className="p-6 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold font-serif text-xl">
            VR
          </div>
          <div>
            <h2 className="font-bold text-gray-800 dark:text-white leading-none">Admin Panel</h2>
            <p className="text-[10px] text-gray-500 dark:text-white/50 mt-1">Vikas Residency</p>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
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
              <span className="font-medium text-sm">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-white/10 space-y-1">
        <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
          <Home size={18} />
          <span className="font-medium text-sm">View Site</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={18} />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const navLinks = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { href: "/admin/rooms", label: "Rooms", icon: <Bed size={18} /> },
    { href: "/admin/bookings", label: "Bookings", icon: <CalendarDays size={18} /> },
    { href: "/admin/reviews", label: "Reviews", icon: <MessageSquareQuote size={18} /> },
    { href: "/admin/gallery", label: "Gallery", icon: <ImageIcon size={18} /> },
    { href: "/admin/blogs", label: "Blogs", icon: <BookOpen size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0908] flex font-sans overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 border-r border-gray-200 dark:border-white/10 flex-col shadow-sm shrink-0">
        <SidebarContent navLinks={navLinks} pathname={pathname} handleLogout={handleLogout} />
      </aside>

      {/* Sidebar - Mobile Drawer */}
      <div 
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-all duration-300",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop overlay */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Sliding panel */}
        <aside 
          className={cn(
            "absolute inset-y-0 left-0 w-64 flex flex-col shadow-xl transition-transform duration-300 ease-in-out transform",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <SidebarContent 
            navLinks={navLinks} 
            pathname={pathname} 
            handleLogout={handleLogout} 
            onClose={() => setIsMobileMenuOpen(false)} 
          />
        </aside>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white dark:bg-[#1a1815] border-b border-gray-200 dark:border-white/10 flex items-center px-4 lg:px-8 justify-between lg:justify-start gap-4 shadow-sm shrink-0">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/5 focus:outline-none"
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-bold text-gray-800 dark:text-white">
            {navLinks.find((l) => l.href === pathname)?.label || "Dashboard"}
          </h1>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8 text-foreground">
          {children}
        </div>
      </main>
    </div>
  );
}

