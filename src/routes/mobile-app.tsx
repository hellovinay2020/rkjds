import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Smartphone,
  Download,
  CheckCircle2,
  BookOpen,
  Heart,
  CreditCard,
  Bell,
  WifiOff,
  Radio,
  Share2,
  Sparkles,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MinistryLogo from "@/components/MinistryLogo";
import { FaCross, FaDove } from "react-icons/fa6";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

export default function MobileSoftwarePage() {
  const [installedAlert, setInstalledAlert] = useState(false);

  const handleInstallClick = () => {
    setInstalledAlert(true);
    setTimeout(() => setInstalledAlert(false), 4000);
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#07172C] via-[#0A2540] to-[#143D69] text-white py-16 px-4 border-b border-amber-500/20 overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-amber-400" /> मोबाइल सॉफ्टवेयर (Mobile Software / App)</span>
              <span>•</span>
              <span>RK MINISTRIES</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight leading-tight">
              आरके मिनिस्ट्रीज आधिकारिक मोबाइल ऐप
            </h1>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed">
              अब अपने मोबाइल में रखें पवित्र बाइबिल, डिजिटल सदस्यता पहचान पत्र, प्रार्थना निवेदन और दैनिक आशीष का वचन।
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <button
                onClick={handleInstallClick}
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-xl transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>ऐप इनस्टॉल करें (Install Mobile App)</span>
              </button>

              <a
                href={MINISTRY_CONFIG.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition flex items-center gap-2"
              >
                <Radio className="w-4 h-4 text-red-500" />
                <span>लाइव आराधना सेवा देखें</span>
              </a>
            </div>
          </div>

          {/* Mobile Screen Mockup */}
          <div className="relative w-64 h-[460px] rounded-[40px] border-8 border-slate-900 bg-[#0A2540] shadow-2xl overflow-hidden p-4 text-white flex flex-col justify-between shrink-0">
            {/* Camera notch */}
            <div className="w-24 h-4 bg-slate-900 rounded-b-xl mx-auto -mt-4 mb-2" />

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FaCross className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="font-extrabold text-xs block text-white">RK MINISTRIES</span>
                  <span className="text-[9px] text-amber-400 block">Azamgarh Church App</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 text-[10px] space-y-1">
                <span className="text-amber-300 font-bold flex items-center gap-1">
                  <FaDove className="w-3 h-3 text-amber-300" />
                  <span>आज का वचन (Daily Verse)</span>
                </span>
                <p className="italic text-slate-200">"यहोवा मेरा चरवाहा है; मुझे कुछ घटी न होगी।"</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-center">
                  <BookOpen className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span>पवित्र बाइबिल</span>
                </div>
                <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-center">
                  <CreditCard className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span>आईडी कार्ड</span>
                </div>
                <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-center">
                  <Heart className="w-4 h-4 text-rose-400 mx-auto mb-1" />
                  <span>प्रार्थना</span>
                </div>
                <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span>बपतिस्मा</span>
                </div>
              </div>
            </div>

            <div className="text-center text-[9px] text-slate-400 py-1">
              गाँव मुस्तफाबाद, आज़मगढ़ (उ.प्र.)
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        
        {installedAlert && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-semibold text-xs sm:text-sm flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <span>
              RK MINISTRIES ऐप आपके ब्राउज़र / डिवाइस के 'Add to Home Screen' के लिए तैयार है!
            </span>
          </div>
        )}

        {/* Feature Cards Grid */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0A2540]">
            मोबाइल सॉफ्टवेयर की प्रमुख विशेषताएं (Key Features)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            ग्रामीण व शहरी सभी विश्वासियों के लिए सरल व सुलभ तकनीक।
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <WifiOff className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#0A2540]">ऑफलाइन बाइबिल पाठ (Offline Bible)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              बिना इंटरनेट के भी हिन्दी एवं अंग्रेजी में संपूर्ण पवित्र बाइबिल के अध्यायों का अध्ययन करें।
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#0A2540]">डिजिटल पहचान पत्र (Digital ID Card)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              अपनी जेब में रखें कलीसिया का आधिकारिक पहचान पत्र व बपतिस्मा प्रमाण पत्र।
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#0A2540]">1-क्लिक प्रार्थना निवेदन (Quick Prayer)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              किसी भी विपत्ति या बीमारी के समय तुरंत पास्टर रमेश व प्रार्थना टीम को संदेश भेजें।
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#0A2540]">रविवार लाइव प्रसारण (Live Fellowship)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              यूट्यूब एवं फेसबुक पर लाइव आराधना, वचन एवं चंगाई प्रार्थना सभा से सीधे जुड़ें।
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#0A2540]">दैनिक वचन सूचना (Daily Notifications)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              प्रतिदिन प्रातःकाल आपके मोबाइल पर आत्मिक प्रेरणा देने वाला परमेश्वर का वचन प्राप्त करें।
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#0A2540]">हल्का व तेज़ (Lightweight PWA)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              केवल कुछ MB में किसी भी Android या iPhone पर बिना हैंग हुए तुरंत कार्य करता है।
            </p>
          </div>
        </div>

        {/* How to Install Guide */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200/80 space-y-4">
          <h3 className="text-lg font-bold text-[#0A2540]">
            मोबाइल में कैसे जोड़ें (How to Install / Add to Home Screen):
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <strong className="text-amber-800 text-sm block">१. ब्राउज़र खोलें</strong>
              <p>अपने मोबाइल क्रोम या सफारी में वेबसाइट खोलें।</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <strong className="text-amber-800 text-sm block">२. मेनू पर क्लिक करें</strong>
              <p>ब्राउज़र के 3 डॉट्स (⋮) या शेयर बटन पर क्लिक करें।</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <strong className="text-amber-800 text-sm block">३. 'Add to Home Screen' चुनें</strong>
              <p>RK MINISTRIES ऐप आपके होम स्क्रीन पर ऐप की तरह जुड़ जाएगा।</p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
