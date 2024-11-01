import React from 'react';

interface CarouselSlideProps {
  image: {
    url: string;
    title: string;
    description: string;
  };
}

export const CarouselSlide: React.FC<CarouselSlideProps> = ({ image }) => {
  return (
    <div className="min-w-full h-full relative flex-shrink-0">
      <img
        src={image.url}
        alt={image.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <h2 className="text-3xl font-bold mb-2">{image.title}</h2>
          <p className="text-lg opacity-90">{image.description}</p>
        </div>
      </div>
    </div>
  );
};