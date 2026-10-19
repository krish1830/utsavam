import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activePlacement: string;
  onSelectPlacement: (placement: string) => void;
  onScrollToSection: (sectionId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onScrollToSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EBE7DF] transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 lg:px-10 h-18">
        
        {/* Zone 1: Single text element wordmark with letterspaced elegance */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl lg:text-2xl font-display font-medium tracking-[0.16em] uppercase text-[#1C1815] hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 text-left focus:outline-none"
        >
          Utsavam
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wide text-[#59524A]">
          <button
            onClick={() => onScrollToSection('collection-dashboard')}
            className="hover:text-[#1C1815] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#1C1815]"
          >
            Car Dashboards
          </button>
          <button
            onClick={() => onScrollToSection('collection-pooja')}
            className="hover:text-[#1C1815] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#1C1815]"
          >
            Pooja Altars
          </button>
          <button
            onClick={() => onScrollToSection('collection-desk')}
            className="hover:text-[#1C1815] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#1C1815]"
          >
            Desk Studies
          </button>
          <button
            onClick={() => onScrollToSection('placement-guide')}
            className="hover:text-[#1C1815] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#1C1815]"
          >
            Placement Guide
          </button>
          <button
            onClick={() => onScrollToSection('craftsmanship')}
            className="hover:text-[#1C1815] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#1C1815]"
          >
            Metallurgy
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label={`Shopping Bag with ${cartCount} items`}
            className="flex items-center gap-2 px-3.5 py-2 text-xs tracking-wider text-[#1C1815] bg-transparent hover:bg-[#EFEBE3] border border-[#DDD7CD] rounded transition-all whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="font-medium">Bag</span>
            <span className="font-mono text-xs tabular-nums font-semibold">
              [{cartCount}]
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
