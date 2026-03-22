import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { rooms } from '../data/products';
import Footer from '../components/Footer';

export default function Collections() {
  return (
    <div className="bg-bg min-h-screen" style={{ paddingTop: '100px' }}>
      {/* Header */}
      <div className="container-wide mb-16 md:mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center"><div className="section-divider" /></div>
          <h1 className="type-h1 mb-6">Curated Collections</h1>
          <p className="type-body max-w-2xl mx-auto">
            Explore our handcrafted pieces organized by space. Each collection is thoughtfully designed to bring intentionality, texture, and serene beauty into your daily life.
          </p>
        </motion.div>
      </div>

      {/* Collections List */}
      <div className="container-wide pb-24 md:pb-32">
        <div className="flex flex-col gap-20 md:gap-32">
          {rooms.map((room, i) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-20`}
            >
              <div className="w-full md:w-3/5 overflow-hidden rounded-2xl bg-bg-section card-shadow aspect-[4/3] md:aspect-[16/10] relative group">
                <Link to={`/shop?room=${room.slug}`} className="block w-full h-full">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </Link>
              </div>

              <div className="w-full md:w-2/5 flex flex-col items-start">
                <span className="type-caps mb-4 text-primary">Collection 0{i + 1}</span>
                <h2 className="type-h2 mb-6">{room.name}</h2>
                <p className="type-body mb-10 text-base">
                  {room.name === 'Living Room' && "Transform your gathering space into a sanctuary of comfort and style with our hand-selected seating, artisanal lighting, and grounding textiles."}
                  {room.name === 'Bedroom' && "Create a restful retreat focusing on calm aesthetics and natural materials. Discover soothing palettes, plush linens, and minimal decor for your inner sanctum."}
                  {room.name === 'Office' && "Elevate your productivity with pieces that inspire focus and creativity. Discover architectural organization pieces and sculptural accents designed for the modern workspace."}
                </p>

                <Link to={`/shop?room=${room.slug}`}>
                  <button className="btn-premium px-10 shadow-xl shadow-primary/10">
                    Explore {room.name}
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
