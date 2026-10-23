import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  CreditCard,
  Award,
  Phone,
  Printer,
  Calendar,
  User,
  MapPin,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import { FaDove, FaCross } from "react-icons/fa6";
import { MinistryStorage, MemberRecord, BaptismApplication } from "@/lib/ministryStorage";

type VerifyTab = "idcard" | "certificate";

export default function BaptismVerifyPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab state: "idcard" or "certificate"
  const initialTab: VerifyTab =
    (searchParams.get("tab") as VerifyTab) ||
    (searchParams.get("id")?.toUpperCase().startsWith("BAP") ? "certificate" : "idcard");

  const [activeTab, setActiveTab] = useState<VerifyTab>(initialTab);

  // ID Card form fields
  const [idCardNo, setIdCardNo] = useState(
    activeTab === "idcard" ? searchParams.get("id") || "" : ""
  );
  const [idMobileNo, setIdMobileNo] = useState(searchParams.get("mobile") || "");

  // Certificate form fields
  const [certNo, setCertNo] = useState(
    activeTab === "certificate" ? searchParams.get("id") || "" : ""
  );
  const [certMobileNo, setCertMobileNo] = useState(
    activeTab === "certificate" ? searchParams.get("mobile") || "" : ""
  );

  // Search results
  const [searched, setSearched] = useState(false);
  const [memberResult, setMemberResult] = useState<MemberRecord | null>(null);
  const [baptismResult, setBaptismResult] = useState<BaptismApplication | null>(null);

  // Auto-search if URL params present on load
  useEffect(() => {
    const paramId = searchParams.get("id");
    const paramMobile = searchParams.get("mobile");
    const paramTab = searchParams.get("tab");

    if (paramId || paramMobile) {
      if (paramTab === "certificate" || paramId?.toUpperCase().startsWith("BAP")) {
        setActiveTab("certificate");
        if (paramId) setCertNo(paramId);
        if (paramMobile) setCertMobileNo(paramMobile);
        verifyCertificate(paramId || "", paramMobile || "");
      } else {
        setActiveTab("idcard");
        if (paramId) setIdCardNo(paramId);
        if (paramMobile) setIdMobileNo(paramMobile);
        verifyIdCard(paramId || "", paramMobile || "");
      }
    }
  }, []);

  // Verification Logic for ID Card
  const verifyIdCard = (cardQuery: string, phoneQuery: string) => {
    setSearched(true);
    const cleanId = cardQuery.trim().toLowerCase();
    const cleanPhone = phoneQuery.trim().replace(/\D/g, "");

    const members = MinistryStorage.getMembers();
    const found = members.find((m) => {
      const matchId = !cleanId || m.id.toLowerCase() === cleanId;
      const matchPhone = !cleanPhone || m.mobile.replace(/\D/g, "") === cleanPhone;

      if (cleanId && cleanPhone) {
        return matchId && matchPhone;
      }
      return cleanId ? matchId : matchPhone;
    });

    setMemberResult(found || null);
    setBaptismResult(null);
  };

  // Verification Logic for Certificate
  const verifyCertificate = (cQuery: string, phoneQuery: string) => {
    setSearched(true);
    const cleanCert = cQuery.trim().toLowerCase();
    const cleanPhone = phoneQuery.trim().replace(/\D/g, "");

    const baptisms = MinistryStorage.getBaptisms();
    const found = baptisms.find((b) => {
      const matchCert =
        !cleanCert ||
        b.id.toLowerCase() === cleanCert ||
        (b.certificateNo && b.certificateNo.toLowerCase() === cleanCert) ||
        b.name.toLowerCase().includes(cleanCert);

      const matchPhone = !cleanPhone || b.mobile.replace(/\D/g, "") === cleanPhone;

      if (cleanCert && cleanPhone) {
        return matchCert && matchPhone;
      }
      return cleanCert ? matchCert : matchPhone;
    });

    setBaptismResult(found || null);
    setMemberResult(null);
  };

  const handleIdSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCardNo.trim() && !idMobileNo.trim()) return;
    verifyIdCard(idCardNo, idMobileNo);
  };

  const handleCertSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certNo.trim() && !certMobileNo.trim()) return;
    verifyCertificate(certNo, certMobileNo);
  };

  const switchTab = (tab: VerifyTab) => {
    setActiveTab(tab);
    setSearched(false);
    setMemberResult(null);
    setBaptismResult(null);
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <SiteHeader />

      <PageHero
        title="Verification Portal"
        accent="सत्यापन पोर्टल"
        description="आरके मिनिस्ट्रीज आधिकारिक सदस्यता पहचान पत्र (ID Card) एवं पवित्र जल बपतिस्मा प्रमाण पत्र (Certificate) का ऑनलाइन सत्यापन करें।"
      />

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        {/* Main Verification Box with 2 Tabs */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 -mt-16 relative z-10">
          {/* Tab Switcher Buttons */}
          <div className="flex p-1.5 bg-slate-100/90 rounded-2xl mb-6 border border-slate-200">
            <button
              type="button"
              onClick={() => switchTab("idcard")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "idcard"
                  ? "bg-amber-500 text-slate-950 shadow-md font-extrabold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>ID Card (पहचान पत्र)</span>
            </button>

            <button
              type="button"
              onClick={() => switchTab("certificate")}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "certificate"
                  ? "bg-amber-500 text-slate-950 shadow-md font-extrabold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Certificate (प्रमाण पत्र)</span>
            </button>
          </div>

          {/* Tab 1: ID Card Search Form */}
          {activeTab === "idcard" && (
            <form onSubmit={handleIdSearch} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* ID Card No Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    ID कार्ड नंबर (ID Card No.)
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={idCardNo}
                      onChange={(e) => setIdCardNo(e.target.value)}
                      placeholder="उदा. RKM-2026-1001"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                    />
                  </div>
                </div>

                {/* Mobile No Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    मोबाइल नंबर (Mobile No.)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      value={idMobileNo}
                      onChange={(e) => setIdMobileNo(e.target.value)}
                      placeholder="उदा. 9415314486"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition shadow-md flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>ID कार्ड सत्यापित करें (Verify ID Card)</span>
              </button>
            </form>
          )}

          {/* Tab 2: Certificate Search Form */}
          {activeTab === "certificate" && (
            <form onSubmit={handleCertSearch} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Certificate No Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    सर्टिफिकेट नंबर / आवेदन संख्या (Cert / App No.)
                  </label>
                  <div className="relative">
                    <Award className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={certNo}
                      onChange={(e) => setCertNo(e.target.value)}
                      placeholder="उदा. BAP-2026-0891"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                    />
                  </div>
                </div>

                {/* Mobile No Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    मोबाइल नंबर (Mobile No.)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      value={certMobileNo}
                      onChange={(e) => setCertMobileNo(e.target.value)}
                      placeholder="उदा. 9838112233"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition shadow-md flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>प्रमाण पत्र सत्यापित करें (Verify Certificate)</span>
              </button>
            </form>
          )}
        </div>

        {/* Verification Result - ID Card */}
        {searched && activeTab === "idcard" && (
          <div>
            {memberResult ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
                {/* Official Verification Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-emerald-950 text-base">
                          पहचान पत्र आधिकारिक सत्यापित (ID Card Verified)
                        </span>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <p className="text-xs text-emerald-800">
                        यह पहचान पत्र आरके मिनिस्ट्रीज (आजमगढ़, उ.प्र.) के आधिकारिक सदस्यता रजिस्टर में दर्ज है।
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase self-start sm:self-center bg-emerald-600 text-white shadow-sm">
                    {memberResult.status} Member
                  </span>
                </div>

                {/* Member Details Grid */}
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">सदस्य का नाम (Member Name):</span>
                    <strong className="text-base text-slate-900">
                      {memberResult.name} {memberResult.nameHindi && `(${memberResult.nameHindi})`}
                    </strong>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">सदस्यता आईडी (Member ID No):</span>
                    <strong className="text-base font-mono text-amber-700">{memberResult.id}</strong>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">मोबाइल नंबर (Mobile No):</span>
                    <span className="font-semibold text-slate-800">{memberResult.mobile}</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">पद / दायित्व (Role / Designation):</span>
                    <span className="font-semibold text-slate-800">{memberResult.role}</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">पिता का नाम (Father's Name):</span>
                    <span className="font-semibold text-slate-800">{memberResult.fatherName}</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">जुड़ने की तिथि (Joining Date):</span>
                    <span className="font-semibold text-slate-800">{memberResult.joinDate}</span>
                  </div>

                  <div className="sm:col-span-2 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">पता / क्षेत्र (Address / Location):</span>
                    <span className="font-semibold text-slate-800">
                      {memberResult.village}, {memberResult.district}, {memberResult.state} ({memberResult.pincode})
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
                  <Link
                    to={`/id-card?id=${memberResult.id}`}
                    className="flex-1 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm text-center shadow transition flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>डिजिटल ID कार्ड देखें व डाउनलोड करें (View ID Card)</span>
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
              /* ID Card Not Found */
              <div className="bg-white rounded-3xl p-8 text-center shadow-md border border-slate-200 space-y-4">
                <XCircle className="w-12 h-12 text-red-500 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">कोई ID कार्ड रिकॉर्ड नहीं मिला</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  दर्ज की गई ID कार्ड संख्या <strong>"{idCardNo || "—"}"</strong> अथवा मोबाइल नंबर{" "}
                  <strong>"{idMobileNo || "—"}"</strong> से कोई सदस्यता रिकॉर्ड नहीं मिला। कृपया पुनः जांच करें।
                </p>
                <div className="pt-2">
                  <Link
                    to="/member-registration"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition"
                  >
                    <User className="w-4 h-4" />
                    <span>नया सदस्यता पंजीकरण करें</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Verification Result - Certificate */}
        {searched && activeTab === "certificate" && (
          <div>
            {baptismResult ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
                {/* Official Verification Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-emerald-950 text-base">
                          बपतिस्मा प्रमाण पत्र सत्यापित (Certificate Verified)
                        </span>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <p className="text-xs text-emerald-800">
                        यह बपतिस्मा प्रमाण पत्र आरके मिनिस्ट्रीज (आजमगढ़, उ.प्र.) के आधिकारिक रजिस्टर में दर्ज है।
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase self-start sm:self-center shadow-sm ${
                      baptismResult.status === "Certificate Issued"
                        ? "bg-emerald-600 text-white"
                        : baptismResult.status === "Approved"
                        ? "bg-blue-600 text-white"
                        : "bg-amber-500 text-slate-950"
                    }`}
                  >
                    {baptismResult.status}
                  </span>
                </div>

                {/* Candidate Photo & Basic Details Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  {baptismResult.photoUrl ? (
                    <img
                      src={baptismResult.photoUrl}
                      alt={baptismResult.name}
                      className="w-20 h-24 object-cover rounded-xl border-2 border-amber-400 shadow-sm shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-24 rounded-xl bg-amber-100 text-amber-700 flex flex-col items-center justify-center shrink-0 border border-amber-300">
                      <User className="w-8 h-8" />
                      <span className="text-[10px] font-bold mt-1">CANDIDATE</span>
                    </div>
                  )}
                  <div className="text-center sm:text-left flex-1 min-w-0">
                    <span className="text-xs text-slate-500 font-medium block">बपतिस्मा अभ्यर्थी (Candidate Name):</span>
                    <strong className="text-xl font-bold text-slate-900">{baptismResult.name}</strong>
                    <div className="mt-1 flex flex-wrap gap-2 justify-center sm:justify-start">
                      <span className="inline-block text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-lg border border-amber-200">
                        {baptismResult.certificateNo || baptismResult.id}
                      </span>
                      {baptismResult.applicationDate && (
                        <span className="inline-block text-xs text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                          आवेदन: {baptismResult.applicationDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Candidate Info Grid */}
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">पिता का नाम (Father's Name):</span>
                    <span className="font-semibold text-slate-800">{baptismResult.fatherName}</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">माता का नाम (Mother's Name):</span>
                    <span className="font-semibold text-slate-800">{baptismResult.motherName}</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">माता का नाम (Mother's Name):</span>
                    <span className="font-semibold text-slate-800">{baptismResult.motherName}</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">बपतिस्मा तिथि (Date of Baptism):</span>
                    <span className="font-semibold text-slate-800">
                      {baptismResult.baptismDate || "Scheduled during upcoming service"}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">बपतिस्मा दाता पादरी (Officiating Pastor):</span>
                    <span className="font-semibold text-slate-800">
                      {baptismResult.officiatingPastor || "Pastor Ramesh Kumar"}
                    </span>
                  </div>

                  <div className="sm:col-span-2 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs text-slate-500 block">पता / क्षेत्र (Location / Village):</span>
                    <span className="font-semibold text-slate-800">
                      {baptismResult.village}, {baptismResult.district} (U.P.)
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
                      <strong className="block text-amber-900">गवाह १: {baptismResult.witness1?.name}</strong>
                      <span className="text-slate-600 block">पद: {baptismResult.witness1?.relation}</span>
                      <span className="text-slate-500 block">मो.: {baptismResult.witness1?.mobile}</span>
                    </div>
                    <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                      <strong className="block text-amber-900">गवाह २: {baptismResult.witness2?.name}</strong>
                      <span className="text-slate-600 block">पद: {baptismResult.witness2?.relation}</span>
                      <span className="text-slate-500 block">मो.: {baptismResult.witness2?.mobile}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow transition flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>प्रमाण पत्र रिकॉर्ड प्रिंट करें (Print Certificate Record)</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Certificate Not Found */
              <div className="bg-white rounded-3xl p-8 text-center shadow-md border border-slate-200 space-y-4">
                <XCircle className="w-12 h-12 text-red-500 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">कोई प्रमाण पत्र रिकॉर्ड नहीं मिला</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  दर्ज की गई संख्या <strong>"{certNo || "—"}"</strong> अथवा मोबाइल नंबर{" "}
                  <strong>"{certMobileNo || "—"}"</strong> से कोई बपतिस्मा प्रमाण पत्र नहीं मिला।
                </p>
                <div className="pt-2">
                  <Link
                    to="/baptism-application"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition"
                  >
                    <FaDove className="w-4 h-4" />
                    <span>बपतिस्मा के लिए नया आवेदन करें</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      <SiteFooter />
    </div>
  );
}

