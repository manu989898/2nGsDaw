import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImageGallery = ({ galleryImages, intervalTime = 5000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (galleryImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [galleryImages.length, intervalTime]);

  return (
    <div className="relative w-full h-[450px] overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence mode="wait">
        {galleryImages.length > 0 && (
          <motion.img
            key={galleryImages[currentImageIndex]?.image}
            src={galleryImages[currentImageIndex]?.image}
            alt={galleryImages[currentImageIndex]?.name}
            className="absolute w-full h-full object-cover rounded-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
      
      {/* Botones de navegación */}
      <button
        onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full text-lg hover:bg-opacity-75 transition"
      >❮</button>
      <button
        onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full text-lg hover:bg-opacity-75 transition"
      >❯</button>
      
      {/* Indicadores de imagen (dots) */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {galleryImages.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
