import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col bg-transparent transition-all duration-300"
    >
      {/* Visual Canvas (65%-75% card presence) */}
      <div className="relative aspect-[4/3] bg-[#F2EDE4] rounded-lg overflow-hidden border border-[#E5E0D6]">
        {!imageError ? (
          <img
            src={product.images.primary}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out cursor-pointer"
            onClick={() => onQuickView(product)}
          />
        ) : (
          <div 
            onClick={() => onQuickView(product)}
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer"
          >
            <span className="font-display text-2xl text-[#786F66] mb-1 font-light">ॐ</span>
            <p className="text-xs font-display text-[#171412] font-semibold">{product.name}</p>
          </div>
        )}

        {/* Minimalist Top Tag (Pure clean text, zero candy badge) */}
        {product.isBestSeller && (
          <div className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.18em] font-medium text-[#171412] bg-[#FAF8F5]/90 backdrop-blur-sm px-2 py-1 rounded-sm border border-[#DDD7CD]">
            Dashboard Favorite
          </div>
        )}

        {/* Quick View Trigger on Hover */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={() => onQuickView(product)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#171412] bg-[#FAF8F5] hover:bg-white rounded shadow-sm transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details & Scale</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex flex-col flex-1 pt-4 pb-2">
        {/* Unboxed Metadata with · separator */}
        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#786F66] mb-1.5">
          <span>{product.material}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{product.dimensions.heightInches}"</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{product.dimensions.weightGrams}g</span>
        </div>

        {/* Product Name */}
        <h3
          onClick={() => onQuickView(product)}
          className="text-base font-display font-medium text-[#171412] group-hover:text-[#6E553A] transition-colors cursor-pointer line-clamp-1 mb-1"
        >
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="text-xs text-[#6B645C] line-clamp-1 mb-3 font-light">
          {product.tagline}
        </p>

        {/* Price & Action Row */}
        <div className="mt-auto pt-3 border-t border-[#EAE5DB] flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-mono font-medium tabular-nums text-[#171412]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-mono tabular-nums text-[#999084] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] text-[#786F66]">
              Includes 3M Car Mount
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            aria-label={`Add ${product.name} to bag`}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs uppercase tracking-wider font-medium text-[#FAF8F5] bg-[#171412] hover:bg-[#302B27] active:scale-95 rounded transition-all shrink-0"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
};
