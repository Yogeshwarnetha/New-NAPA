import { Carousel } from "./carousel/carousel"
import './index.css'
import { EventCard } from './eventcard';
import { DonationSection } from "./donationsection";
import ServiceCard from "./servicecard";
import CarouselCards from "./carouselcards";
import Stats from "./stats";
import CallToAction from "./calltoaction";
import TeamCarousel from "./team-carousel";
import EventsList from "./events/eventlist";


  const services = [
    {
      title: "Matrimony",
      description: "NAPA’s Matrimony Services connect Padmashali members with a trusted platform for finding compatible life partners. With culturally aligned profiles and privacy-focused features, we make matchmaking secure and meaningful.",
      image: 'https://img.freepik.com/free-photo/affectionate-indian-couple-celebrating-propose-day-together_23-2151111012.jpg?t=st=1730441251~exp=1730444851~hmac=64aee5f54413341280834f43f9abee505c50772df2fdb5cc53d8e64867449a25&w=1380',
      imageAlt: "Matrimony Service"
    },
    {
      title: "Donations",
      description: "NAPA’s Donation Services empower members to support community initiatives like cultural preservation, education, and welfare programs. Every contribution helps uplift and strengthen the Padmashali community across North America.",
      image: "https://img.freepik.com/free-photo/close-up-volunteers-with-box_23-2149182045.jpg?t=st=1730441558~exp=1730445158~hmac=77dfe0d9365803952ac3ad1712397db08cc27fe1dd0b3711551b5897de5af9aa&w=1380",
      imageAlt: "Donations Service"
    }
  ];

const Home = () => {
  return (
    <div>
        <div className="carousel-main-container">
        <Carousel/>
        </div>
        <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Events</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <EventCard
              location="Annual Padmashali Cultural Fest"
              description="A vibrant celebration of Padmashali heritage, featuring traditional dances, musical performances, and regional arts. This event brings families together from across North America to honor and preserve our cultural roots."
              // icon={<Sprout className="w-full h-full" />}
            />
            
            <EventCard
              location="Youth Leadership Summit"
              description="A platform for young Padmashalis to develop leadership skills, network, and gain mentorship from established community leaders. Through workshops, talks, and collaborative activities, youth are empowered to lead within the Padmashali community and beyond."
              // icon={<Leaf className="w-full h-full" />}
            />
            
            <EventCard
              location="Padmashali Family Picnic & Sports"
              description="A fun-filled day for all ages with activities like cricket, tug-of-war, and a variety of games. This event is designed to strengthen bonds among Padmashali families, fostering unity and camaraderie in a relaxed outdoor setting."
              // icon={<Bird className="w-full h-full" />}
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <DonationSection/>
       </section>

       <section className="py-16 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16 services-card-main-heading">Our Services</h1>
      <div className="space-y-12">
        {services.map((service:any, index) => (
          <ServiceCard
            key={service.title}
            {...service}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
    <section>
    <CarouselCards/>
    </section>
    <section>
    <Stats />
    <CallToAction />
    </section>
    <section>
      <TeamCarousel/>
    </section>
    <section className="py-12 px-4 ">
    <EventsList />

    </section>
    </div>
  )
}

export default Home;
