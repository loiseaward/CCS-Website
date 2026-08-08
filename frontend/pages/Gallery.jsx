import React from 'react';
import '../styles/index.css';
import { Header } from "../components/Header.jsx"
import { CarouselSize } from "../components/UICards.jsx"

const GalleryPics = import.meta.glob("../assets/*/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default"
});


const groupByEvent = {};
for (const path in GalleryPics) {
  const match = path.match(/assets\/([^/]+)\//);
  const eventSlug = match[1];

  if (!groupByEvent[eventSlug]) {
    groupByEvent[eventSlug] = [];
  }
  groupByEvent[eventSlug].push(GalleryPics[path]);
}

const EVENTS = [
  {
    slug: "asian allure 2025",
    title: "Asian Allure 2025",
    description: "Asian American Association (AAA) hosts an anual Asian showcase, which CCS has a segment!",
  },
  {
    slug: "chicago trip",
    title: "Spring Chicago Trip 2026",
    description: "Every spring, CCS goes on a trip to Chinatown for a taste of home!",
  },
  {
    slug: "dumpling",
    title: "Dumpling Night",
    description: "Come help fold and cook (and taste) some dumplings!",
  },
  {
  slug: "frep",
  title: "FREP Event 2026",
  description: "Our beloved FREPs host their own event every year!",
  },
  {
    slug: "game night",
    title: "Weekly Game Night",
    description: "Pull up to game nights for a fun evening of Mahjong and snacks!",
  },
  {
    slug: "hotpot",
    title: "Spring Hotpot",
    description: "Fight those winter blues with friends and a steaming bowl of hotpot!",
  },
  {
    slug: "jammies",
    title: "Jammies 'n Jammies",
    description: "Rock your jammies and sing your socks off at karaoke!",
  },
  {
    slug: "matchmaker",
    title: "LNY Matchmaker Formal 2026",
    description: "Meet your 'red string' at the Lunar New Year Formal!",
  },
  {
    slug: "moonwalk",
    title: "Mid-Autumn Moonwalk",
    description: "Enjoy a solemn night of storytelling and a walk around the lake with mooncakes to celebrate the Mid-Autumn Festival!",
  },
];

const GalleryCarousel = ({eventinfo}) => {
  return(
    <section className="mx-auto w-full max-w-2xl px-4 py-12 md:max-w-4xl lg:max-w-6xl">
      <div
        className="mb-6 flex flex-col items-start border-l-5 border-[#96211b] pl-4"
      >
          <h1 className="mb-4 text-4xl leading-none nice-font !font-normal text-[#96211b]">
            {eventinfo.title}
            </h1>
          <h3 className="m-0 simple-font text-[#331a11]">
            {eventinfo.description}
            </h3>
      </div>
      
      <div className="w-full">
          <CarouselSize imgArray={eventinfo.imagesrc}/>
      </div>
    </section>
  )
}

export const Gallery = () => {
  return (
    <div>
        <Header title="Picture Gallery" subtitle="Memories from the past"/>
        <section className="mx-auto w-full max-w-2xl px-4 py-12 md:max-w-4xl lg:max-w-6xl">
          <p className='!text-[#3c201b] !font-medium nice-font leading-loose indent-8 text-xl'>
            CCS holds a variety of events throughout the school year, ranging from weekly game nights to our annual performances and showcases. 
            These events are open to 
            anyone and everyone! Take a look at the different events we have hosted throughout the years! 
          </p>
        </section>
        <hr className='gradient-line'/>

        {EVENTS.map((event) => (
          <GalleryCarousel
            key={event.slug}
            eventinfo={{
              ...event,
              imagesrc: groupByEvent[event.slug] || [],
            }}
          />
        ))}
    </div>
  );
};
