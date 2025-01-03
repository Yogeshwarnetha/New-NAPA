
interface EventCardProps {
  location: string;
  description: string;
//   icon: React.ReactNode;
}

export function EventCard({ location, description}: EventCardProps) {
  return (
    <div className="flex items-start gap-4 font-sans">
      {/* <div className="w-12 h-12 text-emerald-500 flex-shrink-0">
        {icon}
      </div> */}
      <div>
        <h3 className="font-semibold text-xl text-gray-800 mb-2">{location}</h3>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        <button className="text-sm text-indigo-600 hover:text-purple-700 font-medium">
          Read More
        </button>
      </div>
    </div>
  );
}