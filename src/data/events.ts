import { useState, useEffect } from "react";
import { format } from "date-fns";
import api, { getFullUrl } from "@/lib/api";
import program1 from "@/assets/program-1.jpg";
import program2 from "@/assets/program-2.jpg";
import program3 from "@/assets/program-3.jpg";
import program4 from "@/assets/program-4.jpg";

export type EventItem = {
  slug: string;
  img: string;
  day: string;
  mon: string;
  title: string;
  desc: string;
  date: string;
  time: string;
  loc: string;
  address: string;
  organizer: string;
  contact: string;
  category: string;
  seats: string;
  fee: string;
  about: string[];
  highlights: string[];
  agenda: { time: string; title: string; detail: string }[];
  speakers: { name: string; role: string }[];
  status: "upcoming" | "past";
};

const fallbackEvents: EventItem[] = [
  { slug: "sunday-healing-prayer-service", img: program3, day: "Every", mon: "Sun", title: "Sunday Healing & Miracle Worship Service", desc: "Join our Sunday worship, powerful praise, and healing prayer with Pastor Ramesh Kumar.", date: "Every Sunday", time: "10:00 AM - 1:00 PM", loc: "Mustafabad, Azamgarh", address: "Village - Mustafabad, Post- Gujarpar, Azamgarh, U.P.", organizer: "RK MINISTRIES", contact: "+91 95980 59289", category: "Worship", seats: "Open for all", fee: "Free", about: ["Weekly spiritual fellowship, live praise & worship, deliverance and healing prayers."], highlights: ["Live anointed worship", "Special intercessory healing prayers"], agenda: [{ time: "10:00 AM", title: "Opening Praise & Worship", detail: "Songs in Hindi & Bhojpuri." }, { time: "11:15 AM", title: "Word of God", detail: "Sermon by Pastor Ramesh Kumar." }, { time: "12:15 PM", title: "Personal Healing Prayer", detail: "Anointing of the sick." }], speakers: [{ name: "Pastor Ramesh Kumar", role: "Chairman / Senior Pastor" }], status: "upcoming" },
  { slug: "friday-fasting-prayer", img: program4, day: "Every", mon: "Fri", title: "Friday Fasting Prayer & Intercession", desc: "Come together for fasting, repentance, and praying for the nation, families, and sick.", date: "Every Friday", time: "11:00 AM - 3:00 PM", loc: "RK Ministries Prayer Hall", address: "Village - Mustafabad, Mubarakpur, Azamgarh, U.P.", organizer: "RK MINISTRIES", contact: "+91 95980 59289", category: "Prayer", seats: "Open for all", fee: "Free", about: ["Fasting prayer dedicated to spiritual breakthroughs, deliverance, and family peace."], highlights: ["Breakthrough prayers", "Individual prayer counseling"], agenda: [{ time: "11:00 AM", title: "Scripture Reading", detail: "Promises from Psalms & Gospels." }, { time: "1:00 PM", title: "Chain Intercession", detail: "Prayers for community and nation." }], speakers: [{ name: "Pastor Ramesh Kumar", role: "Senior Pastor" }], status: "upcoming" },
  { slug: "village-outreach-gospel-fellowship", img: program1, day: "15", mon: "Jul", title: "Rural Village Gospel & Love Outreach", desc: "Free medical aid, blanket & ration distribution, and sharing the Love of Christ in rural Azamgarh.", date: "15 July 2026", time: "10:00 AM - 3:00 PM", loc: "Gujarpar / Mubarakpur, Azamgarh", address: "Post- Gujarpar, Police station- Mubarakpur, Azamgarh", organizer: "RK MINISTRIES", contact: "+91 95980 59289", category: "Outreach", seats: "500 Families", fee: "Free", about: ["Demonstrating God's love through practical charitable assistance and community care."], highlights: ["Free ration kits for widows", "Personal prayer and counseling"], agenda: [{ time: "10:00 AM", title: "Community Welcome", detail: "Gathering and prayer." }, { time: "11:30 AM", title: "Aid Distribution", detail: "Essential supplies distribution." }], speakers: [{ name: "Ministry Field Workers", role: "Outreach Team" }], status: "upcoming" },
  { slug: "holy-baptism-service", img: program2, day: "28", mon: "Jul", title: "Holy Water Baptism Service (पवित्र जल बपतिस्मा)", desc: "Solemn celebration of water baptism for new believers following Matthew 28:19.", date: "28 July 2026", time: "9:00 AM - 12:00 PM", loc: "RK Ministries Baptismal Pool", address: "Village - Mustafabad, Mubarakpur, Azamgarh, U.P.", organizer: "RK MINISTRIES", contact: "+91 95980 59289", category: "Baptism", seats: "Candidates & Families", fee: "Free", about: ["Public confession of faith in Lord Jesus Christ, witness declarations and certificate distribution."], highlights: ["Official Baptism Certificate issued", "Blessing and family prayer"], agenda: [{ time: "09:00 AM", title: "Witness Verification", detail: "Review of 2 witness declarations." }, { time: "10:00 AM", title: "Water Baptism", detail: "In the name of the Father, Son & Holy Spirit." }], speakers: [{ name: "Pastor Ramesh Kumar", role: "Chairman / Pastor" }], status: "upcoming" },
];

function transformEvent(raw: any): EventItem {
  const d = raw.date ? new Date(raw.date) : new Date();
  const day = format(d, "dd");
  const mon = format(d, "MMM");
  const dateStr = format(d, "dd MMM yyyy");

  const highlights = raw.highlights?.map((h: any) => h.title || h.description || h) || raw.highlights || [];
  const status = raw.status === "completed" ? "past" : raw.status === "upcoming" ? "upcoming" : "upcoming";

  return {
    slug: raw.slug,
    img: getFullUrl(raw.image) || raw.img || "",
    day,
    mon,
    title: raw.heading || raw.title || "",
    desc: raw.description?.[0] || raw.description || "",
    date: dateStr,
    time: raw.time || "10:00 AM onwards",
    loc: raw.location || raw.loc || "",
    address: raw.address || raw.location || "",
    organizer: raw.organizer || "RK MINISTRIES",
    contact: raw.phoneNumber || raw.contact || "+91 95980 59289",
    category: raw.category || raw.sectionTag || "",
    seats: raw.maxAttendees ? `${raw.maxAttendees} Attendees` : raw.seats || "Open for all",
    fee: raw.fee || "Free",
    about: Array.isArray(raw.description) && raw.description.length > 0 ? raw.description : [raw.description || ""],
    highlights: Array.isArray(highlights) ? highlights.map((h: any) => (typeof h === "string" ? h : h.title || h.description)) : [],
    agenda: raw.agenda || [],
    speakers: raw.speakers || [],
    status: status as "upcoming" | "past",
  };
}

function safeTransformEvent(raw: any, index: number): EventItem | null {
  try { return transformEvent(raw); } catch { return null; }
}

export async function fetchEvents(): Promise<EventItem[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const { data } = await api.get("/events", { params: { limit: 100 }, signal: controller.signal });
    clearTimeout(timeout);
    const items = data?.data || data || [];
    if (Array.isArray(items) && items.length > 0) {
      const mapped = items.map(safeTransformEvent).filter(Boolean) as EventItem[];
      if (mapped.length > 0) return mapped;
    }
  } catch { /* fallback */ }
  return fallbackEvents;
}

export function getEvent(slug: string, eventsList: EventItem[]): EventItem | undefined {
  return eventsList.find((e) => e.slug === slug);
}

export function useEvents() {
  const [events, setEvents] = useState<EventItem[]>(fallbackEvents);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchEvents().then(setEvents).finally(() => setLoading(false)); }, []);
  return { events, loading };
}
