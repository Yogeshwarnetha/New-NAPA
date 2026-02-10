import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchProjects } from '../../../apirequest/projects';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: number;
  heading: string;
  description: string;
  images: string[];
}

const ProjectCarousel: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const navigate = useNavigate();

  const getVisibleCards = useCallback(() => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }, []);

  useEffect(() => {
    setVisibleCards(getVisibleCards());
    const handleResize = () => setVisibleCards(getVisibleCards());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getVisibleCards]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetchProjects();
        setProjects(response?.data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    loadProjects();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= projects.length - (visibleCards - 1) ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? projects.length - visibleCards : prevIndex - 1
    );
  };

  const handleCardClick = (projectId: number) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="w-full py-8 md:py-10 bg-[#43529C21]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-sm uppercase tracking-wider text-indigo-600 font-semibold mb-2">
            GET UPDATED
          </h2>
          <h1 className="text-xl md:text-4xl font-bold text-gray-900">
            Projects
          </h1>
        </div>

        <div className="relative">
          <div className="flex gap-4 md:gap-6 overflow-hidden transition-transform duration-300">
            {projects
              .slice(currentIndex, currentIndex + visibleCards)
              .map((project) => (
                <div
                  key={project.id}
                  className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handleCardClick(project.id)}
                >
                  <div className="relative h-48 sm:h-56 md:h-64">
                    <img
                      src={project.images?.[0] || ''}
                      alt={project.heading}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 project-title">
                      {project.heading}
                    </h3>
                  </div>
                </div>
              ))}
          </div>

          {projects.length > visibleCards && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 lg:-translate-x-12 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 lg:translate-x-12 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
            </>
          )}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <a href='/projects'>
            <button className="w-full sm:w-auto bg-indigo-600 text-white px-6 sm:px-8 py-3 font-medium hover:bg-indigo-700 transition-colors">
              VIEW ALL PROJECTS
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;