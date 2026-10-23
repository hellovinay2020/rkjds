import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileCheck2,
  Upload,
  User,
  Phone,
  Mail,
  Users,
  Video,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Info,
  Calendar,
  Sparkles,
  X,
  Trash2,
  Camera,
  Loader2,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import { FaDove } from "react-icons/fa6";
import { MinistryStorage, BaptismApplication } from "@/lib/ministryStorage";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";
import api, { getFullUrl } from "@/lib/api";

export default function BaptismApplicationPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    fatherName: "",
    motherName: "",
    dob: "",
    address: "",
    village: "",
    district: "",
    statementOfFaith: "",
    videoUrl: "",
    documentName: "",
    documentUrl: "",
    photoUrl: "",
    // Witness 1
    w1Name: "",
    w1Relation: "",
    w1Mobile: "",
    w1Statement: "",
    // Witness 2
    w2Name: "",
    w2Relation: "",
    w2Mobile: "",
    w2Statement: "",
  });

  const [submittedApp, setSubmittedApp] = useState<BaptismApplication | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number; url?: string } | null>(null);
  const [candidatePhoto, setCandidatePhoto] = useState<{ name: string; size: number; url: string } | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPhotoError("कृपया केवल वैध इमेज फाइल (JPG, PNG, WEBP) चुनें।");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("फोटो का साइज 5 MB से कम होना चाहिए।");
      return;
    }

    setPhotoError(null);
    setIsUploadingPhoto(true);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const localDataUrl = event.target?.result as string;
      setCandidatePhoto({ name: file.name, size: file.size, url: localDataUrl });
      setFormData(prev => ({ ...prev, photoUrl: localDataUrl }));

      try {
        const bodyFormData = new FormData();
        bodyFormData.append("file", file);
        const { data: res } = await api.post("/upload?folder=avatars", bodyFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (res?.data?.fileUrl) {
          const remoteUrl = getFullUrl(res.data.fileUrl);
          setCandidatePhoto({ name: file.name, size: file.size, url: remoteUrl });
          setFormData(prev => ({ ...prev, photoUrl: remoteUrl }));
        }
      } catch {
        // Fallback to local DataURL if server upload is unavailable
      } finally {
        setIsUploadingPhoto(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setCandidatePhoto(null);
    setFormData(prev => ({ ...prev, photoUrl: "" }));
    setPhotoError(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;
    setUploadedFile({ name: file.name, size: file.size, url: fileUrl });
    setFormData(prev => ({ ...prev, documentName: file.name }));

    try {
      const bodyFormData = new FormData();
      bodyFormData.append("file", file);
      const { data: res } = await api.post("/upload?folder=general", bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res?.data?.fileUrl) {
        const remoteUrl = getFullUrl(res.data.fileUrl);
        setUploadedFile({ name: file.name, size: file.size, url: remoteUrl });
        setFormData(prev => ({ ...prev, documentName: file.name, documentUrl: remoteUrl }));
      }
    } catch {
      // Keep local preview if upload fails
    }
  };

  const handleRemoveFile = () => {
    if (uploadedFile?.url) {
      URL.revokeObjectURL(uploadedFile.url);
    }
    setUploadedFile(null);
    setFormData(prev => ({ ...prev, documentName: "", documentUrl: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      dob: formData.dob,
      address: formData.address || `${formData.village}, ${formData.district}`,
      village: formData.village,
      district: formData.district,
      statementOfFaith: formData.statementOfFaith,
      videoUrl: formData.videoUrl,
      documentName: uploadedFile?.name || formData.documentName || "Identity_Proof.pdf",
      documentUrl: uploadedFile?.url || formData.documentUrl || undefined,
      photoUrl: candidatePhoto?.url || formData.photoUrl || undefined,
      witness1: {
        name: formData.w1Name,
        relation: formData.w1Relation,
        mobile: formData.w1Mobile,
        statement: formData.w1Statement,
      },
      witness2: {
        name: formData.w2Name,
        relation: formData.w2Relation,
        mobile: formData.w2Mobile,
        statement: formData.w2Statement,
      },
    };

    try {
      const { data: res } = await api.post("/baptisms", payload);
      const serverApp = res?.data;
      const created = MinistryStorage.saveBaptism(payload);
      if (serverApp?.applicationId) {
        created.id = serverApp.applicationId;
      }
      setSubmittedApp({
        ...created,
        id: serverApp?.applicationId || created.id,
      });
    } catch {
      // Fallback to local storage if backend is unreachable
      const created = MinistryStorage.saveBaptism(payload);
      setSubmittedApp(created);
    } finally {
      setIsSubmitting(false);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <SiteHeader />

      <PageHero
        title="Holy Baptism Application"
        accent="पवित्र बपतिस्मा आवेदन"
        description="इसलिए तुम जाकर सब जातियों के लोगों को चेला बनाओ और उन्हें पिता, और पुत्र, और पवित्र आत्मा के नाम से बपतिस्मा दो (मत्ती 28:19) — आरके मिनिस्ट्रीज"
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {submittedApp ? (
          /* Success Receipt Card */
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-amber-200 space-y-6">
            <div className="flex items-center gap-4 text-emerald-600 bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-10 h-10 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-emerald-950">आवेदन सफलतापूर्वक जमा हुआ! (Application Submitted)</h2>
                <p className="text-sm text-emerald-800">
                  आपका बपतिस्मा आवेदन आरके मिनिस्ट्रीज में दर्ज कर लिया गया है।
                </p>
              </div>
            </div>

            {/* Applicant Summary with Photo */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {submittedApp.photoUrl ? (
                <div className="relative shrink-0">
                  <img
                    src={submittedApp.photoUrl}
                    alt={submittedApp.name}
                    className="w-24 h-28 sm:w-28 sm:h-32 object-cover rounded-2xl border-2 border-amber-400 shadow-md"
                  />
                  <span className="absolute -bottom-2 -right-2 bg-emerald-600 text-white rounded-full p-1 shadow">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                </div>
              ) : (
                <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-2xl bg-amber-100 text-amber-700 flex flex-col items-center justify-center shrink-0 border-2 border-dashed border-amber-300">
                  <User className="w-10 h-10" />
                  <span className="text-[10px] font-bold mt-1">NO PHOTO</span>
                </div>
              )}

              <div className="flex-1 w-full grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">आवेदन क्रमांक (Application ID):</span>
                  <strong className="text-xl font-mono text-amber-600">{submittedApp.id}</strong>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">आवेदक का नाम (Candidate Name):</span>
                  <strong className="text-base text-slate-900">{submittedApp.name}</strong>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">मोबाइल नंबर (Mobile):</span>
                  <span className="font-semibold text-slate-800">{submittedApp.mobile}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">ईमेल (Gmail):</span>
                  <span className="font-semibold text-slate-800">{submittedApp.email || "N/A"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">पिता का नाम (Father's Name):</span>
                  <span className="font-semibold text-slate-800">{submittedApp.fatherName}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">माता का नाम (Mother's Name):</span>
                  <span className="font-semibold text-slate-800">{submittedApp.motherName}</span>
                </div>
                <div className="sm:col-span-2 pt-2 border-t border-slate-200">
                  <span className="text-xs text-slate-500 font-medium block">वर्तमान स्थिति (Status):</span>
                  <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    ⏳ Verification Pending (सत्यापन प्रक्रियाधीन)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to={`/baptism-verify?id=${submittedApp.id}`}
                className="flex-1 text-center py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>आवेदन स्थिति देखें (Track Status)</span>
              </Link>
              <button
                onClick={() => {
                  setSubmittedApp(null);
                  setCandidatePhoto(null);
                  setFormData({
                    name: "", mobile: "", email: "", fatherName: "", motherName: "", dob: "",
                    address: "", village: "Mustafabad", district: "Azamgarh", statementOfFaith: "",
                    videoUrl: "", documentName: "", documentUrl: "", photoUrl: "", w1Name: "", w1Relation: "", w1Mobile: "",
                    w1Statement: "", w2Name: "", w2Relation: "", w2Mobile: "", w2Statement: "",
                  });
                }}
                className="py-3 px-5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition"
              >
                + नया आवेदन भरें (New Application)
              </button>
            </div>
          </div>
        ) : (
          /* Baptism Application Form */
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 space-y-8">
            
            {/* Form Introduction Alert */}
            <div className="bg-blue-50/70 border-l-4 border-amber-500 p-4 rounded-xl text-xs sm:text-sm text-slate-700 space-y-1">
              <p className="font-bold text-slate-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-amber-600" />
                निर्देश (Instructions for Baptism Application):
              </p>
              <p>
                कृपया सभी जानकारी ध्यानपूर्वक भरें। अपनी स्पष्ट पासपोर्ट साइज फोटो और दोनों गवाहों (2 Witnesses/Evidence) की जानकारी अनिवार्य है। आवेदन के उपरांत पादरी/चेयरमैन द्वारा सत्यापन कर बपतिस्मा प्रमाण पत्र (Baptism Certificate) जारी किया जाएगा।
              </p>
            </div>

            {/* Section 1: Candidate Basic Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#0A2540] flex items-center gap-2 border-b border-slate-200 pb-2">
                <User className="w-5 h-5 text-amber-500" />
                <span>1. आवेदक की जानकारी (Candidate Details)</span>
              </h3>

              {/* Photo Upload Card */}
              <div className="bg-gradient-to-r from-amber-50/70 via-slate-50 to-amber-50/40 p-4 sm:p-5 rounded-2xl border-2 border-dashed border-amber-300/80">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                  {/* Photo Preview Frame */}
                  <div className="relative shrink-0">
                    <div className="w-28 h-32 sm:w-32 sm:h-36 rounded-2xl border-2 border-amber-400 bg-white overflow-hidden shadow-inner flex flex-col items-center justify-center relative group">
                      {candidatePhoto?.url ? (
                        <>
                          <img
                            src={candidatePhoto.url}
                            alt="Candidate Passport"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                            <label className="p-1.5 bg-white text-slate-800 rounded-lg cursor-pointer hover:bg-slate-100 shadow text-xs font-semibold" title="फोटो बदलें">
                              <Camera className="w-4 h-4 text-amber-600" />
                              <input
                                type="file"
                                className="hidden"
                                accept="image/jpeg,image/png,image/webp,image/jpg"
                                onChange={handlePhotoUpload}
                              />
                            </label>
                            <button
                              type="button"
                              onClick={handleRemovePhoto}
                              className="p-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 shadow text-xs"
                              title="फोटो हटाएं"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-3 flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-2 shadow-sm">
                            <Camera className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] font-bold text-slate-700 leading-tight">
                            पासपोर्ट फोटो
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                            3.5 x 4.5 cm
                          </span>
                        </div>
                      )}

                      {isUploadingPhoto && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center">
                          <Loader2 className="w-6 h-6 text-amber-600 animate-spin" />
                          <span className="text-[10px] font-bold text-amber-800 mt-1">अपलोडिंग...</span>
                        </div>
                      )}
                    </div>

                    {candidatePhoto?.url && !isUploadingPhoto && (
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  {/* Photo Actions & Guidance */}
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm cursor-pointer shadow-sm transition">
                        <Upload className="w-4 h-4" />
                        <span>{candidatePhoto?.url ? "फोटो बदलें (Change Photo)" : "पासपोर्ट फोटो अपलोड करें (Upload Photo)"}</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,image/webp,image/jpg"
                          onChange={handlePhotoUpload}
                        />
                      </label>

                      {candidatePhoto?.url && (
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold text-xs transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>हटाएं</span>
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      आधिकारिक बपतिस्मा प्रमाण पत्र (Baptism Certificate) एवं कलीसिया सदस्यता रिकॉर्ड हेतु अपनी हालिया स्पष्ट पासपोर्ट साइज फोटो अपलोड करें।
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      स्वीकृत प्रारूप: JPG, PNG, WEBP • अधिकतम साइज: 5 MB
                      {candidatePhoto && (
                        <span className="text-emerald-700 font-bold ml-2">
                          • {candidatePhoto.name} ({formatFileSize(candidatePhoto.size)})
                        </span>
                      )}
                    </p>

                    {photoError && (
                      <p className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 inline-block">
                        ⚠️ {photoError}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    आवेदक का पूरा नाम (Full Name) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="जैसे: Ramesh Kumar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    मोबाइल नंबर (Mobile Number) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="जैसे: 9415314486"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ईमेल आईडी (Gmail / Email) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="azaramesh@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    जन्म तिथि (Date of Birth)
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    पिता का नाम (Father's Name) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    required
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="Father Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    माता का नाम (Mother's Name) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    required
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="Mother Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    गाँव (Village)
                  </label>
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    placeholder="उदा. मुस्तफाबाद"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ज़िला (District)
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="उदा. आज़मगढ़"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  पूरा पता (Full Postal Address)
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Village Mustafabad, Post Gujarpar, Mubarakpur, Azamgarh, UP 276404"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>
            </div>

            {/* Section 2: Statement of Faith & Media Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#0A2540] flex items-center gap-2 border-b border-slate-200 pb-2">
                <FileText className="w-5 h-5 text-amber-500" />
                <span>2. विश्वास का अंगीकार व कारण (Statement of Faith / Reason for Baptism)</span>
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  लिखित गवाही / बपतिस्मा लेने का कारण (Written Statement of Faith) <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="statementOfFaith"
                  required
                  rows={3}
                  value={formData.statementOfFaith}
                  onChange={handleChange}
                  placeholder="मैं यीशु मसीह को अपना उद्धारकर्ता मानकर विश्वास के साथ बपतिस्मा लेना चाहता/चाहती हूँ..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    वीडियो गवाही लिंक (Video Statement / Link)
                  </label>
                  <div className="relative">
                    <Video className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="url"
                      name="videoUrl"
                      value={formData.videoUrl}
                      onChange={handleChange}
                      placeholder="YouTube / Google Drive link"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    पहचान पत्र अपलोड (Upload Document / Aadhaar / Voter ID)
                  </label>
                  
                  {uploadedFile ? (
                    <div className="p-3 rounded-xl bg-emerald-50 border-2 border-emerald-400 flex items-center justify-between gap-3 shadow-sm">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <FileCheck2 className="w-5 h-5" />
                        </div>
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
                      <span>दस्तावेज चुनें (Aadhaar / Voter ID / PDF / Photo)</span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={handleFileUpload}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Two Columns - 2 Witness / Evidence Fields */}
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="text-lg font-bold text-[#0A2540] flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-500" />
                  <span>3. दो गवाह एवं साक्ष्य विवरण (2 Witness / Evidence Fields - 2 Columns)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  कलीसिया/क्षेत्र के दो ज़िम्मेदार व्यक्तियों की गवाही दर्ज करें।
                </p>
              </div>

              {/* 2 Column Layout */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Column 1: Witness 1 */}
                <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-bold text-sm text-amber-800">गवाह १ (Witness 1 / Column 1)</span>
                    <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded">पहला साक्ष्य</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      गवाह का नाम (Witness 1 Name) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="w1Name"
                      required
                      value={formData.w1Name}
                      onChange={handleChange}
                      placeholder="नाम जैसे: Pastor / Elder Name"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      सम्बन्ध / पद (Relationship / Church Role) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="w1Relation"
                      required
                      value={formData.w1Relation}
                      onChange={handleChange}
                      placeholder="जैसे: Church Elder / Pastor / Brother"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      मोबाइल नंबर (Witness 1 Mobile) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="w1Mobile"
                      required
                      value={formData.w1Mobile}
                      onChange={handleChange}
                      placeholder="Mobile Number"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      गवाह का बयान / साक्ष्य (Statement / Evidence)
                    </label>
                    <textarea
                      name="w1Statement"
                      rows={2}
                      value={formData.w1Statement}
                      onChange={handleChange}
                      placeholder="मैं गवाही देता हूँ कि यह विश्वासी सच्चे मन से प्रभु में आया है..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs bg-white"
                    />
                  </div>
                </div>

                {/* Column 2: Witness 2 */}
                <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-bold text-sm text-blue-900">गवाह २ (Witness 2 / Column 2)</span>
                    <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded">दूसरा साक्ष्य</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      गवाह का नाम (Witness 2 Name) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="w2Name"
                      required
                      value={formData.w2Name}
                      onChange={handleChange}
                      placeholder="नाम जैसे: Field Worker / Relative"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      सम्बन्ध / पद (Relationship / Church Role) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="w2Relation"
                      required
                      value={formData.w2Relation}
                      onChange={handleChange}
                      placeholder="जैसे: Field Worker / Neighbor"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      मोबाइल नंबर (Witness 2 Mobile) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="w2Mobile"
                      required
                      value={formData.w2Mobile}
                      onChange={handleChange}
                      placeholder="Mobile Number"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      गवाह का बयान / साक्ष्य (Statement / Evidence)
                    </label>
                    <textarea
                      name="w2Statement"
                      rows={2}
                      value={formData.w2Statement}
                      onChange={handleChange}
                      placeholder="मैं प्रमाणित करता हूँ कि आवेदक का जीवन मसीह में बदला है..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Declaration & Submit Button */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required className="mt-1 rounded text-amber-600 focus:ring-amber-500" />
                <span className="text-xs text-slate-600 leading-relaxed">
                  मैं घोषणा करता/करती हूँ कि ऊपर दी गई सभी जानकारी पूर्णतया सत्य है। मैं स्वेच्छा से प्रभु यीशु मसीह पर विश्वास रखते हुए बपतिस्मा लेने का निर्णय ले रहा/रही हूँ।
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-base shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>प्रक्रियाधीन है... (Submitting...)</span>
                ) : (
                  <>
                    <span className="flex items-center gap-2">
                      <FaDove className="w-5 h-5 text-slate-950" />
                      <span>बपतिस्मा आवेदन जमा करें (Submit Application)</span>
                    </span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
