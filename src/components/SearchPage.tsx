import { useState, useMemo } from 'react';
import { pufferCards, boutiqueItems, mockupItems, BrandFooter } from '../App';
import { ShoppingBag } from 'lucide-react';

const SUGGESTED_SEARCHES = ['Sport Coat', 'Linen', 'Merino', 'Sharkskin', 'Grey Suit', 'Navy'];

export const SearchPage = () => {
  const [query, setQuery] = useState('');

  // Combined product catalog
  const catalog = useMemo(() => {
    const merged = [...boutiqueItems, ...pufferCards, ...mockupItems];
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

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowercaseQuery = query.toLowerCase();
    return catalog.filter(
      item =>
        item.title.toLowerCase().includes(lowercaseQuery) ||
        item.subtitle.toLowerCase().includes(lowercaseQuery) ||
        (item.description && item.description.toLowerCase().includes(lowercaseQuery))
    );
  }, [query, catalog]);

  return (
    <div className="pt-28 pb-12 w-full min-h-screen text-white flex flex-col items-center overflow-y-visible bg-[#000000] z-20 relative px-6 md:px-12">
      <div className="w-full max-w-6xl flex flex-col items-center min-h-[75vh]">
        {/* Title */}
        <h1 
          className="text-4xl md:text-5xl font-extrabold tracking-widest text-white mb-8 text-center uppercase"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Search Collection
        </h1>

        {/* Search Input Box */}
        <div className="w-full max-w-2xl relative mb-8">
          <input
            type="text"
            placeholder="Type to search e.g. Navy Sport Coat..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 bg-white/5 border border-white/10 rounded-full px-7 pr-16 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="absolute right-5 top-4.5 text-white/40 hover:text-white font-mono text-sm focus:outline-none cursor-pointer"
            >
              ✕
            </button>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Interface-Essential-Search-1--Streamline-Pixel" className="absolute right-6 top-5 w-5 h-5 text-white/30 pointer-events-none" fill="currentColor">
              <path d="m24.38 19.81 -1.53 0 0 3.05 -3.04 0 0 1.52 -3.05 0 0 1.52 4.57 0 0 1.53 1.52 0 0 1.52 1.53 0 0 1.53 1.52 0 0 1.52 1.53 0 0 -1.52 1.52 0 0 -1.53 1.52 0 0 -1.52 1.53 0 0 -1.53 -1.53 0 0 -1.52 -1.52 0 0 -1.52 -1.52 0 0 -1.53 -1.53 0 0 -4.57 -1.52 0 0 3.05z" fill="currentColor"></path>
              <path d="M25.9 10.67h1.53v6.09H25.9Z" fill="currentColor"></path>
              <path d="M24.38 7.62h1.52v3.05h-1.52Z" fill="currentColor"></path>
              <path d="M22.85 4.57h1.53v3.05h-1.53Z" fill="currentColor"></path>
              <path d="M21.33 12.19h1.52v3.05h-1.52Z" fill="currentColor"></path>
              <path d="M19.81 9.14h1.52v3.05h-1.52Z" fill="currentColor"></path>
              <path d="M19.81 3.05h3.04v1.52h-3.04Z" fill="currentColor"></path>
              <path d="M16.76 7.62h3.05v1.52h-3.05Z" fill="currentColor"></path>
              <path d="M16.76 1.52h3.05v1.53h-3.05Z" fill="currentColor"></path>
              <path d="M13.71 6.1h3.05v1.52h-3.05Z" fill="currentColor"></path>
              <path d="M10.66 25.9h6.1v1.53h-6.1Z" fill="currentColor"></path>
              <path d="M10.66 0h6.1v1.52h-6.1Z" fill="currentColor"></path>
              <path d="M7.62 24.38h3.04v1.52H7.62Z" fill="currentColor"></path>
              <path d="M7.62 1.52h3.04v1.53H7.62Z" fill="currentColor"></path>
              <path d="M4.57 22.86h3.05v1.52H4.57Z" fill="currentColor"></path>
              <path d="M4.57 3.05h3.05v1.52H4.57Z" fill="currentColor"></path>
              <path d="M3.05 19.81h1.52v3.05H3.05Z" fill="currentColor"></path>
              <path d="M3.05 4.57h1.52v3.05H3.05Z" fill="currentColor"></path>
              <path d="M1.52 16.76h1.53v3.05H1.52Z" fill="currentColor"></path>
              <path d="M1.52 7.62h1.53v3.05H1.52Z" fill="currentColor"></path>
              <path d="M0 10.67h1.52v6.09H0Z" fill="currentColor"></path>
            </svg>
          )}
        </div>

        {/* Suggested Searches */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mb-12">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mr-2">Suggested:</span>
          {SUGGESTED_SEARCHES.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="px-4 py-1.5 rounded-full border border-white/10 hover:border-white bg-white/5 hover:bg-white text-white hover:text-black text-[10px] tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        {query.trim() && (
          <div className="w-full flex flex-col gap-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-white/40 border-b border-white/5 pb-4">
              Search Results ({results.length})
            </h2>

            {results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {results.map((item) => (
                  <a
                    href={`#product-${item.id}`}
                    key={item.id}
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
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-3xl mb-4 text-white/30">✦</span>
                <p className="text-sm tracking-widest font-mono text-white/40 uppercase">
                  No pieces found matching "{query}"
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty Query State */}
        {!query.trim() && (
          <div className="flex flex-col items-center justify-center py-24 text-center text-white/30">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-12 h-12 mb-6" fill="currentColor opacity-40">
              <path d="m24.38 19.81 -1.53 0 0 3.05 -3.04 0 0 1.52 -3.05 0 0 1.52 4.57 0 0 1.53 1.52 0 0 1.52 1.53 0 0 1.53 1.52 0 0 1.52 1.53 0 0 -1.52 1.52 0 0 -1.53 1.52 0 0 -1.52 1.53 0 0 -1.53 -1.53 0 0 -1.52 -1.52 0 0 -1.52 -1.52 0 0 -1.53 -1.53 0 0 -4.57 -1.52 0 0 3.05z" fill="currentColor"></path>
              <path d="M25.9 10.67h1.53v6.09H25.9Z" fill="currentColor"></path>
              <path d="M24.38 7.62h1.52v3.05h-1.52Z" fill="currentColor"></path>
              <path d="M22.85 4.57h1.53v3.05h-1.53Z" fill="currentColor"></path>
              <path d="M21.33 12.19h1.52v3.05h-1.52Z" fill="currentColor"></path>
              <path d="M19.81 9.14h1.52v3.05h-1.52Z" fill="currentColor"></path>
              <path d="M19.81 3.05h3.04v1.52h-3.04Z" fill="currentColor"></path>
              <path d="M16.76 7.62h3.05v1.52h-3.05Z" fill="currentColor"></path>
              <path d="M16.76 1.52h3.05v1.53h-3.05Z" fill="currentColor"></path>
              <path d="M13.71 6.1h3.05v1.52h-3.05Z" fill="currentColor"></path>
              <path d="M10.66 25.9h6.1v1.53h-6.1Z" fill="currentColor"></path>
              <path d="M10.66 0h6.1v1.52h-6.1Z" fill="currentColor"></path>
            </svg>
            <p className="text-xs tracking-[0.2em] uppercase font-mono">
              Start typing to explore the Roviks couture & tailoring archive
            </p>
          </div>
        )}
      </div>

      <div className="w-[calc(100%+48px)] md:w-[calc(100%+96px)] -mx-6 md:-mx-12 mt-16">
        <BrandFooter />
      </div>
    </div>
  );
};
