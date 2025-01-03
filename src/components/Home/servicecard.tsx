import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, image, imageAlt, reverse = false }) => {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 mb-16 items-center`}>
      <div className="w-full md:w-1/2">
        <img 
          src={image} 
          alt={imageAlt}
          className="w-full h-auto rounded-lg shadow-lg object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-3xl font-bold text-[#47478f] service-card-heading">{title}</h2>
        <p className="text-gray-600 leading-relaxed service-card-description">{description}</p>

        <button className='bg-[#43529C] text-white px-6 py-2 font-medium hover:bg-[#32408f] transition-colors'>Learn More</button>
      </div>
    </div>
  );
}

export default ServiceCard;