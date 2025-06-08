import Link from 'next/link';
import { LayersIcon, LayoutDashboard, FileTextIcon } from 'lucide-react';
import NavLink from './NavLink';

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
          <LayersIcon className="h-7 w-7" />
          <h1 className="text-2xl font-headline font-semibold">NFT Reward Hub</h1>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <NavLink href="/">
            <LayoutDashboard className="h-5 w-5 sm:mr-1" />
            <span className="hidden sm:inline">Dashboard</span>
          </NavLink>
          <NavLink href="/documentation">
            <FileTextIcon className="h-5 w-5 sm:mr-1" />
            <span className="hidden sm:inline">Docs</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
