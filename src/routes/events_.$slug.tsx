import { Link, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import heroBg from "@/assets/breadcrume/breadcrume-logo.png";
import { fetchEvents, fetchEventBySlug, getEvent, EventItem } from "@/data/events";
import { Calendar, Clock, MapPin, Phone, User, Tag, Users, Ticket, CheckCircle2, ArrowRight } from "lucide-react";

export default function EventDetailPage() {
  const [loaderData, setLoaderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    async function load() {
      if (!slug) return;
      try {
        let ev: EventItem | null | undefined = await fetchEventBySlug(slug);
        const events = await fetchEvents();
        if (!ev) {
          ev = getEvent(slug, events);
        }
        if (!ev) { setNotFound(true); setLoading(false); return; }
        setLoaderData({ ev, events });
        document.title = `${ev.title} — RK MINISTRIES`;
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) return <Preloader />;
  if (!slug) return <Navigate to="/" replace />;
  if (notFound || !loaderData) return <Navigate to="/not-found" replace />;

  const { ev, events } = loaderData;
  const related = events.filter((e) => e.slug !== ev.slug).slice(0, 3);

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero
        title={ev.title}
        image={heroBg}
        crumbs={[{ label: "Home", to: "/" }, { label: "Events", to: "/events" }, { label: ev.title }]}
      />
      <section className="py-14 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_360px] gap-10">
          <div>
            <div className="mb-6">
              {ev.category && (
                <span className="inline-block bg-orange/10 text-orange font-bold text-xs uppercase px-3 py-1 rounded-full mb-2">
                  {ev.category}
                </span>
              )}
              <h1 className="font-display font-extrabold text-[24px] sm:text-[32px] text-navy leading-tight">
                {ev.title}
              </h1>
            </div>
            <div className="rounded-[20px] overflow-hidden shadow-soft"><img src={ev.img} alt={ev.title} className="w-full h-[320px] sm:h-[420px] object-cover" /></div>
            <div className="mt-10">
              <h2 className="font-display font-extrabold text-[26px] text-navy">About the Event</h2>
              <div className="mt-2 h-1 w-14 bg-orange rounded-full" />
              <div className="mt-5 space-y-4 text-text-2 leading-relaxed">{ev.about.map((p, i) => <p key={i}>{p}</p>)}</div>
            </div>
            <div className="mt-10">
              <h2 className="font-display font-extrabold text-[24px] text-navy">Event Highlights</h2>
              <div className="mt-2 h-1 w-14 bg-orange rounded-full" />
              <div className="mt-5 grid sm:grid-cols-2 gap-3">{ev.highlights.map((h) => (<div key={h} className="flex items-start gap-3 bg-white border border-border rounded-xl px-4 py-3"><CheckCircle2 className="w-5 h-5 text-orange shrink-0 mt-0.5" /><span className="text-[14px] text-navy font-medium">{h}</span></div>))}</div>
            </div>
            {ev.agenda.length > 0 && (
              <div className="mt-10">
              </div>
            )}


          </div>
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl shadow-soft border border-border overflow-hidden sticky top-24">
              <div className="bg-gradient-to-br from-navy to-navy-2 text-white p-6"><div className="text-[12px] uppercase tracking-wider text-orange-2 font-semibold">Event Details</div><h3 className="font-display font-extrabold text-[22px] mt-1">{ev.title}</h3></div>
              <div className="p-6 space-y-4">
                {[{ I: Calendar, l: "Date", v: ev.date }, { I: Clock, l: "Time", v: ev.time }, { I: MapPin, l: "Venue", v: ev.address }, { I: User, l: "Organizer", v: ev.organizer }, { I: Phone, l: "Contact", v: ev.contact }, { I: Users, l: "Capacity", v: ev.seats }, { I: Ticket, l: "Entry Fee", v: ev.fee }].map(({ I, l, v }) => (<div key={l} className="flex items-start gap-3"><div className="w-9 h-9 rounded-lg bg-orange/10 text-orange flex items-center justify-center shrink-0"><I className="w-4 h-4" /></div><div><div className="text-[11.5px] uppercase tracking-wider text-text-2 font-semibold">{l}</div><div className="text-navy font-medium text-[14px]">{v}</div></div></div>))}
                <Link to="/contact" className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-2 to-orange text-white px-5 py-3 font-semibold shadow-md shadow-orange/30 hover:-translate-y-0.5 transition">Register Now <ArrowRight className="w-4 h-4" /></Link>
                <Link to="/donate" className="w-full inline-flex items-center justify-center gap-2 rounded-full border-2 border-navy text-navy px-5 py-3 font-semibold hover:bg-navy hover:text-white transition">Support This Event</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
