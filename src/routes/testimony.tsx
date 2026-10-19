import { useState } from "react";
import {
  FileText,
  Video,
  Mic,
  Send,
  ThumbsUp,
  Share2,
  CheckCircle2,
  Sparkles,
  MapPin,
  Play,
  HeartHandshake,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { MinistryStorage, Testimony } from "@/lib/ministryStorage";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

export default function TestimonyPage() {
  const [testimonies, setTestimonies] = useState<Testimony[]>(() => MinistryStorage.getTestimonies());
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    title: "",
    content: "",
    mediaType: "written" as Testimony["mediaType"],
    mediaUrl: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const created = MinistryStorage.saveTestimony({
        name: formData.name,
        mobile: formData.mobile,
        address: formData.address,
        title: formData.title,
        content: formData.content,
        mediaType: formData.mediaType,
        mediaUrl: formData.mediaUrl || (formData.mediaType === "video" ? MINISTRY_CONFIG.socialLinks.youtube : undefined),
      });

      setTestimonies(MinistryStorage.getTestimonies());
      setSubmitted(true);
      setSubmitting(false);
      setFormData({
        name: "",
        mobile: "",
        address: "",
        title: "",
        content: "",
        mediaType: "written",
        mediaUrl: "",
      });
    }, 500);
  };

  const handleLike = (id: string) => {
    MinistryStorage.likeTestimony(id);
    setTestimonies(MinistryStorage.getTestimonies());
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#07172C] via-[#0A2540] to-[#143D69] text-white py-16 px-4 border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-400" /> ऑनलाइन गवाही (Online Testimony)</span>
            <span>•</span>
            <span>Miracles & Praise Reports</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display">
            प्रभु के अद्भुत कार्यों की गवाही — <span className="text-amber-400">RK MINISTRIES</span>
          </h1>
          <p className="text-slate-200 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            "और वे मेम्ने के लोहू के कारण, और अपनी गवाही के वचन के कारण उस पर जयवन्त हुए" (प्रकाशितवाक्य 12:11)
            <br />
            यीशु मसीह ने आपके जीवन में जो चंगाई, छुटकारा व आशीष दी है, उसे दूसरों के साथ साझा कर परमेश्वर की महिमा करें।
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-10 grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form (6 cols) */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-xl font-bold text-[#0A2540] flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>अपनी गवाही भेजें (Submit Testimony)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                लिखित, ऑडियो या वीडियो लिंक द्वारा अपनी गवाही साझा करें।
              </p>
            </div>

            {submitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-900 text-sm">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <strong className="block font-bold">हालेलूयाह! आपकी गवाही प्राप्त हुई।</strong>
                  <span>आपकी गवाही से अन्य विश्वासियों का विश्वास दृढ़ होगा। प्रभु आपको आशीष दें!</span>
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
                    मोबाइल नंबर (Mobile) <span className="text-red-500">*</span>
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
                    स्थान / पता (Address) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="उदा. मुस्तफाबाद, आज़मगढ़"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  गवाही का शीर्षक (Testimony Title) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="जैसे: प्रभु यीशु ने दी कैंसर/बीमारी से मुक्ति"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              {/* Media Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  माध्यम (Media Type: Video / Audio / Written)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mediaType: "written" })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition ${
                      formData.mediaType === "written"
                        ? "bg-amber-500 text-slate-950 border-amber-600 font-bold"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>लिखित (Text)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mediaType: "video" })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition ${
                      formData.mediaType === "video"
                        ? "bg-amber-500 text-slate-950 border-amber-600 font-bold"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>वीडियो (Video)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mediaType: "audio" })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition ${
                      formData.mediaType === "audio"
                        ? "bg-amber-500 text-slate-950 border-amber-600 font-bold"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>ऑडियो (Audio)</span>
                  </button>
                </div>
              </div>

              {(formData.mediaType === "video" || formData.mediaType === "audio") && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {formData.mediaType === "video" ? "YouTube / वीडियो लिंक (Video URL)" : "ऑडियो रिकॉर्डिंग लिंक (Audio URL)"}
                  </label>
                  <input
                    type="url"
                    value={formData.mediaUrl}
                    onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                    placeholder="https://youtube.com/... or Google Drive URL"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  विस्तृत गवाही (Testimony Details / Story) <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="प्रभु ने आपके जीवन में क्या चमत्कार किया? कैसे प्रार्थना का उत्तर मिला? पूरा विवरण लिखें..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? "प्रकाशन हो रहा है..." : "गवाही प्रकाशित करें (Submit Testimony)"}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Testimony Wall (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/80">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div>
                <h3 className="font-bold text-base text-[#0A2540] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>विश्वासियो की गवाहियां (Testimonies)</span>
                </h3>
                <span className="text-xs text-slate-500">प्रभु की महिमा और चंगाई के साक्ष्य</span>
              </div>
              <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                {testimonies.length} Miracles
              </span>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {testimonies.map((t) => (
                <div
                  key={t.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 transition space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-[#0A2540]">{t.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <strong className="text-slate-800">{t.name}</strong>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-amber-600" />
                          {t.address}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {t.mediaType}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {t.content}
                  </p>

                  {t.mediaUrl && (
                    <a
                      href={t.mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-semibold hover:bg-red-100 transition"
                    >
                      <Play className="w-3 h-3 fill-red-700" />
                      <span>YouTube पर वीडियो गवाही देखें (Watch Video)</span>
                    </a>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                    <span className="text-slate-400 text-[11px]">{t.date}</span>

                    <button
                      onClick={() => handleLike(t.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold transition active:scale-95"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-amber-600" />
                      <span>हालेलूयाह! ({t.likes || 1})</span>
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
