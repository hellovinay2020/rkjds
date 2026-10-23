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
import PageHero from "@/components/PageHero";
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

      <PageHero
        title="Online Prayer Request"
        accent="ऑनलाइन प्रार्थना निवेदन"
        description="मांगो, तो तुम्हें दिया जाएगा; ढूंढ़ो तो तुम पाओगे; खटखटाओ, तो तुम्हारे लिये खोला जाएगा (मत्ती 7:7) — हमारी प्रार्थना टीम आपके और आपके परिवार के लिए निरंतर प्रार्थना करती है।"
      />

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2">
              <FaHandsPraying className="w-5 h-5 text-rose-500" />
              <span>अपना प्रार्थना विषय दर्ज करें</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
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
                  placeholder="9415314486"
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
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? "भेजा जा रहा है..." : "प्रार्थना निवेदन भेजें (Submit Prayer Request)"}</span>
            </button>
          </form>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
