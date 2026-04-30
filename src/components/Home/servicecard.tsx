import React from 'react';
import MatrimonyImage from '../../Images/Materimony.jpg'

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageAlt, reverse = false }) => {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-4 md:gap-8 mb-16 items-center`}>
      <div className="w-full md:w-1/2">
        <img 
          src={MatrimonyImage} 
          alt={imageAlt}
          className="w-full h-auto rounded-xl shadow-md object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#47478f] service-card-heading">{title}</h2>
        <p className="text-gray-600 leading-relaxed service-card-description text-sm md:text-base">{description}</p>

        <button className='bg-[#43529C] text-white px-6 py-3 md:py-2 rounded-lg font-medium hover:bg-[#32408f] transition-colors w-full sm:w-auto shadow-sm hover:shadow'>Learn More</button>
      </div>
    </div>
  );
}

export default ServiceCard;