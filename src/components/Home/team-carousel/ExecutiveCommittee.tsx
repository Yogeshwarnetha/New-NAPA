import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TeamCard from './teamcard';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
 
  {
    id: 1,
    name: "Srinivas Sayini",
    role: "President",
    image: "https://res.cloudinary.com/dfhisjy9w/image/upload/v1730447036/Screenshot_20241017_174331_Gallery_i6wbxm.jpg",
  },
  {
    id: 2,
    name: "Prabhakar Konda",
    role: "President Elect",
    image: "https://res.cloudinary.com/dfhisjy9w/image/upload/v1730447035/Screenshot_20241017_172722_Gallery_rqlqpd.jpg",
  },
  {
    id: 3,
    name: "Sri Cherupally",
    role: "General Secretary",
    image: "https://res.cloudinary.com/dfhisjy9w/image/upload/v1730447035/Screenshot_20241017_112149_Gallery_ig9goc.jpg",
  },
  {
    id: 4,
    name: "Santhosh Ankam",
    role: "Joint Secretary",
    image: "https://res.cloudinary.com/dfhisjy9w/image/upload/v1739026351/sa_h5htjw.png",
  },
  {
    id: 5,
    name: "Mallik Ganji",
    role: "Treasurer",
    image: "https://res.cloudinary.com/dfhisjy9w/image/upload/v1739026351/mg_ldytpn.png",
  },
  {
    id: 6,
    name: "Jyothi Karnati",
    role: "Joint Treasurer",
    image: "https://res.cloudinary.com/dfhisjy9w/image/upload/v1730447036/Screenshot_20241017_215832_Gallery_qzcxy2.jpg",
  },
  {
    id: 7,
    name: "Vijay Gaddam",
    role: "International Coordinator",
    image: "https://res.cloudinary.com/dfhisjy9w/image/upload/v1739026351/VG_l6jdkx.png",
  },
  {
    id: 8,
    name: "Dr.Naveen Jonnalagadda",
    role: "Past President Ex-Officio",
    image: "https://res.cloudinary.com/dfhisjy9w/image/upload/v1739026350/Naveen_Jonnalagadda_safvml.png",
  },
  // {
  //   id: 9,
  //   name: "Raj Siripuram",
  //   role: "Executive Member",
  //   image: "https://res.cloudinary.com/dfhisjy9w/image/upload/v1730447035/Screenshot_20241017_172722_Gallery_rqlqpd.jpg",
  // },
];

const ExecutiveCommittee = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setVisibleCount(3);
      else if (window.innerWidth >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % teamMembers.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  const getVisibleMembers = () => {
    const members = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % teamMembers.length;
      members.push(teamMembers[index]);
    }
    return members;
  };

  return (
    <div 
      className="relative w-full bg-cover bg-center bg-no-repeat bg-fixed py-12"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dfhisjy9w/image/upload/v1730444616/image_s1trmd.png')`,
      }}
    >
      <div className="relative px-4 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-wider text-[transparent] uppercase">
            ALL VOLUNTEERS
          </p>
          <h2 className="mt-4 text-4xl font-bold text-[#ffffff]">
          Executive Committee
          </h2>
        </div>

        <div className="relative px-12">
          
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-[#2f327d]" />
          </button>

          <div className="flex justify-center gap-8">
            {getVisibleMembers().map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                role={member.role}
                image={member.image}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-[#2f327d]" />
          </button>
        </div>

        {/* <div className="text-center mt-8">
          <button className="text-[#2f327d] font-medium hover:text-blue-700 transition-colors">
            VIEW ALL
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ExecutiveCommittee;