import { useState, useEffect } from "react";
import { Award, BadgeCheck, ShieldCheck, UserCheck, Users } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import Preloader from "@/components/Preloader";
import heroBg from "@/assets/breadcrume/breadcrume-logo.png";
import api, { getFullUrl } from "@/lib/api";

// Fallback images from src/assets/Teams
import rameshImg from "@/assets/Teams/Trustee Chairman Ramesh Kumar.jpeg";
import firtrajImg from "@/assets/Teams/Secretary Firtraj Ram.jpeg";
import snehalataImg from "@/assets/Teams/Trasurer Snehalata Gautam.jpeg";
import abhishekImg from "@/assets/Teams/Avidence _ Name  Abhishek.jpeg";
import ramakantImg from "@/assets/Teams/Avidence. --- Name Ramakant.jpeg";

interface TeamMember {
  _id?: string;
  name: string;
  role: string;
  fullRole?: string;
  image: string;
  bio?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  isLeader?: boolean;
}

const defaultTeamMembers: TeamMember[] = [
  {
    name: "रमेश कुमार",
    role: "ट्रस्टी अध्यक्ष",
    fullRole: "संस्थापक एवं ट्रस्टी अध्यक्ष",
    image: rameshImg,
    isLeader: true,
  },
  {
    name: "फिरतराज राम",
    role: "सचिव",
    fullRole: "सचिव",
    image: firtrajImg,
    isLeader: true,
  },
  {
    name: "स्नेहलता गौतम",
    role: "कोषाध्यक्ष",
    fullRole: "कोषाध्यक्ष",
    image: snehalataImg,
    isLeader: true,
  },
  {
    name: "अभिषेक",
    role: "कार्यकारी सदस्य",
    fullRole: "कार्यकारी सदस्य",
    image: abhishekImg,
  },
  {
    name: "रमाकांत",
    role: "कार्यकारी सदस्य",
    fullRole: "कार्यकारी सदस्य",
    image: ramakantImg,
  },
];

const accentColors = ["#FF6B00", "#0B1F3A", "#16A34A", "#7C3AED", "#2563EB"];

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(defaultTeamMembers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "हमारी टीम — RKV MINISTRIES";
    async function loadTeam() {
      try {
        const { data: res } = await api.get("/team");
        const list = res?.data || (Array.isArray(res) ? res : []);
        if (Array.isArray(list) && list.length > 0) {
          const activeMembers = list
            .filter((m: any) => m.isActive !== false)
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
            .map((m: any, idx: number) => ({
              _id: m._id,
              name: m.name,
              role: m.role || "सदस्य",
              fullRole: m.role || "सदस्य",
              image: m.photo ? getFullUrl(m.photo) : defaultTeamMembers[idx % defaultTeamMembers.length].image,
              bio: m.bio || "",
              socialLinks: m.socialLinks || {},
              isLeader: (m.order && m.order <= 3) || idx < 3,
            }));

          if (activeMembers.length > 0) {
            setMembers(activeMembers);
          }
        }
      } catch (err) {
        console.error("Failed to load team from API:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTeam();
  }, []);

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero
        title="हमारी"
        accent="टीम"
        description="आरकेवी मिनिस्ट्रीज के समर्पित न्यासी मंडल और टीम सदस्य जो प्रभु के कार्य और समाज सेवा में निरंतर समर्पित हैं।"
        image={heroBg}
        eyebrow="नेतृत्व एवं न्यासी मंडल"
        crumbs={[{ label: "होम", to: "/" }, { label: "हमारे बारे में", to: "/about" }, { label: "टीम" }]}
      />

      <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-slate-50/50 to-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow">हमारा नेतृत्व एवं स्तंभ</div>
            <h2 className="section-title mt-2">हमारी समर्पित टीम</h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              आरकेवी मिनिस्ट्रीज के समर्पित न्यासी मंडल और कार्यकारी सदस्य जो समाज सेवा एवं प्रभु के कार्य में निरंतर कार्यरत हैं।
            </p>
          </div>

          {loading ? (
            <div className="py-12 flex justify-center">
              <Preloader />
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto justify-center">
              {members.map((member, index) => {
                const accent = accentColors[index % accentColors.length];
                return (
                  <article
                    key={member._id || member.name}
                    className="group bg-white rounded-[24px] overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_rgba(11,31,58,0.06)] hover:shadow-[0_20px_44px_rgba(11,31,58,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src = defaultTeamMembers[index % defaultTeamMembers.length].image;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/85 via-[#0B1F3A]/20 to-transparent opacity-75 group-hover:opacity-60 transition-opacity" />
                      
                      <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[11px] font-bold tracking-wider text-[#0B1F3A] shadow-md">
                        <BadgeCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
                        {member.role}
                      </span>
                    </div>

                    <div className="p-6 text-center flex-1 flex flex-col justify-between">
                      <div>
                        <div
                          className="mx-auto -mt-12 mb-4 relative z-10 w-16 h-16 rounded-full bg-white shadow-lg border-4 border-white flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{ color: accent }}
                        >
                          {member.isLeader ? (
                            index === 0 ? <Award className="w-7 h-7" /> : <ShieldCheck className="w-7 h-7" />
                          ) : (
                            <UserCheck className="w-7 h-7" />
                          )}
                        </div>

                        <h3 className="font-display font-bold text-[#0B1F3A] text-2xl leading-tight group-hover:text-[#FF6B00] transition-colors">
                          {member.name}
                        </h3>

                        <div
                          className="mt-3 inline-flex items-center rounded-xl px-4 py-1.5 text-[13px] font-semibold tracking-wide"
                          style={{ color: accent, backgroundColor: `${accent}15` }}
                        >
                          <span>{member.fullRole || member.role}</span>
                        </div>

                        {member.bio && (
                          <p className="mt-3 text-slate-600 text-[13px] leading-relaxed line-clamp-3">
                            {member.bio}
                          </p>
                        )}

                        {/* Social Links */}
                        {member.socialLinks && Object.values(member.socialLinks).some(Boolean) && (
                          <div className="mt-4 flex items-center justify-center gap-2">
                            {member.socialLinks.facebook && (
                              <a
                                href={member.socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200 shadow-sm"
                              >
                                <FaFacebookF className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {member.socialLinks.instagram && (
                              <a
                                href={member.socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-pink-600 hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200 shadow-sm"
                              >
                                <FaInstagram className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {member.socialLinks.twitter && (
                              <a
                                href={member.socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200 shadow-sm"
                              >
                                <FaXTwitter className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {member.socialLinks.linkedin && (
                              <a
                                href={member.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-700 hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200 shadow-sm"
                              >
                                <FaLinkedinIn className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>

                      <div
                        className="w-10 h-[3px] rounded-full mx-auto mt-5 group-hover:w-20 transition-all duration-300"
                        style={{ backgroundColor: accent }}
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
