import { Link, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import { fetchCauses, getCause } from "@/data/causes";
import { Heart, CheckCircle2, MapPin, Target, Users, ArrowRight, Share2, FileText, Download, Calendar, Facebook, Twitter, Linkedin, MessageCircle, Link2, Mail, ShieldCheck, GraduationCap, Shield, Stethoscope, Sprout, HandHeart, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "women-empowerment": Users,
  "girl-child-education": GraduationCap,
  "safety-anti-trafficking": Shield,
  "health-nutrition": Stethoscope,
  "livelihood-agriculture": Sprout,
  "elderly-differently-abled": Heart,
};

export default function CauseDetail() {
  const [loaderData, setLoaderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [amount, setAmount] = useState<number>(2500);
  const [copied, setCopied] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    async function load() {
      if (!slug) return;
      try {
        const causes = await fetchCauses();
        const cause = getCause(slug, causes);
        if (!cause) { setNotFound(true); setLoading(false); return; }
        setLoaderData({ cause, causes });
        document.title = `${cause.title} — Mahila Chetna Samiti `;
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) return <Preloader />;
  if (!slug) return <Navigate to="/" replace />;
  if (notFound || !loaderData) return <Navigate to="/not-found" replace />;

  const { cause, causes } = loaderData;
  const CIcon: LucideIcon = iconMap[cause.I] || HandHeart;
  const related = causes.filter((c) => c.slug !== cause.slug).slice(0, 3);
  const presets = [500, 1000, 2500, 5000, 10000];
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Support "${cause.title}" with Mahila Chetna Samiti `;
  const social = [
    { I: Facebook, label: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { I: Twitter, label: "Twitter", url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}` },
    { I: Linkedin, label: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
    { I: MessageCircle, label: "WhatsApp", url: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}` },
    { I: Mail, label: "Email", url: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}` },
  ];
  const adminDoc = cause.pdfUrl ? [{ name: "Cause Document", size: "", type: "PDF", url: cause.pdfUrl }] : [];
  const documents = [
    ...adminDoc,
    { name: "Project Proposal & Roadmap", size: "1.2 MB", type: "PDF", url: "#" },
    { name: "Annual Impact Report 2024", size: "3.4 MB", type: "PDF", url: "#" },
  ];
  const updates = [
    { date: "12 Jun 2026", title: "New batch enrolled across 4 districts", body: "Onboarded 240 new beneficiaries." },
    { date: "28 Apr 2026", title: "Skills lab inaugurated in Lucknow", body: "A new fully-equipped skill lab opened." },
  ];

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { }
  };

  return (
    <>
      <SiteHeader />
      <PageHero title={cause.title} image={cause.img} crumbs={[{ label: "Home", to: "/" }, { label: "Causes", to: "/causes" }, { label: cause.title }]} />
      <section className="py-16 sm:py-20 bg-cream">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[24px] shadow-soft border border-border">
              <div className="relative h-72 sm:h-96 rounded-t-[24px] overflow-hidden">
                <img src={cause.img} alt={cause.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                <div className="absolute top-5 left-5 flex gap-2">
                  <span className={`text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full shadow-lg ${cause.status === 'urgent' ? 'bg-red-500 text-white' : cause.status === 'completed' ? 'bg-green-600 text-white' : 'bg-orange text-white'}`}>{cause.status === 'urgent' ? 'Urgent Cause' : cause.status === 'completed' ? 'Completed' : 'Active Cause'}</span>
                  {cause.beneficiaries && <span className="text-[11px] font-bold uppercase tracking-wide bg-white/95 text-navy px-3 py-1.5 rounded-full">{cause.beneficiaries} lives</span>}
                </div>
              </div>
              <div className="relative px-7 sm:px-9">
                <div className="absolute -top-9 left-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-2 to-orange text-white flex items-center justify-center shadow-xl shadow-orange/40 ring-4 ring-white">
                  <CIcon className="w-8 h-8" strokeWidth={2.2} />
                </div>
              </div>
              <div className="p-7 sm:p-9 pt-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4">About this cause</h2>
                {cause.about.map((p, i) => (<p key={i} className="text-navy/75 text-[16px] leading-relaxed mb-4 last:mb-0">{p}</p>))}
              </div>
            </div>
            <div className="bg-white rounded-[24px] shadow-soft border border-border p-7 sm:p-9">
              <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3"><Target className="w-6 h-6 text-orange" /> Our Objectives</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {cause.objectives.map((o) => (<div key={o} className="flex items-start gap-3 p-4 rounded-2xl bg-cream"><CheckCircle2 className="w-5 h-5 text-orange shrink-0 mt-0.5" /><span className="text-navy/80 font-medium">{o}</span></div>))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-navy to-[#0a1830] rounded-[24px] p-7 sm:p-9 text-white">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><Users className="w-6 h-6 text-orange" /> Impact So Far</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {cause.impact.map((s) => (<div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center"><div className="text-2xl sm:text-3xl font-bold text-orange mb-1">{s.value}</div><div className="text-white/70 text-sm">{s.label}</div></div>))}
              </div>
            </div>
            <div id="donate" className="relative bg-white rounded-[24px] shadow-soft border border-border overflow-hidden">
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-orange/10 blur-3xl pointer-events-none" />
              <div className="relative p-7 sm:p-9">
                <div className="flex items-center gap-3 mb-2"><span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide bg-orange/10 text-orange px-3 py-1.5 rounded-full"><Heart className="w-3.5 h-3.5 fill-orange" /> Make a difference</span></div>
                <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2">Support this cause today</h2>
                <p className="text-navy/70 mb-6">Every contribution is 80G tax-exempt and goes directly into program delivery.</p>
                <div className="grid sm:grid-cols-5 gap-3 mb-5">{presets.map((p) => (<button key={p} onClick={() => setAmount(p)} className={`rounded-2xl border-2 px-4 py-3.5 font-bold transition ${amount === p ? "border-orange bg-orange text-white shadow-lg shadow-orange/30" : "border-border bg-cream text-navy hover:border-orange hover:text-orange"}`}>₹{p.toLocaleString("en-IN")}</button>))}</div>
                <div className="grid sm:grid-cols-[1fr_auto] gap-3 mb-5">
                  <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/60 font-bold">₹</span><input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} className="w-full rounded-2xl border-2 border-border bg-white pl-9 pr-4 py-3.5 text-navy font-semibold focus:border-orange focus:outline-none" placeholder="Enter custom amount" /></div>
                  <Link to="/donate" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-2 to-orange text-white px-7 py-3.5 font-bold shadow-lg shadow-orange/30 hover:-translate-y-0.5 transition"><Heart className="w-4 h-4 fill-white" /> Donate ₹{amount.toLocaleString("en-IN")}</Link>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-navy/70"><span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-orange" /> 100% Secure</span><span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-orange" /> 80G Tax Exemption</span><span className="inline-flex items-center gap-1.5"><FileText className="w-4 h-4 text-orange" /> Instant Receipt</span></div>
              </div>
            </div>
            <div className="bg-white rounded-[24px] shadow-soft border border-border p-7 sm:p-9">
              <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3"><FileText className="w-6 h-6 text-orange" /> Documents & Reports</h2>
              <div className="grid sm:grid-cols-2 gap-4">{documents.filter(Boolean).map((d) => (<a key={d.name} href={d.url || "#"} target={d.url && d.url !== "#" ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center gap-4 p-4 rounded-2xl bg-cream border border-transparent hover:border-orange hover:bg-white transition"><div className="w-12 h-12 rounded-xl bg-orange/10 text-orange flex items-center justify-center shrink-0 group-hover:bg-orange group-hover:text-white transition"><FileText className="w-6 h-6" /></div><div className="min-w-0 flex-1"><div className="font-bold text-navy truncate">{d.name}</div><div className="text-xs text-navy/60">{d.type}{d.size ? ` · ${d.size}` : ''}</div></div><Download className="w-5 h-5 text-navy/40 group-hover:text-orange shrink-0" /></a>))}</div>
            </div>
            <div className="bg-white rounded-[24px] shadow-soft border border-border p-7 sm:p-9">
              <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3"><Calendar className="w-6 h-6 text-orange" /> Latest Updates</h2>
              <ol className="relative border-l-2 border-dashed border-orange/30 ml-3 space-y-6">{updates.map((u) => (<li key={u.title} className="pl-6 relative"><span className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-orange-2 to-orange ring-4 ring-white shadow" /><div className="text-xs font-bold uppercase tracking-wide text-orange mb-1">{u.date}</div><h3 className="text-lg font-bold text-navy mb-1">{u.title}</h3><p className="text-navy/70 text-sm leading-relaxed">{u.body}</p></li>))}</ol>
            </div>
            <div className="bg-gradient-to-br from-navy to-[#0a1830] rounded-[24px] p-7 sm:p-9 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                <div><h2 className="text-2xl font-bold mb-1 flex items-center gap-3"><Share2 className="w-6 h-6 text-orange" /> Share this cause</h2><p className="text-white/70 text-sm">Help us reach more supporters by sharing on your network.</p></div>
              </div>
              <div className="flex flex-wrap gap-3 mb-4">{social.map((s) => (<a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-orange border border-white/10 hover:border-orange px-5 py-2.5 font-semibold text-sm transition"><s.I className="w-4 h-4" /> {s.label}</a>))}</div>
              <button onClick={copyLink} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white text-navy hover:bg-orange hover:text-white px-5 py-2.5 font-semibold text-sm transition"><Link2 className="w-4 h-4" /> {copied ? "Link Copied!" : "Copy Link"}</button>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="bg-white rounded-[24px] shadow-soft border border-border p-7 sticky top-24">
              <div className="mb-2 flex justify-between text-sm font-semibold"><span className="text-navy">Raised</span><span className="text-orange">{cause.raised}%</span></div>
              <div className="h-2.5 rounded-full bg-orange/10 overflow-hidden mb-4"><div className="h-full bg-gradient-to-r from-orange-2 to-orange rounded-full" style={{ width: `${cause.raised}%` }} /></div>
              <div className="flex justify-between mb-6">
                <div><div className="text-xs text-navy/60 uppercase tracking-wide">Raised</div><div className="text-xl font-bold text-navy">{cause.raisedAmt}</div></div>
                <div className="text-right"><div className="text-xs text-navy/60 uppercase tracking-wide">Goal</div><div className="text-xl font-bold text-navy">{cause.goal}</div></div>
              </div>
              <a href="#donate" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-2 to-orange text-white px-6 py-3.5 font-semibold shadow-lg shadow-orange/30 hover:-translate-y-0.5 transition mb-3"><Heart className="w-4 h-4 fill-white" /> Donate Now</a>
              <button onClick={copyLink} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy text-white px-6 py-3 font-semibold hover:bg-orange transition"><Share2 className="w-4 h-4" /> {copied ? "Link Copied!" : "Share Cause"}</button>
              {cause.locations.length > 0 && <div className="mt-6 pt-6 border-t border-border">
                <div className="text-sm font-bold text-navy mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-orange" /> Active Locations</div>
                <div className="flex flex-wrap gap-2">{cause.locations.map((l) => (<span key={l} className="text-xs font-semibold bg-cream text-navy px-3 py-1.5 rounded-full">{l}</span>))}</div>
              </div>}
            </div>
          </aside>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-8">Other Causes</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((c) => (<Link key={c.slug} to={`/causes/${c.slug}`} className="group bg-white rounded-2xl border border-border overflow-hidden hover:-translate-y-1 hover:shadow-xl transition"><div className="relative h-44 overflow-hidden"><img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition" /></div><div className="p-5"><h3 className="text-lg font-bold text-navy mb-1 group-hover:text-orange transition">{c.title}</h3><p className="text-navy/70 text-sm mb-3 line-clamp-2">{c.desc}</p><span className="inline-flex items-center gap-1 text-sm font-semibold text-orange">Learn more <ArrowRight className="w-4 h-4" /></span></div></Link>))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
