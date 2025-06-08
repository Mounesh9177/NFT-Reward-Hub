'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

const NavLink = ({ href, children, className }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'text-sm font-medium transition-colors flex items-center',
        isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
        className
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
