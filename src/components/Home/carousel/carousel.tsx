// src/components/Carousel.tsx

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImage {
  url: string;
  title: string;
}

interface CarouselProps {
  images: CarouselImage[];
}

const Carousel = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };


  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    let intervalId: number;

    if (isAutoPlaying && images.length > 1) {
      intervalId = window.setInterval(nextSlide, isMobile ? 7000 : 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoPlaying, nextSlide, isMobile, images.length]);

  if (images.length === 0) {
    return <div className="text-center py-8 md:py-10 text-gray-500">No banners available</div>;
  }

  return (
    <div className="w-full max-w-none p-0 m-0">
      <div
        className={`relative w-full overflow-hidden group shadow-lg ${isMobile ? '' : 'min-h-screen'}`}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Slides */}
        <div
          className={`w-full flex transition-transform duration-700 ease-in-out ${isMobile ? '' : 'h-screen'}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((banner, index) => (
            <div
              key={`${banner.url}-${index}`}
              className={`min-w-full relative flex items-center justify-center ${isMobile ? '' : 'h-screen'}`}
            >
              {isMobile ? (
                <>
                  <img
                    src={banner.url}
                    alt={banner.title}
                    className="w-full h-auto block object-contain bg-black"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h2 className="text-md font-semibold mb-2 opacity-90 line-clamp-2">
                      {banner.title}
                    </h2>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="absolute inset-0 w-full h-full bg-center bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url(${banner.url})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <h2 className="text-md md:text-2xl lg:text-4xl font-light sm:font-semibold md:font-bold mb-2 md:mb-3 opacity-90 line-clamp-2">
                      {banner.title}
                    </h2>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Always visible on mobile */}
        {images.length > 1 && (
          <>
            <button
              className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/30 backdrop-blur-sm p-2 sm:p-3 rounded-full ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-all duration-300 hover:scale-110`}
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </button>

            <button
              className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/30 backdrop-blur-sm p-2 sm:p-3 rounded-full ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-all duration-300 hover:scale-110`}
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </button>
          </>
        )}

        {/* Auto-play Indicator */}
        {!isMobile && images.length > 1 && (
          <div
            className={`absolute top-4 right-4 w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400' : 'bg-white/50'
              }`}
          />
        )}
      </div>
    </div>
  );
};

export default Carousel;