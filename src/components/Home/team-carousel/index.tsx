import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TeamCard from './teamcard';
import { fetchAdvisoryCouncilData } from '../../../apirequest/boardMember'; // Changed to fetch all data

interface TeamMember {
  id: number;
  name: string;
  imageUrl: string;
}

const TeamCarousel = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Fetch all data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchAdvisoryCouncilData(); // Get all members at once
        setTeamMembers(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
      // Reset to first card when resizing to prevent empty space
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (teamMembers.length <= visibleCount) return;
    setCurrentIndex((prevIndex) => {
      // If we're at the end, don't loop - just stay
      if (prevIndex >= teamMembers.length - visibleCount) return prevIndex;
      return prevIndex + 1;
    });
  };

  const prevSlide = () => {
    if (teamMembers.length <= visibleCount) return;
    setCurrentIndex((prevIndex) => {
      // If we're at the start, don't loop - just stay
      if (prevIndex === 0) return prevIndex;
      return prevIndex - 1;
    });
  };

  const getVisibleMembers = () => {
    if (teamMembers.length === 0) return [];
    // Don't show more members than we have
    const endIndex = Math.min(currentIndex + visibleCount, teamMembers.length);
    return teamMembers.slice(currentIndex, endIndex);
  };

  const shouldShowButtons = teamMembers.length > visibleCount;

  if (loading) {
    return (
      <div
        className="relative w-full bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dfhisjy9w/image/upload/v1730444616/image_s1trmd.png')`,
        }}
      >
        <div className="relative px-4 py-16 mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="mt-2 text-4xl font-bold text-[#ffffff]">
              Advisory Council
            </h2>
          </div>
          <div className="flex justify-center">
            <p className="text-white">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <div
        className="relative w-full bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dfhisjy9w/image/upload/v1730444616/image_s1trmd.png')`,
        }}
      >
        <div className="relative px-4 py-16 mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="mt-2 text-4xl font-bold text-[#ffffff]">
              Advisory Council
            </h2>
          </div>
          <div className="flex justify-center">
            <p className="text-white">No advisory council members found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dfhisjy9w/image/upload/v1730444616/image_s1trmd.png')`,
      }}
    >
      <div className="relative px-4 py-16 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="mt-2 text-4xl font-bold text-[#ffffff]">
            Advisory Council
          </h2>

        </div>

        <div className="relative px-4 sm:px-12">
          {shouldShowButtons && (
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center z-10 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-[#2f327d]" />
            </button>
          )}

          <div className="flex justify-center gap-8">
            {getVisibleMembers().map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role="" // You can add role to your API if needed
                image={member.imageUrl}
              />
            ))}
          </div>

          {shouldShowButtons && (
            <button
              onClick={nextSlide}
              disabled={currentIndex >= teamMembers.length - visibleCount}
              className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center z-10 ${currentIndex >= teamMembers.length - visibleCount ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-[#2f327d]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamCarousel;