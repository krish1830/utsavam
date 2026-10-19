import React from 'react';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-20 bg-[#FAF8F5] border-t border-[#EBE7DF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Editorial Heading */}
        <div className="max-w-xl mb-16">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#786F66] mb-3">
            Metallurgical Treatise
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#171412] [text-wrap:balance]">
            Why Solid Bell-Brass Outlasts Resin & Plated Figurines
          </h2>
          <p className="text-sm text-[#5A524A] mt-3 font-light leading-relaxed">
            Market miniatures are frequently hollow resin coated with electroplated faux-gold paint that warps, releases chemical fumes, or chips under intense solar heat behind car windshields. Utsavam pieces are cast as solid, unadulterated alloys.
          </p>
        </div>

        {/* 3 Pillars - Clean Editorial Numbering */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          
          {/* 01 */}
          <div className="flex flex-col justify-between border-t border-[#171412] pt-6">
            <div>
              <span className="font-mono text-xs tracking-wider text-[#786F66] block mb-3">
                01. Cire Perdue (Lost-Wax) Casting
              </span>
              <h3 className="text-base font-display font-medium text-[#171412] mb-3">
                Virgin 80/20 Bell-Brass
              </h3>
              <p className="text-xs text-[#5A524A] leading-relaxed font-light">
                Every murti originates as an individually sculpted beeswax master. Liquid bell-brass is cast at 1,020°C, vaporizing the wax to form an unbroken monolithic metal body with zero hollow cores.
              </p>
            </div>
            <p className="text-[11px] text-[#786F66] font-mono mt-8">
              Poured at 1,020°C · Swamimalai & Aligarh
            </p>
          </div>

          {/* 02 */}
          <div className="flex flex-col justify-between border-t border-[#171412] pt-6">
            <div>
              <span className="font-mono text-xs tracking-wider text-[#786F66] block mb-3">
                02. Dynamic Automotive Gravity
              </span>
              <h3 className="text-base font-display font-medium text-[#171412] mb-3">
                Anti-Topple Base Geometry
              </h3>
              <p className="text-xs text-[#5A524A] leading-relaxed font-light">
                Emergency highway braking creates intense forward inertia. By distributing over 65% of the total 235g–280g metal mass into the bottom pedestal, the murti resists tilting and vibration sway.
              </p>
            </div>
            <p className="text-[11px] text-[#786F66] font-mono mt-8">
              65% Base Mass · Tested to 95°C Windshields
            </p>
          </div>

          {/* 03 */}
          <div className="flex flex-col justify-between border-t border-[#171412] pt-6">
            <div>
              <span className="font-mono text-xs tracking-wider text-[#786F66] block mb-3">
                03. Consecrated Canonical Purity
              </span>
              <h3 className="text-base font-display font-medium text-[#171412] mb-3">
                Daily Abhisheka Safe
              </h3>
              <p className="text-xs text-[#5A524A] leading-relaxed font-light">
                Completely impervious to milk, water, honey, and kumkum rituals. Clean with lemon, tamarind, or pitambari powder to restore the warm temple glow across decades.
              </p>
            </div>
            <p className="text-[11px] text-[#786F66] font-mono mt-8">
              Lead & Cadmium Free · Agama Compliant
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
