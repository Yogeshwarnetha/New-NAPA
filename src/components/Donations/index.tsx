import { useState } from 'react';

const Donations = () => {
  // State for each cause's donation amount
  const [general, setGeneral] = useState(0);
  const [weavers, setWeavers] = useState(0);
  const [women, setWomen] = useState(0);
  const [convention, setConvention] = useState(0);
  const [scholarships, setScholarships] = useState(0);

  // Calculate total
  const total = general + weavers + women + convention + scholarships;

  // Handle amount change for a specific cause
  const handleAmountChange = (cause: string, value: string | number) => {
    const numValue = value === '' ? 0 : parseFloat(typeof value === 'string' ? value : value.toString());
    if (isNaN(numValue)) return;
    
    switch(cause) {
      case 'general': setGeneral(numValue); break;
      case 'weavers': setWeavers(numValue); break;
      case 'women': setWomen(numValue); break;
      case 'convention': setConvention(numValue); break;
      case 'scholarships': setScholarships(numValue); break;
      default: break;
    }
  };

  // Handle donation submission - redirect to Square with total amount
  const handleDonate = () => {
    if (total === 0) {
      alert('Please enter a donation amount for at least one cause.');
      return;
    }

    // Square checkout URL with amount parameter
    // Square accepts 'amount' as a query parameter to pre-fill the amount
    const squareUrl = `https://checkout.square.site/merchant/XQQYWZ0XCSB8B/checkout/DT7LDQF2CO5RPLHPRXHDHYIH?amount=${total.toFixed(2)}`;
    
    // Open in same tab (or use '_blank' for new tab)
    window.location.href = squareUrl;
  };

  // Individual cause card component
  interface CauseCardProps {
    title: string;
    description: string;
    amount: number;
    onAmountChange: (value: string | number) => void;
  }

  const CauseCard = ({ title, description, amount, onAmountChange }: CauseCardProps) => (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium">$</span>
          <input
            type="number"
            min="0"
            step="1"
            value={amount === 0 ? '' : amount}
            onChange={(e) => onAmountChange(e.target.value)}
            placeholder="0"
            className="w-24 p-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

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
                <h2 className="text-3xl font-bold text-gray-900 mb-4 font-jost">
                  Donate Today
                </h2>
                <p className="text-gray-600 mb-8 donation-description">
                  Support NAPA's mission to uplift our community! Your donation funds cultural programs, 
                  scholarships, and welfare initiatives. Every gift makes a difference—join us in empowering 
                  our future!
                </p>
              </div>
            </div>

            {/* Multi-Cause Donation Form */}
            <div className="max-w-2xl mx-auto mt-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Distribute your contribution across the causes below.
                </h3>
                
                <CauseCard
                  title="General Donations"
                  description="For immediate emergency support"
                  amount={general}
                  onAmountChange={(val: string | number) => handleAmountChange('general', val)}
                />
                
                <CauseCard
                  title="Save the Weavers"
                  description="Because every weaver's life matters — your donation restores livelihoods and preserves tradition."
                  amount={weavers}
                  onAmountChange={(val: string | number) => handleAmountChange('weavers', val)}
                />
                
                <CauseCard
                  title="Women Empowerment"
                  description="Providing sewing machines ($100 each) helps weaver women gain skills, opportunity, and long-term self-reliance."
                  amount={women}
                  onAmountChange={(val: string | number) => handleAmountChange('women', val)}
                />
                
                <CauseCard
                  title="Convention 2026"
                  description="Annual Convention 2026 unites voices—bringing leaders and communities together to inspire action and create lasting change."
                  amount={convention}
                  onAmountChange={(val: string | number) => handleAmountChange('convention', val)}
                />
                
                <CauseCard
                  title="Student Scholarships"
                  description="Empowering deserving students with financial support to pursue their education and dreams."
                  amount={scholarships}
                  onAmountChange={(val: string | number) => handleAmountChange('scholarships', val)}
                />

                {/* Important note about Square checkout limitations */}
                <div className="mt-2 mb-4 p-3 bg-blue-50 rounded-md border border-blue-200">
                  <p className="text-sm text-blue-700">
                    ℹ️ Your total will be sent to our secure checkout. After payment, please email us at <strong>donations@napausa.org</strong> with your cause preferences.
                  </p>
                </div>

                {/* Total and Donate Button */}
                <div className="mt-6 pt-4 border-t border-gray-300">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleDonate}
                    className="w-full bg-blue-600 text-white px-8 py-3 font-medium hover:bg-[#364291] transition-colors rounded-md text-lg"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Unallocated: $0.00
                  </p>
                </div>
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