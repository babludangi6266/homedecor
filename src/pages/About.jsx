import { motion } from 'framer-motion';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="bg-bg min-h-screen" style={{ paddingTop: '100px' }}>
      <div className="container-wide mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex justify-center"><div className="section-divider" /></div>
          <h1 className="type-h1 mb-6">Our Story</h1>
          <p className="type-body max-w-2xl mx-auto text-lg">
            Home Decor Express was founded on a simple belief: that your home should be your sanctuary. We travel the globe to source the finest materials and partner directly with master artisans to bring you pieces that are as intentional as they are beautiful.
          </p>
        </motion.div>
      </div>

      <div className="container-wide pb-24 md:pb-32">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl bg-bg-section card-shadow">
            <img
              src="https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=1200&q=80"
              alt="Artisan studio"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="type-caps mb-4 text-primary">Master Craftsmanship</span>
            <h2 className="type-h2 mb-6">Built to Last Generations</h2>
            <p className="type-body mb-6">
              We reject the fast-furniture culture. Instead, we obsess over joinery, organic materials, and hand-applied finishes. Every piece in our collection is rigorously quality-checked and designed to age gracefully over decades.
            </p>
            <p className="type-body">
              By working closely with multi-generational workshops in Portugal, Vietnam, and Italy, we preserve heritage techniques while creating timeless, minimalist silhouettes perfectly suited for modern living.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center flex-col-reverse"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="order-2 md:order-1">
            <span className="type-caps mb-4 text-primary">Sustainability</span>
            <h2 className="type-h2 mb-6">Earth-Conscious Materials</h2>
            <p className="type-body mb-6">
              Beautiful design shouldn't come at the cost of our planet. That's why 100% of our wood is sustainably sourced and FSC-certified. Our textiles use plant-based dyes and organic cotton or OEKO-TEX certified linen.
            </p>
            <p className="type-body">
              We are constantly refining our packaging to eliminate single-use plastics and neutralize our shipping footprint, ensuring our commitment to the Earth matches our commitment to your home.
            </p>
          </div>
          <div className="aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl bg-bg-section card-shadow order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1602628525144-56e8e2b79c78?w=1200&q=80"
              alt="Sustainable materials"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
