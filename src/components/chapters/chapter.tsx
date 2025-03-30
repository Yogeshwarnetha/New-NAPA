import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChapters } from "../../apirequest/chapter";
import ChapterBackgroundImg from '../../Images/New Background.jpg';
import './index.css';
import { fetchChapterDirectors, fetchChapterLeads } from "../../apirequest/boardMember";

interface Chapter {
  id: number;
  title: string;
  description: string;
  images: string[];
  chapterLeads: number[];
}

interface ChapterLead {
  id: number;
  name: string;
  imageUrl: string;
}

interface ChapterDirector {
  id: number;
  name: string;
  imageUrl: string;
}


export function ChapterDetail() {
  const { id } = useParams();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [chapterLeads, setChapterLeads] = useState<ChapterLead[]>([]);
  const [chapterDirector, setChapterDirector] = useState<ChapterDirector[]>([]);
  // State for chapter leads
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const getChapter = async () => {
      try {
        const [chaptersData, leadsData, directorsData] = await Promise.all([
          fetchChapters(),
          fetchChapterLeads(),
          fetchChapterDirectors()
        ]);

        const selectedChapter = chaptersData.find((c: any) => c.id === Number(id)) || null;
        setChapter(selectedChapter);

        setChapterLeads(leadsData);
        setChapterDirector(directorsData)
      } catch (error) {
        console.error("Error fetching data:", error);
        setChapter(null);
      } finally {
        setLoading(false);
      }
    };

    getChapter();
  }, [id]);

  const getChapterLeadDetails = (leadId: number) => {
    return chapterLeads.find((lead) => lead.id === leadId);
  };

  const getChapterDirectorDetails = (directorId: number) => {
    return chapterDirector.find((director) => director.id === directorId);
  };

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-500">Chapter not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full bg-cover">
        <img
          src={ChapterBackgroundImg}
          alt="chapter-background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 sm:px-0">
            <h1 className="banner-title-heading1 text-lg sm:text-xl md:text-2xl lg:text-3xl">Welcome to</h1>
            <h1 className="banner-title-heading2 text-xl sm:text-2xl md:text-3xl lg:text-4xl">{chapter.title}</h1>
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="container mx-auto p-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-3xl font-bold">{chapter.title}</h2>
              <p className="text-gray-600 mt-4">{chapter.description}</p>
              <div className="mt-6">
                <h3 className="text-md font-light">Media Collection</h3>
                {chapter.images?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {chapter.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${chapter.title} ${index + 1}`}
                        className="w-48 h-48 object-cover cursor-pointer"
                        onClick={() => openModal(image)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600">
                    No Image Available
                  </div>
                )}

                <div className="mt-6">
                  <h2 className="text-xl font-bold">Chapter Director</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 flex-wrap">
                    {chapter.chapterLeads.map((leadId) => {
                      const lead = getChapterDirectorDetails(leadId);
                      return (
                        <div key={leadId} className="flex items-start">
                          {lead ? (
                            <>
                              <div className="flex flex-col justify-center items-center p-4 border-2 border-black-800 bg-white w-[250px]">
                                <img
                                  src={lead.imageUrl}
                                  alt={lead.name}
                                  className="w-24 h-24 rounded-sm object-contain"
                                />
                                <p className="text-lg font-medium mt-2">{lead.name}</p>
                              </div>
                            </>
                          ) : (
                            <p className="text-gray-500">Chapter Director not found</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>


                <div className="mt-6">
                  <h2 className="text-xl font-bold">Chapter Leads</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 flex-wrap">
                    {chapter.chapterLeads.map((leadId) => {
                      const lead = getChapterLeadDetails(leadId);
                      return (
                        <div key={leadId} className="flex items-start">
                          {lead ? (
                            <>
                              <div className="flex flex-col justify-center items-center p-4 border-2 border-black-800 bg-white w-[250px]">
                                <img
                                  src={lead.imageUrl}
                                  alt={lead.name}
                                  className="w-24 h-24 rounded-sm object-contain"
                                />
                                <p className="text-lg font-medium mt-2">{lead.name}</p>
                              </div>
                            </>
                          ) : (
                            <p className="text-gray-500">Chapter Leader not found</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg overflow-hidden max-w-2xl w-full">
            <div className="p-4 flex justify-end">
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900"
              >
                Close
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedImage || ""}
                alt="Selected"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}