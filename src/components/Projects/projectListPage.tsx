import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../../apirequest/projects';

interface Project {
    id: number;
    images: string[];
    heading: string;
    description: string;
    createdAt: string;
}

const ProjectListPage: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);
                const response = await fetchProjects();

                if (response?.data) {
                    setProjects(response.data);
                    setError(null);
                } else {
                    throw new Error('No data received');
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
                setError('Failed to load projects. Please try again later.');
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    const handleSelect = (project: Project) => {
        navigate(`/project/${project.id}`);
    };

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
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="py-16 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Projects</h1>
                {projects.length === 0 ? (
                    <p className="text-center text-gray-500">No projects found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                onClick={() => handleSelect(project)}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg cursor-pointer transition transform hover:scale-105"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={project.images[0] || '/placeholder-image.jpg'}
                                        alt={project.heading}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                                        }}
                                    />
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-indigo-600 mb-1">
                                        {new Date(project.createdAt).toLocaleDateString()}
                                    </p>
                                    <h2 className="text-lg font-semibold text-gray-800">{project.heading}</h2>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectListPage;