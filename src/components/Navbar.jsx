import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
  const { toggleDrawer, itemCount } = useCart();
  const location = useLocation();
  const { scrollY } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  const shadow = useTransform(scrollY, [0, 50], ['0 0 0 transparent', '0 2px 20px rgba(0,0,0,0.06)']);
  const isActive = (path) => location.pathname === path;

  const links = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/collections', label: 'Collections' },
    { path: '/about', label: 'About' },
  ];

  return (
    <>
      <motion.nav
        className="glass-nav fixed top-0 left-0 right-0 z-50"
        style={{ boxShadow: shadow }}
      >
        <div className="container-wide flex items-center justify-between h-[80px] md:h-[96px]">
          {/* Hamburger — Mobile */}
          <button
            className="lg:hidden p-2 -ml-2 text-text"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" id="nav-logo">
            <span className="text-xl md:text-2xl font-display font-semibold tracking-[0.15em] text-text group-hover:text-primary transition-colors duration-300">
              AURÉA
            </span>
            <span className="text-xl md:text-2xl font-display font-light italic text-primary tracking-wide">
              Living
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`relative type-caps text-[11px] tracking-[0.2em] transition-colors duration-300 py-3 font-bold ${
                  isActive(link.path) ? 'text-primary' : 'text-text-secondary hover:text-primary'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex p-2.5 text-text-secondary hover:text-text transition-colors" aria-label="Search">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <motion.button
              onClick={toggleDrawer}
              className="relative p-2.5 text-text-secondary hover:text-text transition-colors"
              aria-label="Cart"
              id="nav-cart-button"
              whileTap={{ scale: 0.92 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <AnimatePresence mode="wait">
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-full w-[320px] bg-white z-50 p-10 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-lg font-display font-semibold tracking-[0.1em]">AURÉA <span className="font-light italic text-primary">Living</span></span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text hover:bg-[#faf7f4] transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col gap-8">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`text-xl font-display font-semibold tracking-wide ${
                      isActive(link.path) ? 'text-primary' : 'text-text'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
