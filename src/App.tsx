import React, { useState, useEffect } from 'react';
import { Product, CartItem, Order, PlacementType, MetalFinish } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { PlacementGuide } from './components/PlacementGuide';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { Search } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('utsavam_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [placementFilter, setPlacementFilter] = useState<'all' | PlacementType>('all');
  const [materialFilter, setMaterialFilter] = useState<'all' | MetalFinish>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'weight'>('featured');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem('utsavam_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to sync cart', e);
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (
    product: Product,
    options: { include3MMount: boolean; includeGiftBox: boolean; customEngraving?: string } = {
      include3MMount: true,
      includeGiftBox: false,
    }
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.include3MMount === options.include3MMount &&
          item.includeGiftBox === options.includeGiftBox &&
          item.customEngraving === options.customEngraving
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            quantity: 1,
            include3MMount: options.include3MMount,
            includeGiftBox: options.includeGiftBox,
            customEngraving: options.customEngraving,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const handleBuyNow = (
    product: Product,
    options: { include3MMount: boolean; includeGiftBox: boolean; customEngraving?: string }
  ) => {
    handleAddToCart(product, options);
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
    } else {
      setCartItems((prev) => {
        const next = [...prev];
        next[index].quantity = newQty;
        return next;
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProceedToCheckout = (appliedDiscount: number) => {
    setDiscountPercent(appliedDiscount);
    setIsCartOpen(false);
    setIsPaymentOpen(true);
  };

  const handleOrderSuccess = (order: Order) => {
    setLatestOrder(order);
    setIsPaymentOpen(false);
    setCartItems([]);
  };

  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'collection-dashboard') {
      setPlacementFilter('car-dashboard');
      scrollToCatalog();
    } else if (sectionId === 'collection-pooja') {
      setPlacementFilter('pooja-room');
      scrollToCatalog();
    } else if (sectionId === 'collection-desk') {
      setPlacementFilter('office-desk');
      scrollToCatalog();
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProducts = PRODUCTS.filter((product) => {
    if (placementFilter !== 'all' && !product.placements.includes(placementFilter)) {
      return false;
    }
    if (materialFilter !== 'all' && product.material !== materialFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDeity = product.deity.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchSanskrit = product.sanskritName ? product.sanskritName.includes(q) : false;
      return matchName || matchDeity || matchDesc || matchSanskrit;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'weight') return b.dimensions.weightGrams - a.dimensions.weightGrams;
    return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#171412] selection:bg-[#EAE5DB] selection:text-[#171412]">
      {/* Minimalist Top Announcement Ribbon */}
      {showPromoBanner && (
        <div className="bg-[#171412] text-[#D0C7B9] text-[11px] py-2 px-4 flex items-center justify-between border-b border-[#2B2723] tracking-wide">
          <div className="flex-1 text-center font-light">
            <span>Complimentary 3M Automotive Mount Kit with all miniature idols</span>
            <span className="hidden sm:inline"> · Code </span>
            <span className="hidden sm:inline font-mono font-medium text-white">UTSAV10</span>
            <span className="hidden sm:inline"> for 10% privilege savings</span>
          </div>
          <button
            onClick={() => setShowPromoBanner(false)}
            aria-label="Dismiss banner"
            className="text-[#8C847B] hover:text-white ml-2 text-xs"
          >
            ×
          </button>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activePlacement={placementFilter}
        onSelectPlacement={(p) => setPlacementFilter(p as any)}
        onScrollToSection={handleScrollToSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {/* Campaign Hero Section */}
        <Hero
          onSelectPlacement={(p) => setPlacementFilter(p as any)}
          onScrollToCatalog={scrollToCatalog}
        />

        {/* Catalog Section */}
        <section id="catalog-section" className="py-20 max-w-7xl mx-auto px-6 lg:px-10">
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#786F66] mb-2">
                Available Foundry Casts
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#171412]">
                {placementFilter === 'car-dashboard' && 'Car Dashboard Editions'}
                {placementFilter === 'pooja-room' && 'Pooja Altar Editions'}
                {placementFilter === 'office-desk' && 'Study & Office Editions'}
                {placementFilter === 'all' && 'The Miniature Collection'}
              </h2>
            </div>

            {/* Minimalist Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 text-[#786F66] absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search deity..."
                className="w-full text-xs pl-8 pr-3 py-2 bg-transparent border border-[#DDD7CD] rounded focus:outline-none focus:border-[#171412]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-xs text-[#786F66] hover:text-[#171412]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Understated Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-6 pb-6 mb-10 border-b border-[#EAE5DB]">
            <div className="flex items-center gap-6 overflow-x-auto pb-1 text-xs tracking-wider uppercase">
              {(['all', 'car-dashboard', 'pooja-room', 'office-desk'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setPlacementFilter(key)}
                  className={`pb-2 border-b-2 transition-all whitespace-nowrap ${
                    placementFilter === key
                      ? 'border-[#171412] text-[#171412] font-semibold'
                      : 'border-transparent text-[#786F66] hover:text-[#171412]'
                  }`}
                >
                  {key === 'all' && 'All Idols'}
                  {key === 'car-dashboard' && 'Car Dashboards'}
                  {key === 'pooja-room' && 'Pooja Altars'}
                  {key === 'office-desk' && 'Study Desks'}
                </button>
              ))}
            </div>

            {/* Secondary Controls */}
            <div className="flex items-center gap-3">
              <select
                value={materialFilter}
                onChange={(e) => setMaterialFilter(e.target.value as any)}
                aria-label="Filter by material alloy"
                className="text-xs px-2.5 py-1.5 bg-transparent border border-[#DDD7CD] rounded text-[#5A524A] focus:outline-none focus:border-[#171412]"
              >
                <option value="all">All Metal Alloys</option>
                <option value="Solid Antique Brass">Solid Antique Brass</option>
                <option value="Lost-Wax Bronze">Lost-Wax Bronze</option>
                <option value="Panchaloha Bronze">Panchaloha Bronze</option>
                <option value="Burnished Matte Brass">Burnished Matte Brass</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products"
                className="text-xs px-2.5 py-1.5 bg-transparent border border-[#DDD7CD] rounded text-[#5A524A] focus:outline-none focus:border-[#171412]"
              >
                <option value="featured">Featured First</option>
                <option value="weight">Heaviest Mass First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid - 3 Columns with generous space */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setSelectedProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p)}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border-t border-[#EAE5DB]">
              <p className="font-display font-medium text-base text-[#171412] mb-2">
                No idols match the active criteria
              </p>
              <button
                onClick={() => {
                  setPlacementFilter('all');
                  setMaterialFilter('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 text-xs uppercase tracking-wider text-[#171412] border border-[#DDD7CD] rounded hover:bg-[#EFEBE3] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}

        </section>

        {/* Placement Guide */}
        <PlacementGuide
          onSelectProduct={(id) => {
            const p = PRODUCTS.find((prod) => prod.id === id);
            if (p) setSelectedProduct(p);
          }}
          onFilterPlacement={(type) => {
            setPlacementFilter(type);
            scrollToCatalog();
          }}
        />

        {/* Craftsmanship Section */}
        <CraftsmanshipSection />

        {/* Devotee Reviews Section */}
        <ReviewsSection />

      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Secure Payment Gateway Modal */}
      <PaymentGatewayModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        items={cartItems}
        discountPercent={discountPercent}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Confirmed Modal */}
      <OrderSuccessModal
        order={latestOrder}
        onClose={() => setLatestOrder(null)}
        onContinueShopping={() => {
          setLatestOrder(null);
          scrollToCatalog();
        }}
      />
    </div>
  );
}
