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
        <div className="container-wide flex items-center justify-between h-[72px] md:h-[80px]">
          {/* Hamburger — Mobile */}
          <button
            className="lg:hidden p-2 -ml-2 text-text"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center group" id="nav-logo">
            <span className="type-display-sm text-text group-hover:text-primary transition-colors">
              HOME DECOR
            </span>
            <span className="type-display-sm font-light text-primary ml-1.5">
              Express
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`relative type-caps text-[10px] transition-colors duration-300 py-2 ${
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
          <div className="flex items-center gap-3">
            <button className="hidden md:flex p-2 text-text-secondary hover:text-text transition-colors" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <motion.button
              onClick={toggleDrawer}
              className="relative p-2 text-text-secondary hover:text-text transition-colors"
              aria-label="Cart"
              id="nav-cart-button"
              whileTap={{ scale: 0.92 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
              className="fixed left-0 top-0 h-full w-[300px] bg-white z-50 p-8 flex flex-col"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="self-end p-2 text-text-secondary mb-8"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <nav className="flex flex-col gap-6">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`text-lg font-display font-semibold ${
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
