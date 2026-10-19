import { useEffect } from "react";
import { Award, BadgeCheck, Mail } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PageHero from "@/components/PageHero";
import heroBg from "@/assets/herosection/NariSashaktikaran.png";
import dubeyImg from "@/assets/Teams/SHRIKRISHNA K DUBEY - president.jpeg";
import sawantImg from "@/assets/Teams/JAYESH SAWANT-VICE PRESIDENT.png";
import panchalImg from "@/assets/Teams/Vaibhav Panchal - Treasurer.jpeg";
import karmokarImg from "@/assets/Teams/UDAY KARMOKAR -MEMBER.jpeg";

const teamMembers = [
  { name: "Shrikrishna K Dubey", role: "President", image: dubeyImg },
  { name: "Jayesh Sawant", role: "Vice President", image: sawantImg },
  { name: "Vaibhav Panchal", role: "Treasurer", image: panchalImg },
  { name: "Uday Karmokar", role: "Member", image: karmokarImg },
];

const accentColors = ["#FF6B00", "#0B1F3A", "#16A34A", "#7C3AED", "#2563EB", "#DC2626", "#0F766E"];

export default function TeamPage() {
  useEffect(() => {
    document.title = "Team — Mahila Chetna Samiti";
  }, []);

  return (
    <div className="bg-background text-text font-sans">
      <SiteHeader />
      <PageHero
        title="Our"
        accent="Team"
        description="Responsible office bearers and team members of Mahila Chetna Samiti."
        image={heroBg}
        eyebrow="Leadership & Members"
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us", to: "/about" }, { label: "Team" }]}
      />

      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-secondary/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow">Team Member</div>
            <h2 className="section-title mt-2">Meet Our Team</h2>

          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {teamMembers.map((member, index) => {
              const accent = accentColors[index % accentColors.length];
              return (
                <article
                  key={member.name}
                  className="group bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(11,31,58,0.04)] hover:shadow-[0_20px_44px_rgba(11,31,58,0.1)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent opacity-70" />
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-navy shadow">
                      <BadgeCheck className="w-3.5 h-3.5 text-orange" />
                      {member.role}
                    </span>
                  </div>

                  <div className="p-6 text-center">
                    <div className="mx-auto -mt-12 mb-4 relative z-10 w-16 h-16 rounded-full bg-white shadow-lg border-4 border-white flex items-center justify-center" style={{ color: accent }}>
                      {member.role.toLowerCase().includes("member") ? <Mail className="w-7 h-7" /> : <Award className="w-7 h-7" />}
                    </div>
                    <h3 className="font-display font-extrabold text-navy text-[19px] leading-tight group-hover:text-orange transition-colors">
                      {member.name}
                    </h3>
                    <div className="mt-2 inline-flex rounded-full px-3.5 py-1 text-[12px] font-bold uppercase tracking-wider" style={{ color: accent, backgroundColor: `${accent}15` }}>
                      {member.role}
                    </div>
                    <div className="w-10 h-[3px] rounded-full mx-auto mt-4 group-hover:w-16 transition-all duration-300" style={{ backgroundColor: accent }} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
