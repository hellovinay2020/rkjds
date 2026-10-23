import { useEffect, useState } from "react";
import { Download, Shield, Award, FileCheck2, Building2, FileText, Landmark, Eye, CheckCircle2, type LucideIcon } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import heroBg from "@/assets/breadcrume/breadcrume-logo.png";
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
    number: "Reg. No.: 45/2026",
    desc: "Trust Registration and 12A/80G order certification under the Income Tax Act.",
    color: "#0F766E",
    bg: "#E6F7F4",
  },
  "NGO Darpan": {
    icon: Award,
    number: "DARPAN ID: UP/2026/1218239",
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
    document.title = "Documents & Trust Registrations — RKV MINISTRIES";
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
        description="Official legal registrations, PAN Card, and tax exemption certificates of RKV MINISTRIES — published with full transparency."
        image={heroBg}
        crumbs={[{ label: "Home", to: "/" }, { label: "Documents" }]}
      />

      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="eyebrow">Transparency &amp; Compliance</div>
            <h2 className="section-title mt-2">Official Trust Legal Documents</h2>
            <p className="mt-3 max-w-[640px] mx-auto text-text-2 text-[15px]">
              Verified certificates and identification records of RKV MINISTRIES Trust. You can view or download the original documents below.
            </p>
          </div>

          {/* Documents Grid - in a single row */}
          <div
            className={`mt-12 grid gap-6 sm:gap-7 ${
              items.length <= 1
                ? "max-w-md mx-auto grid-cols-1"
                : items.length === 2
                ? "max-w-3xl mx-auto grid-cols-1 md:grid-cols-2"
                : items.length === 3
                ? "max-w-6xl mx-auto grid-cols-1 md:grid-cols-3"
                : "max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }`}
          >
            {items.map((d: DocumentItem) => {
              const m = getDocMeta(d.category);
              const Icon = m.icon;
              const targetUrl = d.pdfUrl || d.image || "#";
              const isPdf = targetUrl.toLowerCase().endsWith(".pdf") || !d.image;

              return (
                <div
                  key={d._id}
                  className="card-soft card-soft-hover p-5 sm:p-6 flex flex-col rounded-2xl border border-border/80 shadow-md transition-all duration-300 hover:shadow-xl bg-white h-full"
                >
                  {/* Visual Preview */}
                  <div className="relative rounded-xl overflow-hidden mb-4 bg-slate-50 border border-slate-100 flex items-center justify-center h-[190px]">
                    {d.image ? (
                      <div
                        className="group relative cursor-pointer w-full h-full flex items-center justify-center p-3 bg-slate-900/5 hover:bg-slate-900/10 transition"
                        onClick={() => setPreviewImg(d.image || null)}
                      >
                        <img
                          src={d.image}
                          alt={d.title}
                          className="max-h-[165px] w-auto max-w-full object-contain rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white font-medium text-xs">
                          <Eye className="w-4 h-4" /> Click to Enlarge
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-500/10 via-blue-500/5 to-navy/10 flex flex-col items-center justify-center p-4 text-center">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 mb-2 shadow-inner">
                          <FileText className="w-6 h-6" />
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300/40 max-w-[90%] truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="truncate">{d.pdfUrl ? d.pdfUrl.split("/").pop() : d.title}</span>
                        </span>
                        <span className="text-[12px] text-text-2 mt-1.5 font-mono">{d.fileSize || "Official PDF Document"}</span>
                      </div>
                    )}
                  </div>

                  {/* Header & Meta */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm" style={{ background: m.bg }}>
                      <Icon className="w-5 h-5" style={{ color: m.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-navy font-bold font-display text-[16px] leading-snug line-clamp-2">{d.title}</h3>
                      {d.documentNumber || m.number ? (
                        <div className="mt-1 inline-block text-[11px] font-mono font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 truncate max-w-full">
                          {d.documentNumber || m.number}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-text-2 text-[13px] leading-relaxed mb-5 line-clamp-3 flex-1">
                    {d.description || m.desc}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-auto grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-navy font-semibold text-[13px] rounded-xl px-3 py-2.5 transition"
                    >
                      <Eye className="w-4 h-4 text-slate-600" /> View {isPdf ? "PDF" : "Image"}
                    </a>
                    <a
                      href={targetUrl}
                      download
                      className="inline-flex items-center justify-center gap-1.5 bg-orange text-white font-semibold text-[13px] rounded-xl px-3 py-2.5 hover:bg-orange-2 shadow-sm transition"
                    >
                      <Download className="w-4 h-4" /> Download
                    </a>
                  </div>
                </div>
              );
            })}
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
