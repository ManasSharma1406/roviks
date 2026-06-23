import { useState, useEffect } from 'react';
import { BrandFooter } from '../App';

export const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'success'>('cart');

  const loadCart = () => {
    try {
      const items = JSON.parse(localStorage.getItem('roviks_cart') || '[]');
      setCartItems(items);
    } catch (e) {
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();
    window.addEventListener('cart-changed', loadCart);
    return () => window.removeEventListener('cart-changed', loadCart);
  }, []);

  const updateQuantity = (id: string, size: string, change: number) => {
    const updated = cartItems.map(item => {
      if (item.id === id && item.size === size) {
        const newQty = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem('roviks_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-changed'));
  };

  const removeItem = (id: string, size: string) => {
    const updated = cartItems.filter(item => !(item.id === id && item.size === size));
    setCartItems(updated);
    localStorage.setItem('roviks_cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cart-changed'));
  };

  const handleCheckout = () => {
    setCheckoutStep('success');
    localStorage.removeItem('roviks_cart');
    window.dispatchEvent(new Event('cart-changed'));
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return sum + (numericPrice * item.quantity);
  }, 0);
  
  const shipping = subtotal > 0 ? 25.00 : 0;
  const total = subtotal + shipping;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  if (checkoutStep === 'success') {
    return (
      <div className="pt-28 pb-12 w-full min-h-screen text-white flex flex-col items-center overflow-y-visible bg-[#000000] z-20 relative px-6 md:px-12">
        <div className="w-full max-w-xl flex flex-col items-center justify-center py-20 text-center min-h-[60vh] gap-6 animate-fadeIn">
          <span className="text-6xl mb-2">✦</span>
          <h1 
            className="text-4xl font-extrabold tracking-widest text-white uppercase"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            ORDER PLACED
          </h1>
          <p className="text-xs tracking-widest font-mono text-white/50 uppercase leading-relaxed max-w-sm">
            Thank you for shopping at Roviks. Your order has been placed successfully. A confirmation email has been sent.
          </p>
          <a
            href="#shop"
            className="mt-4 px-8 py-3 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-neutral-200 transition-colors cursor-pointer select-none"
          >
            Continue Shopping
          </a>
        </div>
        <div className="w-[calc(100%+48px)] md:w-[calc(100%+96px)] -mx-6 md:-mx-12 mt-16">
          <BrandFooter />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-12 w-full min-h-screen text-white flex flex-col items-center overflow-y-visible bg-[#000000] z-20 relative px-6 md:px-12">
      <div className="w-full max-w-6xl flex flex-col gap-12 min-h-[75vh]">
        {/* Title */}
        <div className="border-b border-white/5 pb-8">
          <h1 
            className="text-4xl md:text-5xl font-extrabold tracking-widest text-white uppercase"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Shopping Bag
          </h1>
          <p className="text-[10px] font-mono tracking-widest text-white/40 uppercase mt-1">
            {cartItems.length === 0 ? "Your bag is empty" : `You have ${cartItems.reduce((acc, i) => acc + i.quantity, 0)} items in your bag`}
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items List (2/3 Width) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {cartItems.map((item) => (
                <div 
                  key={`${item.id}-${item.size}`}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/5 pb-6"
                >
                  {/* Product Info */}
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-[#ececec] overflow-hidden flex items-center justify-center rounded-2xl flex-shrink-0">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-contain p-3"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-xs font-bold tracking-wider text-white uppercase">{item.title}</h3>
                      <p className="text-[9px] text-white/50 tracking-wider uppercase mt-0.5">Roviks Tailoring</p>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-[10px] font-mono text-white/40 uppercase">Size:</span>
                        <span className="text-[10px] font-mono font-bold text-white bg-white/5 px-2 py-0.5 rounded border border-white/10">{item.size}</span>
                        
                        <span className="text-[10px] font-mono text-white/40 uppercase ml-2">Color:</span>
                        <div 
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Price Controls */}
                  <div className="flex sm:flex-col items-end justify-between sm:justify-center w-full sm:w-auto gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-white/10 rounded-full bg-white/5 h-9 overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, -1)}
                        className="px-3.5 text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono text-xs font-bold text-white w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, 1)}
                        className="px-3.5 text-white/60 hover:text-white transition-colors cursor-pointer text-sm"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm font-bold text-white">{item.price}</span>
                      <button 
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-white/40 hover:text-white transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Details (1/3 Width) */}
            <div className="flex flex-col gap-6 bg-white/[0.02] border border-white/5 rounded-3xl p-6 h-fit">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 border-b border-white/5 pb-3">
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 font-sans text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Subtotal</span>
                  <span className="font-mono text-white">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Shipping</span>
                  <span className="font-mono text-white">{formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-4 font-bold text-base">
                  <span>Grand Total</span>
                  <span className="font-mono text-white">{formatCurrency(total)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 mt-4 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-neutral-200 transition-all cursor-pointer text-center select-none"
              >
                Proceed to Checkout
              </button>
              
              <div className="text-[10px] text-white/30 text-center uppercase tracking-wider font-mono">
                ✦ Secure payment processed instantly
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
            <span className="text-5xl text-white/30">✦</span>
            <p className="text-sm tracking-widest font-mono text-white/40 uppercase">
              You haven't selected any pieces yet.
            </p>
            <a
              href="#shop"
              className="px-8 py-3 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-neutral-200 transition-colors cursor-pointer select-none"
            >
              Start Exploring
            </a>
          </div>
        )}
      </div>

      <div className="w-[calc(100%+48px)] md:w-[calc(100%+96px)] -mx-6 md:-mx-12 mt-16">
        <BrandFooter />
      </div>
    </div>
  );
};
