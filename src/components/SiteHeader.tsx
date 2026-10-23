import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Heart,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Download,
  BookOpen,
  Calendar,
  CreditCard,
  User,
  UserPlus,
  Users,
  Award,
  FileText,
  LogIn,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaDove, FaHandsPraying, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { useSiteSettings, getFullUrl } from "@/lib/useSiteSettings";
import MinistryLogo from "./MinistryLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

type NavItem = {
  label: string;
  to: string;
  hasMenu?: boolean;
  Icon?: any;
  children?: { label: string; to: string; badge?: string; Icon?: any }[];
};

const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    to: "/about",
    hasMenu: true,
    children: [
      { label: "About RK Ministries", to: "/about", Icon: ShieldCheck },
      { label: "Pastor Ramesh (Chairman)", to: "/founder", Icon: User },
      { label: "Leadership Team", to: "/team", Icon: Users },
      { label: "Mission & Vision", to: "/mission-vision", Icon: Sparkles },
      { label: "Ministry Documents", to: "/documents", Icon: FileText },
    ],
  },
  {
    label: "Baptism",
    to: "/baptism-application",
    hasMenu: true,
    Icon: FaDove,
    children: [
      { label: "Baptism Application", to: "/baptism-application", Icon: FaDove },
      { label: "Baptism Verification", to: "/baptism-verify", Icon: FileText },
    ],
  },
  {
    label: "Prayer & Bible",
    to: "/prayer-request",
    hasMenu: true,
    Icon: FaHandsPraying,
    children: [
      { label: "Online Prayer Request", to: "/prayer-request", Icon: FaHandsPraying },
      { label: "Online Testimony", to: "/testimony", Icon: Sparkles },
      { label: "Holy Bible (Hindi / English)", to: "/bible", Icon: BookOpen },
      { label: "Service & Worship Timings", to: "/events", Icon: Calendar },
    ],
  },
  {
    label: "Membership",
    to: "/member-registration",
    hasMenu: true,
    Icon: CreditCard,
    children: [
      { label: "Member Registration", to: "/member-registration", Icon: UserPlus },
      { label: "Membership ID Card & Cert", to: "/id-card", Icon: CreditCard },
    ],
  },
  {
    label: "Gallery",
    to: "/gallery",
    hasMenu: true,
    Icon: ImageIcon,
    children: [
      { label: "Photo Gallery", to: "/gallery", Icon: ImageIcon },
      { label: "Video Gallery", to: "/video-gallery", Icon: Video },
    ],
  },
  { label: "Contact", to: "/contact" },
];

const fallbackContact = {
  email: MINISTRY_CONFIG.email,
  phones: [MINISTRY_CONFIG.phone],
  address: "Mustafabad, Mubarakpur, Azamgarh, U.P. 276404",
  socialLinks: MINISTRY_CONFIG.socialLinks,
};

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { pathname } = useLocation();
  const hasVisitedAnotherPage = useRef(false);
  const { settings } = useSiteSettings();
  const s = settings || ({} as any);
  const socials = { ...fallbackContact.socialLinks, ...(s.socialLinks || {}) };

  const email = s.contactEmail || fallbackContact.email;
  const phones = s.contactPhone
    ? s.contactPhone.split("|").map((p: string) => p.trim()).filter(Boolean)
    : fallbackContact.phones;
  const phoneText = phones.join(" | ");
  const primaryPhone = phones[0] || MINISTRY_CONFIG.phone;
  const address = s.contactAddress || fallbackContact.address;

  useEffect(() => {
    if (pathname !== "/") {
      hasVisitedAnotherPage.current = true;
    }
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const socialItems = [
    socials.youtube ? { I: FaYoutube, href: socials.youtube, label: "YouTube", color: "hover:bg-red-600 hover:text-white" } : null,
    socials.facebook ? { I: FaFacebookF, href: socials.facebook, label: "Facebook", color: "hover:bg-blue-600 hover:text-white" } : null,
    socials.instagram ? { I: FaInstagram, href: socials.instagram, label: "Instagram", color: "hover:bg-pink-600 hover:text-white" } : null,
    socials.whatsapp ? { I: FaWhatsapp, href: socials.whatsapp.startsWith("http") ? socials.whatsapp : `https://wa.me/${socials.whatsapp.replace(/\D/g, "")}`, label: "WhatsApp", color: "hover:bg-green-600 hover:text-white" } : null,
    socials.linkedin ? { I: FaLinkedinIn, href: socials.linkedin, label: "LinkedIn", color: "hover:bg-[#0077b5] hover:text-white" } : null,
    socials.twitter ? { I: FaXTwitter, href: socials.twitter, label: "Twitter", color: "hover:bg-black hover:text-white" } : null,
  ].filter(Boolean);

  function toggleDropdown(key: string) {
    setOpenDropdown((prev) => (prev === key ? null : key));
  }

  return (
    <>
      {/* Top Banner & Ministry Details Bar */}
      <div className="relative bg-gradient-to-r from-[#07172C] via-[#0A2540] to-[#123962] text-white text-[12.5px] font-medium border-b border-amber-500/20 shadow-sm">
        <div className="max-w-[1360px] mx-auto px-3 sm:px-6 h-[38px] sm:h-[40px] flex items-center justify-between gap-2 sm:gap-3 relative">
          
          {/* Contact and Location info */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 overflow-hidden">
            {primaryPhone && (
              <a
                href={`tel:${primaryPhone.replace(/[^+\d]/g, "")}`}
                className="flex items-center gap-1.5 text-amber-300 hover:text-white transition-colors shrink-0 group text-[11.5px] sm:text-[12.5px]"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="font-semibold tracking-wide sm:hidden">{primaryPhone}</span>
                <span className="hidden sm:inline font-semibold tracking-wide">{phoneText}</span>
              </a>
            )}
            
            <span className="hidden sm:block w-px h-3.5 bg-white/20 shrink-0" />

            {email && (
              <a
                href={`mailto:${email}`}
                className="hidden sm:flex items-center gap-1.5 text-slate-200 hover:text-amber-300 transition-colors shrink-0 group"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="truncate tracking-wide">{email}</span>
              </a>
            )}

            <span className="hidden md:block w-px h-3.5 bg-white/20 shrink-0" />

            {address && (
              <span className="hidden lg:flex items-center gap-1.5 text-slate-300 min-w-0">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate text-[12px]">{address}</span>
              </span>
            )}
          </div>

          {/* Social Links, Language Switcher & Quick Portal */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Topbar Prayer Request */}
            <Link
              to="/prayer-request"
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] sm:text-[11.5px] font-bold text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/25 px-2.5 py-0.5 rounded-full border border-amber-400/30 transition shadow-sm"
            >
              <FaHandsPraying className="w-2.5 h-2.5 text-amber-400" />
              <span>Prayer Request</span>
            </Link>

            {/* Topbar Baptism Form */}
            <Link
              to="/baptism-application"
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] sm:text-[11.5px] font-bold text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/25 px-2.5 py-0.5 rounded-full border border-amber-400/30 transition shadow-sm"
            >
              <FaDove className="w-2.5 h-2.5 text-amber-400" />
              <span>Baptism Form</span>
            </Link>

            <span className="hidden sm:block w-px h-3.5 bg-white/20" />

            {socialItems.length > 0 && (
              <div className="flex items-center gap-1.5">
                {socialItems.map((item: any) => {
                  const { I, href, label, color } = item;
                  return (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`w-6 h-6 rounded-full bg-white/10 hover:border-transparent border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 ${color}`}
                    >
                      <I className="w-3 h-3 text-white" />
                    </a>
                  );
                })}
              </div>
            )}

            <span className="w-px h-3.5 bg-white/20" />

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-[#0A2540] border-b border-amber-500/30 shadow-[0_4px_25px_rgba(0,0,0,0.25)]">
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent pointer-events-none" />
        <div className="max-w-[1360px] mx-auto px-3 sm:px-6 h-[72px] sm:h-[80px] lg:h-[84px] flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <MinistryLogo variant="light" size="md" />
            <Link to="/" className="hidden min-[480px]:flex flex-col justify-center text-left select-none group">
              <div className="flex items-center gap-1.5 leading-none font-display font-extrabold tracking-wider text-base sm:text-lg lg:text-xl">
                <span className="text-white group-hover:text-amber-300 transition-colors">
                  {s.siteNameLine1 || "RKV"}
                </span>
                <span className="text-amber-400 group-hover:text-white transition-colors">
                  {s.siteNameLine2 || "MINISTRIES"}
                </span>
              </div>
              <span className="block text-[10px] sm:text-[11px] text-amber-300/85 font-medium tracking-wide mt-1 leading-tight">
                {s.siteNameLine3 || s.tagline || "Church & Evangelical Fellowship"}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 text-[14.5px] font-semibold text-white">
            {navItems.map((n) => {
              const active =
                (pathname === n.to && (n.to !== "/" || hasVisitedAnotherPage.current)) ||
                n.children?.some((c) => c.to === pathname);
              return (
                <div key={n.label} className="relative group">
                  <Link
                    to={n.to}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-2 leading-none whitespace-nowrap transition-all duration-200 ${
                      active
                        ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                        : "hover:bg-white/10 hover:text-amber-300 text-slate-100"
                    }`}
                  >
                    <span>{n.label}</span>
                    {n.hasMenu && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition group-hover:rotate-180 ${
                          active ? "text-slate-950" : "text-amber-400/80"
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {n.children && (
                    <div
                      className={`absolute ${
                        n.label === "Dashboards" ? "right-0" : "left-0"
                      } top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}
                    >
                      <div className="w-max min-w-[280px] bg-white rounded-2xl shadow-[0_16px_45px_rgba(2,24,64,0.18)] border border-slate-200/90 p-2 overflow-hidden">
                        {n.children.map((c) => (
                          <Link
                            key={c.to}
                            to={c.to}
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] whitespace-nowrap transition-all duration-150 ${
                              pathname === c.to
                                ? "bg-amber-500/15 text-amber-800 font-bold"
                                : "text-slate-800 hover:bg-amber-50/80 hover:text-amber-800 font-medium"
                            }`}
                          >
                            {c.Icon && (
                              <span className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                                <c.Icon className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              </span>
                            )}
                            <span className="whitespace-nowrap">{c.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Login Button */}
            <Link
              to="/member-portal"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-3.5 sm:px-4 py-2 text-xs sm:text-[13px] shadow-md shadow-amber-500/20 transition-all hover:scale-102"
            >
              <LogIn className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
              <span className="whitespace-nowrap">Login</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setMenuOpen((o) => !o);
                setOpenDropdown(null);
              }}
              aria-label="Toggle menu"
              className="xl:hidden w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 hover:bg-white/20 transition"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="xl:hidden border-t border-white/10 bg-[#07172C] max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="max-w-[1360px] mx-auto px-4 py-4">
              {/* Drawer Brand Header with Logo */}
              <div className="flex items-center justify-between p-3 mb-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <MinistryLogo size="sm" />
                  <div>
                    <span className="block text-white font-bold text-sm tracking-wide">
                      {s.siteNameLine1 && s.siteNameLine2 ? `${s.siteNameLine1} ${s.siteNameLine2}` : (s.siteName || "RKV MINISTRIES")}
                    </span>
                    <span className="block text-amber-400 text-xs font-medium">
                      {s.siteNameLine3 || s.tagline || "Church & Evangelical Fellowship"}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Menu
                </span>
              </div>

              {/* Mobile Nav Items */}
              <nav className="flex flex-col space-y-1 text-[14.5px] font-semibold text-white">
              {navItems.map((n) => {
                const isDropdownOpen = openDropdown === n.to;
                return (
                  <div key={n.label} className="border-b border-white/5 pb-1">
                    {n.hasMenu ? (
                      <div>
                        <div className="flex items-center justify-between py-2.5">
                          <Link
                            to={n.to}
                            onClick={() => setMenuOpen(false)}
                            className="text-slate-100 hover:text-amber-400 flex items-center gap-2"
                          >
                            {n.Icon && <n.Icon className="w-4 h-4 text-amber-400" />}
                            <span>{n.label}</span>
                          </Link>
                          <button
                            onClick={() => toggleDropdown(n.to)}
                            className="p-2 text-amber-400"
                            aria-label={`Toggle ${n.label} menu`}
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                        </div>
                        {isDropdownOpen && n.children && (
                          <div className="pl-3 pb-2 space-y-1">
                            {n.children.map((c) => (
                              <Link
                                key={c.to}
                                to={c.to}
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center gap-2.5 py-2 px-3 rounded-lg text-[13px] ${
                                  pathname === c.to
                                    ? "bg-amber-500/20 text-amber-400 font-bold"
                                    : "text-slate-300 hover:bg-white/5 hover:text-amber-300"
                                }`}
                              >
                                {c.Icon && <c.Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                                <span>{c.label}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={n.to}
                        onClick={() => setMenuOpen(false)}
                        className="block py-2.5 text-slate-100 hover:text-amber-400"
                      >
                        {n.label}
                      </Link>
                    )}
                  </div>
                );
              })}

              <div className="pt-3 grid grid-cols-2 gap-2">
                <Link
                  to="/member-portal"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 rounded-xl text-center text-sm"
                >
                  <LogIn className="w-4 h-4 text-amber-400" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/donate"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl text-center text-sm"
                >
                  <Heart className="w-4 h-4 fill-slate-950" /> Donate
                </Link>
              </div>
            </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
