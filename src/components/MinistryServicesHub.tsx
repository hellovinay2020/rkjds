import { Link } from "react-router-dom";
import {
  FileText,
  ShieldCheck,
  Award,
  Heart,
  BookOpen,
  UserPlus,
  CreditCard,
  User,
  Users,
  Briefcase,
  BarChart3,
  HardDrive,
  Smartphone,
  Calendar,
  Sparkles,
  ArrowRight,
  Phone,
  Video,
  Image as ImageIcon,
  UserCheck,
} from "lucide-react";
import { FaYoutube, FaFacebookF, FaInstagram, FaCross, FaDove, FaHandsPraying } from "react-icons/fa6";
import { MINISTRY_CONFIG } from "@/data/ministryConfig";

export default function MinistryServicesHub() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-50 via-amber-50/20 to-slate-50 border-b border-amber-500/20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><FaCross className="w-3.5 h-3.5 text-amber-600" /> RK MINISTRIES ऑनलाइन सेवाएं</span>
            <span>•</span>
            <span>Services & Portals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A2540] font-display tracking-tight">
            कलीसियाई सेवाएं, बपतिस्मा एवं सदस्य पोर्टल
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            गाँव मुस्तफाबाद, मुबारकपुर, आज़मगढ़ (उ.प्र.) — विश्वासियों की सुविधा हेतु ऑनलाइन बपतिस्मा आवेदन, प्रार्थना निवेदन, डिजिटल पहचान पत्र एवं सदस्य सेवाएं।
          </p>
        </div>

        {/* 4 Feature Columns Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Baptism / Sacraments */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/90 hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center">
                <FaDove className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-[#0A2540]">
                  पवित्र बपतिस्मा (Baptism)
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  २ गवाहों के साक्ष्य सहित ऑनलाइन आवेदन एवं पादरी सत्यापन।
                </p>
              </div>

              <div className="pt-2 space-y-2 text-xs">
                <Link
                  to="/baptism-application"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-800 font-semibold transition"
                >
                  <span className="flex items-center gap-1.5"><FaDove className="w-3.5 h-3.5 text-amber-600" /> बपतिस्मा आवेदन फॉर्म</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                </Link>
                <Link
                  to="/baptism-verify"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-800 font-semibold transition"
                >
                  <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-amber-600" /> बपतिस्मा सत्यापन (Verify)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                </Link>
              </div>
            </div>

            <Link
              to="/baptism-application"
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs text-center transition block shadow-sm"
            >
              आवेदन शुरू करें →
            </Link>
          </div>

          {/* Card 2: Prayer & Bible */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/90 hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-600 flex items-center justify-center">
                <FaHandsPraying className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-[#0A2540]">
                  प्रार्थना एवं बाइबिल
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  अपनी प्रार्थना भेजें, चंगाई की गवाही दें और वचन पढ़ें।
                </p>
              </div>

              <div className="pt-2 space-y-2 text-xs">
                <Link
                  to="/prayer-request"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-800 font-semibold transition"
                >
                  <span className="flex items-center gap-1.5"><FaHandsPraying className="w-3.5 h-3.5 text-rose-600" /> ऑनलाइन प्रार्थना निवेदन</span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
                </Link>
                <Link
                  to="/testimony"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-800 font-semibold transition"
                >
                  <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-rose-600" /> ऑनलाइन गवाही (Testimony)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
                </Link>
                <Link
                  to="/bible"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-800 font-semibold transition"
                >
                  <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-rose-600" /> बाइबिल (Hindi / English)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
                </Link>
              </div>
            </div>

            <Link
              to="/prayer-request"
              className="w-full py-2.5 px-4 rounded-xl bg-[#0A2540] hover:bg-blue-900 text-white font-bold text-xs text-center transition block shadow-sm"
            >
              प्रार्थना निवेदन भेजें →
            </Link>
          </div>

          {/* Card 3: Photo & Video Gallery */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/90 hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-600 flex items-center justify-center">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-[#0A2540]">
                  फोटो एवं वीडियो गैलरी
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  कलीसियाई सभाएं, प्रार्थना, बपतिस्मा और आराधना की सुंदर झलकियाँ।
                </p>
              </div>

              <div className="pt-2 space-y-2 text-xs">
                <Link
                  to="/gallery"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-800 font-semibold transition"
                >
                  <span className="flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5 text-purple-600" /> फोटो गैलरी (Photo Gallery)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-600" />
                </Link>
                <Link
                  to="/video-gallery"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-800 font-semibold transition"
                >
                  <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5 text-purple-600" /> वीडियो गैलरी (Video Gallery)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-600" />
                </Link>
                <Link
                  to="/events"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-800 font-semibold transition"
                >
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-purple-600" /> सभाएं एवं समय (Worship Events)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-600" />
                </Link>
              </div>
            </div>

            <Link
              to="/gallery"
              className="w-full py-2.5 px-4 rounded-xl bg-[#0A2540] hover:bg-blue-900 text-white font-bold text-xs text-center transition block shadow-sm"
            >
              गैलरी देखें →
            </Link>
          </div>

          {/* Card 4: Church Membership & ID Card Portal */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/90 hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-600 flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-[#0A2540]">
                  कलीसिया सदस्यता (Membership)
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  आरके मिनिस्ट्रीज परिवार में शामिल हों व पहचान पत्र जनरेट करें।
                </p>
              </div>

              <div className="pt-2 space-y-2 text-xs">
                <Link
                  to="/member-registration"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 font-semibold transition"
                >
                  <span className="flex items-center gap-1.5"><UserPlus className="w-3.5 h-3.5 text-blue-600" /> नया सदस्य पंजीकरण फॉर्म</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                </Link>
                <Link
                  to="/id-card"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 font-semibold transition"
                >
                  <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5 text-blue-600" /> सदस्यता पहचान पत्र (ID Card)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                </Link>
              </div>
            </div>

            <Link
              to="/member-registration"
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs text-center transition block shadow-sm"
            >
              सदस्यता पंजीकरण शुरू करें →
            </Link>
          </div>
        </div>

        {/* Live Social & Direct YouTube Broadcast Banner */}
        <div className="bg-gradient-to-r from-[#07172C] via-[#0A2540] to-[#123962] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-amber-500/30">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block">
              Official Media Channels • RK MINISTRIES
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-display">
              यूट्यूब एवं सोशल मीडिया पर हमारे साथ जुड़ें
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              लाइव संडे सर्विस, चंगाई प्रार्थना सभाएं और सुसमाचार संदेश देखने हेतु हमारे आधिकारिक चैनलों को सब्सक्राइब करें।
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={MINISTRY_CONFIG.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow transition"
            >
              <FaYoutube className="w-4 h-4" />
              <span>YouTube Channel</span>
            </a>

            <a
              href={MINISTRY_CONFIG.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow transition"
            >
              <FaFacebookF className="w-3.5 h-3.5" />
              <span>Facebook Page</span>
            </a>

            <a
              href={MINISTRY_CONFIG.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs flex items-center gap-2 shadow transition"
            >
              <FaInstagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>

            <a
              href={`tel:${MINISTRY_CONFIG.phoneRaw}`}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{MINISTRY_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
