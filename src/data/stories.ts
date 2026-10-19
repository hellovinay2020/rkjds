import { useState, useEffect } from "react";
import api, { getFullUrl } from "@/lib/api";
import s1 from "@/assets/Featured Projects/SakshamWomenProject.png";
import s2 from "@/assets/Causes/GirlChildEducation.png";
import s3 from "@/assets/Causes/LivelihoodSkills.png";

export type Story = {
  slug: string;
  img: string;
  name: string;
  place: string;
  age?: number;
  program: string;
  quote: string;
  summary: string;
  story: string[];
  impact: { label: string; value: string }[];
};

const fallbackStories: Story[] = [
  { slug: "sunita-devi", img: s1, name: "Sunita Devi", place: "Sitapur, Uttar Pradesh", age: 32, program: "Skill Development & Livelihood", quote: "From a daily-wage worker to running my own tailoring unit employing 8 women.", summary: "A daily-wage labourer who became an entrepreneur.", story: ["Sunita Devi grew up in a small village in Sitapur.", "In 2021, she enrolled into the 6-month tailoring program.", "Today her unit employs 8 women and earns over ₹40,000 a month."], impact: [{ label: "Monthly Income", value: "₹40,000+" }, { label: "Women Employed", value: "8" }] },
  { slug: "priya-kumari", img: s2, name: "Priya Kumari", place: "Barabanki, Uttar Pradesh", age: 19, program: "Girl Child Education Scholarship", quote: "I was the first girl in my village to clear class 12.", summary: "The first girl in her village to complete class 12.", story: ["Priya was about to be married off at 15.", "Through our scholarship program she received fees, books.", "She is now in the second year of a GNM nursing diploma."], impact: [{ label: "Board Exam %", value: "92%" }, { label: "Scholarship Years", value: "5" }] },
  { slug: "rekha-shg", img: s3, name: "Rekha & SHG Members", place: "Hardoi, Uttar Pradesh", program: "Self-Help Group & Enterprise", quote: "Our self-help group started with ₹500.", summary: "A 12-member self-help group turned savings into a brand.", story: ["Rekha and 11 women formed an SHG in 2019.", "They launched 'Maa Aanchal' — an organic spice brand.", "The group now ships orders to 14 states."], impact: [{ label: "Annual Turnover", value: "₹18 L" }, { label: "States Served", value: "14" }] },
];

function transformStory(raw: any): Story {
  const descriptionArr = Array.isArray(raw.description) ? raw.description : (raw.description ? [raw.description] : []);
  const stats = raw.stats?.map((s: any) => ({ label: s.label || "", value: s.number || s.value || "" })) || raw.highlights?.map((h: any) => ({ label: h.title || "", value: h.description || "" })) || [];

  return {
    slug: raw.slug,
    img: getFullUrl(raw.featuredImage || raw.image) || raw.img || "",
    name: raw.heading || raw.title || raw.name || "",
    place: raw.place || raw.location || "",
    age: raw.age || undefined,
    program: raw.sectionTag || raw.category || raw.program || "",
    quote: raw.quote || raw.excerpt || descriptionArr[0] || "",
    summary: raw.summary || descriptionArr[0] || "",
    story: descriptionArr.length > 0 ? descriptionArr : [raw.content || ""],
    impact: stats.slice(0, 4),
  };
}

export async function fetchStories(): Promise<Story[]> {
  try {
    const { data } = await api.get("/stories", { params: { limit: 100 } });
    const items = data?.data || data || [];
    if (Array.isArray(items) && items.length > 0) return items.map(transformStory);
  } catch { /* fallback */ }
  return fallbackStories;
}

export function getStory(slug: string, storiesList: Story[]): Story | undefined {
  return storiesList.find((s) => s.slug === slug);
}

export function useStories() {
  const [stories, setStories] = useState<Story[]>(fallbackStories);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchStories().then(setStories).finally(() => setLoading(false)); }, []);
  return { stories, loading };
}
