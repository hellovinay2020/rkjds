import { Link } from "react-router";
import { useEffect } from "react";
import {
  Users, BookOpen, Banknote, TrendingUp, ShieldCheck, Award,
  CheckCircle2, ArrowRight, Star, UserPlus, Wallet, Gift,
  HeartHandshake, Network, Crown, BadgeCheck, Target, Zap,
  HandHeart, Phone, Mail, MapPin, ChevronRight, IndianRupee,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import heroImg from "@/assets/herosection/NariSashaktikaran.png";
import aboutGroup from "@/assets/about-group.jpg";
import ctaMember from "@/assets/cta-member.jpg";
import ctaVolunteer from "@/assets/cta-volunteer.jpg";
import program1 from "@/assets/program-1.jpg";
import program2 from "@/assets/program-2.jpg";
import program3 from "@/assets/program-3.jpg";

// ── Stats ──────────────────────────────────────────────────────────────────
const stats = [
  { value: "50,000+", label: "Members Registered", sub: "Members Registered" },
  { value: "28+", label: "States", sub: "States Covered" },
  { value: "₹10 Cr+", label: "Support Disbursed", sub: "Support Disbursed" },
  { value: "3,200+", label: "Blocks", sub: "Blocks Covered" },
  { value: "2,000+", label: "Women Empowered", sub: "Women Empowered" },
  { value: "99%", label: "Satisfied Members", sub: "Satisfied Members" },
  { value: "1,500+", label: "Training Programs", sub: "Training Programs" },
];

// ── Benefits (Working Areas) ───────────────────────────────────────────────
const benefits = [
  { icon: IndianRupee, title: "Income Opportunities", sub: "Income Opportunities", color: "#FF6B00", bg: "#FFF1E5" },
  { icon: Network, title: "Member Support", sub: "Member Support", color: "#7C3AED", bg: "#F1EAFE" },
  { icon: Banknote, title: "Financial Assistance", sub: "Financial Assistance", color: "#16A34A", bg: "#E8F7EE" },
  { icon: BookOpen, title: "Free Training", sub: "Free Training", color: "#2563EB", bg: "#E6EEFB" },
  { icon: ShieldCheck, title: "Women's Safety", sub: "Women's Safety", color: "#EC4899", bg: "#FCE7F3" },
  { icon: HeartHandshake, title: "Community Development", sub: "Community Development", color: "#0EA5E9", bg: "#E0F4FD" },
  { icon: HandHeart, title: "Social Service", sub: "Social Service", color: "#B45309", bg: "#FEF3C7" },
  { icon: Award, title: "Recognition & Awards", sub: "Recognition & Awards", color: "#EAB308", bg: "#FEF9C3" },
];

// ── Plans ──────────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Active Member", nameEn: "Membership (₹500/year)",
    icon: UserPlus, price: "500", period: "year",
    color: "#FF6B00", popular: true,
    perks: ["Member Portal Login (Password)", "Membership ID Card", "Monthly Newsletter", "Program Participation", "Special Training Programs"],
  },
  {
    name: "Free Registration", nameEn: "Free Member",
    icon: Crown, price: "0", period: "7-day window",
    color: "#16A34A", popular: false,
    perks: ["Join as a community member", "Upgrade to Active within 7 days", "Auto-delete if not upgraded", "No Member Portal access"],
  },
  {
    name: "CSR Partner", nameEn: "CSR Partnership",
    icon: HandHeart, price: "Custom", period: "partnership",
    color: "#2563EB", popular: false,
    perks: ["Company CSR tie-up", "Brand visibility", "Reports and certificates", "Program sponsorship", "Social impact report"],
  },
];

// ── Steps ──────────────────────────────────────────────────────────────────
const steps = [
  { icon: UserPlus, title: "Register", desc: "Fill out the online form and submit your details.", color: "#FF6B00" },
  { icon: ShieldCheck, title: "Verification", desc: "Identity and bank details will be checked.", color: "#16A34A" },
  { icon: Banknote, title: "Membership Fee", desc: "Active Member ₹500 or Free registration.", color: "#2563EB" },
  { icon: BadgeCheck, title: "Receive ID Card", desc: "Get your member ID card and welcome letter.", color: "#7C3AED" },
  { icon: TrendingUp, title: "Access Benefits", desc: "Connect with partners and access financial benefits.", color: "#EC4899" },
];

// ── Impact Numbers ─────────────────────────────────────────────────────────
const impact = [
  { icon: Target, value: "5,000+", label: "Programs Conducted", sub: "Programs Conducted", color: "#FF6B00" },
  { icon: Users, value: "1,00,000+", label: "People Benefited", sub: "People Benefited", color: "#7C3AED" },
  { icon: Zap, value: "500+", label: "Medical Camps", sub: "Medical Camps", color: "#16A34A" },
  { icon: Gift, value: "2,000+", label: "Women Empowered", sub: "Women Empowered", color: "#2563EB" },
  { icon: BookOpen, value: "10,000+", label: "Students Supported", sub: "Students Supported", color: "#EC4899" },
  { icon: Award, value: "1,500+", label: "Training Programs", sub: "Training Programs", color: "#EAB308" },
];

// ── Testimonials ───────────────────────────────────────────────────────────
const testimonials = [
  { name: "Priya Sharma", location: "Lucknow, Uttar Pradesh", img: ctaMember, text: "After joining this program, I started earning up to ₹15,000 per month. MahilaAyush changed my life.", rating: 5 },
  { name: "Sunita Devi", location: "Patna, Bihar", img: ctaVolunteer, text: "With free training and support from the organization, I have helped more than 50 women in my village find employment.", rating: 5 },
  { name: "Rekha Gupta", location: "Jaipur, Rajasthan", img: aboutGroup, text: "With just a ₹500 membership fee, I joined the program and now earn more than ₹25,000 per month.", rating: 5 },
];

export default function FinancialHelpPage() {
  useEffect(() => { document.title = "Financial Help — MahilaAyush"; }, []);

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION — Left text + Right image
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-navy via-[#0d2a4e] to-[#1a0a00] overflow-hidden">
        {/* subtle bg blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-orange/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 left-1/3 w-[300px] h-[300px] rounded-full bg-white/5 blur-[80px] pointer-events-none" />

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 py-14 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ── LEFT: Text ── */}
            <div>
              {/* pill badge */}
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/20 border border-orange/40 text-orange text-[12px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                Financial Help Program
              </span>

              {/* Hindi headline */}
              <h1 className="mt-4 text-[38px] sm:text-[52px] font-extrabold text-white font-display leading-[1.15]">
                Empowered Women,<br />
                <span className="text-orange">Empowered Society</span>
              </h1>

              {/* English sub-headlines */}
              <div className="mt-3 space-y-0.5">
                <p className="text-[18px] sm:text-[20px] font-bold text-white/90 font-display">
                  Empowered Women, Empowered Nation
                </p>
                <p className="text-[14px] sm:text-[15px] font-semibold text-orange/80 tracking-wide">
                  Strong Society, Prosperous India
                </p>
              </div>

              {/* divider */}
              <div className="mt-5 w-16 h-1 rounded-full bg-orange" />

              {/* Hindi description */}
              <p className="mt-5 text-white/80 text-[15px] leading-relaxed">
                MahilaAyush's financial help program is committed to building a better India through education, health, self-reliance, employment, and social justice.
              </p>

              {/* English description */}
              <p className="mt-2 text-white/55 text-[13px] leading-relaxed">
                MahilaAyush is committed to building a better India through education,
                health, self-reliance, employment, environment, and social justice.
              </p>

              {/* key points */}
              <div className="mt-6 grid grid-cols-2 gap-2">
                {["Education", "Health", "Employment", "Social Justice"].map((pt) => (
                  <div key={pt} className="flex items-center gap-2 text-[13px] text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {pt}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange to-orange-2 text-white font-bold text-[15px] shadow-xl shadow-orange/40 hover:opacity-90 hover:-translate-y-0.5 transition-all"
                >
                  <UserPlus className="w-5 h-5" />
                  Register Now
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 border border-white/25 text-white font-semibold text-[15px] hover:bg-white/20 transition backdrop-blur-sm"
                >
                  Become a Member <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* ── RIGHT: Image ── */}
            <div className="relative flex justify-center lg:justify-end">
              {/* glow ring */}
              <div className="absolute inset-0 rounded-[28px] bg-orange/20 blur-2xl scale-90 pointer-events-none" />

              <div className="relative w-full max-w-[480px]">
                <img
                  src={heroImg}
                  alt="MahilaAyush — Empowered Women"
                  className="w-full h-[340px] sm:h-[440px] object-cover object-top rounded-[28px] shadow-2xl border-4 border-white/10"
                />

                {/* floating badge — bottom left */}
                <div className="absolute -bottom-5 -left-5 bg-white rounded-[16px] px-4 py-3 shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-orange" />
                  </div>
                  <div>
                    <div className="font-extrabold text-navy text-[18px] font-display leading-none">50,000+</div>
                    <div className="text-text-2 text-[11px] mt-0.5">Members Registered</div>
                  </div>
                </div>

                {/* floating badge — top right */}
                <div className="absolute -top-5 -right-5 bg-orange rounded-[16px] px-4 py-3 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-[16px] font-display leading-none">Since 1997</div>
                    <div className="text-white/75 text-[11px] mt-0.5">Trusted NGO</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TRUST BADGES
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="bg-navy text-white py-3">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-wrap justify-center gap-6 sm:gap-10 text-[13px]">
          {[
            { label: "Registered NGO • Since 1997" },
            { label: "URN • AAJAM8783GE20213" },
            { label: "PAN • AAJAM8783G" },
            { label: "Transparent Organization • Transparent NGO" },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-orange flex-shrink-0" />
              <span className="text-white/80 font-medium">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-white border-b border-border">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center group">
                <div className="text-[24px] sm:text-[28px] font-extrabold text-orange font-display group-hover:scale-110 transition-transform">{s.value}</div>
                <div className="text-[13px] font-bold text-navy mt-0.5">{s.label}</div>
                <div className="text-[11px] text-text-2">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WORKING AREAS / BENEFITS GRID
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-gradient-to-b from-secondary/30 to-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange/10 text-orange text-[12px] font-bold uppercase tracking-wider">Our Key Work Areas</span>
            <h2 className="section-title mt-3">Our Working Areas</h2>
            <div className="mx-auto mt-3 h-1 w-16 bg-orange rounded-full" />
            <p className="mt-3 text-text-2 text-[14px] max-w-xl mx-auto">Join the financial help program and contribute to these focus areas.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <div key={b.title} className="group bg-white rounded-[18px] p-6 border border-border/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden relative cursor-pointer">
                <div className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: b.color }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 group-hover:rotate-[-5deg] transition-transform duration-300" style={{ background: b.bg, color: b.color }}>
                  <b.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-navy text-[16px] font-display">{b.title}</h3>
                <p className="text-text-2 text-[12px] mt-1">{b.sub}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-orange text-white font-bold text-[15px] shadow-lg shadow-orange/30 hover:opacity-90 transition hover:-translate-y-0.5">
              View All Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          THREE-COLUMN CTA — Membership / Volunteer / CSR
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 grid md:grid-cols-3 gap-6">
          {/* Membership */}
          <div className="rounded-[20px] overflow-hidden border border-border shadow-soft group relative">
            <div className="h-44 overflow-hidden relative">
              <img src={ctaMember} alt="Membership" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-display font-bold text-[18px]">Membership</div>
            </div>
            <div className="p-6 bg-white">
              <ul className="space-y-2 text-[13px] text-text mb-5">
                {["Annual membership form", "Training programs", "Community network", "Membership ID card", "Access to special programs"].map((p) => (
                  <li key={p} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{p}</li>
                ))}
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-2 w-full justify-center py-3 rounded-lg bg-navy text-white font-semibold text-[14px] hover:bg-navy-2 transition">
                <UserPlus className="w-4 h-4" /> Register Now
              </Link>
            </div>
          </div>

          {/* Volunteer */}
          <div className="rounded-[20px] overflow-hidden border-2 border-orange shadow-soft group relative">
            <div className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-3 bg-orange text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase z-10">Most Popular</div>
            <div className="h-44 overflow-hidden relative">
              <img src={ctaVolunteer} alt="Volunteer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-display font-bold text-[18px]">Financial Assistance</div>
            </div>
            <div className="p-6 bg-white">
              <ul className="space-y-2 text-[13px] text-text mb-5">
                {["Member ID card", "Benefit structure", "Bank support payout", "Member support", "Special training", "Welcome letter PDF"].map((p) => (
                  <li key={p} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-orange flex-shrink-0 mt-0.5" />{p}</li>
                ))}
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-2 w-full justify-center py-3 rounded-lg bg-gradient-to-r from-orange to-orange-2 text-white font-bold text-[14px] shadow-md shadow-orange/30 hover:opacity-90 transition">
                <Crown className="w-4 h-4" /> Join Now
              </Link>
            </div>
          </div>

          {/* CSR */}
          <div className="rounded-[20px] overflow-hidden border border-border shadow-soft group relative">
            <div className="h-44 overflow-hidden relative">
              <img src={aboutGroup} alt="CSR" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white font-display font-bold text-[18px]">CSR Partner</div>
            </div>
            <div className="p-6 bg-white">
              <ul className="space-y-2 text-[13px] text-text mb-5">
                {["Company CSR tie-up", "Brand visibility", "Reports and certificates", "Program sponsorship", "Social impact report"].map((p) => (
                  <li key={p} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />{p}</li>
                ))}
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-2 w-full justify-center py-3 rounded-lg bg-[#2563EB] text-white font-semibold text-[14px] hover:bg-blue-700 transition">
                <HeartHandshake className="w-4 h-4" /> Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          IMPACT IN NUMBERS (dark navy bar)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-navy text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-orange text-[12px] font-bold uppercase tracking-wider">Our Impact in Numbers</span>
            <h2 className="text-[28px] sm:text-[34px] font-extrabold font-display mt-3">Our Impact in Numbers</h2>
            <div className="mx-auto mt-3 h-1 w-16 bg-orange rounded-full" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {impact.map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform" style={{ background: item.color + "22", color: item.color }}>
                  <item.icon className="w-7 h-7" />
                </div>
                <div className="text-[26px] font-extrabold font-display" style={{ color: item.color }}>{item.value}</div>
                <div className="text-white/80 text-[12px] font-semibold mt-1">{item.label}</div>
                <div className="text-white/50 text-[11px]">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PLANS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-secondary/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange/10 text-orange text-[12px] font-bold uppercase tracking-wider">Our Plans</span>
            <h2 className="section-title mt-3">Choose Your Plan</h2>
            <div className="mx-auto mt-3 h-1 w-16 bg-orange rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div key={p.name} className={`relative bg-white rounded-[22px] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border ${p.popular ? "border-orange ring-2 ring-orange/20" : "border-border"}`}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase">Most Popular</div>
                )}
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center text-white shadow-md" style={{ background: p.color }}>
                    <p.icon className="w-7 h-7" />
                  </div>
                  <h3 className="mt-4 text-navy font-bold text-[17px] font-display">{p.name}</h3>
                  <p className="text-text-2 text-[12px]">{p.nameEn}</p>
                  <div className="mt-3">
                    {p.price === "Custom" ? (
                      <span className="font-extrabold text-[32px] font-display" style={{ color: p.color }}>Custom</span>
                    ) : (
                      <><span className="font-extrabold text-[32px] font-display" style={{ color: p.color }}>₹{p.price}</span>
                        <span className="text-text-2 text-[12px]"> / {p.period}</span></>
                    )}
                  </div>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-[13px] text-text">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: p.color }} />{perk}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-[14px] hover:opacity-90 transition"
                  style={{ background: p.color }}
                >
                  {p.price === "Custom" ? <><HeartHandshake className="w-4 h-4" /> Partner With Us</> : <><UserPlus className="w-4 h-4" /> Register Now</>}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOW TO JOIN — 5-step process
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-[#F8FAFC] border-y border-slate-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange/10 text-orange text-[12px] font-bold uppercase tracking-wider">Registration Process</span>
            <h2 className="section-title mt-3">How to Join</h2>
            <div className="mx-auto mt-3 h-1 w-16 bg-orange rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {steps.map((s, i) => (
              <div key={s.title} className="flex flex-col items-center text-center group relative">
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-[28px] flex items-center justify-center text-white shadow-lg shadow-black/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" style={{ background: s.color }}>
                    <s.icon className="w-8 h-8" strokeWidth={1.8} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center text-[11px] font-bold border border-slate-100" style={{ color: s.color }}>
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-bold text-navy font-display text-[16px] group-hover:text-orange transition-colors">{s.title}</h3>
                <p className="mt-2 text-text-2 text-[13px] leading-relaxed max-w-[190px]">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[75%] w-[50%] h-0.5 bg-gradient-to-r from-slate-200 to-slate-100" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-10 py-4 rounded-xl bg-gradient-to-r from-orange to-orange-2 text-white font-bold text-[16px] shadow-xl shadow-orange/30 hover:opacity-90 transition hover:-translate-y-0.5"
            >
              <UserPlus className="w-5 h-5" />
              Register Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-3 text-text-2 text-[13px]">Become an Active Member for ₹500. Free registration is also available. Razorpay secure payment.</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange/10 text-orange text-[12px] font-bold uppercase tracking-wider">What People Say</span>
            <h2 className="section-title mt-3">What People Say</h2>
            <div className="mx-auto mt-3 h-1 w-16 bg-orange rounded-full" />
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-[20px] p-6 border border-border shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-text text-[14px] leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-orange/20" />
                  <div>
                    <div className="font-bold text-navy text-[14px]">{t.name}</div>
                    <div className="text-text-2 text-[12px] flex items-center gap-1"><MapPin className="w-3 h-3" />{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROGRAMS HIGHLIGHTS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange/10 text-orange text-[12px] font-bold uppercase tracking-wider">Our Programs</span>
            <h2 className="section-title mt-3">Our Programs</h2>
            <div className="mx-auto mt-3 h-1 w-16 bg-orange rounded-full" />
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { img: program1, title: "Women Empowerment Program", en: "Women Empowerment Program", desc: "Building confidence, leadership, and decision-making ability." },
              { img: program2, title: "Education Support Initiative", en: "Education Support Initiative", desc: "Providing quality education to children in rural communities." },
              { img: program3, title: "Health & Safety Campaign", en: "Health & Safety Campaign", desc: "Promoting health awareness and safety practices." },
            ].map((pr) => (
              <div key={pr.title} className="group bg-white rounded-[20px] overflow-hidden border border-border shadow-soft hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                  <img src={pr.img} alt={pr.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-navy font-display text-[16px] group-hover:text-orange transition-colors">{pr.title}</h3>
                  <p className="text-text-2 text-[12px] mt-0.5">{pr.en}</p>
                  <p className="text-text text-[13px] mt-2 leading-relaxed">{pr.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/programs" className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border-2 border-orange text-orange font-bold text-[14px] hover:bg-orange hover:text-white transition">
              View All Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          DONATE STRIP — small contribution
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-gradient-to-r from-[#1a0a00] via-[#3d1a00] to-[#1a0a00]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-6">
            <p className="text-white/70 text-[13px] font-medium">Your small contribution can change someone's life</p>
            <h3 className="text-white font-bold text-[16px] sm:text-[18px] mt-1">Your Small Contribution Can Change Someone's Life</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { amt: "₹500", label: "Donate", color: "bg-[#e63b2a]" },
              { amt: "₹1000", label: "Donate", color: "bg-[#e63b2a]" },
              { amt: "₹5000", label: "Donate", color: "bg-[#e63b2a]" },
              { amt: "Other Amount", label: "Other", color: "bg-[#c0392b]" },
            ].map((d) => (
              <Link key={d.amt} to="/donate" className={`${d.color} text-white font-bold text-[14px] px-6 py-3 rounded-lg hover:opacity-90 transition text-center min-w-[100px]`}>
                <div>{d.amt}</div>
                <div className="text-[11px] font-semibold opacity-80">{d.label}</div>
              </Link>
            ))}
            <Link to="/donate" className="bg-orange text-white font-bold text-[14px] px-6 py-3 rounded-lg hover:opacity-90 transition text-center min-w-[120px]">
              <div>Donate Now</div>
              <div className="text-[11px] font-semibold opacity-80">Donate Now</div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA — Register Banner
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="rounded-[24px] bg-gradient-to-br from-navy via-[#0d2a4e] to-navy text-white p-10 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-orange/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
            <div className="relative text-center md:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-orange/20 text-orange text-[11px] font-bold uppercase tracking-wider mb-3">Financial Help Program</div>
              <h3 className="font-display font-extrabold text-[26px] sm:text-[30px]">
                Join MahilaAyush Today!
              </h3>
              <p className="text-white/70 text-[15px] mt-2 max-w-lg">
                Join the MahilaAyush Financial Help Program. Become an Active Member for ₹500, or choose Free registration, and start your journey.
              </p>
              <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start text-[13px] text-white/60">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-400" /> Secure Razorpay Payment</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-400" /> Instant ID Card</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-400" /> Welcome Letter PDF</span>
              </div>
            </div>
            <div className="relative flex flex-col gap-3 min-w-[220px]">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange to-orange-2 text-white font-extrabold text-[16px] shadow-xl shadow-orange/40 hover:opacity-90 transition hover:-translate-y-0.5"
              >
                <UserPlus className="w-5 h-5" />
                Register Now
              </Link>
              <Link
                to="/donate"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-[15px] hover:bg-white/20 transition"
              >
                <Wallet className="w-4 h-4" />
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTACT INFO BAR
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="bg-secondary/50 border-t border-border py-6">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex flex-wrap justify-center gap-6 text-[13px] text-text-2">
          <a href="tel:+919598059289" className="flex items-center gap-2 hover:text-orange transition">
            <Phone className="w-4 h-4 text-orange" /> +91 95980 59289
          </a>
          <a href="mailto:azaramesh@gmail.com" className="flex items-center gap-2 hover:text-orange transition">
            <Mail className="w-4 h-4 text-orange" /> azaramesh@gmail.com
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange" /> Mustafabad, Mubarakpur, Azamgarh, U.P. 276404
          </span>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
