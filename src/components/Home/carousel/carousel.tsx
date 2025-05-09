// src/components/Carousel.tsx

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchBannerData } from '../../../apirequest/banner';

interface CarouselImage {
  url: string;
  title: string;
}

const Carousel = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch and transform banner data
  useEffect(() => {
    const getBanners = async () => {
      try {
        setLoading(true);
        const banners = await fetchBannerData();

        // No need to access .data here since fetchBannerData returns Banner[] directly
        const activeBanners = banners.filter(banner => !banner.is_deleted);

        // Transform banner data to carousel images
        const formattedImages = activeBanners.flatMap(banner =>
          banner.images.map(image => ({
            url: image,
            title: banner.heading || "Untitled",
          }))
        );

        setImages(formattedImages);
        setError(null);
      } catch (err) {
        setError('Failed to load banners');
        console.error('Error fetching banner data:', err);
      } finally {
        setLoading(false);
      }
    };

    getBanners();
  }, []);

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

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
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
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying && images.length > 1) {
      intervalId = setInterval(nextSlide, isMobile ? 7000 : 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoPlaying, nextSlide, isMobile, images.length]);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading banners...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (images.length === 0) {
    return <div className="text-center py-10 text-gray-500">No banners available</div>;
  }

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 mx-4 sm:mx-6 lg:mx-8 my-4 sm:my-6">
      <div
        className={`relative w-full max-w-[1800px] rounded-xl overflow-hidden ${isMobile ? "h-[300px]" : "h-[500px] sm:h-[600px] md:h-[800px]"
          } group shadow-lg`}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Slides */}
        <div
          className="w-full h-full flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((banner, index) => (
            <div key={`${banner.url}-${index}`} className="min-w-full h-full relative">
              <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${banner.url})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className={`absolute bottom-0 left-0 right-0 ${isMobile ? "p-4" : "p-6 md:p-8"
                } text-white`}
              >
                <h2 className="text-md md:text-2xl lg:text-4xl font-light sm:font-semibold md:font-bold mb-2 md:mb-3 opacity-90 line-clamp-2">
                  {banner.title}
                </h2>
              </div>
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

        {/* Progress Indicators */}
        {images.length > 1 && (
          <div className={`absolute bottom-3 ${isMobile ? "gap-1" : "bottom-6 gap-2"
            } left-1/2 -translate-x-1/2 flex`}
          >
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === index
                  ? 'w-6 bg-white'
                  : 'w-1.5 bg-white/50 hover:bg-white/70'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
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