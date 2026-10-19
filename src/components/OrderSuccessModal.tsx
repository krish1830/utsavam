import React from 'react';
import { Order } from '../types';
import { Printer, ArrowRight, X } from 'lucide-react';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onContinueShopping,
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-[#DDD7CD] overflow-hidden my-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#786F66] hover:text-[#171412] rounded-full hover:bg-[#EAE5DB] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#786F66] font-medium mb-1">
            Order Confirmed & Blessed
          </p>
          <h2 className="text-2xl font-display font-medium text-[#171412]">
            Order #{order.orderId}
          </h2>
          <p className="text-xs text-[#786F66] mt-1 font-mono">
            Auth ID: {order.paymentReference} · {order.orderDate}
          </p>
        </div>

        {/* Courier dispatch timeline */}
        <div className="bg-white p-5 rounded border border-[#EAE5DB] mb-6">
          <div className="flex items-center justify-between text-xs text-[#5A524A] mb-4">
            <span className="font-medium text-[#171412]">Foundry QA & Packing</span>
            <span className="font-mono text-[#786F66]">
              Est. Delivery: {order.estimatedDeliveryDate}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="p-2 bg-[#F2EDE4] text-[#171412] rounded font-medium border border-[#DDD7CD]">
              1. Confirmed
            </div>
            <div className="p-2 text-[#786F66] border border-[#EAE5DB] rounded">
              2. Consecration Pack
            </div>
            <div className="p-2 text-[#786F66] border border-[#EAE5DB] rounded">
              3. Express Courier
            </div>
          </div>
        </div>

        {/* Dashboard Installation Guide */}
        <div className="bg-[#F4EFE6] p-4 rounded border border-[#DDD7CD] mb-6 text-xs text-[#5A524A] font-light space-y-1">
          <p className="font-medium text-[#171412]">
            Dashboard Mounting Guideline:
          </p>
          <p>
            Clean your car dashboard surface with the included wipe. Firmly apply the 3M high-temperature silicone disc to the weighted idol base for 10 seconds before fixing to the dash. Tested to withstand up to 95°C without melting or peeling fine vehicle upholstery.
          </p>
        </div>

        {/* Itemized receipt */}
        <div className="bg-white p-5 rounded border border-[#EAE5DB] mb-6 space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-[#171412] font-semibold border-b border-[#EAE5DB] pb-2">
            Tax Invoice Summary
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs text-[#5A524A]">
                <div>
                  <span className="text-[#171412] font-medium">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="text-[11px] text-[#786F66] block font-mono">
                    {item.product.dimensions.heightInches}" ({item.product.dimensions.weightGrams}g) · {item.product.material}
                  </span>
                  {item.customEngraving && (
                    <span className="text-[10px] text-[#786F66] block italic">Engraved: "{item.customEngraving}"</span>
                  )}
                </div>
                <span className="font-mono tabular-nums text-[#171412] font-medium">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EAE5DB] flex justify-between items-center text-xs">
            <span className="text-[#786F66]">
              Destination: {order.shippingAddress.fullName}, {order.shippingAddress.city} ({order.shippingAddress.postalCode})
            </span>
            <div className="text-right">
              <span className="text-[10px] uppercase text-[#786F66] block">Total Paid via {order.paymentMethod.toUpperCase()}</span>
              <span className="text-base font-mono font-medium text-[#171412]">
                ₹{order.total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-xs tracking-wider uppercase font-medium text-[#171412] border border-[#DDD7CD] rounded hover:bg-[#EFEBE3] transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Tax Receipt</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onContinueShopping();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-xs tracking-wider uppercase font-medium text-[#FAF8F5] bg-[#171412] hover:bg-[#302B27] rounded transition-all"
          >
            <span>Return to Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
