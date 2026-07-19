import React from 'react';
import { Header } from "../components/Header.jsx";
import { useAdmin } from "../features/auth/AdminContext.jsx";
import '../styles/index.css';
import welcome from "../assets/welcome.jpg";
import FormPopup from "../components/Popups.jsx"

function uploadWecap(){
  console.log("Uploaded")
}

function addAdmin (email){
  console.log("Admin added", email)
}

function deleteAdmin (email) {
  console.log("Admin Deleted:", email)
}

const ResourceCards = (props) => {
  return(
    <a
      href={props.link || null}
      className="simple-font flex min-h-24 text-lg items-center justify-center border border-[#dfc286] bg-[#f2e8d5] px-4 py-5 text-center text-sm font-semibold text-[#331a11] shadow-[0_6px_14px_rgba(63,30,20,0.08)] transition hover:-translate-y-0.5 hover:border-[#84211b] hover:bg-[#fff8ea] hover:text-[#84211b]"
    >
      {props.resourceName}
    </a>
  )
}

const resourceLinks = [{
url: "https://drive.google.com/drive/folders/1i11i0VbLt-IsDIPkJOPmoAvhtBF9tcWt",
title: "CCS GDRIVE", 
}, {
  url: "https://youtu.be/-sFije0-16Q?si=8hYol2Xkb6lN6JmX",
  title: "Showcase Performances",
}, {
  url: "https://youtu.be/3RGEo2Kohb8?si=Qeo0G_5kzpo6q57g",
  title:"Other Resources"
}, {
  url:"https://youtu.be/1_G60OdEzXs?si=QOpRrynXs1eYImFZ",
  title: "Work Stuff",
}, 
{
  url:"https://youtu.be/JwB-iVAfnMo?si=HnDCuv8PTjWWo7rM",
  title: "Another Resource",
}]

export const Dashboard = () => {
  const { adminEmail, adminName, logoutAdmin } = useAdmin();

  return (
    <div className="min-h-screen bg-[#f2e8d5]">
        <Header title="CCS Dashboard" subtitle="CCS Resources" />
        <main className="mx-auto grid max-w-8xl gap-4 px-6 py-12 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="flex flex-col justify-between border border-[#dfc286] bg-[#fff8ea] p-8 shadow-[0_14px_35px_rgba(63,30,20,0.10)]">
            <div>
              <h1 className="nice-font text-center text-4xl !font-bold leading-tight text-[#84211b] md:text-5xl">
                Welcome <br/> to the CCS Dashboard!
              </h1>
              <img src={welcome} className='h-50 md:h-70 lg:80 mx-auto object-cover mt-5 mb-5'/>
              <div className="mt-8 border-l-4 border-[#cd9b55] pl-5">
                <p className="simple-font text-3xl !font-semibold text-[#331a11]">
                  {adminName || "CCS Board Member"}
                </p>
                <p className="simple-font mt-2 text-sm tracking-wide text-neutral-600">
                  {adminEmail || "ccs@nd.edu"}
                </p>
              </div>
            </div>
              <button
                type="button"
                onClick={logoutAdmin}
                className="simple-font mt-10 w-fit border border-[#84211b] bg-[#84211b] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#6f1b16]"
              >
                Log out
              </button>
          </section>
          <div className="flex h-full flex-col border border-[#dfc286] bg-[#fff8ea]/70 p-6 shadow-[0_14px_35px_rgba(63,30,20,0.10)]">
            <h2 className="nice-font mb-5 border-b border-[#dfc286] pb-4 text-3xl !font-bold text-[#200c0b]">
              CCS Board Resources
            </h2>
            <section className="grid flex-1 grid-rows-[3fr_1fr_1fr] gap-3">
              <div className="group border border-[#dfc286] bg-[#fff8ea] p-6">
                <h2 className="nice-font text-xl !font-semibold text-[#84211b]">Links, Drives, More</h2>
                <div className='mt-5 grid gap-4 sm:grid-cols-3'>
                  {resourceLinks.map((source) => (<ResourceCards key={source.title} link={source.url} resourceName={source.title}/>))}
                </div>
              </div>
              <div className="group border border-[#dfc286] bg-[#fff8ea] p-6">
                <h2 className="nice-font text-xl !font-semibold text-[#84211b]">Upload Wecaps</h2>
                <button type="button"
                onClick={uploadWecap}
                className="simple-font mt-10 w-fit border border-[#84211b] bg-[#84211b] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#6f1b16]"> Upload </button>
              </div>
              <div className="group border border-[#dfc286] bg-[#fff8ea] p-6">
                <h2 className="nice-font text-xl !font-semibold text-[#84211b]">Manage CCS Admin</h2>
                <div className='flex flex-row gap-4'>
                  <FormPopup function={addAdmin} type="add"/>
                  <FormPopup function={deleteAdmin} type="remove"/>
                </div>
              </div>
            </section>
          </div>
        </main>
    </div>
  );
};
