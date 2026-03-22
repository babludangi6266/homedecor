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
    <footer className="relative bg-black/50 backdrop-blur-3xl border-t border-white/5 text-white overflow-hidden" id="footer">
      
      {/* ── Immersive Glow Effects ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
      <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />

      <div className="container-wide pt-24 md:pt-32 pb-12 relative z-10">
        
        {/* ── Links & Info Grid ── */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 pt-4 md:pt-8"
        >
          {/* Brand Col */}
          <motion.div variants={fadeUp} className="col-span-1 lg:col-span-4 lg:pr-12 flex flex-col items-start text-left">
            <Link to="/" className="text-2xl font-display font-medium tracking-widest mb-6 block hover:opacity-70 transition-opacity text-white">
              HOME DECOR <span className="font-light italic text-white/50">Express</span>
            </Link>
            <p className="type-body text-white/40 text-sm max-w-[320px] mb-12 leading-relaxed">
              Sourcing the finest handcrafted furniture and decor from master artisans across the globe. Built for decades, not seasons.
            </p>
            <div className="flex gap-8">
              {['Instagram', 'Pinterest', 'Journal'].map((social) => (
                <a key={social} href="#" className="type-caps text-[10px] text-white/60 hover:text-white transition-colors relative group font-bold tracking-widest">
                  {social}
                  <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Links Cols */}
          <div className="col-span-1 lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-8 w-full">
            {[
              { title: 'Shop', items: ['Living Room', 'Bedroom', 'Dining', 'New Arrivals'] },
              { title: 'Brand', items: ['Our Story', 'Sustainability', 'The Artisans'] },
              { title: 'Support', items: ['FAQ', 'Shipping Info', 'Returns', 'Contact Us'] },
            ].map((col) => (
              <motion.div key={col.title} variants={fadeUp} className="flex flex-col">
                <h4 className="type-caps text-white mb-8 font-bold tracking-widest">{col.title}</h4>
                <ul className="space-y-5">
                  {col.items.map((item) => (
                    <li key={item} className="relative group">
                      <span className="absolute top-1/2 -left-4 w-2 h-[1px] bg-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none" />
                      <Link to="/shop" className="text-sm font-medium text-white/40 hover:text-white transition-colors block">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom Marquee & Copyright ── */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="mt-24 md:mt-32 pt-8 border-t border-white/10 flex flex-col items-center"
        >
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-12 px-2">
            <div className="flex gap-8">
              {['Privacy Policy', 'Terms of Service'].map((link) => (
                <a key={link} href="#" className="type-caps text-[9px] text-white/30 hover:text-white transition-colors tracking-widest">
                  {link}
                </a>
              ))}
            </div>
            <p className="type-caps text-[9px] text-white/30 tracking-widest text-center md:text-right">
              © 2026 Home Decor Express. All rights reserved.
            </p>
          </div>
          
          {/* Stunning Full-width Brand Signature */}
          <div className="w-full overflow-hidden flex justify-center opacity-5 select-none pointer-events-none">
            <h1 className="text-[12vw] leading-none font-display font-bold tracking-tighter whitespace-nowrap">
              HOME DECOR EXPRESS
            </h1>
          </div>
        </motion.div>
        
      </div>
    </footer>
  );
}
