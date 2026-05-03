"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Menu, LogOut, LayoutDashboard, Sprout } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/institucional", label: "Institucional" },
  { href: "/lote/LOT-2026-0501-PC", label: "Trazabilidad" },
];

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
  }

  const dashboardHref =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "agricultor"
      ? "/agricultor/panel"
      : user?.role === "institucion"
      ? "/institucional"
      : "/catalogo";

  return (
    <header className="sticky top-0 z-50 bg-primary text-on-primary shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Sprout className="w-6 h-6 text-secondary-container" />
          <span className="font-epilogue font-bold text-xl tracking-tight">
            Agro<span className="text-secondary-container">Conecta</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-on-primary/80 hover:text-on-primary text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link href="/carrito" className="relative">
            <Button variant="ghost" size="icon" className="text-on-primary hover:bg-primary-container">
              <ShoppingCart className="w-5 h-5" />
            </Button>
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-secondary-container text-on-secondary-container text-xs rounded-full border-0 pointer-events-none">
                {totalItems > 9 ? "9+" : totalItems}
              </Badge>
            )}
          </Link>

          {/* Auth */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container bg-transparent border-0 cursor-pointer p-0">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary-container text-on-primary-container text-xs">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="font-medium text-sm truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={dashboardHref} className="flex items-center gap-2 w-full">
                    <LayoutDashboard className="w-4 h-4" />
                    Mi panel
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants({ size: "sm" }),
                "hidden md:inline-flex bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim font-semibold border-0"
              )}
            >
              Iniciar sesión
            </Link>
          )}

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger className="md:hidden">
              <Button variant="ghost" size="icon" className="text-on-primary hover:bg-primary-container">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-surface w-72">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-on-surface font-medium text-lg py-2 border-b border-outline-variant"
                  >
                    {link.label}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <Link
                    href="/login"
                    className={cn(buttonVariants(), "mt-4 bg-primary text-on-primary w-full justify-center")}
                  >
                    Iniciar sesión
                  </Link>
                )}
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className={cn(buttonVariants({ variant: "outline" }), "mt-4 text-destructive border-destructive w-full justify-center")}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
