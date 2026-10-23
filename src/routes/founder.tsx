import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Award, HandHeart, Sparkles, Heart, Quote, ArrowRight } from "lucide-react";
import { FaCross } from "react-icons/fa6";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import heroBg from "@/assets/breadcrume/breadcrume-logo.png";
import rameshChairmanImg from "@/assets/Teams/Trustee Chairman Ramesh Kumar.jpeg";
import { fetchHomeFounder } from "@/data/homepage";
import { getFullUrl } from "@/lib/api";

const defaultStats = [
  { icon: Award, value: "27+ Years", label: "Dedicated Ministry & Service" },
  { icon: HandHeart, value: "25,000+ Lives", label: "Touched Through Prayer & Faith" },
  { icon: Sparkles, value: "500+ Villages", label: "Reached Across Purvanchal" },
];

const staticIcons = [Award, HandHeart, Sparkles];

const journey = [
  { year: "2015", title: "कलीसियाई आरंभ (The Calling)", desc: "Pastor Ramesh Kumar began fellowship in Mustafabad village with strong faith in Jesus Christ." },
  { year: "2018", title: "जल बपतिस्मा एवं प्रार्थना (Baptism & Prayer)", desc: "Baptized believers in accordance with Biblical scripture (Matthew 28:19)." },
  { year: "2021", title: "उपवास एवं चंगाई सभाएं (Healing Deliverance)", desc: "Friday fasting prayers bringing miraculous healing and deliverance to many souls." },
  { year: "2026", title: "डिजिटल कलीसिया (Modern Ministry)", desc: "Reaching Purvanchal and beyond through online prayer requests, verified baptism records and mobile access." },
];

export default function FounderPage() {
  useEffect(() => { document.title = "Chairman & Pastor — RK MINISTRIES"; }, []);

  const [founder, setFounder] = useState<any>(null);

  useEffect(() => {
    fetchHomeFounder().then(setFounder);
  }, []);

  const designation = founder?.designation || "संस्थापक एवं ट्रस्टी अध्यक्ष (Founder Chairman & Pastor)";
  const founderName = founder?.name || "पास्टर रमेश कुमार";
  const photo = founder?.photo ? getFullUrl(founder.photo) : rameshChairmanImg;
  const msgTitle = founder?.title || "सेवा, समर्पण और सुसमाचार — जीवन बदलने वाली आत्मिक आशीष।";
  const tagText = founder?.tag || "पास्टर संदेश (Message from Chairman)";
  const defaultParagraphs = [
    "आरके मिनिस्ट्रीज (RK MINISTRIES) में आपका हार्दिक स्वागत करते हुए मुझे असीम हर्ष हो रहा है।",
    "हमारा एकमात्र उद्देश्य प्रभु यीशु मसीह के प्रेम, क्षमा, जल बपतिस्मा और उद्धार के वचन को प्रत्येक जन तक पहुँचाना है। मुस्तफाबाद, मुबारकपुर, आज़मगढ़ (उत्तर प्रदेश) में हम निरंतर प्रार्थना और संगति के माध्यम से लोगों के आत्मिक जीवन को संवार रहे हैं।",
    "हमारा विश्वास है कि जो कोई प्रभु यीशु पर विश्वास करता है, वह कभी लज्जित नहीं होगा। प्रार्थना में अपार सामर्थ्य है। यदि आप किसी भी दुख, शारीरिक रोग या मानसिक अशांति से गुजर रहे हैं, तो हमारे पास प्रार्थना के लिए आएं।",
    "सप्रेम जय मसीह की — पास्टर रमेश कुमार, चेयरमैन एवं संस्थापक, RK MINISTRIES",
  ];
  const msgParagraphs: string[] = (founder?.paragraphs && founder.paragraphs.length > 0) ? founder.paragraphs : defaultParagraphs;
  const stats = (founder?.stats && founder.stats.length > 0) ? founder.stats : defaultStats;
  const mission = founder?.mission || "";
  const vision = founder?.vision || "";

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero
        title={tagText}
        accent={founderName}
        description={msgParagraphs[0] || "Spreading the Gospel of Jesus Christ, prayer, water baptism, and spiritual fellowship across Azamgarh, Uttar Pradesh."}
        image={heroBg}
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us", to: "/about" }, { label: tagText }]}
      />

      {/* Profile */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#F7F4EC] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

          {/* Section header — centered */}
          <div className="text-center mb-10 lg:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 text-orange px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wider">
              <Quote className="w-3.5 h-3.5" /> {tagText}
            </div>
            <h2 className="font-display font-extrabold text-navy text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.1] mt-4 max-w-3xl mx-auto">
              {msgTitle}
            </h2>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-[3px] w-6 rounded-full bg-orange/30" />
              <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-orange to-[#2E8B57]" />
              <div className="h-[3px] w-6 rounded-full bg-[#2E8B57]/30" />
            </div>
          </div>

          {/* Content grid */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* Photo card */}
            <div className="lg:col-span-4 flex flex-col items-center lg:sticky lg:top-28">
              <div className="relative w-full max-w-[360px] rounded-3xl bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-4 hover:shadow-[0_12px_50px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                {/* Top accent */}
                <div className="absolute top-0 left-10 right-10 h-[3px] rounded-b-full bg-gradient-to-r from-orange to-orange-2 opacity-70" />

                <div className="relative group">
                  {/* Decorative blobs */}
                  <div className="absolute -top-8 -left-8 w-28 h-28 rounded-full bg-orange/12 blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-navy/6 blur-3xl pointer-events-none" />

                  {/* Image */}
                  <div className="relative rounded-2xl overflow-hidden ring-1 ring-black/5 bg-slate-100">
                    <img
                      src={photo}
                      alt={`${founderName} - ${designation}`}
                      width={1024}
                      height={1280}
                      loading="lazy"
                      className="w-full h-[360px] sm:h-[420px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Bottom gradient overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1F3A]/95 via-[#0B1F3A]/60 to-transparent pt-16 pb-4 px-4 text-center">
                      <p className="text-[15px] font-bold text-amber-300">{founderName}</p>
                      <p className="text-[11px] uppercase tracking-[0.1em] text-white/90 font-medium">{designation}</p>
                    </div>
                  </div>
                </div>

                {/* Signature strip inside card */}
                <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#F7F4EC]/80 px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-sm text-white">
                    <FaCross className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#0A2540]">{founderName}</p>
                    <p className="text-[11px] text-slate-600 font-medium">{designation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message card */}
            <div className="lg:col-span-8">
              <div className="relative rounded-3xl bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-6 sm:p-8 lg:p-10 hover:shadow-[0_12px_50px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                {/* Top accent */}
                <div className="absolute top-0 left-10 right-10 h-[3px] rounded-b-full bg-gradient-to-r from-[#2E8B57] to-orange opacity-60" />

                {/* Large decorative quote */}
                <div className="hidden lg:block mb-3">
                  <Quote className="w-10 h-10 text-orange/15 rotate-180" />
                </div>

                {/* Paragraphs with timeline dots */}
                <div className="relative pl-6 sm:pl-8">
                  {/* Vertical line */}
                  <div className="absolute left-0 sm:left-2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-orange/40 via-orange/15 to-transparent rounded-full" />

                  <div className="space-y-5 text-justify">
                    {msgParagraphs.map((p, i) => (
                      <div key={i} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-6 sm:-left-8 top-1.5 flex items-center justify-center">
                          <div className={`w-3 h-3 rounded-full border-2 ${i === 0 ? 'bg-orange border-orange shadow-[0_0_8px_rgba(255,107,0,0.4)]' : 'bg-white border-orange/30'}`} />
                        </div>
                        <p className="text-text-2 leading-[1.85] text-[15px]">{p}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote callout */}
                {founder?.quote && (
                  <div className="mt-8 rounded-2xl bg-gradient-to-r from-orange/5 to-[#2E8B57]/5 border border-orange/10 px-6 py-5 flex items-start gap-3">
                    <Quote className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                    <p className="italic text-[15px] text-navy/80 font-medium leading-relaxed">{founder.quote}</p>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link to="/donate" className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-orange-2 to-orange text-white font-semibold px-7 py-3.5 shadow-lg shadow-orange/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange/30 transition-all duration-300">
                    <Heart className="w-4 h-4 fill-white" /> Support Our Mission
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#F7F4EC] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid sm:grid-cols-3 gap-5">
          {stats.map((s, i) => {
            const Icon = staticIcons[i % staticIcons.length];
            const val = s.value || s.label || '';
            const desc = s.desc || s.label || '';
            return (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition border border-border/60">
                <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-orange">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="mt-4 font-display font-extrabold text-navy text-2xl">{val}</div>
                <div className="text-text-muted text-[14px] mt-1">{desc}</div>
              </div>
            );
          })}
        </div>
      </section>





      <SiteFooter />
    </div>
  );
}
