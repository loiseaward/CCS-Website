import React from 'react';
import '../styles/index.css';
import { Header } from "../components/Header.jsx";

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
                <span>{issueDate.toLocaleString("en-US", { month: "short" }).toUpperCase()}</span>
                <span>{issueDate.getFullYear()}</span>
            </div>
            <div className="wecap-archive-content">
                <h4 className="wecap-archive-title nice-font">
                  Wecap {issueDate.toLocaleDateString()}
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

  return (
    <div>
        <Header title="Wecap Archive" subtitle="See our previous editions"/>

      <div className="wecap-archive-page">
        <div className="mb-8">
          <h1 className="nice-font text-start text-2xl !font-normal p-4"> CCS Archive</h1>
          <hr className="gradient-line"/>
        </div>

        <div className="wecap-archive-layout">
          <aside className="wecap-archive-filter-panel">
            <h2 className="nice-font text-xl !font-normal">Filter by Year</h2>
            <p className="simple-font wecap-archive-filter-note">
              Select one or more years
            </p>

            <form action="/api/wecap/archive" method="get" className="wecap-archive-filter-form">
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
            <p className="simple-font wecap-archive-results-note">
              Filtered wecaps will appear here after backend is built 
            </p>
          </section>
          </div>  
        </div>
    </div>
  );
};
