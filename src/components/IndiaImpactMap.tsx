import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "@vnedyalk0v/react19-simple-maps";
import { MapPin, Users, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import topo from "@/assets/india-states.topo.json";

type Stat = {
  id: string;
  name: string;
  focus: string;
  lives: string;
  projects: string;
  volunteers: string;
  desc: string;
  color: string;
  lightColor: string;
};

const STATES: Record<string, Stat> = {
  UP: { id: "UP", name: "Uttar Pradesh", focus: "Education & Employment", lives: "32K+", projects: "18", volunteers: "4,200", desc: "Mahila Chetna Samiti  teams in Uttar Pradesh are working closely with local communities, driving programs on education & employment and building a stronger grassroots network every day.", color: "#E05500", lightColor: "#FDDCC4" },
  DL: { id: "DL", name: "Delhi NCR", focus: "Skill & Legal Aid", lives: "8K+", projects: "9", volunteers: "1,100", desc: "Urban skill centres and legal aid desks supporting women navigating city challenges with dignity and confidence.", color: "#5B21B6", lightColor: "#EDE4FD" },
  BR: { id: "BR", name: "Bihar", focus: "Safety & Literacy", lives: "12K+", projects: "11", volunteers: "1,800", desc: "Adult literacy circles and women safety awareness drives reaching deep into rural panchayats across the state.", color: "#15803D", lightColor: "#D5F5E3" },
  MP: { id: "MP", name: "Madhya Pradesh", focus: "Self-Help Groups", lives: "9K+", projects: "8", volunteers: "1,300", desc: "Building economic resilience through SHGs, micro-finance training and craft-based livelihood programs.", color: "#1D4ED8", lightColor: "#D4E4FB" },
  RJ: { id: "RJ", name: "Rajasthan", focus: "Health & Nutrition", lives: "6K+", projects: "6", volunteers: "900", desc: "Mobile health camps and nutrition awareness reaching the most remote villages of the Thar region.", color: "#B91C1C", lightColor: "#FDDADA" },
  MH: { id: "MH", name: "Maharashtra", focus: "Vocational Training", lives: "4K+", projects: "4", volunteers: "650", desc: "Vocational and digital skill training preparing women for sustainable urban and semi-urban employment.", color: "#0E7490", lightColor: "#D0EFF5" },
  JH: { id: "JH", name: "Jharkhand", focus: "Tribal Empowerment", lives: "5K+", projects: "5", volunteers: "780", desc: "Empowering tribal women through education, forest-rights awareness and indigenous craft preservation.", color: "#B45309", lightColor: "#FDE9C8" },
};

const ACTIVE_IDS = Object.keys(STATES);

const statIcons = [Users, Briefcase, GraduationCap];
const statLabels = ["Lives Impacted", "Active Projects", "Volunteers"];

export default function IndiaImpactMap() {
  const [active, setActive] = useState<Stat>(STATES.UP);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-orange/5 blur-3xl rounded-full" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-orange/10 border border-orange/20 rounded-full px-4 py-1.5 mb-4">
            <MapPin className="w-4 h-4 text-orange" />
            <span className="text-orange text-[12px] font-bold uppercase tracking-widest">State Spotlight</span>
          </div>
          <h2 className="font-display font-extrabold text-navy text-[clamp(24px,2.8vw,34px)] leading-[1.25]">
            Our Reach Across{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange via-orange-2 to-purple bg-clip-text">India</span>
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-darkblue" />
            </span>
          </h2>
          <p className="mt-4 text-slate-500 text-[15px] sm:text-[16px] max-w-md mx-auto leading-relaxed">
            Empowering communities in 7 states with tailored programs that create real, lasting impact.
          </p>
        </div>

        <div className="relative grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center">
          {/* LEFT — Info Panel */}
          <div key={active.id} className="animate-fade-in order-2 lg:order-1">
            {/* State name + focus */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: active.color }} />
              <span className="text-[12px] font-bold uppercase tracking-widest" style={{ color: active.color }}>Active Region</span>
            </div>
            <h3 className="font-display font-extrabold text-navy text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.08] tracking-tight">
              {active.name}
            </h3>
            <p className="mt-2 text-slate-500 text-[16px] sm:text-[18px] font-medium">{active.focus}</p>

            {/* Stat Cards */}
            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
              {[active.lives, active.projects, active.volunteers].map((val, idx) => {
                const Icon = statIcons[idx];
                return (
                  <div
                    key={idx}
                    className="rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg border"
                    style={{ backgroundColor: active.lightColor, borderColor: `${active.color}20` }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${active.color}18` }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: active.color }} />
                    </div>
                    <div className="font-display font-extrabold text-[22px] sm:text-[26px] leading-none" style={{ color: active.color }}>
                      {val}
                    </div>
                    <div className="mt-1.5 text-slate-500 font-semibold text-[10px] sm:text-[11px] tracking-wider uppercase">
                      {statLabels[idx]}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Description */}
            <p className="mt-7 text-slate-600 leading-[1.8] text-[15px] sm:text-[16px] max-w-lg">
              {active.desc}
            </p>

            {/* State pills */}
            <div className="mt-7 flex flex-wrap gap-2">
              {ACTIVE_IDS.map((id) => {
                const s = STATES[id];
                const isActive = id === active.id;
                return (
                  <button
                    key={id}
                    onClick={() => setActive(s)}
                    className="px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-300 border"
                    style={{
                      backgroundColor: isActive ? s.color : s.lightColor,
                      color: isActive ? "#fff" : s.color,
                      borderColor: isActive ? s.color : `${s.color}30`,
                      boxShadow: isActive ? `0 4px 14px ${s.color}35` : "none",
                    }}
                  >
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Map */}
          <div className="relative order-1 lg:order-2">
            {/* Map glow */}
            <div className="absolute inset-0 rounded-3xl" style={{ boxShadow: `0 0 80px ${active.color}15, 0 0 40px ${active.color}10` }} />

            <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-slate-100">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 900, center: [82, 23] as any }}
                width={500}
                height={550}
                style={{ width: "100%", height: "auto" }}
              >
                <Geographies geography={topo as any}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const id = geo.id as string;
                      const isActive = id === active.id;
                      const isInteractive = ACTIVE_IDS.includes(id);
                      const stateData = isInteractive ? STATES[id] : null;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={() => isInteractive && setActive(STATES[id])}
                          onClick={() => isInteractive && setActive(STATES[id])}
                          style={{
                            default: {
                              fill: isActive
                                ? (stateData?.color || "#E05500")
                                : isInteractive
                                  ? (stateData?.lightColor || "#FDDCC4")
                                  : "#DEE5ED",
                              stroke: isActive ? (stateData?.color || "#E05500") : "#B0BAC6",
                              strokeWidth: isActive ? 1.2 : 0.5,
                              outline: "none",
                              transition: "all 0.3s ease",
                              cursor: isInteractive ? "pointer" : "default",
                              filter: isActive ? `drop-shadow(0 0 6px ${stateData?.color}40)` : "none",
                            },
                            hover: {
                              fill: isInteractive ? (stateData?.color || "#E05500") : "#DEE5ED",
                              stroke: isInteractive ? (stateData?.color || "#E05500") : "#B0BAC6",
                              strokeWidth: 0.8,
                              outline: "none",
                              cursor: isInteractive ? "pointer" : "default",
                              filter: isInteractive ? `drop-shadow(0 0 8px ${stateData?.color}50)` : "none",
                            },
                            pressed: {
                              fill: stateData?.color || "#E05500",
                              outline: "none",
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>

              {/* Legend */}
              <div className="flex items-center justify-center gap-4 mt-2 pb-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: active.color }} />
                  <span className="text-[11px] text-slate-400 font-medium">Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-slate-100 border border-slate-200" />
                  <span className="text-[11px] text-slate-400 font-medium">Other States</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
