import { ChevronLeft, ChevronRight } from "lucide-react";

const HomeGallery = () => {
  const galleryImages = [
    { url: "https://nextgennew.s3.ap-south-1.amazonaws.com/ebe9e87e342251469bb92338d884e3a0.png", title: "Modern Architecture" },
    { url: "https://nextgennew.s3.ap-south-1.amazonaws.com/e76fff8cb3ec0f77978d88c987c4c0ba.png", title: "Urban Living" },
    { url: "https://nextgennew.s3.ap-south-1.amazonaws.com/a45dd3cc8e398e639d9b469ad0edab63.png", title: "Nature Inspired" },
  ];




  return (
    <div className=" bg-gray-50">
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


    </div>
  );
};

export default HomeGallery;
