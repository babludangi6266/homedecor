import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { rooms } from '../data/products';
import Footer from '../components/Footer';

// Component for individual collection blocks with robust internal scroll physics
const CollectionBlock = ({ room, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <div ref={ref} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24 w-full`}>
      {/* ── Parallax Image Block ── */}
      <motion.div
        className="w-full md:w-3/5 overflow-hidden rounded-2xl bg-bg-section card-shadow aspect-[4/5] md:aspect-[4/3] relative group block cursor-pointer"
        initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Link to={`/shop?room=${room.slug}`} className="absolute inset-0 z-20" />
        <motion.img
          style={{ y }}
          src={room.image}
          alt={room.name}
          className="absolute inset-0 w-full h-[140%] -top-[20%] object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-black/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none z-30" />

        {/* Hover Explore Pill */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 pointer-events-none mt-10 group-hover:mt-0">
          <div className="bg-white/95 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 transform scale-90 group-hover:scale-100 transition-transform duration-500">
            <span className="type-caps text-[10px] text-primary font-bold tracking-widest leading-none mt-0.5">EXPLORE SPACE</span>
            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </div>
        </div>
      </motion.div>

      {/* ── Typography Block ── */}
      <motion.div
        className="w-full md:w-2/5 flex flex-col items-start"
        initial={{ opacity: 0, x: index % 2 === 1 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="type-caps text-primary tracking-[0.2em] text-[10px] font-bold">0{index + 1}</span>
          <span className="w-12 h-[1px] bg-primary" />
        </div>
        <h2 className="text-[3rem] md:text-[4.5rem] leading-[1.05] font-display mb-8 tracking-tight">{room.name}</h2>
        <p className="type-body mb-12 text-lg leading-relaxed text-text-light max-w-md">
          {room.name === 'Living Room' && "Transform your gathering space into a sanctuary of comfort and style with our hand-selected seating, artisanal lighting, and grounding textiles."}
          {room.name === 'Bedroom' && "Create a restful retreat focusing on calm aesthetics and natural materials. Discover soothing palettes, plush linens, and minimal decor for your inner sanctum."}
          {room.name === 'Office' && "Elevate your productivity with pieces that inspire focus and creativity. Discover architectural organization pieces and sculptural accents designed for the modern workspace."}
        </p>

        <Link to={`/shop?room=${room.slug}`} className="group relative inline-flex items-center gap-5 cursor-pointer">
          <span className="type-caps text-xs tracking-widest font-bold text-text group-hover:text-primary transition-colors duration-300">View Collection</span>
          <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:shadow-[0_10px_30px_-10px_rgba(212,163,115,0.6)] transition-all duration-500">
            <svg className="w-4 h-4 text-primary group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export default function Collections() {
  const hdrRef = useRef(null);
  const { scrollYProgress: hdrProgress } = useScroll({ target: hdrRef, offset: ['start start', 'end start'] });
  const hdrY = useTransform(hdrProgress, [0, 1], [0, 300]);
  const hdrOpacity = useTransform(hdrProgress, [0, 0.8], [1, 0]);

  const bannerRef = useRef(null);
  const { scrollYProgress: bannerProgress } = useScroll({ target: bannerRef, offset: ['start end', 'end start'] });
  const bannerScale = useTransform(bannerProgress, [0, 1], [1, 1.2]);

  return (
    <div className="bg-bg min-h-screen relative overflow-hidden">

      {/* ═══════════════════ CINEMATIC HEADER ═══════════════════ */}
      <section ref={hdrRef} className="relative h-[60vh] min-h-[500px] md:h-[70vh] flex items-center justify-center bg-[#faf7f4] border-b border-border/50">
        <motion.div style={{ y: hdrY, opacity: hdrOpacity }} className="text-center z-10 px-4 mt-20">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}>
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="w-10 h-[1px] bg-primary" />
              <span className="type-caps text-primary tracking-[0.3em] font-bold text-[10px]">Curated Spaces</span>
              <div className="w-10 h-[1px] bg-primary" />
            </div>
            <h1 className="text-[4.5rem] md:text-[7rem] lg:text-[8.5rem] font-display leading-[0.9] tracking-tighter mb-8 text-text">
              The Collections.
            </h1>
            <p className="type-body text-lg md:text-xl text-text-light max-w-2xl mx-auto leading-relaxed">
              Explore our handcrafted pieces organized by space. Each collection is thoughtfully designed to bring intentionality and serene beauty into your daily life.
            </p>
          </motion.div>
        </motion.div>

        {/* Giant background text watermark */}
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-[0.03] select-none pointer-events-none">
          <h1 className="text-[18vw] font-display font-bold leading-none whitespace-nowrap tracking-tighter mix-blend-multiply">CURATED</h1>
        </div>
      </section>

      {/* ═══════════════════ COLLECTIONS LIST ═══════════════════ */}
      <section className="py-24 md:py-40 bg-white relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.02)]">
        <div className="container-wide">
          <div className="flex flex-col gap-32 md:gap-48">
            {rooms.map((room, i) => (
              <CollectionBlock key={room.name} room={room} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FULL WIDTH CINEMATIC BANNER ═══════════════════ */}
      <section ref={bannerRef} className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden bg-black">
        <motion.img
          style={{ scale: bannerScale }}
          src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=2000&q=80"
          alt="Interior architecture detail"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-[3rem] md:text-[6rem] leading-[1] font-display text-white mb-8 tracking-tighter drop-shadow-2xl">
              Space shapes <br /><span className="italic font-light opacity-80">the mind.</span>
            </h2>
            <Link to="/about" className="group inline-flex items-center gap-4 border-b border-white/50 hover:border-white pb-2 transition-colors">
              <span className="type-caps text-white text-[10px] tracking-[0.2em] font-bold">Discover Our Story</span>
              <svg className="w-4 h-4 text-white transform group-hover:translate-x-2 transition-transform duration-300 drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ MATERIAL FOCUS GRID ═══════════════════ */}
      <section className="py-24 md:py-40 bg-bg text-text relative overflow-hidden">
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="max-w-3xl mb-16 md:mb-24">
            <div className="flex items-center gap-4 mb-6">
              <span className="type-caps text-primary tracking-[0.3em] font-bold text-[10px]">The Elements</span>
              <div className="w-12 h-[1px] bg-primary" />
            </div>
            <h2 className="text-[3rem] md:text-[5rem] leading-[1] font-display tracking-tight mb-8">
              Raw materials,<br />refined finishes.
            </h2>
            <p className="type-body text-lg text-text-light">
              Our designs strictly celebrate organic textures. From unlacquered metals that develop
              a unique patina to kiln-dried hardwoods, the materials we use are chosen for their
              ability to tell a story over decades.
            </p>
          </motion.div>

          {/* Interactive Material Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { name: "FSC-Certified Oak", img: "https://images.unsplash.com/photo-1600169430127-095dfba9465c?w=800&q=80", desc: "Responsibly sourced, slowly kiln-dried to prevent warping over decades of use." },
              { name: "Aged Brass", img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80", desc: "Unlacquered brass that develops a completely unique, rich patina as it ages in your home." },
              { name: "Washed Belgian Linen", img: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&q=80", desc: "Stone-washed for incredible softness. Naturally breathable and endlessly durable." }
            ].map((mat, i) => (
              <motion.div
                key={mat.name}
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: i * 0.15 }}
                className="group cursor-pointer relative"
              >
                <div className="aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl bg-bg-section border border-border/50 mb-8 relative">
                  <img src={mat.img} alt={mat.name} className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] grayscale-[30%] group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500" />

                  {/* Subtle Text Overlay on Hover */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <p className="type-body text-white text-sm leading-relaxed max-w-[250px] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                      {mat.desc}
                    </p>
                  </div>
                </div>
                <h3 className="type-h3 group-hover:text-primary transition-colors duration-300 text-2xl">{mat.name}</h3>
                <div className="w-0 h-[1px] bg-primary mt-6 group-hover:w-16 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
