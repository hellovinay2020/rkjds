import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  Send,
  Heart,
  CheckCircle2,
  MapPin,
  Phone,
  FileCheck2,
  Users,
  Sparkles,
  Zap,
} from "lucide-react";
import { FaDove, FaHandsPraying } from "react-icons/fa6";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { MinistryStorage, MemberRecord, BaptismApplication } from "@/lib/ministryStorage";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

export default function FieldWorkerPortalPage() {
  const [activeTab, setActiveTab] = useState<"register" | "baptism" | "prayer">("register");
  
  // Quick Member Form
  const [memberForm, setMemberForm] = useState({
    name: "",
    mobile: "",
    fatherName: "",
    village: "Mustafabad",
    district: "Azamgarh",
    role: "Believer / विश्वासी" as MemberRecord["role"],
  });
  const [memberSaved, setMemberSaved] = useState<MemberRecord | null>(null);

  // Quick Prayer Form
  const [prayerForm, setPrayerForm] = useState({
    name: "",
    mobile: "",
    address: "Mustafabad",
    subject: "Healing / चंगाई",
    details: "",
  });
  const [prayerSaved, setPrayerSaved] = useState(false);

  const handleMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = MinistryStorage.saveMember({
      name: memberForm.name,
      mobile: memberForm.mobile,
      email: "",
      fatherName: memberForm.fatherName,
      gender: "Male",
      dob: "1995-01-01",
      village: memberForm.village,
      post: "Gujarpar",
      policeStation: "Mubarakpur",
      district: memberForm.district,
      state: "Uttar Pradesh",
      pincode: "276404",
      status: "Active",
      role: memberForm.role,
      isBaptized: false,
    });
    setMemberSaved(created);
    setMemberForm({
      name: "",
      mobile: "",
      fatherName: "",
      village: "Mustafabad",
      district: "Azamgarh",
      role: "Believer / विश्वासी",
    });
  };

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    MinistryStorage.savePrayer({
      name: prayerForm.name,
      mobile: prayerForm.mobile,
      address: prayerForm.address,
      subject: prayerForm.subject as any,
      details: prayerForm.details,
      isUrgent: false,
      isPublic: true,
    });
    setPrayerSaved(true);
    setPrayerForm({
      name: "",
      mobile: "",
      address: "Mustafabad",
      subject: "Healing / चंगाई",
      details: "",
    });
    setTimeout(() => setPrayerSaved(false), 3000);
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#07172C] via-[#0A2540] to-[#143D69] text-white py-12 px-4 border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-amber-300" /> रिटेलर / फील्ड वर्कर पोर्टल (Field Worker Portal)</span>
            <span>•</span>
            <span>RK MINISTRIES</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-display tracking-tight">
            ग्राम स्तरीय फील्ड वर्कर सेवा पोर्टल
          </h1>
          <p className="text-slate-200 text-xs md:text-sm max-w-xl mx-auto">
            गाँव में मौके पर नया सदस्य जोड़ें, प्रार्थना विषय दर्ज करें और बपतिस्मा आवेदन सबमिट करें।
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        
        {/* Action Toggle Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-sm max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === "register" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>त्वरित सदस्य नामांकन</span>
          </button>

          <button
            onClick={() => setActiveTab("prayer")}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === "prayer" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>प्रार्थना दर्ज करें</span>
          </button>

          <Link
            to="/baptism-application"
            className="py-2 px-4 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition flex items-center gap-1.5"
          >
            <FaDove className="w-3.5 h-3.5 text-amber-600" />
            <span>बपतिस्मा फॉर्म →</span>
          </Link>
        </div>

        {/* Tab 1: Quick Member Registration */}
        {activeTab === "register" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-5">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-[#0A2540] flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>फील्ड से तुरंत सदस्य जोड़ें (Instant Village Registration)</span>
              </h3>
              <p className="text-xs text-slate-500">
                फील्ड वर्कर द्वारा मौके पर तुरंत सदस्य आईडी जारी करने हेतु यह फॉर्म भरें।
              </p>
            </div>

            {memberSaved && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs sm:text-sm text-emerald-950">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <strong>सदस्य सफलतापूर्वक पंजीकृत! आईडी: {memberSaved.id}</strong>
                    <span className="block text-emerald-800 text-xs">{memberSaved.name} • {memberSaved.village}</span>
                  </div>
                </div>
                <Link
                  to={`/id-card?id=${memberSaved.id}`}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs"
                >
                  आईडी कार्ड देखें
                </Link>
              </div>
            )}

            <form onSubmit={handleMemberSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">सदस्य का नाम *</label>
                  <input
                    type="text"
                    required
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    placeholder="नाम लिखें"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">मोबाइल नंबर *</label>
                  <input
                    type="tel"
                    required
                    value={memberForm.mobile}
                    onChange={(e) => setMemberForm({ ...memberForm, mobile: e.target.value })}
                    placeholder="Mobile Number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">पिता का नाम *</label>
                  <input
                    type="text"
                    required
                    value={memberForm.fatherName}
                    onChange={(e) => setMemberForm({ ...memberForm, fatherName: e.target.value })}
                    placeholder="Father Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">गाँव का नाम *</label>
                  <input
                    type="text"
                    required
                    value={memberForm.village}
                    onChange={(e) => setMemberForm({ ...memberForm, village: e.target.value })}
                    placeholder="उदा. Mustafabad"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>सदस्य जोड़ें व आईडी जनरेट करें</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Quick Prayer Intake */}
        {activeTab === "prayer" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-5">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-[#0A2540] flex items-center gap-2">
                <FaHandsPraying className="w-4 h-4 text-rose-500" />
                <span>गाँव में प्रार्थना निवेदन दर्ज करें</span>
              </h3>
              <p className="text-xs text-slate-500">
                विश्वासी या जरूरतमंद का प्रार्थना विषय सीधे कलीसिया प्रार्थना सूची में दर्ज करें।
              </p>
            </div>

            {prayerSaved && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>प्रार्थना विषय सफलतापूर्वक कलीसिया मध्यस्थता सूची में जुड़ गया!</span>
              </div>
            )}

            <form onSubmit={handlePrayerSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">नाम *</label>
                  <input
                    type="text"
                    required
                    value={prayerForm.name}
                    onChange={(e) => setPrayerForm({ ...prayerForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">मोबाइल *</label>
                  <input
                    type="tel"
                    required
                    value={prayerForm.mobile}
                    onChange={(e) => setPrayerForm({ ...prayerForm, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">गाँव / स्थान</label>
                  <input
                    type="text"
                    value={prayerForm.address}
                    onChange={(e) => setPrayerForm({ ...prayerForm, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">विषय</label>
                  <select
                    value={prayerForm.subject}
                    onChange={(e) => setPrayerForm({ ...prayerForm, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    <option value="Healing / चंगाई">चंगाई (Healing)</option>
                    <option value="Family / परिवार">परिवार (Family)</option>
                    <option value="Deliverance / छुटकारा">छुटकारा (Deliverance)</option>
                    <option value="Financial / आर्थिक">आर्थिक (Financial)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">प्रार्थना विवरण *</label>
                <textarea
                  required
                  rows={3}
                  value={prayerForm.details}
                  onChange={(e) => setPrayerForm({ ...prayerForm, details: e.target.value })}
                  placeholder="प्रार्थना विषय लिखें..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition"
              >
                प्रार्थना सबमिट करें
              </button>
            </form>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
