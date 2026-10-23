import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, X, Image as ImageIcon, Video, Calendar, Sparkles, Filter } from "lucide-react";
import { FaDove, FaHandsPraying, FaCross } from "react-icons/fa6";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import heroBg from "@/assets/breadcrume/breadcrume-logo.png";

// Church event thumbnails
import sundayWorshipImg from "@/assets/events/sunday-worship.jpg";
import fastingPrayerImg from "@/assets/events/fasting-prayer.jpg";
import holyBaptismImg from "@/assets/events/holy-baptism.jpg";
import villageOutreachImg from "@/assets/events/village-outreach.jpg";
import healingPrayerImg from "@/assets/project/healing-prayer.jpg";
import villageGospelImg from "@/assets/project/village-gospel.jpg";

interface ChurchVideo {
  id: string;
  title: string;
  hindiTitle: string;
  category: "all" | "worship" | "prayer" | "baptism" | "outreach";
  categoryLabel: string;
  thumbnail: string;
  embedUrl: string;
  duration: string;
  speaker: string;
  description: string;
}

const churchVideos: ChurchVideo[] = [
  {
    id: "v1",
    title: "Sunday Divine Worship & Healing Fellowship",
    hindiTitle: "रविवार आत्मिक आराधना एवं चंगाई सभा",
    category: "worship",
    categoryLabel: "रविवार आराधना",
    thumbnail: sundayWorshipImg,
    embedUrl: "https://www.youtube.com/embed/S_8qM8818Hw",
    duration: "1:24:10",
    speaker: "पास्टर रमेश कुमार (Chairman)",
    description: "आरके मिनिस्ट्रीज में आयोजित रविवार आराधना, प्रभु यीशु की महिमा, चंगाई और आशीष की जीवंत संगति।",
  },
  {
    id: "v2",
    title: "Friday Fasting Prayer & Miraculous Deliverance",
    hindiTitle: "शुक्रवार उपवास एवं रोग चंगाई प्रार्थना",
    category: "prayer",
    categoryLabel: "उपवास प्रार्थना",
    thumbnail: fastingPrayerImg,
    embedUrl: "https://www.youtube.com/embed/5qap5aO4i9A",
    duration: "48:30",
    speaker: "प्रार्थना दल (RK Ministries)",
    description: "रोगियों और दुखियों के लिए विशेष उपवास प्रार्थना जहाँ प्रभु यीशु मसीह के नाम से शांति और छुटकारा मिलता है।",
  },
  {
    id: "v3",
    title: "Holy Water Baptism & Spiritual Transformation",
    hindiTitle: "पवित्र जल बपतिस्मा एवं आत्मिक नया जन्म",
    category: "baptism",
    categoryLabel: "जल बपतिस्मा",
    thumbnail: holyBaptismImg,
    embedUrl: "https://www.youtube.com/embed/7wtfhZwyrcc",
    duration: "34:15",
    speaker: "पास्टर रमेश कुमार",
    description: "मत्ती 28:19 के अनुसार विश्वासियों का पवित्र जल बपतिस्मा और मसीह में नया जीवन स्वीकार करने का पावन क्षण।",
  },
  {
    id: "v4",
    title: "Rural Gospel Outreach & Village Fellowship",
    hindiTitle: "ग्रामीण सुसमाचार प्रचार एवं प्रार्थना सभा",
    category: "outreach",
    categoryLabel: "सुसमाचार प्रचार",
    thumbnail: villageOutreachImg,
    embedUrl: "https://www.youtube.com/embed/rPGL17e5UjI",
    duration: "42:00",
    speaker: "आउटरीच टीम",
    description: "मुस्तफाबाद और आज़मगढ़ के ग्रामीण अंचलों में प्रभु के सुसमाचार और प्रेम का प्रचार-प्रसार।",
  },
  {
    id: "v5",
    title: "Praise, Worship & Miraculous Testimonies",
    hindiTitle: "प्रभु की स्तुति, आराधना एवं सच्ची गवाहियाँ",
    category: "worship",
    categoryLabel: "स्तुति एवं गवाही",
    thumbnail: healingPrayerImg,
    embedUrl: "https://www.youtube.com/embed/2zToEPpFEN8",
    duration: "56:20",
    speaker: "कलीसियाई परिवार",
    description: "प्रार्थना के माध्यम से जीवन में मिले चमत्कारों और आशीषों की विश्वासियों द्वारा सच्ची गवाहियाँ।",
  },
  {
    id: "v6",
    title: "Youth & Family Spiritual Blessing Gathering",
    hindiTitle: "युवा एवं पारिवारिक आत्मिक आशीष संगति",
    category: "outreach",
    categoryLabel: "पारिवारिक संगति",
    thumbnail: villageGospelImg,
    embedUrl: "https://www.youtube.com/embed/kJQP7kiw5Fk",
    duration: "38:45",
    speaker: "पास्टर रमेश कुमार",
    description: "परिवारों और युवाओं को प्रभु के वचन में सुदृढ़ करने हेतु विशेष मार्गदर्शन व प्रार्थना संगति।",
  },
];

const categories = [
  { id: "all", label: "सभी वीडियो (All)" },
  { id: "worship", label: "रविवार आराधना (Sunday Worship)" },
  { id: "prayer", label: "उपवास प्रार्थना (Fasting Prayer)" },
  { id: "baptism", label: "जल बपतिस्मा (Baptism)" },
  { id: "outreach", label: "सुसमाचार प्रचार (Outreach)" },
];

export default function VideoGalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeVideo, setActiveVideo] = useState<ChurchVideo | null>(null);

  useEffect(() => {
    document.title = "Video Gallery (वीडियो गैलरी) — RK MINISTRIES";
  }, []);

  const filteredVideos =
    activeCategory === "all"
      ? churchVideos
      : churchVideos.filter((v) => v.category === activeCategory);

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero
        title="Video"
        accent="Gallery"
        description="आरके मिनिस्ट्रीज की आत्मिक आराधना, उपवास प्रार्थना, पवित्र जल बपतिस्मा और सुसमाचार प्रचार के वीडियो।"
        image={heroBg}
        eyebrow="वीडियो दीर्घा (Church Video Gallery)"
        crumbs={[{ label: "Home", to: "/" }, { label: "Gallery", to: "/gallery" }, { label: "Video Gallery" }]}
      />

      <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-slate-50/50 to-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          
          {/* Switch tabs between Photo and Video */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-white text-navy border border-slate-200 hover:border-orange hover:text-orange shadow-sm transition"
            >
              <ImageIcon className="w-4 h-4 text-orange" />
              फोटो गैलरी (Photo Gallery)
            </Link>
            <Link
              to="/video-gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-gradient-to-r from-orange to-[#e56000] text-white shadow-md shadow-orange/20"
            >
              <Video className="w-4 h-4" />
              वीडियो गैलरी ({churchVideos.length})
            </Link>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === c.id
                    ? "bg-[#0B1F3A] text-white shadow-md scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredVideos.map((video) => (
              <article
                key={video.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail with Play Button */}
                <div
                  onClick={() => setActiveVideo(video)}
                  className="relative aspect-video overflow-hidden bg-slate-900 cursor-pointer"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.hindiTitle}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-orange text-white flex items-center justify-center shadow-lg shadow-orange/40 group-hover:scale-115 transition-transform duration-300">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <span className="absolute bottom-3 right-3 bg-black/85 backdrop-blur-sm text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-md">
                    {video.duration}
                  </span>

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-navy/90 backdrop-blur-sm text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {video.categoryLabel}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => setActiveVideo(video)}
                      className="font-display font-bold text-[#0B1F3A] text-lg leading-snug group-hover:text-orange transition-colors cursor-pointer"
                    >
                      {video.hindiTitle}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-1">
                      {video.title}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                      <FaCross className="w-3 h-3 text-amber-500" />
                      {video.speaker}
                    </span>
                    <button
                      onClick={() => setActiveVideo(video)}
                      className="text-xs font-bold text-orange hover:text-[#d45500] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-orange" /> देखें (Watch)
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-navy rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#07172C] text-white border-b border-white/10">
              <div className="pr-4 min-w-0">
                <h4 className="font-bold text-sm sm:text-base truncate text-amber-300">
                  {activeVideo.hindiTitle}
                </h4>
                <p className="text-xs text-white/70 truncate">{activeVideo.speaker}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition flex-shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`${activeVideo.embedUrl}?autoplay=1`}
                title={activeVideo.hindiTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Footer description */}
            <div className="p-4 bg-[#0A2540] text-white/90 text-xs sm:text-sm">
              <p>{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}