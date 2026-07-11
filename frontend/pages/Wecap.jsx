import React, { useEffect, useRef, useState } from 'react';
import '../styles/index.css';
import { Header } from "../components/Header.jsx"
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.mjs?url";
import mainPdf from "../assets/samplepdfs/mainpdf.pdf";
import suppPdf from "../assets/samplepdfs/supppdf.pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const PdfPreview = ({ fileUrl, fileName }) => {
  const canvasRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let renderTask = null;
    let loadingTask = null;
    let isCancelled = false;
    const controller = new AbortController();

    const renderPdf = async () => {
      setError("");

      try {
        const response = await fetch(fileUrl, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`PDF request failed with ${response.status}`);
        }

        const pdfData = new Uint8Array(await response.arrayBuffer());
        loadingTask = pdfjsLib.getDocument({ data: pdfData });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;

        if (!canvas || isCancelled) {
          return;
        }

        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        renderTask = page.render({
          canvasContext: context,
          viewport,
        });

        await renderTask.promise;
      } catch (error) {
        if (!isCancelled && error.name !== "AbortError") {
          console.error("PDF preview failed:", error);
          setError("This PDF preview could not be loaded.");
        }
      }
    };

    renderPdf();

    return () => {
      isCancelled = true;
      controller.abort();
      renderTask?.cancel();
      loadingTask?.destroy();
    };
  }, [fileUrl]);

  return (
     
    <div className="pdf-decor">
      <div style={{ width: '100%', border: '4px solid #dfc286', background: '#f5f5f5' }}>
        {error ? (
          <p style={{ padding: '20px', margin: 0 }}>{error}</p>
        ) : (
          <canvas
            ref={canvasRef}
            aria-label={fileName}
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        )}
      </div>
    </div>
  );
};


const WecapViewer = () => {
  const documents = [
    { id: 1, file_name: "Week 3 Newsletter.pdf", uploaded_at: "2026-07-10", filePath: mainPdf },
    { id: 2, file_name: "Week 2 Newsletter.pdf", uploaded_at: "2026-07-03", filePath: suppPdf },
    { id: 3, file_name: "Week 1 Newsletter.pdf", uploaded_at: "2026-06-26", filePath: suppPdf }
  ]; //array of info for the pdfs

  const [pdfUrl, setPdfUrl] = useState(null)
  //backend fetch to get the actual most recent 3 here

  const latestDoc = documents[0];
  const olderDocs = documents.slice(1);
  //convert from binary data to blob to pdf viewing URL for latest

  return (<>
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '50px' }}>
      
      {latestDoc && (
        <div style={{ marginBottom: '40px' }}>
          <div className="mb-8">
          <h1 className="text-4xl nice-font !font-bold mb-8 text-center">Latest Wecap: {new Date(latestDoc.uploaded_at).toLocaleDateString()}</h1>
          <hr className="gradient-line" />
          </div>
          
          <PdfPreview fileUrl={latestDoc.filePath} fileName={latestDoc.file_name} />
          <a
            href={latestDoc.filePath}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', marginTop: '12px', color: '#331a11', fontWeight: 'bold' }}
            className='simple-font'
          >
            Open in a new tab
          </a>
        </div>
      )}

      </div>

    <hr className="gradient-line" />

    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '50px' }}>
    {olderDocs.length > 0 && (
        <div style={{ padding: '20px', marginBottom:"10px"}}>
          <h3 className="text-3xl nice-font !font-bold mb-10 text-center">Missed a Week? See our Archive Below</h3>
          
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            {olderDocs.map((doc) => (
              <a
                key={doc.id}
                href={doc.filePath}    /* Points directly to the static PDF file target */
                target="_blank"        /* Tells the browser to open new tab */
                rel="noopener noreferrer" /* security shield for blank layouts */
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: '#007bff',
                  color: '#ffffff',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                View {doc.file_name} →
              </a>
            ))}
          </div>
        </div>
      )}

      <a href="/wecap-archive"   /* Points directly to the static PDF file target */
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#007bff',
                  color: '#ffffff',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                See all Wecaps
              </a>
            </div>
          </>
    

  );
}


export const Wecap = () => {
  return (
    <div>
        <Header title="WeCaps" subtitle="Past and present newsletters"/>
        <WecapViewer/>
    </div>
  );
};
