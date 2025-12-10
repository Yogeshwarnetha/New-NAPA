import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchGalleryPagination } from "../../../apirequest/gallery";

interface GalleryItem {
  id: string | number;
  event_name: string;
  google_photo_url: string;
  image_url: string;
  createdAt?: string;
  updatedAt?: string;
}

const HomeGallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchGalleryPagination(page, limit);
        setGalleryItems(data?.data || []);
        setCount(data?.count || 0);
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
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-gray-50">
      <section className="py-10 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
            Our Gallery
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of stunning visuals that showcase our
            work and inspiration.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item) => (
                <a
                  key={item.id}
                  href={item.google_photo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative">
                    <img
                      src={item.image_url}
                      alt={item.event_name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <h3 className="text-white font-medium text-lg">
                        {item.event_name}
                      </h3>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className={`p-2 rounded-full transition-colors ${page === 1
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>

              <button
                onClick={handleNextPage}
                disabled={page * limit >= count}
                className={`p-2 rounded-full transition-colors ${page * limit >= count
                  ? "bg-gray-100 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default HomeGallery;
