import React from 'react';
import '../styles/index.css';
import { Header } from "../components/Header.jsx"

const BOARD = [
  {
    photo: "",
    name: "Stephen Wu",
    role: "Co-president (Spring)",
    bio: "Junior majoring in Finance and Global Affairs",
    contact: "cwu25@nd.edu",
  },
  {
    photo: "",
    name: "Maeve Maginn",
    role: "Co-president",
    bio: "Junior majoring in Psychology and Pre-Health",
    contact: "mmaginn@nd.edu",
  },
  {
    photo: "",
    name: "Kalena Yee",
    role: "Co-president (Fall)",
    bio: "Junior majoring in Business Analytics and Marketing",
    contact: "kyee3@nd.edu",
  },
  {
    photo: "",
    name: "Olivia Wang",
    role: "Co-vice president",
    bio: "Junior majoring in Finance",
    contact: "owang3@nd.edu",
  },
  {
    photo: "",
    name: "Niki Lee",
    role: "Co-vice president",
    bio: "Sophomore majoring in Mechanical Engineering",
    contact: "nlee26@nd.edu",
  },
  {
    photo: "",
    name: "Canon Chiu",
    role: "Co-secretary",
    bio: "Sophomore majoring in Finance and Political Science",
    contact: "cchiu4@nd.edu",
  },
  {
    photo: "",
    name: "Jodie Lam",
    role: "Co-secretary",
    bio: "Sophomore majoring in Architecture",
    contact: "jlam6@nd.edu",
  },
  {
    photo: "",
    name: "Michael Salvador",
    role: "Co-treasurer",
    bio: "Sophomore majoring in Physics and Mathematics",
    contact: "msalvad2@nd.edu",
  },
  {
    photo: "",
    name: "Loise Wardhana",
    role: "Co-treasurer",
    bio: "Sophomore majoring in Computer Sciecne and Mathematics",
    contact: "lwardhan@nd.edu",
  },
  {
    photo: "",
    name: "Maddie Xu",
    role: "Co-event Coordinator",
    bio: "idk",
    contact: "mxu7@nd.edu",
  },
  {
    photo: "",
    name: "Judie Yuan",
    role: "Co-event Coordinator",
    bio: "idk",
    contact: "zyuan3@nd.edu",
  }
];

const FIRST_ROW = BOARD.slice(0, 3);
const REST_OF_ROW = BOARD.slice(3);

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
      >
        {children}
      </h2>
      <Diamond />
    </div>
  );
}

function BoardCards({member}) {
  return (
    <div className="w-64 bg-[#ede0bf] border border-[#e0cf9d] rounded-lg p-6 text-center">
      <div className="w-14 h-14 mx-auto mb-4 rounded-md bg-[#7a1f1f] text-[#f7ecd0] flex items-center justify-center text-xl font-semibold nice-font">
        {member.photo || member.name.charAt(0)}
      </div>
      <h3 className="text-[#4a3418] font-semibold nice-font">
        {member.name}
      </h3>
      <p className="text-[#7a1f1f] text-xs tracking-wide uppercase mb-3 simple-font">
        {member.role}
      </p>
      {member.bio && (
        <p className="text-[#6b5a3d] text-sm leading-relaxed mb-4 simple-font">
          {member.bio}
        </p>
      )}
      {member.contact && (
            <a
              href={`mailto:${member.contact}`}
              className="inline-flex items-center gap-1.5 text-xs text-[#7a1f1f] hover:underline simple-font"
            >
              ✉ Contact
            </a>
      )}
    </div>
  );
}

export const Board = () => {
  return (
    <div>
        <Header title="Leadership" subtitle="Meet the team behind the club"/>
        
        <main className="max-w-5xl mx-auto px-6 py-16">
          {/*Board Members*/}
          <SectionHeading>◇ The Team ◇</SectionHeading>

          {/*First row: 3 centered presidents*/}
              <div className="flex flex-wrap justify-center gap-6 mb-6">
                {FIRST_ROW.map((member) => (
                  <BoardCards key={member.name} member={member} />
                ))}
              </div>
          {/* Rest of board: 4 per row}*/}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-25 gap-y-6 justify-items-center mb-20">
            {REST_OF_ROW.map((member) => (
              <BoardCards key={member.name} member={member} />
            ))}
          </div>
        </main>

        {/*Get in touch*/}
        <section className="bg-[#7a1f1f] text-center py-16 px-6">
          <h2 className="text-[#f7ecd0] text-lg mb-3 nice-font">
            Get in Touch
          </h2>
          <p className="text-[#f7ecd0] text-sm max-w-md mx-auto mb-7 simple-font">
            Have questions or want to collaborate? Reach out to our leadership team.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="mailto:ccs@nd.edu"
              className="inline-flex items-center gap-2 bg-[#c9a227] hover:bg-[#b8931f] transition-colors text-[#3a2a10] text-sm font-medium px-5 py-2.5 rounded-md simple-font"
            >
              ✉ Email Us
            </a>
          </div>
        </section>
    </div>
  );
};
