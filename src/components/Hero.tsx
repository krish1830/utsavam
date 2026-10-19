import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onSelectPlacement: (placement: string) => void;
  onScrollToCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectPlacement,
  onScrollToCatalog,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] border-b border-[#EBE7DF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Minimalist Editorial Kicker */}
            <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase text-[#786F66] mb-5">
              <span>Sacred Foundry Series</span>
              <span aria-hidden="true">/</span>
              <span>100% Solid Cast Bronze & Brass</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium tracking-tight text-[#171412] leading-[1.12] mb-6 [text-wrap:balance]">
              Miniature Sacred Murtis for Dashboards, Altars & Workspaces.
            </h1>

            <p className="text-base sm:text-lg text-[#5A524A] leading-relaxed mb-10 max-w-xl font-light">
              Engineered with a weighted low center of mass for sharp braking and highway curves, canonical proportions for pooja niches, and quiet tactile presence for study tables.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                onClick={() => {
                  onSelectPlacement('car-dashboard');
                  onScrollToCatalog();
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 text-xs tracking-wider uppercase font-semibold text-[#FAF8F5] bg-[#171412] hover:bg-[#302B27] active:scale-[0.99] rounded transition-all whitespace-nowrap"
              >
                <span>Dashboard Idols</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4C3A3]" />
              </button>

              <button
                onClick={() => {
                  onSelectPlacement('pooja-room');
                  onScrollToCatalog();
                }}
                className="px-6 py-3.5 text-xs tracking-wider uppercase font-medium text-[#171412] bg-transparent hover:bg-[#EFEBE3] border border-[#DDD7CD] rounded transition-colors whitespace-nowrap"
              >
                <span>Pooja Altars</span>
              </button>
            </div>

            {/* Restrained metadata strip */}
            <div className="pt-6 border-t border-[#EAE5DB] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#786F66]">
              <span>Virgin Bell-Brass & Lost-Wax Bronze</span>
              <span aria-hidden="true">·</span>
              <span>3M Heat-Resistant Automotive Pad Included</span>
              <span aria-hidden="true">·</span>
              <span>Non-Glare Patina</span>
            </div>
          </div>

          {/* Right Column: Architectural Photography Frame */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[#DDD7CD] bg-[#F2EDE4]">
                <img
                  src={HERO_IMAGE}
                  alt="Miniature antique brass Ganesha idol secured on a car dashboard overlooking the highway"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-[#786F66]">
                <span className="font-serif italic">Vighnaharta Ganesha in Abhaya Mudra</span>
                <span className="font-mono tabular-nums">2.5" · 235g Solid Cast</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
