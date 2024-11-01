import { useState } from 'react';

export function DonationSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  return (
    <div className="bg-white py-16">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-jost leading-2">Donate Today</h2>
        <p className="text-gray-600 mb-8 donation-description">
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {['$10', '$25', '$50', '$100'].map((amount) => (
            <button
              key={amount}
              onClick={() => setSelectedAmount(Number(amount.slice(1)))}
              className={`px-6 py-2 rounded border ${
                selectedAmount === Number(amount.slice(1))
                  ? 'bg-[#4052A8] text-white border-[#4052A8]'
                  : 'border-gray-300 text-gray-700 hover:border-[#4052A8]'
              }`}
            >
              {amount}
            </button>
          ))}
          <input
            type="text"
            placeholder="Other Amount (USD)"
            className="px-4 py-2 border border-gray-300 focus:border-[#4052A8] outline-none"
          />
        </div>

        <button className="bg-[#43529C] text-white px-8 py-2 font-medium hover:bg-[#364291] transition-colors w-full sm:w-auto">
          DONATE NOW
        </button>
      </div>
    </div>
  );
}