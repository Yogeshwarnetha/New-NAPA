import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const HomeGallery = () => {
  const galleryImages = [
    { url: "https://nextgennew.s3.ap-south-1.amazonaws.com/ebe9e87e342251469bb92338d884e3a0.png", title: "Modern Architecture" },
    { url: "https://nextgennew.s3.ap-south-1.amazonaws.com/e76fff8cb3ec0f77978d88c987c4c0ba.png", title: "Urban Living" },
    { url: "https://nextgennew.s3.ap-south-1.amazonaws.com/a45dd3cc8e398e639d9b469ad0edab63.png", title: "Nature Inspired" },
  ];

  const videos = [
    { url: "https://youtu.be/5whBUGgQUrY?si=33Z0WLWc54DQT_PS", title: "Featured Video", duration: "3:32" },
    { url: "https://youtu.be/oM2ceTfgsi4?si=zQOGvq5X3yk5ebBB", title: "Behind the Scenes 1", duration: "0:18" },
    { url: "https://youtu.be/BNCaG6rZHgM?si=VtYeykMzBvIb6aNs", title: "Behind the Scenes 2", duration: "1:03" },
    { url: "https://youtu.be/m6upY50Fg2I?si=3OSYPIDbySyJBNb2", title: "Behind the Scenes 3", duration: "1:36" },
  ];

  const [activeVideo, setActiveVideo] = useState(videos[0]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Gallery Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of stunning visuals that showcase our work and inspiration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-lg font-semibold">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-4">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Videos</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Watch our latest videos showcasing our projects and behind-the-scenes content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Embedded Video Player */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                src={`${activeVideo.url.replace("watch?v=", "embed/")}?autoplay=0&rel=0&modestbranding=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Video List (Without Thumbnails) */}
            <div className="space-y-4">
              {videos.map((video) => (
                <div
                  key={video.url}
                  onClick={() => setActiveVideo(video)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    activeVideo.url === video.url ? "bg-gray-700 ring-2 ring-blue-500" : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <h4 className="font-medium">{video.title}</h4>
                  <p className="text-sm text-gray-400">{video.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeGallery;
