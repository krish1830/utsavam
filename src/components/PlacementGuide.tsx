import React, { useState } from 'react';
import { PlacementType } from '../types';
import { PLACEMENT_SPECS, PRODUCTS } from '../data/products';
import { ArrowRight, Check } from 'lucide-react';

interface PlacementGuideProps {
  onSelectProduct: (productId: string) => void;
  onFilterPlacement: (placement: PlacementType) => void;
}

export const PlacementGuide: React.FC<PlacementGuideProps> = ({
  onSelectProduct,
  onFilterPlacement,
}) => {
  const [selectedPlacement, setSelectedPlacement] = useState<PlacementType>('car-dashboard');
  const spec = PLACEMENT_SPECS[selectedPlacement];

  const recommendedIdMap: Record<PlacementType, string> = {
    'car-dashboard': 'ganesha-antique-brass-mini',
    'pooja-room': 'lakshmi-padmasana-brass-mini',
    'office-desk': 'shiva-adiyogi-matte-bronze-mini',
  };

  const recommendedProduct = PRODUCTS.find((p) => p.id === recommendedIdMap[selectedPlacement]) || PRODUCTS[0];

  return (
    <section id="placement-guide" className="py-20 bg-[#FAF8F5] border-t border-[#EBE7DF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Header */}
        <div className="max-w-xl mb-12">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#786F66] mb-3">
            Placement Index
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#171412] [text-wrap:balance]">
            Metallurgical Calibration by Environment
          </h2>
          <p className="text-sm text-[#5A524A] mt-2 font-light leading-relaxed">
            Every environment has distinct physical forces and devotional demands. Select your setting to explore exact specifications.
          </p>
        </div>

        {/* Minimalist Segmented Filter */}
        <div className="flex items-center gap-6 border-b border-[#EAE5DB] mb-10 overflow-x-auto pb-1">
          {(['car-dashboard', 'pooja-room', 'office-desk'] as PlacementType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedPlacement(type)}
              className={`pb-3 text-xs tracking-wider uppercase transition-all whitespace-nowrap border-b-2 font-medium ${
                selectedPlacement === type
                  ? 'border-[#171412] text-[#171412]'
                  : 'border-transparent text-[#786F66] hover:text-[#171412]'
              }`}
            >
              {type === 'car-dashboard' && 'Car Dashboard'}
              {type === 'pooja-room' && 'Pooja Altars'}
              {type === 'office-desk' && 'Office & Study Desks'}
            </button>
          ))}
        </div>

        {/* Editorial Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left: Engineering Criteria */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <h3 className="text-xl font-display font-medium text-[#171412] mb-3">
                {spec.title}
              </h3>
              <p className="text-sm text-[#5A524A] leading-relaxed mb-8 font-light">
                {spec.description}
              </p>

              {/* Minimalist checklist */}
              <div className="space-y-3 mb-8">
                {spec.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-[#5A524A] font-light">
                    <span className="text-[#171412] mt-0.5">·</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button
                onClick={() => onFilterPlacement(selectedPlacement)}
                className="flex items-center gap-2 text-xs tracking-wider uppercase font-medium text-[#171412] hover:opacity-75 transition-opacity"
              >
                <span>Browse All {spec.shortTitle} Idols</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Exemplar Product Showcase */}
          <div className="lg:col-span-5 bg-[#F4EFE6] rounded-lg p-6 border border-[#E5E0D6] flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#786F66] font-medium block mb-2">
                Recommended Exemplar
              </span>
              <h4 className="text-base font-display font-medium text-[#171412] mb-3">
                {recommendedProduct.name}
              </h4>

              <div 
                className="aspect-[4/3] rounded overflow-hidden border border-[#DDD7CD] bg-white mb-4 cursor-pointer"
                onClick={() => onSelectProduct(recommendedProduct.id)}
              >
                <img
                  src={recommendedProduct.images.primary}
                  alt={recommendedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>

              <p className="text-xs text-[#5A524A] font-light line-clamp-2 mb-4">
                {recommendedProduct.tagline}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#EAE5DB]">
              <span className="font-mono text-sm tabular-nums text-[#171412]">
                ₹{recommendedProduct.price.toLocaleString('en-IN')}
              </span>
              <button
                onClick={() => onSelectProduct(recommendedProduct.id)}
                className="text-xs uppercase tracking-wider font-medium text-[#171412] hover:opacity-75"
              >
                Inspect Specifications →
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
