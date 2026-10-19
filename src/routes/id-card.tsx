import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Printer,
  Download,
  CreditCard,
  Search,
  Award,
  QrCode,
  ShieldCheck,
  MapPin,
  Phone,
  User,
  Sparkles,
  Calendar,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MinistryLogo from "@/components/MinistryLogo";
import { FaCross } from "react-icons/fa6";
import { MinistryStorage, MemberRecord } from "@/lib/ministryStorage";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

export default function MembershipIdCardPage() {
  const [searchParams] = useSearchParams();
  const [searchId, setSearchId] = useState(searchParams.get("id") || "RKM-2026-1001");
  const [member, setMember] = useState<MemberRecord | null>(null);
  const [viewType, setViewType] = useState<"idcard" | "certificate">("idcard");

  useEffect(() => {
    const found = MinistryStorage.findMember(searchId);
    if (found) {
      setMember(found);
    } else {
      const all = MinistryStorage.getMembers();
      setMember(all[0] || null);
    }
  }, [searchId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = MinistryStorage.findMember(searchId);
    setMember(found || null);
  };

  return (
    <div className="bg-slate-100 text-slate-900 font-sans min-h-screen">
      <div className="print:hidden">
        <SiteHeader />
      </div>

      {/* Control & Search Bar */}
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-4 print:hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-700 text-xs font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5 text-amber-600" /> सदस्यता पहचान पत्र</span>
              <span>•</span>
              <span>Membership ID Card & Certificate</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] mt-1 font-display">
              सदस्यता पहचान पत्र व प्रमाण पत्र
            </h1>
          </div>

          {/* Toggle View */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-300 shadow-sm">
            <button
              onClick={() => setViewType("idcard")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewType === "idcard" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>ID Card (कार्ड)</span>
            </button>
            <button
              onClick={() => setViewType("certificate")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewType === "certificate" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Certificate (प्रमाण पत्र)</span>
            </button>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto flex-1">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="ID नंबर दर्ज करें (उदा. RKM-2026-1001 या 9598059289)"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shrink-0 transition"
            >
              सर्च (Search)
            </button>
          </form>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>प्रिंट (Print Card)</span>
            </button>
            <Link
              to="/member-registration"
              className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition"
            >
              + नया पंजीकरण
            </Link>
          </div>
        </div>
      </div>

      {/* Main Display Area */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {member ? (
          viewType === "idcard" ? (
            /* ID CARD: Front and Back Layout */
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8 justify-items-center">
                
                {/* ID CARD FRONT */}
                <div
                  className="w-[340px] sm:w-[370px] h-[540px] rounded-3xl shadow-2xl overflow-hidden relative border-4 border-amber-500/80 bg-white flex flex-col justify-between"
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
                  <div className="text-center px-4 pt-4 flex-1 flex flex-col items-center justify-center space-y-3">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl border-4 border-amber-500 shadow-md bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
                        <User className="w-14 h-14 text-slate-400" />
                      </div>
                      <span className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2 py-0.5 bg-emerald-600 text-white text-[8px] font-bold uppercase rounded-full tracking-wider border border-white">
                        ACTIVE MEMBER
                      </span>
                    </div>

                    <div>
                      <h2 className="text-lg font-black text-[#0A2540] tracking-wide">
                        {member.name}
                      </h2>
                      {member.nameHindi && (
                        <p className="text-xs font-semibold text-slate-600">
                          {member.nameHindi}
                        </p>
                      )}
                      <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        {member.role}
                      </span>
                    </div>

                    {/* Member Details Table */}
                    <div className="w-full bg-slate-50/90 rounded-2xl p-3 border border-slate-200 text-left text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-500 text-[11px]">सदस्य आईडी (ID):</span>
                        <strong className="font-mono text-amber-800 text-[12px]">{member.id}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 text-[11px]">पिता का नाम:</span>
                        <span className="font-semibold text-slate-800">{member.fatherName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 text-[11px]">मोबाइल:</span>
                        <span className="font-semibold text-slate-800">{member.mobile}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 text-[11px]">गाँव / क्षेत्र:</span>
                        <span className="font-semibold text-slate-800">{member.village}, {member.district}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 text-[11px]">जारी तिथि:</span>
                        <span className="font-semibold text-slate-800">{member.joinDate}</span>
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
                  className="w-[340px] sm:w-[370px] h-[540px] rounded-3xl shadow-2xl overflow-hidden relative border-4 border-slate-300 bg-white flex flex-col justify-between"
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
                        SCAN TO VERIFY: {member.id}
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
                    <div className="pt-2 flex items-end justify-between px-2">
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
            </div>
          ) : (
            /* CERTIFICATE VIEW */
            <div
              className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-14 shadow-2xl border-8 border-double border-amber-600/80 text-center relative overflow-hidden space-y-6"
            >
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
                    {member.name}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  सदस्य आईडी: <strong className="font-mono text-amber-800">{member.id}</strong> | निवासी: <strong>{member.village}, {member.district}</strong>
                </p>
              </div>

              <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
                आरके मिनिस्ट्रीज (आजमगढ़, उत्तर प्रदेश) के एक निष्ठावान एवं अधिकृत सदस्य हैं। प्रभु इनके जीवन को अपनी सेवा, आत्मिक आशीषों और शांति से परिपूर्ण रखें।
              </p>

              <div className="pt-8 border-t border-amber-300 grid grid-cols-2 items-end gap-6 text-xs">
                <div className="text-left space-y-1">
                  <span className="text-slate-500 block">पंजीकरण तिथि: {member.joinDate}</span>
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
          )
        ) : (
          <div className="bg-white p-8 rounded-3xl text-center space-y-4 shadow">
            <h3 className="font-bold text-slate-800">सदस्य नहीं मिला</h3>
            <p className="text-xs text-slate-500">कृपया सही आईडी या फोन नंबर दर्ज करें।</p>
          </div>
        )}
      </main>

      <div className="print:hidden">
        <SiteFooter />
      </div>
    </div>
  );
}
