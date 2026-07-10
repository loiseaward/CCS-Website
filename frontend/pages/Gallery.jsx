import React from 'react';
import '../styles/index.css';
import { Header } from "../components/Header.jsx"
import { CarouselSize } from "../components/UICards.jsx"
import galleryImage from "../assets/CCSpng.png"

const placeholder = {id: 1, title: "CCS EVENT NAME", description: "some description placeholder here", imagesrc:[galleryImage, galleryImage, galleryImage, galleryImage, galleryImage]}

const GalleryCarousel = (props) => {
  return(
    <section className="mx-auto w-full max-w-2xl px-4 py-12 md:max-w-4xl lg:max-w-6xl">
      <div
        className="mb-6 flex flex-col items-start border-l-5 border-[#96211b] pl-4"
      >
          <h1 className="mb-4 text-4xl leading-none nice-font !font-normal text-[#96211b]">{props.eventinfo.title}</h1>
          <h3 className="m-0 simple-font text-[#331a11]">{props.eventinfo.description}</h3>
      </div>
      
      <div className="w-full">
          <CarouselSize imgArray={props.eventinfo.imagesrc}/>
      </div>
    </section>
  )
}

export const Gallery = () => {
  return (
    <div>
        <Header title="Picture Gallery" subtitle="Memories from the past"/>
        <GalleryCarousel key={1} eventinfo={placeholder}/>
        <GalleryCarousel key={2} eventinfo={placeholder}/>
        <GalleryCarousel key={3} eventinfo={placeholder}/>
        <GalleryCarousel key={4} eventinfo={placeholder}/>
    </div>
  );
};
