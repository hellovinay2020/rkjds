import { useState } from "react";
import {
  Heart,
  Send,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  Shield,
  Phone,
  MapPin,
  Flame,
} from "lucide-react";
import { FaHandsPraying } from "react-icons/fa6";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { MinistryStorage, PrayerRequest } from "@/lib/ministryStorage";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

export default function PrayerRequestPage() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>(() => MinistryStorage.getPrayers());
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    subject: "Healing / चंगाई" as PrayerRequest["subject"],
    details: "",
    isUrgent: false,
    isPublic: true,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const created = MinistryStorage.savePrayer({
        name: formData.name,
        mobile: formData.mobile,
        address: formData.address,
        subject: formData.subject,
        details: formData.details,
        isUrgent: formData.isUrgent,
        isPublic: formData.isPublic,
      });

      setPrayers(MinistryStorage.getPrayers());
      setSubmitted(true);
      setSubmitting(false);
      setFormData({
        name: "",
        mobile: "",
        address: "",
        subject: "Healing / चंगाई",
        details: "",
        isUrgent: false,
        isPublic: true,
      });
    }, 500);
  };

  const handlePrayAlong = (id: string) => {
    MinistryStorage.incrementPrayer(id);
    setPrayers(MinistryStorage.getPrayers());
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#07172C] via-[#0A2540] to-[#143D69] text-white py-16 px-4 border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><FaHandsPraying className="w-3.5 h-3.5 text-amber-400" /> ऑनलाइन प्रार्थना निवेदन</span>
            <span>•</span>
            <span>Online Prayer Request</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display">
            प्रार्थना निवेदन भेजें — <span className="text-amber-400">RK MINISTRIES</span>
          </h1>
          <p className="text-slate-200 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            "मांगो, तो तुम्हें दिया जाएगा; ढूंढ़ो तो तुम पाओगे; खटखटाओ, तो तुम्हारे लिये खोला जाएगा।" (मत्ती 7:7)
            <br />
            हमारी प्रार्थना टीम आपके और आपके परिवार के लिए निरंतर मध्यस्थता प्रार्थना करती है।
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-10 grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Prayer Request Submission Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2">
                <FaHandsPraying className="w-4 h-4 text-rose-500" />
                <span>अपना प्रार्थना विषय दर्ज करें</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                पास्टर रमेश और आरके मिनिस्ट्रीज टीम आपकी प्रार्थना को सभा में रखेंगे।
              </p>
            </div>

            {submitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-900 text-sm">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <strong className="block font-bold">धन्यवाद! आपका प्रार्थना निवेदन प्राप्त हुआ।</strong>
                  <span>प्रभु आपके जीवन में अद्भुत कार्य करें। हम आपके लिए प्रार्थना में लीन हैं।</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  आपका नाम (Full Name) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="अपना नाम लिखें"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    मोबाइल नंबर (Mobile Number) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="9598059289"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    प्रार्थना विषय (Prayer Subject) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm bg-white"
                  >
                    <option value="Healing / चंगाई">Healing / चंगाई (बीमारी से मुक्ति)</option>
                    <option value="Family / परिवार">Family / परिवार (शांति व एकता)</option>
                    <option value="Deliverance / छुटकारा">Deliverance / छुटकारा (बंधनों से मुक्ति)</option>
                    <option value="Financial / आर्थिक">Financial / आर्थिक (रोज़गार व आशीष)</option>
                    <option value="Spiritual Growth / आत्मिक">Spiritual Growth / आत्मिक उन्नति</option>
                    <option value="Peace / शांति">Peace / मन की शांति</option>
                    <option value="Other / अन्य">Other / अन्य विषय</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  पता / स्थान (Address / Village / District) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="उदा. ग्राम मुस्तफाबाद, मुबारकपुर, आज़मगढ़"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  प्रार्थना का पूरा विवरण (Prayer Details) <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="कृपया विस्तार से बताएं कि आपको किस बात के लिए प्रार्थना की आवश्यकता है..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 py-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isUrgent}
                    onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <span className="flex items-center gap-1 text-red-600">
                    <Flame className="w-3.5 h-3.5" />
                    अति आवश्यक / आपातकालीन प्रार्थना (Urgent Prayer)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>प्रार्थना दीवार पर प्रदर्शित करें (Show on Public Prayer Wall)</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? "भेजा जा रहा है..." : "प्रार्थना निवेदन भेजें (Submit Prayer Request)"}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Live Community Prayer Wall (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/80">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div>
                <h3 className="font-bold text-base text-[#0A2540] flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>प्रार्थना दीवार (Prayer Wall)</span>
                </h3>
                <span className="text-xs text-slate-500">विश्वासियों के संग प्रार्थना करें</span>
              </div>
              <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                {prayers.length} Requests
              </span>
            </div>

            <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
              {prayers.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-amber-50/40 border border-slate-200/80 transition space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-sm font-bold text-slate-900 block">{p.name}</strong>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        {p.address}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                      {p.subject}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{p.details}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                    <span className="text-slate-400 text-[11px]">
                      {p.date}
                    </span>

                    <button
                      onClick={() => handlePrayAlong(p.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 font-bold transition active:scale-95"
                    >
                      <FaHandsPraying className="w-3.5 h-3.5 text-amber-800" />
                      <span>साथ प्रार्थना की:</span>
                      <strong className="text-amber-800">{p.prayersCount || 1}</strong>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
