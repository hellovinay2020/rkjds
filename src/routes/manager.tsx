import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  Printer,
  Calendar,
  PhoneCall,
  MapPin,
  ShieldCheck,
  Send,
  UserPlus,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { MinistryStorage, MemberRecord, BaptismApplication, FieldWorker } from "@/lib/ministryStorage";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

export default function ManagerDashboardPage() {
  const [workers] = useState<FieldWorker[]>(() => MinistryStorage.getWorkers());
  const [members] = useState<MemberRecord[]>(() => MinistryStorage.getMembers());
  const [baptisms] = useState<BaptismApplication[]>(() => MinistryStorage.getBaptisms());
  const [notificationSent, setNotificationSent] = useState(false);

  const handleBroadcastAlert = () => {
    setNotificationSent(true);
    setTimeout(() => setNotificationSent(false), 3000);
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#07172C] via-[#0A2540] to-[#143D69] text-white py-12 px-4 border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-amber-400" /> मैनेजर डैशबोर्ड (Operations Manager)</span>
              <span>•</span>
              <span>RK MINISTRIES</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-display tracking-tight">
              कलीसिया संचालन एवं फील्ड वर्कर प्रबंधन
            </h1>
            <p className="text-slate-300 text-xs md:text-sm">
              ग्राम स्तर पर कार्यकर्ताओं की निगरानी, बपतिस्मा सत्यापन एवं सभाओं का संचालन।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBroadcastAlert}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>रविवार सभा सूचना भेजें (Broadcast)</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {notificationSent && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>रविवार आराधना सूचना सभी फील्ड कार्यकर्ताओं एवं सदस्यों को सफलतापूर्वक प्रेषित की गई!</span>
          </div>
        )}

        {/* Operational Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">सक्रिय फील्ड वर्कर (Field Workers)</span>
            <div className="text-3xl font-black text-[#0A2540]">{workers.length}</div>
            <span className="text-xs text-slate-600">मुस्तफाबाद, मुबारकपुर, आज़मगढ़</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">सत्यापन हेतु लंबित आवेदन</span>
            <div className="text-3xl font-black text-amber-600">
              {baptisms.filter(b => b.status === "Pending").length}
            </div>
            <span className="text-xs text-slate-600">दस्तावेज व गवाह जांच प्रक्रियाधीन</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">इस माह कुल नए सदस्य</span>
            <div className="text-3xl font-black text-emerald-600">{members.length}</div>
            <span className="text-xs text-slate-600">पहचान पत्र जनरेट किए गए</span>
          </div>
        </div>

        {/* Field Workers Table */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-bold text-base text-[#0A2540]">
                फील्ड वर्कर / रिटेलर सूची (Field Workers & Retailers)
              </h3>
              <p className="text-xs text-slate-500">गाँव-गाँव में प्रचार एवं सदस्यता कार्य करने वाले कार्यकर्ता</p>
            </div>
            <Link
              to="/field-worker"
              className="text-xs font-bold text-amber-700 hover:underline"
            >
              फील्ड वर्कर पोर्टल खोलें →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 uppercase text-[11px] font-semibold">
                  <th className="p-3">वर्कर आईडी</th>
                  <th className="p-3">कार्यकर्ता का नाम</th>
                  <th className="p-3">मोबाइल नंबर</th>
                  <th className="p-3">कार्यक्षेत्र (Assigned Area)</th>
                  <th className="p-3">नामांकित सदस्य</th>
                  <th className="p-3">बपतिस्मा संदर्भ</th>
                  <th className="p-3">स्थिति</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {workers.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 font-mono font-bold text-amber-800">{w.id}</td>
                    <td className="p-3 font-semibold text-slate-900">{w.name}</td>
                    <td className="p-3 text-slate-600">{w.mobile}</td>
                    <td className="p-3 text-slate-800 font-medium">{w.area}</td>
                    <td className="p-3 font-bold text-blue-900">{w.totalMembersEnrolled} सदस्य</td>
                    <td className="p-3 font-bold text-amber-800">{w.totalBaptismsReferred} बपतिस्मा</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {w.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Operations Links */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            to="/member-registration"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-amber-400 transition space-y-2"
          >
            <UserPlus className="w-6 h-6 text-amber-600" />
            <h4 className="font-bold text-sm text-[#0A2540]">नया सदस्य पंजीकरण फार्म</h4>
            <p className="text-xs text-slate-500">कार्यालय स्तर पर नया सदस्य जोड़ें</p>
          </Link>

          <Link
            to="/id-card"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-amber-400 transition space-y-2"
          >
            <Printer className="w-6 h-6 text-blue-600" />
            <h4 className="font-bold text-sm text-[#0A2540]">बैच आईडी कार्ड प्रिंट</h4>
            <p className="text-xs text-slate-500">कार्ड व प्रमाण पत्र प्रिंटिंग डेस्क</p>
          </Link>

          <Link
            to="/local-backup"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-amber-400 transition space-y-2"
          >
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-sm text-[#0A2540]">स्थानीय डेटा बैकअप</h4>
            <p className="text-xs text-slate-500">ऑफलाइन डेटा सुरक्षित रखें</p>
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
