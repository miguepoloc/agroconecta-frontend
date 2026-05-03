"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, Users, Sprout, LogOut,
  Menu, ChevronRight, Package, Leaf,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const adminNav: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pedidos", label: "Pedidos", icon: ShoppingBag },
  { href: "/admin/agricultores", label: "Agricultores", icon: Users },
];

const agricultorNav: NavItem[] = [
  { href: "/agricultor/panel", label: "Mi Panel", icon: LayoutDashboard },
  { href: "/catalogo", label: "Ver Catálogo", icon: Package },
];

const institucionNav: NavItem[] = [
  { href: "/institucional", label: "Portal", icon: LayoutDashboard },
  { href: "/catalogo", label: "Comprar", icon: ShoppingBag },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const navItems =
    user?.role === "admin"
      ? adminNav
      : user?.role === "agricultor"
      ? agricultorNav
      : institucionNav;

  function handleLogout() {
    logout();
    router.push("/");
    onNavigate?.();
  }

  return (
    <div className="flex flex-col h-full bg-surface-container-low border-r border-outline-variant">
      {/* Logo */}
      <div className="p-6 border-b border-outline-variant">
        <Link href="/" className="flex items-center gap-2" onClick={onNavigate}>
          <Sprout className="w-5 h-5 text-primary" />
          <span className="font-epilogue font-bold text-lg text-primary">
            Agro<span className="text-secondary">Conecta</span>
          </span>
        </Link>
      </div>

      {/* User */}
      {user && (
        <div className="p-4 border-b border-outline-variant">
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-primary text-on-primary text-xs">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-medium text-sm text-on-surface truncate">{user.name}</p>
              <p className="text-xs text-on-surface-variant capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-on-primary"
                  : "text-on-surface hover:bg-surface-container"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
              {active && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-outline-variant">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-error hover:bg-error-container w-full transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet>
        <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-surface border-b border-outline-variant h-14 flex items-center px-4 gap-3">
          <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            <span className="font-epilogue font-bold text-primary">AgroConecta</span>
          </Link>
        </div>
        <SheetContent side="left" className="p-0 w-60">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Content */}
      <main className="flex-1 min-w-0 lg:pt-0 pt-14">
        {children}
      </main>
    </div>
  );
}
