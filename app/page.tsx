"use client";

import { useEffect, useRef, useState } from "react";

export default function PDFViewer() {
  const [viewerHeight, setViewerHeight] = useState("100vh");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setViewerHeight(`${window.innerHeight}px`);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="w-full h-screen p-0 m-0 overflow-hidden" ref={containerRef}>
      <main className="w-full h-full p-0 m-0 flex flex-col">
        <object
          data="/SUBATOU.pdf"
          type="application/pdf"
          className="w-full border-none"
          style={{ height: viewerHeight }}
        >
          <div className="w-full h-full flex items-center justify-center p-4 text-center">
            <div className="max-w-md">
              <p className="mb-4">
                Your browser does not support embedded PDFs.
              </p>
              <a
                href="/SUBATOU.pdf"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Download PDF
              </a>
            </div>
          </div>
        </object>
      </main>
    </div>
  );
}
