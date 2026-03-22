import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-text mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-primary text-sm hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <div className="bg-bg min-h-screen pt-[72px] md:pt-[80px]" id="product-detail-page">
      {/* ── Breadcrumb ── */}
      <div className="container-wide py-6 md:py-8">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="type-caps text-[9px]">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-3 text-text-light">/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span className="mx-3 text-text-light">/</span>
          <span className="text-text-secondary">{product.name}</span>
        </motion.p>
      </div>

      {/* ── Product Layout ── */}
      <div className="container-wide pb-20 sm:pb-24 md:pb-32">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-14 lg:gap-20">
          {/* Left — Images */}
          <motion.div
            className="lg:w-[55%]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Image */}
            <div
              className="aspect-[4/5] bg-bg-section rounded-[2rem] overflow-hidden mb-6 cursor-zoom-in relative card-shadow"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt=""
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={isZoomed ? { transform: 'scale(1.8)', transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : {}}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4 sm:gap-5">
              {product.images.map((img, i) => (
                <motion.button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square bg-bg-section rounded-2xl overflow-hidden transition-all duration-300 ${
                    selectedImage === i ? 'ring-2 ring-primary ring-offset-4' : 'opacity-40 hover:opacity-100 hover:scale-105'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right — Info */}
          <motion.div
            className="lg:w-[45%] lg:pt-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Category & Rating */}
            <div className="flex items-center justify-between mb-8">
              <span className="type-caps">{product.category}</span>
              <div className="flex items-center gap-2 bg-bg-warm px-4 py-1.5 rounded-full border border-border-light">
                <span className="text-primary text-sm">★</span>
                <span className="text-xs font-bold text-text-secondary">{product.rating}</span>
                <span className="text-[10px] text-text-muted ml-1 border-l border-border-light pl-2">24 Reviews</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="type-h2 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <p className="type-h3 text-primary mb-10">${product.price}</p>

            {/* Description */}
            <p className="type-body mb-10 text-base">
              {product.description}
            </p>

            <div className="h-px bg-border-light mb-10" />

            {/* Quantity */}
            <div className="mb-10">
              <label className="type-caps mb-4 block">Quantity</label>
              <div className="inline-flex items-center bg-bg-warm border border-border-light rounded-full p-1.5">
                <motion.button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-text-secondary hover:bg-white hover:shadow-sm rounded-full transition-all text-xl"
                  whileTap={{ scale: 0.9 }}
                >−</motion.button>
                <div className="w-14 text-center">
                  <motion.span key={quantity} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-bold text-text">
                    {quantity}
                  </motion.span>
                </div>
                <motion.button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-text-secondary hover:bg-white hover:shadow-sm rounded-full transition-all text-xl"
                  whileTap={{ scale: 0.9 }}
                >+</motion.button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.button
                onClick={() => addItem(product, quantity)}
                className="btn-premium flex-1 py-5 shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add to Cart — ${(product.price * quantity).toFixed(2)}
              </motion.button>
              <motion.button
                className="w-16 h-16 flex items-center justify-center border border-border rounded-full text-text-secondary hover:text-primary hover:border-primary transition-all flex-shrink-0"
                whileTap={{ scale: 0.9 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              </motion.button>
            </div>

            {/* Accordion */}
            <div className="border-t border-border-light">
              <button
                onClick={() => setAccordionOpen(!accordionOpen)}
                className="flex items-center justify-between w-full py-8 text-left group"
              >
                <span className="type-display-sm">Specifications & Care</span>
                <span className={`text-xl transition-transform duration-300 ${accordionOpen ? 'rotate-45' : ''}`}>+</span>
              </button>
              <AnimatePresence>
                {accordionOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 space-y-6">
                      <div className="bg-bg-warm rounded-2xl p-6 border border-border-light">
                        <p className="type-caps text-[9px] mb-3">Dimensions</p>
                        <p className="text-sm text-text-secondary leading-relaxed">{product.dimensions}</p>
                      </div>
                      <div className="bg-bg-warm rounded-2xl p-6 border border-border-light">
                        <p className="type-caps text-[9px] mb-3">Materials</p>
                        <p className="text-sm text-text-secondary leading-relaxed">{product.materials}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                { icon: '📦', text: 'White Glove Delivery' },
                { icon: '⏳', text: 'Limited Batch' },
                { icon: '🌿', text: 'Eco-Certified' },
              ].map((badge) => (
                <div key={badge.text} className="text-center rounded-2xl py-4 border border-border-light bg-bg-warm/30">
                  <span className="text-xl block mb-2">{badge.icon}</span>
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest leading-tight block px-2">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Related Products ── */}
      <section className="section-py bg-bg-warm" id="related-products">
        <div className="container-wide">
          <div className="text-center mb-16">
            <div className="flex justify-center"><div className="section-divider" /></div>
            <h2 className="type-h2">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
