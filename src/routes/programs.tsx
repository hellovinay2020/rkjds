import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api, { getFullUrl } from "@/lib/api";
import { HandHeart, BookOpen, HeartPulse, GraduationCap, Leaf, Scale, ArrowRight, Users, Home as HomeIcon, Award, type LucideIcon } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import heroBg from "@/assets/herosection/NariSashaktikaran.png";
import story1 from "@/assets/story-1.jpg";

const iconMap: Record<string, LucideIcon> = {
  handheart: HandHeart, bookopen: BookOpen, heartpulse: HeartPulse,
  graduationcap: GraduationCap, leaf: Leaf, scale: Scale,
  users: Users, home: HomeIcon, award: Award,
};

function getIcon(name?: string): LucideIcon {
  return iconMap[name?.toLowerCase().replace(/[^a-z]/g, '') || ''] || HandHeart;
}

const iconColors = ['#EC4899', '#16A34A', '#7C3AED', '#FF6B00', '#2563EB', '#0F766E', '#B45309', '#0EA5E9'];
const iconBgs = ['#FCE7F3', '#E8F7EE', '#F1EAFE', '#FFF1E5', '#E6EEFB', '#CCFBF1', '#FEF3C7', '#E0F4FD'];
const statColors = ['#EC4899', '#16A34A', '#7C3AED'];

async function fetchArray(url: string) {
  try {
    const { data } = await api.get(url);
    const items = data?.data || data || [];
    return Array.isArray(items) ? items : [];
  } catch { return []; }
}

export default function ProgramsPage() {
  const [loaderData, setLoaderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Our Programs — Mahila Chetna Samiti ";
    async function load() {
      try {
        const [allPrograms, counters] = await Promise.all([
          fetchArray('/programs'),
          fetchArray('/counters'),
        ]);
        setLoaderData({
          programs: allPrograms,
          stats: counters.map((c: any) => ({
            icon: getIcon(c.icon || ''),
            num: c.number || '0',
            label: c.label || '',
            color: iconColors[allPrograms.indexOf(c) % iconColors.length],
            bg: iconBgs[allPrograms.indexOf(c) % iconBgs.length],
          })),
        });
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <Preloader />;

  const { programs, stats } = loaderData;
  const focusAreas = programs.filter((p: any) => p.icon);
  const featured = programs.filter((p: any) => p.image);

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero
        title="Our Programs"
        accent="Empowering Lives."
        description="Our programs for education, support, and safety create meaningful change in communities."
        image={heroBg}
        crumbs={[{ label: "Home", to: "/" }, { label: "Programs" }]}
      />

      {focusAreas.length > 0 && (
        <section className="py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="text-center">
              <div className="eyebrow">What We Do</div>
              <h2 className="section-title mt-2">Hamare Focus Areas</h2>
            </div>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {focusAreas.map((p: any, i: number) => {
                const Icon = getIcon(p.icon);
                const color = iconColors[i % iconColors.length];
                const bg = iconBgs[i % iconBgs.length];
                return (
                  <div key={p._id || i} className="card-soft card-soft-hover p-7 text-center">
                    <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center" style={{ background: bg, color }}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="mt-5 text-[18px] font-bold text-navy font-display">{p.title}</h3>
                    <p className="mt-2 text-text-2 text-[14px] leading-relaxed">{p.description}</p>
                    <Link to="/programs" className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold" style={{ color }}>
                      Explore Programs <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="py-16 bg-secondary/50">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="text-center">
              <div className="eyebrow">Highlights</div>
              <h2 className="section-title mt-2">Khaas Karyakram</h2>
            </div>
            <div className="mt-10 grid lg:grid-cols-3 gap-6">
              {featured.map((p: any, i: number) => (
                <div key={p._id || i} className="card-soft card-soft-hover overflow-hidden">
                  {getFullUrl(p.image) && (
                    <img src={getFullUrl(p.image)} alt={p.title} className="w-full h-[220px] object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-navy font-bold text-[18px] font-display">{p.title}</h3>
                    <p className="mt-2 text-text-2 text-[14px] leading-relaxed">{p.description}</p>
                    {p.features?.length > 0 && (
                      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                        {p.features.map((f: string, fi: number) => (
                          <div key={fi}>
                            <div className="font-extrabold text-navy font-display">{f}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    <button className="mt-6 w-full border-2 rounded-[12px] py-2.5 font-semibold text-[14px] hover:bg-secondary transition" style={{ borderColor: statColors[i % 3], color: statColors[i % 3] }}>
                      Learn More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {stats.length > 0 && (
        <section className="py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="rounded-[24px] bg-gradient-to-r from-[#0B1F3A] to-[#102E5A] text-white p-8 sm:p-12 grid lg:grid-cols-[1fr_2fr] gap-8 items-center">
              <div>
                <h3 className="font-display font-extrabold text-[28px]">Milkar Badlaav Laana</h3>
                <p className="text-white/75 mt-2 text-[14px]">Every program creates ripples of change that transform lives and communities.</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s: any) => (
                  <div key={s.label} className="bg-white text-navy rounded-2xl p-5 text-center">
                    <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center" style={{ background: s.bg, color: s.color }}>
                      <s.icon className="w-6 h-6" />
                    </div>
                    <div className="mt-3 font-extrabold text-[22px] font-display">{s.num}</div>
                    <div className="text-text-2 text-[12px]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-secondary/50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="eyebrow">Real Voices</div>
            <h2 className="section-title mt-2">Success Stories</h2>
          </div>
          <div className="mt-10 grid lg:grid-cols-[2fr_1fr] gap-6 items-stretch">
            <div className="card-soft p-8 flex gap-5 items-center">
              <img src={story1} alt="Sunita Devi" className="w-24 h-24 rounded-full object-cover ring-4 ring-orange/20" />
              <div>
                <p className="text-text-2 italic leading-relaxed">"Joining the leadership program changed my life. Today, I run my own tailoring unit and support my family with pride and confidence."</p>
                <div className="mt-3 font-bold text-navy">— Sunita Devi</div>
                <div className="text-[12px] text-text-2">Program Beneficiary, Rajasthan</div>
              </div>
            </div>
            <div className="rounded-[20px] bg-[#0B1F3A] text-white p-7 flex flex-col justify-center">
              <h4 className="font-display font-bold text-[20px]">Share Your Story</h4>
              <p className="text-white/75 text-[13px] mt-2">Your story can inspire and bring hope to many others.</p>
              <button className="btn-orange mt-5 w-fit">Share Your Story →</button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
