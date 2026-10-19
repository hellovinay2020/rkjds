import { useEffect, useState } from "react";
import { Download, Shield, Award, FileCheck2, Building2, FileText, Landmark, type LucideIcon } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import heroBg from "@/assets/herosection/NariSashaktikaran.png";
import { fetchDocuments, type DocumentItem } from "@/data/documents";

const docMeta: Record<string, { icon: LucideIcon; number: string; desc: string; color: string; bg: string }> = {
  "NGO Darpan": { icon: Award, number: "DARPAN ID: UP/2019/0243662", desc: "Unique ID issued on NITI Aayog's NGO Darpan portal.", color: "#0891B2", bg: "#E6F9FC" },
  "Form 10AC": { icon: FileCheck2, number: "Form 10AC", desc: "Order for registration under Section 12AB / 80G of the Income Tax Act.", color: "#16A34A", bg: "#E8F7EE" },
  "Annexure": { icon: FileText, number: "Annexure J", desc: "Supporting annexure document for registration.", color: "#2563EB", bg: "#E6EEFB" },
  "Registration": { icon: Building2, number: "CSR No: CSR00050218", desc: "Registered under the Societies Registration Act, 1860.", color: "#0F766E", bg: "#E6F7F4" },
  "Guidance": { icon: Landmark, number: "URN: AAJAM8783GE20213", desc: "Guidance document for society registration procedures.", color: "#0B1F3A", bg: "#E8EAED" },
};

const complianceDetails = [
  ["CSR No", "CSR00050218"],
  ["Udyam Registration", "UDYM-UP-27-0005064"],
  ["PAN", "AAJAM8783G"],
  ["DARPAN ID", "UP/2019/0243662"],
  ["DIN No", "AAJAM8783GE2021301"],
  ["URN No", "AAJAM8783GE20213"],
  ["GSTIN", "09AAIJAM8783G2ZW"],
];

function getDocMeta(category: string) {
  for (const key of Object.keys(docMeta)) {
    if (category.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(category.toLowerCase())) {
      return docMeta[key];
    }
  }
  return { icon: FileText, number: "", desc: "", color: "#FF6B00", bg: "#FFF1E5" };
}

export default function DocumentsPage() {
  useEffect(() => { document.title = "Documents & Trust Registrations — RK MINISTRIES"; }, []);

  const [items, setItems] = useState<DocumentItem[]>([]);

  useEffect(() => {
    fetchDocuments().then(setItems);
  }, []);

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero
        title="Documents"
        accent="& Certifications"
        description="Our legal registrations, tax exemption certificates, and annual reports — published in the spirit of full transparency."
        image={heroBg}
        crumbs={[{ label: "Home", to: "/" }, { label: "Documents" }]}
      />
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="eyebrow">Transparency &amp; Compliance</div>
            <h2 className="section-title mt-2">Our Legal Documents</h2>
            <p className="mt-3 max-w-[640px] mx-auto text-text-2 text-[15px]">All our registrations and certificates are listed below. Click to download or request a copy.</p>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {complianceDetails.map(([label, value]) => (
              <div key={label} className="rounded-[10px] border border-border bg-white px-4 py-3">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-text-2">{label}</div>
                <div className="mt-1 break-all text-[13px] font-mono font-semibold text-navy">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((d: DocumentItem) => {
              const m = getDocMeta(d.category);
              const Icon = m.icon;
              const downloadUrl = d.pdfUrl || d.image;
              return (
                <div key={d._id} className="card-soft card-soft-hover p-6 flex flex-col">
                  <div className="rounded-[12px] overflow-hidden mb-4 bg-gray-100">
                    {d.image ? (
                      <img src={d.image} alt={d.title} className="w-full h-auto object-cover" loading="lazy" />
                    ) : (
                      <div className="h-[180px] bg-gradient-to-br from-orange/10 to-navy/10 flex items-center justify-center">
                        <FileText className="w-14 h-14 text-orange" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: m.bg }}>
                      <Icon className="w-5 h-5" style={{ color: m.color }} />
                    </div>
                    <div>
                      <h3 className="text-navy font-bold font-display text-[16px]">{d.title}</h3>
                      <div className="text-[11px] font-mono text-text-2">{m.number || d.category}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-text-2 text-[13px] leading-relaxed">{m.desc || d.title}</p>
                  <a href={downloadUrl} download className="mt-auto inline-flex items-center justify-center gap-2 bg-orange/10 text-orange font-semibold text-[13px] rounded-[10px] px-4 py-2.5 hover:bg-orange hover:text-white transition w-full">
                    <Download className="w-4 h-4" /> Download
                  </a>
                </div>
              );
            })}
          </div>
          <div className="mt-12 rounded-[18px] bg-navy text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-extrabold text-[20px]">Need a verified copy?</h3>
              <p className="text-white/80 text-[14px] mt-1">Write to us and our team will share certified documents for CSR / partnership due-diligence.</p>
            </div>
            <a href="mailto:azaramesh@gmail.com" className="bg-orange text-white font-bold rounded-[12px] px-6 py-3">Request Documents</a>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
