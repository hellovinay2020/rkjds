import { useState } from "react";
import {
  HardDrive,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Database,
  ShieldCheck,
  FileCode,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { MinistryStorage } from "@/lib/ministryStorage";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

export default function LocalDataBackupPage() {
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // 1. Export JSON Backup
  const handleExportJSON = () => {
    const json = MinistryStorage.exportFullBackup();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStr = new Date().toISOString().split("T")[0];
    link.href = url;
    link.download = `RK_MINISTRIES_Backup_${dateStr}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatusMessage({ text: "डेटा बैकअप (JSON) सफलतापूर्वक आपके कंप्यूटर/मोबाइल पर डाउनलोड हो गया!", type: "success" });
  };

  // 2. Export Members CSV
  const handleExportMembersCSV = () => {
    const members = MinistryStorage.getMembers();
    const headers = ["ID", "Name", "Hindi Name", "Mobile", "Email", "Father Name", "Village", "Post", "District", "Role", "Baptized", "Join Date"];
    const rows = members.map(m => [
      m.id,
      `"${m.name}"`,
      `"${m.nameHindi || ""}"`,
      m.mobile,
      m.email || "",
      `"${m.fatherName}"`,
      `"${m.village}"`,
      `"${m.post}"`,
      `"${m.district}"`,
      `"${m.role}"`,
      m.isBaptized ? "Yes" : "No",
      m.joinDate,
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `RK_MINISTRIES_Members_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setStatusMessage({ text: "सदस्य सूची (Excel CSV) सफलतापूर्वक डाउनलोड हो गई!", type: "success" });
  };

  // 3. Export Baptism Records CSV
  const handleExportBaptismsCSV = () => {
    const baptisms = MinistryStorage.getBaptisms();
    const headers = ["ID", "Name", "Mobile", "Father Name", "Mother Name", "Village", "Witness 1", "Witness 2", "Status", "Baptism Date", "Cert No"];
    const rows = baptisms.map(b => [
      b.id,
      `"${b.name}"`,
      b.mobile,
      `"${b.fatherName}"`,
      `"${b.motherName}"`,
      `"${b.village}"`,
      `"${b.witness1?.name || ""}"`,
      `"${b.witness2?.name || ""}"`,
      b.status,
      b.baptismDate || "",
      b.certificateNo || "",
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `RK_MINISTRIES_Baptisms_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setStatusMessage({ text: "बपतिस्मा रिकॉर्ड (Excel CSV) सफलतापूर्वक डाउनलोड हो गया!", type: "success" });
  };

  // 4. Restore from JSON
  const handleFileRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = MinistryStorage.importFullBackup(content);
      if (success) {
        setStatusMessage({ text: "बैकअप फाइल सफलतापूर्वक रिस्टोर (Restore) कर ली गई है!", type: "success" });
      } else {
        setStatusMessage({ text: "अमान्य बैकअप फाइल। कृपया सही RK MINISTRIES बैकअप फाइल चुनें।", type: "error" });
      }
    };
    reader.readAsText(file);
  };

  // 5. Reset to defaults
  const handleReset = () => {
    if (window.confirm("क्या आप वाकई सभी डेमो रिकॉर्ड को रीसेट करना चाहते हैं?")) {
      MinistryStorage.resetToDefaults();
      setStatusMessage({ text: "डेटाबेस को डिफ़ॉल्ट स्थिति में रीसेट कर दिया गया।", type: "success" });
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#07172C] via-[#0A2540] to-[#143D69] text-white py-14 px-4 border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-amber-400" /> लोकल डेटा बैकअप (Local Data Backup)</span>
            <span>•</span>
            <span>RK MINISTRIES</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display">
            कलीसियाई डेटा बैकअप एवं सुरक्षित संग्रहण
          </h1>
          <p className="text-slate-200 text-sm md:text-base max-w-xl mx-auto">
            आरके मिनिस्ट्रीज का संपूर्ण डेटा आपके डिवाइस पर सुरक्षित है। 1-क्लिक में बैकअप डाउनलोड व रिस्टोर करें।
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        
        {/* Status Alert */}
        {statusMessage && (
          <div className={`p-4 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold border ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
              : "bg-red-50 text-red-900 border-red-200"
          }`}>
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Security & Offline Notice */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-2xl space-y-1">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <span>डेटा सुरक्षा एवं ऑफलाइन सुविधा (Offline Data Safety)</span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            आपके कलीसिया के सदस्य, बपतिस्मा आवेदन, और प्रार्थना रिकॉर्ड लोकल स्टोरेज में सुरक्षित हैं। समय-समय पर बैकअप डाउनलोड कर अपने कंप्यूटर, पेनड्राइव या मोबाइल में सुरक्षित रखें।
          </p>
        </div>

        {/* Actions Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          
          {/* Action 1: Export Full JSON */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0A2540]">
                संपूर्ण डेटा बैकअप डाउनलोड (Full Backup JSON)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                सभी सदस्य, बपतिस्मा, प्रार्थना और गवाही रिकॉर्ड को एक फाइल में डाउनलोड करें।
              </p>
            </div>
            <button
              onClick={handleExportJSON}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>बैकअप फाइल डाउनलोड करें (.JSON)</span>
            </button>
          </div>

          {/* Action 2: Restore from Backup */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0A2540]">
                बैकअप फाइल रिस्टोर करें (Restore from File)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                पहले से डाउनलोड की गई बैकअप फाइल से डेटा पुनर्स्थापित करें।
              </p>
            </div>
            <label className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow transition flex items-center justify-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>बैकअप फाइल चुनें (.JSON)</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileRestore}
                className="hidden"
              />
            </label>
          </div>

          {/* Action 3: Export Members CSV */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0A2540]">
                सदस्य सूची Excel (Members CSV)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                सभी पंजीकृत सदस्यों के नाम, मोबाइल व पते Excel शीट में एक्सपोर्ट करें।
              </p>
            </div>
            <button
              onClick={handleExportMembersCSV}
              className="w-full py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs transition flex items-center justify-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>सदस्य CSV डाउनलोड करें</span>
            </button>
          </div>

          {/* Action 4: Export Baptism CSV */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0A2540]">
                बपतिस्मा रिकॉर्ड Excel (Baptisms CSV)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                सभी बपतिस्मा प्रमाण पत्र, गवाहों के नाम व स्थिति की Excel फाइल।
              </p>
            </div>
            <button
              onClick={handleExportBaptismsCSV}
              className="w-full py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs transition flex items-center justify-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4 text-rose-600" />
              <span>बपतिस्मा CSV डाउनलोड करें</span>
            </button>
          </div>
        </div>

        {/* Reset Option */}
        <div className="bg-slate-100 rounded-2xl p-4 text-center border border-slate-200">
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-red-600 transition font-semibold inline-flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>डेटाबेस को प्रारंभिक डेमो डेटा पर रीसेट करें (Reset to Demo Records)</span>
          </button>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
