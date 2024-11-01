import EventCard from './eventcard';

const events = [
  {
    id: 1,
    date: { day: '01', month: 'MAR' },
    title: 'TRUSTEE LEADERSHIP PROGRAMME – LONDON SPRING 2020',
    time: '8:00 am - 8:00 am',
    location: 'London Park'
  },
  {
    id: 2,
    date: { day: '03', month: 'MAR' },
    title: 'CHARITY MANAGEMENT DEGREE APPRENTICESHIP TASTER EVENT',
    time: '8:00 am - 8:00 am',
    location: 'London Park'
  },
  {
    id: 3,
    date: { day: '13', month: 'MAR' },
    title: 'AFVS CIC REFRESHER TRUSTEE TRAINING TRUSTEE ROLES & RESPONSIBILITIES',
    time: '1:00 pm - 1:00 pm',
    location: 'London Park'
  }
];

const EventsList = () => {
  return (
    <div 
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dfhisjy9w/image/upload/v1730445422/Image1_hnarmc.png')`,
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          {/* Left side - Image */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
            <img 
              src="https://res.cloudinary.com/dfhisjy9w/image/upload/v1730445448/Link_n0aqeh.png" 
              alt="Team meeting" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Right side - Events */}
          <div className="lg:pl-8">
            <div className="mb-8">
              <p className="text-sm font-semibold tracking-wider text-blue-400 uppercase events-heading">
                GET INVOLVED
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white events-heading">
                Upcoming Events
              </h2>
            </div>

            <div className="space-y-4">
              {events.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>

            <div className="mt-8">
              <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 hover:bg-blue-700 transition-colors uppercase text-sm font-semibold events-heading">
                View All Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsList;