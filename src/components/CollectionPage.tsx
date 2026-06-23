import { pufferCards, BrandFooter } from '../App';
import { ShoppingBag } from 'lucide-react';

export const CollectionPage = () => {
  return (
    <div className="pt-28 pb-12 w-full min-h-screen text-white flex flex-col items-center overflow-y-visible bg-[#000000] z-20 relative px-6 md:px-12">
      {/* Background elements */}
      <img
        src="/assets/Earth.png"
        alt="Earth"
        className="absolute pointer-events-none h-auto left-[2px] top-[61px] w-[132px] z-[43] opacity-100 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] brightness-100 md:left-6 md:top-24 md:w-48 md:z-auto md:opacity-20 md:drop-shadow-none md:brightness-50"
      />
      <img
        src="/assets/clouds.png"
        alt="Clouds"
        className="absolute pointer-events-none h-auto right-[-7px] bottom-[-37px] top-auto w-[148px] z-40 opacity-100 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] md:right-6 md:bottom-auto md:top-96 md:w-72 md:z-auto md:opacity-15 md:drop-shadow-none"
      />

      <div className="w-full max-w-6xl flex flex-col items-center">

        {/* Feature Card with Video Background (Uncropped/Full Video Size) */}
        <div
          className="w-full border border-white/15 rounded-[32px] relative overflow-hidden text-white mb-16"
          style={{
            boxShadow: '0 0 35px rgba(255, 255, 255, 0.12), 0 0 15px rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* Background Video determines container size */}
          <video
            src="/assets/bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto min-h-[350px] sm:min-h-0 object-cover block z-0"
            style={{ filter: 'brightness(0.45)' }}
          />

          {/* Dark Overlay gradient for extra readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60 z-10 pointer-events-none" />

          {/* Centered Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4 text-center">
            {/* NEW COLLECTION */}
            <h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-sans uppercase tracking-[0.22em] text-white select-none font-bold leading-none"
              style={{
                fontFamily: "'Poppins', sans-serif",
                textShadow: '0 4px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.6)'
              }}
            >
              NEW<br className="block sm:hidden" /> COLLECTION
            </h1>

            {/* SUBTITLE */}
            <p
              className="text-[7px] sm:text-[10px] md:text-xs tracking-[0.2em] text-white/80 uppercase mt-2 max-w-[250px] sm:max-w-md select-none font-mono"
              style={{
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
              }}
            >
              AUTUMN / WINTER 2026 OUTERWEAR & COUTURE SILHOUETTES
            </p>

            {/* COMING SOON */}
            <h2
              className="text-xs sm:text-xl md:text-3xl lg:text-4xl font-black tracking-[0.3em] text-white uppercase mt-4 sm:mt-8 select-none"
              style={{
                fontFamily: "'Poppins', sans-serif",
                textShadow: '0 4px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.6)'
              }}
            >
              COMING SOON
            </h2>
          </div>

          {/* Text Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 md:p-12 lg:p-16 flex flex-col md:flex-row justify-between items-center md:items-end z-20">
            {/* Left promo */}
            <div className="text-[7px] sm:text-sm font-mono tracking-widest text-white uppercase max-w-[220px] sm:max-w-xs text-center md:text-left mb-1 sm:mb-6 md:mb-0 leading-tight">
              ✦ Exclusive early access to the new season outerwear capsule.
            </div>

            {/* Right promo */}
            <div className="text-[7px] sm:text-xs tracking-widest text-white/60 font-mono text-center md:text-right uppercase leading-tight">
              Limited Edition releases<br />Updated weekly
            </div>
          </div>
        </div>

        {/* Collection items grid */}
        <div className="w-full flex flex-col gap-8 mb-16">
          <h2
            className="text-3xl md:text-4xl font-serif text-white uppercase tracking-wider border-b border-white/10 pb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            The Outerwear Capsule
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pufferCards.map((item) => (
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
        </div>

        {/* Footer wrapper */}
        <div className="w-[calc(100%+48px)] md:w-[calc(100%+96px)] -mx-6 md:-mx-12 mt-16 bg-[#000000]">
          <BrandFooter />
        </div>
      </div>
    </div>
  );
};
