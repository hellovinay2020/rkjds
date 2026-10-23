import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronDown, type LucideIcon } from "lucide-react";
import { FaBullseye, FaCross, FaDove, FaHandsPraying } from "react-icons/fa6";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Preloader from "@/components/Preloader";
import MinistryServicesHub from "@/components/MinistryServicesHub";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import {
  Phone, Mail, Facebook, Instagram, Youtube, Twitter, Linkedin, Search,
  Heart, UserPlus, Award, ShieldCheck, FileCheck2, PieChart, Users,
  Target, Eye, Gem, Sparkles, BookOpen, HeartPulse, GraduationCap,
  Leaf, Scale, HandHeart, Home as HomeIcon, ArrowRight, Calendar, MapPin, IndianRupee, Shield, Copy, Check, Smartphone,
  Quote, CheckCircle2, Building2, BadgeCheck, ChevronRight, Send, Image as ImageIcon, PlayCircle, Play, X, Loader2,
  Bell, QrCode, Church, Receipt,
} from "lucide-react";

import banner1 from "@/assets/herosection/banner1.png";
import banner2 from "@/assets/herosection/banner2.png";
import banner3 from "@/assets/herosection/banner3.png";
import worshipBanner from "@/assets/about/R.K. Ministries Sunrise Worship Banner.png";
import program1 from "@/assets/Our Programs/WomenEmpowermentProgram.png";
import program2 from "@/assets/Our Programs/EducationSupportInitiative.png";
import program3 from "@/assets/Our Programs/HealthSafetyCampaign.png";
import program4 from "@/assets/Our Programs/SkillDevelopmentProgram.png";
import project1 from "@/assets/Featured Projects/SakshamWomenProject.png";
import project2 from "@/assets/Featured Projects/ShikshaSetuProject.png";
import project3 from "@/assets/Featured Projects/SwasthyaSurakshaProject.png";
import project4 from "@/assets/Featured Projects/GramVikasInitiative.png";
import villageGospelProjectImg from "@/assets/project/village-gospel.jpg";
import holyBaptismProjectImg from "@/assets/project/holy-baptism.jpg";
import healingPrayerProjectImg from "@/assets/project/healing-prayer.jpg";
import compassionReliefProjectImg from "@/assets/project/compassion-relief.jpg";
import bibleDistProjectImg from "@/assets/project/bible-distribution.jpg";
import sundayWorshipEventImg from "@/assets/events/sunday-worship.jpg";
import holyBaptismEventImg from "@/assets/events/holy-baptism.jpg";
import fastingPrayerEventImg from "@/assets/events/fasting-prayer.jpg";
import villageOutreachEventImg from "@/assets/events/village-outreach.jpg";
import gallery1 from "@/assets/Causes/GirlChildEducation.png";
import gallery2 from "@/assets/Blogs/HealthAwareness.png";
import gallery3 from "@/assets/herosection/NariSashaktikaran.png";
import gallery4 from "@/assets/Causes/LivelihoodSkills.png";
import gallery5 from "@/assets/Blogs/EmpoweringRuralWomen.png";
import gallery6 from "@/assets/herosection/Shiksha.png";
import video1 from "@/assets/Causes/WomenHealthHygiene.png";
import video2 from "@/assets/Blogs/ImportanceofGirlsEducation.png";
import video3 from "@/assets/herosection/Sahayata.png";
import blog1Img from "@/assets/Blogs/EmpoweringRuralWomen.png";
import blog2Img from "@/assets/Blogs/ImportanceofGirlsEducation.png";
import blog3Img from "@/assets/Blogs/HealthAwareness.png";
import faqImg from "@/assets/faq/faq-church.jpg";
import upiQrFallback from "@/assets/qr-code/qr-code-1.jpeg";
import rameshChairmanImg from "@/assets/Teams/Trustee Chairman Ramesh Kumar.jpeg";

const nav: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Campaigns", to: "/campaigns" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact Us", to: "/contact" },
];

const trust = [
  { icon: ShieldCheck, title: "Trust Reg. No.", sub: "45/2026" },
  { icon: FileCheck2, title: "PAN Card No.", sub: "AANAR9870K" },
  { icon: BadgeCheck, title: "NGO Darpan ID", sub: "UP/2026/1218239" },
  { icon: PieChart, title: "Transparent NGO", sub: "We Ensure Transparency" },
];

const counterIcons: Record<string, LucideIcon> = {
  Users, Home: HomeIcon, BookOpen, HandHeart, GraduationCap,
  HeartPulse, ShieldCheck, Scale, Building2, Heart, Award,
  Target, Eye, Gem, Leaf, Sparkles, UserPlus, Calendar,
  MapPin, Quote, CheckCircle2, ArrowRight, Send,
};

const causeIconMap: Record<string, LucideIcon> = {
  'women-empowerment': Users,
  'girl-child-education': GraduationCap,
  'safety-anti-trafficking': ShieldCheck,
  'health-nutrition': HeartPulse,
  'livelihood-agriculture': HandHeart,
  'elderly-differently-abled': Heart,
};

const focusAreas = [
  { icon: HandHeart, label: "Women\nEmpowerment", color: "#00843D", bg: "#E8F5EE" },
  { icon: BookOpen, label: "Education", color: "#063B76", bg: "#E8F0F8" },
  { icon: HeartPulse, label: "Support &\nCare", color: "#0B5A4A", bg: "#E6F4EF" },
  { icon: ShieldCheck, label: "Safety &\nProtection", color: "#F58220", bg: "#FFF1E5" },
  { icon: GraduationCap, label: "Skill\nDevelopment", color: "#00843D", bg: "#E8F5EE" },
  { icon: Heart, label: "Women\nHealth", color: "#D96B18", bg: "#FFF0E3" },
  { icon: Scale, label: "Legal\nAwareness", color: "#176A8A", bg: "#E7F3F7" },
  { icon: Building2, label: "Rural\nDevelopment", color: "#0B5A4A", bg: "#E6F4EF" },
];

const programs = [
  { img: program1, title: "Women Empowerment Program", desc: "Building confidence, leadership and decision-making skills in women." },
  { img: program2, title: "Education Support Initiative", desc: "Providing quality education to children in rural communities." },
  { img: program3, title: "Health & Safety Campaign", desc: "Spreading health awareness and safety practices in communities." },
  { img: program4, title: "Skill Development Program", desc: "Vocational training for self-reliance and financial independence." },
];

const projects = [
  { img: project1, title: "Saksham Women Project", desc: "Helping women gain skills and become entrepreneurs.", impact: "2,500+ Women" },
  { img: project2, title: "Education Bridge Project", desc: "Education support and resources for rural children.", impact: "1,000+ Children" },
  { img: project3, title: "Health & Safety Project", desc: "Health check-up camps and awareness programs.", impact: "5,000+ Beneficiaries" },
  { img: project4, title: "Gram Vikas Initiative", desc: "Working for village development and livelihoods.", impact: "40+ Villages" },
];

const whyUs = [
  { icon: BookOpen, title: "प्रभु यीशु मसीह का पवित्र वचन", desc: "पवित्र बाइबिल की सच्ची शिक्षाओं और प्रभु यीशु मसीह के सामर्थी वचनों द्वारा जीवन का आत्मिक मार्गदर्शन।", color: "#D97706", badge: "पवित्र बाइबिल सत्य" },
  { icon: FaHandsPraying, title: "चंगाई व अलौकिक छुटकारा", desc: "प्रभु यीशु मसीह के नाम में असाध्य रोगों से चंगाई, पापों से क्षमा और दुष्ट शक्तियों के बंधनों से पूर्ण मुक्ति।", color: "#2563EB", badge: "प्रार्थना द्वारा चंगाई" },
  { icon: FaDove, title: "पवित्र जल बपतिस्मा व शिष्यत्व", desc: "प्रभु यीशु मसीह की आज्ञानुसार जल बपतिस्मा, मसीही शिष्यत्व और कलीसिया में आधिकारिक सदस्यता प्रमाण पत्र।", color: "#059669", badge: "बाइबलीय आज्ञा पालन" },
  { icon: FaCross, title: "जीवंत स्तुति-आराधना व संगति", desc: "प्रत्येक रविवार एवं शुक्रवार को प्रभु यीशु मसीह के चरणों में स्तुति, भक्ति भजन और आत्मीय पारिवारिक फेलोशिप।", color: "#7C3AED", badge: "सामूहिक आराधना" },
  { icon: HandHeart, title: "विधवा व निर्धन प्रेम सेवा", desc: "प्रभु यीशु मसीह के आदेशानुसार असहाय विधवाओं, अनाथों और संकटग्रस्त परिवारों को नियमित राशन व वस्त्र सहायता।", color: "#DC2626", badge: "ईसाई करुणा सेवा" },
  { icon: ShieldCheck, title: "पंजीकृत व समर्पित मिनिस्ट्री", desc: "पंजीकरण संख्या 45/2026, नीति आयोग दर्पण (UP/2026/1218239) प्रमाणित, पास्टर रमेश कुमार के नेतृत्व में पूर्ण समर्पित।", color: "#0D9488", badge: "Reg. 45/2026" },
];

const partners = [
  { name: "TATA GROUP", initials: "TATA", color: "#063B76" },
  { name: "HDFC BANK", initials: "HDFC", color: "#F58220" },
  { name: "NABARD", initials: "NB", color: "#00843D" },
  { name: "SBI", initials: "SBI", color: "#176A8A" },
  { name: "LIC", initials: "LIC", color: "#D96B18" },
  { name: "Airtel", initials: "A", color: "#F58220" },
  { name: "Canara Bank", initials: "CB", color: "#0B5A4A" },
  { name: "Vedanta", initials: "V", color: "#00843D" },
  { name: "Genisteeo", initials: "G", color: "#0B5A4A" },
  { name: "Uber", initials: "U", color: "#063B76" },
];

import ImpactMapSection from "@/components/IndiaImpactMap";
import { getFullUrl } from "@/lib/api";
import api from "@/lib/api";
import { useSiteSettings } from "@/lib/useSiteSettings";
import {
  fetchHomeHero, fetchHomeCounters, fetchHomePrograms, fetchHomeProjects,
  fetchHomeStories, fetchHomeEvents, fetchHomeBlogs, fetchHomeCauses,
  fetchHomeTeam, fetchHomePartners, fetchHomeTestimonials, fetchHomeFAQs,
  fetchHomeGallery, fetchHomeVolunteers, fetchHomeAbout, fetchHomeFounder,
  fetchHomeDonationSettings,
  type HomeHero, type HomeCounter, type HomeProgram, type HomeProject,
  type HomeStory, type HomeEvent, type HomeBlog, type HomeCause,
  type HomeTeam, type HomePartner, type HomeTestimonial, type HomeFAQ,
  type HomePhoto, type HomeVideo, type HomeVolunteer, type HomeAbout, type HomeFounder,
  type DonationSettings,
} from "@/data/homepage";

const indexFaqs = [
  {
    q: "आरके मिनिस्ट्रीज (RK MINISTRIES) क्या है और इसका मुख्य उद्देश्य क्या है?",
    a: "आरके मिनिस्ट्रीज प्रभु यीशु मसीह की एक मसीही चर्च फेलोशिप व पंजीकृत संस्था है (Reg. No. 45/2026, NGO दर्पण: UP/2026/1218239)। इसका मुख्य उद्देश्य प्रभु यीशु मसीह के प्रेम, सुसमाचार प्रचार, निरंतर प्रार्थना, बीमारियों से चंगाई, पापों से छुटकारा और दीन-दुखियों की निःस्वार्थ सेवा करना है।"
  },
  {
    q: "प्रभु यीशु मसीह की रविवार आराधना एवं उपवास प्रार्थना का समय क्या है?",
    a: "प्रत्येक रविवार को मुख्य आराधना, स्तुति व चंगाई प्रार्थना सभा प्रातः 10:00 बजे से दोपहर 1:30 बजे तक होती है। प्रत्येक शुक्रवार को विशेष उपवास व छुटकारा प्रार्थना सभा प्रातः 11:00 बजे से दोपहर 3:00 बजे तक आयोजित की जाती है।"
  },
  {
    q: "प्रभु यीशु मसीह के नाम में व्यक्तिगत प्रार्थना अनुरोध (Prayer Request) कैसे भेजें?",
    a: "आप हमारी वेबसाइट पर 'Prayer Request' पोर्टल के माध्यम से 24x7 ऑनलाइन प्रार्थना अनुरोध भेज सकते हैं, या हमारी प्रार्थना हेल्पलाइन +91 94153 14486 पर सीधे कॉल करके पास्टर जी से प्रार्थना करवा सकते हैं।"
  },
  {
    q: "पवित्र जल बपतिस्मा (Holy Water Baptism) के लिए क्या नियम हैं और कैसे आवेदन करें?",
    a: "प्रभु यीशु मसीह पर विश्वास लाने वाले नए विश्वासी वेबसाइट के 'Baptism Application' फॉर्म द्वारा 2 गवाहों के विवरण के साथ ऑनलाइन आवेदन कर सकते हैं। सत्यापन के उपरांत पवित्र जल बपतिस्मा और आधिकारिक बपतिस्मा प्रमाण पत्र प्रदान किया जाता है।"
  },
  {
    q: "आरके मिनिस्ट्रीज का मुख्य चर्च व प्रार्थना केंद्र कहाँ स्थित है?",
    a: "हमारा मुख्य प्रार्थना केंद्र: ग्राम - मुस्तफाबाद, पोस्ट - गूजरपार, थाना - मुबारकपुर, जनपद - आजमगढ़, उत्तर प्रदेश - 276404 में स्थित है। यहाँ सभी धर्म व जाति के भाई-बहन प्रभु यीशु मसीह के चरणों में शांति व चंगाई पाने हेतु सादर आमंत्रित हैं।"
  },
  {
    q: "कलीसिया की सदस्यता (Membership ID Card) कैसे प्राप्त करें?",
    a: "वेबसाइट पर 'Member Registration' फॉर्म भरकर आप आरके मिनिस्ट्रीज के पंजीकृत सदस्य बन सकते हैं, जिसके बाद आपको तुरंत डिजिटल मेम्बरशिप आईडी कार्ड और सर्टिफिकेट प्राप्त हो जाता है।"
  }
];

function HomeContactSection() {
  const { settings } = useSiteSettings();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const phone = settings?.contactPhone || "+91 94153 14486";
  const email = settings?.contactEmail || "azaramesh@gmail.com";
  const address = settings?.contactAddress || "Village - Mustafabad, Post- Gujarpar, Mubarakpur, Azamgarh, U.P. 276404";
  const mapUrl = settings?.mapEmbedUrl || "https://maps.google.com/maps?q=Mustafabad,+Mubarakpur,+Azamgarh,+Uttar+Pradesh&hl=en&z=14&output=embed";

  const socials = [
    { I: Youtube, href: settings?.socialLinks?.youtube || "https://youtube.com/@rkministry-p9t?si=4qyVyJkr9Mv3YJPh" },
    { I: Facebook, href: settings?.socialLinks?.facebook || "https://www.facebook.com/share/1FKM6aGUFq/" },
    { I: Instagram, href: settings?.socialLinks?.instagram || "https://www.instagram.com/ramesh32086?mdxt=MTV0cGVrczZ6a3BjaQ==" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!form.name.trim()) {
      return setStatus({ type: "error", text: "कृपया अपना नाम दर्ज करें (Please enter your name)." });
    }
    if (!form.phone.trim() && !form.email.trim()) {
      return setStatus({ type: "error", text: "कृपया मोबाइल नंबर या ईमेल दर्ज करें (Please enter your phone or email)." });
    }
    if (!form.message.trim()) {
      return setStatus({ type: "error", text: "कृपया अपना संदेश या प्रार्थना का विवरण लिखें (Please enter your message)." });
    }

    setLoading(true);
    try {
      await api.post("/contact", {
        name: form.name.trim(),
        email: form.email.trim() || `${form.phone.trim()}@rkministries.org`,
        phone: form.phone.trim(),
        subject: form.subject.trim() || "होमपेज पूछताछ व प्रार्थना संदेश (Homepage Inquiry)",
        message: form.message.trim(),
      });
      setStatus({
        type: "success",
        text: "धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।",
      });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus({
        type: "error",
        text: err?.response?.data?.message || "संदेश भेजने में त्रुटि हुई। कृपया सीधे हेल्पलाइन +91 94153 14486 पर संपर्क करें।",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-br from-[#091f82] via-[#102E5A] to-[#091f82] overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-success/20 rounded-full blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 rounded-full px-4 py-1.5 text-orange-2 text-[12px] font-bold uppercase tracking-[0.18em]">
            <Send className="w-3.5 h-3.5" /> Get In Touch
          </div>
          <h2 className="section-title mt-4 text-white">
            We Would Love To <span className="text-orange-2">Hear From You</span>
          </h2>
          <p className="mt-3 text-white/70">
            Have questions, suggestions, or want to collaborate? Reach out — we're always here for you.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[28px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden grid lg:grid-cols-[1fr_1.2fr]">
          {/* Left: info + map */}
          <div className="relative bg-gradient-to-br from-orange to-orange-2 text-white p-8 sm:p-10 flex flex-col gap-6">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <h3 className="text-[22px] sm:text-[26px] font-extrabold leading-tight">Contact Information</h3>
              <p className="mt-2 text-white/85 text-[14px]">Fill the form or reach us directly using the details below.</p>
            </div>

            <div className="relative space-y-3.5">
              {[
                { icon: MapPin, title: "Visit Us", body: address },
                { icon: Phone, title: "Call Us", body: phone },
                { icon: Mail, title: "Email Us", body: email },
              ].map((c) => (
                <div
                  key={c.title}
                  className="group bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/30 rounded-2xl p-4 flex gap-4 items-start transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]"
                >
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-white/20 group-hover:bg-white group-hover:text-orange text-white backdrop-blur border border-white/30 flex items-center justify-center transition-all duration-300">
                    <c.icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">{c.title}</div>
                    <div className="text-[14px] font-semibold mt-1 whitespace-pre-line leading-relaxed text-white">{c.body}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-2">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 mb-3">Follow Us</div>
              <div className="flex gap-2">
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white hover:text-orange backdrop-blur border border-white/20 flex items-center justify-center transition">
                    <s.I className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="relative mt-auto rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl">
              <iframe
                title="Map"
                src={mapUrl}
                className="w-full h-[180px] border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: form */}
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-10 h-[2px] bg-orange rounded-full" />
              <span className="text-orange text-[12px] font-bold uppercase tracking-[0.18em]">Send Message</span>
            </div>
            <h3 className="text-[24px] sm:text-[30px] font-extrabold text-navy leading-tight">Let's Start A Conversation</h3>
            <p className="mt-2 text-text-2 text-[14px]">Drop us a message — we usually respond within 24 hours.</p>

            {status && (
              <div
                className={`mt-4 p-4 rounded-xl text-[13px] font-medium border flex items-start gap-2 ${
                  status.type === "success"
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" />
                ) : (
                  <span className="font-bold flex-shrink-0 text-red-600">!</span>
                )}
                <span>{status.text}</span>
              </div>
            )}

            <form className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit} noValidate>
              <div className="relative group">
                <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-2 group-focus-within:text-orange transition" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Name *"
                  className="w-full bg-secondary border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-[14px] placeholder:text-text-2 focus:outline-none focus:border-orange focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,107,0,0.1)] transition"
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-2 group-focus-within:text-orange transition" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Your Email (optional)"
                  className="w-full bg-secondary border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-[14px] placeholder:text-text-2 focus:outline-none focus:border-orange focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,107,0,0.1)] transition"
                />
              </div>

              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-2 group-focus-within:text-orange transition" />
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Your Phone Number *"
                  className="w-full bg-secondary border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-[14px] placeholder:text-text-2 focus:outline-none focus:border-orange focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,107,0,0.1)] transition"
                />
              </div>

              <div className="relative group">
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-2 group-focus-within:text-orange transition" />
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Subject (e.g. Prayer / Inquiry)"
                  className="w-full bg-secondary border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-[14px] placeholder:text-text-2 focus:outline-none focus:border-orange focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,107,0,0.1)] transition"
                />
              </div>

              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Your Message / Prayer Request..."
                rows={5}
                className="sm:col-span-2 bg-secondary border border-slate-200 rounded-2xl px-4 py-3.5 text-[14px] placeholder:text-text-2 focus:outline-none focus:border-orange focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,107,0,0.1)] transition resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="sm:col-span-2 group relative overflow-hidden bg-gradient-to-r from-orange to-orange-2 text-white rounded-2xl px-6 py-4 font-bold inline-flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,107,0,0.35)] hover:shadow-[0_15px_40px_rgba(255,107,0,0.5)] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    Send Message
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  const [ld, setLd] = useState<any>({
    heroSlides: [], counters: [], programs: [], projects: [], stories: [],
    events: [], blogs: [], causes: [], teamMembers: [], partners: [],
    testimonials: [], faqs: [], gallery: { photos: [], videos: [] },
    volunteers: [], aboutData: null, founderData: null, donationSettings: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "RK MINISTRIES — Church & Evangelical Fellowship | Azamgarh, U.P.";
    async function load() {
      try {
        const [heroSlides, counters, programs, projects, stories, events, blogs, causes, teamMembers, partners, testimonials, faqs, gallery, volunteers, aboutData, founderData, donationSettings] = await Promise.all([
          fetchHomeHero(), fetchHomeCounters(), fetchHomePrograms(), fetchHomeProjects(),
          fetchHomeStories(), fetchHomeEvents(), fetchHomeBlogs(), fetchHomeCauses(),
          fetchHomeTeam(), fetchHomePartners(), fetchHomeTestimonials(), fetchHomeFAQs(),
          fetchHomeGallery(), fetchHomeVolunteers(), fetchHomeAbout(), fetchHomeFounder(),
          fetchHomeDonationSettings(),
        ]);
        setLd({ heroSlides, counters, programs, projects, stories, events, blogs, causes, teamMembers, partners, testimonials, faqs, gallery, volunteers, aboutData, founderData, donationSettings });
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryTab, setGalleryTab] = useState<"photos" | "videos">("photos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const photoItems = ld.gallery.photos.length > 0 ? ld.gallery.photos : [
    { img: gallery1, h: "row-span-2", cls: "h-full min-h-[280px] sm:min-h-[380px]" },
    { img: gallery2, h: "", cls: "h-40 sm:h-48" },
    { img: gallery3, h: "", cls: "h-40 sm:h-48" },
    { img: gallery4, h: "row-span-2", cls: "h-full min-h-[280px] sm:min-h-[380px]" },
    { img: gallery5, h: "", cls: "h-40 sm:h-48" },
    { img: gallery6, h: "", cls: "h-40 sm:h-48" },
  ];
  const videoItems = ld.gallery.videos.length > 0 ? ld.gallery.videos : [
    { img: video1, title: "Worship & Prayer Service", duration: "3:24" },
    { img: video2, title: "Baptism & Testimony", duration: "2:10" },
    { img: video3, title: "Gospel Fellowship", duration: "4:45" },
  ];
  const galleryHasContent = ld.gallery.photos.length > 0 || ld.gallery.videos.length > 0;
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? i : (i + 1) % photoItems.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? i : (i - 1 + photoItems.length) % photoItems.length));
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [lightboxIndex]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="bg-background text-text font-sans">
      {/* Header */}
      <SiteHeader />

      {/* HERO SLIDER */}
      <HeroSlider slides={ld.heroSlides} />

      {/* BRAND NOTE MARQUEE */}
      <section className="overflow-hidden bg-[#0A2540] text-white border-y border-amber-500/30" aria-label="Ministry note">
        <div className="flex items-center min-h-10 sm:min-h-12">
          <div className="relative z-10 shrink-0 bg-amber-500 text-slate-950 px-4 sm:px-7 py-2.5 text-[11px] sm:text-[13px] font-black uppercase tracking-[0.16em] shadow-[8px_0_18px_rgba(2,40,87,0.35)] flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-slate-950" />
            <span>NOTICE</span>
          </div>
          <div className="overflow-hidden whitespace-nowrap">
            <div className="flex w-max animate-[marquee-x_22s_linear_infinite] gap-10 px-6 text-[13px] sm:text-[15px] font-semibold tracking-wide">
              {[1, 2].map((item) => (
                <span key={item} className="flex items-center gap-10">
                  <span className="flex items-center gap-2">
                    <Heart size={16} fill="currentColor" className="text-amber-400" aria-hidden="true" />
                    "प्रभु यीशु मसीह पर विश्वास कर, तो तू और तेरा घराना उद्धार पाएगा।" (प्रेरितों 16:31)
                  </span>
                  <span className="text-amber-400">|</span>
                  <span>ट्रस्ट पंजीयन सं.: 45/2026 • DARPAN ID: UP/2026/1218239 • PAN: AANAR9870K</span>
                  <span className="text-amber-400">|</span>
                  <span>ऑनलाइन बपतिस्मा आवेदन एवं प्रार्थना निवेदन सेवा</span>
                  <span className="text-amber-400">|</span>
                  <span>मुस्तफाबाद, मुबारकपुर, आज़मगढ़ (उ.प्र.) 276404 • हेल्पलाइन: +91 94153 14486 • ईमेल: azaramesh@gmail.com</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RK MINISTRIES DEDICATED SERVICES & SACRAMENTS HUB */}
      <MinistryServicesHub />

      {/* STATS */}
      {ld.counters.length > 0 && (
        <section className="py-12 sm:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
            <div className="eyebrow">Our Impact In Numbers</div>
            <h2 className="section-title mt-2">Every Step Creates A Lasting Change</h2>
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {ld.counters.map((s) => {
                const CIcon = counterIcons[s.icon] || HandHeart;
                return (
                  <div key={s.label} className="card-soft card-soft-hover p-8 text-center">
                    <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center" style={{ background: s.bg, color: s.color }}>
                      <CIcon className="w-7 h-7" />
                    </div>
                    <div className="mt-5 text-[34px] font-extrabold text-navy font-display">{s.num}</div>
                    <div className="text-text-2 text-[14px] mt-1">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ABOUT */}
      <section className="py-12 sm:py-16 lg:py-20 text-justify bg-[linear-gradient(120deg,rgba(19,110,17,0.08),rgba(236,102,17,0.06),rgba(2,40,87,0.08))] overflow-hidden">

        {/* ── Top: Image + Text ─────────────────────────────────────── */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Image col */}
            <div className="relative group">
              {/* Decorative blobs */}
              <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-[rgba(19,110,17,0.10)] blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-[rgba(236,102,17,0.10)] blur-2xl pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
                <img
                  src={ld.aboutData?.mainImage ? getFullUrl(ld.aboutData.mainImage) : (ld.aboutData?.images?.[0] ? getFullUrl(ld.aboutData.images[0]) : worshipBanner)}
                  alt="About RK MINISTRIES"
                  className="w-full h-[280px] sm:h-[360px] lg:h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2E8B57] to-[#1a6035] flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] text-text-2 font-medium uppercase tracking-wide">
                      {ld.aboutData?.impactTitle || "Our Impact"}
                    </p>
                    <p className="text-[13px] font-bold text-navy leading-tight">
                      {ld.aboutData?.impactSubtitle || "Grassroots Change, One Life at a Time"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text col */}
            <div className="flex flex-col">
              <div className="eyebrow">{ld.aboutData?.eyebrow || "About Our Fellowship"}</div>
              <h2 className="section-title mt-2 text-left">
                {ld.aboutData?.heading || "RK MINISTRIES – Spreading Faith, Hope & Salvation"}
              </h2>

              {/* Divider accent */}
              <div className="mt-4 flex items-center gap-2">
                <div className="h-[3px] w-10 rounded-full bg-gradient-to-r from-amber-500 to-[#1E3A8A]" />
                <div className="h-[3px] w-4 rounded-full bg-amber-500/30" />
              </div>

              <div className="mt-4 space-y-3">
                {(ld.aboutData && ld.aboutData.paragraphs.length > 0 ? ld.aboutData.paragraphs : [
                  "RK MINISTRIES (आरके मिनिस्ट्रीज) गाँव मुस्तफाबाद, मुबारकपुर, आज़मगढ़ (उत्तर प्रदेश) में स्थित प्रभु यीशु मसीह की एक सक्रिय कलीसियाई संगति है। हमारा ध्येय सुसमाचार का प्रचार, जल बपतिस्मा, रोगियों के लिए चंगाई प्रार्थना, और आत्मिक व सामाजिक उत्थान करना है।",
                  "हमारा विश्वास है कि प्रभु यीशु मसीह के प्रेम और अनुग्रह से हर टूटा हुआ हृदय चंगाई प्राप्त कर सकता है। गाँव-गाँव में प्रार्थना सभाओं, कुटीर संगति और बाइबिल अध्ययन द्वारा हम जीवन में नई आशा का संचार करते हैं।",
                ]).map((p, i) => (
                  <p key={i} className="text-text-2 leading-[1.8] text-[15px]">{p}</p>
                ))}
              </div>

              {/* Quick-stats row */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {((ld.aboutData?.stats && ld.aboutData.stats.length > 0) ? ld.aboutData.stats : [
                  { num: "10+", label: "Years Active" },
                  { num: "50K+", label: "Lives Touched" },
                  { num: "25+", label: "Programs Run" },
                ]).map((s) => (
                  <div key={s.label} className="text-center rounded-2xl py-4 px-2 bg-white/60 backdrop-blur-sm border border-white/70 shadow-sm">
                    <p className="text-[20px] font-extrabold bg-gradient-to-r from-[#0B1F3A] to-[#1E40AF] bg-clip-text text-transparent leading-tight">{s.num}</p>
                    <p className="text-[11px] text-text-2 font-medium mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7">
                <Link to="/about" className="btn-orange inline-flex items-center gap-2">
                  Read Full Story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Highlights / Experience Counter ───────────────────────── */}
        {(ld.aboutData && (ld.aboutData.highlights.length > 0 || ld.aboutData.expNumber)) && (
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-14 grid md:grid-cols-2 gap-6">
            {ld.aboutData.highlights.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {ld.aboutData.highlights.map((h, i) => (
                  <div key={i} className="card-soft p-5 text-center hover:shadow-md transition-shadow duration-300">
                    {h.icon && <i className={`${h.icon} text-2xl text-orange`} />}
                    <h3 className="mt-3 text-[15px] font-bold text-navy">{h.title}</h3>
                    {h.description && <p className="mt-1 text-text-2 text-[12px] leading-relaxed">{h.description}</p>}
                  </div>
                ))}
              </div>
            )}
            {ld.aboutData.expNumber && (
              <div className="bg-gradient-to-br from-orange to-orange-2 rounded-3xl p-8 flex flex-col items-center justify-center text-white shadow-xl">
                <span className="text-6xl font-extrabold font-display drop-shadow">{ld.aboutData.expNumber}</span>
                <span className="mt-2 text-lg font-semibold opacity-90 tracking-wide">{ld.aboutData.expLabel || 'Years of Experience'}</span>
              </div>
            )}
          </div>
        )}


      </section>

      {/* FOUNDER / CHAIRMAN MESSAGE */}
      {(() => {
        const f = ld.founderData;
        const designation = f?.designation || "संस्थापक एवं ट्रस्टी अध्यक्ष (Founder Chairman & Pastor)";
        const founderName = f?.name || "पास्टर रमेश कुमार";
        const photo = f?.photo ? getFullUrl(f.photo) : rameshChairmanImg;
        const msgTitle = f?.title || "सेवा, समर्पण और सुसमाचार — जीवन बदलने वाली आत्मिक आशीष।";
        const tagText = f?.tag || "पास्टर संदेश (Message from Chairman)";
        const defaultParas = [
          "आरके मिनिस्ट्रीज (RK MINISTRIES) में आपका हार्दिक स्वागत करते हुए मुझे असीम आनंद हो रहा है।",
          "हमारा ध्येय प्रभु यीशु मसीह के प्रेम, चंगाई, जल बपतिस्मा और उद्धार के संदेश को हर गाँव, हर परिवार तक पहुँचाना है। मुस्तफाबाद, मुबारकपुर, आज़मगढ़ (उ.प्र.) से संचालित यह आत्मिक सेवा आज अनेक जीवनों में शांति और नया जीवन ला रही है।",
          "यदि आप किसी भी बीमारी, पारिवारिक क्लेश या आत्मिक संकट में हैं, तो हमारी प्रार्थना टीम आपके साथ खड़ी है। आइए, विश्वास के साथ मिलकर प्रभु की स्तुति करें।",
          "सप्रेम जय मसीह की — पास्टर रमेश कुमार, चेयरमैन, RK MINISTRIES"
        ];
        const msgParagraphs: string[] = (f?.paragraphs && f.paragraphs.length > 0) ? f.paragraphs : defaultParas;
        return (
          <section className="py-12 sm:py-16 lg:py-20 bg-[#F7F4EC] overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

              {/* Section header — centered */}
              <div className="text-center mb-10 lg:mb-14">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 text-amber-800 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wider">
                  <Quote className="w-3.5 h-3.5" /> {tagText}
                </div>
                <h2 className="font-display font-extrabold text-navy text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.1] mt-4 max-w-3xl mx-auto">
                  {msgTitle}
                </h2>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="h-[3px] w-6 rounded-full bg-amber-500/30" />
                  <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-amber-500 to-[#1E3A8A]" />
                  <div className="h-[3px] w-6 rounded-full bg-amber-500/30" />
                </div>
              </div>

              {/* Content grid */}
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">

                {/* Photo card */}
                <div className="lg:col-span-4 flex flex-col items-center lg:sticky lg:top-28">
                  <div className="relative w-full max-w-[360px] rounded-3xl bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-4 hover:shadow-[0_12px_50px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                    {/* Top accent */}
                    <div className="absolute top-0 left-10 right-10 h-[3px] rounded-b-full bg-gradient-to-r from-amber-500 to-amber-600 opacity-70" />

                    <div className="relative group">
                      {/* Decorative blobs */}
                      <div className="absolute -top-8 -left-8 w-28 h-28 rounded-full bg-amber-500/12 blur-2xl pointer-events-none" />
                      <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-navy/6 blur-3xl pointer-events-none" />

                      {/* Image */}
                      <div className="relative rounded-2xl overflow-hidden ring-1 ring-black/5 bg-slate-100">
                        <img
                          src={photo}
                          alt={`${founderName} - ${designation}`}
                          width={1024}
                          height={1280}
                          loading="lazy"
                          className="w-full h-[360px] sm:h-[420px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Bottom gradient overlay */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B1F3A]/95 via-[#0B1F3A]/60 to-transparent pt-16 pb-4 px-4 text-center">
                          <p className="text-[15px] font-bold text-amber-300">{founderName}</p>
                          <p className="text-[11px] uppercase tracking-[0.1em] text-white/90 font-medium">{designation}</p>
                        </div>
                      </div>
                    </div>

                    {/* Signature strip inside card */}
                    <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#F7F4EC]/80 px-4 py-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-sm text-white">
                        <FaCross className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-[#0A2540]">{founderName}</p>
                        <p className="text-[11px] text-slate-600 font-medium">{designation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message card */}
                <div className="lg:col-span-8">
                  <div className="relative rounded-3xl bg-white/80 backdrop-blur-sm border border-white/90 shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-6 sm:p-8 lg:p-10 hover:shadow-[0_12px_50px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                    {/* Top accent */}
                    <div className="absolute top-0 left-10 right-10 h-[3px] rounded-b-full bg-gradient-to-r from-[#2E8B57] to-orange opacity-60" />

                    {/* Large decorative quote */}
                    <div className="hidden lg:block mb-3">
                      <Quote className="w-10 h-10 text-orange/15 rotate-180" />
                    </div>

                    {/* Paragraphs with timeline dots */}
                    <div className="relative pl-6 sm:pl-8">
                      {/* Vertical line */}
                      <div className="absolute left-0 sm:left-2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-orange/40 via-orange/15 to-transparent rounded-full" />

                      <div className="space-y-5 text-justify">
                        {msgParagraphs.map((p, i) => (
                          <div key={i} className="relative">
                            {/* Timeline dot */}
                            <div className="absolute -left-6 sm:-left-8 top-1.5 flex items-center justify-center">
                              <div className={`w-3 h-3 rounded-full border-2 ${i === 0 ? 'bg-orange border-orange shadow-[0_0_8px_rgba(255,107,0,0.4)]' : 'bg-white border-orange/30'}`} />
                            </div>
                            <p className="text-text-2 leading-[1.85] text-[15px]">{p}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quote callout */}
                    {f?.quote && (
                      <div className="mt-8 rounded-2xl bg-gradient-to-r from-orange/5 to-[#2E8B57]/5 border border-orange/10 px-6 py-5 flex items-start gap-3">
                        <Quote className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                        <p className="italic text-[15px] text-navy/80 font-medium leading-relaxed">{f.quote}</p>
                      </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <Link to="/donate" className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-orange-2 to-orange text-white font-semibold px-7 py-3.5 shadow-lg shadow-orange/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange/30 transition-all duration-300">
                        <Heart className="w-4 h-4 fill-white" /> Support Our Mission
                      </Link>
                      <Link to="/founder" className="group inline-flex items-center gap-2 rounded-full border-2 border-navy/12 bg-[#F7F4EC]/60 text-navy font-semibold px-7 py-3.5 hover:border-orange hover:text-orange hover:bg-white transition-all duration-300">
                        Read Full Message <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* PROJECTS — after founder section (static) */}
      {(() => {
        const staticProjects = [
          {
            title: "Village Gospel Outreach & Fellowship (ग्राम संगति व सुसमाचार प्रचार)",
            desc: "Spreading the gospel of Lord Jesus Christ, holding open-air prayer meetings and establishing village fellowships across rural Uttar Pradesh.",
            impact: "3,500+ Believers",
            slug: "village-gospel-fellowship",
            img: villageGospelProjectImg,
          },
          {
            title: "Healing Prayer & Fasting Deliverance Ministry (चंगाई व उपवास प्रार्थना)",
            desc: "Dedicated weekly Sunday and Friday fasting prayer services interceding for the sick, broken-hearted, and burdened souls.",
            impact: "10,000+ Prayers",
            slug: "healing-prayer-ministry",
            img: healingPrayerProjectImg,
          },
          {
            title: "Holy Water Baptism & Spiritual Discipleship (पवित्र जल बपतिस्मा)",
            desc: "Guiding new believers through repentance, water baptism in the name of the Father, Son, and Holy Spirit, and foundational discipleship.",
            impact: "850+ Baptisms",
            slug: "holy-baptism-mission",
            img: holyBaptismProjectImg,
          },
          {
            title: "Christian Compassion: Widow & Poor Relief (विधवा व निर्धन सहायता)",
            desc: "Following Christ's command to care for widows and fatherless through monthly food ration kits, warm blankets, and medical support.",
            impact: "1,200+ Families",
            slug: "compassion-widow-relief",
            img: compassionReliefProjectImg,
          },
          {
            title: "Holy Bible Distribution & Sunday School (पवित्र बाइबिल वितरण व संडे स्कूल)",
            desc: "Providing free Hindi Holy Bibles to seekers, scripture study materials, and Christian moral education to village children.",
            impact: "5,000+ Bibles",
            slug: "bible-distribution-education",
            img: bibleDistProjectImg,
          },
        ];
        const displayProjects = (ld.projects && ld.projects.length > 0) ? ld.projects : staticProjects;
        return (
          <section className="py-12 sm:py-16 bg-white overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

              {/* Section header */}
              <div className="text-center mb-10 lg:mb-14">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 text-orange px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Our Ministries & Missions
                </div>
                <h2 className="section-title mt-3">Our Ministries & Missions</h2>
                <p className="mt-3 text-text-2 text-[15px] max-w-2xl mx-auto leading-relaxed">
                  Explore our grassroots ministries and missions making real, measurable impact in communities across the region.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="h-[3px] w-6 rounded-full bg-orange/30" />
                  <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-orange to-[#2E8B57]" />
                  <div className="h-[3px] w-6 rounded-full bg-[#2E8B57]/30" />
                </div>
              </div>

              {/* Cards grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {displayProjects.map((p, idx) => (
                  <div
                    key={p.slug || p.title || idx}
                    className="group relative rounded-3xl bg-white border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-400 overflow-hidden"
                  >
                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full opacity-70"
                      style={{ background: ['#2E8B57', '#FF6B00', '#2563EB', '#e74c3c', '#8e44ad'][idx % 5] }}
                    />

                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.title}
                        width={640}
                        height={400}
                        loading="lazy"
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Impact badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[11px] font-bold text-orange px-3 py-1.5 rounded-full shadow-sm ring-1 ring-black/5">
                        <FaBullseye className="w-3 h-3" /> {p.impact}
                      </div>

                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-[16px] font-bold text-navy leading-snug group-hover:text-orange transition-colors duration-200">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-[13px] text-text-2 leading-relaxed line-clamp-2">{p.desc}</p>

                      <div className="mt-4 pt-3 border-t border-gray-100">
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

              {/* CTA */}
              <div className="text-center mt-12">
                <Link to="/campaigns" className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-orange-2 to-orange text-white font-semibold px-8 py-3.5 shadow-lg shadow-orange/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange/30 transition-all duration-300">
                  View All Project <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* EVENTS — static */}
      {(() => {
        const staticEvents = [
          {
            title: "प्रभु यीशु मसीह रविवार महान चंगाई व आराधना महोत्सव",
            desc: "प्रभु यीशु मसीह के सामर्थी नाम में रविवार की विशेष आराधना, स्तुति व चंगाई प्रार्थना।",
            date: "Every Sunday",
            location: "आरके मिनिस्ट्रीज मुख्य प्रार्थना भवन, आजमगढ़",
            category: "आराधना व चंगाई",
            slug: "sunday-healing-prayer-service",
            img: sundayWorshipEventImg,
          },
          {
            title: "प्रभु यीशु मसीह शुक्रवार उपवास व विशेष छुटकारा प्रार्थना",
            desc: "प्रभु यीशु मसीह के पवित्र चरणों में उपवास, पश्चाताप और संकटों से आत्मिक छुटकारे हेतु प्रार्थना।",
            date: "Every Friday",
            location: "आरके मिनिस्ट्रीज प्रार्थना भवन, आजमगढ़",
            category: "उपवास प्रार्थना",
            slug: "friday-fasting-prayer",
            img: fastingPrayerEventImg,
          },
          {
            title: "प्रभु यीशु मसीह पवित्र जल बपतिस्मा दीक्षा समारोह",
            desc: "प्रभु यीशु मसीह के सुसमाचार पर विश्वास लाकर नए विश्वासियों का पवित्र जल बपतिस्मा समर्पण।",
            date: "28 July 2026",
            location: "आरके मिनिस्ट्रीज बपतिस्मा सरोवर, आजमगढ़",
            category: "पवित्र बपतिस्मा",
            slug: "holy-baptism-service",
            img: holyBaptismEventImg,
          },
          {
            title: "प्रभु यीशु मसीह ग्रामीण सुसमाचार प्रचार व प्रेम सेवा संगति",
            desc: "प्रभु यीशु मसीह के प्रेम का संदेश, सुसमाचार सभा और निःशुल्क राशन किट व कंबल वितरण।",
            date: "15 August 2026",
            location: "गूजरपार व मुबारकपुर क्षेत्र, आजमगढ़",
            category: "सुसमाचार प्रचार",
            slug: "village-outreach-gospel-fellowship",
            img: villageOutreachEventImg,
          },
        ];

        const displayEvents = (ld.events && ld.events.length > 0) ? ld.events : staticEvents;
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
                  Events & Worship Services
                </h2>
                <p className="mt-3 text-text-2 text-[15px] max-w-xl mx-auto leading-relaxed">
                  प्रभु यीशु मसीह की पवित्र संगति, स्तुति-आराधना, उपवास प्रार्थना व सुसमाचार सेवा महोत्सवों में सम्मिलित हों।
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="h-[3px] w-6 rounded-full bg-orange/30" />
                  <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-orange to-[#2E8B57]" />
                  <div className="h-[3px] w-6 rounded-full bg-[#2E8B57]/30" />
                </div>
              </div>

              {/* Events Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayEvents.map((e, idx) => {
                  const day = e.day || (e.date ? e.date.split(" ")[0] : "Sun");
                  const month = e.month || (e.date ? e.date.split(" ")[1] : "Worship");
                  const accent = cardAccents[idx % cardAccents.length];

                  return (
                    <div
                      key={e.slug || e.title || idx}
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
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-navy text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm ring-1 ring-black/5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                          <span>{e.category}</span>
                        </div>

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
                            <div className="inline-flex items-center gap-2 text-[12px] text-text-2">
                              <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                <MapPin className="w-3.5 h-3.5 text-[#2E8B57]" />
                              </div>
                              <span className="truncate">{e.location}</span>
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

              {/* Bottom CTA */}
              <div className="text-center mt-10 sm:mt-12">
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-orange to-[#e56000] text-white font-bold text-[14px] shadow-lg shadow-orange/25 hover:shadow-orange/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
                >
                  <span>View All Upcoming Events</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* FOCUS AREAS */}
      {(() => {
        const focusAreasList = [
          {
            icon: FaCross,
            label: "प्रभु यीशु मसीह सुसमाचार प्रचार",
            desc: "प्रभु यीशु मसीह के जीवनदायी सुसमाचार, शांति, सत्य व अनंत जीवन का संदेश गांव-गांव और जन-जन तक पहुंचाना।",
            color: "#D97706",
            bg: "#FEF3C7",
          },
          {
            icon: FaHandsPraying,
            label: "चंगाई व अलौकिक छुटकारा प्रार्थना",
            desc: "प्रभु यीशु मसीह के सामर्थी नाम में असाध्य बीमारियों, दुष्ट आत्माओं और पारिवारिक संकटों से पूर्ण चंगाई व छुटकारा।",
            color: "#2563EB",
            bg: "#EFF6FF",
          },
          {
            icon: FaDove,
            label: "पवित्र जल बपतिस्मा व शिष्यत्व",
            desc: "प्रभु यीशु मसीह की आज्ञानुसार पिता, पुत्र व पवित्र आत्मा के नाम में बपतिस्मा और मसीही जीवन का समर्पण।",
            color: "#059669",
            bg: "#ECFDF5",
          },
          {
            icon: BookOpen,
            label: "पवित्र बाइबिल अध्ययन व संडे स्कूल",
            desc: "प्रभु यीशु मसीह के जीवित वचनों की शिक्षा, बच्चों का संडे स्कूल और ग्रामीण अंचलों में निःशुल्क बाइबिल वितरण।",
            color: "#7C3AED",
            bg: "#F5F3FF",
          },
          {
            icon: HandHeart,
            label: "विधवा व अनाथ करुणा सेवा",
            desc: "प्रभु यीशु मसीह के प्रेम के अनुसार असहाय विधवाओं, अनाथों और निर्धन परिवारों को मासिक राशन किट व वस्त्र सहायता।",
            color: "#DC2626",
            bg: "#FEF2F2",
          },
          {
            icon: HeartPulse,
            label: "निःशुल्क चिकित्सा व स्वास्थ्य सेवा",
            desc: "प्रभु यीशु मसीह की दया भावना से सुदूर ग्रामीण अंचलों में निःशुल्क स्वास्थ्य शिविर, डॉक्टर परामर्श व दवा वितरण।",
            color: "#0D9488",
            bg: "#F0FDFA",
          },
          {
            icon: Users,
            label: "ग्राम संगति व पारिवारिक प्रार्थना",
            desc: "प्रभु यीशु मसीह के नाम में परिवारों को जोड़ना, गांव-गांव प्रार्थना सेल और समाज में आपसी प्रेम व शांति की स्थापना।",
            color: "#1E40AF",
            bg: "#EEF2FF",
          },
          {
            icon: ShieldCheck,
            label: "आध्यात्मिक परामर्श व शांति मिशन",
            desc: "प्रभु यीशु मसीह की शिक्षाओं द्वारा भटके हुए युवाओं को सही मार्ग, नशामुक्ति और परिवारों को शांति व संबल प्रदान करना।",
            color: "#B45309",
            bg: "#FFFBEB",
          },
        ];

        return (
          <section className="py-16 sm:py-20 lg:py-24 my-6 sm:my-10">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
              {/* Header */}
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 border border-orange/20 text-orange px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-orange" /> प्रभु यीशु मसीह आत्मिक व सेवा क्षेत्र (Our Focus Areas)
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mt-3 tracking-tight">
                  प्रभु यीशु मसीह का पवित्र सुसमाचार, चंगाई व दया सेवा — हमारा समर्पण
                </h2>
                <p className="mt-3 text-text-2 text-[15px] max-w-2xl mx-auto leading-relaxed">
                  प्रभु यीशु मसीह के प्रेम, पवित्र वचन और शिक्षाओं के अनुसार आत्मिक उद्धार, चंगाई प्रार्थना, पवित्र जल बपतिस्मा और दीन-दुखियों की निःस्वार्थ सेवा।
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="h-[3px] w-6 rounded-full bg-orange/30" />
                  <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-orange to-[#00843D]" />
                  <div className="h-[3px] w-6 rounded-full bg-[#00843D]/30" />
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {focusAreasList.map((f) => (
                  <div
                    key={f.label}
                    className="group relative flex flex-col p-6 sm:p-7 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                  >
                    {/* Top colored accent line on hover */}
                    <div
                      className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: f.color }}
                    />

                    <div>
                      {/* Icon */}
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm"
                        style={{ background: f.bg, color: f.color }}
                      >
                        <f.icon className="w-7 h-7" />
                      </div>

                      {/* Title */}
                      <h3 className="mt-5 text-[16px] sm:text-[17px] font-bold text-navy group-hover:text-orange transition-colors duration-200 leading-snug">
                        {f.label}
                      </h3>

                      {/* Description */}
                      <p className="mt-2.5 text-[13px] text-text-2 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* BLOGS — static */}
      {(() => {
        const staticBlogs = [
          {
            title: "How Skill Training is Reshaping Rural Women's Lives",
            desc: "Stories from our Saksham centers where women are turning training into thriving micro-enterprises across rural Uttar Pradesh.",
            date: "Jun 18, 2026",
            category: "Women Empowerment",
            readTime: "4 min read",
            slug: "skill-training-rural-women",
            img: blog1Img,
          },
          {
            title: "Bridging the Learning Gap: 1,000 Children, One Mission",
            desc: "How the Education Bridge program is bringing digital classrooms and confidence to government schools across UP.",
            date: "Jun 04, 2026",
            category: "Education",
            readTime: "5 min read",
            slug: "bridging-learning-gap",
            img: blog2Img,
          },
          {
            title: "120 Health Camps Later — Lessons from the Field",
            desc: "What two years of mobile health camps taught us about preventive care and community wellness in rural India.",
            date: "May 22, 2026",
            category: "Health",
            readTime: "3 min read",
            slug: "health-camps-lessons",
            img: blog3Img,
          },
        ];
        return null; // Blog section removed
      })()}

      {/* PROGRAMS */}
      {ld.programs.length > 0 && (
        <section className="py-10 sm:py-14 bg-[#EEF4FB]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[280px_1fr] gap-8">
            <div>
              <div className="eyebrow">Our Programs</div>
              <h2 className="section-title mt-2">Programs That Bring Real Change</h2>
              <p className="mt-3 text-text-2 text-[14px] leading-relaxed">Our programs change lives, create opportunities and strengthen communities.</p>
              <Link to="/programs" className="btn-orange mt-5">View All Programs <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {ld.programs.map((p) => (
                <div key={p.title} className="card-soft card-soft-hover overflow-hidden">
                  {p.img && <img src={p.img} alt={p.title} width={640} height={512} loading="lazy" className="w-full h-40 object-cover" />}
                  <div className="p-5">
                    <h3 className="text-[15px] font-bold text-navy leading-snug">{p.title}</h3>
                    <p className="mt-2 text-[13px] text-text-2 leading-relaxed">{p.desc}</p>
                    <Link to="/programs" className="mt-3 inline-flex items-center gap-1 text-[13px] text-orange font-semibold">Learn More <ArrowRight className="w-3.5 h-3.5" /></Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}



      {/* STORIES */}
      {ld.stories.length > 0 && (
        <section className="py-10 sm:py-14 bg-[#F2EEFB]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[280px_1fr] gap-8 items-start">
            <div>
              <div className="eyebrow text-success" style={{ color: "#00843D" }}>Success Stories</div>
              <h2 className="section-title mt-2">Stories Of Transformation</h2>
              <p className="mt-3 text-text-2 text-[14px] leading-relaxed">Real stories from real people whose lives have been changed through our initiatives.</p>
              <Link to="/success-stories" className="btn-navy-outline mt-5">Read More Stories <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {ld.stories.map((s) => (
                <div key={s.name} className="card-soft card-soft-hover p-6 relative">
                  <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-success/10 flex items-center justify-center" style={{ background: "rgba(0,132,61,0.1)" }}>
                    <Quote className="w-4 h-4" style={{ color: "#00843D" }} />
                  </div>
                  {s.img && <img src={s.img} alt={s.name} width={512} height={512} loading="lazy" className="w-14 h-14 rounded-full object-cover" />}
                  <p className="mt-4 text-[13px] text-text leading-relaxed">"{s.text}"</p>
                  <div className="mt-4 pt-3 border-t border-border">
                    <div className="text-[14px] font-bold text-navy">— {s.name}</div>
                    <div className="text-[12px] text-text-2">{s.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MAKE A DIFFERENCE — Every Rupee You Give Changes a Life */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#FAF8F5] via-[#FDFBF7] to-[#F5F2EB] border-t border-slate-100 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange/10 text-orange text-[12px] font-bold uppercase tracking-wider">
              Make a Difference
            </span>
            <h2 className="text-[32px] sm:text-[40px] font-extrabold text-navy font-display leading-tight mt-4">
              Every Rupee You Give <span className="text-orange">Changes a Life</span>
            </h2>
            <div className="mt-3 h-1 w-16 bg-orange rounded-full" />
            <p className="mt-5 text-text-2 text-[15px] leading-relaxed">
              Your offerings, tithes, and donations directly support RKV MINISTRIES, Sunday worship services, village gospel outreach, baptism sacraments, prayer fellowship, and community aid in Azamgarh, Uttar Pradesh.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {homeDonateCauses.map((c) => (
                <div
                  key={c.title}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 sm:gap-4 hover:shadow-md hover:border-amber-400/50 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: `${c.color}15`, color: c.color }}
                  >
                    <c.icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-navy text-[14.5px] font-display truncate leading-tight">
                      {c.title}
                    </div>
                    <div className="text-[11.5px] text-slate-400 font-medium truncate mt-0.5">
                      {c.subtitle}
                    </div>
                    <div
                      className="text-[12.5px] font-bold mt-1 inline-block"
                      style={{ color: c.color }}
                    >
                      {c.amount}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {homeDonateTrust.map((t) => (
                <div key={t.title} className="bg-white border border-border rounded-[16px] p-5 text-center shadow-sm">
                  <t.icon className="w-7 h-7 text-orange mx-auto" />
                  <div className="font-bold text-navy mt-2 text-[14px] font-display">{t.title}</div>
                  <div className="text-[12px] text-text-2 mt-1 leading-relaxed">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full">
            <HomeDonateForm ds={ld.donationSettings} />
          </div>
        </div>
      </section>

      {/* DIRECT DONATIONS — QR + Bank Transfer */}
      <DirectDonationsSection ds={ld.donationSettings} />

      {/* WHY US */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 border border-orange/20 text-orange px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-orange" /> प्रभु यीशु मसीह पर विश्वास व संगति (Why Choose Us)
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mt-3 tracking-tight">
              प्रभु यीशु मसीह के वचनों में <span className="text-orange">सच्चा विश्वास और आत्मिक रूपांतरण</span>
            </h2>
            <p className="mt-3 text-text-2 text-[14px] sm:text-[15px] leading-relaxed">
              प्रभु यीशु मसीह की जीवित उपस्थिति, निरंतर उपवास व चंगाई प्रार्थना, पवित्र बाइबिल शिक्षा और समर्पित सेवा के माध्यम से जीवन में सच्ची शांति, उद्धार और आत्मिक उन्नति।
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-[3px] w-6 rounded-full bg-orange/30" />
              <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-orange to-[#00843D]" />
              <div className="h-[3px] w-6 rounded-full bg-[#00843D]/30" />
            </div>
          </div>

          {/* 6 Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {whyUs.map((w, idx) => (
              <div
                key={w.title}
                className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_20px_rgba(11,31,58,0.04)] hover:shadow-[0_16px_35px_rgba(11,31,58,0.09)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Subtle Accent Strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover:h-1.5 transition-all duration-300"
                  style={{ backgroundColor: w.color }}
                />

                {/* Card Top: Icon & Step Number */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm"
                    style={{ background: `${w.color}15`, color: w.color }}
                  >
                    <w.icon className="w-7 h-7" />
                  </div>
                  <span className="text-[12px] font-extrabold text-slate-300 tracking-wider">
                    0{idx + 1}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-[17px] sm:text-[18px] font-bold text-navy group-hover:text-orange transition-colors">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-[13px] sm:text-[14px] text-text-2 leading-relaxed">
                    {w.desc}
                  </p>
                </div>

                {/* Bottom Trust Badge */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center text-[11px] font-semibold text-slate-400">
                  <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: w.color }} /> {w.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* GALLERY — full width */}
      {galleryHasContent && (
        <section className="py-16 sm:py-20 bg-[#091f82] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #F58220 0%, transparent 40%), radial-gradient(circle at 80% 80%, #00843D 0%, transparent 40%)" }} />
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="eyebrow text-orange-2" style={{ color: "#FF8C2B" }}>Gallery Preview</div>
              <h2 className="section-title mt-2 text-white">Moments Of Impact</h2>
              <p className="mt-3 text-white/70">Glimpses from our programs, events and the communities we serve every day.</p>
            </div>
            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full p-1.5">
                <button
                  onClick={() => setGalleryTab("photos")}
                  className={`inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-sm font-bold transition-all ${galleryTab === "photos"
                    ? "bg-gradient-to-r from-orange to-[#FF8C2B] text-white shadow-[0_10px_30px_-10px_rgba(255,107,0,0.7)]"
                    : "text-white/80 hover:text-white"
                    }`}
                >
                  <ImageIcon className="w-4 h-4" /> Photos
                </button>
                <button
                  onClick={() => setGalleryTab("videos")}
                  className={`inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-sm font-bold transition-all ${galleryTab === "videos"
                    ? "bg-gradient-to-r from-orange to-[#FF8C2B] text-white shadow-[0_10px_30px_-10px_rgba(255,107,0,0.7)]"
                    : "text-white/80 hover:text-white"
                    }`}
                >
                  <PlayCircle className="w-4 h-4" /> Videos
                </button>
              </div>
            </div>

            {galleryTab === "photos" ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {photoItems.map((g, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className={`group relative overflow-hidden rounded-2xl ${g.h} text-left focus:outline-none focus:ring-2 focus:ring-orange`}
                  >
                    <img src={g.img} alt="" loading="lazy" className={`w-full ${g.cls} object-cover transition-transform duration-700 group-hover:scale-110`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-3 left-3 right-3 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="text-white text-[13px] font-bold">Mahila Chetna Samiti </div>
                      <div className="text-white/80 text-[11px]">Community impact moment</div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {videoItems.map((v, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                    <img src={v.img} alt={v.title} loading="lazy" className="w-full h-52 sm:h-60 object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110">
                        <Play className="w-7 h-7 text-orange ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                      {v.duration}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-white text-[14px] font-bold leading-tight">{v.title}</div>
                      <div className="text-white/70 text-[11px] mt-0.5">Mahila Chetna Samiti </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-10">
              <Link to="/gallery" className="inline-flex items-center gap-2 bg-white text-navy rounded-[14px] px-6 py-3 font-bold hover:bg-orange hover:text-white transition">
                View Full {galleryTab === "photos" ? "Photo" : "Video"} Gallery <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* LIGHTBOX */}
          {lightboxIndex !== null && (
            <div
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
              onClick={() => setLightboxIndex(null)}
            >
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
                aria-label="Close"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? i : (i - 1 + photoItems.length) % photoItems.length)); }}
                aria-label="Previous"
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? i : (i + 1) % photoItems.length)); }}
                aria-label="Next"
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <img
                src={photoItems[lightboxIndex].img}
                alt=""
                onClick={(e) => e.stopPropagation()}
                className="max-w-[92vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="absolute bottom-5 left-0 right-0 text-center text-white/80 text-sm">
                {lightboxIndex + 1} / {photoItems.length}
              </div>
            </div>
          )}
        </section>
      )}

      {/* TEAM MEMBERS */}
      {false && ld.teamMembers.length > 0 && (
        <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-secondary/40">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="text-center">
              <div className="inline-block">
                <span className="eyebrow italic tracking-[0.25em]">TEAM MEMBER</span>
                <span className="block h-[2px] w-12 bg-orange mx-auto mt-1.5 rounded-full" />
              </div>
              <h2 className="section-title mt-3">
                Our <span className="text-orange">Team Member</span>
              </h2>
            </div>

            <Carousel opts={{ align: "start", loop: true }} className="mt-14 px-2">
              <CarouselContent className="-ml-4 pb-4">
                {ld.teamMembers.map((t) => (
                  <CarouselItem key={t.name} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                    <div className="group flex flex-col h-full bg-white rounded-[24px] overflow-hidden border border-slate-100 hover:border-orange/20 shadow-[0_4px_20px_rgba(11,31,58,0.03)] hover:shadow-[0_20px_40px_rgba(11,31,58,0.08)] transition-all duration-500 hover:-translate-y-2">
                      {/* Photo Container */}
                      <div className="relative overflow-hidden aspect-[4/5]">
                        {t.img ? (
                          <img
                            src={t.img}
                            alt={t.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange/20 to-success/20 flex items-center justify-center">
                            <span className="text-navy/30 font-extrabold text-[48px]">{t.name?.charAt(0) || '?'}</span>
                          </div>
                        )}
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#091f82]/90 via-[#091f82]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                          {/* Social Links on Hover */}
                          <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                            <a href="https://youtube.com/@rkministry-p9t?si=4qyVyJkr9Mv3YJPh" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF6B00] backdrop-blur-md flex items-center justify-center text-white transition-colors duration-300">
                              <Youtube className="w-4 h-4" />
                            </a>
                            <a href="https://www.facebook.com/share/1FKM6aGUFq/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF6B00] backdrop-blur-md flex items-center justify-center text-white transition-colors duration-300">
                              <Facebook className="w-4 h-4" />
                            </a>
                            <a href="mailto:azaramesh@gmail.com" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF6B00] backdrop-blur-md flex items-center justify-center text-white transition-colors duration-300">
                              <Mail className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                        <span className="absolute top-4 right-4 text-[10px] font-bold font-display px-3 py-1.5 rounded-full backdrop-blur-md text-white bg-black/40 tracking-wider uppercase">
                          Member
                        </span>
                      </div>

                      {/* Meta Section */}
                      <div className="p-6 text-center flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-[#091f82] font-extrabold font-display text-[19px] group-hover:text-[#FF6B00] transition-colors duration-300">{t.name}</h3>
                          <span className="inline-block mt-2 text-[12px] font-bold px-3.5 py-1 rounded-full font-display uppercase tracking-wider" style={{ color: t.accent, backgroundColor: `${t.accent}15` }}>
                            {t.role}
                          </span>
                        </div>
                        {/* Decorative bottom bar inside card */}
                        <div className="w-8 h-[3px] rounded-full mx-auto mt-4 transition-all duration-500 group-hover:w-16" style={{ backgroundColor: t.accent }} />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-2 lg:-left-6 bg-white text-navy border-0 shadow-[0_8px_24px_rgba(11,31,58,0.12)] hover:bg-orange hover:text-white" />
              <CarouselNext className="hidden sm:flex -right-2 lg:-right-6 bg-white text-navy border-0 shadow-[0_8px_24px_rgba(11,31,58,0.12)] hover:bg-orange hover:text-white" />
            </Carousel>
          </div>
        </section>
      )}

      {/* VOLUNTEERS */}
      {ld.volunteers.length > 0 && (
        <section className="py-16 sm:py-20 bg-gradient-to-b from-secondary/40 to-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="text-center">
              <div className="inline-block">
                <span className="eyebrow italic tracking-[0.25em]">OUR VOLUNTEERS</span>
                <span className="block h-[2px] w-12 bg-orange mx-auto mt-1.5 rounded-full" />
              </div>
              <h2 className="section-title mt-3">
                Our <span className="text-orange">Volunteers</span>
              </h2>
            </div>

            <Carousel opts={{ align: "start", loop: true }} className="mt-14 px-2">
              <CarouselContent className="-ml-4 pb-4">
                {ld.volunteers.map((t) => (
                  <CarouselItem key={t.name} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                    <div className="group flex flex-col h-full bg-white rounded-[24px] overflow-hidden border border-slate-100 hover:border-orange/20 shadow-[0_4px_20px_rgba(11,31,58,0.03)] hover:shadow-[0_20px_40px_rgba(11,31,58,0.08)] transition-all duration-500 hover:-translate-y-2">
                      {/* Photo Container */}
                      <div className="relative overflow-hidden aspect-[4/5]">
                        {t.img ? (
                          <img
                            src={t.img}
                            alt={t.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange/20 to-success/20 flex items-center justify-center">
                            <span className="text-navy/30 font-extrabold text-[48px]">{t.name?.charAt(0) || '?'}</span>
                          </div>
                        )}
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#091f82]/90 via-[#091f82]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                          {/* Social Links on Hover */}
                          <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                            <a href="https://youtube.com/@rkministry-p9t?si=4qyVyJkr9Mv3YJPh" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF6B00] backdrop-blur-md flex items-center justify-center text-white transition-colors duration-300">
                              <Youtube className="w-4 h-4" />
                            </a>
                            <a href="https://www.facebook.com/share/1FKM6aGUFq/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF6B00] backdrop-blur-md flex items-center justify-center text-white transition-colors duration-300">
                              <Facebook className="w-4 h-4" />
                            </a>
                            <a href="mailto:azaramesh@gmail.com" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF6B00] backdrop-blur-md flex items-center justify-center text-white transition-colors duration-300">
                              <Mail className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                        <span className="absolute top-4 right-4 text-[10px] font-bold font-display px-3 py-1.5 rounded-full backdrop-blur-md text-white bg-black/40 tracking-wider uppercase">
                          Volunteer
                        </span>
                      </div>

                      {/* Meta Section */}
                      <div className="p-6 text-center flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-[#091f82] font-extrabold font-display text-[19px] group-hover:text-[#FF6B00] transition-colors duration-300">{t.name}</h3>
                          <span className="inline-block mt-2 text-[12px] font-bold px-3.5 py-1 rounded-full font-display uppercase tracking-wider" style={{ color: t.accent, backgroundColor: `${t.accent}15` }}>
                            {t.role}
                          </span>
                        </div>
                        {/* Decorative bottom bar inside card */}
                        <div className="w-8 h-[3px] rounded-full mx-auto mt-4 transition-all duration-500 group-hover:w-16" style={{ backgroundColor: t.accent }} />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-2 lg:-left-6 bg-white text-navy border-0 shadow-[0_8px_24px_rgba(11,31,58,0.12)] hover:bg-orange hover:text-white" />
              <CarouselNext className="hidden sm:flex -right-2 lg:-right-6 bg-white text-navy border-0 shadow-[0_8px_24px_rgba(11,31,58,0.12)] hover:bg-orange hover:text-white" />
            </Carousel>
          </div>
        </section>
      )}


      {/* BLOGS — full width */}
      {ld.blogs.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <div className="eyebrow">Latest Blogs</div>
                <h2 className="section-title mt-2">News, Insights & Updates</h2>
                <p className="mt-3 text-text-2 max-w-xl">Stories, research and updates from the field — straight from our team and community.</p>
              </div>
              <Link to="/blogs" className="btn-navy-outline self-start md:self-auto">View All Articles <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ld.blogs.map((b) => (
                <article key={b.t} className="group card-soft card-soft-hover overflow-hidden flex flex-col">
                  <div className="relative overflow-hidden">
                    <img src={b.img} alt={b.t} loading="lazy" className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute top-4 left-4 bg-orange text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">{b.cat}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[12px] text-text-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {b.d}</span>
                      <span className="w-1 h-1 rounded-full bg-text-2" />
                      <span>{b.read}</span>
                    </div>
                    <h3 className="mt-3 text-[18px] font-bold text-navy leading-snug group-hover:text-orange transition">{b.t}</h3>
                    <p className="mt-2 text-[14px] text-text-2 leading-relaxed flex-1">{b.excerpt}</p>
                    <Link to="/blogs" className="mt-4 inline-flex items-center gap-1 text-[13px] text-orange font-bold group-hover:gap-2 transition-all">Read Article <ArrowRight className="w-3.5 h-3.5" /></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* PARTNERS — auto-scrolling carousel */}
      {ld.partners.length > 0 && (
        <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F1F5F9] to-white relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center mb-10">
            <div className="eyebrow">Our Partners & Supporters</div>
            <h2 className="section-title mt-2">
              Our Supporting <span className="text-orange">Partners</span>
            </h2>
            <p className="mt-3 text-text-2 max-w-2xl mx-auto">
              For any queries, suggestions or collaboration — we are always here for you.
            </p>
          </div>

          {/* Marquee */}
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-[#F1F5F9] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="flex w-max animate-marquee gap-6 sm:gap-8">
              {[...ld.partners, ...ld.partners].map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="shrink-0 w-[180px] sm:w-[210px] h-[120px] sm:h-[140px] bg-white rounded-2xl border border-border shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-2 px-4"
                >
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} className="w-14 h-14 object-contain" />
                  ) : (
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-extrabold text-[18px] tracking-tight shadow-md"
                      style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}CC)` }}
                    >
                      {p.initials}
                    </div>
                  )}
                  <div className="text-[13px] font-bold text-navy text-center leading-tight">{p.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/about" className="inline-flex items-center gap-2 bg-orange text-white rounded-full px-8 py-3.5 font-bold hover:bg-orange-2 transition shadow-lg shadow-orange/30">
              View All Partners <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}




      {/* IMPACT MAP */}
      <ImpactMapSection />



      {/* CONTACT — modern split layout */}
      <HomeContactSection />

      {/* CAUSES PREVIEW */}
      {ld.causes.length > 0 && (
        <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-[#FFF7F0]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <div className="eyebrow">Causes We Support</div>
              <h2 className="section-title mt-2">Stand With A Cause That Matters</h2>
              <div className="mx-auto mt-3 h-1 w-16 bg-orange rounded-full" />
              <p className="mt-4 text-text-2">Every contribution fuels a movement. Choose a cause close to your heart and help us create lasting change.</p>
            </div>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ld.causes.map((c) => {
                const CIcon: LucideIcon = causeIconMap[c.I] || HandHeart;
                return { ...c, CIcon };
              }).map(({ title, desc, img, raised, CIcon }) => (
                <div key={title} className="group bg-white rounded-[24px] shadow-soft border border-border hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="relative h-48 overflow-hidden rounded-t-[24px]">
                    {img && <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                  </div>
                  <div className="relative px-6 pb-6 pt-6">
                    <div className="absolute -top-7 left-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-2 to-orange text-white flex items-center justify-center shadow-xl shadow-orange/40 ring-4 ring-white">
                      <CIcon className="w-7 h-7" strokeWidth={2.2} />
                    </div>
                    <div className="pt-6">
                      <h3 className="text-xl font-bold text-navy">{title}</h3>
                      <p className="text-text-2 text-[14.5px] mt-2 mb-5">{desc}</p>
                      <div className="mb-2 flex justify-between text-sm font-semibold">
                        <span className="text-navy">Funds Raised</span>
                        <span className="text-orange">{raised}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-orange/10 overflow-hidden mb-5">
                        <div className="h-full bg-gradient-to-r from-orange-2 to-orange rounded-full" style={{ width: `${raised}%` }} />
                      </div>
                      <div className="flex items-center gap-3">
                        <Link to="/donate" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-2 to-orange text-white px-5 py-2.5 font-semibold shadow-md shadow-orange/30 hover:-translate-y-0.5 transition">
                          <Heart className="w-4 h-4 fill-white" /> Donate
                        </Link>
                        <Link to="/causes" className="w-11 h-11 rounded-full bg-navy text-white flex items-center justify-center hover:bg-orange transition shrink-0" aria-label="Read more">
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link to="/causes" className="inline-flex items-center gap-2 bg-navy text-white font-semibold rounded-full px-7 py-3 hover:bg-orange transition">
                Explore All Causes <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {ld.testimonials.length > 0 && (
        <section className="py-16 sm:py-20 bg-gradient-to-br from-[#091f82] via-[#102E5A] to-[#091f82] text-white relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -left-16 w-80 h-80 bg-orange/20 blur-3xl rounded-full" />
          <div className="pointer-events-none absolute -bottom-24 right-0 w-96 h-96 bg-orange-2/15 blur-3xl rounded-full" />
          <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-orange-2 font-semibold uppercase tracking-wider text-[12px]">Voices Of Change</div>
              <h2 className="section-title mt-2 text-white">What People Say About Us</h2>
              <div className="mx-auto mt-3 h-1 w-16 bg-orange rounded-full" />
            </div>
            <Carousel opts={{ align: "start", loop: true }} className="mt-12">
              <CarouselContent className="-ml-4">
                {ld.testimonials.map((t) => (
                  <CarouselItem key={t.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 h-full flex flex-col">
                      <Quote className="w-10 h-10 text-orange-2/80" />
                      <p className="mt-4 text-white/90 leading-relaxed text-[15px] flex-1">"{t.quote}"</p>
                      <div className="mt-6 flex items-center gap-3 pt-5 border-t border-white/10">
                        {t.img && <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-orange/40" />}
                        <div>
                          <div className="font-display font-bold text-white">{t.name}</div>
                          <div className="text-[12px] text-white/60">{t.role}</div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-2 bg-white text-navy border-0" />
              <CarouselNext className="hidden sm:flex -right-2 bg-white text-navy border-0" />
            </Carousel>
          </div>
        </section>
      )}

      {/* AWARDS & RECOGNITION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow">Recognition & Trust</div>
            <h2 className="section-title mt-2">Awards & Accreditations</h2>
            <div className="mx-auto mt-3 h-1 w-16 bg-orange rounded-full" />
            <p className="mt-4 text-text-2">Recognition that reflects 25+ years of integrity, compliance and grassroots impact.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { I: Award, title: "Best Women NGO 2024", sub: "U.P. State Recognition" },
              { I: ShieldCheck, title: "12A & 80G Certified", sub: "Income Tax Exemptions" },
              { I: BadgeCheck, title: "NITI Aayog Registered", sub: "Unique ID Verified" },
              { I: FileCheck2, title: "FCRA Compliant", sub: "Audit Trail Maintained" },
            ].map(({ I, title, sub }) => (
              <div key={title} className="group bg-white border border-border rounded-2xl p-6 text-center shadow-soft hover:-translate-y-1 hover:shadow-xl transition">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-2 to-orange text-white flex items-center justify-center shadow-md shadow-orange/30 group-hover:scale-110 transition">
                  <I className="w-8 h-8" />
                </div>
                <h3 className="mt-4 font-display font-bold text-navy text-[16px]">{title}</h3>
                <p className="text-[13px] text-text-2 mt-1">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left image */}
          <div className="relative">
            <div className="relative rounded-[24px] overflow-hidden shadow-soft">
              <img src={ld.donationSettings?.faqImage || faqImg} alt="आरके मिनिस्ट्रीज - प्रभु यीशु मसीह प्रार्थना सभा" className="w-full h-[480px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy/50 via-navy/10 to-transparent" />
            </div>
          </div>

          {/* Right FAQ */}
          <div>
            <div className="eyebrow">प्रभु यीशु मसीह संगति व सेवा</div>
            <h2 className="section-title mt-2">अक्सर पूछे जाने वाले <span className="text-orange">सवाल (FAQs)</span></h2>
            <div className="mt-3 h-1 w-16 bg-orange rounded-full" />
            <p className="mt-4 text-text-2 text-[15px] leading-relaxed">प्रभु यीशु मसीह की प्रार्थना सभाओं, चंगाई संगति, बपतिस्मा और आरके मिनिस्ट्रीज की सेवकाई से संबंधित सामान्य प्रश्नों के उत्तर यहाँ पाएं।</p>

            <div className="mt-6 space-y-3">
              {((ld.faqs && ld.faqs.length > 0) ? ld.faqs : indexFaqs).map((f: any, i: number) => {
                const isOpen = openFaq === i;
                return (
                  <div key={f.q || i} className={`bg-white rounded-[14px] overflow-hidden transition-all border ${isOpen ? "border-orange shadow-soft" : "border-border"}`}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[13px] flex-shrink-0 ${isOpen ? "bg-orange text-white" : "bg-orange/10 text-orange"}`}>{String(i + 1).padStart(2, "0")}</span>
                        <span className="font-semibold text-navy text-[15px]">{f.q}</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 flex-shrink-0 transition ${isOpen ? "rotate-180 text-orange" : "text-text-2"}`} />
                    </button>
                    {isOpen && <div className="px-5 pb-5 pl-16 text-text-2 text-[14px] leading-relaxed">{f.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter />

      {/* FLOATING CALL & WHATSAPP BUTTONS — LEFT SIDE */}
      <div className="fixed left-4 bottom-6 z-50 flex flex-col gap-3">
        <a
          href="tel:+919415314486"
          className="group w-11 h-11 rounded-full bg-[#136e11] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(19,110,17,0.45)] hover:shadow-[0_12px_40px_rgba(19,110,17,0.65)] hover:-translate-y-1 transition-all duration-300"
          aria-label="Call us"
        >
          <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </a>
        <a
          href="https://wa.me/919415314486"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-11 h-11 rounded-full bg-[#136e11] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(19,110,17,0.45)] hover:shadow-[0_12px_40px_rgba(19,110,17,0.65)] hover:-translate-y-1 transition-all duration-300"
          aria-label="WhatsApp us"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function DirectDonationsSection({ ds }: { ds: any }) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text.trim());
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const bank = ds?.bankAccounts?.[0];
  const upiQr = ds?.upiQrCode;
  const upiId = ds?.upiId || "9415314486@upi";
  const paytmNumber = ds?.paytmNumber || "+91 94153 14486";
  const contactEmail = ds?.contactEmail || "azaramesh@gmail.com";
  const contactPhone = ds?.contactPhone || "+91 94153 14486";
  const accountNo = bank?.accountNumber || "";
  const ifsc = bank?.ifsc || "";
  const bankName = bank?.bankName || "State Bank of India";
  const branch = bank?.branch || "Mubarakpur, Azamgarh";
  const accountType = bank?.accountType || "Current / Savings Account";
  const accountName = bank?.accountName || "RKV MINISTRIES";

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-secondary/30 to-white relative overflow-hidden">
      <div className="absolute top-20 -left-24 w-72 h-72 rounded-full bg-orange/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-24 w-72 h-72 rounded-full bg-navy/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange/10 border border-orange/20 text-orange px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-orange" /> Bank Transfer &amp; UPI
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy mt-3 tracking-tight">
            Direct <span className="text-orange">Donations</span>
          </h2>
          <p className="mt-3 text-text-2 text-[15px] max-w-xl mx-auto leading-relaxed">
            Support our initiatives seamlessly by scanning our verified UPI QR code or transferring directly to our registered bank account.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-[3px] w-6 rounded-full bg-orange/30" />
            <div className="h-[3px] w-12 rounded-full bg-gradient-to-r from-orange to-[#2E8B57]" />
            <div className="h-[3px] w-6 rounded-full bg-[#2E8B57]/30" />
          </div>
        </div>

        {/* 2-Column Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* LEFT — Scan & Pay via UPI */}
          <div className="relative rounded-3xl bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.09)] transition-all duration-300 p-6 sm:p-9 flex flex-col justify-between items-center text-center overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full bg-gradient-to-r from-orange to-[#2E8B57]" />

            <div className="w-full flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center text-orange mb-3.5 shadow-sm">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-[22px] sm:text-[24px] text-navy">
                Scan to Donate
              </h3>
              <p className="text-[13px] text-text-2 mt-1">
                Zero processing fees • Instant payment via any UPI app
              </p>

              {/* Supported UPI Badges */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {["Google Pay", "PhonePe", "Paytm", "BHIM UPI", "Amazon Pay"].map((app) => (
                  <span
                    key={app}
                    className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold"
                  >
                    {app}
                  </span>
                ))}
              </div>

              {/* QR Code Container */}
              <div className="mt-6 w-full max-w-[300px] rounded-3xl border-2 border-orange/25 bg-gradient-to-b from-orange/5 via-white to-orange/5 p-4 shadow-md relative">
                <div className="bg-white rounded-2xl p-3 border border-slate-100 flex flex-col items-center justify-center aspect-square overflow-hidden shadow-inner relative">
                  {upiQr ? (
                    <img src={upiQr} alt="UPI QR Code" className="w-full h-full object-contain" />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      <QrCode className="w-16 h-16 text-slate-300 mb-2" />
                      <span className="font-mono text-sm font-bold text-navy">{upiId}</span>
                      <span className="text-[11px] text-text-2 mt-1">Scan via any UPI app</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-navy text-[12px] font-bold">
                  <BadgeCheck className="w-4 h-4 text-[#2E8B57]" /> Verified Official Ministry Account
                </div>
              </div>

              {/* Copy Registered Mobile / UPI */}
              <div className="mt-5 w-full max-w-[340px] bg-slate-50 border border-slate-200/90 rounded-2xl p-3 flex items-center justify-between gap-3 text-left">
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">
                    Registered Mobile / UPI
                  </span>
                  <span className="text-[13px] font-extrabold text-navy truncate block mt-0.5 font-mono">
                    {upiId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(upiId, "upi")}
                  className="px-3 py-1.5 rounded-xl bg-orange/10 hover:bg-orange text-orange hover:text-white font-bold text-[12px] transition-all flex items-center gap-1 shrink-0"
                >
                  {copiedKey === "upi" ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Bottom Security Note */}
            <div className="mt-6 inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 font-bold text-[12px] px-4 py-2 rounded-full border border-emerald-200/60 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#2E8B57]" /> 100% Direct &amp; Tax Exemption Eligible
            </div>
          </div>

          {/* RIGHT — Bank Account Details */}
          <div className="relative rounded-3xl bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.09)] transition-all duration-300 p-6 sm:p-9 flex flex-col justify-between overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full bg-gradient-to-r from-[#2E8B57] to-orange" />

            <div>
              {/* Header */}
              <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-[#063B76]/10 flex items-center justify-center text-[#063B76] shadow-sm">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-[22px] sm:text-[24px] text-navy">
                    Bank Account Details
                  </h3>
                  <p className="text-[13px] text-text-2 mt-0.5">
                    For direct NEFT, RTGS, IMPS wire transfer
                  </p>
                </div>
              </div>

              {/* Rows */}
              <div className="space-y-3">
                {[
                  ...(accountName ? [{ label: "Account Name", value: accountName, copyable: false, key: "name" }] : []),
                  { label: "Bank Name", value: bankName, copyable: false, key: "bank" },
                  ...(accountNo ? [{ label: "Account Number", value: accountNo, copyable: true, key: "acc", highlight: true }] : []),
                  ...(ifsc ? [{ label: "IFSC Code", value: ifsc, copyable: true, key: "ifsc", highlight: true }] : []),
                  { label: "Account Type", value: accountType, copyable: false, key: "type" },
                  ...(branch ? [{ label: "Branch", value: branch, copyable: false, key: "branch" }] : []),
                ].map((row) => (
                  <div
                    key={row.key}
                    className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all ${row.highlight
                      ? "bg-slate-50/90 border-orange/20"
                      : "bg-white border-slate-100"
                      }`}
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <span className="text-[11px] font-semibold text-text-2 uppercase tracking-wide block leading-none">
                        {row.label}
                      </span>
                      <span
                        className={`text-[14px] sm:text-[15px] font-bold block mt-1 truncate ${row.highlight ? "text-navy" : "text-navy/90"
                          }`}
                      >
                        {row.value}
                      </span>
                    </div>

                    {row.copyable && (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(row.value, row.key)}
                        className="px-3 py-1.5 rounded-xl bg-orange/10 hover:bg-orange text-orange hover:text-white font-bold text-[12px] transition-all flex items-center gap-1 shrink-0"
                      >
                        {copiedKey === row.key ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Copy
                          </>
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Additional Bank Accounts if any */}
              {Array.isArray(ds?.bankAccounts) && ds.bankAccounts.length > 1 && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Additional Accounts</span>
                  <div className="space-y-2">
                    {ds.bankAccounts.slice(1).map((extra: any, idx: number) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[12px] flex justify-between items-center">
                        <div>
                          <strong className="text-navy block">{extra.bankName}</strong>
                          <span className="text-slate-500 font-mono">A/C: {extra.accountNumber} • IFSC: {extra.ifsc}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(extra.accountNumber, `extra-${idx}`)}
                          className="px-2 py-1 rounded bg-white text-orange font-bold text-[11px] border border-orange/20"
                        >
                          {copiedKey === `extra-${idx}` ? "Copied" : "Copy"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Note & WhatsApp Receipt verification */}
            <div className="mt-6 rounded-2xl bg-amber-50/70 border border-amber-200/60 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange text-white flex items-center justify-center text-[12px] font-extrabold shrink-0 mt-0.5">
                  i
                </div>
                <div className="text-[13px] text-slate-700 leading-relaxed">
                  <span className="font-bold text-navy block mb-0.5">Donation Receipt &amp; Confirmation:</span>
                  Please share your transaction screenshot or UTR number with us at{" "}
                  <span className="font-extrabold text-[#091f82]">{contactEmail}</span> or WhatsApp at{" "}
                  <span className="font-extrabold text-[#091f82]">{contactPhone}</span> to receive your official donation receipt.
                  <div className="mt-3">
                    <a
                      href={`https://wa.me/${contactPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                        "Hello, I have made a direct bank transfer donation to RKV MINISTRIES. Here is my transaction receipt:"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-orange hover:text-[#e56000] font-bold text-[13px] group"
                    >
                      <span>Share Receipt on WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const homeDonateCauses = [
  {
    icon: FaHandsPraying,
    title: "सुसमाचार प्रचार सेवकाई",
    subtitle: "Village Gospel Outreach",
    amount: "₹1,500 / गाँव सभा",
    color: "#D97706",
  },
  {
    icon: BookOpen,
    title: "पवित्र बाइबिल वितरण",
    subtitle: "Free Bible Distribution",
    amount: "₹500 / 2 पवित्र बाइबिल",
    color: "#2563EB",
  },
  {
    icon: Church,
    title: "रविवार संगति व आराधना",
    subtitle: "Church Worship & Fellowship",
    amount: "₹2,500 / मासिक सहयोग",
    color: "#059669",
  },
  {
    icon: Heart,
    title: "ज़रूरतमंद व चंगाई सेवा",
    subtitle: "Compassion & Healing Aid",
    amount: "₹3,000 / परिवार सहायता",
    color: "#7C3AED",
  },
];

const homeDonateTrust = [
  { icon: Shield, title: "100% Secure", desc: "Encrypted, PCI-compliant payments." },
  { icon: BadgeCheck, title: "80G Tax Benefit", desc: "Save up to 50% in taxes on every donation." },
  { icon: Receipt, title: "Instant Receipt", desc: "Auto-mailed receipt for your records." },
];

function HomeDonateForm({ ds }: { ds?: any }) {
  const { settings } = useSiteSettings();
  const dynamicOnce: number[] = (ds?.onceAmounts && ds.onceAmounts.length > 0)
    ? ds.onceAmounts
    : (settings?.donationSettings?.onceAmounts && settings.donationSettings.onceAmounts.length > 0
      ? settings.donationSettings.onceAmounts
      : [500, 1000, 2500, 5000, 30000]);

  const dynamicMonthly: number[] = (ds?.monthlyAmounts && ds.monthlyAmounts.length > 0)
    ? ds.monthlyAmounts
    : (settings?.donationSettings?.monthlyAmounts && settings.donationSettings.monthlyAmounts.length > 0
      ? settings.donationSettings.monthlyAmounts
      : [500, 1000, 1500, 3000]);

  const [hName, setHName] = useState("");
  const [hEmail, setHEmail] = useState("");
  const [hPhone, setHPhone] = useState("");
  const [hAddress, setHAddress] = useState("");
  const [hPan, setHPan] = useState("");
  const [freq, setFreq] = useState<"once" | "monthly">("once");

  const amounts = freq === "monthly" ? dynamicMonthly : dynamicOnce;
  const [hAmount, setHAmount] = useState<number>(dynamicOnce[1] || dynamicOnce[0] || 1000);
  const [customAmount, setCustomAmount] = useState("");
  const [hLoading, setHLoading] = useState(false);
  const [hMsg, setHMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [rzpReady, setRzpReady] = useState(false);

  useEffect(() => {
    const list = freq === "monthly" ? dynamicMonthly : dynamicOnce;
    setHAmount(list[1] || list[0] || 1000);
    setCustomAmount("");
  }, [freq, JSON.stringify(dynamicOnce), JSON.stringify(dynamicMonthly)]);

  useEffect(() => {
    if ((window as any).Razorpay) return setRzpReady(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload = () => setRzpReady(true);
    document.body.appendChild(s);
  }, []);

  async function handleHomeDonate(e: React.FormEvent) {
    e.preventDefault();
    setHMsg(null);
    if (!hName.trim()) return setHMsg({ type: "error", text: "Name is required" });
    if (!hEmail.trim()) return setHMsg({ type: "error", text: "Email is required" });
    if (!hPhone.trim() || hPhone.replace(/\D/g, "").length < 10)
      return setHMsg({ type: "error", text: "Valid 10-digit phone required" });
    if (!hAmount || hAmount <= 0) return setHMsg({ type: "error", text: "Please enter a valid amount" });
    if (!rzpReady) return setHMsg({ type: "error", text: "Payment gateway loading..." });
    setHLoading(true);
    try {
      const { data } = await api.post("/donations/create-order", {
        amount: hAmount,
        donorName: hName.trim(),
        donorEmail: hEmail.trim(),
        donorPhone: hPhone.replace(/\D/g, ""),
        donorAddress: hAddress.trim(),
        address: hAddress.trim(),
        donorPAN: hPan.trim(),
        donationType: freq,
        purpose: "General Donation",
      });
      const { orderId, amount: oa, currency, keyId, donorMeta } = data.data;
      const rzp = new (window as any).Razorpay({
        key: keyId,
        amount: oa,
        currency,
        name: "RKV MINISTRIES",
        description: "Donation",
        prefill: { name: hName.trim(), email: hEmail.trim(), contact: hPhone.replace(/\D/g, "") },
        theme: { color: "#FF6B00" },
        handler: async (r: any) => {
          try {
            await api.post("/donations/verify", {
              razorpayOrderId: r.razorpay_order_id,
              razorpayPaymentId: r.razorpay_payment_id,
              razorpaySignature: r.razorpay_signature,
              donorMeta: { ...donorMeta, amount: hAmount },
            });
            setHMsg({ type: "success", text: "Thank you! Receipt will be emailed." });
            setHName("");
            setHEmail("");
            setHPhone("");
            setHAddress("");
            setHPan("");
            setHAmount((freq === "monthly" ? dynamicMonthly : dynamicOnce)[1] || 1000);
            setCustomAmount("");
          } catch {
            setHMsg({ type: "error", text: "Verification failed. Contact support." });
          }
        },
        modal: { ondismiss: () => setHLoading(false) },
      });
      rzp.on("payment.failed", () => {
        setHMsg({ type: "error", text: "Payment failed." });
        setHLoading(false);
      });
      setHLoading(false);
      rzp.open();
    } catch (err: any) {
      setHLoading(false);
      setHMsg({ type: "error", text: err?.response?.data?.message || "Payment initiation failed" });
    }
  }

  return (
    <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-border h-fit">
      {/* Header */}
      <div className="text-center pb-5 border-b border-border">
        <Heart className="w-10 h-10 text-orange mx-auto fill-orange/20" />
        <h3 className="font-display font-extrabold text-[22px] text-navy mt-2">Donate Now</h3>
        <p className="text-[13px] text-text-2 mt-1">Quick, secure &amp; 80G eligible</p>
      </div>

      {/* Frequency Toggle */}
      <div className="mt-6 grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-full border border-slate-200 shadow-inner">
        <button
          type="button"
          onClick={() => setFreq("once")}
          className={`py-2.5 rounded-full text-[13px] font-extrabold transition-all duration-300 ${freq === "once"
            ? "bg-gradient-to-r from-orange to-[#e56000] text-white shadow-md shadow-orange/30 scale-[1.02]"
            : "text-slate-600 hover:text-navy hover:bg-white/50"
            }`}
        >
          One-Time
        </button>
        <button
          type="button"
          onClick={() => setFreq("monthly")}
          className={`py-2.5 rounded-full text-[13px] font-extrabold transition-all duration-300 ${freq === "monthly"
            ? "bg-gradient-to-r from-orange to-[#e56000] text-white shadow-md shadow-orange/30 scale-[1.02]"
            : "text-slate-600 hover:text-navy hover:bg-white/50"
            }`}
        >
          Monthly
        </button>
      </div>

      {/* Choose Amount */}
      <label className="mt-6 block text-[13px] font-semibold text-navy">Choose Amount</label>
      <div className={`mt-2 grid gap-2 ${amounts.length <= 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3 sm:grid-cols-5"}`}>
        {amounts.map((a: number) => (
          <button
            key={a}
            type="button"
            onClick={() => {
              setHAmount(a);
              setCustomAmount("");
            }}
            className={`py-3 rounded-xl border text-[14px] font-bold transition ${hAmount === a && !customAmount
              ? "border-orange bg-orange text-white shadow-sm"
              : "border-border text-navy hover:border-orange bg-slate-50/50"
              }`}
          >
            ₹{a.toLocaleString()}
          </button>
        ))}
      </div>

      {/* Custom Amount Input */}
      <div className="mt-3 relative">
        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-2" />
        <input
          type="number"
          placeholder="Custom amount"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setHAmount(Number(e.target.value) || 0);
          }}
          className="w-full pl-9 pr-3 py-3 border border-slate-200 rounded-xl text-[14px] focus:outline-none focus:border-orange"
        />
      </div>

      {/* Feedback Message */}
      {hMsg && (
        <div
          className={`mt-4 p-3 rounded-xl text-[13px] font-medium ${hMsg.type === "success"
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-700 border border-red-200"
            }`}
        >
          {hMsg.text}
        </div>
      )}

      {/* Form Details */}
      <form className="mt-5 space-y-3" onSubmit={handleHomeDonate}>
        <input
          type="text"
          placeholder="Full Name"
          value={hName}
          onChange={(e) => setHName(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-3 py-3 text-[14px] focus:outline-none focus:border-orange"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="email"
            placeholder="Email"
            value={hEmail}
            onChange={(e) => setHEmail(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-3 py-3 text-[14px] focus:outline-none focus:border-orange"
          />
          <input
            type="tel"
            placeholder="Mobile"
            value={hPhone}
            onChange={(e) => setHPhone(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-3 py-3 text-[14px] focus:outline-none focus:border-orange"
          />
        </div>
        <input
          type="text"
          placeholder="Address (Full Postal Address / City, State)"
          value={hAddress}
          onChange={(e) => setHAddress(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-3 py-3 text-[14px] focus:outline-none focus:border-orange"
        />
        <input
          type="text"
          placeholder="PAN (for 80G receipt)"
          value={hPan}
          onChange={(e) => setHPan(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-3 py-3 text-[14px] focus:outline-none focus:border-orange"
        />

        <button
          type="submit"
          disabled={hLoading}
          className="w-full bg-gradient-to-r from-orange to-orange-2 text-white font-bold rounded-xl py-4 hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg shadow-orange/30 disabled:opacity-60"
        >
          {hLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Heart className="w-5 h-5 fill-white" />}
          {hLoading
            ? "Processing..."
            : `Donate ₹${(hAmount || 0).toLocaleString()}${freq === "monthly" ? " / month" : ""}`}
        </button>

        <p className="text-center text-[11.5px] text-text-2 flex items-center justify-center gap-1.5 pt-1">
          <Shield className="w-3.5 h-3.5" /> Secured by industry-standard encryption
        </p>
      </form>
    </div>
  );
}

function QRMock() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect width="100" height="100" fill="white" />
      {Array.from({ length: 100 }).map((_, i) => {
        const x = (i % 10) * 10;
        const y = Math.floor(i / 10) * 10;
        const fill = (i * 7) % 3 === 0;
        return fill ? <rect key={i} x={x} y={y} width="9" height="9" fill="#091f82" /> : null;
      })}
      <rect x="0" y="0" width="30" height="30" fill="none" stroke="#091f82" strokeWidth="4" />
      <rect x="70" y="0" width="30" height="30" fill="none" stroke="#091f82" strokeWidth="4" />
      <rect x="0" y="70" width="30" height="30" fill="none" stroke="#091f82" strokeWidth="4" />
    </svg>
  );
}

const staticHeroSlides: HomeHero[] = [
  {
    img: banner1,
    title: "RK MINISTRIES —",
    accent: "Church & Evangelical Fellowship",
    desc: "Spreading Faith, Hope, Love and the Gospel of Jesus Christ across communities.",
    overlayId: "banner-1",
  },
  {
    img: banner2,
    title: "Worship & Healing —",
    accent: "Faith & Prayer Gatherings",
    desc: "Sunday Worship Service, Fasting & Healing Prayer, and Cottage Prayer Gatherings.",
    overlayId: "banner-2",
  },
  {
    img: banner3,
    title: "Community Outreach —",
    accent: "Love & Compassion in Action",
    desc: "Empowering believers and serving families with spiritual guidance and social welfare.",
    overlayId: "banner-3",
  },
];

function HeroSlider({ slides }: { slides: HomeHero[] }) {
  const heroSlides = slides && slides.length > 0 ? slides : staticHeroSlides;
  const [i, setI] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const n = heroSlides.length;

  useEffect(() => {
    if (n <= 1 || isPaused) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n, isPaused]);

  const go = (d: number) => setI((p) => (p + d + n) % n);

  return (
    <section
      className="relative bg-[#091f82] overflow-hidden select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Carousel"
    >
      {/* Slides Container - Fixed to original 1920 x 800 aspect ratio, responsive on mobile & tablet */}
      <div className="relative w-full aspect-[1920/800] min-h-[220px] sm:min-h-[280px] md:min-h-[360px] lg:min-h-0 overflow-hidden flex items-center">
        {heroSlides.map((s, idx) => {
          const isActive = idx === i;
          const hasOverlay = s.showOverlay || (!!s.badge || (!!s.title && !s.overlayId && !String(s.img || '').toLowerCase().includes('banner')));

          return (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
              }`}
            >
              {/* Slide Background Image - object-cover ensures any uploaded image fits perfectly without distortion */}
              {s.primaryBtnLink && !hasOverlay ? (
                <Link to={s.primaryBtnLink} className="block w-full h-full cursor-pointer">
                  <img
                    src={s.img}
                    alt={s.title || `Slide ${idx + 1}`}
                    width={1920}
                    height={800}
                    className="w-full h-full object-cover object-center"
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                </Link>
              ) : (
                <img
                  src={s.img}
                  alt={s.title || `Slide ${idx + 1}`}
                  width={1920}
                  height={800}
                  className="w-full h-full object-cover object-center"
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              )}

              {/* Dynamic Text Overlay (responsive for mobile, tablet, desktop) */}
              {hasOverlay && (
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-950/20 sm:bg-gradient-to-r sm:from-slate-950/90 sm:via-slate-950/60 sm:to-transparent flex items-center">
                  <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-8 lg:px-16 py-3 sm:py-6 lg:py-10">
                    <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl text-left">
                      {s.badge && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider backdrop-blur-md mb-1.5 sm:mb-2.5">
                          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                          <span>{s.badge}</span>
                        </div>
                      )}
                      {s.title && (
                        <h1 className="text-base sm:text-2xl md:text-3xl lg:text-5xl font-black text-white leading-tight sm:leading-tight drop-shadow-md">
                          {s.title}
                          {s.accent && <span className="text-amber-400 block sm:inline sm:ml-2">{s.accent}</span>}
                        </h1>
                      )}
                      {s.desc && (
                        <p className="mt-1 sm:mt-2 text-[11px] sm:text-xs md:text-sm lg:text-base text-slate-200 line-clamp-2 md:line-clamp-3 leading-relaxed drop-shadow">
                          {s.desc}
                        </p>
                      )}
                      {(s.primaryBtnLabel || s.secondaryBtnLabel) && (
                        <div className="mt-2.5 sm:mt-3.5 lg:mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
                          {s.primaryBtnLabel && (
                            <Link
                              to={s.primaryBtnLink || "/donate"}
                              className="px-3.5 py-1.5 sm:px-5 sm:py-2 lg:px-6 lg:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-1.5"
                            >
                              {s.primaryBtnLabel}
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          )}
                          {s.secondaryBtnLabel && (
                            <Link
                              to={s.secondaryBtnLink || "/contact"}
                              className="px-3.5 py-1.5 sm:px-5 sm:py-2 lg:px-6 lg:py-2.5 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/30 backdrop-blur-md transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-1.5"
                            >
                              {s.secondaryBtnLabel}
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {n > 1 && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full bg-slate-950/40 hover:bg-amber-500 text-white hover:text-slate-950 backdrop-blur-md border border-white/20 hover:border-amber-400 flex items-center justify-center transition-all duration-200 shadow-xl z-20"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next slide"
            className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full bg-slate-950/40 hover:bg-amber-500 text-white hover:text-slate-950 backdrop-blur-md border border-white/20 hover:border-amber-400 flex items-center justify-center transition-all duration-200 shadow-xl z-20"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20 bg-slate-950/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === i ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-amber-500 shadow-sm" : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Slide Number Counter */}
          <div className="absolute bottom-2.5 right-3 sm:bottom-4 sm:right-6 z-20 hidden sm:flex items-center gap-1 bg-slate-950/50 backdrop-blur-md text-white/80 border border-white/10 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            <span className="text-amber-400">{String(i + 1).padStart(2, "0")}</span>
            <span className="opacity-50">/</span>
            <span>{String(n).padStart(2, "0")}</span>
          </div>
        </>
      )}
    </section>
  );
}
