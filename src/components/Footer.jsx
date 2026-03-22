import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Footer() {
  return (
    <footer className="relative bg-[#111010] text-white overflow-hidden" id="footer">

      {/* ── Ambient Glow ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/15 rounded-full blur-[180px] pointer-events-none" />

      {/* ── Main Content ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-8 lg:py-10 relative z-10">

        {/* Links & Info Grid */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12"
        >
          {/* Brand Column */}
          <motion.div variants={fadeUp} className="col-span-1 lg:col-span-5 flex flex-col items-start">
            <Link to="/" className="text-3xl md:text-4xl font-display font-medium tracking-[0.12em] mb-8 block hover:opacity-70 transition-opacity text-white">
              AURÉA <span className="font-light italic text-white/40">Living</span>
            </Link>
            <p className="text-white/35 text-base md:text-lg leading-relaxed max-w-[380px] mb-10">
              Sourcing the finest handcrafted furniture and decor from master artisans across the globe. Built for decades, not seasons.
            </p>
            <div className="flex gap-10">
              {['Instagram', 'Pinterest', 'Journal'].map((social) => (
                <a key={social} href="#" className="text-[11px] uppercase tracking-[0.2em] font-bold text-white/50 hover:text-white transition-colors relative group">
                  {social}
                  <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Links Columns */}
          <div className="col-span-1 lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-y-12 gap-x-8 w-full">
            {[
              { title: 'Shop', items: ['Living Room', 'Bedroom', 'Dining', 'New Arrivals'] },
              { title: 'Brand', items: ['Our Story', 'Sustainability', 'The Artisans'] },
              { title: 'Support', items: ['FAQ', 'Shipping Info', 'Returns', 'Contact Us'] },
            ].map((col) => (
              <motion.div key={col.title} variants={fadeUp} className="flex flex-col">
                <h4 className="text-[11px] uppercase tracking-[0.25em] font-bold text-white/80 mb-8">{col.title}</h4>
                <ul className="space-y-5">
                  {col.items.map((item) => (
                    <li key={item} className="relative group">
                      <span className="absolute top-1/2 -left-4 w-2 h-[1px] bg-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none" />
                      <Link to="/shop" className="text-[15px] text-white/35 hover:text-white transition-colors duration-300 block">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Divider + Copyright ── */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mt-10 md:mt-10 lg:mt-10 pt-5 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex gap-8">
              {['Privacy Policy', 'Terms of Service'].map((link) => (
                <a key={link} href="#" className="text-[10px] uppercase tracking-[0.2em] text-white/25 hover:text-white/60 transition-colors">
                  {link}
                </a>
              ))}
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/25 text-center md:text-right">
              © 2026 AURÉA Living. All rights reserved.
            </p>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
