import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialRoom = searchParams.get('room') || '';

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('Featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
      {/* Price */}
      <div className="mb-12">
        <h3 className="type-caps mb-6">Price Range</h3>
        <input type="range" min="0" max="500" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full" />
        <div className="flex justify-between mt-4">
          <span className="type-small">$0</span>
          <span className="type-small font-bold text-text">${priceRange[1]}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-12">
        <h3 className="type-caps mb-6">Category</h3>
        <div className="space-y-4">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} className="checkbox-premium" />
              <span className="type-body text-[13px] group-hover:text-primary transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-12">
        <h3 className="type-caps mb-6">Color</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              className={`w-7 h-7 rounded-full transition-all duration-300 ${
                selectedColors.includes(color.name) ? 'ring-2 ring-primary ring-offset-2 scale-110 shadow-lg' : 'ring-1 ring-border hover:ring-primary/40'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-bg min-h-screen" id="shop-page">
      {/* ── Hero Banner ── */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden bg-bg-dark">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=600&fit=crop&crop=bottom&q=80"
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 video-overlay" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center container-wide"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-primary" />
              <span className="type-caps text-white/50 text-[10px]">Collection / {initialRoom || 'All'}</span>
            </div>
            <h1 className="type-h1 text-white">
              {initialRoom || 'Our Collection'}
            </h1>
          </div>
        </motion.div>
      </div>

      {/* ── Toolbar ── */}
      <div className="border-b border-border-light bg-bg-warm/80 backdrop-blur-md sticky top-[72px] md:top-[80px] z-30 py-4 shadow-sm">
        <div className="container-wide flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden btn-premium px-6 py-2.5 text-xs bg-white text-text border border-border shadow-none hover:shadow-lg"
              whileTap={{ scale: 0.95 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1"><path d="M4 21V14M4 10V3M12 21V12M12 8V3M20 21V16M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>
              Filter
            </motion.button>
            <span className="type-small text-text font-bold uppercase tracking-widest">{filteredProducts.length} Pieces</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="type-caps text-[10px] hidden sm:block">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-text-secondary focus:outline-none cursor-pointer p-2 border-b border-transparent hover:border-primary transition-colors"
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-wide py-10 sm:py-12 md:py-16">
        <div className="flex gap-10 lg:gap-14">
          {/* Desktop Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block w-[220px] flex-shrink-0 sticky top-[160px] self-start"
          >
            <FilterPanel />
          </motion.aside>

          {/* Mobile Filters */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setMobileFiltersOpen(false)} />
                <motion.div
                  initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="fixed left-0 top-0 h-full w-[300px] bg-white z-50 p-8 overflow-y-auto lg:hidden shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="font-display text-lg font-bold text-text">Filters</h2>
                    <button onClick={() => setMobileFiltersOpen(false)} className="text-text-muted hover:text-text p-1">✕</button>
                  </div>
                  <FilterPanel />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-5 md:gap-x-6 gap-y-8 sm:gap-y-10 md:gap-y-14">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
                <p className="text-text-secondary text-sm mb-4">No products match your filters</p>
                <button
                  onClick={() => { setSelectedCategories([]); setSelectedColors([]); setPriceRange([0, 500]); }}
                  className="text-primary text-sm font-medium underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
