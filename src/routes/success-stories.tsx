import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import heroBg from "@/assets/herosection/NariSashaktikaran.png";
import { ArrowRight, Quote, MapPin } from "lucide-react";
import { fetchStories } from "@/data/stories";

export default function SuccessStoriesPage() {
  const [loaderData, setLoaderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Success Stories — Mahila Chetna Samiti ";
    async function load() {
      try {
        const stories = await fetchStories();
        setLoaderData({ stories });
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <Preloader />;

  const { stories } = loaderData;

  return (
    <>
      <SiteHeader />
      <PageHero title="Success Stories" image={heroBg} crumbs={[{ label: "Home", to: "/" }, { label: "Success Stories" }]} />
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((s) => (
              <div key={s.slug} className="group bg-white rounded-2xl shadow-soft overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <Link to={`/success-stories/${s.slug}`} className="block relative h-44 sm:h-52 overflow-hidden">
                    <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
                    <span className="absolute top-3 left-3 bg-orange text-white text-xs font-semibold px-3 py-1 rounded-full">{s.program}</span>
                  </Link>
                  <div className="p-6 pb-0 flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-text-2 mb-2"><MapPin className="w-4 h-4 text-orange" />{s.place}</div>
                    <Link to={`/success-stories/${s.slug}`}>
                      <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-orange transition font-display">{s.name}</h3>
                    </Link>
                    <div className="relative">
                      <Quote className="w-6 h-6 text-orange/30 -ml-1" />
                      <p className="text-text-2 text-[14px] leading-relaxed italic line-clamp-3">{s.quote}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-4">
                  <div className="pt-3 border-t border-border">
                    <Link
                      to={`/success-stories/${s.slug}`}
                      className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-orange/5 hover:bg-orange text-orange hover:text-white font-semibold text-[13px] transition-all duration-300 group/btn"
                    >
                      <span>Read Full Story</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
