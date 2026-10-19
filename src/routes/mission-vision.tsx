import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Target, Eye, Gem, Compass, ShieldCheck, Sparkles, Heart, HandHeart, CheckCircle2, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import { fetchHomeMission, fetchHomeVision } from "@/data/homepage";
import { getFullUrl } from "@/lib/api";
import heroBg from "@/assets/herosection/NariSashaktikaran.png";
import missionImg from "@/assets/Featured Projects/SakshamWomenProject.png";
import visionImg from "@/assets/Featured Projects/ShikshaSetuProject.png";

const values = [
  { icon: ShieldCheck, title: "Integrity", desc: "Honesty, transparency, and accountability in every action." },
  { icon: Heart, title: "Compassion", desc: "Deep care for every community, every woman, and every child." },
  { icon: HandHeart, title: "Empowerment", desc: "Enabling people to create change themselves, not only offering help." },
  { icon: Sparkles, title: "Excellence", desc: "Consistent effort toward measurable, lasting impact." },
  { icon: Compass, title: "Inclusivity", desc: "Equal respect and opportunity beyond caste, religion, or class." },
  { icon: Gem, title: "Sustainability", desc: "Long-term solutions that continue beyond any single program." },
];

const objectives = [
  "Quality education and skill training for underserved women and children",
  "Self-help groups aur entrepreneurship ke through rural livelihoods majboot karna",
  "Improve maternal, child, and adolescent health in remote villages",
  "Build awareness of women's rights, safety, and legal support",
  "Sustainable, community-led development ko aage badhana",
];

export default function MissionVisionPage() {
  useEffect(() => { document.title = "Mission & Vision — RK MINISTRIES | Azamgarh, U.P."; }, []);

  const [missionData, setMissionData] = useState<any>(null);
  const [visionData, setVisionData] = useState<any>(null);

  useEffect(() => {
    Promise.all([fetchHomeMission(), fetchHomeVision()]).then(([m, v]) => {
      setMissionData(m);
      setVisionData(v);
    });
  }, []);

  const mImg = missionData?.image ? getFullUrl(missionData.image) : missionImg;
  const mHeading = missionData?.heading || null;
  const mParagraphs = missionData?.paragraphs?.length > 0 ? missionData.paragraphs : null;
  const mHighlights = missionData?.highlights?.length > 0 ? missionData.highlights.map(h => h.title || h.description) : null;

  const vImg = visionData?.image ? getFullUrl(visionData.image) : visionImg;
  const vHeading = visionData?.heading || null;
  const vParagraphs = visionData?.paragraphs?.length > 0 ? visionData.paragraphs : null;
  const vHighlights = visionData?.highlights?.length > 0 ? visionData.highlights.map(h => h.title || h.description) : null;

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero
        title="Mission & Vision"
        description="Spreading the Gospel of Jesus Christ, prayer, water baptism, and spiritual hope across Azamgarh, Uttar Pradesh."
        image={heroBg}
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us", to: "/about" }, { label: "Mission & Vision" }]}
      />

      {/* Mission — image left, content card right */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute -top-24 right-0 font-display font-extrabold text-[120px] sm:text-[180px] text-amber-500/10 leading-none select-none pointer-events-none">
          Mission
        </div>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative rounded-[28px] overflow-hidden shadow-2xl aspect-[5/6]">
                <img src={mImg} alt="Our Mission" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/40">
                    <Heart className="w-4 h-4 fill-slate-950" /> Faith & Salvation
                  </span>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl bg-amber-500/15 -z-10" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-amber-500/10 -z-10" />
            </div>

            {/* Content Card */}
            <div className="relative bg-white rounded-[28px] shadow-xl border border-border/60 p-8 sm:p-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-800 font-bold uppercase tracking-wider text-[12px]">
                <Target className="w-3.5 h-3.5" /> Our Mission
              </div>
              <h2 className="font-display font-extrabold text-navy text-[28px] sm:text-[38px] leading-[1.15] mt-5">
                {mHeading || <>Gospel of Christ, <span className="text-amber-500">Baptism</span>, Prayer & Salvation</>}
              </h2>
              {(mParagraphs ? mParagraphs : [
                "The mission of RK MINISTRIES is to spread the Gospel of Jesus Christ, administer biblical water baptism, intercede in prayer for healing and deliverance, and nurture spiritual faith in every family.",
              ]).map((p, i) => (
                <p key={i} className="text-text-muted mt-5 leading-relaxed">{p}</p>
              ))}
              <div className="grid sm:grid-cols-2 gap-3 mt-7">
                {(mHighlights || [
                  "Water baptism according to scripture (Matthew 28:19)",
                  "Healing, deliverance and intercessory prayer fellowship",
                  "Village outreach and spreading hope in Azamgarh",
                  "Daily Bible reading and discipleship growth",
                ]).map((t, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-white p-4 hover:border-orange/50 hover:shadow-md transition">
                    <div className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-orange to-orange-2 flex items-center justify-center shadow-md shadow-orange/30">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-navy font-semibold text-[14px] leading-snug">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision — content card left, image right */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-[#FAFBFD]">
        <div className="absolute -top-24 left-0 font-display font-extrabold text-[120px] sm:text-[180px] text-orange/10 leading-none select-none pointer-events-none">
          Vision
        </div>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content Card — first on desktop */}
            <div className="relative bg-white rounded-[28px] shadow-xl border border-border/60 p-8 sm:p-10 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 text-orange font-bold uppercase tracking-wider text-[12px]">
                <Eye className="w-3.5 h-3.5" /> Our Vision
              </div>
              <h2 className="font-display font-extrabold text-navy text-[28px] sm:text-[38px] leading-[1.15] mt-5">
                {vHeading || <>A Society of <span className="text-orange">Equality</span>, Safety, and Purpose</>}
              </h2>
              {(vParagraphs ? vParagraphs : [
                "We envision an India where no girl is out of school, no woman is without work, and no community is left behind. It is a future where every woman moves forward with confidence and opportunity.",
              ]).map((p, i) => (
                <p key={i} className="text-text-muted mt-5 leading-relaxed">{p}</p>
              ))}
              <div className="grid sm:grid-cols-2 gap-3 mt-7">
                {(vHighlights || [
                  "Education for every girl, regardless of background",
                  "Safe and equal workplaces with equal pay for women",
                  "Women's leadership and grassroots leadership in every village",
                  "Samaan adhikaron aur avsaron ke saath samaveshi samaj",
                ]).map((t, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-white p-4 hover:border-orange/50 hover:shadow-md transition">
                    <div className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-orange to-orange-2 flex items-center justify-center shadow-md shadow-orange/30">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-navy font-semibold text-[14px] leading-snug">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative lg:order-2">
              <div className="relative rounded-[28px] overflow-hidden shadow-2xl aspect-[5/6]">
                <img src={vImg} alt="Our Vision" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange to-orange-2 text-white font-semibold shadow-lg shadow-orange/40">
                    <Sparkles className="w-4 h-4" /> A Brighter Tomorrow
                  </span>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-orange/15 -z-10" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-orange/10 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Objectives — horizontal stepped timeline */}
      <section className="relative py-16 sm:py-24 bg-navy overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-orange font-bold uppercase tracking-wider text-[12px] border border-white/10">
              <Compass className="w-3.5 h-3.5" /> Strategic Objectives
            </div>
            <h2 className="font-display font-extrabold text-white text-[28px] sm:text-[38px] leading-tight mt-4">
              What we do, <span className="text-orange">every day.</span>
            </h2>
            <p className="text-white/70 mt-4">
              Our mission translates into focused, measurable objectives rooted in the real needs of every woman and community.
            </p>
          </div>

          {/* Desktop: horizontal connected timeline */}
          <div className="hidden lg:block">
            <div className="flex items-stretch justify-between gap-0 relative">
              {/* Connecting line */}
              <div className="absolute top-[26px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-orange/40 via-orange to-orange/40" />
              {objectives.map((o, i) => (
                <div key={o} className="relative flex flex-col items-center text-center z-10" style={{ width: '18%' }}>
                  <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-orange to-orange-2 flex items-center justify-center font-display font-extrabold text-white text-[15px] shadow-lg shadow-orange/40 ring-4 ring-navy">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition">
                    <CheckCircle2 className="w-5 h-5 text-orange mx-auto mb-3" />
                    <p className="text-white/90 font-semibold text-[13px] leading-relaxed">{o}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tablet & Mobile: vertical stepped list */}
          <div className="lg:hidden space-y-0">
            {objectives.map((o, i) => (
              <div key={o} className="relative flex gap-5">
                {/* Timeline bar */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange to-orange-2 flex items-center justify-center font-display font-extrabold text-white text-[13px] shadow-md shadow-orange/30 shrink-0 z-10">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {i < objectives.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-orange/60 to-transparent mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-orange" />
                      <span className="text-orange font-bold text-[11px] uppercase tracking-wider">Objective {String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <p className="text-white/90 font-semibold text-[14px] leading-relaxed">{o}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Values */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-orange font-semibold uppercase tracking-wider text-[12px]">Our Core Values</div>
            <h2 className="font-display font-extrabold text-navy text-[30px] sm:text-[40px] mt-2 leading-tight">
              The principles behind every program.
            </h2>
            <p className="text-text-muted mt-4">Six guiding values that shape how we listen, design, deliver and grow.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group relative bg-white rounded-2xl p-6 border border-border/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-orange/5 group-hover:bg-orange/10 transition" />
                <div className="relative w-12 h-12 rounded-xl bg-navy text-white flex items-center justify-center group-hover:bg-orange transition">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="relative font-display font-bold text-navy text-xl mt-5">{title}</h3>
                <p className="relative text-text-muted text-[14px] mt-2 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[28px] bg-navy text-white p-10 sm:p-14 text-center">
            <div className="absolute -top-16 -left-16 w-72 h-72 bg-orange/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-orange/10 blur-3xl rounded-full" />
            <div className="relative">
              <h3 className="font-display font-extrabold text-[26px] sm:text-[34px] leading-tight">Be part of the change you want to see.</h3>
              <p className="text-white/80 mt-3 max-w-xl mx-auto">Support a program, sponsor a girl's education or volunteer your time — every action makes our mission real.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-2 to-orange text-white font-semibold px-6 py-3 shadow-lg shadow-orange/30 hover:-translate-y-0.5 transition">
                  <Heart className="w-4 h-4 fill-white" /> Donate Now
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 text-white font-semibold px-6 py-3 hover:bg-white hover:text-navy transition">
                  Become a Volunteer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
