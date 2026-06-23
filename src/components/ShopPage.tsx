import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { pufferCards, boutiqueItems, mockupItems, BrandFooter } from '../App';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'new-arrivals', name: 'New Arrivals' },
  { id: 'sport-coats', name: 'Sport Coats' },
  { id: 'suits', name: 'Suits' },
  { id: 'limited-edition', name: 'Limited Edition' },
  { id: 'sale', name: 'Sale' }
];

export const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [categoryPopupOpen, setCategoryPopupOpen] = useState(false);

  // Combined product catalog with categories assigned
  const allProducts = useMemo(() => {
    // 1. Boutique items (3 items)
    const boutiques = boutiqueItems.map(p => {
      let cats = ['all', 'sport-coats'];
      if (p.id.includes('linen')) cats.push('new-arrivals');
      if (p.id.includes('sharkskin')) {
        cats = ['all', 'suits', 'limited-edition'];
      }
      return { ...p, type: 'couture', categories: cats };
    });

    // 2. Puffers (8 items)
    const puffers = pufferCards.map(p => {
      let cats = ['all', 'sport-coats'];
      if (p.id.includes('hopsack')) cats.push('new-arrivals');
      if (p.id.includes('grey') || p.id.includes('charcoal')) {
        cats = ['all', 'suits', 'limited-edition'];
      }
      if (p.id.includes('alt')) cats.push('sale');
      return { ...p, type: 'outerwear', categories: cats };
    });

    // 3. Mockup Items for other categories
    const mockups = mockupItems.map(p => {
      let cats = ['all', 'sport-coats', 'new-arrivals'];
      return { ...p, type: 'couture', categories: cats };
    });

    const merged = [...boutiques, ...puffers, ...mockups];
    const unique = [];
    const seen = new Set();
    for (const item of merged) {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        unique.push(item);
      }
    }
    return unique;
  }, []);

  // Filter & Search & Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(p => p.categories.includes(activeCategory));
    }

    // Search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p => p.title.toLowerCase().includes(query) ||
          p.subtitle.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
        return priceA - priceB;
      });
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''));
        return priceB - priceA;
      });
    }

    return result;
  }, [allProducts, activeCategory, searchQuery, sortBy]);

  const activeCategoryName = useMemo(() => {
    return categories.find(c => c.id === activeCategory)?.name || 'All';
  }, [activeCategory]);

  return (
    <div className="pt-28 pb-12 w-full min-h-screen text-white flex flex-col items-center overflow-y-visible bg-[#000000] z-20 relative px-6 md:px-12">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="w-full max-w-6xl flex flex-col items-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-serif uppercase tracking-widest text-white mb-3 text-center"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Welcome to Roviks store!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xs md:text-sm font-sans tracking-widest text-white/50 mb-12 max-w-md text-center uppercase"
        >
          Explore the complete catalog of luxury outerwear and bespoke couture silhouettes.
        </motion.p>

        {/* Filter and Control Bar */}
        <div className="w-full flex flex-col md:flex-row gap-6 justify-between items-center mb-10 border-b border-white/5 pb-8">
          {/* Category Selector Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCategoryPopupOpen(true)}
              className="flex items-center gap-2.5 px-6 h-11 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-mono tracking-widest uppercase text-white transition-all cursor-pointer select-none"
            >
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span>Categories</span>
            </button>

            {/* Display Active Category Pill */}
            <div className="flex items-center gap-2 px-4 h-11 bg-white/10 border border-white/20 rounded-full text-[10px] font-mono tracking-widest uppercase text-white">
              <span>Filter:</span>
              <span className="font-bold">{activeCategoryName}</span>
              {activeCategory !== 'all' && (
                <button
                  onClick={() => setActiveCategory('all')}
                  className="ml-1 text-white/40 hover:text-white font-sans text-xs focus:outline-none cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Controls: Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 bg-white/5 border border-white/10 rounded-full px-5 pr-10 text-xs font-light text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
              />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Interface-Essential-Search-1--Streamline-Pixel" className="absolute right-4 top-3.5 w-4 h-4 text-white/30 pointer-events-none" fill="currentColor">
                <desc>
                  Interface Essential Search 1 Streamline Icon: https://streamlinehq.com
                </desc>
                <title>interface-essential-search-1</title>
                <g>
                  <path d="m24.38 19.81 -1.53 0 0 3.05 -3.04 0 0 1.52 -3.05 0 0 1.52 4.57 0 0 1.53 1.52 0 0 1.52 1.53 0 0 1.53 1.52 0 0 1.52 1.53 0 0 -1.52 1.52 0 0 -1.53 1.52 0 0 -1.52 1.53 0 0 -1.53 -1.53 0 0 -1.52 -1.52 0 0 -1.52 -1.52 0 0 -1.53 -1.53 0 0 -4.57 -1.52 0 0 3.05z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M25.9 10.67h1.53v6.09H25.9Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M24.38 7.62h1.52v3.05h-1.52Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M22.85 4.57h1.53v3.05h-1.53Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M21.33 12.19h1.52v3.05h-1.52Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M19.81 9.14h1.52v3.05h-1.52Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M19.81 3.05h3.04v1.52h-3.04Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M16.76 7.62h3.05v1.52h-3.05Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M16.76 1.52h3.05v1.53h-3.05Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M13.71 6.1h3.05v1.52h-3.05Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M10.66 25.9h6.1v1.53h-6.1Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M10.66 0h6.1v1.52h-6.1Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M7.62 24.38h3.04v1.52H7.62Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M7.62 1.52h3.04v1.53H7.62Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M4.57 22.86h3.05v1.52H4.57Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M4.57 3.05h3.05v1.52H4.57Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M3.05 19.81h1.52v3.05H3.05Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M3.05 4.57h1.52v3.05H3.05Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M1.52 16.76h1.53v3.05H1.52Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M1.52 7.62h1.53v3.05H1.52Z" fill="currentColor" strokeWidth="1"></path>
                  <path d="M0 10.67h1.52v6.09H0Z" fill="currentColor" strokeWidth="1"></path>
                </g>
              </svg>
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full sm:w-auto h-11 bg-[#111111] border border-white/10 rounded-full px-5 text-xs font-mono tracking-widest uppercase text-white/80 focus:outline-none cursor-pointer hover:border-white/20 transition-colors appearance-none pr-10"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <div className="absolute right-4 top-4 pointer-events-none text-white/40 text-[9px]">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12 min-h-[40vh]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((item) => (
              <motion.a
                layout
                key={item.id}
                href={`#product-${item.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col group cursor-pointer transition-all duration-300 relative bg-white pb-3"
              >
                {/* Image Container */}
                <div className="w-full relative">
                      <div className="w-full overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-auto transition-transform duration-700 group-hover:scale-105 object-cover"
                        />
                      </div>
                      <span className="absolute top-3 left-3 bg-[#e53e3e] text-white font-bold text-[11px] px-2.5 py-0.5 rounded-full z-10">30%</span>
                      <button className="absolute -bottom-4 right-3 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-20 text-gray-800">
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>

                {/* Text Details */}
                <div className="flex flex-col pt-6 px-3 w-full bg-white text-left">
                  <h3 className="text-[11px] font-bold text-gray-800 uppercase tracking-widest leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-bold text-gray-800 uppercase tracking-widest mt-0.5 leading-tight">
                    {item.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[12px] font-bold text-gray-800">{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-[12px] font-bold text-[#e53e3e] line-through decoration-1">{item.originalPrice}</span>
                    )}
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <div className="col-span-3 flex flex-col items-center justify-center py-20 text-center">
              <span className="text-4xl mb-4">✦</span>
              <p className="text-sm tracking-widest font-mono text-white/40 uppercase">No pieces found matching your criteria.</p>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="w-[calc(100%+48px)] md:w-[calc(100%+96px)] -mx-6 md:-mx-12 mt-16">
          <BrandFooter />
        </div>
      </div>

      {/* Category Selection Modal Popup */}
      {categoryPopupOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-white/10 rounded-3xl max-w-lg w-full p-8 relative animate-fadeIn">
            <button
              onClick={() => setCategoryPopupOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white text-lg font-mono"
            >
              ✕
            </button>
            <h3 className="font-serif text-2xl text-white mb-6 uppercase tracking-wider text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Filter By Category
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setCategoryPopupOpen(false);
                  }}
                  className={`h-16 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all duration-300 cursor-pointer select-none ${activeCategory === cat.id ? 'bg-white border-white text-black font-semibold shadow-lg shadow-white/10' : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:border-white/10'}`}
                >
                  <span className="text-xs uppercase tracking-wider font-mono text-center px-2">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
