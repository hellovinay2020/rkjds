import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Heart,
  ArrowUp,
  Clock,
  Sparkles,
  ShieldCheck,
  FileText,
  Smartphone,
  Database,
  Calendar,
  User,
  UserPlus,
  CreditCard,
  Briefcase,
  Users,
  BarChart3,
  BookOpen,
  Award,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaCross, FaDove, FaHandsPraying } from "react-icons/fa6";
import { useSiteSettings } from "@/lib/useSiteSettings";
import MinistryLogo from "./MinistryLogo";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

const sacraments = [
  { label: "Baptism Application", to: "/baptism-application", Icon: FaDove },
  { label: "Baptism Verification", to: "/baptism-verify", Icon: FileText },
  { label: "Baptism Certificate", to: "/baptism-certificate", Icon: Award },
  { label: "Online Prayer Request", to: "/prayer-request", Icon: FaHandsPraying },
  { label: "Online Testimony", to: "/testimony", Icon: Sparkles },
  { label: "Holy Bible (Hindi/English)", to: "/bible", Icon: BookOpen },
] as const;

const memberAndPortals = [
  { label: "Member Portal", to: "/member-portal", Icon: User },
  { label: "Member Registration", to: "/member-registration", Icon: UserPlus },
  { label: "Membership ID Card & Cert", to: "/id-card", Icon: CreditCard },
  { label: "Chairman Dashboard", to: "/chairman", Icon: FaCross },
  { label: "Manager Dashboard", to: "/manager", Icon: Briefcase },
  { label: "Retailer / Field Worker", to: "/field-worker", Icon: Users },
  { label: "Reports & Analytics", to: "/reports", Icon: BarChart3 },
  { label: "Local Data Backup", to: "/local-backup", Icon: Database },
  { label: "Mobile App / PWA", to: "/mobile-app", Icon: Smartphone },
] as const;

const aboutMinistry = [
  { label: "About RK Ministries", to: "/about" },
  { label: "Pastor Ramesh (Chairman)", to: "/founder" },
  { label: "Mission & Vision", to: "/mission-vision" },
  { label: "Trust Documents", to: "/documents" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Contact Us", to: "/contact" },
] as const;

function LinkCol({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; to: string; Icon?: any }[];
}) {
  return (
    <div>
      <h4 className="text-amber-400 font-display font-bold text-[16px] tracking-wide pb-2.5 mb-4 border-b border-white/10">
        {title}
      </h4>
      <ul className="space-y-2.5 text-[14px]">
        {items.map((q) => (
          <li key={q.label}>
            <Link
              to={q.to}
              className="group inline-flex items-center gap-2 text-slate-300 hover:text-amber-300 transition-colors"
            >
              {q.Icon ? (
                <q.Icon className="w-3.5 h-3.5 text-amber-400/80 group-hover:scale-110 transition-transform shrink-0" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-amber-400/70 group-hover:translate-x-1 transition-transform shrink-0" />
              )}
              <span>{q.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const { settings } = useSiteSettings();
  const s = settings || ({} as any);

  const email = s.contactEmail || MINISTRY_CONFIG.email;
  const phones = s.contactPhone
    ? s.contactPhone.split("|").map((p: string) => p.trim()).filter(Boolean)
    : [MINISTRY_CONFIG.phone];
  const primaryPhone = phones[0] || MINISTRY_CONFIG.phone;
  const address = s.contactAddress || MINISTRY_CONFIG.address;

  const socialItems = [
    { I: FaYoutube, href: MINISTRY_CONFIG.socialLinks.youtube, label: "YouTube", color: "hover:bg-red-600" },
    { I: FaFacebookF, href: MINISTRY_CONFIG.socialLinks.facebook, label: "Facebook", color: "hover:bg-blue-600" },
    { I: FaInstagram, href: MINISTRY_CONFIG.socialLinks.instagram, label: "Instagram", color: "hover:bg-pink-600" },
  ];

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#051329] text-white pt-16 pb-8 border-t-2 border-amber-500/40 relative overflow-hidden">
      {/* Background glow & subtle sacred pattern */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Ministry Brand, Mission & Socials */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <MinistryLogo variant="light" size="lg" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-wide">
                  RK MINISTRIES
                </h3>
                <p className="text-amber-400 text-xs sm:text-sm font-medium">
                  Church & Evangelical Fellowship • Azamgarh, U.P.
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-[13.5px] leading-relaxed max-w-md pt-1">
              <strong className="text-white">RK MINISTRIES</strong> (आरके मिनिस्ट्रीज) प्रभु यीशु मसीह के प्रेम, सुसमाचार, चंगाई और उद्धार को जन-जन तक पहुँचाने हेतु समर्पित है। हम प्रार्थना, संगति, बपतिस्मा और आत्मिक सहायता द्वारा समाज में शांति व आशा का संचार करते हैं।
            </p>

            {/* Service Timings Card */}
            <div className="bg-white/5 border border-amber-400/20 rounded-2xl p-3.5 max-w-md space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>आराधना व प्रार्थना सभा समय (Service Timings)</span>
              </div>
              <div className="text-[12.5px] text-slate-200 divide-y divide-white/5">
                <div className="py-1 flex justify-between">
                  <span>रविवार आराधना (Sunday Service):</span>
                  <strong className="text-amber-300 font-semibold">10:00 AM - 1:00 PM</strong>
                </div>
                <div className="py-1 flex justify-between">
                  <span>शुक्रवार उपवास प्रार्थना (Fasting Prayer):</span>
                  <strong className="text-amber-300 font-semibold">6:00 PM - 8:30 PM</strong>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-2.5">
              <span className="text-xs text-slate-400 font-medium mr-1">Follow Us:</span>
              {socialItems.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 ${s.color}`}
                >
                  <s.I className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Sacraments & Prayer */}
          <div className="lg:col-span-1">
            <LinkCol title="Sacraments & Prayer" items={sacraments} />
          </div>

          {/* Col 4: Portals & Dashboards */}
          <div className="lg:col-span-1">
            <LinkCol title="Portals & Systems" items={memberAndPortals} />
          </div>

          {/* Col 5: Contact Details */}
          <div className="lg:col-span-1">
            <h4 className="text-amber-400 font-display font-bold text-[16px] tracking-wide pb-2.5 mb-4 border-b border-white/10">
              Contact & Location
            </h4>
            <div className="space-y-3.5 text-[13px] text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-[13.5px]">RK MINISTRIES</strong>
                  <p className="text-slate-300 text-[12px] leading-relaxed mt-0.5">
                    {address}
                  </p>
                  <a
                    href={MINISTRY_CONFIG.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline text-[11.5px] font-semibold inline-block mt-1"
                  >
                    Google Map पर देखें →
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${primaryPhone.replace(/\s+/g, '')}`} className="hover:text-amber-300 font-semibold text-white">
                  {primaryPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-amber-300 break-all">
                  {email}
                </a>
              </div>

              <div className="pt-2">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-transform hover:scale-102"
                >
                  <Heart className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Support / Tithes (दान / दशमांश)</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-200">RK MINISTRIES</strong>. All Rights Reserved. Village Mustafabad, Mubarakpur, Azamgarh, U.P.
          </div>
          <div className="flex items-center gap-4 text-[12.5px]">
            <Link to="/about" className="hover:text-amber-300">About</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-amber-300">Terms</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-amber-300">Privacy Policy</Link>
            <span>•</span>
            <Link to="/local-backup" className="text-amber-400 hover:underline font-semibold">Data Backup</Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-xl flex items-center justify-center transition-all hover:scale-110"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </footer>
  );
}
