import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { items, isOpen, closeDrawer, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={closeDrawer}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-50 flex flex-col shadow-2xl"
            id="cart-drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-border-light">
              <h2 className="type-h3">
                Bag <span className="type-small font-normal ml-2">({items.length} items)</span>
              </h2>
              <motion.button
                onClick={closeDrawer}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-warm hover:bg-white hover:shadow-sm transition-all shadow-none"
                whileTap={{ scale: 0.9 }}
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <div className="w-24 h-24 rounded-full bg-bg-warm flex items-center justify-center mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-text-muted">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                  </div>
                  <p className="type-display-sm mb-2">Your bag is empty</p>
                  <p className="type-small mb-8">Start your journey into intentional living with our artisan collection.</p>
                  <motion.button
                    onClick={closeDrawer}
                    className="btn-premium px-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Shopping
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-8">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-6 group"
                    >
                      <div className="w-[100px] h-[125px] flex-shrink-0 bg-bg-section rounded-2xl overflow-hidden card-shadow">
                        <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex-1 min-w-0 py-1 flex flex-col justify-between">
                        <div>
                          <h3 className="type-display-sm text-[14px] mb-1 truncate">{item.name}</h3>
                          <p className="type-small font-bold text-primary">${item.price}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center bg-bg-warm border border-border-light rounded-full p-1">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-text-secondary hover:bg-white rounded-full transition-colors">−</button>
                            <span className="w-8 text-center text-xs font-bold text-text">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-text-secondary hover:bg-white rounded-full transition-colors">+</button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="type-caps text-[9px] hover:text-red-500 transition-colors">Remove</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout */}
            {items.length > 0 && (
              <div className="px-8 py-8 border-t border-border-light bg-bg-warm">
                <div className="flex justify-between items-end mb-2">
                  <span className="type-caps text-[10px]">Subtotal</span>
                  <span className="type-h3 text-text">${subtotal.toFixed(2)}</span>
                </div>
                <p className="type-small text-[10px] mb-6">Tax and curated shipping included at checkout.</p>
                <motion.button
                  className="btn-premium w-full py-5 text-base shadow-xl"
                  id="checkout-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>
                <button onClick={closeDrawer} className="w-full text-center type-caps text-[9px] mt-6 tracking-widest hover:text-primary transition-colors">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
