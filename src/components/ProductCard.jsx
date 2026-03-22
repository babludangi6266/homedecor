import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
      className="group"
      id={`product-card-${product.id}`}
    >
      {/* Image Wrap */}
      <div className="relative mb-4 overflow-hidden rounded-2xl bg-bg-section card-shadow">
        <Link to={`/product/${product.id}`} className="block aspect-[4/5] img-zoom">
          <img
            src={product.image}
            alt="" /* Empty alt so it doesn't duplicate text if image fails or for screen readers who hear the h3 anyway */
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </Link>

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
          <motion.button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(product); }}
            className="w-full bg-white text-text py-3 rounded-xl text-[13px] font-bold shadow-xl hover:bg-primary hover:text-white transition-colors"
            whileTap={{ scale: 0.96 }}
          >
            Quick Add
          </motion.button>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
          {product.bestseller && (
            <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
              Best Seller
            </span>
          )}
        </div>
      </div>

      {/* Info systematic */}
      <div className="px-1">
        <p className="type-caps text-[9px] mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="type-display-sm mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-text">${product.price}</span>
          <div className="flex items-center gap-1.5 bg-bg-warm px-2 py-1 rounded-lg">
            <span className="text-primary text-xs">★</span>
            <span className="text-[11px] font-bold text-text-secondary">{product.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
