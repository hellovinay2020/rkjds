import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Target, Eye, Gem, ShieldCheck, Users, Heart, Award, HandHeart, CheckCircle2, Linkedin, Twitter, Mail, Flag, GraduationCap, HeartPulse, Sparkles, Smile } from "lucide-react";
import api, { getFullUrl } from "@/lib/api";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import { fetchHomeAbout } from "@/data/homepage";
import worshipBanner from "@/assets/about/R.K. Ministries Sunrise Worship Banner.png";
import heroBg from "@/assets/herosection/NariSashaktikaran.png";

async function fetchArray(url: string) {
  try {
    const { data } = await api.get(url);
    const items = data?.data || data || [];
    return Array.isArray(items) ? items : [];
  } catch { return []; }
}

const pillars = [
  { icon: Target, title: "Our Mission", color: "#2E8B57", bg: "#E8F5EE", desc: "Bring education, support, and safety to every woman and community so they can become self-reliant and empowered." },
  { icon: Eye, title: "Our Vision", color: "#FF6B00", bg: "#FFF1E5", desc: "Build a society where every person has equal opportunity, safety, and a path to a better life." },
  { icon: Gem, title: "Our Values", color: "#2563EB", bg: "#E6EEFB", desc: "Empowerment, integrity, compassion, transparency, accountability, and inclusiveness in every action." },
];

const milestones = [
  { year: "2015", title: "कलीसिया स्थापना (Foundation)", desc: "RK MINISTRIES began prayer and fellowship in Mustafabad, Mubarakpur, Azamgarh.", icon: Flag, bg: "bg-amber-50 text-amber-700 border-amber-200" },
  { year: "2018", title: "जल बपतिस्मा सेवा (Holy Baptism)", desc: "Over 100+ believers baptized in accordance with Matthew 28:19.", icon: GraduationCap, bg: "bg-blue-50 text-blue-700 border-blue-200" },
  { year: "2021", title: "चंगाई व उपवास प्रार्थना (Healing Ministry)", desc: "Friday fasting and miracle healing prayers started across 50+ villages.", icon: HeartPulse, bg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { year: "2024", title: "डिजिटल सदस्य पोर्टल (Online Portals)", desc: "Digital Membership cards, online baptism tracking and reports launched.", icon: Sparkles, bg: "bg-purple-50 text-purple-700 border-purple-200" },
  { year: "2026", title: "सुसमाचार विस्तार (Gospel Expansion)", desc: "Spreading the love of Christ to thousands of families across Purvanchal.", icon: Smile, bg: "bg-rose-50 text-rose-700 border-rose-200" },
];

const accentColors = ['#D97706', '#0A2540', '#1E3A8A', '#059669', '#4F46E5', '#DC2626', '#16A34A', '#7C3AED'];

export default function AboutPage() {
  const [loaderData, setLoaderData] = useState<{ team: any[], about: any }>({ team: [], about: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "About Us — RK MINISTRIES | Church & Fellowship";
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const [teamMembers, aboutData] = await Promise.all([
          fetchArray('/team'),
          fetchHomeAbout(),
        ]);
        setLoaderData({ team: teamMembers, about: aboutData });
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <Preloader />;

  const { team, about } = loaderData;
  const mainImg = worshipBanner;
  const heading = about?.heading || "Driven by Faith, Committed to the Gospel";
  const paragraphs = about?.paragraphs?.length > 0 ? about.paragraphs : [
    "RK MINISTRIES (आरके मिनिस्ट्रीज) गाँव मुस्तफाबाद, मुबारकपुर, आज़मगढ़ (उत्तर प्रदेश) में स्थापित प्रभु यीशु मसीह की एक प्रार्थना एवं सुसमाचार कलीसियाई संगति है। हम विश्वास करते हैं कि जब लोग मसीह के प्रेम में आते हैं, तो उनका संपूर्ण जीवन बदल जाता है।",
    "हमारी कलीसिया नियमित रविवार आराधना, शुक्रवार उपवास प्रार्थना, जल बपतिस्मा और जरूरतमंदों की सेवा के माध्यम से ग्रामीण क्षेत्रों में आशा का संचार कर रही है।",
  ];
  const highlights = about?.highlights?.length > 0 ? about.highlights : [
    { icon: "bi-check-circle-fill", title: "Holy Baptism Sacraments", description: "" },
    { icon: "bi-check-circle-fill", title: "Sunday Fellowship & Prayer", description: "" },
    { icon: "bi-check-circle-fill", title: "Village & Cottage Prayer Meetings", description: "" },
    { icon: "bi-check-circle-fill", title: "Spiritual Guidance & Bible Study", description: "" },
  ];

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero
        title="About"
        accent="RK MINISTRIES"
        description="Spreading the Gospel of Jesus Christ, prayer, water baptism, and spiritual fellowship in Azamgarh, U.P."
        image={heroBg}
        eyebrow="Who We Are"
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
      />

      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <img src={worshipBanner} alt="About RK MINISTRIES" className="w-full h-[260px] sm:h-[340px] lg:h-[440px] object-cover transition-transform duration-700 hover:scale-105" />
          </div>
          <div>
            <div className="eyebrow">Our Story</div>
            <h2 className="section-title mt-2">{heading}</h2>
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "mt-5 text-text-2 leading-relaxed" : "mt-4 text-text-2 leading-relaxed"}>{p}</p>
            ))}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-[14px] text-navy font-medium">
                  <CheckCircle2 className="w-5 h-5 text-orange shrink-0 mt-0.5" />{h.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="eyebrow">What Drives Us</div>
            <h2 className="section-title mt-2">Humara Mission, Vision & Values</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="card-soft card-soft-hover p-7">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: p.bg, color: p.color }}>
                  <p.icon className="w-7 h-7" />
                </div>
                <h3 className="mt-5 text-[20px] font-bold text-navy font-display">{p.title}</h3>
                <p className="mt-2 text-text-2 leading-relaxed text-[14px]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-secondary/30 relative overflow-hidden">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block relative">
              <span className="eyebrow italic tracking-[0.25em]">OUR JOURNEY</span>
              <span className="block h-[2px] w-12 bg-orange mx-auto mt-1.5 rounded-full" />
            </div>
            <h2 className="section-title mt-3">Milestones That Shape Us</h2>
            <p className="mt-4 text-text-2 max-w-2xl mx-auto text-[15px]">
              From a small beginning to nationwide work, our journey is rooted in empowerment, education, and social change.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[3px] bg-slate-200 -translate-x-1/2" />
            <div className="space-y-12 relative">
              {milestones.map((m, idx) => {
                const Icon = m.icon;
                return (
                  <div key={m.year} className="relative flex flex-col md:flex-row items-stretch md:justify-between">
                    <div className={`hidden md:flex md:w-[calc(50%-40px)] items-center justify-end ${idx % 2 === 0 ? "order-1" : "order-3 opacity-0 pointer-events-none"}`}>
                      {idx % 2 === 0 && (
                        <div className="w-full text-right pr-6">
                          <span className="text-[52px] font-extrabold text-slate-200/80 font-display select-none">{m.year}</span>
                        </div>
                      )}
                    </div>

                    <div className="absolute left-[30px] md:left-1/2 w-12 h-12 rounded-full border-4 border-white shadow-md flex items-center justify-center -translate-x-1/2 z-20 order-2 bg-white transition-all duration-300 group-hover:scale-110">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${m.bg.split(' ')[0]} ${m.bg.split(' ')[1]}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className={`pl-[70px] md:pl-0 md:w-[calc(50%-40px)] flex items-center order-3 ${idx % 2 === 1 ? "md:order-1" : "md:order-3"}`}>
                      <div className="w-full group bg-white p-7 rounded-[24px] border border-slate-100 hover:border-orange/20 shadow-[0_4px_20px_rgba(11,31,58,0.03)] hover:shadow-[0_20px_40px_rgba(11,31,58,0.08)] transition-all duration-500 hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-orange font-extrabold text-[22px] font-display">{m.year}</span>
                          <span className="text-[12px] font-bold text-slate-400 font-display uppercase tracking-wider md:hidden">Milestone</span>
                          {idx % 2 === 1 && (
                            <span className="hidden md:inline-block text-[12px] font-bold text-slate-400 font-display uppercase tracking-wider">Milestone</span>
                          )}
                        </div>
                        <h3 className="text-navy font-bold text-[19px] group-hover:text-orange transition-colors duration-300">{m.title}</h3>
                        <p className="text-text-2 text-[14px] leading-relaxed mt-2">{m.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {team.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-secondary/40">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="text-center">
              <div className="inline-block relative">
                <span className="eyebrow italic tracking-[0.25em]">TEAM MEMBER</span>
                <span className="block h-[2px] w-12 bg-orange mx-auto mt-1.5 rounded-full" />
              </div>
              <h2 className="section-title mt-3">
                Our <span className="text-orange">Team Member</span>
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

      <section className="py-14 bg-gradient-to-r from-[#0B1F3A] to-[#102E5A] text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-extrabold text-[26px] sm:text-[30px]">Be Part of the Badlaav</h3>
            <p className="text-white/75 mt-2">Become a volunteer or member and help build stronger communities.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/donate" className="btn-orange"><Heart className="w-4 h-4" /> Donate Now</Link>
            <Link to="/contact" className="bg-white text-navy rounded-[14px] px-5 py-3 font-semibold inline-flex items-center gap-2 hover:bg-secondary"><HandHeart className="w-4 h-4 text-orange" /> Become Volunteer</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
