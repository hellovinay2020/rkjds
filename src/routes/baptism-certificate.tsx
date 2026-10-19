import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Printer,
  Download,
  Award,
  ShieldCheck,
  Search,
  Sparkles,
  ArrowLeft,
  Share2,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { FaCross, FaDove } from "react-icons/fa6";
import { MinistryStorage, BaptismApplication } from "@/lib/ministryStorage";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

export default function BaptismCertificatePage() {
  const [searchParams] = useSearchParams();
  const certId = searchParams.get("id") || "BAP-2026-0891";
  const [certData, setCertData] = useState<BaptismApplication | null>(null);

  useEffect(() => {
    const record = MinistryStorage.findBaptism(certId);
    if (record) {
      setCertData(record);
    } else {
      const all = MinistryStorage.getBaptisms();
      setCertData(all[0] || null);
    }
  }, [certId]);

  const candidateName = certData?.name || "Rajesh Kumar";
  const fatherName = certData?.fatherName || "Ram Prasad";
  const baptismDate = certData?.baptismDate || "25 March 2026";
  const certNumber = certData?.certificateNo || `RKM-BAP-${certData?.id || "2026-0891"}`;
  const officiatingPastor = certData?.officiatingPastor || "Pastor Ramesh Kumar";

  return (
    <div className="bg-slate-100 text-slate-900 font-sans min-h-screen">
      <div className="print:hidden">
        <SiteHeader />
      </div>

      {/* Control bar */}
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-2 print:hidden flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/baptism-verify"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-amber-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>वापस सत्यापन पेज पर (Back to Verification)</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>सर्टिफिकेट प्रिंट करें (Print Certificate)</span>
          </button>
        </div>
      </div>

      {/* Certificate Container */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div
          id="certificate-print-area"
          className="relative bg-[#FFFDF9] rounded-3xl p-8 sm:p-14 shadow-2xl border-8 border-double border-amber-600/80 text-center overflow-hidden"
          style={{
            backgroundImage: "radial-gradient(#F59E0B10 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 w-16 h-16 border-t-4 border-l-4 border-amber-600 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-3 right-3 w-16 h-16 border-t-4 border-r-4 border-amber-600 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-16 h-16 border-b-4 border-l-4 border-amber-600 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-16 h-16 border-b-4 border-r-4 border-amber-600 rounded-br-xl pointer-events-none" />

          {/* Watermark Cross */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <FaCross className="w-72 h-72 text-slate-900" />
          </div>

          {/* Header */}
          <div className="relative z-10 space-y-2">
            <div className="flex items-center justify-center gap-3">
              <FaDove className="w-5 h-5 text-amber-600" />
              <FaCross className="w-6 h-6 text-amber-700" />
              <FaDove className="w-5 h-5 text-amber-600" />
            </div>

            <div className="text-xs uppercase font-bold tracking-[0.3em] text-amber-800">
              CHURCH & EVANGELICAL FELLOWSHIP
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-wide text-[#0A2540]">
              RK MINISTRIES
            </h1>

            <p className="text-xs sm:text-sm font-medium text-slate-600">
              Village - Mustafabad, Post - Gujarpar, Mubarakpur, District - Azamgarh, U.P. 276404
            </p>

            <div className="py-3">
              <div className="inline-block relative">
                <span className="text-lg sm:text-2xl font-serif font-extrabold text-amber-900 uppercase tracking-widest px-8 py-1.5 border-y-2 border-amber-700/60 bg-amber-50/50">
                  Certificate of Holy Baptism
                </span>
                <span className="block text-xs font-semibold text-amber-800 tracking-wider mt-1">
                  (पवित्र जल बपतिस्मा प्रमाण पत्र)
                </span>
              </div>
            </div>
          </div>

          {/* Scripture Verse */}
          <div className="relative z-10 max-w-xl mx-auto my-4 px-6 py-2 bg-amber-50/60 rounded-xl border border-amber-200/80">
            <p className="italic text-xs sm:text-sm text-slate-800 font-serif leading-relaxed">
              "इसलिए तुम जाकर सब जातियों के लोगों को चेला बनाओ और उन्हें पिता, और पुत्र, और पवित्र आत्मा के नाम से बपतिस्मा दो।"
            </p>
            <span className="block text-[11px] font-bold text-amber-900 mt-1 uppercase tracking-wider">
              — संत मत्ती 28:19 (Matthew 28:19)
            </span>
          </div>

          {/* Candidate Certification Body */}
          <div className="relative z-10 my-8 space-y-5 text-sm sm:text-base leading-relaxed text-slate-800">
            <p className="font-serif">
              यह प्रमाणित किया जाता है कि (This is to certify that)
            </p>

            <div className="border-b-2 border-amber-700/80 max-w-md mx-auto py-1">
              <span className="text-2xl sm:text-4xl font-extrabold text-[#0A2540] font-serif tracking-wide">
                {candidateName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700">
              आत्मज/आत्मजा (Child of): <strong className="font-semibold text-slate-900">{fatherName}</strong> | निवासी (Resident of): <strong className="font-semibold text-slate-900">मुस्तफाबाद, आज़मगढ़ (उ.प्र.)</strong>
            </p>

            <p className="max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed text-slate-700">
              ने प्रभु यीशु मसीह को अपना व्यक्तिगत उद्धारकर्ता स्वीकार करते हुए, सच्चे विश्वास और पश्चाताप के साथ जल में पवित्र बपतिस्मा ग्रहण किया।
              <br />
              <span className="italic text-slate-600 text-xs">
                Having confessed personal faith in the Lord Jesus Christ as Savior and Lord, was baptized in water according to the Holy Scriptures.
              </span>
            </p>
          </div>

          {/* Details Row: Date, Officiating Pastor, Stamp */}
          <div className="relative z-10 pt-6 mt-6 border-t border-amber-200/80 grid grid-cols-3 items-end gap-4 text-xs">
            
            {/* Date & Cert Number */}
            <div className="text-left space-y-1">
              <span className="text-slate-500 block text-[11px]">बपतिस्मा तिथि (Date):</span>
              <strong className="block text-slate-900 text-sm font-serif">{baptismDate}</strong>
              <div className="pt-2">
                <span className="text-slate-500 block text-[11px]">प्रमाण पत्र क्रमांक (Cert No):</span>
                <span className="font-mono font-bold text-amber-800 text-xs">{certNumber}</span>
              </div>
            </div>

            {/* Official Church Seal */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-dashed border-amber-700 flex flex-col items-center justify-center p-2 bg-amber-50/50 shadow-inner">
                <span className="text-[9px] font-black uppercase text-amber-900 tracking-tighter">RK MINISTRIES</span>
                <FaCross className="w-4 h-4 text-amber-700 my-1" />
                <span className="text-[8px] font-bold text-amber-800 uppercase tracking-tighter">AZAMGARH • U.P.</span>
                <span className="text-[7px] text-emerald-700 font-bold">VERIFIED</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                Official Ministry Seal
              </span>
            </div>

            {/* Chairman Signature */}
            <div className="text-right space-y-1">
              <div className="h-10 flex items-end justify-end">
                <span className="font-serif italic text-lg text-blue-950 font-bold tracking-wider">
                  Pastor Ramesh
                </span>
              </div>
              <div className="border-t border-slate-400 pt-1">
                <strong className="block text-slate-900 text-xs">{officiatingPastor}</strong>
                <span className="text-slate-500 text-[10px] block">
                  चेयरमैन एवं पादरी (Chairman & Pastor)
                </span>
                <span className="text-amber-800 text-[10px] font-bold block">
                  RK MINISTRIES, आज़मगढ़
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <SiteFooter />
      </div>
    </div>
  );
}
