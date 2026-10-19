import { useState, useEffect } from "react";
import api, { getFullUrl } from "@/lib/api";
import gallery1 from "@/assets/Causes/GirlChildEducation.png";
import gallery2 from "@/assets/Blogs/HealthAwareness.png";
import gallery3 from "@/assets/herosection/NariSashaktikaran.png";
import gallery4 from "@/assets/Causes/LivelihoodSkills.png";
import gallery5 from "@/assets/Blogs/EmpoweringRuralWomen.png";
import gallery6 from "@/assets/herosection/Shiksha.png";

export type GalleryItem = {
  _id: string;
  slug: string;
  title: string;
  type: "image" | "video";
  mediaUrl: string;
  thumbnail: string;
  category: string;
  description: string;
};

const fallbackGallery: GalleryItem[] = [
  { _id: "fb1", slug: "girl-child-education", title: "Girl Child Education", type: "image", mediaUrl: gallery1, thumbnail: "", category: "Education", description: "Empowering young girls through education." },
  { _id: "fb2", slug: "health-awareness", title: "Health Awareness Camp", type: "image", mediaUrl: gallery2, thumbnail: "", category: "Health", description: "Spreading health awareness in rural communities." },
  { _id: "fb3", slug: "nari-sashaktikaran", title: "Women Empowerment", type: "image", mediaUrl: gallery3, thumbnail: "", category: "Events", description: "Celebrating women empowerment." },
  { _id: "fb4", slug: "livelihood-skills", title: "Livelihood & Skills", type: "image", mediaUrl: gallery4, thumbnail: "", category: "Livelihood", description: "Skill development programs for sustainable income." },
  { _id: "fb5", slug: "empowering-rural-women", title: "Empowering Rural Women", type: "image", mediaUrl: gallery5, thumbnail: "", category: "Education", description: "Rural women taking charge of their future." },
  { _id: "fb6", slug: "shiksha", title: "Education", type: "image", mediaUrl: gallery6, thumbnail: "", category: "Education", description: "Education initiatives for all." },
  { _id: "demo-video-1", slug: "community-programs", title: "Community Programs", type: "video", mediaUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", thumbnail: gallery1, category: "Programs", description: "Highlights from our community programs." },
  { _id: "demo-video-2", slug: "women-empowerment", title: "Women Empowerment", type: "video", mediaUrl: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4", thumbnail: gallery3, category: "Empowerment", description: "Stories of empowerment and community action." },
  { _id: "demo-video-3", slug: "education-initiative", title: "Education Initiative", type: "video", mediaUrl: "https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4", thumbnail: gallery6, category: "Education", description: "Education initiatives creating new opportunities." },
];

function transformGalleryItem(raw: any): GalleryItem {
  return {
    _id: raw._id || raw.id || "",
    slug: raw.slug || raw._id || raw.title?.toLowerCase().replace(/\s+/g, "-") || "",
    title: raw.title || raw.heading || "",
    type: raw.type === "video" ? "video" : "image",
    mediaUrl: getFullUrl(raw.mediaUrl || raw.image || raw.img || "") || "",
    thumbnail: getFullUrl(raw.thumbnail || "") || "",
    category: raw.category || raw.sectionTag || "",
    description: raw.description || raw.desc || "",
  };
}

function safeTransformGalleryItem(raw: any, index: number): GalleryItem | null {
  try { return transformGalleryItem(raw); } catch { return null; }
}

export async function fetchGallery(): Promise<GalleryItem[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const { data } = await api.get("/gallery", { params: { limit: 100 }, signal: controller.signal });
    clearTimeout(timeout);
    const items = data?.data || data || [];
    if (Array.isArray(items) && items.length > 0) {
      const mapped = items.map(safeTransformGalleryItem).filter(Boolean) as GalleryItem[];
      if (mapped.length > 0) return mapped;
    }
  } catch { /* fallback */ }
  return fallbackGallery;
}

export function useGallery() {
  const [items, setItems] = useState<GalleryItem[]>(fallbackGallery);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchGallery().then(setItems).finally(() => setLoading(false)); }, []);
  return { items, loading };
}
