import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight, MapPin, Users } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import heroBg from "@/assets/breadcrume/breadcrume-logo.png";
import { fetchProjects } from "@/data/projects";

export default function ProjectsPage() {
  const [loaderData, setLoaderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Our Campaigns — RK MINISTRIES";
    async function load() {
      try {
        const projects = await fetchProjects();
        setLoaderData({ projects });
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <Preloader />;

  const { projects } = loaderData;

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero title="Our Ministries & Missions" accent="That Transform Lives" description="Our ministries in gospel outreach, healing prayer, and community support are transforming lives and spreading faith." image={heroBg} crumbs={[{ label: "Home", to: "/" }, { label: "Ministries & Missions" }]} />
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center"><div className="eyebrow">Our Calling</div><h2 className="section-title mt-2">Our Ministries & Missions</h2></div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.slug} className="card-soft card-soft-hover overflow-hidden group flex flex-col justify-between">
                <div>
                  <Link to={`/campaigns/${p.slug}`} className="block relative overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-[180px] sm:h-[210px] object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 bg-orange text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase">{p.tag}</span>
                  </Link>
                  <div className="p-6 pb-0">
                    <Link to={`/campaigns/${p.slug}`}>
                      <h3 className="font-display font-bold text-[20px] text-navy group-hover:text-orange transition">{p.title}</h3>
                    </Link>
                    <p className="mt-2 text-text-2 text-[14px] leading-relaxed line-clamp-2">{p.desc}</p>
                    <div className="mt-4 flex items-center gap-4 text-[13px] text-text-2">
                      <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-orange" />{p.impact}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-orange" />{p.loc}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-4">
                  <div className="pt-3 border-t border-gray-100">
                    <Link
                      to={`/campaigns/${p.slug}`}
                      className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-orange/5 hover:bg-orange text-orange hover:text-white font-semibold text-[13px] transition-all duration-300 group/btn"
                    >
                      <span>Learn More</span>
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
    </div>
  );
}
