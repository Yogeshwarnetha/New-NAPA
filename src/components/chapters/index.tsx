import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchChapters } from "../../apirequest/chapter";

const ChapterList = () => {
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getChapters = async () => {
      const data = await fetchChapters();
      setChapters(data);
    };
    getChapters();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">List of Chapters</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chapters.map((chapter:any) => (
            <div
              key={chapter.id}
              onClick={() => navigate(`/chapter/${chapter.id}`)}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
            >
              <img
                src={chapter.images[0]} 
                alt={chapter.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">{chapter.title}</h2>
                <p className="text-gray-600">{chapter.description.substring(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChapterList;