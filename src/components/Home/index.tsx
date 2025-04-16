import './index.css'
import { DonationSection } from "./donationsection";
import ServiceCard from "./servicecard";
import TeamCarousel from "./team-carousel";
import Ourcompany from "./ourcompany";
import HomeGallery from "./Gallery";
import { useEffect, useState } from "react";
import { fetchEvents } from "../../apirequest/events";
import Carousel from './carousel/carousel';
import ProjectCarousel from './carouselcards';


const services = [
  {
    title: "Matrimony",
    description: "NAPA’s Matrimony Services connect Padmashali members with a trusted platform for finding compatible life partners. With culturally aligned profiles and privacy-focused features, we make matchmaking secure and meaningful.",
    // image: 'https://nextgennew.s3.ap-south-1.amazonaws.com/banners/closeup-hands-with-henna-tattoos-indian-traditional-wedding-ceremony-kanyadan-ritual.jpg',
    imageAlt: "Matrimony Service"
  }
];

interface ContactForm {
  id: string;
  name: string;
  description: string;
}


const Home = () => {
  const [eventData, setEventData] = useState<ContactForm[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEvents();
        setEventData(data.data);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div>
      <div className="carousel-main-container">
        <Carousel />
      </div>
      <section className="py-8 bg-white">
        <Ourcompany />
      </section>
      <section className="py-8 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Events</h2>

          <div className="grid md:grid-cols-3 gap-12">
            {eventData?.map((x: any) => (
              <div className="flex items-start gap-4 font-sans">
                <div>
                  <h3 className="font-semibold text-xl text-gray-800 mb-2">{x?.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{x?.description}</p>
                  <a href={`/event/${x?.id}`}>
                    <button className="text-sm text-indigo-600 hover:text-purple-700 font-medium">
                      Read More
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-white">
        <DonationSection />
      </section>

      <section className="py-10 px-4 max-w-6xl mx-auto">
        <p className="text-3xl md:text-3xl font-bold text-center text-gray-800 mb-16 services-card-main-heading">Our Services</p>
        <div className="space-y-12">
          {services.map((service: any, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </section>
      <section>
        <ProjectCarousel />
      </section>
      <section>
        {/* <Stats /> */}
        {/* <CallToAction /> */}
      </section>
      <section>
        <TeamCarousel />
        {/* <ExecutiveCommittee /> */}
      </section>
      {/* <section className="py-12 px-4 ">
    <EventsList />

    </section> */}
      <section>
        <HomeGallery />
      </section>
    </div>
  )
}

export default Home;
