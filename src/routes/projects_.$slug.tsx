import { Link, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight, Target, CheckCircle2, Heart } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import heroBg from "@/assets/breadcrume/breadcrume-logo.png";
import { fetchProjects, fetchProjectBySlug, getProject } from "@/data/projects";

export default function ProjectDetailPage() {
  const [loaderData, setLoaderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [donationAmount, setDonationAmount] = useState(500);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    async function load() {
      if (!slug) return;
      try {
        const [project, projects] = await Promise.all([
          fetchProjectBySlug(slug),
          fetchProjects()
        ]);
        if (!project) { setNotFound(true); setLoading(false); return; }
        setLoaderData({ project, projects });
        document.title = `${project.title} — RK MINISTRIES`;
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) return <Preloader />;
  if (!slug) return <Navigate to="/" replace />;
  if (notFound || !loaderData) return <Navigate to="/not-found" replace />;

  const { project, projects } = loaderData;
  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const donationPresets = [500, 1000, 2500, 5000];

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero title={project.title} image={heroBg} crumbs={[{ label: "Home", to: "/" }, { label: "Campaigns", to: "/campaigns" }, { label: project.title }]} />
      <section className="py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[minmax(0,1fr)_360px] gap-10 items-start">
          <div className="space-y-10">
            <div className="rounded-[20px] overflow-hidden shadow-soft"><img src={project.img} alt={project.title} className="w-full h-[260px] sm:h-[320px] object-contain bg-[#F1F5F9] block" /></div>
            <div>
              <h2 className="font-display font-extrabold text-[26px] text-navy">About the Project</h2>
              <div className="mt-2 h-1 w-14 bg-orange rounded-full" />
              <div className="mt-5 space-y-4 text-text-2 leading-relaxed">{project.about.map((p, i) => <p key={i}>{p}</p>)}</div>
            </div>
            {project.objectives.length > 0 && (
              <div className="bg-white border border-border rounded-2xl p-7 shadow-soft">
                <h2 className="font-display font-extrabold text-[24px] text-navy flex items-center gap-3"><Target className="w-6 h-6 text-orange" /> Objectives</h2>
                <div className="mt-5 grid sm:grid-cols-2 gap-3">{project.objectives.map((o, i) => (<div key={i} className="flex items-start gap-3 bg-surface-2 rounded-xl p-4"><CheckCircle2 className="w-5 h-5 text-orange shrink-0 mt-0.5" /><span className="text-[14px] text-navy font-medium">{o}</span></div>))}</div>
              </div>
            )}
            {project.activities.length > 0 && (
              <div><h2 className="font-display font-extrabold text-[24px] text-navy">Our Activities</h2><div className="mt-2 h-1 w-14 bg-orange rounded-full" /><div className="mt-6 grid sm:grid-cols-2 gap-4">{project.activities.map((a, i) => (<div key={i} className="bg-white border border-border rounded-2xl p-6 shadow-soft hover:-translate-y-1 transition"><h3 className="font-display font-bold text-navy text-[18px]">{a.title}</h3><p className="text-text-2 text-[14px] mt-2 leading-relaxed">{a.desc}</p></div>))}</div></div>
            )}
          </div>
          <aside className="lg:sticky lg:top-28 bg-white border border-border rounded-2xl p-6 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display font-extrabold text-[22px] text-navy">Support This Project</h2>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-navy/60"><span className="text-lg">₹</span> INR</span>
            </div>
            <label className="block mt-6 mb-3 text-sm font-semibold text-navy">Amount</label>
            <div className="grid grid-cols-2 gap-2.5">
              {donationPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setDonationAmount(preset)}
                  className={`rounded-xl border-2 px-3 py-3 text-sm font-bold transition ${donationAmount === preset ? "border-orange bg-orange text-white" : "border-border bg-white text-navy hover:border-orange hover:text-orange"}`}
                >
                  ₹{preset.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
            <div className="relative mt-3">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/60 font-bold">₹</span>
              <input
                type="number"
                min="1"
                value={donationAmount}
                onChange={(event) => setDonationAmount(Number(event.target.value) || 0)}
                className="w-full rounded-xl border-2 border-border bg-white pl-9 pr-4 py-3 text-navy font-semibold focus:border-orange focus:outline-none"
                aria-label="Donation amount"
              />
            </div>
            <div className="mt-6 space-y-3 border-t border-border pt-5">
              <div className="flex items-start gap-3 text-sm text-navy/70">
                <img src="https://www.riddhisiddhicharitabletrust.org/static/images/school/new-icon1.jpg" alt="Tax benefit" className="w-10 h-10 rounded object-cover shrink-0" />
                <span>Your donations are tax exempted under <strong className="text-navy">80G</strong> of the Indian Income Tax Act</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-navy/70">
                <img src="https://www.riddhisiddhicharitabletrust.org/static/images/school/cards-payment-strip.png" alt="Accepted payment methods" className="w-16 h-10 object-contain shrink-0" />
                <span>We accept all major payment methods</span>
              </div>
            </div>
            <Link to="/donate" className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-2 to-orange text-white px-5 py-3.5 font-bold shadow-lg shadow-orange/30 hover:-translate-y-0.5 transition">
              <Heart className="w-4 h-4 fill-white" /> Donate Now
              <span className="ml-auto">Total ₹{donationAmount.toLocaleString("en-IN")}</span>
            </Link>
          </aside>
        </div>
      </section>
      <section className="py-14 bg-surface-2">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8"><div><div className="eyebrow">More Initiatives</div><h2 className="section-title mt-1">Other Campaigns</h2></div><Link to="/campaigns" className="hidden sm:inline-flex items-center gap-2 text-orange font-semibold">All Campaigns <ArrowRight className="w-4 h-4" /></Link></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (<Link key={p.slug} to={`/campaigns/${p.slug}`} className="card-soft card-soft-hover overflow-hidden group block"><div className="relative overflow-hidden"><img src={p.img} alt={p.title} className="w-full h-[160px] sm:h-[180px] object-cover group-hover:scale-105 transition" /><span className="absolute top-3 left-3 bg-orange text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase">{p.tag}</span></div><div className="p-5"><h3 className="font-display font-bold text-navy text-[17px] group-hover:text-orange transition">{p.title}</h3><p className="mt-1 text-text-2 text-[13px] line-clamp-2">{p.desc}</p></div></Link>))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
