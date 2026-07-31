import React from 'react';
import '../styles/index.css';
import { Header } from "../components/Header.jsx"

const DEVS = [
  {
    photo: "",
    name: "Loise Wardhana",
    role: "Lead Developer",
    class: "2029",
    bio: "",
    skills: [""],
  },
  {
    photo: "",
    name: "Michael Salvador",
    role: "Co-Developer",
    class: "2029",
    bio: "",
    skills: [""],
  }
];

const BUILT_WITH = [
  {name: "React", note: "UI Framework"},
  {name: "TypeScript", note: "Type Safety"},
  {name: "Tailwind CSS", note: "Styling"},
  {name: "Motion", note: "Animations"},
  {name: "React Router", note: "Navigation"},
];

const STATS = [
  {value: "6", label: "Pages"},
  {value: "100%", label: "Responsive"},
  {value: "\u26A1", label: "Lightning Fast", isIcon: true},
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
        className="text-[#7a1f1f] text-xl tracking-wide"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {children}
      </h2>
      <Diamond />
    </div>
  );
}
function IconGithub(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 4.98 3.23 9.2 7.71 10.69.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.14.68-3.8-1.34-3.8-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.14-1.25-5.14-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.42.11-2.97 0 0 .95-.3 3.12 1.16a10.8 10.8 0 0 1 5.68 0c2.16-1.46 3.11-1.16 3.11-1.16.62 1.55.24 2.69.12 2.97.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.28-5.16 5.56.4.35.76 1.03.76 2.08 0 1.5-.01 2.71-.01 3.08 0 .3.2.65.78.54A10.53 10.53 0 0 0 23 11.52C23 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

function IconLink(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11.5 4.5" strokeLinecap="round" />
      <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L12.5 19.5" strokeLinecap="round" />
    </svg>
  );
}

function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCode(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="m8 6-6 6 6 6M16 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export const Developers = () => {
  return (
    <div>
        <Header title="Developers" subtitle="Meet the team that built this website"/>

        <main className="max-w-4xl mx-auto px-6 py-16">
          {/*The Team*/}
          <SectionHeading>◇ The Team ◇</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-6 mb-20">
            {DEVS.map((member) => (
              <div
                key={member.name}
                className="bg-[#ede0bf] border border-[#e0cf9d] rounded-lg p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-md bg-[#7a1f1f] text-[#f7ecd0] flex items-center justify-center text-xl font-semibold">
                    {member.photo}
                  </div>
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
                  <p className="text-[10px] tracking-[0.2em] text-[#8a7856] mb-2">
                    SKILLS
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {member.skills.map((skill) => (
                      <span key={skill} className="text-xs px-2.5 py-1 rounded bg-[#f2e8ce] text-[#5b4a2f] border border-[#e0cf9d]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
            ))}
          </div>

          {/*Built With*/}
          <SectionHeading>Built With</SectionHeading>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-20">
            {BUILT_WITH.map((item) => (
              <div key={item.name} className="bg-[#ede0bf] border border-[#e0cf9d] rounded-lg py-5 text-center">
                <p className="text-[#7a1f1f] font-medium text-sm">{item.name}</p>
                <p className="text-[#8a7856] text-xs mt-1">{item.note}</p>
              </div>
            ))}
          </div>

          {/*About*/}
          <SectionHeading>About This Project</SectionHeading>
          <div className="bg-[#ede0bf] border border-[#e0cf9d] rounded-lg p-8">
            <p className="text-[#6b5a3d] text-sm leading-relaxed mb-4">
              This website was built with modern web technologies to provide a beautiful, 
              fast, and accessible experience for all users. Our goal was to blend traditional 
              Chinese aesthetics with contemporary web design.
            </p>
            <p className="text-[#6b5a3d text-sm leading-relaxed mb-8">
              The site features smooth animations, responsive design that works on all devices, 
              and an intuitive navigation structure that makes it easy to find information about 
              the club's events and activities.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-[#f2e8ce] border border-[#e0cf9d] rounded-lg py-5 text-center">
                <p className="text-[#7a1f1f] text-2xl font-semibold mb-1">
                  {stat.value}
                </p>
                <p className="text-[#8a7856] text-xs tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
              ))}
            </div>
          </div>
        </main>

        {/*Github*/}
        <section className="bg-[#7a1f1f] text-center py-16 px-6">
          <IconCode className="w-6 h-6 text-[#e7c98f] mx-auto mb-4"/>
          <h2 className="text-[#f7ecd0] text-lg mb-3" style={{fontFamily: "'Playfair Display', serif"}}>
            Want to Contribute?
          </h2>
          <p className="text-[#e7c98f]/90 text-sm max-w-md mx-auto mb-7">
            This is an open-source project. If you'd like to contribute to the
            development of our website, we'd love to hear from you!
          </p>
          <a
            href="https://github.com/loiseaward/CCS-Website.git"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#c9a227] hover:bg-[#b8931f] transition-colors text-[#3a2a10] text-sm font-medium px-5 py-2.5 rounded-md">
            <IconGithub className="w-4 h-4"/>
            View on Github
          </a> 
        </section>
    </div>
  );
};
