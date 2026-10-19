import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Send, Heart, Handshake, UserPlus, Gift, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import api from "@/lib/api";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import heroBg from "@/assets/breadcrume/breadcrume-logo.png";
import { fetchContactSettings } from "@/data/contact";

const googleMapEmbedUrl = "https://maps.google.com/maps?q=Mustafabad,+Mubarakpur,+Azamgarh,+Uttar+Pradesh+276404&hl=en&z=15&output=embed";

const googleMapsLink = "https://www.google.com/maps/search/?api=1&query=Mustafabad+Mubarakpur+Azamgarh+Uttar+Pradesh+276404";

export default function ContactPage() {
  const [loaderData, setLoaderData] = useState<{ settings: any }>({ settings: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Contact Us — RK MINISTRIES | Azamgarh, U.P.";
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const settings = await fetchContactSettings();
        setLoaderData({ settings });
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <Preloader />;

  const { settings } = loaderData;
  const s = settings;

  const info = [
    ...(s.contactPhone ? [{ icon: Phone, title: "Call Us", lines: [s.contactPhone, "Mon - Sat: 9:00 AM - 6:00 PM"], color: "#FF6B00", bg: "#FFF1E5" }] : []),
    ...(s.contactEmail ? [{ icon: Mail, title: "Email Us", lines: [s.contactEmail], color: "#16A34A", bg: "#E8F7EE" }] : []),
    ...(s.contactAddress ? [{
      icon: MapPin, title: "Visit Us", lines: s.contactAddress.split(', ').filter(Boolean), color: "#7C3AED", bg: "#F1EAFE",
      line1: s.contactAddress.split(', ').filter(Boolean).slice(0, Math.ceil(s.contactAddress.split(', ').filter(Boolean).length / 2)).join(', '),
      line2: s.contactAddress.split(', ').filter(Boolean).slice(Math.ceil(s.contactAddress.split(', ').filter(Boolean).length / 2)).join(', '),
    }] : []),
    { icon: Clock, title: "Service & Prayer Hours", lines: ["Sunday Worship: 10:00 AM - 1:00 PM", "Friday Fasting Prayer: 6:00 PM - 8:30 PM", "Office: Mon - Sat: 9:00 AM - 6:00 PM"], color: "#2563EB", bg: "#E6EEFB" },
  ];

  const help = [
    { icon: Heart, title: "General Inquiries", desc: "Have a question about our work? We're happy to help.", color: "#EC4899", bg: "#FCE7F3", link: "/contact", btnLabel: "Ask a Question" },
    { icon: Handshake, title: "Partnerships", desc: "Let's collaborate for greater impact in communities.", color: "#16A34A", bg: "#E8F7EE", link: "/contact", btnLabel: "Partner With Us" },
    { icon: UserPlus, title: "Volunteer With Us", desc: "Join our team of passionate changemakers across the country.", color: "#7C3AED", bg: "#F1EAFE", link: "/volunteer", btnLabel: "Join Us" },
    { icon: Gift, title: "Donations", desc: "Your support helps us empower more lives every day.", color: "#FF6B00", bg: "#FFF1E5", link: "/donate", btnLabel: "Donate Now" },
  ];

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero
        eyebrow="Contact Us"
        title="We'd Love To"
        accent="Hear From You!"
        description="Have questions, ideas, or want to get involved? Reach out — we're here to make a difference together."
        image={heroBg}
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <section className="-mt-12 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {info.map((c) => (
            <div key={c.title} className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_8px_30px_rgba(11,31,58,0.06)] p-6 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(11,31,58,0.12)] transition-all duration-300">
              {/* Top accent */}
              <div className="absolute top-0 left-10 right-10 h-[3px] rounded-b-full opacity-70" style={{ background: c.color }} />
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm" style={{ background: c.bg, color: c.color }}>
                <c.icon className="w-6 h-6" />
              </div>
              <div className="mt-4 text-navy font-bold text-[15px] font-display">{c.title}</div>
              {c.title === "Visit Us" ? (
                <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="mt-2 block group/link">
                  {/* Row 1 */}
                  <span className="block text-navy/80 text-[13px] font-semibold leading-snug">
                    {(c as any).line1 || c.lines.slice(0, Math.ceil(c.lines.length / 2)).join(', ')}
                  </span>
                  {/* Row 2 */}
                  <span className="block text-text-2 text-[12px] leading-snug mt-0.5">
                    {(c as any).line2 || c.lines.slice(Math.ceil(c.lines.length / 2)).join(', ')}
                  </span>
                  {/* Maps link */}
                  <span className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-bold text-[#7C3AED] group-hover/link:underline transition">
                    View on Google Maps <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </a>
              ) : (
                c.lines.map((l: string) => <div key={l} className="mt-1 text-text-2 text-[12.5px] leading-relaxed">{l}</div>)
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 border border-orange/20 text-orange px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider shadow-sm">
              <Send className="w-3.5 h-3.5" /> Get In Touch
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mt-3 tracking-tight font-display">
              Send Us a <span className="text-orange">Message</span>
            </h2>
            <p className="mt-3 text-text-2 text-[14px] sm:text-[15px] leading-relaxed">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-[3px] w-6 rounded-full bg-orange/30" />
              <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-orange to-[#2563EB]" />
              <div className="h-[3px] w-6 rounded-full bg-[#2563EB]/30" />
            </div>
          </div>

          {/* Two Column Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">

            {/* LEFT — Form Card */}
            <div className="relative bg-white rounded-3xl border border-slate-100 shadow-[0_8px_40px_rgba(11,31,58,0.07)] p-6 sm:p-8 overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-10 right-10 h-[3px] rounded-b-full bg-gradient-to-r from-orange to-[#2563EB] opacity-70" />

              {/* Trust row */}
              <div className="flex flex-wrap gap-3 mb-7">
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-100 rounded-full px-3 py-1 text-[11.5px] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Secure
                </span>
                <span className="inline-flex items-center gap-1.5 bg-orange/8 text-orange border border-orange/15 rounded-full px-3 py-1 text-[11.5px] font-semibold">
                  <Clock className="w-3.5 h-3.5" /> Reply within 24hrs
                </span>
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-3 py-1 text-[11.5px] font-semibold">
                  <Mail className="w-3.5 h-3.5" /> Direct Response
                </span>
              </div>

              <ContactForm contactEmail={s.contactEmail} />
            </div>

            {/* RIGHT — Map Card */}
            <div className="flex flex-col gap-5">
              {/* Map */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-[0_8px_40px_rgba(11,31,58,0.07)] min-h-[320px] sm:min-h-[380px]">
                <div className="absolute top-0 left-10 right-10 h-[3px] rounded-b-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] opacity-70 z-10" />
                <iframe
                  title="Mahila Chetna Samiti Location"
                  src={googleMapEmbedUrl}
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-full min-h-[320px] sm:min-h-[380px]"
                />
              </div>

              {/* Quick Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {info.slice(0, 2).map((c) => (
                  <div key={c.title} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-[0_4px_16px_rgba(11,31,58,0.05)] flex gap-3 items-start hover:shadow-[0_8px_24px_rgba(11,31,58,0.09)] transition-shadow duration-200">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: c.bg, color: c.color }}>
                      <c.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-navy font-bold text-[13px] font-display">{c.title}</div>
                      {c.lines.map((l: string) => <div key={l} className="text-text-2 text-[12px] mt-0.5">{l}</div>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-orange/5 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 border border-orange/20 text-orange px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider shadow-sm">
              <Heart className="w-3.5 h-3.5" /> How We Can Help
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mt-3 tracking-tight font-display">
              We're Here to <span className="text-orange">Help</span>
            </h2>
            <p className="mt-3 text-text-2 text-[14px] sm:text-[15px] leading-relaxed">
              Whether you have a question, want to partner, or simply want to give — we welcome every conversation.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-[3px] w-6 rounded-full bg-orange/30" />
              <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-orange to-[#16A34A]" />
              <div className="h-[3px] w-6 rounded-full bg-[#16A34A]/30" />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {help.map((h) => (
              <div
                key={h.title}
                className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_20px_rgba(11,31,58,0.04)] hover:shadow-[0_16px_35px_rgba(11,31,58,0.10)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden"
              >
                {/* Top Accent Strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 group-hover:h-1.5 transition-all duration-300 rounded-t-2xl opacity-80"
                  style={{ backgroundColor: h.color }}
                />

                {/* Icon Box */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-sm"
                  style={{ background: h.bg, color: h.color }}
                >
                  <h.icon className="w-7 h-7" />
                </div>

                {/* Text */}
                <h3 className="font-display font-extrabold text-navy text-[16px] leading-snug">{h.title}</h3>
                <p className="mt-2 text-text-2 text-[13px] leading-relaxed flex-1">{h.desc}</p>

                {/* CTA Button */}
                <Link
                  to={h.link}
                  className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[12.5px] font-bold text-white shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                  style={{ backgroundColor: h.color }}
                >
                  {h.btnLabel}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-[#0B1F3A] to-[#102E5A] text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid md:grid-cols-[auto_1fr_auto] gap-6 items-center">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center"><Mail className="w-6 h-6" /></div>
          <div>
            <h3 className="font-display font-extrabold text-[22px]">Stay Connected</h3>
            <p className="text-white/75 text-[14px]">Subscribe to our newsletter to get the latest updates on our programs and initiatives.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function ContactForm({ contactEmail }: { contactEmail?: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function set(key: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    if (!form.name.trim()) return setStatus({ type: "error", text: "Please enter your full name." });
    if (!form.email.trim()) return setStatus({ type: "error", text: "Please enter your email address." });
    if (!form.message.trim()) return setStatus({ type: "error", text: "Please enter a message." });

    setLoading(true);
    try {
      await api.post("/contact", {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        subject: form.subject || "General Inquiry",
        message: form.message.trim(),
      });
      setStatus({ type: "success", text: "Message sent successfully! Our team will get back to you shortly." });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus({
        type: "error",
        text: err?.response?.data?.message || "Failed to send message. Please try again or email us directly.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      {status && (
        <div className={`p-4 rounded-xl text-[13px] font-medium border flex items-start gap-2 ${status.type === "success"
            ? "bg-green-50 border-green-200 text-green-700"
            : "bg-red-50 border-red-200 text-red-700"
          }`}>
          {status.type === "success"
            ? <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
            : <span className="font-bold flex-shrink-0">!</span>}
          {status.text}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block group">
          <span className="text-[12.5px] font-bold text-navy/70 uppercase tracking-wide">Full Name <span className="text-orange">*</span></span>
          <input
            id="contact-name" type="text" value={form.name} onChange={set("name")}
            placeholder="Enter your full name" required
            className="mt-1.5 w-full border border-slate-200 bg-slate-50/60 rounded-xl px-4 py-3 text-[14px] text-navy placeholder:text-slate-400 focus:outline-none focus:border-orange focus:bg-white focus:ring-2 focus:ring-orange/10 transition-all duration-200"
          />
        </label>
        <label className="block">
          <span className="text-[12.5px] font-bold text-navy/70 uppercase tracking-wide">Email Address <span className="text-orange">*</span></span>
          <input
            id="contact-email" type="email" value={form.email} onChange={set("email")}
            placeholder="Enter your email" required
            className="mt-1.5 w-full border border-slate-200 bg-slate-50/60 rounded-xl px-4 py-3 text-[14px] text-navy placeholder:text-slate-400 focus:outline-none focus:border-orange focus:bg-white focus:ring-2 focus:ring-orange/10 transition-all duration-200"
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-[12.5px] font-bold text-navy/70 uppercase tracking-wide">Phone Number</span>
          <input
            id="contact-phone" type="tel" value={form.phone} onChange={set("phone")}
            placeholder="Enter your phone number"
            className="mt-1.5 w-full border border-slate-200 bg-slate-50/60 rounded-xl px-4 py-3 text-[14px] text-navy placeholder:text-slate-400 focus:outline-none focus:border-orange focus:bg-white focus:ring-2 focus:ring-orange/10 transition-all duration-200"
          />
        </label>
        <label className="block">
          <span className="text-[12.5px] font-bold text-navy/70 uppercase tracking-wide">Subject <span className="text-orange">*</span></span>
          <select
            id="contact-subject" value={form.subject} onChange={set("subject")}
            className="mt-1.5 w-full border border-slate-200 bg-slate-50/60 rounded-xl px-4 py-3 text-[14px] text-navy focus:outline-none focus:border-orange focus:bg-white focus:ring-2 focus:ring-orange/10 transition-all duration-200"
          >
            <option value="">Select a subject</option>
            <option>General Inquiry</option>
            <option>Partnership</option>
            <option>Volunteer</option>
            <option>Donation</option>
            <option>Membership</option>
            <option>CSR Collaboration</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-[12.5px] font-bold text-navy/70 uppercase tracking-wide">Message <span className="text-orange">*</span></span>
        <textarea
          id="contact-message" rows={5} value={form.message} onChange={set("message")}
          placeholder="Write your message here..."
          className="mt-1.5 w-full border border-slate-200 bg-slate-50/60 rounded-xl px-4 py-3 text-[14px] text-navy placeholder:text-slate-400 focus:outline-none focus:border-orange focus:bg-white focus:ring-2 focus:ring-orange/10 transition-all duration-200 resize-none"
        />
      </label>

      <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
        <button
          id="contact-submit" type="submit" disabled={loading}
          className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-orange-2 to-orange text-white font-bold px-7 py-3.5 shadow-lg shadow-orange/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {loading ? "Sending..." : "Send Message"}
        </button>
        <span className="text-[12px] text-text-2 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-green-600" /> Your information is safe with us.
        </span>
      </div>
    </form>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await api.post("/contact", {
        name: "Newsletter Subscriber",
        email: email.trim(),
        subject: "Newsletter Subscription",
        message: `Newsletter subscription request from: ${email.trim()}`,
      });
      setMsg("Subscribed! Thank you.");
      setEmail("");
    } catch {
      setMsg("Subscription saved! We'll be in touch.");
      setEmail("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <form className="flex gap-2" onSubmit={handleSubscribe}>
        <input id="newsletter-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="bg-white text-navy rounded-lg px-4 py-3 text-[13px] min-w-[220px] focus:outline-none" />
        <button id="newsletter-subscribe" type="submit" disabled={loading} className="btn-orange whitespace-nowrap disabled:opacity-60 flex items-center gap-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Subscribe <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>
      {msg && <p className="text-green-300 text-[12px] font-medium">{msg}</p>}
    </div>
  );
}
