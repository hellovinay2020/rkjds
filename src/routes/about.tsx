import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart, Linkedin, Twitter, ArrowRight, Quote } from "lucide-react";
import { FaCross } from "react-icons/fa6";
import api, { getFullUrl } from "@/lib/api";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import { fetchHomeAbout, fetchHomeFounder } from "@/data/homepage";
import worshipBanner from "@/assets/about/R.K. Ministries Sunrise Worship Banner.png";
import heroBg from "@/assets/breadcrume/breadcrume-logo.png";
import rameshChairmanImg from "@/assets/Teams/Trustee Chairman Ramesh Kumar.jpeg";

async function fetchArray(url: string) {
  try {
    const { data } = await api.get(url);
    const items = data?.data || data || [];
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

const accentColors = ['#D97706', '#0A2540', '#1E3A8A', '#059669', '#4F46E5', '#DC2626', '#16A34A', '#7C3AED'];

export default function AboutPage() {
  const [loaderData, setLoaderData] = useState<{ team: any[]; about: any; founder: any }>({ team: [], about: null, founder: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "About Us — RK MINISTRIES | Church & Fellowship";
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const [teamMembers, aboutData, founderData] = await Promise.all([
          fetchArray('/team'),
          fetchHomeAbout(),
          fetchHomeFounder(),
        ]);
        setLoaderData({ team: teamMembers, about: aboutData, founder: founderData });
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <Preloader />;

  const { team, about, founder } = loaderData;
  const mainImg = about?.mainImage ? getFullUrl(about.mainImage) : (about?.images && about.images[0] ? getFullUrl(about.images[0]) : worshipBanner);
  const heading = about?.heading || "RK MINISTRIES – Spreading Faith, Hope & Salvation";
  const eyebrow = about?.eyebrow || "About Our Fellowship";
  const impactTitle = about?.impactTitle || "Our Impact";
  const impactSubtitle = about?.impactSubtitle || "Grassroots Change, One Life at a Time";
  const paragraphs = (about && about.paragraphs?.length > 0) ? about.paragraphs : [
    "RK MINISTRIES (आरके मिनिस्ट्रीज) गाँव मुस्तफाबाद, मुबारकपुर, आज़मगढ़ (उत्तर प्रदेश) में स्थित प्रभु यीशु मसीह की एक सक्रिय कलीसियाई संगति है। हमारा ध्येय सुसमाचार का प्रचार, जल बपतिस्मा, रोगियों के लिए चंगाई प्रार्थना, और आत्मिक व सामाजिक उत्थान करना है।",
    "हमारा विश्वास है कि प्रभु यीशु मसीह के प्रेम और अनुग्रह से हर टूटा हुआ हृदय चंगाई प्राप्त कर सकता है। गाँव-गाँव में प्रार्थना सभाओं, कुटीर संगति और बाइबिल अध्ययन द्वारा हम जीवन में नई आशा का संचार करते हैं।",
  ];
  const statsList = (about?.stats && about.stats.length > 0) ? about.stats : [
    { num: "10+", label: "Years Active" },
    { num: "50K+", label: "Lives Touched" },
    { num: "25+", label: "Programs Run" },
  ];

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />

      <PageHero
        title={about?.title || "About"}
        accent="RK MINISTRIES"
        description={paragraphs[0] || "Spreading the Gospel of Jesus Christ, prayer, water baptism, and spiritual fellowship in Azamgarh, U.P."}
        image={heroBg}
        eyebrow="Who We Are"
        crumbs={[{ label: "Home", to: "/" }, { label: about?.breadcrumbTitle || "About Us" }]}
      />

      {/* ── ABOUT OUR FELLOWSHIP SECTION (Exact same as Homepage) ─────────── */}
      <section className="py-12 sm:py-16 lg:py-20 text-justify bg-[linear-gradient(120deg,rgba(19,110,17,0.08),rgba(236,102,17,0.06),rgba(2,40,87,0.08))] overflow-hidden">
        {/* Top: Image + Text */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Image col */}
            <div className="relative group">
              {/* Decorative blobs */}
              <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-[rgba(19,110,17,0.10)] blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-[rgba(236,102,17,0.10)] blur-2xl pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
                <img
                  src={mainImg}
                  alt="About RK MINISTRIES"
                  className="w-full h-[280px] sm:h-[360px] lg:h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2E8B57] to-[#1a6035] flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] text-text-2 font-medium uppercase tracking-wide">{impactTitle}</p>
                    <p className="text-[13px] font-bold text-navy leading-tight">{impactSubtitle}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text col */}
            <div className="flex flex-col">
              <div className="eyebrow">{eyebrow}</div>
              <h2 className="section-title mt-2 text-left">
                {heading}
              </h2>

              {/* Divider accent */}
              <div className="mt-4 flex items-center gap-2">
                <div className="h-[3px] w-10 rounded-full bg-gradient-to-r from-amber-500 to-[#1E3A8A]" />
                <div className="h-[3px] w-4 rounded-full bg-amber-500/30" />
              </div>

              <div className="mt-4 space-y-3">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-text-2 leading-[1.8] text-[15px]">{p}</p>
                ))}
              </div>

              {/* Quick-stats row */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {statsList.map((s: any, idx: number) => (
                  <div key={idx} className="text-center rounded-2xl py-4 px-2 bg-white/60 backdrop-blur-sm border border-white/70 shadow-sm">
                    <p className="text-[20px] font-extrabold bg-gradient-to-r from-[#0B1F3A] to-[#1E40AF] bg-clip-text text-transparent leading-tight">{s.num || s.value}</p>
                    <p className="text-[11px] text-text-2 font-medium mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/member-registration" className="btn-orange inline-flex items-center gap-2">
                  Join Fellowship <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/prayer-request" className="px-5 py-2.5 rounded-full border border-navy/20 hover:border-navy text-navy font-semibold text-sm transition-colors inline-flex items-center gap-2">
                  Prayer Request
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Highlights / Experience Counter ───────────────────────── */}
        {(about && (about.highlights?.length > 0 || about.expNumber)) && (
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-14 grid md:grid-cols-2 gap-6">
            {about.highlights?.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {about.highlights.map((h: any, i: number) => (
                  <div key={i} className="card-soft p-5 text-center hover:shadow-md transition-shadow duration-300">
                    {h.icon && <i className={`${h.icon} text-2xl text-orange`} />}
                    <h3 className="mt-3 text-[15px] font-bold text-navy">{h.title}</h3>
                    {h.description && <p className="mt-1 text-text-2 text-[12px] leading-relaxed">{h.description}</p>}
                  </div>
                ))}
              </div>
            )}
            {about.expNumber && (
              <div className="bg-gradient-to-br from-orange to-orange-2 rounded-3xl p-8 flex flex-col items-center justify-center text-white shadow-xl">
                <span className="text-6xl font-extrabold font-display drop-shadow">{about.expNumber}</span>
                <span className="mt-2 text-lg font-semibold opacity-90 tracking-wide">{about.expLabel || 'Years of Experience'}</span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── FOUNDER / CHAIRMAN MESSAGE SECTION ───────────────────────── */}
      {(() => {
        const f = founder;
        const designation = f?.designation || "संस्थापक एवं ट्रस्टी अध्यक्ष (Founder Chairman & Pastor)";
        const founderName = f?.name || "पास्टर रमेश कुमार";
        const photo = f?.photo ? getFullUrl(f.photo) : rameshChairmanImg;
        const msgTitle = f?.title || "सेवा, समर्पण और सुसमाचार — जीवन बदलने वाली आत्मिक आशीष।";
        const tagText = f?.tag || "पास्टर संदेश (Message from Chairman)";
        const defaultParas = [
          "आरके मिनिस्ट्रीज (RK MINISTRIES) में आपका हार्दिक स्वागत करते हुए मुझे असीम आनंद हो रहा है।",
          "हमारा ध्येय प्रभु यीशु मसीह के प्रेम, चंगाई, जल बपतिस्मा और उद्धार के संदेश को हर गाँव, हर परिवार तक पहुँचाना है। मुस्तफाबाद, मुबारकपुर, आज़मगढ़ (उ.प्र.) से संचालित यह आत्मिक सेवा आज अनेक जीवनों में शांति और नया जीवन ला रही है।",
          "यदि आप किसी भी बीमारी, पारिवारिक क्लेश या आत्मिक संकट में हैं, तो हमारी प्रार्थना टीम आपके साथ खड़ी है। आइए, विश्वास के साथ मिलकर प्रभु की स्तुति करें।",
          "सप्रेम जय मसीह की — पास्टर रमेश कुमार, चेयरमैन, RK MINISTRIES"
        ];
        const msgParagraphs: string[] = (f?.paragraphs && f.paragraphs.length > 0) ? f.paragraphs : defaultParas;
        return (
          <section className="py-12 sm:py-16 lg:py-20 bg-[#F7F4EC] overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

              {/* Section header — centered */}
              <div className="text-center mb-10 lg:mb-14">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 text-amber-800 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wider">
                  <Quote className="w-3.5 h-3.5" /> {tagText}
                </div>
                <h2 className="font-display font-extrabold text-navy text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.1] mt-4 max-w-3xl mx-auto">
                  {msgTitle}
                </h2>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="h-[3px] w-6 rounded-full bg-amber-500/30" />
                  <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-amber-500 to-[#1E3A8A]" />
                  <div className="h-[3px] w-6 rounded-full bg-amber-500/30" />
                </div>
              </div>

              {/* Content grid */}
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">

                {/* Photo card */}
                <div className="lg:col-span-4 flex flex-col items-center lg:sticky lg:top-28">
                  <div className="relative w-full max-w-[360px] rounded-3xl bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-4 hover:shadow-[0_12px_50px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                    {/* Top accent */}
                    <div className="absolute top-0 left-10 right-10 h-[3px] rounded-b-full bg-gradient-to-r from-amber-500 to-amber-600 opacity-70" />

                    <div className="relative group">
                      {/* Decorative blobs */}
                      <div className="absolute -top-8 -left-8 w-28 h-28 rounded-full bg-amber-500/12 blur-2xl pointer-events-none" />
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
                    {f?.quote && (
                      <div className="mt-8 rounded-2xl bg-gradient-to-r from-orange/5 to-[#2E8B57]/5 border border-orange/10 px-6 py-5 flex items-start gap-3">
                        <Quote className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                        <p className="italic text-[15px] text-navy/80 font-medium leading-relaxed">{f.quote}</p>
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <Link to="/donate" className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-orange-2 to-orange text-white font-semibold px-7 py-3.5 shadow-lg shadow-orange/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange/30 transition-all duration-300">
                        <Heart className="w-4 h-4 fill-white" /> Support Our Mission
                      </Link>
                      <Link to="/founder" className="group inline-flex items-center gap-2 rounded-full border-2 border-navy/12 bg-[#F7F4EC]/60 text-navy font-semibold px-7 py-3.5 hover:border-orange hover:text-orange hover:bg-white transition-all duration-300">
                        Read Full Message <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── TEAM SECTION ──────────────────────────────────────────────── */}
      {team.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-secondary/40">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="text-center">
              <div className="inline-block relative">
                <span className="eyebrow italic tracking-[0.25em]">TEAM MEMBER</span>
                <span className="block h-[2px] w-12 bg-orange mx-auto mt-1.5 rounded-full" />
              </div>
              <h2 className="section-title mt-3">
                Our <span className="text-orange">Team Members</span>
              </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {team.map((t: any, i: number) => {
                const accent = accentColors[i % accentColors.length];
                return (
                  <div key={t._id || i} className="group flex flex-col h-full bg-white rounded-[24px] overflow-hidden border border-slate-100 hover:border-orange/20 shadow-[0_4px_20px_rgba(11,31,58,0.03)] hover:shadow-[0_20px_40px_rgba(11,31,58,0.08)] transition-all duration-500 hover:-translate-y-2">
                    <div className="relative overflow-hidden aspect-[4/5]">
                      <img
                        src={getFullUrl(t.photo) || ''}
                        alt={t.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                        <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                          {(t.socialLinks?.linkedin || t.socialLinks?.twitter || t.socialLinks?.facebook || t.socialLinks?.instagram) && (
                            <>
                              {t.socialLinks?.linkedin && (
                                <a href={t.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF6B00] backdrop-blur-md flex items-center justify-center text-white transition-colors duration-300">
                                  <Linkedin className="w-4 h-4" />
                                </a>
                              )}
                              {t.socialLinks?.twitter && (
                                <a href={t.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF6B00] backdrop-blur-md flex items-center justify-center text-white transition-colors duration-300">
                                  <Twitter className="w-4 h-4" />
                                </a>
                              )}
                              {t.socialLinks?.facebook && (
                                <a href={t.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF6B00] backdrop-blur-md flex items-center justify-center text-white transition-colors duration-300">
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                </a>
                              )}
                              {t.socialLinks?.instagram && (
                                <a href={t.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF6B00] backdrop-blur-md flex items-center justify-center text-white transition-colors duration-300">
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                                </a>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <span className="absolute top-4 right-4 text-[10px] font-bold font-display px-3 py-1.5 rounded-full backdrop-blur-md text-white bg-black/40 tracking-wider uppercase">
                        Member
                      </span>
                    </div>

                    <div className="p-6 text-center flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[#0B1F3A] font-extrabold font-display text-[19px] group-hover:text-[#FF6B00] transition-colors duration-300">{t.name}</h3>
                        <span className="inline-block mt-2 text-[12px] font-bold px-3.5 py-1 rounded-full font-display uppercase tracking-wider" style={{ color: accent, backgroundColor: `${accent}15` }}>
                          {t.role}
                        </span>
                      </div>
                      <div className="w-8 h-[3px] rounded-full mx-auto mt-4 transition-all duration-500 group-hover:w-16" style={{ backgroundColor: accent }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
