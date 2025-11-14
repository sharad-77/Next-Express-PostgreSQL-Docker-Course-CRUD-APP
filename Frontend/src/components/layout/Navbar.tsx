'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BookOpen, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from '../ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/Courses' },
    { name: 'Create Course', href: '/NewCourse' },
  ];

  return (
    <div className="w-full flex justify-center px-4 pt-4">
      <nav className="w-full max-w-7xl border rounded-2xl bg-white z-50">
        <div className="flex h-16 items-center justify-between px-6 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            {/* Icon container */}
            <div className="flex h-9 w-9 items-center justify-center rounded-lg transition-all group-hover:scale-105 group-hover:shadow-md">
              <BookOpen className="h-5 w-5 text-black transition-colors" />
            </div>

            {/* Text */}
            <span className=" text-xl font-bold text-black transition-colors group-hover:opacity-90 ">
              MyApp
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <ul className="hidden md:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    pathname === link.href
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="default" size="sm">
              <Link href={'/login'}>Login</Link>
            </Button>
            <Button
              size="sm"
              variant="default"
              className="bg-gradient-to-r from-primary to-primary/80"
            >
              <Link href={'/signup'}>Sign Up</Link>
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white rounded-b-2xl">
            <div className="px-4 py-4 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    pathname === link.href
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="default" size="sm">
                  <Link href={'/login'}>Login</Link>
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  className="bg-gradient-to-r from-primary to-primary/80"
                >
                  <Link href={'/singup'}>Sign Up</Link>
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
