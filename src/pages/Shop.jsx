import { useState, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const categories = ['Vases', 'Lighting', 'Furniture', 'Textiles', 'Decor'];
const colors = [
  { name: 'Terracotta', hex: '#C67B5C' },
  { name: 'Natural', hex: '#D4C5B0' },
  { name: 'Brown', hex: '#6B4226' },
  { name: 'White', hex: '#E8E8E8' },
  { name: 'Green', hex: '#8B9E82' },
  { name: 'Gold', hex: '#C5A55A' },
  { name: 'Black', hex: '#222222' }
];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialRoom = searchParams.get('room') || '';

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('Featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 250]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.15]);

  const toggleCategory = (cat) =>
    setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);

  const toggleColor = (color) =>
    setSelectedColors((prev) => prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (initialRoom) result = result.filter((p) => p.room === initialRoom);
    if (selectedCategories.length) result = result.filter((p) => selectedCategories.includes(p.category));
    if (selectedColors.length) result = result.filter((p) => selectedColors.includes(p.color));
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sortBy === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'Price: High to Low') result.sort((a, b) => b.price - a.price);
    return result;
  }, [selectedCategories, selectedColors, priceRange, sortBy, initialRoom]);

  const FilterPanel = ({ className = '' }) => (
    <div className={className}>
      <h2 className="font-display text-3xl mb-12 hidden lg:block tracking-tight text-text">Filters</h2>

      {/* Price */}
      <div className="mb-14">
        <h3 className="type-caps mb-8 font-bold tracking-[0.2em] text-[10px]">Price Range</h3>
        <input type="range" min="0" max="500" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full accent-primary h-[2px] bg-border cursor-pointer appearance-none rounded-full outline-none" />
        <div className="flex justify-between mt-6">
          <span className="type-caps text-[10px] text-text-light font-bold">$0</span>
          <span className="type-caps text-[10px] font-bold text-primary">${priceRange[1]}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-14">
        <h3 className="type-caps mb-8 font-bold tracking-[0.2em] text-[10px]">Category</h3>
        <div className="space-y-4">
          {categories.map((cat) => {
            const isSelected = selectedCategories.includes(cat);
            return (
              <label key={cat} className="flex items-center gap-4 cursor-pointer group">
                <div className={`w-4 h-4 rounded-sm flex items-center justify-center transition-all duration-300 border ${isSelected ? 'bg-primary border-primary' : 'border-border group-hover:border-primary/50'}`}>
                  <motion.svg initial={false} animate={{ opacity: isSelected ? 1 : 0, scale: isSelected ? 1 : 0 }} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></motion.svg>
                </div>
                <span className={`type-body text-[13px] transition-colors duration-300 ${isSelected ? 'text-primary font-medium' : 'text-text-light group-hover:text-text'}`}>{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-14">
        <h3 className="type-caps mb-8 font-bold tracking-[0.2em] text-[10px]">Color</h3>
        <div className="flex flex-wrap gap-4">
          {colors.map((color) => {
            const isSelected = selectedColors.includes(color.name);
            return (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                className="w-8 h-8 rounded-full transition-all duration-500 relative flex items-center justify-center group"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                <div className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${isSelected ? 'border-primary ring-2 ring-primary ring-offset-2 scale-110' : 'border-transparent group-hover:border-white/50 group-hover:scale-110'}`} />
                {isSelected && (
                  <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 text-white mix-blend-difference" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></motion.svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#faf7f4] min-h-screen relative" id="shop-page">
      
      {/* ── Immersive Cinematic Hero ── */}
      <section ref={heroRef} className="relative h-[50vh] min-h-[450px] overflow-hidden bg-black flex items-center justify-center">
        <motion.img
          style={{ scale: heroScale, opacity: heroOpacity }}
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2000&q=80"
          alt="Shop Collection"
          className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover opacity-70 grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf7f4] via-transparent to-black/50" />
        
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex justify-center items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="type-caps text-primary tracking-[0.3em] font-bold text-[10px]">Collection / {initialRoom || 'All'}</span>
              <div className="w-8 h-[1px] bg-primary" />
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-[3.5rem] md:text-[5rem] lg:text-[7rem] leading-[0.9] font-display text-white tracking-tighter mb-8 drop-shadow-2xl">
              {initialRoom || 'The Catalog.'}
            </motion.h1>
          </motion.div>
        </motion.div>

        {/* Ghost typography */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-[0.05] select-none pointer-events-none mix-blend-overlay">
          <h1 className="text-[15vw] font-display font-bold leading-none whitespace-nowrap tracking-tighter text-white">CATALOG</h1>
        </div>
      </section>

      {/* ── Sticky Toolbar ── */}
      <div className="sticky top-[72px] md:top-[80px] z-40 py-5 bg-[#faf7f4]/80 backdrop-blur-2xl border-b border-border/50 shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all duration-300 section-px">
        <div className="container-wide flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 group px-4 py-2 rounded-full border border-border/60 hover:border-primary transition-colors bg-white/50 backdrop-blur-md"
              whileTap={{ scale: 0.95 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text group-hover:text-primary transition-colors"><path d="M4 21V14M4 10V3M12 21V12M12 8V3M20 21V16M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>
              <span className="type-caps text-[10px] font-bold">Filter</span>
            </motion.button>
            <span className="type-caps text-[10px] font-bold text-text-light hidden md:block tracking-widest">{filteredProducts.length} Objects Discovered</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="type-caps text-[10px] hidden sm:block font-bold tracking-widest text-text-light">Sort by:</span>
            <div className="relative group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent type-caps text-[10px] font-bold text-text focus:outline-none cursor-pointer pl-0 pr-6 py-2 appearance-none z-10 relative"
              >
                {sortOptions.map((opt) => (
                  <option key={opt} value={opt} className="text-text">{opt}</option>
                ))}
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="container-wide py-16 md:py-24 relative z-20">
        <div className="flex gap-10 lg:gap-20 items-start">
          
          {/* Desktop Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block w-[240px] flex-shrink-0 sticky top-[200px]"
          >
            <FilterPanel />
          </motion.aside>

          {/* Mobile Filters Drawer */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileFiltersOpen(false)} />
                <motion.div
                  initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  className="fixed left-0 top-0 h-full w-[320px] max-w-[85vw] bg-[#faf7f4] z-[60] p-8 md:p-12 overflow-y-auto lg:hidden shadow-[30px_0_60px_rgba(0,0,0,0.1)]"
                >
                  <div className="flex justify-between items-center mb-12">
                    <h2 className="font-display text-2xl font-bold text-text">Filters</h2>
                    <button onClick={() => setMobileFiltersOpen(false)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text hover:bg-white transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  </div>
                  <FilterPanel />
                  
                  {/* Mobile Apply Button */}
                  <div className="mt-12 sticky bottom-0 pt-4 bg-gradient-to-t from-[#faf7f4] via-[#faf7f4] to-transparent">
                    <button onClick={() => setMobileFiltersOpen(false)} className="w-full bg-text text-white py-4 type-caps text-xs font-bold rounded-full hover:bg-primary transition-colors shadow-xl">
                      Show {filteredProducts.length} Objects
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Product Grid Area */}
          <div className="flex-1 min-w-0">
            <motion.div layout className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-12 sm:gap-y-16">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -30 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
                  >
                    <ProductCard product={p} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            <AnimatePresence>
              {filteredProducts.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="text-center py-32 md:py-48 flex flex-col items-center justify-center bg-white rounded-3xl border border-border/50 shadow-sm"
                >
                  <div className="w-20 h-20 rounded-full bg-[#faf7f4] flex items-center justify-center mb-8">
                    <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35 M9 11l4-4M9 7l4 4"/></svg>
                  </div>
                  <h3 className="type-h3 mb-4">No objects discovered.</h3>
                  <p className="type-body text-text-light mb-8 max-w-sm mx-auto">
                    Try adjusting your filters or category selections to reveal our artisan collection.
                  </p>
                  <button
                    onClick={() => { setSelectedCategories([]); setSelectedColors([]); setPriceRange([0, 500]); }}
                    className="group inline-flex items-center gap-3 border-b border-primary pb-1"
                  >
                    <span className="type-caps text-primary text-[10px] font-bold tracking-widest">Clear All Filters</span>
                    <svg className="w-3 h-3 text-primary group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
