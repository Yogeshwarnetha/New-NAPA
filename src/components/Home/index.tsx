import { Carousel } from "./carousel/carousel"
import './index.css'
import { EventCard } from './eventcard';
import { DonationSection } from "./donationsection";
import ServiceCard from "./servicecard";
import CarouselCards from "./carouselcards";
// import Stats from "./stats";
// import CallToAction from "./calltoaction";
import TeamCarousel from "./team-carousel";
// import EventsList from "./events/eventlist";
import Ourcompany from "./ourcompany";
import ExecutiveCommittee from "./team-carousel/ExecutiveCommittee";
import HomeGallery from "./Gallery";


  const services = [
    {
      title: "Matrimony",
      description: "NAPA’s Matrimony Services connect Padmashali members with a trusted platform for finding compatible life partners. With culturally aligned profiles and privacy-focused features, we make matchmaking secure and meaningful.",
      // image: 'https://nextgennew.s3.ap-south-1.amazonaws.com/banners/closeup-hands-with-henna-tattoos-indian-traditional-wedding-ceremony-kanyadan-ritual.jpg',
      imageAlt: "Matrimony Service"
    }
  ];

const Home = () => {
  return (
    <div>
        <div className="carousel-main-container">
        <Carousel/>
        </div>
        <section className="py-16 px-4 bg-white">
        <Ourcompany/>
        </section>
        <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Events</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <EventCard
              location="NAPA BOD Meeting at Austin"
              description="The North American Padmashali Association (NAPA) Board of Directors Meeting will be held on February 8, 2025, from 10 AM to 5 PM CST at Doubletree Austin Northwest Arboretum."
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
    {/* <Stats /> */}
    {/* <CallToAction /> */}
    </section>
    <section>
      <TeamCarousel/>
      <ExecutiveCommittee/>
    </section>
    {/* <section className="py-12 px-4 ">
    <EventsList />

    </section> */}
    <section>
      <HomeGallery/>
    </section>
    </div>
  )
}

export default Home;
