import React from "react";
import '../styles/index.css';
import bg from "../assets/headerbackground.jpg"

export const Header = (props) => {
    
    return(
        <section>
            <div className="h-90 md:h-70 relative flex flex-col justify-center items-center bg-[#84211b] header-bottom">
               <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/60 to-black/20 z-10"></div>
               <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', opacity: 0.4}} ></div>
                <div className="relative flex flex-col justify-center items-center z-10">
                  <h2 className="text-[#D4AF37] subtitles !text-base !font-light leading-none"> Chinese Culture Society </h2>
                  <h1 className="main-title text-center !text-8xl leading-none -mt-3">{props.title}</h1>
                  <h2 className="text-[#D4AF37] subtitles !text-base !font-light !p-2 !"> {`⎯⎯ ${props.subtitle} ⎯⎯`}</h2>
                </div>
            </div>
        </section>
    )

}
