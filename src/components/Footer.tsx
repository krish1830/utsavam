import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#171412] text-[#D0C7B9] border-t border-[#26211D] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Core Pillars Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-14 border-b border-[#26211D] text-xs">
          <div>
            <span className="text-white font-medium block uppercase tracking-wider text-[11px] mb-1">
              Monolithic Solid Cast
            </span>
            <p className="text-[#8C847B] font-light">
              100% bell-brass and lost-wax bronze without resin or chemical core filler.
            </p>
          </div>

          <div>
            <span className="text-white font-medium block uppercase tracking-wider text-[11px] mb-1">
              Automotive Calibrated
            </span>
            <p className="text-[#8C847B] font-light">
              Engineered center of mass and tested up to 95°C behind car windshields.
            </p>
          </div>

          <div>
            <span className="text-white font-medium block uppercase tracking-wider text-[11px] mb-1">
              10-Day Safe Transit
            </span>
            <p className="text-[#8C847B] font-light">
              Free replacement guarantee against any courier or transit damage.
            </p>
          </div>

          <div>
            <span className="text-white font-medium block uppercase tracking-wider text-[11px] mb-1">
              Canonical Iconography
            </span>
            <p className="text-[#8C847B] font-light">
              Handcrafted in accordance with classical Shilpa Shastra proportions.
            </p>
          </div>
        </div>

        {/* Narrative & Index */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12">
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-xl font-display font-medium tracking-[0.16em] uppercase text-white">
              Utsavam
            </h3>
            <p className="text-xs text-[#8C847B] leading-relaxed max-w-sm font-light">
              Fine Indian sacred bronzes and miniature murtis. Thoughtfully calibrated for car dashboards, modern home mandir altars, and quiet study desks.
            </p>
            <p className="text-[11px] text-[#635C54] font-mono">
              Ateliers in Swamimalai & Aligarh
            </p>
          </div>

          <div className="md:col-span-2 space-y-2">
            <h4 className="text-[11px] font-medium text-white uppercase tracking-wider mb-4">
              Curation
            </h4>
            <ul className="space-y-2 text-xs text-[#8C847B] font-light">
              <li><a href="#collection-dashboard" className="hover:text-white transition-colors">Car Dashboards</a></li>
              <li><a href="#collection-pooja" className="hover:text-white transition-colors">Pooja Altars</a></li>
              <li><a href="#collection-desk" className="hover:text-white transition-colors">Study Desks</a></li>
              <li><a href="#placement-guide" className="hover:text-white transition-colors">Placement Guide</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-2">
            <h4 className="text-[11px] font-medium text-white uppercase tracking-wider mb-4">
              Care & Guidance
            </h4>
            <ul className="space-y-2 text-xs text-[#8C847B] font-light">
              <li><span className="hover:text-white cursor-pointer">3M Mount Application</span></li>
              <li><span className="hover:text-white cursor-pointer">Abhisheka Cleansing</span></li>
              <li><span className="hover:text-white cursor-pointer">Natural Patina Aging</span></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="text-[11px] font-medium text-white uppercase tracking-wider mb-4">
              Contact & Inquiries
            </h4>
            <p className="text-xs text-[#8C847B] font-light">
              Devotee assistance for new vehicle delivery or housewarming:
            </p>
            <p className="text-xs font-mono text-white pt-1">
              care@utsavam.in · 1800-UTSAVAM
            </p>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 border-t border-[#26211D] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#635C54] gap-4">
          <p>© {new Date().getFullYear()} Utsavam Sacred Bronzes. All rights reserved.</p>
          <div className="flex items-center gap-4 font-mono">
            <span>PCI-DSS Level 1</span>
            <span>·</span>
            <span>256-Bit SSL Encrypted</span>
            <span>·</span>
            <span>NPCI / UPI</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
