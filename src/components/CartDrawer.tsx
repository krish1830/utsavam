import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ArrowRight, Minus, Plus } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: (appliedDiscountPercent: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const subtotal = items.reduce((acc, item) => {
    let itemPrice = item.product.price;
    if (item.includeGiftBox) itemPrice += 150;
    return acc + itemPrice * item.quantity;
  }, 0);

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal - discountAmount + shipping;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'UTSAV10' || code === 'PRANAM10' || code === 'FIRSTCAR') {
      setDiscountPercent(10);
      setPromoSuccess('10% blessing discount applied');
    } else {
      setPromoError('Invalid code. Try UTSAV10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#DDD7CD] shadow-2xl flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-[#EAE5DB] bg-[#FAF8F5] flex items-center justify-between">
            <div>
              <h2 className="text-base font-display font-medium tracking-wide text-[#171412] uppercase">
                Your Bag [{items.reduce((acc, i) => acc + i.quantity, 0)}]
              </h2>
              <p className="text-[11px] text-[#786F66] mt-0.5">
                {subtotal >= 999 ? 'Complimentary express courier included' : 'Free express courier on orders over ₹999'}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-1.5 text-[#786F66] hover:text-[#171412] rounded-full hover:bg-[#EAE5DB] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#786F66]">
                <span className="font-display text-3xl font-light text-[#786F66] mb-3">ॐ</span>
                <p className="font-display font-medium text-[#171412] text-sm mb-1 uppercase tracking-wider">
                  Bag is currently empty
                </p>
                <p className="text-xs text-[#786F66] max-w-xs mb-6 font-light">
                  Explore miniature bronze and brass murtis for your dashboard or home.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider font-medium text-[#FAF8F5] bg-[#171412] hover:bg-[#302B27] rounded transition-colors"
                >
                  Return to Collection
                </button>
              </div>
            ) : (
              items.map((item, index) => {
                const itemBasePrice = item.product.price + (item.includeGiftBox ? 150 : 0);
                return (
                  <div
                    key={`${item.product.id}-${index}`}
                    className="flex gap-4 pb-5 border-b border-[#EAE5DB]"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-[#F2EDE4] rounded overflow-hidden shrink-0 border border-[#DDD7CD]">
                      <img
                        src={item.product.images.primary}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-display font-medium text-[#171412] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(index)}
                            aria-label="Remove item"
                            className="text-[#999084] hover:text-[#171412] transition-colors p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[11px] text-[#786F66] font-mono mt-0.5">
                          {item.product.dimensions.heightInches}" · {item.product.dimensions.weightGrams}g solid
                        </p>

                        <div className="mt-1 space-y-0.5 text-[10px] text-[#5A524A]">
                          {item.include3MMount && (
                            <span className="block">✓ Free 3M Car Mount</span>
                          )}
                          {item.includeGiftBox && (
                            <span className="block">+ Velvet Gift Presentation Box</span>
                          )}
                          {item.customEngraving && (
                            <span className="block italic">Engraved: "{item.customEngraving}"</span>
                          )}
                        </div>
                      </div>

                      {/* Stepper & Price */}
                      <div className="flex items-center justify-between pt-2 mt-2">
                        <div className="flex items-center border border-[#DDD7CD] rounded bg-white">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="p-1 text-[#786F66] hover:text-[#171412] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono tabular-nums text-[#171412]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="p-1 text-[#786F66] hover:text-[#171412] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-mono font-medium tabular-nums text-[#171412]">
                          ₹{(itemBasePrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 bg-[#FAF8F5] border-t border-[#EAE5DB] space-y-4">
              {/* Promo input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Coupon code (UTSAV10)"
                  className="flex-1 text-xs px-3 py-2 bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#171412] uppercase tracking-wider"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-[#171412] bg-[#EAE5DB] hover:bg-[#DDD7CD] rounded transition-colors"
                >
                  Apply
                </button>
              </form>
              {promoError && <p className="text-[11px] text-[#A63A3A] font-light">{promoError}</p>}
              {promoSuccess && <p className="text-[11px] text-[#2E7D32] font-light">{promoSuccess}</p>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5A524A] pt-2 border-t border-[#EAE5DB] font-light">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#171412]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2E7D32]">
                    <span>Blessing Discount (10%)</span>
                    <span className="font-mono tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Dispatch</span>
                  <span className="font-mono tabular-nums text-[#171412]">
                    {shipping === 0 ? 'Complimentary' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium text-[#171412] pt-2 border-t border-[#DDD7CD]">
                  <span>Total Amount</span>
                  <span className="font-mono tabular-nums text-base">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Proceed CTA */}
              <button
                onClick={() => onProceedToCheckout(discountPercent)}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-xs uppercase tracking-widest font-semibold text-[#FAF8F5] bg-[#171412] hover:bg-[#302B27] active:scale-[0.99] rounded transition-all"
              >
                <span>Proceed to Secure Gateway</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-[10px] text-center text-[#786F66] font-mono">
                256-Bit Encrypted · PCI-DSS Level 1 · Transit Insured
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
