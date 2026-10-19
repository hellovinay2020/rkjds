import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Calendar,
  User,
  MapPin,
  Award,
  Printer,
  Sparkles,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { FaDove } from "react-icons/fa6";
import { MinistryStorage, BaptismApplication } from "@/lib/ministryStorage";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

export default function BaptismVerifyPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("id") || "");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<BaptismApplication | null>(null);

  useEffect(() => {
    const initialId = searchParams.get("id");
    if (initialId) {
      handleSearchWith(initialId);
    }
  }, [searchParams]);

  const handleSearchWith = (q: string) => {
    setQuery(q);
    setSearched(true);
    const found = MinistryStorage.findBaptism(q);
    setResult(found || null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    handleSearchWith(query);
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#07172C] via-[#0A2540] to-[#143D69] text-white py-14 px-4 border-b border-amber-500/20">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-amber-400" /> प्रमाण पत्र सत्यापन</span>
            <span>•</span>
            <span>Baptism Verification Portal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display">
            बपतिस्मा सत्यापन एवं रिकॉर्ड <span className="text-amber-400">RK MINISTRIES</span>
          </h1>
          <p className="text-slate-200 text-sm max-w-xl mx-auto">
            सर्टिफिकेट नंबर, आवेदन आईडी या मोबाइल नंबर दर्ज कर बपतिस्मा रिकॉर्ड की आधिकारिक पुष्टि करें।
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="max-w-lg mx-auto pt-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="उदा. BAP-2026-0891 या 9598059289"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition shadow-lg shrink-0"
            >
              खोजें (Search)
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        {searched && (
          <div>
            {result ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
                
                {/* Official Verification Header Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-emerald-950 text-base">
                          आधिकारिक रिकॉर्ड सत्यापित (Officially Verified)
                        </span>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <p className="text-xs text-emerald-800">
                        यह रिकॉर्ड आरके मिनिस्ट्रीज (आजमगढ़, उ.प्र.) के आधिकारिक रजिस्टर में दर्ज है।
                      </p>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase self-start sm:self-center ${
                    result.status === "Certificate Issued"
                      ? "bg-emerald-600 text-white"
                      : result.status === "Approved"
                      ? "bg-blue-600 text-white"
                      : "bg-amber-500 text-slate-950"
                  }`}>
                    {result.status}
                  </span>
                </div>

                {/* Candidate Info Grid */}
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">बपतिस्मा अभ्यर्थी (Candidate Name):</span>
                    <strong className="text-base text-slate-900">{result.name}</strong>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">सर्टिफिकेट नंबर (Certificate No):</span>
                    <strong className="text-base font-mono text-amber-700">
                      {result.certificateNo || result.id}
                    </strong>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">पिता का नाम (Father's Name):</span>
                    <span className="font-semibold text-slate-800">{result.fatherName}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">माता का नाम (Mother's Name):</span>
                    <span className="font-semibold text-slate-800">{result.motherName}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">बपतिस्मा तिथि (Date of Baptism):</span>
                    <span className="font-semibold text-slate-800">
                      {result.baptismDate || "Scheduled during upcoming service"}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">बपतिस्मा दाता पादरी (Officiating Pastor):</span>
                    <span className="font-semibold text-slate-800">
                      {result.officiatingPastor || "Pastor Ramesh Kumar"}
                    </span>
                  </div>

                  <div className="sm:col-span-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">पता / क्षेत्र (Location / Village):</span>
                    <span className="font-semibold text-slate-800">
                      {result.village}, {result.district} (U.P. 276404)
                    </span>
                  </div>
                </div>

                {/* Witness & Verification Notes */}
                <div className="border-t border-slate-200 pt-4 space-y-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    साक्षी / गवाह पुष्टि (Witness Records)
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                      <strong className="block text-amber-900">गवाह १: {result.witness1?.name}</strong>
                      <span className="text-slate-600 block">पद: {result.witness1?.relation}</span>
                      <span className="text-slate-500 block">मो.: {result.witness1?.mobile}</span>
                    </div>
                    <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                      <strong className="block text-amber-900">गवाह २: {result.witness2?.name}</strong>
                      <span className="text-slate-600 block">पद: {result.witness2?.relation}</span>
                      <span className="text-slate-500 block">मो.: {result.witness2?.mobile}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
                  <Link
                    to={`/baptism-certificate?id=${result.id}`}
                    className="flex-1 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm text-center shadow transition flex items-center justify-center gap-2"
                  >
                    <Award className="w-4 h-4" />
                    <span>बपतिस्मा प्रमाण पत्र देखें (View Certificate)</span>
                  </Link>

                  <button
                    onClick={() => window.print()}
                    className="py-3 px-5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>प्रिंट (Print)</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Not Found */
              <div className="bg-white rounded-3xl p-8 text-center shadow-md border border-slate-200 space-y-4">
                <XCircle className="w-12 h-12 text-red-500 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">कोई रिकॉर्ड नहीं मिला (No Record Found)</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  दर्ज की गई आईडी या मोबाइल नंबर <strong>"{query}"</strong> से कोई बपतिस्मा रिकॉर्ड नहीं मिला। कृपया नंबर की जांच करें अथवा नया आवेदन भरें।
                </p>
                <div className="pt-2">
                  <Link
                    to="/baptism-application"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition"
                  >
                    <FaDove className="w-4 h-4" />
                    <span>बपतिस्मा के लिए आवेदन करें</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Sample Search Pill Buttons */}
        {!searched && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-800">
              त्वरित डेमो खोज (Quick Sample Records to Verify):
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSearchWith("BAP-2026-0891")}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-800 text-xs font-mono font-semibold transition"
              >
                BAP-2026-0891 (Rajesh Kumar)
              </button>
              <button
                onClick={() => handleSearchWith("9598059289")}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-800 text-xs font-mono font-semibold transition"
              >
                9598059289 (Pastor / Chairman)
              </button>
              <button
                onClick={() => handleSearchWith("BAP-2026-0892")}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-800 text-xs font-mono font-semibold transition"
              >
                BAP-2026-0892 (Sunita Kumari)
              </button>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
