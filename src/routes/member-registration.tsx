import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserPlus,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Printer,
  Sparkles,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { MinistryStorage, MemberRecord } from "@/lib/ministryStorage";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

export default function MemberRegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    nameHindi: "",
    mobile: "",
    email: "",
    fatherName: "",
    motherName: "",
    gender: "Male" as MemberRecord["gender"],
    dob: "",
    village: "Mustafabad",
    post: "Gujarpar",
    policeStation: "Mubarakpur",
    district: "Azamgarh",
    state: "Uttar Pradesh",
    pincode: "276404",
    role: "Believer / विश्वासी" as MemberRecord["role"],
    isBaptized: true,
    baptismDate: "",
  });

  const [registeredMember, setRegisteredMember] = useState<MemberRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const created = MinistryStorage.saveMember({
        name: formData.name,
        nameHindi: formData.nameHindi || formData.name,
        mobile: formData.mobile,
        email: formData.email,
        fatherName: formData.fatherName,
        motherName: formData.motherName,
        gender: formData.gender,
        dob: formData.dob || "1995-01-01",
        village: formData.village,
        post: formData.post,
        policeStation: formData.policeStation,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode,
        status: "Active",
        role: formData.role,
        isBaptized: formData.isBaptized,
        baptismDate: formData.isBaptized ? (formData.baptismDate || "2024-01-10") : undefined,
      });

      setRegisteredMember(created);
      setIsSubmitting(false);
      window.scrollTo({ top: 350, behavior: "smooth" });
    }, 500);
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#07172C] via-[#0A2540] to-[#143D69] text-white py-16 px-4 border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><UserPlus className="w-3.5 h-3.5 text-amber-400" /> सदस्य पंजीकरण (Member Registration)</span>
            <span>•</span>
            <span>RK MINISTRIES</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display">
            सदस्यता पंजीकरण फार्म — <span className="text-amber-400">RK MINISTRIES</span>
          </h1>
          <p className="text-slate-200 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            आरके मिनिस्ट्रीज परिवार का हिस्सा बनें। ऑनलाइन पंजीकरण कर तुरंत अपना डिजिटल पहचान पत्र (Membership ID Card) प्राप्त करें।
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-10 -mt-6">
        {registeredMember ? (
          /* Success Receipt Card with ID Card Action */
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-amber-200 space-y-6">
            <div className="flex items-center gap-4 text-emerald-600 bg-emerald-50 p-5 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-10 h-10 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-emerald-950">
                  बधाई! सदस्यता पंजीकरण सफल हुआ! (Registration Successful)
                </h2>
                <p className="text-sm text-emerald-800">
                  आपकी सदस्यता आईडी जनरेट हो गई है। आप तुरंत अपना आईडी कार्ड और सर्टिफिकेट डाउनलोड कर सकते हैं।
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-slate-500 font-medium block">सदस्य आईडी (Member ID):</span>
                <strong className="text-2xl font-mono text-amber-700">{registeredMember.id}</strong>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">सदस्य का नाम (Full Name):</span>
                <strong className="text-lg text-slate-900">{registeredMember.name}</strong>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">मोबाइल नंबर (Mobile):</span>
                <span className="font-semibold text-slate-800">{registeredMember.mobile}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">पद / भूमिका (Role):</span>
                <span className="font-semibold text-slate-800">{registeredMember.role}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">गाँव व ज़िला (Location):</span>
                <span className="font-semibold text-slate-800">
                  {registeredMember.village}, {registeredMember.district} ({registeredMember.pincode})
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">पंजीकरण तिथि (Join Date):</span>
                <span className="font-semibold text-slate-800">{registeredMember.joinDate}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to={`/id-card?id=${registeredMember.id}`}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm text-center shadow-lg transition flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>पहचान पत्र (ID Card) देखें व प्रिंट करें</span>
              </Link>
              <Link
                to="/member-portal"
                className="py-3.5 px-6 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-amber-600" />
                <span>मेम्बर पोर्टल खोलें</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 space-y-8">
            
            {/* Section 1: Personal Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#0A2540] flex items-center gap-2 border-b border-slate-200 pb-2">
                <User className="w-5 h-5 text-amber-500" />
                <span>१. व्यक्तिगत जानकारी (Personal Information)</span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    पूरा नाम अंग्रेजी में (Full Name - English) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    नाम हिन्दी में (Name in Hindi)
                  </label>
                  <input
                    type="text"
                    value={formData.nameHindi}
                    onChange={(e) => setFormData({ ...formData, nameHindi: e.target.value })}
                    placeholder="जैसे: रमेश कुमार"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

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
                    ईमेल (Gmail / Email)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="azaramesh@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    पिता का नाम (Father's Name) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    placeholder="पिता का नाम"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    माता का नाम (Mother's Name)
                  </label>
                  <input
                    type="text"
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    placeholder="माता का नाम"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    लिंग (Gender)
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm bg-white"
                  >
                    <option value="Male">पुरुष (Male)</option>
                    <option value="Female">महिला (Female)</option>
                    <option value="Other">अन्य (Other)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    जन्म तिथि (Date of Birth)
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Address Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#0A2540] flex items-center gap-2 border-b border-slate-200 pb-2">
                <MapPin className="w-5 h-5 text-amber-500" />
                <span>२. गाँव एवं निवास का पता (Address Details)</span>
              </h3>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    गाँव (Village) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    पोस्ट (Post) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.post}
                    onChange={(e) => setFormData({ ...formData, post: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    थाना (Police Station) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.policeStation}
                    onChange={(e) => setFormData({ ...formData, policeStation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ज़िला (District) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    राज्य (State)
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    पिनकोड (Pincode)
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Spiritual Status & Role */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#0A2540] flex items-center gap-2 border-b border-slate-200 pb-2">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <span>३. कलीसियाई पद एवं बपतिस्मा स्थिति (Church Role & Baptism)</span>
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    कलीसियाई भूमिका (Church Role / Designation)
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm bg-white"
                  >
                    <option value="Believer / विश्वासी">Believer / विश्वासी (कलीसिया सदस्य)</option>
                    <option value="Evangelist / प्रचारक">Evangelist / प्रचारक (सुसमाचार प्रचारक)</option>
                    <option value="Volunteer / सेवक">Volunteer / सेवक (संगति कार्यकर्ता)</option>
                    <option value="Elder / प्राचीन">Elder / प्राचीन (कलीसिया अगुवा)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    क्या आपका जल बपतिस्मा हुआ है? (Baptized?)
                  </label>
                  <select
                    value={formData.isBaptized ? "yes" : "no"}
                    onChange={(e) => setFormData({ ...formData, isBaptized: e.target.value === "yes" })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm bg-white"
                  >
                    <option value="yes">हाँ, बपतिस्मा हुआ है (Yes, Baptized)</option>
                    <option value="no">नहीं, बपतिस्मा लेना चाहता हूँ (Seeking Baptism)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-base shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>पंजीकरण हो रहा है...</span>
                ) : (
                  <>
                    <span className="flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-slate-950" />
                      <span>पंजीकरण पूर्ण करें व आईडी कार्ड प्राप्त करें</span>
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
