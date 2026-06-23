import { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ShoppingBag } from "lucide-react";
import { pufferCards, boutiqueItems, mockupItems, BrandFooter } from "../App";

export const ProductDetailPage = ({ productId }: { productId: string }) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("");
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Dynamic Reviews State
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Julien R.",
      rating: 5,
      title: "Masterpiece of design",
      content: "The fabric texture is absolutely incredible. It feels substantial, insulating, and has this premium sheen that is impossible to find in fast fashion. Perfectly structured fit.",
      date: "May 18, 2026",
      verified: true,
      helpful: 12,
    },
    {
      id: 2,
      author: "Elena M.",
      rating: 5,
      title: "Worth every penny",
      content: "Stunning silhouette! The oversized cut is extremely flattering, and it really creates that high-end editorial look. Fast express delivery as promised.",
      date: "April 29, 2026",
      verified: true,
      helpful: 8,
    },
    {
      id: 3,
      author: "Marcus K.",
      rating: 4,
      title: "Superb warmth and materials",
      content: "Extremely warm and comfortable. The only thing is it fits slightly larger than expected, so check the size guide carefully. The quality is flawless.",
      date: "April 12, 2026",
      verified: true,
      helpful: 4,
    }
  ]);

  // Review Form State
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [newName, setNewName] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const product = [...pufferCards, ...boutiqueItems, ...mockupItems].find(p => p.id === productId) || pufferCards[0];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
    setSelectedColor(product.colors?.[0] || "");
    setAdded(false);
    setQuantity(1);
  }, [productId, product]);

  // Image Zoom State and Handlers
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
    transform: 'scale(1)',
    transformOrigin: 'center center'
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transform: 'scale(2.2)',
      transformOrigin: `${x}% ${y}%`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: 'scale(1)',
      transformOrigin: 'center center'
    });
  };

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);

    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      img: product.img,
      quantity,
      size: selectedSize,
      color: selectedColor || product.colors?.[0] || "#ffffff",
    };

    try {
      const existingCart = JSON.parse(localStorage.getItem('roviks_cart') || '[]');
      const itemIndex = existingCart.findIndex((item: any) => item.id === cartItem.id && item.size === cartItem.size);
      if (itemIndex > -1) {
        existingCart[itemIndex].quantity += quantity;
      } else {
        existingCart.push(cartItem);
      }
      localStorage.setItem('roviks_cart', JSON.stringify(existingCart));
      window.dispatchEvent(new Event('cart-changed'));
    } catch (e) {
      console.error('Failed to save cart item:', e);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newTitle || !newContent) return;

    const newReview = {
      id: reviews.length + 1,
      author: newName,
      rating: newRating,
      title: newTitle,
      content: newContent,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      verified: false,
      helpful: 0,
    };

    setReviews([newReview, ...reviews]);
    setNewName("");
    setNewTitle("");
    setNewContent("");
    setNewRating(5);
    setWriteReviewOpen(false);
  };

  const related = [...pufferCards, ...boutiqueItems, ...mockupItems]
    .filter(p => p.id !== productId)
    .slice(0, 4);

  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1);

  const renderStars = (rating: number, size = "w-4 h-4") => {
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg 
            key={i} 
            className={`${size} ${i < rating ? 'text-white fill-white' : 'text-white/10 fill-white/10'}`} 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="1.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.196-.612.89-.612 1.086 0l1.79 5.515a1 1 0 00.95.69h5.798c.646 0 .913.83.392 1.23l-4.69 3.407a1 1 0 00-.363 1.118l1.79 5.515c.2.615-.504 1.127-1.025.748l-4.69-3.407a1 1 0 00-1.175 0l-4.69 3.407c-.52.38-1.225-.133-1.025-.748l1.79-5.515a1 1 0 00-.363-1.118l-4.69-3.407c-.52-.4-.253-1.23.392-1.23h5.797a1 1 0 00.95-.69l1.79-5.515z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div 
      ref={scrollRef}
      className="pt-28 pb-12 w-full min-h-screen text-white flex flex-col items-center overflow-y-visible bg-[#000000] z-20 relative px-6 md:px-12"
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="w-full max-w-6xl flex flex-col gap-12">
        {/* Back navigation */}
        <div className="flex justify-between items-center text-xs tracking-wider uppercase font-mono text-white/50">
          <a href="#shop" className="hover:text-white flex items-center gap-2 transition-colors">
            <ChevronLeftIcon className="w-4 h-4" /> Back to Shop
          </a>
          <span>Roviks / Outerwear / {product.title}</span>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Image with Hover Zoom */}
          <div className="flex flex-col gap-4">
            <div 
              className="relative group bg-[#111111] border border-white/5 rounded-3xl overflow-hidden p-6 aspect-square flex items-center justify-center cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src={product.img} 
                alt={product.title} 
                style={zoomStyle}
                className="max-h-[85%] w-auto object-contain transition-transform duration-200 rounded-2xl"
              />
              {/* Zoom Instruction overlay */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] uppercase tracking-widest text-white/80 border border-white/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Hover to Zoom
              </div>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex justify-between items-start gap-4">
                <span className="text-xs uppercase tracking-widest text-white/60 font-mono">{product.subtitle}</span>
                {/* Visual Average rating stars click triggers scrolling to reviews */}
                <button 
                  onClick={() => {
                    const el = document.getElementById("reviews-section");
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                >
                  {renderStars(Math.round(parseFloat(averageRating)), "w-3.5 h-3.5")}
                  <span className="text-[10px] text-white/40 font-mono font-bold">({totalReviews})</span>
                </button>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-white mt-2 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-mono text-white font-bold">{product.price}</span>
                <span className="text-[10px] font-mono tracking-widest bg-white/10 text-white border border-white/20 px-2.5 py-1 rounded-full uppercase">
                  In Stock & Ready
                </span>
              </div>
            </div>

            <p className="text-sm text-white/70 leading-relaxed font-light">
              {product.description || "Designed with premium weather-resistant fabrics and down fills, signature branding details, and tailored closures for superior modern comfort."}
            </p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wider text-white/40 font-mono">Select Color</span>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${selectedColor === color ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector with Size Guide Trigger */}
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-wider text-white/40 font-mono">Select Size</span>
                <button 
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-xs text-white hover:underline cursor-pointer tracking-wider font-mono uppercase"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center text-sm font-semibold tracking-wider transition-all duration-300 ${selectedSize === size ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/10 hover:border-white/30'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Bag Row */}
            <div className="flex flex-col gap-4 mt-2">
              <span className="text-xs uppercase tracking-wider text-white/40 font-mono">Quantity</span>
              <div className="flex gap-4 items-center">
                <div className="flex items-center border border-white/10 rounded-xl bg-white/5 h-12 px-2">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-white font-mono transition-colors text-sm"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono text-sm">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => Math.min(10, q + 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 text-white font-mono transition-colors text-sm"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 rounded-full font-semibold uppercase tracking-widest text-xs transition-all duration-500 transform hover:scale-[1.02] active:scale-95 ${added ? 'bg-white text-black shadow-lg shadow-white/20' : 'bg-white text-black hover:bg-neutral-200'}`}
                >
                  {added ? 'Added to Cart' : `Add ${quantity} to Bag`}
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 border-t border-b border-white/5 py-4 mt-2 text-[9px] tracking-widest uppercase font-mono text-white/40 text-center">
              <div className="flex flex-col items-center gap-1 border-r border-white/5">
                <span className="text-white text-xs">✦</span>
                <span>Free Express Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-r border-white/5">
                <span className="text-white text-xs">✦</span>
                <span>Complimentary Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-white text-xs">✦</span>
                <span>Bespoke Quality</span>
              </div>
            </div>

            {/* Accordion Detail Info */}
            <div className="border-b border-white/10 flex flex-col divide-y divide-white/5">
              <details className="py-4 group">
                <summary className="text-xs tracking-wider uppercase font-mono cursor-pointer flex justify-between items-center select-none text-white/80 list-none">
                  <span>Product Features</span>
                  <span className="transition-transform group-open:rotate-180">↓</span>
                </summary>
                <div className="mt-3 text-xs text-white/60 leading-relaxed font-light flex flex-col gap-1.5 pl-2">
                  <span>• Triple-layered water-impermeable active membrane shell</span>
                  <span>• 800+ fill power down insulation</span>
                  <span>• Fleece-lined security hand warmer pockets</span>
                  <span>• Premium metal hardware and signature branding</span>
                </div>
              </details>
              <details className="py-4 group">
                <summary className="text-xs tracking-wider uppercase font-mono cursor-pointer flex justify-between items-center select-none text-white/80 list-none">
                  <span>Composition & Care</span>
                  <span className="transition-transform group-open:rotate-180">↓</span>
                </summary>
                <div className="mt-3 text-xs text-white/60 leading-relaxed font-light flex flex-col gap-1.5 pl-2">
                  <span>• Main Fabric: 100% Recycled Technical Polyester / Nylon</span>
                  <span>• Lining: 100% Pure Mulberry Silk / Soft-fleece backing</span>
                  <span>• Fill: 90% White Goose Down, 10% Feathers</span>
                  <span>• Professional dry clean only. Do not wash, bleach or iron.</span>
                </div>
              </details>
              <details className="py-4 group">
                <summary className="text-xs tracking-wider uppercase font-mono cursor-pointer flex justify-between items-center select-none text-white/80 list-none">
                  <span>Shipping & Returns</span>
                  <span className="transition-transform group-open:rotate-180">↓</span>
                </summary>
                <p className="mt-3 text-xs text-white/60 leading-relaxed font-light pl-2">
                  Complimentary worldwide express shipping on all orders. Deliveries completed within 2-4 business days. Returns or size exchanges are complimentary within 14 days of receipt.
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* Dynamic Client Reviews Section */}
        <div id="reviews-section" className="mt-16 border-t border-white/10 pt-16 flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-white font-mono">Customer Feedback</span>
            <h2 className="text-3xl font-serif text-white uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Client Reviews
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Left Col: Ratings Summary Card */}
            <div className="flex flex-col gap-6 bg-[#111111] border border-white/5 p-8 rounded-3xl">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-serif text-white">{averageRating}</span>
                <div className="flex flex-col gap-1">
                  {renderStars(Math.round(parseFloat(averageRating)), "w-5 h-5")}
                  <span className="text-[10px] text-white/50 tracking-wider font-mono">Based on {totalReviews} reviews</span>
                </div>
              </div>

              {/* Rating Bars */}
              <div className="flex flex-col gap-3 border-t border-b border-white/5 py-6 font-mono text-[10px] text-white/50 uppercase tracking-widest">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = reviews.filter((r) => r.rating === stars).length;
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={stars} className="flex items-center gap-4">
                      <span className="w-14">{stars} Stars</span>
                      <div className="flex-1 bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-white h-full rounded-full transition-all duration-500" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-6 text-right font-mono">{count}</span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setWriteReviewOpen(!writeReviewOpen)}
                className="w-full h-12 rounded-full border border-white/10 hover:border-white/30 text-white font-semibold uppercase tracking-widest text-xs transition-all duration-300 bg-white/5 hover:bg-white/10"
              >
                {writeReviewOpen ? "Cancel Review" : "Write A Review"}
              </button>
            </div>

            {/* Right Col: Reviews List & Write form */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Write Review Form */}
              {writeReviewOpen && (
                <form 
                  onSubmit={handleReviewSubmit}
                  className="bg-[#111111] border border-white/10 p-8 rounded-3xl flex flex-col gap-5 animate-fadeIn"
                >
                  <h3 className="font-serif text-xl text-white uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Share Your Experience
                  </h3>

                  {/* Star Selector */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-wider text-white/40 font-mono">Your Rating</span>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="focus:outline-none transition-transform duration-200 hover:scale-110"
                        >
                          <svg 
                            className={`w-6 h-6 ${(hoverRating || newRating) >= star ? 'text-white fill-white' : 'text-white/10 fill-white/10'}`} 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="1.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.196-.612.89-.612 1.086 0l1.79 5.515a1 1 0 00.95.69h5.798c.646 0 .913.83.392 1.23l-4.69 3.407a1 1 0 00-.363 1.118l1.79 5.515c.2.615-.504 1.127-1.025.748l-4.69-3.407a1 1 0 00-1.175 0l-4.69 3.407c-.52.38-1.225-.133-1.025-.748l1.79-5.515a1 1 0 00-.363-1.118l-4.69-3.407c-.52-.4-.253-1.23.392-1.23h5.797a1 1 0 00.95-.69l1.79-5.515z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-wider text-white/40 font-mono">Your Name</span>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Julien R."
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-white transition-colors font-light"
                    />
                  </div>

                  {/* Review Title */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-wider text-white/40 font-mono">Review Title</span>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Flawless jacket!"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-white transition-colors font-light"
                    />
                  </div>

                  {/* Review Body */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-wider text-white/40 font-mono">Review Comments</span>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Share details regarding quality, material drape, silhouette, etc..."
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-white transition-colors font-light resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 bg-white hover:bg-neutral-200 text-black font-semibold uppercase tracking-widest text-xs rounded-full transition-all duration-300 transform active:scale-95"
                  >
                    Submit Review
                  </button>
                </form>
              )}

              {/* Reviews List container */}
              <div className="flex flex-col gap-6">
                {reviews.map((review) => (
                  <div 
                    key={review.id} 
                    className="border-b border-white/5 pb-6 flex flex-col gap-3 font-sans"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-white tracking-wide">{review.author}</span>
                        {review.verified && (
                          <span className="text-[9px] bg-white/10 text-white border border-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-white/30 font-mono font-light">{review.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {renderStars(review.rating)}
                      <h4 className="font-serif text-base text-white tracking-wide font-medium">{review.title}</h4>
                    </div>

                    <p className="text-sm text-white/60 font-light leading-relaxed">
                      {review.content}
                    </p>

                    {/* Review Helpfulness vote */}
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[10px] text-white/30 tracking-widest uppercase font-mono">Was this helpful?</span>
                      <button 
                        onClick={() => {
                          setReviews(reviews.map(r => r.id === review.id ? { ...r, helpful: r.helpful + 1 } : r));
                        }}
                        className="text-[10px] text-white hover:underline cursor-pointer uppercase font-mono tracking-wider"
                      >
                        Yes ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 border-t border-white/10 pt-16">
          <h3 className="text-xl font-bold tracking-tight text-white uppercase mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
            You May Also Like
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {related.map((card) => (
              <a
                key={card.id}
                href={`#product-${card.id}`}
                className="flex flex-col group cursor-pointer transition-all duration-300 relative bg-white pb-3"
              >
                {/* Image Container */}
                <div className="w-full relative">
                      <div className="w-full overflow-hidden">
                        <img
                          src={card.img}
                          alt={card.title}
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
                    {card.title}
                  </h3>
                  <p className="text-[11px] font-bold text-gray-800 uppercase tracking-widest mt-0.5 leading-tight">
                    {card.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[12px] font-bold text-gray-800">{card.price}</span>
                    {card.originalPrice && (
                      <span className="text-[12px] font-bold text-[#e53e3e] line-through decoration-1">{card.originalPrice}</span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="w-[calc(100%+48px)] md:w-[calc(100%+96px)] -mx-6 md:-mx-12 mt-16">
          <BrandFooter />
        </div>
      </div>

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-white/10 rounded-3xl max-w-md w-full p-8 relative animate-fadeIn">
            <button 
              onClick={() => setSizeGuideOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white text-lg font-mono uppercase tracking-widest text-xs"
            >
              Close ✕
            </button>
            <h3 className="font-serif text-2xl text-white mb-6 uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Sizing Chart
            </h3>
            <p className="text-xs text-white/50 mb-6 font-light leading-relaxed">
              Measurements below refer to body dimensions. All garments are designed with a relaxed, tailored silhouette.
            </p>
            <div className="border border-white/5 rounded-2xl overflow-hidden text-xs">
              <div className="grid grid-cols-4 bg-white/5 p-3 font-semibold uppercase tracking-wider text-white/60">
                <span>Size</span>
                <span>Chest</span>
                <span>Waist</span>
                <span>Sleeve</span>
              </div>
              {[
                { size: "S", chest: '36" - 38"', waist: '30" - 32"', sleeve: '33.5"' },
                { size: "M", chest: '39" - 41"', waist: '33" - 35"', sleeve: '34.5"' },
                { size: "L", chest: '42" - 44"', waist: '36" - 38"', sleeve: '35.5"' },
                { size: "XL", chest: '45" - 47"', waist: '39" - 41"', sleeve: '36.5"' },
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-4 p-3 border-t border-white/5 font-mono text-white/80">
                  <span className="font-bold text-white">{row.size}</span>
                  <span>{row.chest}</span>
                  <span>{row.waist}</span>
                  <span>{row.sleeve}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-[10px] text-white/30 tracking-wide leading-relaxed">
              * For oversized puffer jackets, we recommend ordering your normal size. If you prefer a closer fit, please size down.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
