import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Video, Eye } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import heroBg from "@/assets/breadcrume/breadcrume-logo.png";

import img1 from "@/assets/Gallery/img (1).jpeg";
import img2 from "@/assets/Gallery/img (2).jpeg";
import img3 from "@/assets/Gallery/img (3).jpeg";
import img4 from "@/assets/Gallery/img (4).jpeg";
import img5 from "@/assets/Gallery/img (5).jpeg";
import img6 from "@/assets/Gallery/img (6).jpeg";
import img7 from "@/assets/Gallery/img (7).jpeg";
import img8 from "@/assets/Gallery/img (8).jpeg";
import img9 from "@/assets/Gallery/img (9).jpeg";
import img10 from "@/assets/Gallery/img (10).jpeg";
import img11 from "@/assets/Gallery/img (11).jpeg";
import img12 from "@/assets/Gallery/img (12).jpeg";
import img13 from "@/assets/Gallery/img (13).jpeg";

const galleryImages = [
  { src: img1, alt: "RK Ministries Fellowship & Prayer 1" },
  { src: img2, alt: "RK Ministries Fellowship & Prayer 2" },
  { src: img3, alt: "RK Ministries Fellowship & Prayer 3" },
  { src: img4, alt: "RK Ministries Fellowship & Prayer 4" },
  { src: img5, alt: "RK Ministries Fellowship & Prayer 5" },
  { src: img6, alt: "RK Ministries Fellowship & Prayer 6" },
  { src: img7, alt: "RK Ministries Fellowship & Prayer 7" },
  { src: img8, alt: "RK Ministries Fellowship & Prayer 8" },
  { src: img9, alt: "RK Ministries Fellowship & Prayer 9" },
  { src: img10, alt: "RK Ministries Fellowship & Prayer 10" },
  { src: img11, alt: "RK Ministries Fellowship & Prayer 11" },
  { src: img12, alt: "RK Ministries Fellowship & Prayer 12" },
  { src: img13, alt: "RK Ministries Fellowship & Prayer 13" },
];

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Photo Gallery (फोटो गैलरी) — RK MINISTRIES";
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % galleryImages.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero
        title="Photo"
        accent="Gallery"
        description="आरके मिनिस्ट्रीज की प्रार्थना सभाएं, सुसमाचार प्रचार, बपतिस्मा और आत्मिक संगतियों की सुंदर झलकियाँ।"
        image={heroBg}
        eyebrow="चित्र दीर्घा (Photo Gallery)"
        crumbs={[{ label: "Home", to: "/" }, { label: "Gallery", to: "/gallery" }, { label: "Photo Gallery" }]}
      />

      <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-slate-50/50 to-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Switch tabs between Photo and Video */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-gradient-to-r from-orange to-[#e56000] text-white shadow-md shadow-orange/20"
            >
              <ImageIcon className="w-4 h-4" />
              फोटो गैलरी ({galleryImages.length})
            </Link>
            <Link
              to="/video-gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-white text-navy border border-slate-200 hover:border-orange hover:text-orange shadow-sm transition"
            >
              <Video className="w-4 h-4 text-orange" />
              वीडियो गैलरी (Video Gallery)
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="relative overflow-hidden rounded-2xl group aspect-[4/5] sm:aspect-square bg-slate-100 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-orange cursor-pointer transition-all duration-300"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-[#0B1F3A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <span className="text-white text-xs font-semibold flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                    <Eye className="w-3.5 h-3.5" /> देखें (View)
                  </span>
                  <span className="text-white/80 text-[11px] font-mono">
                    #{i + 1}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length)); }}
            aria-label="Previous"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? i : (i + 1) % galleryImages.length)); }}
            aria-label="Next"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <img
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[92vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
          />

          <div className="absolute bottom-5 left-0 right-0 text-center text-white/80 text-sm">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
