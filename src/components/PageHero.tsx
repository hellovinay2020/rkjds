import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import defaultBreadcrumbImg from "@/assets/breadcrume/breadcrume-logo.png";

export type CrumbItem = {
  label: string;
  to?: string;
};

type Props = {
  title?: string;
  accent?: string;
  description?: string;
  image?: string;
  crumbs?: CrumbItem[];
  eyebrow?: string;
};

// Route to Menu & Page Hierarchy
const ROUTE_MAP: Record<string, { menu?: string; menuTo?: string; page: string }> = {
  "/": { page: "Home" },
  "/about": { menu: "About Us", menuTo: "/about", page: "About RK Ministries" },
  "/founder": { menu: "About Us", menuTo: "/about", page: "Pastor Ramesh (Chairman)" },
  "/team": { menu: "About Us", menuTo: "/about", page: "Leadership Team" },
  "/mission-vision": { menu: "About Us", menuTo: "/about", page: "Mission & Vision" },
  "/documents": { menu: "About Us", menuTo: "/about", page: "Ministry Documents" },

  "/baptism-application": { menu: "Baptism", menuTo: "/baptism-application", page: "Baptism Application" },
  "/baptism-verify": { menu: "Baptism", menuTo: "/baptism-application", page: "Baptism Verification" },

  "/prayer-request": { menu: "Prayer & Bible", menuTo: "/prayer-request", page: "Online Prayer Request" },
  "/testimony": { menu: "Prayer & Bible", menuTo: "/prayer-request", page: "Online Testimony" },
  "/bible": { menu: "Prayer & Bible", menuTo: "/prayer-request", page: "Holy Bible (Hindi / English)" },
  "/events": { menu: "Prayer & Bible", menuTo: "/prayer-request", page: "Service & Worship Timings" },

  "/member-registration": { menu: "Membership", menuTo: "/member-registration", page: "Member Registration" },
  "/id-card": { menu: "Membership", menuTo: "/member-registration", page: "Membership ID Card & Cert" },

  "/chairman": { menu: "Dashboards", menuTo: "/chairman", page: "Chairman Dashboard" },
  "/manager": { menu: "Dashboards", menuTo: "/chairman", page: "Manager Dashboard" },
  "/field-worker": { menu: "Dashboards", menuTo: "/chairman", page: "Retailer / Field Worker" },
  "/reports": { menu: "Dashboards", menuTo: "/chairman", page: "Reports & Analytics" },
  "/local-backup": { menu: "Dashboards", menuTo: "/chairman", page: "Local Data Backup" },
  "/mobile-app": { menu: "Dashboards", menuTo: "/chairman", page: "Mobile Software / App" },

  "/contact": { page: "Contact" },
  "/donate": { page: "Donate / Giving" },
  "/causes": { page: "Causes & Ministries" },
  "/gallery": { page: "Photo Gallery" },
  "/video-gallery": { page: "Video Gallery" },
  "/privacy": { page: "Privacy Policy" },
  "/terms": { page: "Terms & Conditions" },
  "/refund": { page: "Refund Policy" },
  "/programs": { page: "Programs" },
  "/financial-help": { page: "Financial Help" },
  "/crowd-funding": { page: "Crowdfunding" },
  "/blogs": { page: "Blogs" },
  "/projects": { page: "Projects" },
  "/success-stories": { page: "Success Stories" },
  "/media-coverage": { page: "Media Coverage" },
};

export default function PageHero({ title, image, crumbs }: Props) {
  const { pathname } = useLocation();
  const heroImage = defaultBreadcrumbImg;

  // Resolve crumbs based on current route menu hierarchy
  const routeInfo = ROUTE_MAP[pathname];
  let finalCrumbs: CrumbItem[] = [];

  if (routeInfo) {
    finalCrumbs.push({ label: "Home", to: "/" });
    if (routeInfo.menu && routeInfo.menu !== routeInfo.page) {
      finalCrumbs.push({ label: routeInfo.menu, to: routeInfo.menuTo });
    }
    finalCrumbs.push({ label: routeInfo.page });
  } else if (crumbs && crumbs.length > 0) {
    finalCrumbs = crumbs;
  } else {
    finalCrumbs = [
      { label: "Home", to: "/" },
      { label: title || "Page" },
    ];
  }

  return (
    <section className="relative overflow-hidden bg-[#0A2540] text-white border-b border-amber-500/20 h-[200px] flex items-center">
      <img
        src={heroImage}
        alt="RK MINISTRIES"
        className="absolute inset-0 w-full h-[200px] object-cover opacity-45 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07172C]/90 via-[#0A2540]/80 to-[#07172C]/90" />

      {/* Subtle ambient decorative blobs */}
      <div className="pointer-events-none absolute -top-10 -left-10 w-48 h-48 bg-amber-500/15 blur-2xl rounded-full" />
      <div className="pointer-events-none absolute -bottom-10 right-10 w-56 h-56 bg-blue-600/15 blur-2xl rounded-full" />

      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-sm sm:text-base">
          {finalCrumbs.map((c, i) => {
            const isLast = i === finalCrumbs.length - 1;
            const isFirst = i === 0;

            return (
              <span key={i} className="flex items-center gap-2">
                {isLast ? (
                  <span className="font-bold text-amber-400 tracking-wide">
                    {c.label}
                  </span>
                ) : c.to ? (
                  <Link
                    to={c.to}
                    className="font-medium text-white/80 hover:text-amber-400 transition flex items-center gap-1.5"
                  >
                    {isFirst && <Home className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{c.label}</span>
                  </Link>
                ) : (
                  <span className="font-medium text-white/80">
                    {c.label}
                  </span>
                )}

                {!isLast && (
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
