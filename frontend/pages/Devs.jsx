import React from 'react';
import '../styles/index.css';
import { Header } from "../components/Header.jsx"

const devPics = import.meta.glob("../assets/dev_pics/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default"
});

const devPicsByName = {};
for (const path in devPics) {
  const match = path.match(/dev_pics\/([^/]+)\.[^.]+$/);
  const name = match[1];
  devPicsByName[name] = devPics[path];
}

const DEVS = [
  {
    name: "Loise Wardhana",
    role: "Lead Developer",
    class: "2029",
    linkedin: "https://www.linkedin.com/in/loise-wardhana/"
  },
  {
    name: "Michael Salvador",
    role: "Co-Developer",
    class: "2029",
    linkedin: "https://www.linkedin.com/in/michael-salvador-0b1427291/"
  }
];

const BUILT_WITH = [
  {name: "React", note: "UI Framework"},
  {name: "PostgresSQL", note: "Database"},
  {name: "Tailwind CSS", note: "Styling"},
  {name: "React Router", note: "Navigation"},
  {name:"Express", note: "Backend Framework"}
];


function Diamond() {
  return (
    <span className="inline-block w-1.5 h-1.5 rotate-45 bg-[#8a2b2b] align-middle" />
  );
}

function SectionHeading({ children }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-10">
      <Diamond />
      <h2
        className="text-[#7a1f1f] text-3xl tracking-wide"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {children}
      </h2>
      <Diamond />
    </div>
  );
}


function IconLinkedin(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}


export const Developers = () => {
  return (
    <div>
        <Header title="Developers" subtitle="Meet the team that built this website"/>
        <main className="max-w-6xl mx-auto px-6 py-16">
          {/*The Team*/}
          <SectionHeading>◇ Developers ◇</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-8 mb-20">
            {DEVS.map((member) => {
              const photo = devPicsByName[member.name];
              return (
                <div 
                  key={member.name}
                  className="group bg-[#ede0bf] border border-[#e0cf9d] rounded-lg p-10 text-center transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:border-[#c9a227]">
                    {photo ? (
                      <div className="w-50 h-50 mx-auto mb-6 rounded-md overflow-hidden">
                        <img
                          src={photo}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                        />
                      </div>
                    ) : (
                      <div className="w-30 h-30 mx-auto mb-4 rounded-md bg-[#7a1f1f] text-[#f7ecd0] flex items-center justify-center text-xl font-semibold">
                        {member.photo}
                      </div>
                    )}
                    <h3 className="text-[#4a3418] font-semibold">
                      {member.name}
                    </h3>
                    <p className="text-[#7a1f1f] text-xs tracking-wide uppercase mb-3">
                      {member.role}
                    </p>
                     <p className="text-[#7a1f1f] text-xs tracking-wide uppercase mb-3">
                      {member.class}
                    </p>
                    <p className="text-[#6b5a3d] text-sm leading-relaxed mb-4">
                      {member.bio}
                    </p>
                   {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#7a1f1f] text-[#f7ecd0] hover:bg-[#8a2b2b] transition-colors"
                      >
                        <IconLinkedin className="w-4 h-4" />
                      </a>
                   )}

                  </div>
              );
            })}
          </div>

          {/*Built With*/}
          <SectionHeading>Built With</SectionHeading>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-20">
            {BUILT_WITH.map((item) => (
              <div key={item.name} className="bg-[#ede0bf] border border-[#e0cf9d] rounded-lg py-5 text-center transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:border-[#c9a227]">
                <p className="text-[#7a1f1f] font-medium text-sm">{item.name}</p>
                <p className="text-[#8a7856] text-xs mt-1">{item.note}</p>
              </div>
            ))}
          </div>

          {/*About*/}
          <SectionHeading>About This Project</SectionHeading>
          <div className="bg-[#ede0bf] border border-[#e0cf9d] rounded-lg p-8">
            <p className="text-[#6b5a3d] text-sm leading-relaxed mb-4 text-center">
              This website was built to redesign the old CCS website, including a more unique design and 
              more interative features. Please contact the developers or CCS board if you have any questions, notice bugs or 
              would like to contribute suggestions to the project. 
            </p>
            <p className="text-[#6b5a3d] text-sm !font-bold eading-relaxed mb-4 text-center">
              ◇ ccs@nd.edu ◇ lwardhan@nd.edu ◇ msalvad2@nd.edu ◇
            </p>
          </div>
        </main>
    </div>
  );
};