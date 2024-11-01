import { Clock, MapPin } from 'lucide-react';

interface EventCardProps {
  date: {
    day: string;
    month: string;
  };
  title: string;
  time: string;
  location: string;
}

const EventCard = ({ date, title, time, location }: EventCardProps) => {
  return (
    <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-colors group">
      <div className="text-center min-w-[60px]">
        <div className="text-3xl font-bold text-white events-heading">{date.day}</div>
        <div className="text-xs text-blue-400 font-medium events-heading">{date.month}</div>
      </div>
      
      <div className="flex-1">
        <h3 className="text-white text-lg font-semibold group-hover:text-blue-400 transition-colors line-clamp-2 events-heading">
          {title}
        </h3>
        <div className="flex items-center gap-4 mt-2 text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm events-heading">{time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm events-heading">{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;