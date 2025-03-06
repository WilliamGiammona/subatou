'use client';

import { useEffect, useRef, useState } from 'react';

export default function EnhancedPDFViewer() {
  const [viewerHeight, setViewerHeight] = useState('100vh');
  const [pdfSupported, setPdfSupported] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if PDF viewing is likely supported
    const isPdfSupported = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      // Check for common mobile browsers that might have issues
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      // Attempt to detect if PDF viewing is likely problematic
      // This is not foolproof but catches common cases
      if (isMobile) {
        // On iOS Safari before version 13, PDF viewing was problematic
        const isOlderIOS = /iphone|ipad|ipod/.test(userAgent) && 
                           !(/crios/.test(userAgent)) && 
                           !(/fxios/.test(userAgent)) &&
                           (parseFloat((userAgent.match(/os (\d+)_(\d+)/) || [])[1] || '13') < 13);
                           
        // Some Android browsers have issues with PDF
        const isOldAndroid = /android/.test(userAgent) && 
                           parseFloat((userAgent.match(/android (\d+)\.(\d+)/) || [])[1] || '5') < 5;
                           
        return !(isOlderIOS || isOldAndroid);
      }
      
      return true;
    };

    setPdfSupported(isPdfSupported());

    const updateHeight = () => {
      if (containerRef.current) {
        setViewerHeight(`${window.innerHeight}px`);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // HTML fallback content from your PDF
  const renderHTMLContent = () => {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">SUBA CORPORATION Terms of Use</h1>
        
        {/* Replace with actual content from your PDF */}
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing or using our services, you agree to be bound by these Terms of Use.
              If you do not agree to these Terms, please do not use our services.
            </p>
          </section>
          
          {/* Add more sections based on your actual Terms of Use */}
          
          <div className="my-8 text-center">
            <a 
              href="/SUBATOU.pdf" 
              download 
              className="bg-primary hover:bg-primary/80 text-white py-2 px-4 rounded inline-block"
            >
              Download PDF Version
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen p-0 m-0 overflow-auto" ref={containerRef}>
      {pdfSupported ? (
        <object
          data="/SUBATOU.pdf"
          type="application/pdf"
          className="w-full border-none"
          style={{ height: viewerHeight }}
        >
          {/* Fallback content if object tag fails */}
          <div className="w-full py-8">
            {renderHTMLContent()}
          </div>
        </object>
      ) : (
        // Direct HTML fallback for browsers detected as not supporting PDFs well
        <div className="w-full py-8">
          {renderHTMLContent()}
        </div>
      )}
    </div>
  );
}