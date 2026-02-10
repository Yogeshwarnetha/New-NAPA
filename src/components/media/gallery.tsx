import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchGalleryPagination } from "../../apirequest/gallery";

interface GalleryItem {
  id: string | number;
  event_name: string;
  google_photo_url: string;
  image_url: string;
  createdAt?: string;
  updatedAt?: string;
}

const GalleryMediaSection: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(8); // Using 8 for a nice grid layout
  const [count, setCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchGalleryPagination(page, limit);
        setGalleryItems(data?.data);
        setCount(data.count);
      } catch (error) {
        console.error("Failed to fetch gallery items:", error);
        toast.error("Failed to load gallery items");
      }
      setLoading(false);
    };
    fetchData();
  }, [page, limit]);

  const handleNextPage = () => {
    if (page * limit < count) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Gallery
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
        </div>
      ) : (
        <>
          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <a
                key={item.id}
                href={item.google_photo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 transform"
              //onClick={(e) => {
              // Optional: Uncomment if you want to keep the modal functionality
              // e.preventDefault();
              // setSelectedImage(item);
              //}}
              >
                <img
                  src={item.image_url}
                  alt={item.event_name}
                  className="w-full h-64 object-cover rounded-lg transition-all duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-semibold">{item.event_name}</h3>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`p-2 rounded-full transition-colors ${page === 1
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <span className="flex items-center text-gray-700">
              Page {page} of {Math.ceil(count / limit)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page * limit >= count}
              className={`p-2 rounded-full transition-colors ${page * limit >= count
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </>
      )}

      {/* Modal/Popup - Optional (uncomment onClick in the a tag above to use) */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-xl shadow-xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage.image_url}
              alt={selectedImage.event_name}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                {selectedImage.event_name}
              </h3>
              <a
                href={selectedImage.google_photo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Full Album
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryMediaSection;