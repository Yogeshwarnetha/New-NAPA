import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  {
    url: "https://res.cloudinary.com/dil15oc7x/image/upload/v1738836810/2c592bc8eac6a0097cf5119ffe615dc3_idyl3t.jpg",
    title: "NAPA Delaware Chapter Launch",
    description: ""
  },
  {
    url: "https://res.cloudinary.com/dil15oc7x/image/upload/v1738836812/9c1c8a6dbbeebab3bc117741d7e1e3bc_pxvcvz.jpg",
    title: "NAPA Markandeya Jayanthi Celebrations - Carolinas Chapter",
    description: ""
  },
  {
    url: "https://res.cloudinary.com/dil15oc7x/image/upload/v1738836812/4640b22066eeac03ab6b4c9269c86acf_p05ftv.jpg",
    title: "NAPA Markandeya Jayanthi Celebrations - Carolinas Chapter",
    description: ""
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying) {
      intervalId = setInterval(nextSlide, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className="flex items-center justify-center p-0 sm:p-4">
      <div
        className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden group shadow-lg"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Slides */}
        <div
          className="w-full h-full flex"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full h-full relative">
              <div
                className="absolute inset-0 bg-center"
                style={{
                  backgroundImage: `url(${image.url})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: '#fff'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white transform transition-transform duration-500">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 opacity-90 line-clamp-2">
                  {image.title}
                </h2>
                {image.description && (
                  <p className="text-xs sm:text-sm md:text-base opacity-80 max-w-2xl line-clamp-2 md:line-clamp-none">
                    {image.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-[43529c]/20 hover:bg-[43529c]/30 backdrop-blur-sm p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </button>

        <button
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/30 backdrop-blur-sm p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </button>

        {/* Progress Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${currentIndex === index
                ? 'w-6 sm:w-8 bg-black'
                : 'w-1.5 sm:w-2 bg-black/50 hover:bg-black/70'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play Indicator */}
        <div
          className={`absolute top-4 right-4 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-colors duration-300 ${isAutoPlaying ? 'bg-green-400' : 'bg-black/50'
            }`}
        />
      </div>
    </div>
  );
}

export default Carousel;