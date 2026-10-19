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
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import { FaDove } from "react-icons/fa6";
import { MinistryStorage, BaptismApplication } from "@/lib/ministryStorage";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

export default function BaptismApplicationPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    fatherName: "",
    motherName: "",
    dob: "",
    address: "",
    village: "Mustafabad",
    district: "Azamgarh",
    statementOfFaith: "",
    videoUrl: "",
    documentName: "",
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
  const [fakeFileUploaded, setFakeFileUploaded] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFakeFileUploaded(file.name);
      setFormData(prev => ({ ...prev, documentName: file.name }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const created = MinistryStorage.saveBaptism({
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
        documentName: fakeFileUploaded || "Identity_Proof.pdf",
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
      });

      setSubmittedApp(created);
      setIsSubmitting(false);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }, 600);
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#07172C] via-[#0A2540] to-[#143D69] text-white py-16 px-4 border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><FaDove className="w-3.5 h-3.5 text-amber-400" /> पवित्र बपतिस्मा आवेदन</span>
            <span>•</span>
            <span>Holy Baptism Application</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display">
            बपतिस्मा हेतु ऑनलाइन आवेदन <span className="text-amber-400">RK MINISTRIES</span>
          </h1>
          <p className="text-slate-200 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            "इसलिए तुम जाकर सब जातियों के लोगों को चेला बनाओ और उन्हें पिता, और पुत्र, और पवित्र आत्मा के नाम से बपतिस्मा दो" (मत्ती 28:19)
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-10 -mt-6">
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

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 grid sm:grid-cols-2 gap-4 text-sm">
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
                  setFormData({
                    name: "", mobile: "", email: "", fatherName: "", motherName: "", dob: "",
                    address: "", village: "Mustafabad", district: "Azamgarh", statementOfFaith: "",
                    videoUrl: "", documentName: "", w1Name: "", w1Relation: "", w1Mobile: "",
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
                कृपया सभी जानकारी ध्यानपूर्वक भरें। दोनों गवाहों (2 Witnesses/Evidence) की जानकारी अनिवार्य है। आवेदन के उपरांत पादरी/चेयरमैन द्वारा सत्यापन कर बपतिस्मा प्रमाण पत्र (Baptism Certificate) जारी किया जाएगा।
              </p>
            </div>

            {/* Section 1: Candidate Basic Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#0A2540] flex items-center gap-2 border-b border-slate-200 pb-2">
                <User className="w-5 h-5 text-amber-500" />
                <span>1. आवेदक की जानकारी (Candidate Details)</span>
              </h3>

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
                    placeholder="जैसे: 9598059289"
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
                    placeholder="Mustafabad"
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
                    placeholder="Azamgarh"
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
                  <div className="flex items-center gap-2">
                    <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border border-dashed border-amber-400 bg-amber-50/50 hover:bg-amber-50 rounded-xl cursor-pointer text-xs font-semibold text-amber-900 transition">
                      <Upload className="w-4 h-4 text-amber-600" />
                      <span>{fakeFileUploaded ? fakeFileUploaded : "दस्तावेज चुनें (Choose Document)"}</span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
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
