import React, { useState, useEffect, useCallback } from 'react';
import { CarouselSlide } from './carouselslide';
import { CarouselControls } from './carouselcontrols';

export const images = [
  {
    url: "https://res.cloudinary.com/dfhisjy9w/image/upload/v1730447611/c6a0762c0c077ff422e6d38e3833be69_fx7vdm.jpg",
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  },
  {
    url: "https://res.cloudinary.com/dfhisjy9w/image/upload/v1730447611/9555049f6a31eb7171d97ac5f1c2b32a_kbludh.jpg",
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  },
  {
    url: "https://res.cloudinary.com/dfhisjy9w/image/upload/v1730447610/5dc0ecb79c1d3c701b7ab0a996583229_x4384j.jpg",
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  },
  {
    url: "https://res.cloudinary.com/dfhisjy9w/image/upload/v1730447612/edb6b132797b7e7354ab6a35e2045666_xcqovr.jpg",
    title: "Lorem ipsum dolor sit amet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  }
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