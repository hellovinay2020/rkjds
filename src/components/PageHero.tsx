import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import defaultBreadcrumbImg from "@/assets/breadcrume/breadcrume-logo.png";

type Props = {
  title: string;
  accent?: string;
  description?: string;
  image?: string;
  crumbs?: { label: string; to?: string }[];
  eyebrow?: string;
};

export default function PageHero({ title, accent, description, image, crumbs, eyebrow }: Props) {
  const heroImage = image || defaultBreadcrumbImg;

  return (
    <section className="relative overflow-hidden bg-[#0A2540] text-white">
      <img
        src={heroImage}
        alt="RK MINISTRIES"
        className="absolute inset-0 w-full h-full object-cover opacity-55 scale-105 animate-[zoom-in-soft_1.2s_ease-out_both]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540] via-[#0A2540]/85 to-transparent" />
      {/* decorative orbs */}
      <div className="pointer-events-none absolute -top-16 -left-16 w-72 h-72 bg-amber-500/20 blur-3xl rounded-full animate-float" />
      <div className="pointer-events-none absolute -bottom-20 right-10 w-80 h-80 bg-blue-600/20 blur-3xl rounded-full animate-float-soft" />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24 min-h-[40vh] sm:min-h-[45vh] lg:min-h-[50vh] flex flex-col justify-center">
        {eyebrow && <div className="no-reveal text-amber-400 font-semibold uppercase tracking-wider text-[12px] mb-3 animate-fade-down">{eyebrow}</div>}
        {crumbs && (
          <nav className="no-reveal flex items-center gap-1.5 text-[13px] text-white/80 mb-3 animate-fade-down" style={{ animationDelay: ".05s" }}>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.to ? <Link to={c.to} className="hover:text-amber-400 transition">{c.label}</Link> : <span className="text-white font-medium">{c.label}</span>}
                {i < crumbs.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-white/60" />}
              </span>
            ))}
          </nav>
        )}
        <h1 className="no-reveal font-display font-extrabold text-[34px] sm:text-[44px] md:text-[54px] leading-[1.05] animate-fade-up" style={{ animationDelay: ".1s" }}>
          {title} {accent && <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">{accent}</span>}
        </h1>
        {description && (
          <p className="no-reveal mt-3 max-w-2xl text-[15px] sm:text-[16px] text-white/85 leading-relaxed animate-fade-up" style={{ animationDelay: ".2s" }}>
            {description}
          </p>
        )}
        <div className="no-reveal mt-4 h-1 w-16 bg-amber-500 rounded-full animate-fade-left" style={{ animationDelay: ".25s" }} />
      </div>
    </section>
  );
}
