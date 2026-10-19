import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api, { getFullUrl } from "@/lib/api";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import heroBg from "@/assets/herosection/NariSashaktikaran.png";
import { Heart, Target, Users, Clock, MapPin, Share2 } from "lucide-react";

async function fetchCampaigns() {
  try {
    const { data } = await api.get('/crowdfunds', { params: { limit: 50 } });
    const items = data?.data || data || [];
    return Array.isArray(items) ? items : [];
  } catch { return []; }
}

function fmt(n: number) {
  if (n >= 100000) return "₹" + (n / 100000).toFixed(1).replace(/\.0$/, "") + " L";
  return "₹" + n.toLocaleString("en-IN");
}

function daysLeft(d: string | Date | null): number | null {
  if (!d) return null;
  const diff = new Date(d).getTime() - Date.now();
  return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
}

export default function CrowdFundingPage() {
  const [loaderData, setLoaderData] = useState<{ campaigns: any[] }>({ campaigns: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Projects — Mahila Chetna Samiti ";
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const campaigns = await fetchCampaigns();
        setLoaderData({ campaigns });
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <Preloader />;

  const { campaigns } = loaderData;

  return (
    <>
      <SiteHeader />
      <PageHero title="Projects" image={heroBg} crumbs={[{ label: "Home", to: "/" }, { label: "Projects" }]} />
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          {campaigns.length === 0 && (
            <p className="text-center text-text-2">No active campaigns at the moment. Check back soon!</p>
          )}
          <div className="grid md:grid-cols-2 gap-7">
            {campaigns.map((c: any) => {
              const goal = c.goalAmount || 100000;
              const raised = c.raisedAmount || 0;
              const pct = goal > 0 ? Math.min(Math.round((raised / goal) * 100), 100) : 0;
              const donors = c.donorsCount || 0;
              const dl = daysLeft(c.deadline);
              return (
                <article
                  key={c._id || c.slug}
                  className="group bg-white rounded-[24px] overflow-hidden shadow-soft border border-border hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-56 sm:h-64 overflow-hidden">
                    {getFullUrl(c.image) ? (
                      <img src={getFullUrl(c.image)} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange/10 to-orange/5 flex items-center justify-center">
                        <Heart className="w-16 h-16 text-orange/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wide bg-orange text-white px-3 py-1.5 rounded-full shadow-lg">● {c.status === 'completed' ? 'Completed' : 'Live'}</span>
                      {c.category && (
                        <span className="text-[11px] font-bold uppercase tracking-wide bg-white/95 text-navy px-3 py-1.5 rounded-full">{c.category}</span>
                      )}
                    </div>
                    <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 text-navy flex items-center justify-center hover:bg-orange hover:text-white transition">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white text-sm">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">{c.location || c.organizer?.name || c.tagline || 'India'}</span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <h3 className="text-xl sm:text-2xl font-bold text-navy mb-2 leading-snug group-hover:text-orange transition">{c.title}</h3>
                    <p className="text-navy/70 text-[15px] mb-5">{c.tagline || (Array.isArray(c.description) ? c.description[0] : c.description) || ''}</p>

                    <div className="mb-2 flex justify-between items-end text-sm">
                      <span className="font-bold text-navy text-lg">{fmt(raised)}</span>
                      <span className="text-navy/60">of {fmt(goal)}</span>
                    </div>
                    <div className="relative h-2.5 rounded-full bg-orange/10 overflow-hidden mb-5">
                      <div className="h-full bg-gradient-to-r from-orange-2 to-orange rounded-full" style={{ width: `${pct}%` }} />
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                      <div className="rounded-xl bg-cream py-3">
                        <Target className="w-4 h-4 mx-auto text-orange mb-1" />
                        <div className="text-sm font-bold text-navy">{pct}%</div>
                        <div className="text-[11px] text-navy/60">Funded</div>
                      </div>
                      <div className="rounded-xl bg-cream py-3">
                        <Users className="w-4 h-4 mx-auto text-orange mb-1" />
                        <div className="text-sm font-bold text-navy">{donors}</div>
                        <div className="text-[11px] text-navy/60">Donors</div>
                      </div>
                      <div className="rounded-xl bg-cream py-3">
                        <Clock className="w-4 h-4 mx-auto text-orange mb-1" />
                        <div className="text-sm font-bold text-navy">{dl !== null ? dl : 'Ongoing'}</div>
                        <div className="text-[11px] text-navy/60">Days left</div>
                      </div>
                    </div>

                    <Link to="/donate" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-2 to-orange text-white px-6 py-3.5 font-semibold shadow-lg shadow-orange/30 hover:-translate-y-0.5 transition">
                      <Heart className="w-4 h-4 fill-white" /> Contribute Now
                    </Link>
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
