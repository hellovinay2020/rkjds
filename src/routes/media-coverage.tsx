import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Newspaper, Tv, Radio, Calendar, ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import heroBg from "@/assets/breadcrume/breadcrume-logo.png";
import media1 from "@/assets/Causes/GirlChildEducation.png";
import media2 from "@/assets/Blogs/HealthAwareness.png";
import media3 from "@/assets/herosection/NariSashaktikaran.png";
import media4 from "@/assets/Causes/LivelihoodSkills.png";
import media5 from "@/assets/Blogs/EmpoweringRuralWomen.png";
import media6 from "@/assets/herosection/Shiksha.png";
import media7 from "@/assets/Causes/WomenHealthHygiene.png";
import media8 from "@/assets/herosection/Sahayata.png";
import { fetchGallery } from "@/data/gallery";


const outlets = [
  { name: "Times of India", icon: Newspaper, count: 12 },
  { name: "Hindustan Times", icon: Newspaper, count: 9 },
  { name: "Dainik Jagran", icon: Newspaper, count: 15 },
  { name: "DD News", icon: Tv, count: 6 },
  { name: "All India Radio", icon: Radio, count: 4 },
  { name: "NDTV India", icon: Tv, count: 5 },
];

const features = [
  {
    img: media1,
    outlet: "Times of India",
    type: "Newspaper",
    date: "March 8, 2025",
    title: "Mahila Chetna Samiti  empowers 500+ rural women through skill training",
    excerpt: "The Lucknow-based NGO has transformed lives across 12 districts of Uttar Pradesh with its tailoring and digital literacy programs.",
    link: "#",
  },
  {
    img: media2,
    outlet: "Hindustan Times",
    type: "Newspaper",
    date: "January 22, 2025",
    title: "Girls' education drive reaches remote villages in UP",
    excerpt: "An education-for-all initiative has enrolled over 1,200 first-generation learners this academic year.",
    link: "#",
  },
  {
    img: media3,
    outlet: "DD News",
    type: "Television",
    date: "December 10, 2024",
    title: "Featured: Women-led microenterprises change rural economy",
    excerpt: "A primetime documentary segment on how self-help groups are powering local livelihoods.",
    link: "#",
  },
  {
    img: media4,
    outlet: "Dainik Jagran",
    type: "Newspaper",
    date: "November 5, 2024",
    title: "Health camp provides free checkups to 2,000 rural women",
    excerpt: "Organised by Mahila Chetna Samiti , the camp ensured healthcare access for women in remote villages.",
    link: "#",
  },
  {
    img: media5,
    outlet: "NDTV India",
    type: "Television",
    date: "October 18, 2024",
    title: "Stories of change from Uttar Pradesh's heartland",
    excerpt: "A special report on the Samiti's flagship Beti Bachao – Beti Padhao mission.",
    link: "#",
  },
  {
    img: media6,
    outlet: "All India Radio",
    type: "Radio",
    date: "September 2, 2024",
    title: "Voices of empowerment — interview with our Founder",
    excerpt: "Listen to our founder discuss two decades of grassroots women empowerment work.",
    link: "#",
  },
  {
    img: media7,
    outlet: "The Hindu",
    type: "Newspaper",
    date: "August 14, 2024",
    title: "NGO honoured for outstanding contribution to women's safety",
    excerpt: "Mahila Chetna Samiti  received a state-level recognition for its safe-spaces initiative.",
    link: "#",
  },
  {
    img: media8,
    outlet: "Amar Ujala",
    type: "Newspaper",
    date: "July 1, 2024",
    title: "This Lucknow NGO is changing thousands of women's lives",
    excerpt: "Mahila Chetna Samiti 's contribution in education, health and skill development has been widely recognised.",
    link: "#",
  },
];

export default function MediaCoveragePage() {
  const [loaderData, setLoaderData] = useState<{ galleryItems: any[] }>({ galleryItems: [] });
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photoItems = loaderData.galleryItems.map((g, i) => {
    const h = i % 4 === 0 || i % 4 === 3 ? "row-span-2" : "";
    const cls = h ? "h-full min-h-[280px] sm:min-h-[380px]" : "h-40 sm:h-48";
    return { img: g.mediaUrl, h, cls };
  });

  useEffect(() => {
    document.title = "Media Coverage — Mahila Chetna Samiti ";
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const items = await fetchGallery();
        setLoaderData({ galleryItems: items.filter((g) => g.type !== "video") });
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % photoItems.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? i : (i - 1 + photoItems.length) % photoItems.length));
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [lightboxIndex]);

  if (loading) return <Preloader />;

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <PageHero
        title="Media Coverage"
        description="Press features, television segments and radio stories about our work for women empowerment, education and safety."
        image={heroBg}
        crumbs={[{ label: "Home", to: "/" }, { label: "Blogs", to: "/blogs" }]}
      />

      {/* PHOTO GALLERY */}
      <section className="py-16 sm:py-20 text-navy relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="font-semibold uppercase tracking-wider text-[12px] text-orange">Photo Gallery</div>
            <h2 className="font-display font-extrabold text-[28px] sm:text-[38px] mt-2 text-navy">Moments Of Impact</h2>
            <p className="mt-3 text-navy/70">Glimpses from our programs, events and the communities we serve every day.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {photoItems.map((g, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`group relative overflow-hidden rounded-2xl ${g.h} text-left focus:outline-none focus:ring-2 focus:ring-orange`}
              >
                <img src={g.img} alt="" loading="lazy" className={`w-full ${g.cls} object-cover transition-transform duration-700 group-hover:scale-110`} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 left-3 right-3 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="text-white text-[13px] font-bold">Mahila Chetna Samiti </div>
                  <div className="text-white/80 text-[11px]">Community impact moment</div>
                </div>
              </button>
            ))}
          </div>
        </div>

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
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? i : (i - 1 + photoItems.length) % photoItems.length)); }}
              aria-label="Previous"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? i : (i + 1) % photoItems.length)); }}
              aria-label="Next"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <img
              src={photoItems[lightboxIndex].img}
              alt=""
              onClick={(e) => e.stopPropagation()}
              className="max-w-[92vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="absolute bottom-5 left-0 right-0 text-center text-white/80 text-sm">
              {lightboxIndex + 1} / {photoItems.length}
            </div>
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
