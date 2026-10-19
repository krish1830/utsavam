import React, { useState } from 'react';
import { CustomerReview } from '../types';
import { PRODUCTS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const allReviews: CustomerReview[] = PRODUCTS.flatMap((p) => p.reviews);

  const filteredReviews = filter === 'all'
    ? allReviews
    : allReviews.filter((r) => r.verifiedPlacement.toLowerCase().replace(' ', '-') === filter);

  return (
    <section id="reviews" className="py-20 bg-[#FAF8F5] border-t border-[#EBE7DF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Header & Filter Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#786F66] mb-3">
              Patron Dispatches
            </p>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#171412]">
              Verified Highway & Mandir Feedback
            </h2>
          </div>

          {/* Minimalist Segmented Filter */}
          <div className="flex items-center gap-4 text-xs tracking-wider uppercase border-b border-[#EAE5DB] pb-1">
            <button
              onClick={() => setFilter('all')}
              className={`pb-2 transition-colors ${
                filter === 'all' ? 'text-[#171412] font-semibold border-b-2 border-[#171412]' : 'text-[#786F66] hover:text-[#171412]'
              }`}
            >
              All [{allReviews.length}]
            </button>
            <button
              onClick={() => setFilter('car-dashboard')}
              className={`pb-2 transition-colors ${
                filter === 'car-dashboard' ? 'text-[#171412] font-semibold border-b-2 border-[#171412]' : 'text-[#786F66] hover:text-[#171412]'
              }`}
            >
              Car Dashboards
            </button>
            <button
              onClick={() => setFilter('pooja-room')}
              className={`pb-2 transition-colors ${
                filter === 'pooja-room' ? 'text-[#171412] font-semibold border-b-2 border-[#171412]' : 'text-[#786F66] hover:text-[#171412]'
              }`}
            >
              Pooja Altars
            </button>
            <button
              onClick={() => setFilter('office-desk')}
              className={`pb-2 transition-colors ${
                filter === 'office-desk' ? 'text-[#171412] font-semibold border-b-2 border-[#171412]' : 'text-[#786F66] hover:text-[#171412]'
              }`}
            >
              Study Desks
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between border-t border-[#DDD7CD] pt-5"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#786F66] mb-3">
                  <span className="font-mono">★ {review.rating}.0 / 5.0</span>
                  <span className="uppercase tracking-wider text-[10px]">{review.verifiedPlacement}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#38332E] leading-relaxed mb-6 font-light">
                  "{review.comment}"
                </p>
              </div>

              <div className="text-xs border-t border-[#EAE5DB] pt-3 flex items-center justify-between text-[#786F66]">
                <span className="font-medium text-[#171412]">{review.author}</span>
                <span className="text-[11px]">{review.location}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
