import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import heroBg from "@/assets/breadcrume/breadcrume-logo.png";
import { Heart, ArrowRight, Users, GraduationCap, Shield, Stethoscope, Sprout, HandHeart, type LucideIcon } from "lucide-react";
import { fetchCauses } from "@/data/causes";

const iconMap: Record<string, LucideIcon> = {
  "women-empowerment": Users,
  "girl-child-education": GraduationCap,
  "safety-anti-trafficking": Shield,
  "health-nutrition": Stethoscope,
  "livelihood-agriculture": Sprout,
  "elderly-differently-abled": Heart,
};

export default function CausesPage() {
  const [loaderData, setLoaderData] = useState<{ causes: any[] }>({ causes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Causes We Support — Mahila Chetna Samiti ";
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const causes = await fetchCauses();
        setLoaderData({ causes });
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <Preloader />;

  const { causes } = loaderData;

  return (
    <>
      <SiteHeader />
      <PageHero title="Causes We Support" description="Support our work in education, assistance, and safety. Choose a cause close to your heart." image={heroBg} crumbs={[{ label: "Home", to: "/" }, { label: "Causes" }]} />
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {causes.map(({ I: iconKey, img, title, desc, raised, beneficiaries, slug }) => {
              const CIcon: LucideIcon = iconMap[iconKey] || HandHeart;
              return (
                <article key={slug} className="group bg-white rounded-[24px] shadow-soft border border-border hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col">
                  <Link to={`/causes/${slug}`} className="relative h-52 overflow-hidden rounded-t-[24px] block">
                    <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                    {beneficiaries && <div className="absolute top-4 right-4 bg-white/95 text-navy text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full shadow-lg">{beneficiaries} lives</div>}
                  </Link>
                  <div className="relative px-6 pb-6 pt-6">
                    <div className="absolute -top-7 left-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-2 to-orange text-white flex items-center justify-center shadow-xl shadow-orange/40 ring-4 ring-white">
                      <CIcon className="w-7 h-7" strokeWidth={2.2} />
                    </div>
                    <div className="pt-6">
                      <Link to={`/causes/${slug}`}><h3 className="text-xl font-bold text-navy mb-2 group-hover:text-orange transition">{title}</h3></Link>
                      <p className="text-navy/70 text-[15px] mb-5">{desc}</p>
                      <div className="mb-2 flex justify-between text-sm font-semibold"><span className="text-navy">Funds Raised</span><span className="text-orange">{raised}%</span></div>
                      <div className="h-2 rounded-full bg-orange/10 overflow-hidden mb-5"><div className="h-full bg-gradient-to-r from-orange-2 to-orange rounded-full" style={{ width: `${raised}%` }} /></div>
                      <div className="flex items-center gap-3">
                        <Link to="/donate" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-2 to-orange text-white px-5 py-2.5 font-semibold shadow-md shadow-orange/30 hover:-translate-y-0.5 transition"><Heart className="w-4 h-4 fill-white" /> Donate</Link>
                        <Link to={`/causes/${slug}`} className="w-11 h-11 rounded-full bg-navy text-white flex items-center justify-center hover:bg-orange transition shrink-0" aria-label="Read more"><ArrowRight className="w-4 h-4" /></Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
