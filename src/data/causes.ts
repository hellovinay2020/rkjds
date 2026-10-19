import { useState, useEffect } from "react";
import api, { getFullUrl } from "@/lib/api";
import img1 from "@/assets/Our Programs/WomenEmpowermentProgram.png";
import img2 from "@/assets/Causes/GirlChildEducation.png";
import img3 from "@/assets/Our Programs/HealthSafetyCampaign.png";
import img4 from "@/assets/Causes/WomenHealthHygiene.png";
import img5 from "@/assets/Causes/LivelihoodSkills.png";
import img6 from "@/assets/herosection/NariSashaktikaran.png";
export const causeIconMap: Record<string, string> = {
  "women-empowerment": "Users",
  "girl-child-education": "GraduationCap",
  "safety-anti-trafficking": "Shield",
  "health-nutrition": "Stethoscope",
  "livelihood-agriculture": "Sprout",
  "elderly-differently-abled": "Heart",
};

export type Cause = {
  slug: string;
  title: string;
  desc: string;
  img: string;
  I: string;
  raised: number;
  beneficiaries: string;
  goal: string;
  raisedAmt: string;
  about: string[];
  objectives: string[];
  impact: { label: string; value: string }[];
  locations: string[];
  status?: string;
  pdfUrl?: string;
};

const fallbackCauses: Cause[] = [
  { slug: "women-empowerment", title: "Women Empowerment", desc: "Skill training, self-help groups and leadership development for rural women.", img: img1, I: "women-empowerment", raised: 84, beneficiaries: "12,000+", goal: "₹50 Lakhs", raisedAmt: "₹42 Lakhs", about: ["Mahila Chetna Samiti  has been working since 1997 to empower rural women."], objectives: ["Train 5,000 women annually", "Form 500+ self-help groups"], impact: [{ label: "Women Trained", value: "12,000+" }, { label: "SHGs Formed", value: "540" }], locations: ["Lucknow", "Sitapur", "Barabanki"] },
  { slug: "girl-child-education", title: "Girl Child Education", desc: "Scholarships, learning kits and bridge schools for first-generation learners.", img: img2, I: "girl-child-education", raised: 67, beneficiaries: "8,500+", goal: "₹35 Lakhs", raisedAmt: "₹23.4 Lakhs", about: ["Every girl deserves a school bench."], objectives: ["Sponsor 2,000 girls per year", "Run 25 bridge schools"], impact: [{ label: "Girls Sponsored", value: "8,500+" }, { label: "Retention Rate", value: "94%" }], locations: ["Lucknow", "Sonbhadra", "Gonda"] },
  { slug: "safety-anti-trafficking", title: "Safety & Anti-Trafficking", desc: "Awareness, rescue and rehabilitation programs across vulnerable districts.", img: img3, I: "safety-anti-trafficking", raised: 52, beneficiaries: "3,200+", goal: "₹40 Lakhs", raisedAmt: "₹20.8 Lakhs", about: ["We work at the frontline against human trafficking."], objectives: ["Conduct 500+ awareness sessions", "Run 24x7 helpline"], impact: [{ label: "Lives Protected", value: "3,200+" }, { label: "Rescues Supported", value: "240" }], locations: ["Lucknow", "Gorakhpur", "Maharajganj"] },
  { slug: "health-nutrition", title: "Health & Nutrition", desc: "Maternal health camps, nutrition support and adolescent wellness drives.", img: img4, I: "health-nutrition", raised: 73, beneficiaries: "15,000+", goal: "₹60 Lakhs", raisedAmt: "₹43.8 Lakhs", about: ["Our mobile health clinics bring essential services."], objectives: ["Run weekly health camps", "Deliver nutrition kits"], impact: [{ label: "Beneficiaries", value: "15,000+" }, { label: "Camps Held", value: "620" }], locations: ["Sitapur", "Hardoi", "Barabanki"] },
  { slug: "livelihood-agriculture", title: "Livelihood & Agriculture", desc: "Organic farming, micro-enterprise and market linkage for rural families.", img: img5, I: "livelihood-agriculture", raised: 41, beneficiaries: "6,400+", goal: "₹45 Lakhs", raisedAmt: "₹18.4 Lakhs", about: ["We support rural families to build sustainable livelihoods."], objectives: ["Promote organic farming", "Build women-led FPOs"], impact: [{ label: "Families Supported", value: "6,400+" }, { label: "Income Growth", value: "+38%" }], locations: ["Hardoi", "Sitapur"] },
  { slug: "elderly-differently-abled", title: "Elderly & Differently-abled", desc: "Care, dignity kits and inclusion programs for the most vulnerable.", img: img6, I: "elderly-differently-abled", raised: 38, beneficiaries: "2,100+", goal: "₹30 Lakhs", raisedAmt: "₹11.4 Lakhs", about: ["Our inclusion program supports the elderly."], objectives: ["Distribute dignity kits", "Run health camps"], impact: [{ label: "People Supported", value: "2,100+" }, { label: "Mobility Aids", value: "340" }], locations: ["Lucknow", "Barabanki"] },
];

function transformCause(raw: any): Cause {
  const slug = raw.slug || "";
  const target = raw.targetAmount || 5000000;
  const raised = raw.raisedAmount || 0;
  const pct = target > 0 ? Math.round((raised / target) * 100) : 0;

  return {
    slug,
    title: raw.title || raw.heading || "",
    desc: raw.description?.[0] || raw.description || "",
    img: getFullUrl(raw.image) || raw.img || "",
    I: slug,
    raised: Math.min(pct, 100),
    beneficiaries: raw.beneficiaries || "",
    goal: `₹${(target / 100000).toFixed(target >= 10000000 ? 0 : 1)} Lakhs`,
    raisedAmt: `₹${(raised / 100000).toFixed(raised >= 10000000 ? 0 : 1)} Lakhs`,
    about: Array.isArray(raw.description) && raw.description.length > 0 ? raw.description : [raw.description || ""],
    objectives: raw.keypoints?.items || raw.objectives || [],
    impact: raw.highlights?.map((h: any) => ({ label: h.title || "", value: h.description || "" })) || raw.impact || [],
    locations: raw.locations || [],
    status: raw.status || undefined,
    pdfUrl: getFullUrl(raw.pdfUrl) || undefined,
  };
}

function safeTransformCause(raw: any, index: number): Cause | null {
  try {
    return transformCause(raw);
  } catch {
    return null;
  }
}

export async function fetchCauses(): Promise<Cause[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const { data } = await api.get("/causes", { params: { limit: 100 }, signal: controller.signal });
    clearTimeout(timeout);
    const items = data?.data || data || [];
    if (Array.isArray(items) && items.length > 0) {
      const mapped = items.map(safeTransformCause).filter(Boolean) as Cause[];
      if (mapped.length > 0) return mapped;
    }
  } catch { /* fallback */ }
  return fallbackCauses;
}

export function getCause(slug: string, causesList: Cause[]): Cause | undefined {
  return causesList.find((c) => c.slug === slug);
}

export function useCauses() {
  const [causes, setCauses] = useState<Cause[]>(fallbackCauses);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchCauses().then(setCauses).finally(() => setLoading(false)); }, []);
  return { causes, loading };
}
