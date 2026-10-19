import React, { useState, useEffect } from 'react';
import { CartItem, ShippingAddress, PaymentMethodType, Order } from '../types';
import { 
  X, Lock, CreditCard, QrCode, Building, 
  Banknote, ArrowRight, Clock, RefreshCw
} from 'lucide-react';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountPercent: number;
  onOrderSuccess: (order: Order) => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  items,
  discountPercent,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  // Shipping Form State
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: 'Krish Paluri',
    phone: '9876543210',
    email: 'krishpaluri09@gmail.com',
    addressLine1: 'Flat 402, Lotus Residency, 100 Feet Road',
    addressLine2: 'Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560038',
    deliveryInstructions: 'Car dashboard installation packaging requested.',
  });

  // Card Form State
  const [cardNumber, setCardNumber] = useState('4532 8920 1144 8921');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('382');
  const [cardName, setCardName] = useState('KRISH PALURI');

  // UPI State
  const [upiId, setUpiId] = useState('krishpaluri@okhdfcbank');
  const [qrTimerSeconds, setQrTimerSeconds] = useState(600);

  // Bank selection
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Calculations
  const subtotal = items.reduce((acc, item) => {
    let price = item.product.price;
    if (item.includeGiftBox) price += 150;
    return acc + price * item.quantity;
  }, 0);

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal - discountAmount + shipping;

  // UPI Timer effect
  useEffect(() => {
    if (step === 2 && selectedMethod === 'upi' && qrTimerSeconds > 0) {
      const interval = setInterval(() => {
        setQrTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, selectedMethod, qrTimerSeconds]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.addressLine1 || !shippingAddress.postalCode) {
      return;
    }
    setStep(2);
  };

  const initiatePayment = () => {
    if (selectedMethod === 'card') {
      setStep(3);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        completeOrder('TXN_UPI_' + Math.floor(100000 + Math.random() * 900000));
      }, 1400);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp.trim() === '7829' || enteredOtp.trim().length === 4) {
      setIsProcessing(true);
      setTimeout(() => {
        completeOrder('TXN_CARD_' + Math.floor(100000 + Math.random() * 900000));
      }, 1100);
    } else {
      setOtpError('Invalid code. Test code: 7829');
    }
  };

  const completeOrder = (referenceId: string) => {
    const newOrder: Order = {
      orderId: 'UTSAVAM-' + Math.floor(10000 + Math.random() * 90000),
      items,
      subtotal,
      discount: discountAmount,
      shipping,
      total,
      shippingAddress,
      paymentMethod: selectedMethod,
      paymentReference: referenceId,
      orderDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      status: 'confirmed'
    };

    setIsProcessing(false);
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-[#DDD7CD] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gateway Minimalist Header */}
        <div className="bg-[#171412] px-6 py-4 text-[#FAF8F5] flex items-center justify-between border-b border-[#2B2723]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-medium text-base tracking-[0.12em] uppercase">
                Utsavam Gateway
              </span>
              <span className="text-[10px] font-mono text-[#D0C7B9]">
                [256-Bit SSL]
              </span>
            </div>
            <p className="text-[11px] text-[#A69B8D] font-light">Encrypted payment authorization channel</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] uppercase tracking-wider text-[#A69B8D] block">Payable</span>
              <span className="text-base font-mono tabular-nums font-medium text-white">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#A69B8D] hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Progress */}
        <div className="bg-[#FAF8F5] px-6 py-2.5 border-b border-[#EAE5DB] flex items-center justify-between text-xs text-[#786F66]">
          <div className="flex items-center gap-3">
            <span className={step === 1 ? 'text-[#171412] font-semibold' : ''}>
              1. Delivery Coordinates
            </span>
            <span>/</span>
            <span className={step === 2 ? 'text-[#171412] font-semibold' : ''}>
              2. Payment Mode
            </span>
            <span>/</span>
            <span className={step === 3 ? 'text-[#171412] font-semibold' : ''}>
              3. Verification
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono">
            <Lock className="w-3 h-3 text-[#171412]" />
            <span>End-to-End Encrypted</span>
          </div>
        </div>

        {/* Step 1: Shipping Address Form */}
        {step === 1 && (
          <form onSubmit={handleAddressSubmit} className="p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xs uppercase tracking-[0.16em] text-[#171412] font-semibold mb-4">
                  01. Recipient Details
                </h3>
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-[#5A524A] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#171412]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5A524A] mb-1">
                      Contact Number (for Courier Tracking SMS) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-[#DDD7CD] bg-[#F2EDE4] text-xs font-mono text-[#786F66] rounded-l">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-white border border-[#DDD7CD] rounded-r focus:outline-none focus:border-[#171412] font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5A524A] mb-1">
                      Email Address (for Tax Receipt) *
                    </label>
                    <input
                      type="email"
                      required
                      value={shippingAddress.email}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#171412]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.16em] text-[#171412] font-semibold mb-4">
                  02. Destination Address
                </h3>
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-[#5A524A] mb-1">
                      Address / Building / Street *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.addressLine1}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#171412]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5A524A] mb-1">
                      Colony / Landmark
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.addressLine2 || ''}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#171412]"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#5A524A] mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#171412]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5A524A] mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#171412]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5A524A] mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={shippingAddress.postalCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-white border border-[#DDD7CD] rounded focus:outline-none focus:border-[#171412] font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-[#EAE5DB]">
              <span className="text-xs text-[#786F66]">
                Subtotal: <strong className="font-mono text-[#171412]">₹{total.toLocaleString('en-IN')}</strong> (Complimentary shipping)
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-[#786F66] hover:text-[#171412]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#FAF8F5] bg-[#171412] hover:bg-[#302B27] rounded transition-all active:scale-95"
                >
                  <span>Select Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Step 2: Payment Method */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[440px]">
            {/* Mode Selectors */}
            <div className="md:col-span-4 bg-[#F4EFE6] border-r border-[#EAE5DB] p-4 space-y-1">
              <button
                onClick={() => setSelectedMethod('upi')}
                className={`w-full text-left p-3 rounded flex items-center gap-3 transition-colors ${
                  selectedMethod === 'upi'
                    ? 'bg-white shadow-sm border border-[#DDD7CD] text-[#171412]'
                    : 'text-[#5A524A] hover:bg-white/60'
                }`}
              >
                <QrCode className="w-4 h-4 text-[#171412]" />
                <div>
                  <span className="text-xs font-medium block">UPI Instant (0% Fee)</span>
                  <span className="text-[10px] text-[#786F66]">Google Pay, PhonePe, Paytm</span>
                </div>
              </button>

              <button
                onClick={() => setSelectedMethod('card')}
                className={`w-full text-left p-3 rounded flex items-center gap-3 transition-colors ${
                  selectedMethod === 'card'
                    ? 'bg-white shadow-sm border border-[#DDD7CD] text-[#171412]'
                    : 'text-[#5A524A] hover:bg-white/60'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#171412]" />
                <div>
                  <span className="text-xs font-medium block">Credit / Debit Cards</span>
                  <span className="text-[10px] text-[#786F66]">Visa, Mastercard, RuPay</span>
                </div>
              </button>

              <button
                onClick={() => setSelectedMethod('netbanking')}
                className={`w-full text-left p-3 rounded flex items-center gap-3 transition-colors ${
                  selectedMethod === 'netbanking'
                    ? 'bg-white shadow-sm border border-[#DDD7CD] text-[#171412]'
                    : 'text-[#5A524A] hover:bg-white/60'
                }`}
              >
                <Building className="w-4 h-4 text-[#171412]" />
                <div>
                  <span className="text-xs font-medium block">Net Banking</span>
                  <span className="text-[10px] text-[#786F66]">All Indian Scheduled Banks</span>
                </div>
              </button>

              <button
                onClick={() => setSelectedMethod('cod')}
                className={`w-full text-left p-3 rounded flex items-center gap-3 transition-colors ${
                  selectedMethod === 'cod'
                    ? 'bg-white shadow-sm border border-[#DDD7CD] text-[#171412]'
                    : 'text-[#5A524A] hover:bg-white/60'
                }`}
              >
                <Banknote className="w-4 h-4 text-[#171412]" />
                <div>
                  <span className="text-xs font-medium block">Cash on Delivery</span>
                  <span className="text-[10px] text-[#786F66]">Doorstep Verification</span>
                </div>
              </button>
            </div>

            {/* Mode Details */}
            <div className="md:col-span-8 p-6 lg:p-8 flex flex-col justify-between bg-white">
              {/* UPI */}
              {selectedMethod === 'upi' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-[#171412] font-semibold">
                        Dynamic UPI Payment
                      </h4>
                      <p className="text-xs text-[#786F66] mt-0.5">
                        Scan with your UPI mobile application
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#786F66]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatTimer(qrTimerSeconds)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-[#FAF8F5] rounded border border-[#EAE5DB]">
                    <div className="w-36 h-36 bg-white p-2 border border-[#171412] rounded flex flex-col items-center justify-center relative">
                      <QrCode className="w-24 h-24 text-[#171412]" />
                      <span className="text-[9px] font-mono text-[#786F66] mt-1 font-medium">₹{total}</span>
                    </div>

                    <div className="space-y-2 text-xs text-[#5A524A] font-light">
                      <p>1. Open Google Pay, PhonePe, or Paytm.</p>
                      <p>2. Scan this encrypted QR code.</p>
                      <p>3. Authorize ₹{total.toLocaleString('en-IN')} with your UPI PIN.</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5A524A] mb-1">
                      Or enter UPI ID / VPA
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="mobile@upi"
                        className="flex-1 text-xs px-3 py-2 bg-[#FAF8F5] border border-[#DDD7CD] rounded focus:outline-none focus:border-[#171412]"
                      />
                      <button
                        type="button"
                        onClick={initiatePayment}
                        disabled={isProcessing}
                        className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-[#FAF8F5] bg-[#171412] hover:bg-[#302B27] rounded transition-colors"
                      >
                        Verify & Pay
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Card */}
              {selectedMethod === 'card' && (
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-wider text-[#171412] font-semibold">
                    Credit / Debit Card Details
                  </h4>

                  <div>
                    <label className="block text-xs font-medium text-[#5A524A] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 8920 1144 8921"
                      className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#DDD7CD] rounded focus:outline-none focus:border-[#171412] font-mono tracking-wider"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#5A524A] mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#DDD7CD] rounded focus:outline-none focus:border-[#171412] uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#5A524A] mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#DDD7CD] rounded focus:outline-none focus:border-[#171412] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#5A524A] mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full text-xs px-3 py-2 bg-[#FAF8F5] border border-[#DDD7CD] rounded focus:outline-none focus:border-[#171412] font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Netbanking */}
              {selectedMethod === 'netbanking' && (
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-wider text-[#171412] font-semibold">
                    Select Your Bank
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Bank of Baroda'].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-2.5 text-xs text-left rounded border transition-colors ${
                          selectedBank === bank
                            ? 'bg-[#171412] text-white border-[#171412]'
                            : 'bg-[#FAF8F5] text-[#5A524A] border-[#EAE5DB] hover:bg-white'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* COD */}
              {selectedMethod === 'cod' && (
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-wider text-[#171412] font-semibold">
                    Cash on Delivery
                  </h4>
                  <div className="p-4 bg-[#FAF8F5] border border-[#EAE5DB] rounded text-xs text-[#5A524A] space-y-2">
                    <p>Open-box transit inspection permitted prior to payment.</p>
                    <p className="font-mono text-[#171412]">
                      Exact amount at delivery: ₹{total.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              )}

              {/* Action */}
              <div className="pt-6 border-t border-[#EAE5DB] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#786F66] hover:text-[#171412]"
                >
                  ← Return to Address
                </button>

                <button
                  onClick={initiatePayment}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#FAF8F5] bg-[#171412] hover:bg-[#302B27] rounded transition-all active:scale-95 disabled:opacity-75"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Authorizing...</span>
                    </>
                  ) : (
                    <>
                      <span>Authorize ₹{total.toLocaleString('en-IN')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: 3D Secure OTP */}
        {step === 3 && (
          <div className="p-8 max-w-md mx-auto text-center space-y-5">
            <h3 className="text-sm uppercase tracking-wider font-semibold text-[#171412]">
              3D Secure Authentication
            </h3>
            <p className="text-xs text-[#786F66] font-light">
              Enter test verification code: <strong className="font-mono text-[#171412]">7829</strong>
            </p>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <input
                type="text"
                maxLength={4}
                required
                autoFocus
                placeholder="7829"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                className="w-32 mx-auto text-center text-lg font-mono tracking-widest px-3 py-2 bg-white border border-[#171412] rounded focus:outline-none"
              />

              {otpError && <p className="text-xs text-[#A63A3A]">{otpError}</p>}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-2.5 text-xs uppercase tracking-wider font-semibold text-[#FAF8F5] bg-[#171412] hover:bg-[#302B27] rounded transition-colors"
              >
                {isProcessing ? 'Confirming...' : 'Verify & Complete Order'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
