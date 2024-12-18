import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Image {
  id: number;
  url: string;
  title: string;
}

const images: Image[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
    title: "Mountain Landscape"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1682687221038-404670f8f0ab",
    title: "Ocean Sunset"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538",
    title: "City Lights"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3",
    title: "Forest Path"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1682686580024-580519d4b2d2",
    title: "Desert Dunes"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1682686580186-b55d2a91053c",
    title: "Northern Lights"
  }
];

const GalleryMediaSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  return (
    <div className="container mx-auto px-4 py-32">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Gallery
      </h2>
      
      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative group cursor-pointer overflow-hidden rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 transform"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={`${image.url}?auto=format&fit=crop&w=800&q=80`}
              alt={image.title}
              className="w-full h-64 object-cover rounded-lg transition-all duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-semibold">{image.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal/Popup */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-xl shadow-xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
            >
              <X size={24} />
            </button>
            <img
              src={`${selectedImage.url}?auto=format&fit=crop&w=1200&q=90`}
              alt={selectedImage.title}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <h3 className="text-black text-2xl font-semibold mt-4 text-center">
              {selectedImage.title}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryMediaSection;
