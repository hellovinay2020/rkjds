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
  Upload,
  FileCheck2,
  X,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
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
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number; url?: string } | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;
      setUploadedFile({ name: file.name, size: file.size, url: fileUrl });
    }
  };

  const handleRemoveFile = () => {
    if (uploadedFile?.url) {
      URL.revokeObjectURL(uploadedFile.url);
    }
    setUploadedFile(null);
  };

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

      <PageHero
        title="Online Testimony"
        accent="ऑनलाइन गवाही"
        description="और वे मेम्ने के लोहू के कारण, और अपनी गवाही के वचन के कारण उस पर जयवन्त हुए (प्रकाशितवाक्य 12:11) — यीशु मसीह ने आपके जीवन में जो चंगाई, छुटकारा व आशीष दी है, उसे साझा करें।"
      />

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
                    placeholder="9415314486"
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

              {/* Upload File / Photo / Audio / Document */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  गवाही फ़ाइल / फ़ोटो / मेडिकल रिपोर्ट संलग्न करें (Attach File / Photo / Proof)
                </label>

                {uploadedFile ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border-2 border-emerald-400 flex items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {uploadedFile.url ? (
                        <img
                          src={uploadedFile.url}
                          alt="preview"
                          className="w-10 h-10 rounded-lg object-cover border border-emerald-300 shrink-0"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <FileCheck2 className="w-5 h-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-xs sm:text-sm text-slate-900 truncate max-w-[180px] sm:max-w-[220px]">
                            {uploadedFile.name}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold shrink-0">
                            ✓ अपलोड सफल
                          </span>
                        </div>
                        <p className="text-[11px] text-emerald-800">
                          साइज: {formatFileSize(uploadedFile.size)} • चयनित फाइल
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-300 transition text-xs font-semibold flex items-center gap-1 shrink-0"
                      title="फाइल हटाएं या बदलें"
                    >
                      <X className="w-3.5 h-3.5 text-rose-500" />
                      <span>हटाएं</span>
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 px-3 py-2.5 border-2 border-dashed border-amber-400 bg-amber-50/50 hover:bg-amber-50 rounded-xl cursor-pointer text-xs font-semibold text-amber-900 transition">
                    <Upload className="w-4 h-4 text-amber-600" />
                    <span>फ़ाइल चुनें (फ़ोटो, मेडिकल रिपोर्ट, ऑडियो, PDF)</span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.pdf,.mp3,.m4a,.wav,.doc,.docx"
                      onChange={handleFileUpload}
                    />
                  </label>
                )}
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
