import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Award,
  Heart,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Printer,
  Download,
  AlertCircle,
  Sparkles,
  MapPin,
  TrendingUp,
  UserCheck,
  BarChart3,
  Database,
  Check,
  CreditCard,
} from "lucide-react";
import { FaCross, FaDove, FaHandsPraying } from "react-icons/fa6";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { MinistryStorage, BaptismApplication, PrayerRequest, MemberRecord } from "@/lib/ministryStorage";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

export default function ChairmanDashboardPage() {
  const [members, setMembers] = useState<MemberRecord[]>(() => MinistryStorage.getMembers());
  const [baptisms, setBaptisms] = useState<BaptismApplication[]>(() => MinistryStorage.getBaptisms());
  const [prayers, setPrayers] = useState<PrayerRequest[]>(() => MinistryStorage.getPrayers());
  const [activeTab, setActiveTab] = useState<"baptisms" | "members" | "prayers">("baptisms");

  const pendingBaptisms = baptisms.filter(b => b.status === "Pending");
  const approvedBaptisms = baptisms.filter(b => b.status === "Approved" || b.status === "Certificate Issued");

  const handleApproveBaptism = (id: string) => {
    MinistryStorage.updateBaptismStatus(id, "Certificate Issued", "Approved by Chairman Pastor Ramesh Kumar");
    setBaptisms(MinistryStorage.getBaptisms());
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <SiteHeader />

      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#07172C] via-[#0A2540] to-[#143D69] text-white py-12 px-4 border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><FaCross className="w-3.5 h-3.5 text-amber-400" /> चेयरमैन डैशबोर्ड (Executive Dashboard)</span>
              <span>•</span>
              <span>RK MINISTRIES</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-display tracking-tight">
              चेयरमैन डैशबोर्ड — पास्टर रमेश कुमार
            </h1>
            <p className="text-slate-300 text-xs md:text-sm">
              कलीसियाई संचालन, बपतिस्मा आवेदन स्वीकृति, सदस्य रिकॉर्ड एवं मध्यस्थता प्रार्थना नियंत्रण कक्ष।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/reports"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition flex items-center gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5 text-amber-300" />
              <span>सांख्यिकी रिपोर्ट (Reports)</span>
            </Link>
            <Link
              to="/local-backup"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition flex items-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5" />
              <span>डेटा बैकअप (Backup)</span>
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* KPI Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">कुल पंजीकृत सदस्य</span>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A2540]">{members.length}</div>
            <span className="text-[11px] text-emerald-600 font-semibold">आजमगढ़ व आसपास के गाँव</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">लंबित बपतिस्मा आवेदन</span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-600">{pendingBaptisms.length}</div>
            <span className="text-[11px] text-amber-700 font-semibold">स्वीकृति हेतु प्रतीक्षारत</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">सत्यापित बपतिस्मा</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">{approvedBaptisms.length}</div>
            <span className="text-[11px] text-slate-500">प्रमाण पत्र जारी</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">प्रार्थना विषय</span>
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-600">{prayers.length}</div>
            <span className="text-[11px] text-slate-500">मध्यस्थता प्रार्थना में शामिल</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab("baptisms")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTab === "baptisms"
                ? "bg-[#0A2540] text-white shadow"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <FaDove className="w-3.5 h-3.5 text-amber-400" />
            <span>बपतिस्मा आवेदन स्वीकृति ({baptisms.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("members")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTab === "members"
                ? "bg-[#0A2540] text-white shadow"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>कलीसियाई सदस्य सूची ({members.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("prayers")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              activeTab === "prayers"
                ? "bg-[#0A2540] text-white shadow"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <FaHandsPraying className="w-3.5 h-3.5 text-rose-400" />
            <span>प्रार्थना सूची ({prayers.length})</span>
          </button>
        </div>

        {/* Tab 1: Baptism Applications Table & Approval Desk */}
        {activeTab === "baptisms" && (
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#0A2540]">
                बपतिस्मा आवेदन एवं गवाह सत्यापन (Baptism Verification & Approval Queue)
              </h3>
              <Link
                to="/baptism-application"
                className="text-xs font-bold text-amber-700 hover:underline"
              >
                + नया आवेदन भरें
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[11px]">
                    <th className="p-3">ID / आवेदन क्रमांक</th>
                    <th className="p-3">आवेदक का नाम</th>
                    <th className="p-3">मोबाइल</th>
                    <th className="p-3">गाँव / क्षेत्र</th>
                    <th className="p-3">गवाह १ (Witness 1)</th>
                    <th className="p-3">गवाह २ (Witness 2)</th>
                    <th className="p-3">स्थिति (Status)</th>
                    <th className="p-3 text-right">कार्यवाही (Actions)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {baptisms.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3 font-mono font-bold text-amber-800">{b.id}</td>
                      <td className="p-3 font-semibold text-slate-900">{b.name}</td>
                      <td className="p-3 text-slate-600">{b.mobile}</td>
                      <td className="p-3 text-slate-600">{b.village || b.address}</td>
                      <td className="p-3 text-slate-600">
                        {b.witness1?.name ? `${b.witness1.name} (${b.witness1.relation || "Elder"})` : "—"}
                      </td>
                      <td className="p-3 text-slate-600">
                        {b.witness2?.name ? `${b.witness2.name} (${b.witness2.relation || "Member"})` : "—"}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === "Certificate Issued"
                            ? "bg-emerald-100 text-emerald-800"
                            : b.status === "Approved"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                        {b.status !== "Certificate Issued" && (
                          <button
                            onClick={() => handleApproveBaptism(b.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition shadow-sm inline-flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            <span>बपतिस्मा स्वीकृत करें</span>
                          </button>
                        )}
                        <Link
                          to={`/baptism-certificate?id=${b.id}`}
                          className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[11px] transition inline-flex items-center gap-1"
                        >
                          <Award className="w-3 h-3 text-amber-700" />
                          <span>प्रमाण पत्र</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Members List */}
        {activeTab === "members" && (
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#0A2540]">
                कलीसिया सदस्य रजिस्टर (Church Member Registry)
              </h3>
              <Link
                to="/member-registration"
                className="text-xs font-bold text-amber-700 hover:underline"
              >
                + नया सदस्य जोड़ें
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[11px]">
                    <th className="p-3">सदस्य आईडी</th>
                    <th className="p-3">नाम</th>
                    <th className="p-3">पिता का नाम</th>
                    <th className="p-3">मोबाइल</th>
                    <th className="p-3">गाँव / पोस्ट</th>
                    <th className="p-3">पद / भूमिका</th>
                    <th className="p-3">बपतिस्मा</th>
                    <th className="p-3 text-right">पहचान पत्र</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {members.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3 font-mono font-bold text-amber-800">{m.id}</td>
                      <td className="p-3 font-semibold text-slate-900">{m.name}</td>
                      <td className="p-3 text-slate-600">{m.fatherName}</td>
                      <td className="p-3 text-slate-600">{m.mobile}</td>
                      <td className="p-3 text-slate-600">{m.village}, {m.post}</td>
                      <td className="p-3 text-slate-800 font-medium">{m.role}</td>
                      <td className="p-3">
                        {m.isBaptized ? (
                          <span className="text-emerald-700 font-bold inline-flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>हाँ (Baptized)</span>
                          </span>
                        ) : (
                          <span className="text-amber-700 font-semibold">इच्छुक (Pending)</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <Link
                          to={`/id-card?id=${m.id}`}
                          className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] transition inline-flex items-center gap-1"
                        >
                          <CreditCard className="w-3 h-3" />
                          <span>ID Card</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Prayer Requests */}
        {activeTab === "prayers" && (
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-4">
            <h3 className="font-bold text-base text-[#0A2540]">
              चेयरमैन मध्यस्थता प्रार्थना सूची (Intercessory Prayer Requests)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {prayers.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-sm font-bold text-slate-900">{p.name}</strong>
                      <span className="text-slate-500 block">{p.mobile} • {p.address}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-bold rounded-full text-[10px]">
                      {p.subject}
                    </span>
                  </div>
                  <p className="text-slate-700 italic bg-white p-2.5 rounded-xl border border-slate-200">
                    "{p.details}"
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                    <span>तारीख: {p.date}</span>
                    <span className="text-emerald-700 font-bold inline-flex items-center gap-1">
                      <span>मध्यस्थता प्रार्थना में दर्ज</span>
                      <Check className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
