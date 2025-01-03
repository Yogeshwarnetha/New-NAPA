import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Community Health Initiative",
    date: "APRIL 9, 2023",
    description: "Providing healthcare services to underserved communities",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 2,
    title: "Education for All",
    date: "MARCH 15, 2023",
    description: "Supporting underprivileged students with quality education",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 3,
    title: "Environmental Conservation",
    date: "FEBRUARY 28, 2023",
    description: "Protecting local ecosystems and wildlife habitats",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 4,
    title: "Youth Empowerment Program",
    date: "JANUARY 20, 2023",
    description: "Developing leadership skills in young adults",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 5,
    title: "Clean Water Initiative",
    date: "DECEMBER 10, 2022",
    description: "Providing access to clean drinking water in rural areas",
    image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 6,
    title: "Women's Empowerment",
    date: "NOVEMBER 5, 2022",
    description: "Supporting women entrepreneurs and skill development",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=2000",
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleBackClick = () => {
    setSelectedProject(null);
  };

  const recentProjects = projects
    .filter((project) => project.id !== selectedProject?.id) // Exclude selected project
    .slice(0, 4); // Limit to 4 recent projects

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {selectedProject ? (
        <div className="flex flex-col lg:flex-row lg:gap-0 py-16 px-6 lg:px-8">
          {/* Left Side: Selected Project */}
          <div className="lg:w-3/4 bg-[#f9fafb] rounded-lg overflow-hidden">
            <button
              onClick={handleBackClick}
              className="p-4 text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Projects
            </button>
            <div className="relative h-72 lg:h-[450px]">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <p className="text-sm text-indigo-600 mb-2">{selectedProject.date}</p>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedProject.title}
              </h1>
              <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
            </div>
          </div>

          {/* Right Side: Recent Projects */}
          <div className="lg:w-1/4 bg-[#f9fafb] rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Projects</h2>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow hover:shadow-md p-4 flex items-center gap-4 cursor-pointer transition"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{project.title}</p>
                    <p className="text-xs text-gray-500">{project.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-16 px-6 lg:px-8 sm:py-2">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Projects</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 cursor-pointer"
                >
                  <div className="relative h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-indigo-600 mb-2">{project.date}</p>
                    <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
