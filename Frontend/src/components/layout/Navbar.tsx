'use client';

import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { BookOpen, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from '../ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const auth = useAuthContext();
  if (!auth) return null;
  const { isAuthenticated, logout, loading } = auth;

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/Courses' },
    { name: 'Create Course', href: '/NewCourse' },
  ];

  return (
    <div className="w-full flex justify-center px-4 pt-4">
      <nav className="w-full max-w-7xl border rounded-2xl bg-background shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80 z-50 transition-colors">

        <div className="flex h-16 items-center justify-between px-6 md:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg group-hover:scale-105 transition-all">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold">MyApp</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {loading ? (
              <span className="text-sm text-muted-foreground">Checking...</span>
            ) : isAuthenticated ? (
              <Button variant="destructive" size="sm" onClick={logout}>
                Logout
              </Button>
            ) : (
              <>
                <Button size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>

                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary to-primary/80 text-white"
                  asChild
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}

            <ThemeToggle />
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t rounded-b-2xl bg-background animate-slideDown">
            <div className="px-4 py-4 space-y-2">

              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block rounded-md px-4 py-2 text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 space-y-2">
                {loading ? (
                  <span className="text-sm text-muted-foreground">Checking...</span>
                ) : isAuthenticated ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button size="sm" className="w-full" asChild>
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        Login
                      </Link>
                    </Button>

                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-primary to-primary/80 text-white"
                      asChild
                    >
                      <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </>
                )}

                <div className="flex justify-start">
                  <ThemeToggle />
                </div>
              </div>

            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
