import { Linkedin, Twitter, Facebook } from 'lucide-react';

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
}

const TeamCard = ({ name, role, image }: TeamCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-[320px]">
      <div className="mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-[300px] object-cover rounded-lg"
        />
      </div>
      <h3 className="text-[#2f327d] text-xl font-semibold text-center">
        {name}
      </h3>
      <p className="text-gray-500 text-center mt-2 text-sm">
        {role}
      </p>
      <div className="flex justify-center space-x-4 mt-4">
        <a href="#" className="text-gray-400 hover:text-[#2f327d] transition-colors">
          <Facebook className="w-5 h-5" />
        </a>
        <a href="#" className="text-gray-400 hover:text-[#2f327d] transition-colors">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="#" className="text-gray-400 hover:text-[#2f327d] transition-colors">
          <Twitter className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default TeamCard;