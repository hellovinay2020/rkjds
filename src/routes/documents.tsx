import { useEffect, useState } from "react";
import { Download, Shield, Award, FileCheck2, Building2, FileText, Landmark, Eye, CheckCircle2, type LucideIcon } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import heroBg from "@/assets/herosection/NariSashaktikaran.png";
import { fetchDocuments, type DocumentItem } from "@/data/documents";

const docMeta: Record<string, { icon: LucideIcon; number: string; desc: string; color: string; bg: string }> = {
  "PAN Card": {
    icon: Shield,
    number: "PAN: AANAR9870K",
    desc: "Permanent Account Number card issued by the Income Tax Department, Government of India.",
    color: "#EA580C",
    bg: "#FFF7ED",
  },
  "Registration": {
    icon: Building2,
    number: "Ref: AANAR9870K",
    desc: "Trust Registration and 12A/80G order certification under the Income Tax Act.",
    color: "#0F766E",
    bg: "#E6F7F4",
  },
  "NGO Darpan": {
    icon: Award,
    number: "DARPAN ID: UP/2019/0243662",
    desc: "Unique ID issued on NITI Aayog's NGO Darpan portal.",
    color: "#0891B2",
    bg: "#E6F9FC",
  },
  "Form 10AC": {
    icon: FileCheck2,
    number: "Order 12A / 80G",
    desc: "Order for registration under Section 12AB / 80G of the Income Tax Act.",
    color: "#16A34A",
    bg: "#E8F7EE",
  },
};


function getDocMeta(category: string) {
  for (const key of Object.keys(docMeta)) {
    if (category.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(category.toLowerCase())) {
      return docMeta[key];
    }
  }
  return { icon: FileText, number: "", desc: "", color: "#D97706", bg: "#FFFBEB" };
}

export default function DocumentsPage() {
  const [items, setItems] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Documents & Trust Registrations — RK MINISTRIES";
    fetchDocuments()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Preloader />;

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero
        title="Documents"
        accent="& Certifications"
        description="Official legal registrations, PAN Card, and tax exemption certificates of RK MINISTRIES — published with full transparency."
        image={heroBg}
        crumbs={[{ label: "Home", to: "/" }, { label: "Documents" }]}
      />

      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="eyebrow">Transparency &amp; Compliance</div>
            <h2 className="section-title mt-2">Official Trust Legal Documents</h2>
            <p className="mt-3 max-w-[640px] mx-auto text-text-2 text-[15px]">
              Verified certificates and identification records of RK MINISTRIES Trust. You can view or download the original documents below.
            </p>
          </div>


          {/* Documents Grid */}
          <div className="mt-12 grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {items.map((d: DocumentItem) => {
              const m = getDocMeta(d.category);
              const Icon = m.icon;
              const targetUrl = d.pdfUrl || d.image || "#";
              const isPdf = targetUrl.toLowerCase().endsWith(".pdf") || !d.image;

              return (
                <div
                  key={d._id}
                  className="card-soft card-soft-hover p-6 sm:p-7 flex flex-col rounded-2xl border border-border/80 shadow-md transition-all duration-300 hover:shadow-xl bg-white"
                >
                  {/* Visual Preview */}
                  <div className="relative rounded-xl overflow-hidden mb-5 bg-slate-50 border border-slate-100 flex items-center justify-center min-h-[220px]">
                    {d.image ? (
                      <div
                        className="group relative cursor-pointer w-full h-[230px] flex items-center justify-center p-3 bg-slate-900/5 hover:bg-slate-900/10 transition"
                        onClick={() => setPreviewImg(d.image || null)}
                      >
                        <img
                          src={d.image}
                          alt={d.title}
                          className="max-h-[200px] w-auto max-w-full object-contain rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-medium text-xs">
                          <Eye className="w-4 h-4" /> Click to Enlarge
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-[230px] bg-gradient-to-br from-amber-500/10 via-blue-500/5 to-navy/10 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 mb-3 shadow-inner">
                          <FileText className="w-8 h-8" />
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300/40">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> AANAR9870K_registration.pdf
                        </span>
                        <span className="text-[12px] text-text-2 mt-2 font-mono">{d.fileSize || "Official PDF Document"}</span>
                      </div>
                    )}
                  </div>

                  {/* Header & Meta */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm" style={{ background: m.bg }}>
                      <Icon className="w-5 h-5" style={{ color: m.color }} />
                    </div>
                    <div>
                      <h3 className="text-navy font-bold font-display text-[17px] leading-tight">{d.title}</h3>
                      <div className="mt-1 inline-block text-[11px] font-mono font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {d.documentNumber || m.number}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-text-2 text-[13px] leading-relaxed mb-6">
                    {d.description || m.desc}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-auto grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100">
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-navy font-semibold text-[13px] rounded-xl px-4 py-2.5 transition"
                    >
                      <Eye className="w-4 h-4 text-slate-600" /> View {isPdf ? "PDF" : "Image"}
                    </a>
                    <a
                      href={targetUrl}
                      download
                      className="inline-flex items-center justify-center gap-1.5 bg-orange text-white font-semibold text-[13px] rounded-xl px-4 py-2.5 hover:bg-orange-2 shadow-sm transition"
                    >
                      <Download className="w-4 h-4" /> Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Due Diligence Support Box */}
          <div className="mt-14 rounded-2xl bg-gradient-to-r from-navy to-[#153457] text-white p-7 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="inline-block text-xs font-bold tracking-widest text-amber-400 uppercase mb-1">Official Verification</span>
              <h3 className="font-display font-extrabold text-[22px]">Need certified copies for compliance or CSR?</h3>
              <p className="text-white/80 text-[14px] mt-1 max-w-xl">
                For legal inquiries, banking due-diligence, or CSR audits, write directly to RK MINISTRIES leadership.
              </p>
            </div>
            <a
              href="mailto:azaramesh@gmail.com"
              className="shrink-0 bg-gradient-to-r from-orange to-amber-500 hover:from-orange-2 hover:to-orange text-white font-bold rounded-xl px-7 py-3.5 shadow-lg transition duration-200"
            >
              Request Certified Copies
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Image Preview */}
      {previewImg && (
        <div
          className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setPreviewImg(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh] bg-white rounded-2xl overflow-hidden p-3 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={previewImg} alt="Document Preview" className="max-h-[80vh] w-auto mx-auto object-contain rounded-lg" />
            <div className="mt-3 flex justify-between items-center px-2">
              <span className="text-xs text-slate-500 font-mono">RK MINISTRIES Verified Document</span>
              <div className="flex gap-2">
                <a
                  href={previewImg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-navy inline-flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Full Tab
                </a>
                <a
                  href={previewImg}
                  download
                  className="px-3 py-1 bg-orange hover:bg-orange-2 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
                <button
                  onClick={() => setPreviewImg(null)}
                  className="px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded-lg text-xs font-semibold text-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
