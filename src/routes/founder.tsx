import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Award, HandHeart, Sparkles, Heart, Quote, ArrowRight } from "lucide-react";
import { FaCross } from "react-icons/fa6";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import heroBg from "@/assets/breadcrume/breadcrume-logo.png";
import logoImage from "@/assets/logo/rk-logo.png";
import { fetchHomeFounder } from "@/data/homepage";

const defaultStats = [
  { icon: Award, label: "27+ Years", desc: "Of dedicated service to women & rural communities" },
  { icon: HandHeart, label: "25,000+ Lives", desc: "Touched through grassroots programs" },
  { icon: Sparkles, label: "500+ Villages", desc: "Reached across Uttar Pradesh & beyond" },
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

  const designation = "Chairman & Pastor";
  const photo = logoImage;
  const msgTitle = "प्रभु यीशु मसीह के सुसमाचार, प्रार्थना और सेवा का जीवंत संकल्प।";
  const msgParagraphs: string[] = [];
  msgParagraphs.push("आरके मिनिस्ट्रीज (RK MINISTRIES) में आपका हार्दिक स्वागत करते हुए मुझे असीम हर्ष हो रहा है।");
  msgParagraphs.push("हमारा एकमात्र उद्देश्य प्रभु यीशु मसीह के प्रेम, क्षमा, जल बपतिस्मा और उद्धार के वचन को प्रत्येक जन तक पहुँचाना है। मुस्तफाबाद, मुबारकपुर, आज़मगढ़ (उत्तर प्रदेश) में हम निरंतर प्रार्थना और संगति के माध्यम से लोगों के आत्मिक जीवन को संवार रहे हैं।");
  msgParagraphs.push("हमारा विश्वास है कि जो कोई प्रभु यीशु पर विश्वास करता है, वह कभी लज्जित नहीं होगा। प्रार्थना में अपार सामर्थ्य है। यदि आप किसी भी दुख, शारीरिक रोग या मानसिक अशांति से गुजर रहे हैं, तो हमारे पास प्रार्थना के लिए आएं।");
  msgParagraphs.push("सप्रेम जय मसीह की — पास्टर रमेश कुमार, चेयरमैन एवं संस्थापक, RK MINISTRIES");
  const stats = founder?.stats?.length > 0 ? founder.stats : defaultStats;
  const mission = founder?.mission || "";
  const vision = founder?.vision || "";

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero
        title="Meet Our Chairman"
        accent="Pastor Ramesh Kumar"
        description="Spreading the Gospel of Jesus Christ, prayer, water baptism, and spiritual fellowship across Azamgarh, Uttar Pradesh."
        image={heroBg}
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us", to: "/about" }, { label: "Chairman & Pastor" }]}
      />

      {/* Profile */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#F7F4EC] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

          {/* Section header — centered */}
          <div className="text-center mb-10 lg:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 text-orange px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wider">
              <Quote className="w-3.5 h-3.5" /> A Word From The Founder
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
                  <div className="relative rounded-2xl overflow-hidden ring-1 ring-black/5">
                    <img
                      src={photo}
                      alt="RK MINISTRIES Logo"
                      width={1024}
                      height={1280}
                      loading="lazy"
                      className="w-full h-[340px] sm:h-[400px] object-contain bg-white p-8 transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Bottom gradient overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent pt-16 pb-4 px-4">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-orange-2 font-semibold">{designation}</p>
                    </div>
                  </div>
                </div>

                {/* Signature strip inside card */}
                <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#F7F4EC]/80 px-4 py-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-sm text-white">
                    <FaCross className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#0A2540]">Pastor Ramesh Kumar (Chairman)</p>
                    <p className="text-[10px] text-slate-500">RK MINISTRIES, आज़मगढ़</p>
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

      {/* Mission & Vision */}
      {(mission || vision) && (
        <section className="py-14 bg-white">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8">
            {mission && (
              <div className="bg-[#F7F4EC] rounded-2xl p-8">
                <h3 className="font-display font-extrabold text-navy text-2xl">Our Mission</h3>
                <p className="mt-3 text-text-muted leading-relaxed">{mission}</p>
              </div>
            )}
            {vision && (
              <div className="bg-[#FFF7F0] rounded-2xl p-8">
                <h3 className="font-display font-extrabold text-navy text-2xl">Our Vision</h3>
                <p className="mt-3 text-text-muted leading-relaxed">{vision}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Journey */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="text-orange font-semibold uppercase tracking-wider text-[12px]">The Journey</div>
            <h2 className="font-display font-extrabold text-navy text-[30px] sm:text-[40px] mt-2">Milestones of a Lifetime</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange/10 via-orange/40 to-orange/10 md:-translate-x-1/2" />
            <div className="space-y-8 md:space-y-14">
              {journey.map((j, i) => {
                const left = i % 2 === 0;
                return (
                  <div key={j.year} className="relative md:grid md:grid-cols-2 md:gap-10 items-center">
                    <div className="absolute left-4 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-5 h-5 rounded-full bg-white border-4 border-orange shadow-[0_0_0_6px_rgba(255,107,0,0.12)] z-10" />
                    <div className={`pl-12 md:pl-0 ${left ? "md:pr-12 md:text-right md:col-start-1" : "md:pl-12 md:col-start-2"}`}>
                      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition border border-border/60 hover:-translate-y-0.5">
                        <div className={`flex items-center gap-2 ${left ? "md:justify-end" : ""}`}>
                          <span className="inline-block bg-orange/10 text-orange font-bold px-3 py-1 rounded-full text-[12px] tracking-wider">{j.year}</span>
                        </div>
                        <h3 className="font-display font-bold text-navy text-xl mt-3">{j.title}</h3>
                        <p className="text-text-muted text-[14px] mt-2 leading-relaxed">{j.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
