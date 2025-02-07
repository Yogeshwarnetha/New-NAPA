
const chapters = [
  {
    id: 1,
    title: "Getting Started with Web Development",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript in this comprehensive introduction to web development.",
    author: "Sarah Chen",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    description: "Deep dive into advanced React concepts including hooks, context, and performance optimization techniques.",
    author: "Michael Torres",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    title: "Building Scalable APIs",
    description: "Master the art of creating robust and scalable backend APIs using modern best practices.",
    author: "Alex Johnson",
  
    coverImage: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&q=80&w=1000"
  }
];

const ChapterList = () =>  {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              NAPA Chapters
            </h1>
          </div>
            <p className='flex justify-center items-center mt-2 text-sm text-gray-600'>Please reach out to Mr. Santosh Vellore or Mr. Ravi Ellendula for contact details of chapter leads in any chapter from the below list.</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex">
                {/* Chapter Image */}
                <div className="w-48 h-48 flex-shrink-0">
                  <img 
                    src={chapter.coverImage} 
                    alt={chapter.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Chapter Content */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 cursor-pointer">
                        {chapter.title}
                      </h2>
                      <p className="mt-1 text-sm text-gray-600">by {chapter.author}</p>
                    </div>
                  </div>

                  <p className="mt-3 text-gray-700">
                    {chapter.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ChapterList;