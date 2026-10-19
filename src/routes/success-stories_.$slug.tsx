import { Link, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import { ArrowRight, MapPin, Quote, Share2, BadgeCheck, GraduationCap, Heart, Mail, Sparkles } from "lucide-react";
import { fetchStories, getStory } from "@/data/stories";

export default function StoryDetail() {
  const [loaderData, setLoaderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    async function load() {
      if (!slug) return;
      try {
        const stories = await fetchStories();
        const s = getStory(slug, stories);
        if (!s) { setNotFound(true); setLoading(false); return; }
        setLoaderData({ story: s, stories });
        document.title = `${s.name} — Success Stories`;
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) return <Preloader />;
  if (!slug) return <Navigate to="/" replace />;
  if (notFound || !loaderData) return <Navigate to="/not-found" replace />;

  const { story, stories } = loaderData;
  const related = stories.filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <PageHero title="Success Stories" image={story.img} crumbs={[{ label: "Home", to: "/" }, { label: "Success Stories", to: "/success-stories" }, { label: story.name }]} />
      <section className="py-14 sm:py-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10">
            <div>
              <div className="rounded-[20px] overflow-hidden shadow-soft relative">
                <img src={story.img} alt={story.name} className="w-full h-[320px] sm:h-[440px] object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/90 to-transparent p-6">
                  <span className="inline-flex items-center gap-2 bg-orange text-white text-[12px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md"><Sparkles className="w-3.5 h-3.5" />{story.program}</span>
                </div>
              </div>

              <div className="mt-8">
                <div className="eyebrow text-orange">Success Story</div>
                <h2 className="font-display font-bold text-navy text-[26px] sm:text-[32px] leading-snug mt-2">{story.name}</h2>
                <p className="mt-3 text-[17px] text-text-2 leading-relaxed">{story.summary}</p>
                <div className="mt-5 flex flex-wrap items-center gap-5 text-[14px] text-text-2">
                  <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-orange" />{story.place}</span>
                  {story.age && <span className="flex items-center gap-2"><Heart className="w-4 h-4 text-orange" />{story.age} years</span>}
                  <span className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-orange" />{story.program}</span>
                </div>
              </div>

              <div className="mt-8">
                <blockquote className="text-[20px] sm:text-[24px] font-display font-semibold text-navy italic leading-snug border-l-4 border-orange pl-5">"{story.quote}"</blockquote>
              </div>

              <div className="mt-8 space-y-5 text-text-2 leading-[1.85] text-[16px]">
                {story.story.map((p, i) => (
                  <div key={i}>
                    <p>{p}</p>
                    {i === 0 && <p className="mt-5">It was a journey that began with a single opportunity and grew into a life-changing transformation. Through the support of our dedicated team and generous donors, {story.name.split(" ")[0]} received everything she needed to unlock her true potential.</p>}
                    {i === 1 && <p className="mt-5">Beyond the immediate support, mentoring and guidance played a crucial role in her growth. Our programs focus not just on providing resources but on building confidence, resilience and long-term independence — so that every beneficiary can stand on her own two feet.</p>}
                  </div>
                ))}
                <p className="mt-5">Her journey is a testament to what is possible when a community comes together. Today, she is a source of inspiration for countless others in her village, proof that with the right support, every woman can rewrite her own story.</p>
              </div>

            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="bg-white rounded-2xl shadow-soft border border-border overflow-hidden">
                <div className="bg-gradient-to-br from-navy to-navy-2 text-white p-6">
                  <div className="text-[12px] uppercase tracking-wider text-orange-2 font-semibold">About</div>
                  <h3 className="font-display font-bold text-[22px] mt-1">{story.name}</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-orange shrink-0 mt-0.5" /><div><div className="text-[11.5px] uppercase tracking-wider text-text-2 font-semibold">Location</div><div className="text-navy font-medium text-[14px]">{story.place}</div></div></div>
                  {story.age && (<div className="flex items-start gap-3"><Heart className="w-5 h-5 text-orange shrink-0 mt-0.5" /><div><div className="text-[11.5px] uppercase tracking-wider text-text-2 font-semibold">Age</div><div className="text-navy font-medium text-[14px]">{story.age} years</div></div></div>)}
                  <div className="flex items-start gap-3"><GraduationCap className="w-5 h-5 text-orange shrink-0 mt-0.5" /><div><div className="text-[11.5px] uppercase tracking-wider text-text-2 font-semibold">Program</div><div className="text-navy font-medium text-[14px]">{story.program}</div></div></div>
                </div>
              </div>


              <div className="card-soft p-6">
                <h3 className="font-display font-bold text-navy text-[18px]">Recent Stories</h3>
                <ul className="mt-4 space-y-4">
                  {stories.slice(0, 4).map((s) => (
                    <li key={s.slug}>
                      <Link to={`/success-stories/${s.slug}`} className="flex gap-3 group">
                        <img src={s.img} alt={s.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                        <div>
                          <div className="text-[11px] text-text-2">{s.program}</div>
                          <div className="text-[13px] font-semibold text-navy leading-snug group-hover:text-orange line-clamp-2">{s.name}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-soft p-6 bg-gradient-to-br from-orange to-orange-2 text-white text-center">
                <div className="font-display font-bold text-[20px]">Support Our Mission</div>
                <p className="text-white/85 text-[14px] mt-2 leading-relaxed">Help us reach more women and children through your contribution.</p>
                <Link to="/" className="mt-4 inline-flex items-center gap-2 bg-white text-navy font-semibold text-[14px] px-5 py-2.5 rounded-xl hover:bg-navy hover:text-white transition">Donate Now <ArrowRight className="w-4 h-4" /></Link>
              </div>


            </aside>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
