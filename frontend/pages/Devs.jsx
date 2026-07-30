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

function SectionHeading({children}) {
  return(
    <div className="flex items-center justify center gap-3 mb-10">
      <Diamond />
      <h2 className="text-[#7a1f1f] text-xl tracking-wide" style={{fontFamily: "'Playfair Display', serif"}}>
        {children}
      </h2>
      <Diamond />
    </div>
  );
}
export const Developers = () => {
  return (
    <div>
        <Header title="Developers" subtitle="Meet the team that built this website"/>

        <main className="max-w-4xl mx-auto px-6 py-16">
          {/*The Team*/}
          <SectionHeading>The Team</SectionHeading>
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
        </main>
    </div>
  );
};
