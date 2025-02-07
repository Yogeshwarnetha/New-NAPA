import React, { useState, useEffect, useCallback } from 'react';
import { CarouselSlide } from './carouselslide';
import { CarouselControls } from './carouselcontrols';

export const images = [
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

export const Carousel: React.FC = () => {
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
    <div 
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden group rounded-xl shadow-2xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div 
        className="w-full h-full flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <CarouselSlide key={index} image={image} />
        ))}
      </div>

      <CarouselControls
        totalSlides={images.length}
        currentIndex={currentIndex}
        onPrevious={prevSlide}
        onNext={nextSlide}
        onGoToSlide={goToSlide}
        isAutoPlaying={isAutoPlaying}
      />
    </div>
  );
};