import { useState, useEffect } from "react";
import { format } from "date-fns";
import api, { getFullUrl } from "@/lib/api";
import blogImg1 from "@/assets/Blogs/EmpoweringRuralWomen.png";
import blogImg2 from "@/assets/Blogs/ImportanceofGirlsEducation.png";
import blogImg3 from "@/assets/Blogs/HealthAwareness.png";
import blogImg4 from "@/assets/Featured Projects/SakshamWomenProject.png";
import blogImg5 from "@/assets/herosection/Shiksha.png";
import blogImg6 from "@/assets/Causes/WomenHealthHygiene.png";

export type BlogAuthor = {
  name: string;
  photo: string;
  bio: string;
  socialLinks: { facebook: string; twitter: string; instagram: string; linkedin: string };
};

export type BlogCard = {
  title: string;
  description: string;
  image: string;
  link: string;
};

export type Blog = {
  slug: string;
  img: string;
  tag: string;
  title: string;
  date: string;
  author: BlogAuthor;
  excerpt: string;
  content: string[];
  highlights: string[];
  tags: string[];
  sectionTag: string;
  category: string;
  heading: string;
  galleryImages: string[];
  galleryNote: string;
  medicalSupportPdf: string;
  keypoints: { sectionTitle: string; items: string[] };
  cards: BlogCard[];
  fullContent: string;
  published: boolean;
};

const fallbackAuthor = { name: "MCS Team", photo: "", bio: "Part of the Mahila Chetna Samiti  field team — documenting stories of change from villages across Uttar Pradesh and beyond.", socialLinks: { facebook: "", twitter: "", instagram: "", linkedin: "" } };

const fallbackBlogs: Blog[] = [
  {
    slug: "skill-training-rural-women", img: blogImg1, tag: "Women Empowerment",
    title: "How Skill Training is Reshaping Rural Women's Lives",
    date: "Jun 18, 2026", author: fallbackAuthor,
    excerpt: "Stories from our Saksham centers where women are turning training into thriving micro-enterprises.",
    content: ["Across the villages of Uttar Pradesh, a quiet revolution is underway.", "What begins as a three-month vocational course often ends with something far bigger.", "This is the real measure of empowerment: not just income, but agency."],
    highlights: ["1,200+ women trained in 2025", "68% started a micro-enterprise within 6 months", "Average household income up by 42%"],
    tags: ["Women Empowerment", "Skill Training", "Livelihood"], sectionTag: "Blog Post", category: "Women Empowerment", heading: "", galleryImages: [], galleryNote: "", medicalSupportPdf: "", keypoints: { sectionTitle: "", items: [] }, cards: [], fullContent: "", published: true,
  },
  {
    slug: "bridging-learning-gap", img: blogImg2, tag: "Education",
    title: "Bridging the Learning Gap: 1,000 Children, One Mission",
    date: "Jun 04, 2026", author: { ...fallbackAuthor, name: "Riya Sharma" },
    excerpt: "How the Education Bridge program is bringing digital classrooms and confidence to government schools across UP.",
    content: ["When we entered the government primary school in Malhaur, only one in three children in Class 5 could read a Class 2 paragraph.", "The Education Bridge program is built around a simple idea: every child deserves a teacher who has the time, tools, and training."],
    highlights: ["1,000+ children supported across 14 schools", "Reading fluency up 3x in 18 months", "Parent attendance at school events doubled"],
    tags: ["Education", "Child Rights", "Education Bridge"], sectionTag: "Blog Post", category: "Education", heading: "", galleryImages: [], galleryNote: "", medicalSupportPdf: "", keypoints: { sectionTitle: "", items: [] }, cards: [], fullContent: "", published: true,
  },
  {
    slug: "health-camps-lessons", img: blogImg3, tag: "Health",
    title: "120 Health Camps Later — Lessons from the Field",
    date: "May 22, 2026", author: { ...fallbackAuthor, name: "Dr. Anand" },
    excerpt: "What two years of mobile health camps taught us about preventive care in rural India.",
    content: ["Two years, 120 camps, and over 18,000 patients later, our mobile health unit has become a familiar sight.", "Hypertension, anemia, and untreated diabetes show up again and again."],
    highlights: ["18,000+ patients screened", "200+ health workers trained", "Maternal referrals up 4x"],
    tags: ["Health", "Medical Camps"], sectionTag: "Blog Post", category: "Health", heading: "", galleryImages: [], galleryNote: "", medicalSupportPdf: "", keypoints: { sectionTitle: "", items: [] }, cards: [], fullContent: "", published: true,
  },
  {
    slug: "women-sarpanchs-sitapur", img: blogImg4, tag: "Leadership",
    title: "Women Sarpanchs Leading the Change in Sitapur",
    date: "May 10, 2026", author: fallbackAuthor,
    excerpt: "Trained women representatives are transforming village-level governance and accountability.",
    content: ["In Sitapur district, 47 women sarpanchs have completed our Panchayat Leadership Program.", "From street lighting to school toilets, the agendas of gram sabhas now reflect the lived realities."],
    highlights: ["47 women sarpanchs trained", "Gram sabha turnout up 3x", "₹2.1 Cr in works re-prioritized"],
    tags: ["Leadership", "Governance"], sectionTag: "Blog Post", category: "Leadership", heading: "", galleryImages: [], galleryNote: "", medicalSupportPdf: "", keypoints: { sectionTitle: "", items: [] }, cards: [], fullContent: "", published: true,
  },
  {
    slug: "early-childhood-care", img: blogImg5, tag: "Child Rights",
    title: "Why Early Childhood Care Changes Everything",
    date: "Apr 28, 2026", author: { ...fallbackAuthor, name: "Neha Verma" },
    excerpt: "A look inside our child safety ECCE centers and the science behind early intervention.",
    content: ["The first 2,000 days of a child's life shape their brain more than any classroom ever will.", "Play-based learning, nutrition tracking, and caregiver coaching come together under one roof."],
    highlights: ["22 ECCE centers active", "1,800+ children enrolled", "Nutrition status improved for 76%"],
    tags: ["Child Rights", "Early Childhood"], sectionTag: "Blog Post", category: "Child Rights", heading: "", galleryImages: [], galleryNote: "", medicalSupportPdf: "", keypoints: { sectionTitle: "", items: [] }, cards: [], fullContent: "", published: true,
  },
  {
    slug: "menstrual-hygiene-awareness", img: blogImg6, tag: "Awareness",
    title: "Menstrual Hygiene Awareness: Breaking the Silence",
    date: "Apr 12, 2026", author: fallbackAuthor,
    excerpt: "How peer-led workshops are normalizing conversations around menstruation in rural schools.",
    content: ["Silence is the biggest barrier to menstrual health. Our peer-led workshops in schools have flipped the script.", "Distribution of reusable pads has cut school absenteeism among girls by nearly a third."],
    highlights: ["240+ schools covered", "School absenteeism down 30%", "12,000+ adolescents reached"],
    tags: ["Awareness", "Health", "Menstrual Hygiene"], sectionTag: "Blog Post", category: "Awareness", heading: "", galleryImages: [], galleryNote: "", medicalSupportPdf: "", keypoints: { sectionTitle: "", items: [] }, cards: [], fullContent: "", published: true,
  },
];

function transformAuthor(raw: any): BlogAuthor {
  if (typeof raw === "string") return { name: raw, photo: "", bio: "", socialLinks: { facebook: "", twitter: "", instagram: "", linkedin: "" } };
  return {
    name: raw?.name || "MCS Team",
    photo: getFullUrl(raw?.photo) || "",
    bio: raw?.bio || "",
    socialLinks: {
      facebook: raw?.socialLinks?.facebook || raw?.facebookUrl || "",
      twitter: raw?.socialLinks?.twitter || raw?.twitterUrl || "",
      instagram: raw?.socialLinks?.instagram || raw?.instagramUrl || "",
      linkedin: raw?.socialLinks?.linkedin || raw?.linkedinUrl || "",
    },
  };
}

function transformBlog(raw: any): Blog {
  const contentStr = raw.content || raw.description?.join("\n\n") || "";
  const contentArr = Array.isArray(raw.content) ? raw.content : contentStr.split(/\n{2,}/).filter(Boolean);
  const highlights = raw.highlights?.map((h: any) => h.description || h.title || h) || raw.highlights;
  const date = raw.createdAt ? format(new Date(raw.createdAt), "MMM dd, yyyy") : raw.date || "";
  const images = Array.isArray(raw.galleryImages) ? raw.galleryImages.map((i: string) => getFullUrl(i)).filter(Boolean) : [];

  const keypointsSectionTitle = raw.keypoints?.sectionTitle || "";
  const keypointsItems = Array.isArray(raw.keypoints?.items || raw.keypoints) ? (raw.keypoints?.items || raw.keypoints).map((k: any) => (typeof k === "string" ? k : k.title || k.description || "")) : [];

  const cards = Array.isArray(raw.cards) ? raw.cards.map((c: any) => ({
    title: c.title || "",
    description: c.description || "",
    image: getFullUrl(c.image) || "",
    link: c.link || "",
  })).filter((c: any) => c.title || c.description) : [];

  return {
    slug: raw.slug,
    img: getFullUrl(raw.featuredImage) || raw.img || "",
    tag: raw.category || raw.sectionTag || raw.tag || "",
    title: raw.title || raw.heading || "",
    date,
    author: transformAuthor(raw.author),
    excerpt: raw.excerpt || raw.description?.[0] || "",
    content: contentArr,
    highlights: Array.isArray(highlights) ? highlights.map((h: any) => (typeof h === "string" ? h : h.description || h.title)) : undefined as unknown as string[],
    tags: typeof raw.tags === "string" ? raw.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : Array.isArray(raw.tags) ? raw.tags : [],
    sectionTag: raw.sectionTag || "",
    category: raw.category || "",
    heading: raw.heading || "",
    galleryImages: images,
    galleryNote: raw.galleryNote || "",
    medicalSupportPdf: getFullUrl(raw.medicalSupportPdf || raw.pdfUrl) || "",
    keypoints: { sectionTitle: keypointsSectionTitle, items: keypointsItems },
    cards,
    fullContent: raw.fullContent || raw.contentHtml || "",
    published: raw.published !== false,
  };
}

function safeTransformBlog(raw: any, index: number): Blog | null {
  try { return transformBlog(raw); } catch { return null; }
}

export async function fetchBlogs(): Promise<Blog[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const { data } = await api.get("/blogs", { params: { limit: 100 }, signal: controller.signal });
    clearTimeout(timeout);
    const items = data?.data || data || [];
    if (Array.isArray(items) && items.length > 0) {
      const mapped = items.map(safeTransformBlog).filter(Boolean) as Blog[];
      if (mapped.length > 0) return mapped;
    }
  } catch { /* fallback */ }
  return fallbackBlogs;
}

export function getBlogBySlug(slug: string, blogsList: Blog[]): Blog | undefined {
  return blogsList.find((b) => b.slug === slug);
}

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>(fallbackBlogs);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchBlogs().then(setBlogs).finally(() => setLoading(false)); }, []);
  return { blogs, loading };
}
