import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, ArrowRight, Megaphone } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import heroBg from "@/assets/herosection/NariSashaktikaran.png";
import { fetchEvents } from "@/data/events";

export default function EventsPage() {
  const [loaderData, setLoaderData] = useState<{ events: any[] }>({ events: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Events — Mahila Chetna Samiti ";
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const events = await fetchEvents();
        setLoaderData({ events });
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <Preloader />;

  const { events } = loaderData;

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero title="Events" description="Take part in our events for education, assistance, and safety." image={heroBg} crumbs={[{ label: "Home", to: "/" }, { label: "Events" }]} />
      {/* UPCOMING EVENTS SECTION */}
      {(() => {
        const cardAccents = ["#2E8B57", "#FF6B00", "#8B5CF6", "#2563EB"];

        return (
          <section className="relative py-14 sm:py-20 bg-gradient-to-b from-[#FAF8F5] via-[#FDFBF7] to-[#F5F2EB] overflow-hidden">
            {/* Ambient decorative soft blur blobs */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#2E8B57]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6">
              {/* Section Header */}
              <div className="text-center mb-10 lg:mb-14">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 border border-orange/20 text-orange px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider shadow-sm">
                  <Calendar className="w-3.5 h-3.5 text-orange" /> Don't Miss Out
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mt-3 tracking-tight">
                  Events
                </h2>
                <p className="mt-3 text-text-2 text-[15px] max-w-xl mx-auto leading-relaxed">
                  Participate in our events and be part of the change we are creating across communities.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="h-[3px] w-6 rounded-full bg-orange/30" />
                  <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-orange to-[#2E8B57]" />
                  <div className="h-[3px] w-6 rounded-full bg-[#2E8B57]/30" />
                </div>
              </div>

              {/* Events Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {events.filter((e) => e.status !== "past").map((e, idx) => {
                  const day = e.day || "";
                  const month = e.mon || "";
                  const accent = cardAccents[idx % cardAccents.length];

                  return (
                    <div
                      key={e.slug || e.title}
                      className="group relative flex flex-col justify-between bg-white rounded-3xl border border-gray-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_45px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-400 overflow-hidden"
                    >
                      {/* Top accent line */}
                      <div
                        className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full opacity-80 z-10"
                        style={{ background: accent }}
                      />

                      {/* Image container */}
                      <div className="relative overflow-hidden aspect-[16/10] bg-gray-100">
                        <img
                          src={e.img}
                          alt={e.title}
                          width={640}
                          height={400}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Category badge */}
                        {e.category && (
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-navy text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm ring-1 ring-black/5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                            <span>{e.category}</span>
                          </div>
                        )}

                        {/* Calendar date badge */}
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl px-2.5 py-1 text-center shadow-md ring-1 ring-black/5">
                          <span className="block text-[15px] font-black text-navy leading-none">{day}</span>
                          <span className="block text-[10px] font-extrabold uppercase tracking-wider text-orange leading-tight">{month}</span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-5 flex flex-col flex-1 justify-between">
                        <div>
                          <Link to={`/events/${e.slug}`}>
                            <h3 className="text-[15px] font-bold text-navy leading-snug group-hover:text-orange transition-colors duration-200 line-clamp-2 min-h-[42px]">
                              {e.title}
                            </h3>
                          </Link>
                          <p className="mt-2 text-[13px] text-text-2 leading-relaxed line-clamp-2">
                            {e.desc}
                          </p>

                          {/* Info Rows */}
                          <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col gap-2">
                            <div className="inline-flex items-center gap-2 text-[12px] text-text-2">
                              <div className="w-6 h-6 rounded-full bg-orange/10 flex items-center justify-center shrink-0">
                                <Calendar className="w-3.5 h-3.5 text-orange" />
                              </div>
                              <span className="font-semibold text-navy/90">{e.date}</span>
                            </div>
                            {e.time && (
                              <div className="inline-flex items-center gap-2 text-[12px] text-text-2">
                                <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                                </div>
                                <span className="truncate">{e.time}</span>
                              </div>
                            )}
                            <div className="inline-flex items-center gap-2 text-[12px] text-text-2">
                              <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                <MapPin className="w-3.5 h-3.5 text-[#2E8B57]" />
                              </div>
                              <span className="truncate">{e.loc || e.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Link */}
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <Link
                            to={`/events/${e.slug}`}
                            className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-orange/5 hover:bg-orange text-orange hover:text-white font-semibold text-[13px] transition-all duration-300 group/btn"
                          >
                            <span>View Event Details</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })()}
      <section className="py-14 bg-gradient-to-r from-[#0B1F3A] to-[#102E5A] text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid md:grid-cols-[auto_1fr_auto] gap-6 items-center">
          <div className="w-14 h-14 rounded-full bg-orange flex items-center justify-center"><Megaphone className="w-7 h-7" /></div>
          <div><h3 className="font-display font-extrabold text-[24px]">Don't Miss Our Next Event!</h3><p className="text-white/75 mt-1 text-[14px]">Subscribe to our newsletter and get updates about our upcoming events and activities.</p></div>
          <form className="flex flex-wrap gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter Your Email Address" className="bg-white text-navy rounded-lg px-4 py-3 text-[13px] flex-1 min-w-0 focus:outline-none" />
            <button type="submit" className="btn-orange whitespace-nowrap">Subscribe Now <ArrowRight className="w-4 h-4" /></button>
          </form>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
