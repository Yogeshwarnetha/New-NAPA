import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { fetchProjects } from '../../apirequest/projects'; // Adjust import path as needed

interface Project {
    id: number;
    images: string[];
    heading: string;
    description: string;
    createdAt: string;
}

const ProjectDetailPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProjectData = async () => {
            try {
                setLoading(true);
                const response = await fetchProjects();

                if (!response?.data) {
                    throw new Error('No data received');
                }

                setProjects(response.data);

                const foundProject = response.data.find((p: any) => p.id === Number(id));
                if (!foundProject) {
                    throw new Error('Project not found');
                }

                setSelectedProject(foundProject);
                setError(null);
            } catch (error) {
                console.error('Error fetching project details:', error);
                setError(error instanceof Error ? error.message : 'Failed to load project');
                setSelectedProject(null);
            } finally {
                setLoading(false);
            }
        };

        loadProjectData();
    }, [id]);

    const handleBack = () => navigate('/projects');
    const handleSelect = (project: Project) => navigate(`/project/${project.id}`);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-16 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-red-500">{error}</p>
                    <button
                        onClick={handleBack}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    if (!selectedProject) {
        return (
            <div className="py-16 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-gray-500">Project not found</p>
                    <button
                        onClick={handleBack}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row py-16 px-6 lg:px-8 gap-6">
            {/* Main Project Info */}
            <div className="lg:w-3/4 bg-white rounded-lg shadow-md overflow-hidden">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 p-4 text-indigo-600 hover:text-indigo-800"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Projects
                </button>
                <div className="h-72 lg:h-[450px]">
                    <img
                        src={selectedProject.images[0] || '/placeholder-image.jpg'}
                        alt={selectedProject.heading}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                        }}
                    />
                </div>
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedProject.heading}</h1>
                    <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
                </div>
            </div>

            {/* Related Projects */}
            <div className="lg:w-1/4 bg-white rounded-lg shadow-md p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Projects</h2>
                <div className="space-y-4">
                    {projects
                        .filter((p) => p.id !== selectedProject.id)
                        .slice(0, 4) // Limit to 4 related projects
                        .map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleSelect(item)}
                                className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-100 rounded-md transition"
                            >
                                <div className="w-16 h-16">
                                    <img
                                        src={item.images[0] || '/placeholder-image.jpg'}
                                        alt={item.heading}
                                        className="w-full h-full object-cover rounded-md"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                                        }}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.heading}</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailPage;