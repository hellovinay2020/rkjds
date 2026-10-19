import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import heroBg from "@/assets/herosection/NariSashaktikaran.png";

import galleryImg1 from "@/assets/Gallery/img1.png";
import galleryImg2 from "@/assets/Gallery/img2.png";
import galleryImg3 from "@/assets/Gallery/img3.png";
import galleryImg4 from "@/assets/Gallery/img4.png";
import galleryImg5 from "@/assets/Our Programs/EducationSupportInitiative.png";
import galleryImg6 from "@/assets/Our Programs/HealthSafetyCampaign.png";
import galleryImg7 from "@/assets/Our Programs/SkillDevelopmentProgram.png";
import galleryImg8 from "@/assets/Our Programs/WomenEmpowermentProgram.png";

const galleryImages = [
  { src: galleryImg1, alt: "Gallery Image 1" },
  { src: galleryImg2, alt: "Gallery Image 2" },
  { src: galleryImg3, alt: "Gallery Image 3" },
  { src: galleryImg4, alt: "Gallery Image 4" },
  { src: galleryImg5, alt: "Gallery Image 5" },
  { src: galleryImg6, alt: "Gallery Image 6" },
  { src: galleryImg7, alt: "Gallery Image 7" },
  { src: galleryImg8, alt: "Gallery Image 8" },
];

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Gallery — Mahila Chetna Samiti";
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
        title="Gallery"
        description="Glimpses from our programs, events and community moments — captured in photos."
        image={heroBg}
        crumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
      />

      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="relative overflow-hidden rounded-2xl group aspect-square focus:outline-none focus:ring-2 focus:ring-orange cursor-pointer"
              >
                <img src={img.src} alt={img.alt} className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
