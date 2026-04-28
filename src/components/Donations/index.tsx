
const Donations = () => {




  const renderCommentForm = () => (
    <div className="max-w-2xl mx-auto py-8 border-t border-gray-200 mt-8">
      <h2 className="text-2xl font-bold mb-8">LEAVE A REPLY</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name*"
            className="p-2 border rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Email*"
            className="p-2 border rounded-md"
            required
          />
        </div>
        <textarea
          placeholder="Comment"
          className="w-full p-2 border rounded-md"
          rows={4}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-2 font-medium hover:bg-[#364291] transition-colors w-full sm:w-auto inline-block"
        >
          POST COMMENT
        </button>
      </form>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="p-6">
            <div className="bg-white py-4">
              <div className="max-w-2xl mx-auto text-center px-4">
                 <a href="https://donations.napausa.org/" target="_blank" rel="noopener noreferrer">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 font-jost">
                  Donate Today
                </h2>
                 </a>
               
                <p className="text-gray-600 mb-8 donation-description">
                  Support NAPA's mission to uplift our community! Your donation funds cultural programs, 
                  scholarships, and welfare initiatives. Every gift makes a difference—join us in empowering 
                  our future!
                </p>
              </div>
            </div>

          
          </div>
        </div>
        
        {/* Comment Form */}
        {renderCommentForm()}
      </div>
    </div>
  );
};

export default Donations;