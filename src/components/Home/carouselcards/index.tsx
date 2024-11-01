import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CarouselCard from './carouselcards';
import { projects } from './carouseldata';

const CarouselCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getVisibleCards = useCallback(() => {
    // Show 1 card on mobile, 2 on tablet, 3 on desktop
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }, []);

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  React.useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getVisibleCards]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= projects.length - (visibleCards - 1) ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? projects.length - visibleCards : prevIndex - 1
    );
  };

  return (
    <div className="w-full py-12 sm:py-16 lg:py-20 bg-[#43529C21]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-sm uppercase tracking-wider text-indigo-600 font-semibold mb-2">
            GET UPDATED
          </h2>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Projects
          </h1>
        </div>

        <div className="relative">
          <div className="flex gap-4 md:gap-6 overflow-hidden">
            {projects
              .slice(currentIndex, currentIndex + visibleCards)
              .map((project:any) => (
                <CarouselCard key={project.id} project={project} />
              ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 lg:-translate-x-12 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 lg:translate-x-12 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <button className="w-full sm:w-auto bg-indigo-600 text-white px-6 sm:px-8 py-3 font-medium hover:bg-indigo-700 transition-colors">
            VIEW ALL PROJECTS
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselCards;