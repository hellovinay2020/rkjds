import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Printer,
  CreditCard,
  Search,
  Award,
  QrCode,
  Phone,
  User,
  CheckCircle2,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import { FaCross } from "react-icons/fa6";
import { MinistryStorage, MemberRecord } from "@/lib/ministryStorage";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

type VerifyTab = "idcard" | "certificate";

export default function MembershipIdCardPage() {
  const [searchParams] = useSearchParams();

  // Active tab: "idcard" or "certificate"
  const initialTab: VerifyTab =
    (searchParams.get("tab") as VerifyTab) || "idcard";
  const [activeTab, setActiveTab] = useState<VerifyTab>(initialTab);

  // Form input states
  const [idCardNo, setIdCardNo] = useState(searchParams.get("id") || "");
  const [mobileNo, setMobileNo] = useState(searchParams.get("mobile") || "");

  // Search result states - do NOT show dummy data on initial load
  const [searched, setSearched] = useState(false);
  const [memberResult, setMemberResult] = useState<MemberRecord | null>(null);

  // Auto-search only if URL params are explicitly provided
  useEffect(() => {
    const paramId = searchParams.get("id");
    const paramMobile = searchParams.get("mobile");
    const paramTab = searchParams.get("tab") as VerifyTab;

    if (paramTab === "certificate") {
      setActiveTab("certificate");
    }

    if (paramId || paramMobile) {
      if (paramId) setIdCardNo(paramId);
      if (paramMobile) setMobileNo(paramMobile);
      performSearch(paramId || "", paramMobile || "");
    }
  }, []);

  const performSearch = (idQuery: string, phoneQuery: string) => {
    setSearched(true);
    const cleanId = idQuery.trim().toLowerCase();
    const cleanPhone = phoneQuery.trim().replace(/\D/g, "");

    if (!cleanId && !cleanPhone) {
      setMemberResult(null);
      return;
    }

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
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idCardNo.trim() && !mobileNo.trim()) return;
    performSearch(idCardNo, mobileNo);
  };

  const switchTab = (tab: VerifyTab) => {
    setActiveTab(tab);
    setSearched(false);
    setMemberResult(null);
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <div className="print:hidden">
        <SiteHeader />
        <PageHero
          title="Membership Verification"
          accent="सदस्यता पहचान पत्र एवं प्रमाण पत्र सत्यापन"
          description="आरके मिनिस्ट्रीज आधिकारिक सदस्यता पहचान पत्र (ID Card) एवं कलीसियाई सदस्यता प्रमाण पत्र (Certificate) का ऑनलाइन सत्यापन करें।"
        />
      </div>

      <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        {/* Main Verification Box with 2 Tabs (Exact styling matching baptism-verify) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 -mt-16 relative z-10 print:hidden">
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

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* ID Card / Member ID Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {activeTab === "idcard"
                    ? "ID कार्ड नंबर (ID Card No.)"
                    : "सदस्यता आईडी / प्रमाण पत्र संख्या"}
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
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    placeholder="उदा. 9415314486"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>
                {activeTab === "idcard"
                  ? "ID कार्ड सत्यापित करें (Verify ID Card)"
                  : "प्रमाण पत्र सत्यापित करें (Verify Certificate)"}
              </span>
            </button>
          </form>
        </div>

        {/* Verification Result - ONLY rendered when searched is true */}
        {searched && (
          <div>
            {memberResult ? (
              <div className="space-y-6">
                
                {/* Official Verification Header Ribbon */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm print:hidden">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-emerald-950 text-base">
                          {activeTab === "idcard"
                            ? "पहचान पत्र आधिकारिक सत्यापित (ID Card Verified)"
                            : "सदस्यता प्रमाण पत्र सत्यापित (Certificate Verified)"}
                        </span>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <p className="text-xs text-emerald-800">
                        यह रिकॉर्ड आरके मिनिस्ट्रीज (आजमगढ़, उ.प्र.) के आधिकारिक सदस्यता रजिस्टर में दर्ज व सक्रिय है।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
                    >
                      <Printer className="w-4 h-4" />
                      <span>प्रिंट (Print)</span>
                    </button>
                    <Link
                      to="/member-registration"
                      className="px-3.5 py-2 rounded-xl border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-xs transition"
                    >
                      + नया सदस्य
                    </Link>
                  </div>
                </div>

                {/* ID Card View (Front and Back) */}
                {activeTab === "idcard" && (
                  <div className="grid md:grid-cols-2 gap-8 justify-items-center pt-2">
                    {/* ID CARD FRONT */}
                    <div
                      className="w-[340px] sm:w-[370px] h-[550px] rounded-3xl shadow-2xl overflow-hidden relative border-4 border-amber-500/80 bg-white flex flex-col justify-between"
                      style={{
                        boxShadow: "0 20px 40px -15px rgba(10, 37, 64, 0.35)",
                      }}
                    >
                      {/* Top Header */}
                      <div className="bg-gradient-to-r from-[#07172C] via-[#0A2540] to-[#143D69] text-white p-4 text-center relative border-b-2 border-amber-400">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <FaCross className="w-4 h-4 text-amber-400" />
                          <span className="font-extrabold text-base tracking-wider uppercase font-display">
                            RK MINISTRIES
                          </span>
                        </div>
                        <p className="text-[9.5px] text-amber-300 uppercase tracking-widest font-semibold">
                          CHURCH & EVANGELICAL FELLOWSHIP
                        </p>
                        <p className="text-[8.5px] text-slate-300 mt-0.5">
                          Mustafabad, Mubarakpur, Azamgarh (U.P.) 276404
                        </p>
                      </div>

                      {/* Photo & Role Section */}
                      <div className="text-center px-4 pt-3 flex-1 flex flex-col items-center justify-center space-y-2.5">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-2xl border-4 border-amber-500 shadow-md bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                            <User className="w-14 h-14 text-slate-400" />
                          </div>
                          <span className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2.5 py-0.5 bg-emerald-600 text-white text-[8px] font-extrabold uppercase rounded-full tracking-wider border border-white">
                            ACTIVE MEMBER
                          </span>
                        </div>

                        <div>
                          <h2 className="text-lg font-black text-[#0A2540] tracking-wide">
                            {memberResult.name}
                          </h2>
                          {memberResult.nameHindi && (
                            <p className="text-xs font-semibold text-slate-600">
                              {memberResult.nameHindi}
                            </p>
                          )}
                          <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            {memberResult.role}
                          </span>
                        </div>

                        {/* Member Details Table */}
                        <div className="w-full bg-slate-50/90 rounded-2xl p-3 border border-slate-200 text-left text-xs space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-slate-500 text-[11px]">सदस्यता आईडी (ID):</span>
                            <strong className="font-mono text-amber-800 text-[12px]">{memberResult.id}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 text-[11px]">पिता का नाम:</span>
                            <span className="font-semibold text-slate-800">{memberResult.fatherName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 text-[11px]">मोबाइल:</span>
                            <span className="font-semibold text-slate-800">{memberResult.mobile}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 text-[11px]">गाँव / क्षेत्र:</span>
                            <span className="font-semibold text-slate-800">{memberResult.village}, {memberResult.district}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 text-[11px]">जारी तिथि:</span>
                            <span className="font-semibold text-slate-800">{memberResult.joinDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Front Footer */}
                      <div className="bg-[#0A2540] text-amber-300 px-4 py-2 text-center text-[9px] font-bold tracking-wider uppercase border-t border-amber-400/30">
                        MEMBERSHIP IDENTITY CARD • आधिकारिक पहचान पत्र
                      </div>
                    </div>

                    {/* ID CARD BACK */}
                    <div
                      className="w-[340px] sm:w-[370px] h-[550px] rounded-3xl shadow-2xl overflow-hidden relative border-4 border-slate-300 bg-white flex flex-col justify-between"
                      style={{
                        boxShadow: "0 20px 40px -15px rgba(10, 37, 64, 0.35)",
                      }}
                    >
                      {/* Top Bar */}
                      <div className="bg-[#0A2540] text-white p-3 text-center border-b border-amber-400">
                        <span className="text-xs font-bold tracking-wider uppercase text-amber-300">
                          TERMS & CONTACT INFORMATION
                        </span>
                      </div>

                      {/* Scripture Verse */}
                      <div className="p-4 text-center space-y-3 flex-1 flex flex-col justify-between">
                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                          <p className="text-[11px] font-serif italic text-amber-950 leading-relaxed">
                            "दाखलता मैं हूँ, तुम डालियां हो; जो मुझ में रहता है और मैं उस में, वह बहुत फल फलता है।"
                          </p>
                          <span className="block text-[9px] font-bold text-amber-800 mt-1 uppercase">
                            — यूहन्ना 15:5 (John 15:5)
                          </span>
                        </div>

                        {/* QR Code and Verification */}
                        <div className="flex flex-col items-center space-y-1">
                          <div className="p-2 border-2 border-slate-800 rounded-xl bg-white shadow-sm">
                            <QrCode className="w-20 h-20 text-[#0A2540]" />
                          </div>
                          <span className="text-[9px] text-slate-500 font-mono">
                            SCAN TO VERIFY: {memberResult.id}
                          </span>
                        </div>

                        {/* Address & Emergency Contact */}
                        <div className="text-[11px] text-slate-700 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-left">
                          <p className="font-bold text-[#0A2540]">कलीसिया कार्यालय पता:</p>
                          <p className="text-[10px] leading-tight text-slate-600">
                            {MINISTRY_CONFIG.address}
                          </p>
                          <p className="pt-1 text-[10px]">
                            <strong>हेल्पलाइन:</strong> {MINISTRY_CONFIG.phone} | {MINISTRY_CONFIG.email}
                          </p>
                        </div>

                        {/* Signature */}
                        <div className="pt-1 flex items-end justify-between px-2">
                          <div className="text-left text-[9px] text-slate-500">
                            <span>Card Valid: LIFETIME</span>
                          </div>
                          <div className="text-right">
                            <span className="font-serif italic text-xs font-bold text-blue-900 block">
                              Pastor Ramesh
                            </span>
                            <span className="text-[9px] font-bold border-t border-slate-400 pt-0.5 block text-slate-800">
                              अधिकृत हस्ताक्षर (Authorized Signatory)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Footer */}
                      <div className="bg-slate-100 text-slate-500 px-4 py-2 text-center text-[8.5px]">
                        यह कार्ड RK MINISTRIES की सम्पत्ति है। मिलने पर कृपया उपरोक्त पते पर लौटाएं।
                      </div>
                    </div>
                  </div>
                )}

                {/* Certificate View */}
                {activeTab === "certificate" && (
                  <div className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-14 shadow-2xl border-8 border-double border-amber-600/80 text-center relative overflow-hidden space-y-6">
                    <div className="flex items-center justify-center gap-2 text-amber-700">
                      <FaCross className="w-5 h-5 text-amber-600" />
                      <span className="text-xs uppercase tracking-[0.25em] font-bold">
                        RK MINISTRIES • AZAMGARH
                      </span>
                      <FaCross className="w-5 h-5 text-amber-600" />
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#0A2540]">
                      Certificate of Church Membership
                    </h2>
                    <p className="text-xs text-amber-800 font-bold uppercase tracking-widest">
                      कलीसियाई सदस्यता प्रमाण पत्र
                    </p>

                    <div className="max-w-lg mx-auto py-2">
                      <p className="text-sm font-serif text-slate-700">
                        प्रमाणित किया जाता है कि (This certifies that)
                      </p>
                      <div className="border-b-2 border-amber-700 py-1 my-2">
                        <span className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] font-serif">
                          {memberResult.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        सदस्यता आईडी: <strong className="font-mono text-amber-800">{memberResult.id}</strong> | निवासी: <strong>{memberResult.village}, {memberResult.district}</strong>
                      </p>
                    </div>

                    <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
                      आरके मिनिस्ट्रीज (आजमगढ़, उत्तर प्रदेश) के एक निष्ठावान एवं अधिकृत सदस्य हैं। प्रभु इनके जीवन को अपनी सेवा, आत्मिक आशीषों और शांति से परिपूर्ण रखें।
                    </p>

                    <div className="pt-8 border-t border-amber-300 grid grid-cols-2 items-end gap-6 text-xs">
                      <div className="text-left space-y-1">
                        <span className="text-slate-500 block">पंजीकरण तिथि: {memberResult.joinDate}</span>
                        <span className="font-bold text-amber-900 block">स्थान: मुस्तफाबाद, आज़मगढ़</span>
                      </div>
                      <div className="text-right space-y-1">
                        <span className="font-serif italic text-base font-bold text-blue-950 block">
                          Pastor Ramesh
                        </span>
                        <span className="border-t border-slate-400 pt-1 font-bold text-slate-900 block">
                          चेयरमैन (Chairman / Pastor)
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Not Found Error Box (Exact matching baptism-verify) */
              <div className="bg-white rounded-3xl p-8 text-center shadow-md border border-slate-200 space-y-4">
                <XCircle className="w-12 h-12 text-red-500 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">कोई सदस्यता रिकॉर्ड नहीं मिला</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  दर्ज की गई ID कार्ड संख्या <strong>"{idCardNo || "—"}"</strong> अथवा मोबाइल नंबर{" "}
                  <strong>"{mobileNo || "—"}"</strong> से कोई सदस्यता रिकॉर्ड नहीं मिला। कृपया पुनः जांच करें।
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
      </main>

      <div className="print:hidden">
        <SiteFooter />
      </div>
    </div>
  );
}
