import React from 'react';
import '../styles/index.css';
import dragonBg from "../assets/dragon.png";
import aboutLogo from "../assets/aboutLogo.jpg";
import { MainCard, FAQAccordian } from "../components/UICards.jsx"
import galleryImage1 from "../assets/matchmaker/DSC01629.jpeg"
import galleryImage2 from "../assets/chicago trip/IMG_8615.jpg"
import galleryImage3 from "../assets/hotpot/IMG_4059.jpg"


const HomeCards = [
    {id:1, imagesrc: galleryImage1, title: "LNY Matchmaker Formal", description: "Celebrate the Lunar New Year with the CCS Family"},
    {id:2, imagesrc: galleryImage2, title: "Chicago Trip", description: "A taste of China in the annual Chicago trip"},
    {id:3, imagesrc: galleryImage3, title: "Hotpot Nights", description: "Warm your bellies with hotpot nights"}]

const WWDCards = () => {
  return(
      <div className="flex justify-center gap-8">
          { HomeCards.map((card) => (
          <MainCard key={card.id} imagesrc={card.imagesrc} title={card.title} description={card.description}/>
          ))}
      </div>
  )

}

export function Home () {
  return (
    <>
    <section>
    <div className="semi-transparent-main relative flex flex-col justify-center items-start gap-5 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center animate-zoom-in"
        style={{ backgroundImage: `url(${dragonBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/60 to-black/20 z-10"></div>
        <div className="relative z-20 flex flex-col justify-center ml-15">
          <h2 className="text-[#bd802b] subtitles"> EST. 2019 -- UNIVERSITY OF NOTRE DAME</h2>
          <h1 className="main-title">Chinese Culture Society</h1>
          <h2 className="text-[#bd802b] subtitles"> Celebrating heritage, culture, and community</h2>
      </div>
    </div>
    <div className="relative bg-[#96211b] h-6 overflow-hidden w-full"></div>
    </section>

    <section className="m-10 p-20 bg-[#f2e8d5] h-auto">
      <hr className="gradient-line" />
      <h2 className="p-4 text-center headers">🏮 About CCS ND 🏮</h2>
      <div className="about-section">
        <div>
        <p className="about-copy">"The Chinese Culture Society at the University of Notre Dame has served as a
          home away from home for its students since its establishment in 2019. The organisation seeks to bring together
          those with roots or passion for Chinese heritage. We also warmly welcome those who are curious to learn
          more about it through the events we host throughout the year which blends tradition with our ND community! Open to 
          students of every background, we are a welcoming space to celebrate culture, construct lasting friendships,
          and create long-lasting memories on campus."</p>
          <br/>
        <p className="about-quote"> <i>“有福同享, 有难同当。”</i>  - 李伯元</p>
        <p className="about-copy !text-[#6f412a]"> <i>"Share the happiness, share the hardships."</i> - Boyuan Li</p>
        </div>
        <div className="fancy-box transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:border-[#c9a227]">
          <img src={aboutLogo} alt="CCS ND logo" className="about-image"/>
        </div>
      </div>
    </section>

    <section className="m-10 p-20 bg-[#ede0c4] h-auto">
      <hr className="gradient-line" />
      <h2 className="m-5 p-10 text-center headers !text-2xl"> ⎯◆ What We Do ◆⎯ </h2>
      <div>
        <WWDCards/>
      </div>
    </section>

    <section className="m-10 p-20 bg-[#f2e8d5] h-auto">
      <hr className="gradient-line" />
      <h2 className=" mt-5 p-10 text-center headers !text-2xl"> ⎯◇ Frequently Asked Questions ◇⎯</h2>
      <div>
        <FAQAccordian/>
      </div>
    </section>
    </>
  );
};