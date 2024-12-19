import { useState } from 'react';
import { X, Play } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  videoUrl: string; // Full YouTube URL
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Beautiful Sunset Time Lapse',
    videoUrl: 'https://www.youtube.com/watch?v=668nUCeBHyY' // Full YouTube URL
  },
  {
    id: '2',
    title: 'Mountain Climbing Adventure',
    videoUrl: 'https://www.youtube.com/watch?v=2JYpz-wZ6kw'
  },
  {
    id: '3',
    title: 'Ocean Waves Relaxation',
    videoUrl: 'https://www.youtube.com/watch?v=WHPEKLQID4U'
  },
  {
    id: '4',
    title: 'Northern Lights in Norway',
    videoUrl: 'https://www.youtube.com/watch?v=izYiDDt6d8s'
  },
  {
    id: '5',
    title: 'Wildlife Documentary',
    videoUrl: 'https://www.youtube.com/watch?v=35RG-FyfUxg'
  },
  {
    id: '6',
    title: 'Space Exploration',
    videoUrl: 'https://www.youtube.com/watch?v=GoW8Tf7hTGA'
  }
];

// Function to extract videoId from YouTube URL
const getVideoIdFromUrl = (url: string) => {
  const regex = /(?:youtube\.com\/(?:[^/]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-32">
      {/* Video Grid */}
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Video Gallery
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => {
            const videoId = getVideoIdFromUrl(video.videoUrl);
            const thumbnailUrl = videoId
              ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
              : ''; // Generate the thumbnail URL

            return (
              <div
                key={video.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
                  <img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <Play
                    size={48}
                    className="text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold line-clamp-2">{video.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-xl shadow-xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
            >
              <X size={24} />
            </button>
            {/* YouTube Video Embed */}
            <iframe
              width="100%"
              height="400"
              src={selectedVideo.videoUrl.replace('watch?v=', 'embed/')} // Convert YouTube URL to embed URL
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-2xl"
            ></iframe>
            <h3 className="text-black text-2xl font-semibold mt-4 text-center">
              {selectedVideo.title}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoGallery;
