import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, RotateCw, ZoomIn, ShoppingBag, ArrowRight,
  Check, Truck, ShieldCheck
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product, 
    options: { include3MMount: boolean; includeGiftBox: boolean; customEngraving?: string }
  ) => void;
  onBuyNow: (
    product: Product, 
    options: { include3MMount: boolean; includeGiftBox: boolean; customEngraving?: string }
  ) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const [activeView, setActiveView] = useState<'primary' | 'inSitu' | 'scale'>('primary');
  const [include3MMount, setInclude3MMount] = useState(true);
  const [includeGiftBox, setIncludeGiftBox] = useState(false);
  const [customEngraving, setCustomEngraving] = useState('');
  const [showEngravingInput, setShowEngravingInput] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleRotate = () => {
    setRotationAngle((prev) => (prev + 90) % 360);
  };

  const handleAdd = () => {
    onAddToCart(product, {
      include3MMount,
      includeGiftBox,
      customEngraving: customEngraving.trim() ? customEngraving.trim() : undefined,
    });
  };

  const handleInstantBuy = () => {
    onBuyNow(product, {
      include3MMount,
      includeGiftBox,
      customEngraving: customEngraving.trim() ? customEngraving.trim() : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-[#DDD7CD] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close product gallery"
          className="absolute top-4 right-4 z-20 p-2 text-[#786F66] hover:text-[#171412] hover:bg-[#EAE5DB] rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Gallery & Scale Inspection */}
          <div className="lg:col-span-7 bg-[#F4EFE6] p-6 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#EBE7DF]">
            <div>
              {/* Gallery View Tabs */}
              <div className="flex items-center gap-1 mb-4 bg-[#EAE5DB] p-1 rounded-md max-w-sm">
                <button
                  onClick={() => setActiveView('primary')}
                  className={`flex-1 py-1.5 px-3 text-xs tracking-wide rounded transition-all whitespace-nowrap ${
                    activeView === 'primary' 
                      ? 'bg-[#171412] text-[#FAF8F5] shadow-sm font-medium' 
                      : 'text-[#5A524A] hover:text-[#171412]'
                  }`}
                >
                  Macro View
                </button>
                <button
                  onClick={() => setActiveView('inSitu')}
                  className={`flex-1 py-1.5 px-3 text-xs tracking-wide rounded transition-all whitespace-nowrap ${
                    activeView === 'inSitu' 
                      ? 'bg-[#171412] text-[#FAF8F5] shadow-sm font-medium' 
                      : 'text-[#5A524A] hover:text-[#171412]'
                  }`}
                >
                  Context View
                </button>
                <button
                  onClick={() => setActiveView('scale')}
                  className={`flex-1 py-1.5 px-3 text-xs tracking-wide rounded transition-all whitespace-nowrap ${
                    activeView === 'scale' 
                      ? 'bg-[#171412] text-[#FAF8F5] shadow-sm font-medium' 
                      : 'text-[#5A524A] hover:text-[#171412]'
                  }`}
                >
                  Scale Simulator
                </button>
              </div>

              {/* Main Image Viewport */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border border-[#DDD7CD] flex items-center justify-center">
                {activeView === 'primary' && (
                  <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                    <img
                      src={product.images.primary}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      style={{
                        transform: `rotate(${rotationAngle}deg) scale(${isZoomed ? 1.4 : 1})`,
                        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      className="w-full h-full object-cover object-center cursor-zoom-in"
                      onClick={() => setIsZoomed(!isZoomed)}
                    />
                    
                    {/* Minimalist rotation & zoom controls */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-[#171412]/80 backdrop-blur-md px-3 py-1.5 rounded text-white text-[11px] font-mono">
                      <button 
                        onClick={handleRotate} 
                        className="flex items-center gap-1 hover:text-[#E6C687] transition-colors"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Rotate 90°</span>
                      </button>
                      <span className="text-gray-500">·</span>
                      <button 
                        onClick={() => setIsZoomed(!isZoomed)} 
                        className="flex items-center gap-1 hover:text-[#E6C687] transition-colors"
                      >
                        <ZoomIn className="w-3 h-3" />
                        <span>{isZoomed ? 'Reset' : 'Zoom'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeView === 'inSitu' && (
                  <div className="w-full h-full relative">
                    <img
                      src={product.images.inSitu}
                      alt={`${product.name} installed in placement setting`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 text-white text-xs">
                      <p className="font-medium text-[#FAF8F5]">In-Car Dashboard View</p>
                      <p className="text-[11px] text-[#D0C7B9] mt-0.5">
                        {product.carDashboardNotes || 'Stable solid brass footprint suited for vibration absorption.'}
                      </p>
                    </div>
                  </div>
                )}

                {activeView === 'scale' && (
                  <div className="w-full h-full p-6 flex flex-col justify-between bg-[#F8F5EE]">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#786F66] font-medium">
                        Automotive Dashboard Scale Reference
                      </p>
                      <p className="text-xs text-[#5A524A] mt-1 font-light">
                        Calibrated under 3 inches to maintain unobstructed road sightlines.
                      </p>
                    </div>

                    {/* Scale Visualizer */}
                    <div className="my-auto flex items-end justify-center gap-8 py-4">
                      {/* Standard Car Key */}
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-20 bg-[#2B2723] rounded-t-xl rounded-b-md border border-[#403A34] flex items-center justify-center text-[#D0C7B9] text-[10px] font-mono">
                          Key Fob
                        </div>
                        <span className="text-[11px] font-mono text-[#786F66] mt-2">~2.8"</span>
                      </div>

                      {/* The Miniature Murti */}
                      <div className="flex flex-col items-center">
                        <div 
                          style={{ height: `${product.dimensions.heightInches * 36}px` }}
                          className="w-16 bg-[#C4A052] rounded-t-lg border border-[#8C6F2D] flex flex-col items-center justify-center text-[#171412] p-1 shadow-sm"
                        >
                          <span className="text-xs font-bold font-display">ॐ</span>
                          <span className="text-[9px] font-medium text-center leading-none mt-1">
                            {product.name.split(' ')[0]}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono font-medium text-[#171412] mt-2">
                          {product.dimensions.heightInches}" ({product.dimensions.heightCm}cm)
                        </span>
                        <span className="text-[10px] text-[#2E7D32]">Dashboard Clear</span>
                      </div>

                      {/* Smartphone */}
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-36 bg-[#1A1816] rounded-lg border border-[#332E29] flex items-center justify-center text-[#8C847B] text-[10px] font-mono">
                          Phone
                        </div>
                        <span className="text-[11px] font-mono text-[#786F66] mt-2">~6.0"</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-[#786F66] text-center border-t border-[#EAE5DB] pt-2">
                      Sits below windshield hood horizon line on all standard vehicles.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Spec Strip */}
            <div className="mt-4 pt-4 border-t border-[#E5E0D6] grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 border border-[#DDD7CD] rounded bg-[#FAF8F5]">
                <span className="text-[#786F66] block text-[10px] uppercase tracking-wider">Height</span>
                <span className="font-mono tabular-nums text-[#171412] font-medium">
                  {product.dimensions.heightInches}" / {product.dimensions.heightCm}cm
                </span>
              </div>
              <div className="p-2 border border-[#DDD7CD] rounded bg-[#FAF8F5]">
                <span className="text-[#786F66] block text-[10px] uppercase tracking-wider">Net Weight</span>
                <span className="font-mono tabular-nums text-[#171412] font-medium">
                  {product.dimensions.weightGrams} Grams
                </span>
              </div>
              <div className="p-2 border border-[#DDD7CD] rounded bg-[#FAF8F5]">
                <span className="text-[#786F66] block text-[10px] uppercase tracking-wider">Alloy</span>
                <span className="font-mono text-[#171412] font-medium truncate block">
                  {product.material.replace('Solid ', '')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between bg-white">
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#786F66] mb-2 font-medium">
                <span>{product.material}</span>
                <span className="mx-1.5">·</span>
                <span>{product.deity}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-medium text-[#171412] mb-1">
                {product.name}
              </h2>

              {product.sanskritName && (
                <p className="text-xs text-[#786F66] font-serif mb-4">
                  {product.sanskritName}
                </p>
              )}

              {/* Price row */}
              <div className="py-3 border-y border-[#EAE5DB] mb-5">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl font-mono tabular-nums text-[#171412] font-medium">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-mono tabular-nums text-[#999084] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[11px] text-[#786F66] mt-1">
                  Free Express Dispatch across India (2–4 days)
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-[#5A524A] leading-relaxed mb-6 font-light">
                {product.description}
              </p>

              {/* Placement Specifics */}
              <div className="space-y-2 mb-6">
                <span className="text-[11px] uppercase tracking-wider text-[#171412] font-medium block">
                  Metallurgical Engineering:
                </span>
                <div className="text-xs space-y-1.5 text-[#5A524A] font-light">
                  <div className="flex items-start gap-2">
                    <span className="text-[#171412] font-serif">·</span>
                    <span>Low center of mass engineered for sharp automotive braking.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#171412] font-serif">·</span>
                    <span>Tested to 95°C behind car windshields without warping or odor.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#171412] font-serif">·</span>
                    <span>Abhisheka-proof solid alloy with zero hollow filler.</span>
                  </div>
                </div>
              </div>

              {/* Customization options */}
              <div className="space-y-2.5 mb-6 pt-3 border-t border-[#EAE5DB]">
                <label className="flex items-center justify-between p-2 rounded border border-[#E5E0D6] bg-[#FAF8F5] cursor-pointer hover:border-[#171412] transition-colors">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={include3MMount}
                      onChange={(e) => setInclude3MMount(e.target.checked)}
                      className="w-3.5 h-3.5 text-[#171412] focus:ring-0"
                    />
                    <span className="text-xs text-[#171412]">
                      3M Heat-Resistant Dashboard Silicone Mount
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#2E7D32]">FREE</span>
                </label>

                <label className="flex items-center justify-between p-2 rounded border border-[#E5E0D6] bg-[#FAF8F5] cursor-pointer hover:border-[#171412] transition-colors">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={includeGiftBox}
                      onChange={(e) => setIncludeGiftBox(e.target.checked)}
                      className="w-3.5 h-3.5 text-[#171412] focus:ring-0"
                    />
                    <span className="text-xs text-[#171412]">
                      Velvet Gift Box & Raksha Sutra
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#171412]">+₹150</span>
                </label>

                <div>
                  <button
                    type="button"
                    onClick={() => setShowEngravingInput(!showEngravingInput)}
                    className="text-xs text-[#786F66] hover:text-[#171412] underline"
                  >
                    {showEngravingInput ? '− Remove Base Engraving' : '+ Add Custom Base Engraving (Mantra / Reg No)'}
                  </button>
                  {showEngravingInput && (
                    <div className="mt-2">
                      <input
                        type="text"
                        maxLength={24}
                        placeholder="e.g. MH 02 CD 9999 or ॐ गं गणपतये"
                        value={customEngraving}
                        onChange={(e) => setCustomEngraving(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#DDD7CD] rounded focus:outline-none focus:border-[#171412]"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-[#EAE5DB] space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  className="flex items-center justify-center gap-1.5 py-3 text-xs tracking-wider uppercase font-medium text-[#171412] bg-[#FAF8F5] hover:bg-[#EFEBE3] border border-[#DDD7CD] rounded transition-colors active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleInstantBuy}
                  className="flex items-center justify-center gap-1.5 py-3 text-xs tracking-wider uppercase font-medium text-[#FAF8F5] bg-[#171412] hover:bg-[#302B27] rounded transition-colors active:scale-95 shadow-sm"
                >
                  <span>Instant Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[10px] text-center text-[#786F66] pt-1 font-mono">
                100% Solid Metal · 10-Day Transit Replacement Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
