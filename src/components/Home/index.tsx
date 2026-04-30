import './index.css'
import { DonationSection } from "./donationsection";
import ServiceCard from "./servicecard";
import TeamCarousel from "./team-carousel";
import Ourcompany from "./ourcompany";
import HomeGallery from "./Gallery";
import { useEffect, useState } from "react";
import { fetchBannerData } from "../../apirequest/banner";
import { fetchEvents } from "../../apirequest/events";
import { fetchHomepageData, HomepageData } from "../../apirequest/homepage";
import Carousel from './carousel/carousel';
import ProjectCarousel from './carouselcards';
import mainlogo from '../../Images/logo-main.png';


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

interface CarouselImage {
  url: string;
  title: string;
}


const Home = () => {
  const [eventData, setEventData] = useState<ContactForm[]>([]);
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [bannerImages, setBannerImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [eventsResult, homepageResult, bannersResult] = await Promise.allSettled([
          fetchEvents(),
          fetchHomepageData(),
          fetchBannerData(),
        ]);

        if (eventsResult.status === 'fulfilled') {
          setEventData(eventsResult.value.data);
        }
        if (homepageResult.status === 'fulfilled') {
          setHomepageData(homepageResult.value);
        }
        if (bannersResult.status === 'fulfilled') {
          const activeBanners = bannersResult.value.filter((banner: any) => !banner.is_deleted);
          const formattedImages = activeBanners.flatMap((banner: any) =>
            banner.images.map((image: string) => ({
              url: image,
              title: banner.heading || 'Untitled',
            }))
          );
          setBannerImages(formattedImages);
        }
      } catch (error) {
        console.error('Failed to fetch homepage data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <img
          src={mainlogo}
          alt="NAPA Logo"
          className="w-40 md:w-52 mb-6 animate-pulse"
        />
        <div className="flex space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#43529C] animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-3 h-3 rounded-full bg-[#43529C] animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-3 h-3 rounded-full bg-[#43529C] animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    );
  }


  return (
    <div>
      <div className="carousel-main-container">
        <Carousel images={bannerImages} />
      </div>
      <section className="py-4 md:py-8 bg-white">
        <Ourcompany homepageData={homepageData} />
      </section>
      <section className="py-4 md:py-8 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Events</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 md:px-8">
            {eventData?.map((x: any) => (
              <div className="flex flex-col bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 font-sans h-full">
                <div className="flex-grow">
                  <h3 className="font-bold text-xl text-gray-800 mb-3 line-clamp-2">{x?.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{x?.description}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <a href={`/event/${x?.id}`} className="inline-block">
                    <button className="flex items-center text-sm text-[#43529C] hover:text-[#32408f] font-semibold group transition-colors">
                      Read More
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 md:py-8 px-4 bg-white">
        <DonationSection />
      </section>

      <section className="py-4 md:py-10 px-4 max-w-6xl mx-auto">
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
      {/* <section className="py-8 md:py-12 px-4 ">
    <EventsList />

    </section> */}
      <section>
        <HomeGallery />
      </section>
    </div>
  )
}

export default Home;
