"use client";

import { useState } from "react";

type GalleryItem = {
  id: string;
  title: string;
  slot: string;
  image: string;
  visibility: string;
};

type HomeGalleryProps = {
  images: GalleryItem[];
};

export default function HomeGallery({ images }: HomeGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const PAGE_SIZE = 12;

  // Filter public images
  const publicImages = images.filter((img) => img.visibility === "Public");

  // Calculate pagination variables
  const totalPages = Math.ceil(publicImages.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedImages = publicImages.slice(startIndex, startIndex + PAGE_SIZE);

  // Lightbox navigation helpers
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : publicImages.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null && prev < publicImages.length - 1 ? prev + 1 : 0));
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to the top of the gallery section smoothly
    const element = document.getElementById("gallery-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="gallery-section" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 border-t border-slate-200 bg-white">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <p className="text-sm font-bold uppercase tracking-[.16em] text-teal-700">Visual Insights</p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-950">
          A Glimpse into Global Excellence
        </h2>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          Discover our world-class medical partners and coordination expertise.
        </p>
      </div>

      {/* Grid Layout containing paginated images */}
      {paginatedImages.length === 0 ? (
        <div className="text-center py-20 text-slate-500 bg-slate-50 border border-slate-200 rounded-3xl">
          <p className="text-sm">No photos found in the gallery.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedImages.map((imgItem) => {
              // Map the index in paginated array to the index in the full publicImages array for correct lightbox slideshow behavior
              const fullIndex = publicImages.findIndex((item) => item.id === imgItem.id);
              return (
                <div
                  key={imgItem.id}
                  onClick={() => setLightboxIndex(fullIndex !== -1 ? fullIndex : 0)}
                  className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xs hover:shadow-md group border border-slate-200 bg-slate-100 cursor-pointer transition-all duration-300"
                >
                  <img
                    src={imgItem.image}
                    alt={imgItem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">{imgItem.title}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 border border-slate-200 rounded-full text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
              >
                ‹ Previous Page
              </button>

              <span className="text-xs font-bold text-slate-500">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 border border-slate-200 rounded-full text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
              >
                Next Page ›
              </button>
            </div>
          )}
        </>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 cursor-pointer"
        >
          {/* Lightbox Header Controls */}
          <div className="flex justify-end p-2">
            <button
              onClick={() => setLightboxIndex(null)}
              className="text-white text-3xl font-light hover:text-slate-300 transition cursor-pointer"
            >
              ×
            </button>
          </div>

          {/* Lightbox Center Content */}
          <div className="flex-1 flex items-center justify-between gap-4 max-w-5xl mx-auto w-full">
            {/* Prev arrow */}
            <button
              onClick={handlePrev}
              className="text-white text-3xl font-light hover:text-teal-400 hover:scale-110 transition bg-black/40 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
            >
              ‹
            </button>

            {/* Large Image */}
            <div className="relative max-h-[75vh] max-w-full flex items-center justify-center p-2">
              <img
                src={publicImages[lightboxIndex].image}
                alt={publicImages[lightboxIndex].title}
                className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Next arrow */}
            <button
              onClick={handleNext}
              className="text-white text-3xl font-light hover:text-teal-400 hover:scale-110 transition bg-black/40 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
            >
              ›
            </button>
          </div>

          {/* Lightbox Footer Captions */}
          <div className="text-center pb-8">
            <p className="text-teal-400 text-xs font-bold uppercase tracking-widest">
              Photo {lightboxIndex + 1} of {publicImages.length}
            </p>
            <h4 className="text-white text-base font-bold mt-2">
              {publicImages[lightboxIndex].title}
            </h4>
            {publicImages[lightboxIndex].slot && (
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mt-1 inline-block">
                Grid Placement: {publicImages[lightboxIndex].slot}
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
