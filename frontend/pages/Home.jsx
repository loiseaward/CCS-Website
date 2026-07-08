import React from 'react';
import '../styles/index.css';

export const Home = () => {
  return (
    <>
    <section>
    <div className="semi-transparent-main relative flex flex-col justify-center items-start gap-5">
      <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/60 to-black/20 z-10"></div>
        <div className="relative z-20 flex flex-col justify-center ml-15">
          <h2 className="text-[#bd802b] subtitles"> EST. 2019 -- UNIVERSITY OF NOTRE DAME</h2>
          <h1 className="main-title">Chinese Culture Society</h1>
          <h2 className="text-[#bd802b] subtitles"> Celebrating heritage, culture, and community</h2>
      </div>
    </div>
    <div className="relative bg-[#96211b] h-6 overflow-hidden w-full wavy"></div>
    </section>

    <section className="margin-10 p-20 bg-[#f2e8d5] h-auto">
      <hr className="gradient-line" />
      <h2 className="p-4 text-center headers">🏮 About CCS ND 🏮</h2>
      <div className="about-section">
        <div>
        <p className="about-copy">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
          et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
          <br/>
        <p className="about-copy !text-[#6f412a]">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
          et dolore magna aliqua. Ut enim ad minim veniam,</p>
        </div>
        <img src="../assets/logo.jpeg" alt="CCS ND logo" className="about-image"/>
      </div>
    </section>

    <section className="margin-10 p-20 bg-[#ede0c4] h-auto">
      <hr className="gradient-line" />
      <h2 className="p-4 text-center headers !text-2xl"> What We Do </h2>
      <div>
      </div>
    </section>

    <section className="margin-10 p-20 bg-[#f2e8d5] h-auto">
      <hr className="gradient-line" />
      <h2 className="p-4 text-center headers !text-2xl"> FAQ </h2>
      <div>
      </div>
    </section>
    </>
  );
};
