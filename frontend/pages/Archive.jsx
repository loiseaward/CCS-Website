import React, { useState } from 'react';
import '../styles/index.css';
import { Header } from "../components/Header.jsx";
import mainPdf from "../assets/samplepdfs/mainpdf.pdf";
import suppPdf from "../assets/samplepdfs/supppdf.pdf";

const placeholderresults = [
    { id: 1, file_name: "Week 3 Newsletter.pdf", uploaded_at: "2026-07-10", filePath: mainPdf },
    { id: 2, file_name: "Week 2 Newsletter.pdf", uploaded_at: "2026-07-03", filePath: suppPdf },
    { id: 3, file_name: "Week 1 Newsletter.pdf", uploaded_at: "2026-06-26", filePath: suppPdf }
  ]; //array of info for the pdfs

const WecapCards = (props) =>{
  const issueDate = new Date(props.uploaded_at);
      return (
            <a
              key={props.id}
              href={props.filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="wecap-archive-card"
            >
            <span className="wecap-archive-accent" aria-hidden="true" />
            <div className="wecap-archive-date">
                <span>{issueDate.toLocaleString("en-US", { month: "short" }).toUpperCase()} {issueDate.toLocaleString('default', { day: 'numeric' })}</span>
                <span>{issueDate.getFullYear()}</span>
            </div>
            <div className="wecap-archive-content">
                <h4 className="wecap-archive-title nice-font">
                  Wecap {props.file_name}
                </h4>
            <div className="wecap-archive-tags simple-font">
                <span>PDF</span>
              </div>
            </div>
          </a>
    );
}


export const Archive = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, index) => currentYear - index);

  const [wecapsResults, setWecapsResults] = useState(placeholderresults);

  //useffect to load in all at first

  //function to fetch from backend here and get new array of objects if form submkitted
  function handleFilter(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedYears = formData.getAll('years');
    console.log(selectedYears)

    if (selectedYears.length === 0) {
      //fetch all from backend
      return;
    }

    //select only the selected years from backend
  }

  return (
    <div>
        <Header title="Wecap Archive" subtitle="See our previous editions"/>

      <div className="wecap-archive-page">
        <div className="mb-8">
          <h1 className="nice-font text-start text-3xl !font-bold p-4"> CCS Archive</h1>
          <hr className="gradient-line"/>
        </div>

        <div className="wecap-archive-layout">
          <aside className="wecap-archive-filter-panel">
            <h2 className="nice-font text-xl !font-normal">Filter by Year</h2>
            <p className="simple-font wecap-archive-filter-note">
              Select one or more years
            </p>

            <form onSubmit={handleFilter} className="wecap-archive-filter-form">
              <fieldset className="wecap-archive-filter-fieldset">
                <legend className="simple-font">Years</legend>
                <div className="wecap-year-grid">
                  {years.map((year) => (
                    <label key={year} className="wecap-year-option simple-font">
                      <input type="checkbox" name="years" value={year} />
                      <span>{year}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="wecap-filter-actions">
                <button type="submit" className="wecap-filter-button">
                  Apply Filters
                </button>
                <button type="reset" className="wecap-filter-button wecap-filter-button-secondary">
                  Clear
                </button>
              </div>
            </form>
          </aside>

          <section className="wecap-archive-results">
            <h2 className="nice-font text-xl !font-normal">Results</h2>
            <p className="simple-font mt-3 mb-3 !text-sm !text-[#725648]">
              Showing 1-{wecapsResults.length} 
            </p>
            <div className="wecap-archive-list">
              {wecapsResults.map((wecap) => (
                <WecapCards
                  key={wecap.id}
                  id={wecap.id}
                  uploaded_at={wecap.uploaded_at}
                  filePath={wecap.filePath}
                  file_name={wecap.file_name}
                />
              ))}
            </div>
          </section>
          </div>  
        </div>
    </div>
  );
};
