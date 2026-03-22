import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Footer from '../components/Footer';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

export default function About() {
  // Hero Parallax Scroll
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgScale = useTransform(heroProgress, [0, 1], [1, 1.3]);
  const heroTextY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  // Image Parallax Blocks
  const block1Ref = useRef(null);
  const { scrollYProgress: b1Progress } = useScroll({ target: block1Ref, offset: ['start end', 'end start'] });
  const b1ImgY = useTransform(b1Progress, [0, 1], ['-20%', '20%']);

  const block2Ref = useRef(null);
  const { scrollYProgress: b2Progress } = useScroll({ target: block2Ref, offset: ['start end', 'end start'] });
  const b2ImgY = useTransform(b2Progress, [0, 1], ['-20%', '20%']);

  // Philosophy Marquee Scroll
  const { scrollYProgress: pageScroll } = useScroll();
  const marqueeX = useTransform(pageScroll, [0, 1], [100, -1000]);

  return (
    <div className="bg-bg min-h-screen relative overflow-hidden">
      
      {/* ═══════════════════ IMMERSIVE HERO ═══════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Parallax Image */}
        <motion.div 
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ scale: heroImgScale, opacity: heroOpacity }}
        >
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=80" 
            alt="Beautiful serene interior" 
            className="w-full h-full object-cover brightness-[0.65]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-bg" />
        </motion.div>

        {/* Hero Text */}
        <motion.div 
          className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-24"
          style={{ y: heroTextY, opacity: heroOpacity }}
          initial="hidden" animate="visible" variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex justify-center items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-primary" />
            <span className="type-caps text-white tracking-[0.3em] font-medium text-xs">Our Heritage</span>
            <div className="w-12 h-[1px] bg-primary" />
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] leading-[1.05] font-display text-white mb-8 tracking-tight drop-shadow-2xl">
            Designing sanity<br />
            <span className="text-white/70 italic font-light font-serif">for the modern home.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="type-body text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Home Decor Express was founded on a simple belief: that your home should be your sanctuary. We partner directly with master artisans to bring you pieces that are as intentional as they are beautiful.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
        >
          <span className="type-caps text-[10px] text-white/50 tracking-widest">Scroll to discover</span>
          <div className="w-[1px] h-16 bg-white/20 overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
              animate={{ top: ['-50%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ INTERACTIVE VALUES GRID ═══════════════════ */}
      <section className="py-24 md:py-32 bg-bg relative z-20">
        <div className="container-wide">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {[
              { title: "Uncompromising Quality", text: "We reject the fast-furniture culture. Every piece undergoes rigorous stress testing to ensure it lasts decades, not seasons.", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
              { title: "Radical Transparency", text: "From the forest floor to your living room door, we track the entire lifecycle of our materials to guarantee ethical sourcing.", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" },
              { title: "Artisan Empowerment", text: "We cut out the middlemen so the exceptionally talented craftspeople forming your furniture receive the premium wages they deserve.", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" }
            ].map((val, i) => (
              <motion.div 
                key={i} variants={fadeUp}
                whileHover={{ scale: 1.03, y: -10 }}
                className="bg-bg-section border border-border/50 rounded-2xl p-8 md:p-12 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 cursor-default group"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={val.icon} /></svg>
                </div>
                <h3 className="type-h3 mb-4">{val.title}</h3>
                <p className="type-body text-text-light">{val.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ PARALLAX STORY BLOCKS ═══════════════════ */}
      <section className="pb-24 md:pb-32 bg-bg overflow-hidden">
        <div className="container-wide space-y-32 md:space-y-48">
          
          {/* Block 1: Craftsmanship */}
          <div ref={block1Ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
              className="aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl bg-bg-section relative"
            >
              <motion.img
                style={{ y: b1ImgY }}
                src="https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=1200&q=80"
                alt="Artisan studio"
                className="absolute inset-0 w-full h-[140%] -top-[20%] object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-[1px] bg-primary" />
                <span className="type-caps text-primary tracking-widest text-xs font-bold">Master Craftsmanship</span>
              </div>
              <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] font-display mb-8 tracking-tight">Built to age<br />beautifully.</h2>
              <p className="type-body mb-6 text-lg text-text-light leading-relaxed">
                We obsess over joinery, organic materials, and hand-applied finishes. Every piece in our collection is rigorously quality-checked and designed to age gracefully over decades.
              </p>
              <p className="type-body text-lg text-text-light leading-relaxed">
                By working closely with multi-generational workshops in Portugal, Vietnam, and Italy, we preserve heritage techniques while creating timeless, minimalist silhouettes perfectly suited for modern living.
              </p>
            </motion.div>
          </div>

          {/* Block 2: Sustainability */}
          <div ref={block2Ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
              className="order-2 md:order-1 max-w-xl md:ml-auto"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="type-caps text-primary tracking-widest text-xs font-bold">Sustainability</span>
                <span className="w-8 h-[1px] bg-primary" />
              </div>
              <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] font-display mb-8 tracking-tight">Earth-conscious<br />by design.</h2>
              <p className="type-body mb-6 text-lg text-text-light leading-relaxed">
                Beautiful design shouldn't come at the cost of our planet. That's why 100% of our wood is sustainably sourced and FSC-certified. Our textiles use plant-based dyes and organic cotton or OEKO-TEX certified linen.
              </p>
              <p className="type-body text-lg text-text-light leading-relaxed">
                We are constantly refining our packaging to eliminate single-use plastics and neutralize our shipping footprint, ensuring our commitment to the Earth matches our commitment to your home.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
              className="order-1 md:order-2 aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl bg-bg-section relative"
            >
              <motion.img
                style={{ y: b2ImgY }}
                src="https://images.unsplash.com/photo-1602628525144-56e8e2b79c78?w=1200&q=80"
                alt="Sustainable materials"
                className="absolute inset-0 w-full h-[140%] -top-[20%] object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </section>

      {/* ═══════════════════ SCROLLING MARQUEE ═══════════════════ */}
      <section className="py-24 border-y border-border/50 bg-[#faf7f4] overflow-hidden">
        <motion.div 
          className="flex whitespace-nowrap opacity-20 hover:opacity-100 transition-opacity duration-700"
          style={{ x: marqueeX }}
        >
          <h2 className="text-[6rem] md:text-[10rem] font-display font-medium tracking-tighter leading-none px-12">
            DESIGNED WITH INTENTION &mdash; CRAFTED WITH PASSION &mdash; BUILT FOR GENERATIONS &mdash; 
          </h2>
          <h2 className="text-[6rem] md:text-[10rem] font-display font-medium tracking-tighter leading-none px-12">
            DESIGNED WITH INTENTION &mdash; CRAFTED WITH PASSION &mdash; BUILT FOR GENERATIONS &mdash; 
          </h2>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
