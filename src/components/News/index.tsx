import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { fetchNewsPagination, fetchNewsById } from "../../apirequest/news";
import { toast } from "react-toastify";

interface NewsArticle {
  id: string;
  heading: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  images: string[];
}

const NewsSection = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, noOfPages } = await fetchNewsPagination(page, limit);
        setNewsArticles(data);
        setTotalPages(noOfPages);
      } catch (error) {
        toast.error("Failed to load news articles");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, limit]);

  const handleArticleClick = async (article: NewsArticle) => {
    try {
      setDetailLoading(true);
      const fullArticle = await fetchNewsById(article.id);
      setSelectedArticle(fullArticle);
    } catch (error) {
      toast.error("Failed to load news details");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleBackClick = () => {
    setSelectedArticle(null);
  };

  const recentArticles = newsArticles
    .filter((article) => article.id !== selectedArticle?.id)
    .slice(0, 4);

  if (loading && !selectedArticle) {
    return (
      <div className="min-h-screen bg-[#f9fafb] py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Latest News</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {selectedArticle ? (
        <div className="flex flex-col lg:flex-row lg:gap-0 py-16 px-6 lg:px-8">
          <div className="lg:w-3/4 bg-white rounded-lg overflow-hidden shadow-lg">
            <button
              onClick={handleBackClick}
              className="p-4 text-indigo-600 hover:text-indigo-700 flex items-center gap-2 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to News
            </button>

            {detailLoading ? (
              <div className="animate-pulse p-6">
                <div className="h-72 lg:h-[450px] bg-gray-200 rounded"></div>
                <div className="mt-4 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="relative h-72 lg:h-[450px]">
                  <img
                    src={selectedArticle.images[0] || "https://via.placeholder.com/800x450"}
                    alt={selectedArticle.heading}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <p className="text-sm text-indigo-600">{selectedArticle.date}</p>
                    <p className="text-sm text-indigo-600">{selectedArticle.time}</p>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedArticle.heading}</h1>
                  <p className="text-gray-700 mb-2 font-medium">Venue: {selectedArticle.venue}</p>
                  <p className="text-gray-700 whitespace-pre-line">{selectedArticle.description}</p>

                  {selectedArticle.images.length > 1 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">More Images</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedArticle.images.slice(1).map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${selectedArticle.heading} - ${index + 1}`}
                            className="w-full h-32 object-cover rounded-md"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="lg:w-1/4 bg-[#f9fafb] rounded-lg p-4 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent News</h2>
            <div className="space-y-4">
              {recentArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg shadow hover:shadow-md p-4 flex items-center gap-4 cursor-pointer transition"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={article.images[0] || "https://via.placeholder.com/100x100"}
                      alt={article.heading}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 line-clamp-1">{article.heading}</p>
                    <p className="text-xs text-gray-500">{article.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Latest News</h1>

            {newsArticles.length === 0 && !loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No news articles found</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {newsArticles?.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => handleArticleClick(article)}
                      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 cursor-pointer"
                    >
                      <div className="relative h-48">
                        <img
                          src={article.images[0] || "https://via.placeholder.com/400x250"}
                          alt={article.heading}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-sm text-indigo-600">{article.date}</p>
                          <p className="text-sm text-indigo-600">•</p>
                          <p className="text-sm text-indigo-600">{article.time}</p>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{article.heading}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{article.description}</p>
                        <p className="text-sm text-gray-500 mt-2">Venue: {article.venue}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center mt-8 gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-indigo-300"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(p => p + 1)}
                      disabled={page >= totalPages}
                      className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-indigo-300"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsSection;