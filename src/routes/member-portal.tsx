import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  CreditCard,
  Award,
  Heart,
  BookOpen,
  LogOut,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  Search,
  Check,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import { MinistryStorage, MemberRecord } from "@/lib/ministryStorage";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

export default function MemberPortalPage() {
  const [query, setQuery] = useState("");
  const [currentMember, setCurrentMember] = useState<MemberRecord | null>(() => {
    const list = MinistryStorage.getMembers();
    return list[0] || null; // default demo login
  });
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const found = MinistryStorage.findMember(query);
    if (found) {
      setCurrentMember(found);
    } else {
      setLoginError("सदस्य नहीं मिला। कृपया सही मोबाइल नंबर या मेंबर आईडी दर्ज करें।");
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <SiteHeader />

      <PageHero
        title="Member Portal"
        accent="सदस्य पोर्टल"
        description="अपने पहचान पत्र, बपतिस्मा प्रमाण पत्र, प्रार्थना निवेदन व कलीसियाई सूचनाओं का व्यक्तिगत डैशबोर्ड।"
      />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {currentMember ? (
          /* Logged In Member Dashboard */
          <div className="space-y-6">
            
            {/* Profile Greeting Header Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border-2 border-amber-500 flex items-center justify-center text-amber-800 font-bold text-2xl">
                  {currentMember.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0A2540]">
                      स्वागत है, {currentMember.name}!
                    </h2>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      सक्रिय सदस्य
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    आईडी: <strong className="font-mono text-amber-800">{currentMember.id}</strong> | गाँव: <strong>{currentMember.village}, {currentMember.district}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => setCurrentMember(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>लॉगआउट (Switch Account)</span>
                </button>
              </div>
            </div>

            {/* Quick Action Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* ID Card */}
              <Link
                to={`/id-card?id=${currentMember.id}`}
                className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-amber-400 transition space-y-3"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:scale-110 transition">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0A2540]">पहचान पत्र (ID Card)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">डिजिटल कार्ड देखें व प्रिंट करें</p>
                </div>
              </Link>

              {/* Baptism Certificate */}
              <Link
                to={`/baptism-verify?id=${currentMember.id}`}
                className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-amber-400 transition space-y-3"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center group-hover:scale-110 transition">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0A2540]">बपतिस्मा स्थिति (Baptism)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {currentMember.isBaptized ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                        <span>बपतिस्मा सत्यापित</span>
                        <Check className="w-3 h-3 text-emerald-600" />
                      </span>
                    ) : (
                      "आवेदन करें"
                    )}
                  </p>
                </div>
              </Link>

              {/* Prayer Request */}
              <Link
                to="/prayer-request"
                className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-amber-400 transition space-y-3"
              >
                <div className="w-11 h-11 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center group-hover:scale-110 transition">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0A2540]">प्रार्थना निवेदन (Prayer)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">कलीसिया से प्रार्थना कराएं</p>
                </div>
              </Link>

              {/* Holy Bible */}
              <Link
                to="/bible"
                className="group bg-white p-5 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-amber-400 transition space-y-3"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0A2540]">पवित्र बाइबिल (Bible)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">दैनिक वचन व अध्याय पाठ</p>
                </div>
              </Link>
            </div>

            {/* Member Details & Service Schedule */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Member Details Card */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-4">
                <h3 className="font-bold text-base text-[#0A2540] border-b border-slate-200 pb-2">
                  व्यक्तिगत विवरण (Member Profile)
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">पूरा नाम:</span>
                    <strong className="text-slate-800">{currentMember.name}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">पिता का नाम:</span>
                    <span className="text-slate-800 font-semibold">{currentMember.fatherName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">मोबाइल:</span>
                    <span className="text-slate-800 font-semibold">{currentMember.mobile}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">ईमेल:</span>
                    <span className="text-slate-800 font-semibold">{currentMember.email || "N/A"}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">निवास स्थान:</span>
                    <span className="text-slate-800 font-semibold">
                      {currentMember.village}, {currentMember.post}, {currentMember.policeStation}, {currentMember.district}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">कलीसियाई दायित्व:</span>
                    <span className="text-amber-800 font-bold">{currentMember.role}</span>
                  </div>
                </div>
              </div>

              {/* Service Timings Card */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-4">
                <h3 className="font-bold text-base text-[#0A2540] border-b border-slate-200 pb-2 flex items-center justify-between">
                  <span>कलीसिया सभा समय (Church Timings)</span>
                  <Calendar className="w-4 h-4 text-amber-600" />
                </h3>
                <div className="space-y-3">
                  {MINISTRY_CONFIG.serviceTimings.map((st) => (
                    <div key={st.day} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <strong className="block text-slate-900">{st.nameHindi}</strong>
                        <span className="text-slate-500 text-[11px]">{st.name} ({st.day})</span>
                      </div>
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold rounded-lg text-[11px]">
                        {st.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Login Form */
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-xl border border-slate-200/80 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center mx-auto">
                <User className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-[#0A2540]">सदस्य लॉगिन (Member Login)</h2>
              <p className="text-xs text-slate-500">
                अपना मोबाइल नंबर या सदस्य आईडी (Member ID) दर्ज करें।
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  मोबाइल नंबर / मेम्बर आईडी (Mobile or Member ID)
                </label>
                <input
                  type="text"
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="उदा. 9415314486 या RKM-2026-1001"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition"
              >
                पोर्टल में प्रवेश करें (Login)
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-500">अभी तक सदस्य नहीं बने हैं? </span>
              <Link to="/member-registration" className="text-xs font-bold text-amber-700 hover:underline">
                यहाँ नया पंजीकरण करें →
              </Link>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
