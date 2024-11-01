import React from 'react';
import { Project } from './types';

interface CarouselCardProps {
  project: Project;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ project }) => {
  return (
    <div className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105">
      <div className="relative h-48 sm:h-56 md:h-64">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 sm:p-6">
        <p className="text-sm text-indigo-600 mb-2 project-title-date">{project.date}</p>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 project-title">
          {project.title}
        </h3>
      </div>
    </div>
  );
};

export default CarouselCard;