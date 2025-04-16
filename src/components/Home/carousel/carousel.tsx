import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchBannerData } from '../../../apirequest/banner';

interface BannerItem {
  id: number;
  heading: string;
  description: string;
  images: string[];
}

const Carousel = () => {
  const [images, setImages] = useState<{ url: string; title: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const getBanners = async () => {
      try {
        const response = await fetchBannerData();

        // ✅ Fix: updated this line
        const data: BannerItem[] = response.data;

        const formatted = data.flatMap((item) =>
          item.images.map((img) => ({
            url: img,
            title: item.heading || "Untitled",
          }))
        );
        setImages(formatted);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    getBanners();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying && images.length > 1) {
      intervalId = setInterval(nextSlide, isMobile ? 7000 : 5000);
    }

    return () => clearInterval(intervalId);
  }, [isAutoPlaying, nextSlide, isMobile, images]);

  if (images.length === 0) {
    return <div className="text-center py-10 text-gray-500">Loading banners...</div>;
  }

  return (
    <div className="flex items-center justify-center p-0 sm:p-4">
      <div
        className={`relative w-full ${isMobile ? "h-[300px]" : "h-[500px] sm:h-[600px] md:h-[800px]"} overflow-hidden group shadow-lg`}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Slides */}
        <div
          className="w-full h-full flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((banner) => (
            <div key={banner.url} className="min-w-full h-full relative">
              <div
                className="absolute inset-0 bg-center"
                style={{
                  backgroundImage: `url(${banner?.url})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: '#fff'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className={`absolute bottom-0 left-0 right-0 ${isMobile ? "p-2" : "p-6 md:p-8"} text-white`}>
                <h2 className="text-xl sm:text-md md:text-3xl lg:text-4xl font-light sm:font-semibold md:font-bold mb-2 md:mb-3 opacity-90 line-clamp-2">
                  {banner.title}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {!isMobile && (
          <>
            <button
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/30 backdrop-blur-sm p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
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
          </>
        )}

        {/* Progress Indicators */}
        <div className={`absolute bottom-3 ${isMobile ? "gap-1" : "bottom-6 gap-2"} left-1/2 -translate-x-1/2 flex`}>
          {images.map((img, index) => (
            <button
              key={img.url}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === index
                ? 'w-6 bg-black'
                : 'w-1.5 bg-black/50 hover:bg-black/70'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play Indicator */}
        <div
          className={`absolute top-4 right-4 w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400' : 'bg-black/50'}`}
        />
      </div>
    </div>
  );
};

export default Carousel;
