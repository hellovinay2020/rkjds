import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FileText, Mail, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import breadcrumbImg from "@/assets/breadcrume/breadcrume-logo.png";

export type LegalSection = { title: string; body: ReactNode };

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
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Last updated: <span className="text-navy font-semibold">{updated}</span>
              </div>
            </div>

            <div className="mt-5 bg-gradient-to-br from-navy to-navy-2 text-white rounded-[20px] p-6 shadow-soft">
              <h4 className="font-display font-bold text-[16px]">Need help?</h4>
              <p className="mt-1 text-[13px] text-white/75">Reach out to our team for any clarification.</p>
              <a href="mailto:azaramesh@gmail.com" className="mt-4 flex items-center gap-2 text-[13px] text-white hover:text-orange transition">
                <Mail className="w-4 h-4 text-orange" /> azaramesh@gmail.com
              </a>
              <a href="tel:+919598059289" className="mt-2 flex items-center gap-2 text-[13px] text-white hover:text-orange transition">
                <Phone className="w-4 h-4 text-orange" /> +91 95980 59289
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
                    {s.body}
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
