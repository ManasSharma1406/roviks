import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import Lenis from 'lenis';
import { ChevronLeftIcon, ChevronRightIcon, User, ShoppingBag } from "lucide-react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";
import { cn } from "@/lib/utils";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { ShopPage } from "./components/ShopPage";
import { CollectionPage } from "./components/CollectionPage";
import { SearchPage } from "./components/SearchPage";
import { ProfilePage } from "./components/ProfilePage";
import { CartPage } from "./components/CartPage";
import { TopBlur } from "@/components/ui/edge-blur";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";

const PORTAL_BG = "/assets/seclayer.jpg";
const WORLD_BG = "/assets/background1.jpeg";
const MOBILE_WORLD_BG = "/assets/mobilebg.jpeg";
const JESUS_IMG = "/assets/jesus.png";
const MOBILE_CHAR_IMG = "/assets/mobilechar.png";
const LOGO_IMG = "/assets/logo.png";

const NOISE_SVG = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E";

const PARTICLE_COUNT = 100;
const particlesArray = Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3.5 + 1.2,
  delay: Math.random() * -20, // Negative delay so particles are pre-warmed on load
  duration: Math.random() * 12 + 10,
  opacity: Math.random() * 0.4 + 0.3,
}));

// Helper functions
const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

// Responsive Hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);
  return isMobile;
};

// Logo Image Component
const Logo = ({ invertMobile }: { invertMobile?: boolean } = {}) => (
  <a href="#" className="w-[28px] h-[28px] relative shrink-0 block cursor-pointer">
    <img
      src={LOGO_IMG}
      alt="Logo"
      className={`absolute top-[-17px] left-1/2 -translate-x-1/2 h-[85px] max-h-none max-w-none object-contain ${invertMobile ? 'invert md:invert' : 'invert-0 md:invert'}`}
    />
  </a>
);

export const BrandFooter = () => {
  return (
    <footer className="w-full bg-[#000000] text-white pt-4 pb-8 px-6 md:px-12 select-none relative overflow-hidden">
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .curved-text {
          fill: #ffffff;
          transition: fill 0.3s ease;
        }
        .shop-now-link:hover .curved-text {
          fill: #ffffff;
        }
      `}</style>
      {/* Main Container: Graphic in the middle, content aligned */}
      <div className="max-w-[1400px] mx-auto flex flex-col items-center justify-start relative">

        <div className="w-full flex justify-center items-center pt-8 pb-4">
          <span
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(32px, 5.5vw, 68px)',
              letterSpacing: '0.04em',
              color: '#ffffffff',
              textAlign: 'center',
              lineHeight: 1.1,
              fontStyle: 'italic',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 0
            }}
          >
            <span style={{ fontSize: 'clamp(72px, 7.5vw, 96px)', fontStyle: 'normal', fontWeight: 200, color: '#ffffff' }}>Confidence</span>
            <span style={{ fontFamily: "'Poppins', sans-serif", marginTop: '-15px' }}>=</span>
            <img
              src="/assets/logo.png"
              alt="Roviks"
              style={{
                filter: 'invert(1)',
                height: 'clamp(116px, 12vw, 150px)',
                width: 'auto',
                display: 'inline-block',
                objectFit: 'contain',
                transform: 'translateY(-8px)'
              }}
            />
          </span>
        </div>

        {/* Earth image container */}
        <div className="w-full flex justify-center items-center py-6 md:py-10 my-2 relative">
          <img
            src="/assets/Earth.png"
            alt="Earth"
            style={{
              height: 'clamp(140px, 18vw, 240px)',
              width: 'auto',
              objectFit: 'contain',
              animation: 'spin-slow 80s linear infinite',
              filter: 'drop-shadow(0 0 50px rgba(163, 230, 53, 0.12))',
            }}
          />

          {/* Curved Text Overlay */}
          <a
            href="#shop"
            className="absolute z-10 flex items-center justify-center cursor-pointer shop-now-link"
            style={{
              width: 'clamp(220px, 28vw, 380px)',
              height: 'clamp(220px, 28vw, 380px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <svg
              viewBox="0 0 300 300"
              className="w-full h-full pointer-events-none"
            >
              {/* Define the path for the curved text */}
              <path
                id="textPath-shop-now"
                d="M 40,150 A 110,110 0 0,0 260,150"
                fill="none"
                stroke="none"
              />
              {/* The curved text */}
              <text
                className="curved-text"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.45em',
                  textTransform: 'uppercase',
                }}
              >
                <textPath
                  href="#textPath-shop-now"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  ✦ Shop It Now ✦
                </textPath>
              </text>
            </svg>
          </a>
        </div>

        {/* Footer Info Row */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-4 text-[10px] tracking-widest uppercase font-mono text-white/50">

          {/* Left Column: Contacts & Policies */}
          <div className="flex flex-col gap-5 text-left">
            <div>
              <div className="text-white/30 mb-1">Contacts:</div>
              <a href="tel:+79085696730" className="text-white hover:text-neutral-400 block transition-colors">+7(908)569-67-30</a>
              <a href="mailto:thecreators@gmail.com" className="text-white hover:text-neutral-400 block transition-colors">thecreators@gmail.com</a>
            </div>

            <div className="flex flex-col gap-1">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#offer" className="hover:text-white transition-colors">Public Offer</a>
            </div>
          </div>

          {/* Right Column: Address & Socials */}
          <div className="flex flex-col gap-5 text-left md:text-right items-start md:items-end w-full md:w-auto">
            <div>
              <div className="text-white/30 mb-1">Address:</div>
              <div className="text-white">Moscow, st. stolichnaya, 26</div>
              <div className="text-white">Mon-Sun: 10:00 to 20:00</div>
            </div>

            {/* Social Icons matching the mockup */}
            <div className="flex items-center gap-3">
              {/* YouTube */}
              <a href="#youtube" className="w-6 h-6 rounded bg-white hover:bg-neutral-200 text-black flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              {/* Telegram */}
              <a href="#telegram" className="w-6 h-6 rounded bg-white hover:bg-neutral-200 text-black flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0C5.344 0 0 5.344 0 12c0 6.656 5.344 12 11.944 12 6.656 0 12-5.344 12-12 0-6.656-5.344-12-12-12zm5.824 8.24c-.176 1.848-.936 6.376-1.32 8.432-.16.88-.48 1.176-.792 1.208-.688.064-1.208-.456-1.872-.896-1.04-.688-1.632-1.112-2.64-1.776-1.168-.768-.408-1.192.256-1.88.176-.176 3.12-2.856 3.176-3.096.008-.032.008-.16-.064-.224-.072-.064-.176-.04-.256-.024-.112.024-1.896 1.2-5.36 3.536-.504.352-.96.52-1.368.512-.448-.008-1.312-.248-1.952-.456-.784-.256-1.408-.392-1.352-.832.024-.224.336-.456.928-.688 3.632-1.584 6.056-2.624 7.272-3.12 3.464-1.408 4.184-1.648 4.656-1.656.104 0 .336.024.488.152.128.104.16.248.176.352-.008.08.008.232-.008.384z" />
                </svg>
              </a>
              {/* VK */}
              <a href="#vk" className="w-6 h-6 rounded bg-white hover:bg-neutral-200 text-black flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.684 24c-8.91 0-14.004-6.104-14.226-16.27h4.444c.154 7.457 3.43 10.609 6.03 11.26V7.73h4.178v6.43c2.558-.275 5.234-3.197 6.14-7.73h4.178c-.714 5.378-4.668 8.3-6.14 9.155C21.986 16.59 24 20.218 24 24h-4.686c-.958-3.003-3.344-5.323-6.14-5.597V24h-1.49z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#instagram" className="w-6 h-6 rounded bg-white hover:bg-neutral-200 text-black flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export const pufferCards = [
  {
    id: "navy-hopsack-sport-coat",
    title: "SHADOW 7",
    subtitle: "OVERSIZED TEE",
    img: "/assets/shadow_7.png",
    colors: ["#1e293b", "#000000"],
    price: "RS. 899.00",
    originalPrice: "RS. 1,299.00",
    description: "An exquisite blazer crafted from breathable navy hopsack wool. Features structured shoulders, patch pockets, a two-button front roll, and double vents."
  },
  {
    id: "brown-wales-linen-coat",
    title: "SHADOW 7",
    subtitle: "OVERSIZED TEE",
    img: "/assets/shadow_7.png",
    colors: ["#7c2d12", "#451a03"],
    price: "RS. 899.00",
    originalPrice: "RS. 1,299.00",
    description: "Tailored from a premium linen-wool blend featuring the classic Prince of Wales check pattern. Finished with notch lapels, flap pockets, and horn buttons."
  },
  {
    id: "brown-wales-merino-coat",
    title: "SHADOW 7",
    subtitle: "OVERSIZED TEE",
    img: "/assets/shadow_7.png",
    colors: ["#78350f", "#451a03"],
    price: "RS. 899.00",
    originalPrice: "RS. 1,299.00",
    description: "Woven from extra-fine merino wool in a subtle micro-check. A half-canvas construction ensures a perfect drape that contours to your frame over time."
  },
  {
    id: "mid-grey-sharkskin-suit",
    title: "SHADOW 7",
    subtitle: "OVERSIZED TEE",
    img: "/assets/shadow_7.png",
    colors: ["#4b5563", "#1f2937"],
    price: "RS. 899.00",
    originalPrice: "RS. 1,299.00",
    description: "A sharp two-piece suit tailored in luxurious sharkskin-weave wool. Features structured shoulders, classic flap pockets, and matching trousers."
  },
  {
    id: "navy-hopsack-blazer-alt",
    title: "SHADOW 7",
    subtitle: "OVERSIZED TEE",
    img: "/assets/shadow_7.png",
    colors: ["#1e293b"],
    price: "RS. 899.00",
    originalPrice: "RS. 1,299.00",
    description: "Classic styling meets versatile comfort. Crafted with lightweight hopsack wool weave, ideal for sophisticated seasonal layering."
  },
  {
    id: "brown-linen-blazer-alt",
    title: "SHADOW 7",
    subtitle: "OVERSIZED TEE",
    img: "/assets/shadow_7.png",
    colors: ["#7c2d12"],
    price: "RS. 899.00",
    originalPrice: "RS. 1,299.00",
    description: "Finished with premium horn buttons and a soft unstructured drape. Woven in a classic brown herringbone design."
  },
  {
    id: "brown-wool-suit-jacket-alt",
    title: "SHADOW 7",
    subtitle: "OVERSIZED TEE",
    img: "/assets/shadow_7.png",
    colors: ["#78350f"],
    price: "RS. 899.00",
    originalPrice: "RS. 1,299.00",
    description: "Expertly constructed from Italian merino wool, featuring rich brown shades and a fine texture that pairs perfectly with tailored trousers."
  },
  {
    id: "charcoal-sharkskin-suit-alt",
    title: "SHADOW 7",
    subtitle: "OVERSIZED TEE",
    img: "/assets/shadow_7.png",
    colors: ["#1f2937"],
    price: "RS. 899.00",
    originalPrice: "RS. 1,299.00",
    description: "A formal suit of pristine tailoring. Rendered in a deep charcoal sharkskin weave that commands attention in any setting."
  }
];

export const boutiqueItems = [
  {
    id: "brown-wales-linen-coat",
    title: "SHADOW 7",
    subtitle: "OVERSIZED TEE",
    img: "/assets/shadow_7.png",
    colors: ["#7c2d12", "#451a03"],
    price: "RS. 899.00",
    originalPrice: "RS. 1,299.00",
    description: "Tailored from a premium linen-wool blend featuring the classic Prince of Wales check pattern. Finished with notch lapels, flap pockets, and horn buttons."
  },
  {
    id: "mid-grey-sharkskin-suit",
    title: "SHADOW 7",
    subtitle: "OVERSIZED TEE",
    img: "/assets/shadow_7.png",
    colors: ["#4b5563", "#1f2937"],
    price: "RS. 899.00",
    originalPrice: "RS. 1,299.00",
    description: "A sharp two-piece suit tailored in luxurious sharkskin-weave wool. Features structured shoulders, classic flap pockets, and matching trousers."
  }
];

export const mockupItems = [
  {
    id: "navy-hopsack-sport-coat",
    title: "SHADOW 7",
    subtitle: "OVERSIZED TEE",
    img: "/assets/shadow_7.png",
    colors: ["#1e293b", "#000000"],
    price: "RS. 899.00",
    originalPrice: "RS. 1,299.00",
    description: "An exquisite blazer crafted from breathable navy hopsack wool. Features structured shoulders, patch pockets, a two-button front roll, and double vents."
  },
  {
    id: "brown-wales-merino-coat",
    title: "SHADOW 7",
    subtitle: "OVERSIZED TEE",
    img: "/assets/shadow_7.png",
    colors: ["#78350f", "#451a03"],
    price: "RS. 899.00",
    originalPrice: "RS. 1,299.00",
    description: "Woven from extra-fine merino wool in a subtle micro-check. A half-canvas construction ensures a perfect drape that contours to your frame over time."
  }
];


export default function App() {
  const isMobile = useIsMobile();

  // React State driven by scroll
  const scene1Ref = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('roviks_cart') || '[]');
      const count = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
      setCartCount(count);
    } catch (e) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cart-changed', updateCartCount);
    return () => window.removeEventListener('cart-changed', updateCartCount);
  }, []);

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
    return () => {
      lenis.destroy();
    };
  }, []);

  // New Collection Auto-scroll Image State & Timer
  const [activeNewCollIndex, setActiveNewCollIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNewCollIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Entrance Timers
  const [uiVisible, setUiVisible] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);

  // Refs for tracking DOM elements & values for the RAF loop
  const containerRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);


  // Mouse Coordinates (normalized to [-1, 1])
  const rawMouseRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });
  const scrollProgressRef = useRef(0);

  // Synchronize Scroll Progress Ref with State


  // Listen for hash routing change
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Reset scroll and progress state when returning to the home page
  useEffect(() => {
    const isHome = currentHash === '' || currentHash === '#';
    if (isHome) {
      window.scrollTo(0, 0);
      scrollProgressRef.current = 0;
    }
  }, [currentHash]);

  // Entrance timers sequence & scroll restoration
  useEffect(() => {
    const isShop = window.location.hash === '#shop' ||
      window.location.hash === '#collection' ||
      window.location.hash === '#search' ||
      window.location.hash === '#profile' ||
      window.location.hash === '#cart' ||
      window.location.hash.startsWith('#product-');
    if (isShop) {
      setUiVisible(true);
      setEntranceDone(true);
      return;
    }

    // Force scroll to top on refresh for home view
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const t2 = setTimeout(() => {
      setUiVisible(true);
    }, 600);

    const t3 = setTimeout(() => {
      setEntranceDone(true);
    }, 2200);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Window Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollHeight = containerRef.current.scrollHeight;
      const viewportHeight = window.innerHeight;
      const progress = window.scrollY / (scrollHeight - viewportHeight);
      scrollProgressRef.current = clamp(progress, 0, 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse move listener (desktop only)
  useEffect(() => {
    const mobileCheck = window.matchMedia('(max-width: 767px)').matches;
    if (mobileCheck) return;

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      rawMouseRef.current = {
        x: (e.clientX - halfW) / halfW,
        y: (e.clientY - halfH) / halfH
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // requestAnimationFrame Parallax updates loop
  useEffect(() => {
    let animId = 0;

    const update = () => {
      // Lerp mouse coordinates
      smoothMouseRef.current.x = lerp(smoothMouseRef.current.x, rawMouseRef.current.x, 0.07);
      smoothMouseRef.current.y = lerp(smoothMouseRef.current.y, rawMouseRef.current.y, 0.07);

      const sp = scrollProgressRef.current;
      const mx = smoothMouseRef.current.x;
      const my = smoothMouseRef.current.y;

      // Zoom Phase progress (0.0 to 0.60)
      const zoomProgress = clamp(sp / 0.60, 0, 1);
      const zoomEp = easeInOut(zoomProgress);

      // 1. World Background (z-index: 0, scale: 1 -> 1.18, MAG: 6)
      if (worldRef.current) {
        const scale = lerp(1, 1.18, zoomEp);
        const ox = -mx * 6;
        const oy = -my * 6;
        worldRef.current.style.transform = `translate(${ox}px, ${oy}px) scale(${scale})`;
      }

      // 2. Jesus Image (z-index: 10, scale: 1 -> 1.4, MAG: 9 (Y dampened to 0.4x), Opacity: 0.7 -> 1.0 in first 5% scroll)
      if (cloudsRef.current) {
        const isMobileDevice = window.innerWidth < 768;
        const targetScale = isMobileDevice ? 1.6 : 1.4;
        const scale = lerp(1, targetScale, zoomEp);
        const ox = -mx * 9;
        const oy = -my * 9 * 0.4;

        // Starts offset by 45% of the viewport height, and moves up to endY by sp = 0.45
        const startY = window.innerHeight * 0.45;
        const endY = isMobileDevice ? -window.innerHeight * 0.10 : 0;
        const YScrollProgress = clamp(sp / 0.45, 0, 1);
        const scrollY = lerp(startY, endY, YScrollProgress);

        const opacity = lerp(0.7, 1.0, clamp(sp / 0.05, 0, 1));
        cloudsRef.current.style.transform = `translateX(-50%) translate(${ox}px, ${oy + scrollY}px) scale(${scale})`;
        cloudsRef.current.style.opacity = `${opacity}`;
      }

      // 2.5 Left & Right Glassmorphism Boxes Parallax and Entrance animation
      const checkMobile = window.innerWidth < 768;

      if (checkMobile) {
        // Mobile Sequential Stacking Scroll Animation
        // Left Box (Discovery 01)
        if (leftBoxRef.current) {
          const pEnter1 = clamp((sp - 0.60) / 0.15, 0, 1);
          // Left card enters and stops at its final stacked position (translateY(-20px))
          const scrollY = lerp(window.innerHeight * 0.8, -20, easeInOut(pEnter1));
          // Fades in during the first part of its entrance and stays fully visible (opacity 1)
          const opacity = clamp((sp - 0.60) / 0.05, 0, 1);

          leftBoxRef.current.style.transform = `translateY(${scrollY}px)`;
          leftBoxRef.current.style.opacity = `${opacity}`;
          leftBoxRef.current.style.pointerEvents = opacity > 0.1 ? 'auto' : 'none';
        }

        // Right Box (Discovery 02)
        if (rightBoxRef.current) {
          const pEnter2 = clamp((sp - 0.75) / 0.15, 0, 1);
          // Right card enters and stops at its final stacked position (translateY(185px)) on top of left card
          const scrollY = lerp(window.innerHeight * 0.8, 185, easeInOut(pEnter2));
          // Fades in during the first part of its entrance and stays fully visible (opacity 1)
          const opacity = clamp((sp - 0.75) / 0.05, 0, 1);

          rightBoxRef.current.style.transform = `translateY(${scrollY}px)`;
          rightBoxRef.current.style.opacity = `${opacity}`;
          rightBoxRef.current.style.pointerEvents = opacity > 0.1 ? 'auto' : 'none';
        }
      } else {
        // Desktop side-by-side Parallax Animation
        // Left Box: starts rising at sp = 0.60, reaches top at sp = 0.80
        if (leftBoxRef.current) {
          const p1 = clamp((sp - 0.60) / 0.20, 0, 1);
          const ep1 = easeInOut(p1);
          const scrollY = lerp(window.innerHeight * 0.7, 0, ep1);
          const ox = mx * 20; // Mouse Parallax X
          const oy = my * 20; // Mouse Parallax Y
          leftBoxRef.current.style.transform = `translate(${ox}px, ${oy + scrollY}px)`;
          leftBoxRef.current.style.opacity = `${p1}`;
          leftBoxRef.current.style.pointerEvents = p1 > 0.1 ? 'auto' : 'none';
        }

        // Right Box: starts rising at sp = 0.80, reaches top at sp = 1.00
        if (rightBoxRef.current) {
          const p2 = clamp((sp - 0.80) / 0.20, 0, 1);
          const ep2 = easeInOut(p2);
          const scrollY = lerp(window.innerHeight * 0.7, 0, ep2);
          const ox = mx * -30; // Mouse Parallax X
          const oy = my * -30; // Mouse Parallax Y
          rightBoxRef.current.style.transform = `translate(${ox}px, ${oy + scrollY}px)`;
          rightBoxRef.current.style.opacity = `${p2}`;
          rightBoxRef.current.style.pointerEvents = p2 > 0.1 ? 'auto' : 'none';
        }
      }

      // 3. Portal Frame (z-index: 15, scale: 1 -> 7.5, MAG: 7, Opacity: 1 -> 0 between 0.40 -> 0.60)
      if (portalRef.current) {
        const scale = lerp(1, 7.5, zoomEp);
        const ox = -mx * 7;
        const oy = -my * 7;
        const opacity = clamp(1 - (sp - 0.40) / 0.20, 0, 1);
        portalRef.current.style.transform = `translate(${ox}px, ${oy}px) scale(${scale})`;
        portalRef.current.style.opacity = `${opacity}`;
      }

      if (scene1Ref.current) {
        const progress = clamp(sp / 0.22, 0, 1);
        const s1Opacity = clamp((1 - progress) * 1.5, 0, 1); // Stay visible longer, fade near end
        const blurAmount = progress * 25; // Blur up to 25px
        scene1Ref.current.style.opacity = `${s1Opacity}`;
        scene1Ref.current.style.filter = `blur(${blurAmount}px)`;
        scene1Ref.current.style.pointerEvents = s1Opacity > 0.05 ? 'auto' : 'none';
      }



      animId = requestAnimationFrame(update);
    };

    // Reference sync for timer-controlled flags
    const entranceDoneRef = { current: entranceDone };
    entranceDoneRef.current = entranceDone;

    // Use a wrapper ref to pass current state
    const tick = () => {
      entranceDoneRef.current = entranceDone;
      update();
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [entranceDone]);

  // Scene 1 & 2 opacity values


  const isInnerPage = currentHash === '#shop' ||
    currentHash === '#collection' ||
    currentHash === '#search' ||
    currentHash === '#profile' ||
    currentHash === '#cart' ||
    currentHash.startsWith('#product-');
  const showLanding = !isInnerPage;

  return (
    <div style={{ backgroundColor: '#0a0608', width: '100%', minHeight: '100vh' }}>
      <div
        ref={containerRef}
        style={{
          height: isInnerPage ? 'auto' : '480vh',
          position: 'relative',
          backgroundColor: '#0a0608',
        }}
      >
        {/* Sticky Viewport */}
        <div
          style={{
            position: isInnerPage ? 'relative' : 'sticky',
            top: 0,
            height: isInnerPage ? 'auto' : '100vh',
            width: '100%',
            overflow: isInnerPage ? 'visible' : 'hidden',
            backgroundColor: '#0a0608',
          }}
        >
          {showLanding && (
            <>
              {/* SVG Filter for rough/freeform highlight edges */}
              <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} width="0" height="0">
                <defs>
                  <filter id="rough-highlight">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
              </svg>

              {/* Layer 1: World Background */}
              <div
                ref={worldRef}
                style={{
                  position: 'absolute',
                  inset: 0,
                  transformOrigin: '50% 50%',
                  backgroundImage: `url(${isMobile ? MOBILE_WORLD_BG : WORLD_BG})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Layer 2: Jesus Image */}
              <div
                ref={cloudsRef}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  height: isMobile ? '55vh' : '65vh',
                  aspectRatio: '1000 / 1174',
                  transformOrigin: '50% 100%',
                  backgroundImage: `url(${isMobile ? MOBILE_CHAR_IMG : JESUS_IMG})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'bottom center',
                  zIndex: 10,
                  pointerEvents: 'none',
                }}
              >
                {/* Noise overlay masked to the exact shape of Jesus PNG */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url("${NOISE_SVG}")`,
                    mixBlendMode: 'overlay',
                    opacity: 0.85,
                    pointerEvents: 'none',
                    WebkitMaskImage: `url(${isMobile ? MOBILE_CHAR_IMG : JESUS_IMG})`,
                    maskImage: `url(${isMobile ? MOBILE_CHAR_IMG : JESUS_IMG})`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'bottom center',
                    maskPosition: 'bottom center',
                  }}
                />
              </div>

              {/* Particle System Container */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  zIndex: 22,
                }}
              >
                <style>{`
                  @keyframes floatParticle {
                    0% {
                      transform: translateY(10vh) translateX(0);
                      opacity: 0;
                    }
                    10% {
                      opacity: var(--op);
                    }
                    50% {
                      transform: translateY(-40vh) translateX(15px);
                    }
                    90% {
                      opacity: var(--op);
                    }
                    100% {
                      transform: translateY(-105vh) translateX(-15px);
                      opacity: 0;
                    }
                  }
                  @keyframes bounceBag {
                    0%, 100% {
                      transform: translateY(0) scale(1);
                    }
                    50% {
                      transform: translateY(-10px) scale(1.03);
                    }
                  }
                  @keyframes pulseText {
                    0%, 100% {
                      opacity: 0.45;
                    }
                    50% {
                      opacity: 0.95;
                    }
                  }
                `}</style>
                {particlesArray.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      position: 'absolute',
                      left: `${p.x}%`,
                      bottom: '-10px',
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      boxShadow: '0 0 10px rgba(255, 255, 255, 0.9), 0 0 4px rgba(255, 255, 255, 0.6)',
                      animation: `floatParticle ${p.duration}s linear infinite`,
                      animationDelay: `${p.delay}s`,
                      opacity: 0,
                      // @ts-ignore
                      '--op': p.opacity,
                    }}
                  />
                ))}
              </div>



              {/* Layer 2.5: Left & Right Glassmorphism Boxes */}
              {/* Left Box */}
              <div
                ref={leftBoxRef}
                style={{
                  position: 'absolute',
                  left: isMobile ? '7.5%' : '12%',
                  top: isMobile ? '19%' : '18%',
                  width: isMobile ? '85vw' : '420px',
                  height: isMobile ? '425px' : '530px',
                  borderRadius: '32px',
                  background: 'rgba(15, 10, 12, 0.65)',
                  backdropFilter: 'blur(20px) saturate(120%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(120%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255,255,255,0.1)',
                  padding: isMobile ? '16px' : '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: 30,
                  pointerEvents: 'auto',
                  opacity: 0,
                  transform: 'translateY(70vh)',
                }}
              >
                {/* Image Container with a single mockup image */}
                <div
                  style={{
                    width: '100%',
                    height: isMobile ? '285px' : '360px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: 'url(/assets/mockups/13.svg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                </div>

                {/* Info Container */}
                <div
                  style={{
                    marginTop: isMobile ? '16px' : '20px',
                  }}
                >
                  {/* Info Column */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '11px',
                      lineHeight: '1.5',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      Discovery 01 / Archive
                    </div>
                    <div style={{ fontWeight: 300 }}>
                      A luxury archive of fashion stories, creative direction, style guides, and behind-the-scenes campaign chronicles.
                    </div>
                    <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span>+91 95991 99537</span>
                      <span>editorial@roviks.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Box */}
              <div
                ref={rightBoxRef}
                style={{
                  position: 'absolute',
                  right: isMobile ? 'auto' : '12%',
                  left: isMobile ? '7.5%' : 'auto',
                  top: isMobile ? '7%' : '24%',
                  width: isMobile ? '85vw' : '420px',
                  height: isMobile ? '425px' : '530px',
                  borderRadius: '32px',
                  background: 'rgba(15, 10, 12, 0.65)',
                  backdropFilter: 'blur(20px) saturate(120%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(120%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255,255,255,0.1)',
                  padding: isMobile ? '16px' : '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: isMobile ? 35 : 30,
                  pointerEvents: 'auto',
                  opacity: 0,
                  transform: 'translateY(70vh)',
                }}
              >
                {/* Image Container with a single mockup image */}
                <div
                  style={{
                    width: '100%',
                    height: isMobile ? '285px' : '360px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: 'url(/assets/mockups/18.svg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                </div>

                {/* Info Container */}
                <div
                  style={{
                    marginTop: isMobile ? '16px' : '20px',
                  }}
                >
                  {/* Info Column */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '11px',
                      lineHeight: '1.5',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '11px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      Discovery 02 / Silhouettes
                    </div>
                    <div style={{ fontWeight: 300 }}>
                      A curated compilation of tactile silhouettes. Silk, velvet, and structured wool designed for the modern romantic.
                    </div>
                    <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span>+91 95991 99537</span>
                      <span>boutique@roviks.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer 3: Portal Frame */}
              <div
                ref={portalRef}
                style={{
                  position: 'absolute',
                  inset: 0,
                  transformOrigin: '52% 38%',
                  backgroundImage: `url(${PORTAL_BG})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 15,
                }}
              />

              {/* Layer 3.5: Bottom Fade */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)',
                  pointerEvents: 'none',
                  zIndex: 16,
                }}
              />



              {/* Top Fade Gradient */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '42vh',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)',
                  pointerEvents: 'none',
                  zIndex: 45,
                }}
              />
            </>
          )}


          {/* TopBlur from Cult UI */}
          <TopBlur height={120} />

          {/* NAVIGATION */}
          <nav
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              zIndex: 50,
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              backgroundColor: 'transparent',
            }}
          >
            {/* Mobile Navigation */}
            <div
              className="flex md:hidden justify-between items-center"
              style={{
                padding: '16px 20px',
                width: '100%',
                fontSize: '11px',
                fontFamily: 'Poppins, sans-serif',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#fff',
              }}
            >
              <div className="flex-1 flex justify-start">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  style={{ background: 'none', border: 'none', color: (currentHash === '' || currentHash === '#') ? '#000' : '#fff', padding: 0, fontSize: '16px', cursor: 'pointer', outline: 'none' }}
                  className="opacity-90 hover:opacity-100 flex items-center justify-center"
                >
                  <MenuToggleIcon open={mobileMenuOpen} className="w-14 h-14" />
                </button>
              </div>
              <div className="flex-shrink-0 flex justify-center">
                <Logo invertMobile={currentHash !== '' && currentHash !== '#'} />
              </div>
              <div className="flex-1 flex justify-end items-center gap-2">
                {/* Profile link */}
                <a href="#profile" className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-black hover:bg-white/90 transition-all duration-300 cursor-pointer">
                  <User className="w-[18px] h-[18px]" strokeWidth={2} />
                </a>

                {/* Cart link */}
                <a href="#cart" className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-black hover:bg-white/90 transition-all duration-300 cursor-pointer relative">
                  <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={2} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold font-mono border border-black animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </a>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div
              className="hidden md:flex justify-between items-center"
              style={{
                padding: '20px 48px',
                width: '100%',
                fontSize: '11px',
                fontFamily: 'Poppins, sans-serif',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#fff',
              }}
            >
              {/* Left Links */}
              <div className="flex items-center gap-9 flex-1 justify-start">
                {/* COLLECTIONS Item */}
                <a
                  href="#collection"
                  className="opacity-90 hover:opacity-100 transition-opacity duration-300 py-2 cursor-pointer"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Collections
                </a>


                {/* EDITORIAL Item */}
                <div className="group relative py-2">
                  <a href="#" className="opacity-90 hover:opacity-100 transition-colors duration-300">Editorial</a>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </div>

              {/* Logo Center */}
              <div className="flex-shrink-0 flex justify-center">
                <Logo />
              </div>

              {/* Right Links */}
              <div className="flex items-center gap-9 flex-1 justify-end">
                {/* NEW ARRIVALS Item */}
                <div className="group relative py-2">
                  <a href="#collection" className="opacity-90 hover:opacity-100 transition-colors duration-300">New Arrivals</a>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>

                {/* OUR STORY Item */}
                <div className="group relative py-2">
                  <a href="#" className="opacity-90 hover:opacity-100 transition-colors duration-300">Our Story</a>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>

                {/* SHOP Item */}
                <div className="group relative py-2">
                  <a href="#shop" className="opacity-90 hover:opacity-100 transition-colors duration-300 font-semibold text-white">Shop</a>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>

                {/* Icons Container */}
                <div className="flex items-center gap-3 border-l border-white/10 pl-5 ml-2">
                  {/* Search SVG */}
                  <a href="#search" className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-black hover:bg-white/90 transition-all duration-300 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Interface-Essential-Search-1--Streamline-Pixel" className="w-5 h-5" fill="currentColor">
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
                  </a>

                  {/* Account Profile SVG */}
                  <a href="#profile" className="w-8 h-8 shrink-0 flex items-center justify-center text-black hover:text-black/80 transition-all duration-300 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34" id="Interface-Essential-Profile-Male--Streamline-Pixel" className="w-full h-full overflow-visible" fill="currentColor">
                      <circle cx="16" cy="16" r="15" fill="white" />
                      <g>
                        <path d="M30.47 12.19H32v7.62h-1.53Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M28.95 19.81h1.52v3.05h-1.52Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M28.95 9.14h1.52v3.05h-1.52Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M27.43 22.86h1.52v3.04h-1.52Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M27.43 6.1h1.52v3.04h-1.52Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M25.9 25.9h1.53v1.53H25.9Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M25.9 4.57h1.53V6.1H25.9Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M22.85 27.43h3.05v1.52h-3.05Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M22.85 3.05h3.05v1.52h-3.05Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M21.33 21.33h1.52v1.53h-1.52Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="m9.14 15.24 1.52 0 0 -1.53 10.67 0 0 1.53 1.52 0 0 6.09 1.53 0 0 -12.19 -1.53 0 0 -1.52 -1.52 0 0 -1.52 -10.67 0 0 1.52 -1.52 0 0 1.52 -1.52 0 0 12.19 1.52 0 0 -6.09z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M19.81 28.95h3.04v1.53h-3.04Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M19.81 22.86h1.52v1.52h-1.52Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M19.81 16.76h1.52v3.05h-1.52Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M19.81 1.52h3.04v1.53h-3.04Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M12.19 30.48h7.62V32h-7.62Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M12.19 24.38h7.62v1.52h-7.62Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M13.71 21.33h4.57v1.53h-4.57Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M12.19 0h7.62v1.52h-7.62Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M9.14 28.95h3.05v1.53H9.14Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M10.66 22.86h1.53v1.52h-1.53Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M10.66 16.76h1.53v3.05h-1.53Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M9.14 1.52h3.05v1.53H9.14Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M9.14 21.33h1.52v1.53H9.14Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M6.09 27.43h3.05v1.52H6.09Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M6.09 3.05h3.05v1.52H6.09Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M4.57 25.9h1.52v1.53H4.57Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M4.57 4.57h1.52V6.1H4.57Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M3.05 22.86h1.52v3.04H3.05Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M3.05 6.1h1.52v3.04H3.05Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M1.52 19.81h1.53v3.05H1.52Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M1.52 9.14h1.53v3.05H1.52Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M0 12.19h1.52v7.62H0Z" fill="currentColor" strokeWidth="1"></path>
                      </g>
                    </svg>
                  </a>

                  {/* Cart Shopping Bag SVG */}
                  <a href="#cart" className="w-8 h-8 shrink-0 flex items-center justify-center text-black hover:text-black/80 transition-all duration-300 cursor-pointer relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34" id="Shopping-Shipping-Cart--Streamline-Pixel" className="w-full h-full overflow-visible" fill="currentColor">
                      <circle cx="16" cy="16" r="15" fill="white" />
                      <g>
                        <path d="M30.47 10.67H32v4.57h-1.53Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M28.95 15.24h1.52v4.57h-1.52Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M27.43 19.81h1.52v3.05h-1.52Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M25.9 13.72h1.53v4.57H25.9Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M12.19 22.86h15.24v1.52H12.19Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M24.38 18.29h1.52v3.04h-1.52Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M19.81 13.72h1.52v7.61h-1.52Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M15.23 18.29h1.53v3.04h-1.53Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M13.71 13.72h1.52v4.57h-1.52Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="m12.19 28.95 0 1.53 1.52 0 0 1.52 3.05 0 0 -1.52 1.52 0 0 -1.53 3.05 0 0 1.53 1.52 0 0 1.52 3.05 0 0 -1.52 1.53 0 0 -1.53 3.04 0 0 -1.52 -4.57 0 0 -1.52 -3.05 0 0 1.52 -6.09 0 0 -1.52 -3.05 0 0 1.52 -3.05 0 0 1.52 1.53 0z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M10.66 24.38h1.53v1.53h-1.53Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M10.66 18.29h1.53v4.57h-1.53Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M9.14 25.91h1.52v1.52H9.14Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M9.14 13.72h1.52v4.57H9.14Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="m9.14 13.72 0 -3.05 21.33 0 0 -1.53 -22.85 0 0 4.58 1.52 0z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M6.09 6.1h1.53v3.04H6.09Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M4.57 3.05h1.52V6.1H4.57Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M3.04 1.52h1.53v1.53H3.04Z" fill="currentColor" strokeWidth="1"></path>
                        <path d="M0 0h3.04v1.52H0Z" fill="currentColor" strokeWidth="1"></path>
                      </g>
                    </svg>
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold font-mono border border-black animate-pulse">
                        {cartCount}
                      </span>
                    )}
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Fullscreen Menu Drawer */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.98)',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '40px 24px',
                  }}
                >
                  {/* Drawer Header */}
                  <div className="flex justify-start mb-8">
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                    >
                      <span className="text-xl font-light leading-none relative top-[-1px]">✕</span>
                    </button>
                  </div>

                  {/* Drawer Links */}
                  <div className="flex flex-col gap-4 overflow-y-auto pr-2 pb-8 no-scrollbar">
                    <a href="#shop" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-medium tracking-wide text-white hover:text-white/80 transition-colors">ALL PRODUCTS</a>
                    <a href="#shop" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-medium tracking-wide text-white hover:text-white/80 transition-colors">BEST SELLER</a>

                    <div className="flex flex-col mt-2">
                      <a href="#collection" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-medium tracking-wide text-white flex justify-between items-center hover:text-white/80 transition-colors border-t border-b border-white/10 py-4">
                        NEW ARRIVALS
                        <ChevronRightIcon className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                      </a>
                      <a href="#shop" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-medium tracking-wide text-white flex justify-between items-center hover:text-white/80 transition-colors border-b border-white/10 py-4">
                        TOPS
                        <ChevronRightIcon className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                      </a>
                      <a href="#shop" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-medium tracking-wide text-white flex justify-between items-center hover:text-white/80 transition-colors border-b border-white/10 py-4">
                        BOTTOMS
                        <ChevronRightIcon className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                      </a>
                      <a href="#shop" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-medium tracking-wide text-white flex justify-between items-center hover:text-white/80 transition-colors border-b border-white/10 py-4">
                        CO-ORD SET
                        <ChevronRightIcon className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                      </a>
                    </div>

                    <a href="#shop" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-medium tracking-wide text-white hover:text-white/80 transition-colors mt-2">SUMMER COLLECTION</a>
                    <a href="#shop" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-medium tracking-wide text-white hover:text-white/80 transition-colors">CONTACT US</a>
                    <a href="#shop" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-medium tracking-wide text-white hover:text-white/80 transition-colors">TRACK MY ORDER</a>

                    {/* Promo Image Area */}
                    <div className="mt-8 relative w-full flex justify-center pb-12">
                      <img src="/assets/shadow_7.png" alt="Best Seller" className="w-[85%] max-w-[280px] h-auto object-contain opacity-90 transition-transform duration-700 hover:scale-105" />
                      <div className="absolute bottom-16 left-6 text-white font-bold tracking-widest text-xl z-10 drop-shadow-md">BEST SELLER</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* SCENE 1 UI / SHOP VIEW SWITCHER */}
          {showLanding && (
            <div
              ref={scene1Ref}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'opacity 0.25s ease-out',
              }}
            >
              {/* Mobile layout */}
              <div
                className="md:hidden flex flex-col justify-center items-center text-center"
                style={{
                  height: '100%',
                  padding: '80px 24px 100px',
                  opacity: uiVisible ? 0.9 : 0,
                  transform: uiVisible ? 'translateY(0)' : 'translateY(15px)',
                  transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s',
                }}
              >
                <div>
                  <h1
                    style={{
                      fontFamily: "'Gondens Demo', sans-serif",
                      fontSize: 'clamp(46px, 9.5vw, 44px)',
                      letterSpacing: '0.03em',
                      color: '#000000',
                      lineHeight: '1.8',
                      whiteSpace: 'normal',
                      textShadow: '0 4px 20px rgba(255, 255, 255, 0.8), 0 2px 6px rgba(255, 255, 255, 0.9), 0 0 15px rgba(255, 255, 255, 0.5)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '16px',
                      position: 'relative',
                      top: '40px',
                    }}
                  >
                    <span>Still Wearing</span>
                    <span style={{
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '6px 18px',
                      margin: '0px',
                      color: '#ffffff',
                      textShadow: 'none',
                      zIndex: 1,
                      whiteSpace: 'nowrap',
                    }}>
                      <span style={{
                        position: 'absolute',
                        inset: '0px',
                        backgroundColor: '#000000',
                        backgroundImage: `url("${NOISE_SVG}")`,
                        filter: 'url(#rough-highlight)',
                        zIndex: -1,
                      }} />
                      <span style={{ fontFamily: "'Gondens Demo', sans-serif", fontSize: '0.78em', transform: 'translateY(-5px)' }}>Ordinary Clothes</span>
                    </span>
                    <span>Upgrade Your Style.</span>
                  </h1>
                    <a
                    href="#shop"
                    style={{
                      display: 'inline-flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '82px',
                      cursor: 'pointer',
                      textDecoration: 'none',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DK Astromonkey', sans-serif",
                        fontSize: 'clamp(18px, 8vw, 36px)',
                        color: '#ffffff',
                        backgroundColor: '#000000',
                        padding: '0px 16px',
                        borderRadius: '40px',
                        textTransform: 'uppercase',
                        display: 'inline-block',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                      }}
                    >
                      $HOP NOW
                    </span>
                  </a>

                </div>
              </div>

              {/* Tablet layout */}
              <div
                className="hidden md:flex xl:hidden flex-col justify-center items-center text-center"
                style={{
                  height: '100%',
                  padding: '80px 32px 96px',
                  gap: '28px',
                  opacity: uiVisible ? 0.9 : 0,
                  transform: uiVisible ? 'translateY(0)' : 'translateY(15px)',
                  transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s',
                }}
              >
                <div>
                  <h1
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: 'clamp(36px, 6vw, 52px)',
                      letterSpacing: '0.08em',
                      color: '#ffffff',
                      lineHeight: '1.3',
                      whiteSpace: 'normal',
                      textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 6px rgba(0, 0, 0, 0.9), 0 0 15px rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>Want the</span>
                    <span style={{
                      position: 'relative',
                      display: 'inline-block',
                      padding: '4px 16px',
                      margin: '4px 0',
                      color: '#ffffff',
                      zIndex: 1,
                    }}>
                      <span style={{
                        position: 'absolute',
                        inset: '0px',
                        backgroundColor: '#000000',
                        backgroundImage: `url("${NOISE_SVG}")`,
                        filter: 'url(#rough-highlight)',
                        zIndex: -1,
                      }} />
                      “<i style={{ fontFamily: "'Instrument Serif', serif" }}>Where’d You Get That?</i>”
                    </span>
                    <span>Look?</span>
                  </h1>
                  <a
                    href="#shop"
                    style={{
                      display: 'inline-flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '6px',
                      marginTop: '14px',
                      cursor: 'pointer',
                      textDecoration: 'none',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: 'clamp(62px, 9vw, 86px)',
                        color: '#ffffff',
                        textTransform: 'uppercase',
                        mixBlendMode: 'difference',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
                        display: 'inline-block',
                        position: 'relative',
                      }}
                    >
                      SHOP NOW
                    </span>
                  </a>

                </div>
              </div>

              {/* Desktop layout */}
              <div className="hidden xl:block" style={{ width: '100%', height: '100%', position: 'relative' }}>
                {/* Heading Block */}
                <div
                  style={{
                    position: 'absolute',
                    top: '46%',
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    opacity: uiVisible ? 1 : 0,
                    transform: uiVisible ? 'translateY(-50%)' : 'translateY(-40%)',
                    transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s',
                  }}
                >
                  <h1
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: 'clamp(44px, 5.5vw, 72px)',
                      letterSpacing: '0.04em',
                      color: '#ffffff',
                      lineHeight: '1.1',
                      textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 6px rgba(0, 0, 0, 0.9), 0 0 15px rgba(0, 0, 0, 0.5)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Want the <span style={{
                      position: 'relative',
                      display: 'inline-block',
                      padding: '0px 16px',
                      margin: '0 -8px',
                      color: '#ffffff',
                      zIndex: 1,
                    }}>
                      <span style={{
                        position: 'absolute',
                        inset: '2px -4px',
                        backgroundColor: '#000000',
                        backgroundImage: `url("${NOISE_SVG}")`,
                        filter: 'url(#rough-highlight)',
                        zIndex: -1,
                      }} />
                      “<i style={{ fontFamily: "'Instrument Serif', serif" }}>Where’d You Get That?</i>”
                    </span> Look?
                  </h1>
                  <a
                    href="#shop"
                    style={{
                      display: 'inline-flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '16px',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                  >
                    <span
                      style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: 'clamp(70px, 6vw, 90px)',
                        color: '#ffffff',
                        textTransform: 'uppercase',
                        mixBlendMode: 'difference',
                        textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 6px rgba(0, 0, 0, 0.9)',
                        display: 'inline-block',
                        position: 'relative',
                      }}
                    >
                      SHOP NOW
                    </span>
                  </a>

                </div>



                {/* Scroll Cue (desktop only) */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '36px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    opacity: uiVisible ? 1 : 0,
                    transition: 'opacity 0.9s ease 0.9s',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '10px',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    DESCEND
                  </span>
                  <div
                    className="animate-bob"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      border: '1.5px solid rgba(255,255,255,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          )}

          {currentHash.startsWith('#product-') ? (
            <ProductDetailPage productId={currentHash.replace('#product-', '')} />
          ) : currentHash === '#shop' ? (
            <ShopPage />
          ) : currentHash === '#collection' ? (
            <CollectionPage />
          ) : currentHash === '#search' ? (
            <SearchPage />
          ) : currentHash === '#profile' ? (
            <ProfilePage />
          ) : currentHash === '#cart' ? (
            <CartPage />
          ) : null}


        </div>
      </div>

      {/* NEW COLLECTION SECTION */}
      {showLanding && (
        <div
          style={{
            width: '100%',
            backgroundColor: '#000000',
            position: 'relative',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '20px 10px' : '40px 40px',
          }}
        >
          {/* Main Card Container inspired by the second image */}
          <div
            style={{
              width: '95%',
              maxWidth: '1600px',
              backgroundColor: '#f6f5f3', // Off-white/cream background matching second image
              borderRadius: '24px',
              border: '1px solid rgba(0,0,0,0.9)',
              padding: isMobile ? '32px 20px' : '64px 64px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: isMobile ? '70vh' : '80vh',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Background Big Text "NEW COLLECTION" */}
            <div
              style={{
                position: 'absolute',
                top: isMobile ? '12%' : '8%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                textAlign: 'center',
                fontFamily: "'Poppins', sans-serif",
                fontSize: 'clamp(48px, 12vw, 150px)',
                fontWeight: 900,
                color: '#000000',
                letterSpacing: '0.02em',
                lineHeight: 0.9,
                pointerEvents: 'none',
                zIndex: 1,
                textTransform: 'uppercase',
              }}
            >
              NEW COLLECTION
            </div>

            {/* Content Row */}
            <div
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'center' : 'flex-end',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                marginTop: 'auto',
                zIndex: 5,
              }}
            >
              {/* Left Side: Discount Text */}
              <div
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: isMobile ? '13px' : '16px',
                  fontWeight: 500,
                  color: '#000000',
                  maxWidth: isMobile ? '100%' : '240px',
                  lineHeight: 1.4,
                  textAlign: isMobile ? 'center' : 'left',
                  marginBottom: isMobile ? '24px' : '0',
                }}
              >
                Get 30% discount on your first order
              </div>

              {/* Center: Main Image Carousel aligned to touch the bottom edge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: isMobile ? '-10px' : '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: isMobile ? '247%' : '100%',
                  maxWidth: isMobile ? '269%' : '2725px',
                  height: isMobile ? '425px' : '560px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeNewCollIndex}
                    src={[`/assets/png1.png`, `/assets/png2.png`, `/assets/png3.png`][activeNewCollIndex]}
                    alt={`New Collection Model ${activeNewCollIndex + 1}`}
                    initial={{ opacity: 0, x: 150, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -150, filter: 'blur(8px)' }}
                    transition={{ duration: 0.95, ease: "easeInOut" }}
                    style={{
                      height: '100%',
                      width: 'auto',
                      objectFit: 'contain',
                      verticalAlign: 'bottom',
                    }}
                  />
                </AnimatePresence>
              </div>

              {/* Right Side: Spacer/Empty block to balance layout on desktop */}
              {!isMobile && <div style={{ width: '240px' }} />}
            </div>

            {/* Bottom dots indicators */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '32px',
                zIndex: 10,
              }}
            >
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  onClick={() => setActiveNewCollIndex(index)}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: index === activeNewCollIndex ? '#ffffff' : 'rgba(255, 255, 255, 0.35)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: index === activeNewCollIndex ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>
          {/* Earth image overlapping top-left card corner */}
          <img
            src="/assets/Earth.png"
            alt="Earth"
            style={{
              position: 'absolute',
              left: isMobile ? '2px' : '12px',
              top: isMobile ? '-16px' : '-55px',
              width: isMobile ? '113px' : '190px',
              height: 'auto',
              zIndex: 40,
              pointerEvents: 'none',
              filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.9))',
            }}
          />
          {/* Clouds image overlapping bottom-right card corner */}
          <img
            src="/assets/clouds.png"
            alt="Clouds"
            style={{
              position: 'absolute',
              right: isMobile ? '2px' : '12px',
              bottom: isMobile ? '-37px' : '-55px',
              width: isMobile ? '145px' : '260px',
              height: 'auto',
              zIndex: 40,
              opacity: 1,
              pointerEvents: 'none',
              filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6))',
            }}
          />
        </div>
      )}

      {/* PRODUCTS CATEGORY CARD GRID SECTION */}
      {showLanding && (
        <>
          <div
            style={{
              width: '100%',
              backgroundColor: '#000000',
              position: 'relative',
              zIndex: 30,
              padding: isMobile ? '40px 20px 20px' : '80px 40px 30px',
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '40px' : '60px',
            }}
          >
            {/* Marquee Banner Container */}
            <div
              style={{
                width: isMobile ? 'calc(100% + 40px)' : 'calc(100% + 80px)',
                margin: isMobile ? '0 -20px' : '0 -40px',
                backgroundColor: '#111111',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                overflow: 'hidden',
                padding: '20px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Scrolling Marquee */}
              <div
                className="w-full overflow-hidden flex relative"
                style={{
                  maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                }}
              >
                <div className="animate-marquee flex whitespace-nowrap">
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 5vw, 44px)', letterSpacing: '0.05em', color: '#ffffff' }}>
                    SHOP NOW ✦ GRAB NOW ✦ COLLECT NOW ✦ SHOP NOW ✦ GRAB NOW ✦ COLLECT NOW ✦&nbsp;
                  </span>
                </div>
                <div className="animate-marquee flex whitespace-nowrap">
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(28px, 5vw, 44px)', letterSpacing: '0.05em', color: '#ffffff' }}>
                    SHOP NOW ✦ GRAB NOW ✦ COLLECT NOW ✦ SHOP NOW ✦ GRAB NOW ✦ COLLECT NOW ✦&nbsp;
                  </span>
                </div>
              </div>
            </div>

            {/* New Collection Puffer Section */}
            <div className="w-full max-w-[1200px] mx-auto mt-24 mb-2 flex flex-col gap-10 px-4 md:px-0">
              {/* Header Row */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-6">
                <div className="flex flex-col gap-2">
                  <h2
                    className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white uppercase"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    New Collection
                  </h2>
                </div>


                {/* See All Button */}
                <a
                  href="#shop"
                  className="px-6 py-2.5 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-neutral-200 transition-colors inline-block text-center"
                  style={{ textDecoration: 'none' }}
                >
                  See All
                </a>
              </div>

              {/* 2x4 Product Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {pufferCards.map((card) => (
                  <a
                    href={`#product-${card.id}`}
                    key={card.id}
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
          </div>
          <BrandFooter />
        </>
      )}



    </div>
  );
}

const Skiper49 = () => {
  const images = [
    {
      src: "/images/x.com/13.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/32.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/20.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/21.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/19.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/1.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/2.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/3.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/4.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#000000] py-16">
      <Carousel_003 className="" images={images} showPagination loop autoplay />
      <h2
        className="text-center font-serif text-white uppercase mt-12 text-2xl md:text-3xl"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontStyle: 'italic',
          letterSpacing: '0.15em'
        }}
      >
        Select Your Genre
      </h2>
    </div>
  );
};

export { Skiper49 };

const Carousel_003 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
}: {
  images: { src: string; alt: string }[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  const css = `
  .Carousal_003 {
    width: 100%;
    height: 60vh;
    min-height: 400px;
    padding-bottom: 50px !important;
  }
  
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 100%;
    max-width: 450px;
    height: 100%;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.05);
    margin: 0 auto;
  }

  .swiper-pagination-bullet {
    background-color: #ffffff !important;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #ffffff !important;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    width: 48px !important;
    height: 48px !important;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .swiper-button-prev:active,
  .swiper-button-next:active {
    transform: translateY(-50%) scale(0.95);
  }

  .swiper-button-next {
    right: 24px !important;
  }

  .swiper-button-prev {
    left: 24px !important;
  }

  @media (max-width: 767px) {
    .swiper-button-next,
    .swiper-button-prev {
      width: 38px !important;
      height: 38px !important;
    }
    .swiper-button-next {
      right: 12px !important;
    }
    .swiper-button-prev {
      left: 12px !important;
    }
    .swiper-button-prev:active,
    .swiper-button-next:active {
      transform: translateY(-50%) scale(0.98);
    }
  }
`;
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: 0.2,
      }}
      className={cn("relative w-full max-w-4xl px-4 md:px-12", className)}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                delay: 1500,
                disableOnInteraction: false,
              }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView={1}
          centeredSlides={true}
          loop={loop}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                clickable: true,
              }
              : false
          }
          navigation={
            showNavigation
              ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="">
              <img
                className="h-full w-full object-cover select-none"
                src={image.src}
                alt={image.alt}
              />
            </SwiperSlide>
          ))}
          {showNavigation && (
            <div>
              <div className="swiper-button-next after:hidden">
                <ChevronRightIcon className="h-5 w-5 transition-colors duration-300" />
              </div>
              <div className="swiper-button-prev after:hidden">
                <ChevronLeftIcon className="h-5 w-5 transition-colors duration-300" />
              </div>
            </div>
          )}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export { Carousel_003 };
