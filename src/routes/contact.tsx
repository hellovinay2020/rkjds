import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Heart, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight, 
  Loader2, 
  Sparkles,
  Church,
  BookOpen,
  MessageSquare,
  ChevronDown,
  Check
} from "lucide-react";
import { FaDove, FaHandsPraying } from "react-icons/fa6";
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
    {
      icon: FaHandsPraying,
      title: "प्रार्थना व चंगाई निवेदन",
      sub: "Prayer & Healing Requests",
      desc: "बीमारियों, पारिवारिक संकट या किसी भी समस्या के लिए हमारे पादरी एवं मध्यस्थ प्रार्थना दल द्वारा विशेष चंगाई प्रार्थना।",
      badge: "24/7 प्रार्थना",
      color: "#D97706",
      bg: "#FEF3C7",
      link: "/prayer-request",
      btnLabel: "प्रार्थना निवेदन भेजें",
    },
    {
      icon: FaDove,
      title: "पवित्र जल बपतिस्मा",
      sub: "Holy Water Baptism",
      desc: "प्रभु यीशु मसीह के पवित्र नाम में बपतिस्मा संस्कार प्राप्त करने हेतु ऑनलाइन आवेदन करें और प्रमाणपत्र सत्यापित करें।",
      badge: "आत्मिक संस्कार",
      color: "#2563EB",
      bg: "#EFF6FF",
      link: "/baptism-application",
      btnLabel: "बपतिस्मा आवेदन करें",
    },
    {
      icon: CreditCard,
      title: "कलीसिया सदस्यता पहचान पत्र",
      sub: "Membership & ID Card",
      desc: "आर.के. मिनिस्ट्रीज के पंजीकृत सदस्य बनें और अपना आधिकारिक लैमिनेटेड पहचान पत्र व प्रमाणपत्र तुरंत प्राप्त करें।",
      badge: "आधिकारिक सदस्यता",
      color: "#059669",
      bg: "#ECFDF5",
      link: "/member-registration",
      btnLabel: "सदस्यता पंजीकरण करें",
    },
    {
      icon: Heart,
      title: "दशमांश व सेवकाई दान",
      sub: "Tithe & Ministry Support",
      desc: "गाँव-गाँव सुसमाचार प्रचार, बाइबल वितरण और पीड़ित परिवारों की सहायता के लिए अपनी स्वेच्छा से प्रभु के कार्य में बोएं।",
      badge: "प्रभु का कार्य",
      color: "#7C3AED",
      bg: "#F5F3FF",
      link: "/donate",
      btnLabel: "ऑनलाइन दान करें",
    },
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
                  title="RK Ministries Church Location"
                  src={s?.mapEmbedUrl || (s?.contactAddress ? `https://maps.google.com/maps?q=${encodeURIComponent(s.contactAddress)}&hl=en&z=15&output=embed` : googleMapEmbedUrl)}
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-full min-h-[460px] sm:min-h-[520px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Services & How We Can Help Cards */}
      <section className="py-16 bg-slate-50/80 border-t border-slate-200/60 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> आत्मिक एवं कलीसियाई सेवाएँ
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mt-3 tracking-tight font-display">
              हम आपकी किस प्रकार <span className="text-amber-500">सहायता</span> कर सकते हैं?
            </h2>
            <p className="mt-3 text-text-2 text-[14px] sm:text-[15px] leading-relaxed">
              प्रार्थना, पवित्र बपतिस्मा, सदस्यता पहचान पत्र अथवा प्रभु के काम में दान सहयोग — हम सदैव आपके साथ हैं।
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-[3px] w-6 rounded-full bg-amber-400/40" />
              <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-amber-500 to-blue-600" />
              <div className="h-[3px] w-6 rounded-full bg-blue-500/40" />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {help.map((h) => (
              <div
                key={h.title}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(11,31,58,0.05)] hover:shadow-[0_16px_35px_rgba(11,31,58,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden"
              >
                {/* Top Accent Strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 opacity-90"
                  style={{ backgroundColor: h.color }}
                />

                {/* Badge & Icon */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm"
                    style={{ background: h.bg, color: h.color }}
                  >
                    <h.icon className="w-6 h-6" />
                  </div>
                  <span
                    className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border"
                    style={{ background: h.bg, color: h.color, borderColor: `${h.color}33` }}
                  >
                    {h.badge}
                  </span>
                </div>

                {/* Text */}
                <h3 className="font-display font-extrabold text-navy text-[16px] leading-snug">{h.title}</h3>
                <span className="text-[11.5px] font-semibold text-slate-400 mt-0.5 block">{h.sub}</span>
                <p className="mt-2.5 text-text-2 text-[12.5px] leading-relaxed flex-1">{h.desc}</p>

                {/* CTA Button */}
                <Link
                  to={h.link}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[12.5px] font-bold text-white shadow-sm hover:shadow-md transition-all duration-200"
                  style={{ backgroundColor: h.color }}
                >
                  <span>{h.btnLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

const subjectOptions = [
  {
    value: "प्रार्थना व चंगाई निवेदन (Prayer & Healing Request)",
    label: "प्रार्थना व चंगाई निवेदन",
    sub: "Prayer & Healing Request",
    Icon: FaHandsPraying,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    value: "पवित्र बपतिस्मा पूछताछ (Holy Baptism Inquiry)",
    label: "पवित्र बपतिस्मा पूछताछ",
    sub: "Holy Baptism Inquiry",
    Icon: FaDove,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    value: "रविवार आराधना व संगति (Sunday Worship Fellowship)",
    label: "रविवार आराधना व संगति",
    sub: "Sunday Worship Fellowship",
    Icon: Church,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    value: "कलीसिया सदस्यता व ID Card (Membership & ID Card)",
    label: "कलीसिया सदस्यता व ID Card",
    sub: "Church Membership & ID Card",
    Icon: CreditCard,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    value: "पादरी जी से भेंट व परामर्श (Pastoral Counseling)",
    label: "पादरी जी से भेंट व परामर्श",
    sub: "Pastoral Meeting & Counseling",
    Icon: BookOpen,
    iconColor: "text-amber-700",
    bgColor: "bg-amber-100",
  },
  {
    value: "दशमांश / दान व सहयोग (Donation & Tithe Support)",
    label: "दशमांश / दान व सहयोग",
    sub: "Donation & Tithe Support",
    Icon: Heart,
    iconColor: "text-rose-600",
    bgColor: "bg-rose-100",
  },
  {
    value: "अपनी गवाही साझा करें (Share Testimony)",
    label: "अपनी गवाही साझा करें",
    sub: "Share Your Testimony",
    Icon: Sparkles,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    value: "अन्य सामान्य पूछताछ (General Inquiry)",
    label: "अन्य सामान्य पूछताछ",
    sub: "General Inquiry",
    Icon: MessageSquare,
    iconColor: "text-slate-600",
    bgColor: "bg-slate-100",
  },
];

function ContactForm({ contactEmail }: { contactEmail?: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedSubject = subjectOptions.find((opt) => opt.value === form.subject);

  function set(key: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    if (!form.name.trim()) return setStatus({ type: "error", text: "कृपया अपना पूरा नाम दर्ज करें (Please enter your full name)." });
    if (!form.phone.trim() && !form.email.trim()) return setStatus({ type: "error", text: "कृपया अपना मोबाइल नंबर दर्ज करें (Please provide phone number)." });
    if (!form.subject) return setStatus({ type: "error", text: "कृपया संदेश का विषय चुनें (Please select a subject)." });
    if (!form.message.trim()) return setStatus({ type: "error", text: "कृपया अपना संदेश या प्रार्थना का विवरण लिखें (Please enter your message)." });

    setLoading(true);
    try {
      await api.post("/contact", {
        name: form.name.trim(),
        email: form.email.trim() || `${form.phone.trim()}@rkministries.org`,
        phone: form.phone.trim(),
        subject: form.subject,
        message: form.message.trim(),
      });
      setStatus({ type: "success", text: "धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।" });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus({
        type: "error",
        text: err?.response?.data?.message || "संदेश भेजने में त्रुटि हुई। आप सीधे +91 94153 14486 पर संपर्क कर सकते हैं।",
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
          <span className="text-[12.5px] font-bold text-navy/70 uppercase tracking-wide">
            पूरा नाम (Full Name) <span className="text-orange">*</span>
          </span>
          <input
            id="contact-name" type="text" value={form.name} onChange={set("name")}
            placeholder="अपना पूरा नाम दर्ज करें" required
            className="mt-1.5 w-full border border-slate-200 bg-slate-50/60 rounded-xl px-4 py-3 text-[14px] text-navy placeholder:text-slate-400 focus:outline-none focus:border-orange focus:bg-white focus:ring-2 focus:ring-orange/10 transition-all duration-200"
          />
        </label>
        <label className="block">
          <span className="text-[12.5px] font-bold text-navy/70 uppercase tracking-wide">
            मोबाइल नंबर (Phone) <span className="text-orange">*</span>
          </span>
          <input
            id="contact-phone" type="tel" value={form.phone} onChange={set("phone")}
            placeholder="उदा. 9598059289" required
            className="mt-1.5 w-full border border-slate-200 bg-slate-50/60 rounded-xl px-4 py-3 text-[14px] text-navy placeholder:text-slate-400 focus:outline-none focus:border-orange focus:bg-white focus:ring-2 focus:ring-orange/10 transition-all duration-200"
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-[12.5px] font-bold text-navy/70 uppercase tracking-wide">
            ईमेल (Email Address)
          </span>
          <input
            id="contact-email" type="email" value={form.email} onChange={set("email")}
            placeholder="उदा. name@example.com (वैकल्पिक)"
            className="mt-1.5 w-full border border-slate-200 bg-slate-50/60 rounded-xl px-4 py-3 text-[14px] text-navy placeholder:text-slate-400 focus:outline-none focus:border-orange focus:bg-white focus:ring-2 focus:ring-orange/10 transition-all duration-200"
          />
        </label>
        <div className="block relative" ref={dropdownRef}>
          <span className="text-[12.5px] font-bold text-navy/70 uppercase tracking-wide block">
            विषय (Subject) <span className="text-orange">*</span>
          </span>
          <button
            type="button"
            id="contact-subject-btn"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className={`mt-1.5 w-full border rounded-xl px-3.5 py-2.5 text-[14px] text-left transition-all duration-200 flex items-center justify-between gap-2 cursor-pointer ${
              dropdownOpen
                ? "border-amber-500 bg-white ring-2 ring-amber-500/10 shadow-sm"
                : "border-slate-200 bg-slate-50/60 hover:bg-slate-50"
            }`}
          >
            {selectedSubject ? (
              <span className="flex items-center gap-2.5 min-w-0">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${selectedSubject.bgColor} ${selectedSubject.iconColor}`}>
                  <selectedSubject.Icon className="w-4 h-4" />
                </span>
                <span className="truncate font-semibold text-slate-800 text-[13.5px]">
                  {selectedSubject.label} <span className="text-slate-400 font-normal text-xs">({selectedSubject.sub})</span>
                </span>
              </span>
            ) : (
              <span className="text-slate-400 font-medium text-[13.5px]">-- विषय चुनें (Select a Subject) * --</span>
            )}
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${dropdownOpen ? "rotate-180 text-amber-500" : ""}`} />
          </button>

          {/* Hidden input for form state */}
          <input type="hidden" name="subject" value={form.subject} />

          {/* Dropdown Menu with React Icons */}
          {dropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 py-1.5 max-h-[300px] overflow-y-auto">
              {subjectOptions.map((opt) => {
                const isSelected = form.subject === opt.value;
                const OptIcon = opt.Icon;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({ ...prev, subject: opt.value }));
                      setDropdownOpen(false);
                    }}
                    className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-amber-50 text-amber-900 font-bold"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${opt.bgColor} ${opt.iconColor}`}>
                        <OptIcon className="w-4 h-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-slate-900 leading-tight truncate">{opt.label}</div>
                        <div className="text-[11px] text-slate-500 leading-tight mt-0.5 truncate">{opt.sub}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <label className="block">
        <span className="text-[12.5px] font-bold text-navy/70 uppercase tracking-wide">
          संदेश या प्रार्थना का विवरण (Message / Prayer Request) <span className="text-orange">*</span>
        </span>
        <textarea
          id="contact-message" rows={5} value={form.message} onChange={set("message")}
          placeholder="कृपया अपना संदेश, प्रार्थना की आवश्यकता या पूछताछ यहाँ विस्तार से लिखें..."
          className="mt-1.5 w-full border border-slate-200 bg-slate-50/60 rounded-xl px-4 py-3 text-[14px] text-navy placeholder:text-slate-400 focus:outline-none focus:border-orange focus:bg-white focus:ring-2 focus:ring-orange/10 transition-all duration-200 resize-none"
        />
      </label>

      <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
        <button
          id="contact-submit" type="submit" disabled={loading}
          className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-orange-2 to-orange text-white font-bold px-7 py-3.5 shadow-lg shadow-orange/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {loading ? "भेज रहे हैं..." : "संदेश भेजें (Send Message)"}
        </button>
        <span className="text-[12px] text-text-2 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-green-600" /> आपकी जानकारी सुरक्षित व गोपनीय है।
        </span>
      </div>
    </form>
  );
}
