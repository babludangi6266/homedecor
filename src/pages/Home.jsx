import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import Scene from '../components/Scene';

const heroTexts = [
  "Curate Your\nPerfect Space",
  "Artisan Crafted\nElegance",
  "Intentional Living\nRedefined"
];

const InspirationStrip = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  const images = [
    "https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=800",
    "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=800",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800",
    "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=800",
    "https://images.unsplash.com/photo-1602628525144-56e8e2b79c78?q=80&w=800",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800",
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800"
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center overflow-hidden">
      <motion.div style={{ x }} className="flex gap-6 px-6">
        {images.map((src, i) => (
          <div
            key={i}
            className="w-[280px] md:w-[450px] aspect-[4/5] flex-shrink-0 rounded-2xl overflow-hidden border border-white/30 shadow-xl group cursor-pointer"
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.2s] ease-[0.16,1,0.3,1]"
            />
            <div className="absolute inset-x-4 bottom-4 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
              <span className="type-caps text-[9px] text-white tracking-[0.2em] font-bold">@sanctuary_spaces</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Systematic framer motion variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const bestSellers = products.filter((p) => p.bestseller);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroTexts.length), 6000);
    return () => clearInterval(timer);
  }, []);

  // Graceful Hero Scroll fade out (Systematic)
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  return (
    <div className="relative w-full min-h-screen" id="home-page">
      {/* ── Fixed 3D Cinematic Background Layer ── */}
      <Scene />

      {/* ── Scrolling Content Layer ── */}
      <div className="relative z-10 w-full flex flex-col items-stretch">

        {/* ═══════════════════ 3D IMMERSIVE HERO ═══════════════════ */}
        <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center bg-transparent" id="hero-section">
          <motion.div
            className="w-full container-wide z-10"
            style={{ opacity: heroOpacity }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="max-w-3xl"
              >
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <div className="w-12 h-[1px] bg-primary" />
                  <span className="type-caps text-white tracking-[0.2em] font-bold drop-shadow-md">0{currentSlide + 1} &mdash; 03</span>
                </div>

                <h1 className="text-[3.5rem] md:text-[5rem] lg:text-[7.5rem] leading-[1] font-display text-white mb-8 tracking-tight font-medium drop-shadow-2xl">
                  {heroTexts[currentSlide].split('\n').map((line, i) => (
                    <span key={i} className="block overflow-hidden relative pb-2 pt-1">
                      <motion.span
                        className="block drop-shadow-2xl shadow-black/50"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.25, 1, 0.5, 1] }}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h1>

                <Link to="/shop" className="group inline-flex items-center gap-4 border-b border-white/50 pb-2 hover:border-white transition-colors duration-300">
                  <span className="type-caps text-white text-[11px] md:text-sm">Explore Collection</span>
                  <svg className="w-5 h-5 text-white transform group-hover:translate-x-3 transition-transform duration-300 drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
            <motion.div
              key={`progress-${currentSlide}`}
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 6, ease: "linear" }}
            />
          </div>
        </section>



        {/* ═══════════════════ Best Sellers (Systematic Slider) ═══════════════════ */}
        <section className="section-py bg-[#faf7f4]/95 backdrop-blur-3xl overflow-hidden border-t border-white/30" id="best-sellers">
          <div className="container-wide">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
            >
              <div className="max-w-xl">
                <div className="w-12 h-[1px] bg-primary mb-8" />
                <h2 className="type-h2 mb-4">Community Favorites</h2>
                <p className="type-body text-base text-text-light">
                  Our most loved pieces, handpicked by our community of intentional living enthusiasts.
                </p>
              </div>
              <Link to="/shop">
                <button className="type-caps text-xs border-b border-text hover:text-primary hover:border-primary transition-colors pb-1">
                  View All Best Sellers
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex gap-8 overflow-x-auto pb-12 snap-x no-scrollbar"
              style={{ scrollbarWidth: 'none' }}
            >
              {bestSellers.map((p, i) => (
                <div key={p.id} className="min-w-[300px] md:min-w-[400px] snap-start flex-shrink-0">
                  <ProductCard product={p} index={i} />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════ Our Full Collection (Systematic Grid) ═══════════════════ */}
        <section className="section-py bg-[#faf7f4]/90 backdrop-blur-2xl border-t border-white/20" id="all-products">
          <div className="container-wide">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
            >
              <div className="flex justify-center"><div className="section-divider" /></div>
              <h2 className="type-h2 mb-4">Our Full Collection</h2>
              <p className="type-body text-base text-text-light">
                Explore every piece in our current catalog, from sculptural lighting to hand-woven textiles.
              </p>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
              variants={stagger}
              className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16"
            >
              {products.map((p, i) => (
                <motion.div key={p.id} variants={fadeUp}>
                  <ProductCard product={p} index={i} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════ Styled by You (Scroll-Driven Cinematic Strip) ═══════════════════ */}
        <section className="section-py bg-[#faf7f4]/95 backdrop-blur-3xl overflow-hidden border-t border-white/20" id="styled-by-you">
          <div className="container-wide mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <span className="type-caps text-primary tracking-[0.3em] font-bold text-[10px]">Lifestyle Gallery</span>
                <div className="w-10 h-[1px] bg-primary/30" />
              </div>
              <h2 className="text-[2.5rem] md:text-[3.5rem] font-display tracking-tight leading-none text-text">Styled by You</h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex items-center gap-4">
              <span className="type-body text-text-light text-sm italic font-serif opacity-80 decoration-primary underline underline-offset-4">#HomeDecorExpress</span>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-500 hover:shadow-lg">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
            </motion.div>
          </div>

          <div className="relative w-full h-[300px] md:h-[400px]">
            <InspirationStrip />
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
