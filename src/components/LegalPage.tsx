import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FileText, Mail, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import breadcrumbImg from "@/assets/breadcrume/breadcrume-logo.png";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

export type LegalSection = { title: string; body: ReactNode | string };

function renderSectionBody(body: ReactNode | string) {
  if (typeof body !== "string") return body;

  const paragraphs = body.split(/\r?\n\s*\r?\n/);
  return (
    <>
      {paragraphs.map((para, pIdx) => {
        const rawLines = para.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
        const isBulletList = rawLines.length > 0 && rawLines.every((l) => l.startsWith("- ") || l.startsWith("* "));

        if (isBulletList) {
          return (
            <ul key={pIdx} className="list-disc pl-5 space-y-1.5 my-2">
              {rawLines.map((line, lIdx) => (
                <li key={lIdx}>{line.replace(/^[-*]\s+/, "")}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={pIdx} className="leading-relaxed">
            {rawLines.join(" ")}
          </p>
        );
      })}
    </>
  );
}

function formatDate(val: string) {
  if (!val) return "01 January 2026";
  const d = new Date(val);
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
  }
  return val;
}

export default function LegalPage({
  title,
  description,
  updated,
  sections,
  crumbLabel,
}: {
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
  crumbLabel: string;
}) {
  const { settings } = useSiteSettings();
  const s = settings || ({} as any);

  const email = s.contactEmail || MINISTRY_CONFIG.email;
  const phones = s.contactPhone
    ? s.contactPhone.split("|").map((p: string) => p.trim()).filter(Boolean)
    : [MINISTRY_CONFIG.phone];
  const primaryPhone = phones[0] || MINISTRY_CONFIG.phone;

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero
        title={title}
        description={description}
        image={breadcrumbImg}
        crumbs={[{ label: "Home", to: "/" }, { label: crumbLabel }]}
      />

      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_2.4fr] gap-10">
          {/* Sidebar TOC */}
          <aside className="lg:sticky lg:top-28 h-fit">
            <div className="bg-white rounded-[20px] border border-border p-6 shadow-soft">
              <div className="flex items-center gap-2 text-orange font-bold text-[12px] uppercase tracking-wider">
                <FileText className="w-4 h-4" /> On this page
              </div>
              <ul className="mt-4 space-y-2">
                {sections.map((s, i) => (
                  <li key={s.title}>
                    <a href={`#sec-${i}`} className="group flex items-start gap-2 text-[14px] text-text-2 hover:text-orange transition py-1.5">
                      <span className="text-[11px] font-bold text-orange mt-1 w-5">{String(i + 1).padStart(2, "0")}</span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-5 border-t border-border text-[12px] text-text-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Last updated: <span className="text-navy font-semibold">{formatDate(updated)}</span>
              </div>
            </div>

            <div className="mt-5 bg-gradient-to-br from-navy to-navy-2 text-white rounded-[20px] p-6 shadow-soft">
              <h4 className="font-display font-bold text-[16px]">Need help?</h4>
              <p className="mt-1 text-[13px] text-white/75">Reach out to our team for any clarification.</p>
              <a href={`mailto:${email}`} className="mt-4 flex items-center gap-2 text-[13px] text-white hover:text-orange transition">
                <Mail className="w-4 h-4 text-orange" /> {email}
              </a>
              <a href={`tel:${primaryPhone.replace(/\s+/g, '')}`} className="mt-2 flex items-center gap-2 text-[13px] text-white hover:text-orange transition">
                <Phone className="w-4 h-4 text-orange" /> {primaryPhone}
              </a>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-2 bg-orange text-white font-semibold rounded-full px-4 py-2.5 text-[13px] hover:bg-orange-2 transition">
                Contact Us <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>

          {/* Content */}
          <div className="bg-white rounded-[24px] border border-border shadow-soft p-8 md:p-12">
            <div className="prose-legal">
              {sections.map((s, i) => (
                <section key={s.title} id={`sec-${i}`} className="scroll-mt-32 mb-10 last:mb-0">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-9 h-9 rounded-xl bg-orange/10 text-orange flex items-center justify-center font-display font-extrabold text-[14px]">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="text-navy font-display font-extrabold text-[22px] sm:text-[24px]">{s.title}</h2>
                  </div>
                  <div className="text-text-2 text-[15px] leading-[1.85] space-y-3 pl-12">
                    {renderSectionBody(s.body)}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
