import { useState, useEffect } from "react";
import { format } from "date-fns";
import api, { getFullUrl } from "@/lib/api";
import sundayWorshipImg from "@/assets/events/sunday-worship.jpg";
import holyBaptismImg from "@/assets/events/holy-baptism.jpg";
import fastingPrayerImg from "@/assets/events/fasting-prayer.jpg";
import villageOutreachImg from "@/assets/events/village-outreach.jpg";

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
  {
    slug: "sunday-healing-prayer-service",
    img: sundayWorshipImg,
    day: "Every",
    mon: "Sun",
    title: "प्रभु यीशु मसीह रविवार महान चंगाई व आराधना महोत्सव",
    desc: "प्रभु यीशु मसीह के सामर्थी नाम में रविवार की विशेष आराधना, स्तुति प्रशंसा और बीमारों व दुखियों के लिए चंगाई प्रार्थना।",
    date: "Every Sunday (प्रत्येक रविवार)",
    time: "10:00 AM - 1:30 PM",
    loc: "आरके मिनिस्ट्रीज मुख्य प्रार्थना भवन, आजमगढ़",
    address: "ग्राम - मुस्तफाबाद, पोस्ट- गूजरपार, आजमगढ़, उत्तर प्रदेश",
    organizer: "RK MINISTRIES",
    contact: "+91 94153 14486",
    category: "आराधना व चंगाई",
    seats: "सभी के लिए खुला है",
    fee: "निःशुल्क (Free)",
    about: [
      "प्रभु यीशु मसीह के पवित्र नाम में हर रविवार को आरके मिनिस्ट्रीज में विशाल प्रार्थना व चंगाई सभा आयोजित की जाती है।",
      "यहाँ सैकड़ों विश्वासी प्रभु यीशु मसीह की जीवित उपस्थिति में आत्मिक शांति, पापों से क्षमा और बीमारियों से चंगाई पाते हैं।",
      "पास्टर रमेश कुमार द्वारा प्रभु यीशु मसीह के पवित्र वचन का प्रभावशाली प्रचार और बीमारों पर हाथ रखकर विशेष चंगाई प्रार्थना की जाती है।"
    ],
    highlights: [
      "प्रभु यीशु मसीह के नाम में अद्भुत चंगाई व छुटकारा",
      "आत्मा और सच्चाई से स्तुति व जीवंत आराधना",
      "भोजपुरी व हिंदी में प्रभु यीशु मसीह के भक्ति भजन",
      "बीमारों, लाचारों और संकटग्रस्तों के लिए व्यक्तिगत प्रार्थना"
    ],
    agenda: [
      { time: "10:00 AM", title: "शुरुआती स्तुति व आराधना", detail: "प्रभु यीशु मसीह की महिमा में हिंदी व भोजपुरी भक्ति गीत।" },
      { time: "11:15 AM", title: "प्रभु यीशु मसीह का पवित्र वचन", detail: "पास्टर रमेश कुमार द्वारा जीवन बदलने वाला सुसमाचार संदेश।" },
      { time: "12:15 PM", title: "महान चंगाई व छुटकारा प्रार्थना", detail: "बीमारों और जरूरतमंदों पर हाथ रखकर विशेष प्रार्थना।" },
      { time: "01:00 PM", title: "गवाहियां व आशीर्वचन", detail: "प्रभु यीशु मसीह द्वारा किए गए अद्भुत कार्यों की गवाही व समापन आशीष।" }
    ],
    speakers: [{ name: "Pastor Ramesh Kumar", role: "Chairman / Senior Pastor" }],
    status: "upcoming"
  },
  {
    slug: "friday-fasting-prayer",
    img: fastingPrayerImg,
    day: "Every",
    mon: "Fri",
    title: "प्रभु यीशु मसीह शुक्रवार उपवास व विशेष छुटकारा प्रार्थना सभा",
    desc: "प्रभु यीशु मसीह के पवित्र चरणों में उपवास, पश्चाताप, परिवारों की शांति और संकटों से आत्मिक छुटकारे हेतु सामूहिक प्रार्थना।",
    date: "Every Friday (प्रत्येक शुक्रवार)",
    time: "11:00 AM - 3:00 PM",
    loc: "आरके मिनिस्ट्रीज प्रार्थना भवन, आजमगढ़",
    address: "ग्राम - मुस्तफाबाद, मुबारकपुर, आजमगढ़, उत्तर प्रदेश",
    organizer: "RK MINISTRIES",
    contact: "+91 94153 14486",
    category: "उपवास प्रार्थना",
    seats: "सभी के लिए खुला है",
    fee: "निःशुल्क (Free)",
    about: [
      "प्रभु यीशु मसीह ने सिखाया कि प्रार्थना और उपवास के द्वारा अंधकार की शक्तियां और बड़े-बड़े संकट दूर होते हैं।",
      "प्रत्येक शुक्रवार को आरके मिनिस्ट्रीज में उपवास प्रार्थना सभा होती है जहाँ विश्वासी अपने परिवारों, समाज और देश के कल्याण हेतु मध्यस्थता प्रार्थना करते हैं।",
      "प्रभु यीशु मसीह के सामर्थ से दुष्ट आत्माओं, नशे की लत, अशांति और पारिवारिक कलह से पूर्ण छुटकारा मिलता है।"
    ],
    highlights: [
      "प्रभु यीशु मसीह के समक्ष सामूहिक उपवास व पश्चाताप",
      "पारिवारिक कलह और आर्थिक तंगी से छुटकारे की प्रार्थना",
      "पवित्र बाइबिल के सामर्थी वचनों का मनन व अध्ययन",
      "व्यक्तिगत आत्मिक परामर्श व विशेष आशीष"
    ],
    agenda: [
      { time: "11:00 AM", title: "पवित्र बाइबिल पाठ व स्तुति", detail: "भजन संहिता और प्रभु यीशु मसीह की प्रतिज्ञाओं का पठन।" },
      { time: "12:30 PM", title: "मध्यस्थता उपवास प्रार्थना", detail: "देश, समाज और परिवारों के उद्धार के लिए पुकार।" },
      { time: "02:00 PM", title: "छुटकारा प्रार्थना व परामर्श", detail: "व्यक्तिगत समस्याओं के लिए पास्टर जी द्वारा प्रार्थना।" }
    ],
    speakers: [{ name: "Pastor Ramesh Kumar", role: "Senior Pastor" }],
    status: "upcoming"
  },
  {
    slug: "holy-baptism-service",
    img: holyBaptismImg,
    day: "28",
    mon: "Jul",
    title: "प्रभु यीशु मसीह पवित्र जल बपतिस्मा दीक्षा समारोह",
    desc: "प्रभु यीशु मसीह के सुसमाचार पर विश्वास लाकर नए विश्वासियों का पवित्र जल बपतिस्मा एवं मसीही शिष्यत्व समर्पण।",
    date: "28 July 2026",
    time: "9:00 AM - 12:30 PM",
    loc: "आरके मिनिस्ट्रीज बपतिस्मा सरोवर, आजमगढ़",
    address: "मुस्तफाबाद, मुबारकपुर, आजमगढ़, उत्तर प्रदेश",
    organizer: "RK MINISTRIES",
    contact: "+91 94153 14486",
    category: "पवित्र बपतिस्मा",
    seats: "विश्वासी एवं परिवार",
    fee: "निःशुल्क (Free)",
    about: [
      "प्रभु यीशु मसीह की आज्ञा (मत्ती 28:19) के अनुसार पिता, पुत्र और पवित्र आत्मा के नाम में पवित्र जल बपतिस्मा दिया जाता है।",
      "यह प्रभु यीशु मसीह के साथ पुराने जीवन की मृत्यु और नए पवित्र जीवन में जी उठने का सार्वजानिक साक्षी पर्व है।",
      "बपतिस्मा प्राप्त करने वाले प्रत्येक विश्वासी को प्रभु यीशु मसीह की कलीसिया में आधिकारिक सदस्यता एवं बपतिस्मा प्रमाण पत्र प्रदान किया जाता है।"
    ],
    highlights: [
      "प्रभु यीशु मसीह के आदेशानुसार जल में विसर्जन बपतिस्मा",
      "गवाहों के समक्ष मसीही विश्वास की सार्वजनिक स्वीकारोक्ति",
      "आधिकारिक बपतिस्मा प्रमाण पत्र (Baptism Certificate) वितरण",
      "नए विश्वासी परिवारों के लिए सामूहिक भोज व आशीष"
    ],
    agenda: [
      { time: "09:00 AM", title: "बपतिस्मा परीक्षार्थी सत्यापन", detail: "विश्वास की स्वीकारोक्ति एवं दो गवाहों की पुष्टि।" },
      { time: "10:00 AM", title: "पवित्र जल बपतिस्मा विधि", detail: "पिता, पुत्र और पवित्र आत्मा के नाम में जल बपतिस्मा।" },
      { time: "11:30 AM", title: "प्रमाण पत्र व समर्पण प्रार्थना", detail: "बपतिस्मा प्रमाण पत्र वितरण और नव-बपतिस्मा धारकों के लिए प्रार्थना।" }
    ],
    speakers: [{ name: "Pastor Ramesh Kumar", role: "Senior Pastor / Chairman" }],
    status: "upcoming"
  },
  {
    slug: "village-outreach-gospel-fellowship",
    img: villageOutreachImg,
    day: "15",
    mon: "Aug",
    title: "प्रभु यीशु मसीह ग्रामीण सुसमाचार प्रचार व प्रेम सेवा संगति",
    desc: "प्रभु यीशु मसीह के प्रेम व करुणा का संदेश लेकर दूर-दराज के गांवों में सुसमाचार सभा, निःशुल्क राशन किट व कंबल वितरण।",
    date: "15 August 2026",
    time: "10:00 AM - 3:00 PM",
    loc: "गूजरपार व मुबारकपुर ग्रामीण क्षेत्र, आजमगढ़",
    address: "पोस्ट - गूजरपार, थाना - मुबारकपुर, आजमगढ़",
    organizer: "RK MINISTRIES",
    contact: "+91 94153 14486",
    category: "सुसमाचार प्रचार",
    seats: "500+ ग्रामीण परिवार",
    fee: "निःशुल्क (Free)",
    about: [
      "'सारे जगत में जाकर सारी सृष्टि के लोगों को सुसमाचार प्रचार करो' - प्रभु यीशु मसीह की इस आज्ञा का पालन करते हुए आरके मिनिस्ट्रीज सुदूर ग्रामीण अंचलों में सुसमाचार प्रचार करती है।",
      "प्रभु यीशु मसीह के असीम प्रेम को क्रियात्मक रूप देते हुए असहाय विधवाओं, निर्धनों और वृद्धों को राशन किट व वस्त्र सहायता प्रदान की जाती है।",
      "गांव के परिवारों के लिए सुख-शांति, रोगमुक्ति और प्रभु यीशु मसीह की आशीषों हेतु सामूहिक प्रार्थना की जाती है।"
    ],
    highlights: [
      "प्रभु यीशु मसीह के प्रेम, शांति और मोक्ष का संदेश",
      "निःशुल्क खाद्य राशन किट व वस्त्र वितरण सेवा",
      "ग्रामीण बच्चों के लिए संडे स्कूल व स्टेशनरी किट",
      "गांव के बीमार व असहाय जनों के लिए घर-घर जाकर प्रार्थना"
    ],
    agenda: [
      { time: "10:00 AM", title: "ग्रामीण सभा व सुसमाचार स्वागत", detail: "भजन कीर्तन और गांववासियों का स्वागत।" },
      { time: "11:30 AM", title: "प्रभु यीशु मसीह के वचन का प्रचार", detail: "सच्चे प्रेम और उद्धार का संदेश।" },
      { time: "12:30 PM", title: "राशन व वस्त्र सहायता वितरण", detail: "विधवाओं व गरीब परिवारों को खाद्य सामग्री भेंट।" },
      { time: "01:30 PM", title: "चंगाई प्रार्थना व आशीष", detail: "ग्रामीणों के लिए व्यक्तिगत प्रार्थना व समापन।" }
    ],
    speakers: [{ name: "Ministry Outreach Team", role: "Evangelism & Relief" }],
    status: "upcoming"
  },
];

function transformEvent(raw: any): EventItem {
  let day = "Sun";
  let mon = "Worship";
  let dateStr = "Every Sunday";
  if (raw.date) {
    const d = new Date(raw.date);
    if (!isNaN(d.getTime())) {
      day = format(d, "dd");
      mon = format(d, "MMM");
      dateStr = format(d, "dd MMM yyyy");
    }
  }

  const highlights = raw.highlights?.map((h: any) => (typeof h === "string" ? h : h.title || h.description || "")) || [];
  const status = raw.status === "completed" ? "past" : raw.status === "upcoming" ? "upcoming" : "upcoming";

  let about: string[] = [];
  let desc = "";
  if (Array.isArray(raw.description)) {
    about = raw.description.filter(Boolean);
    desc = about[0] || "";
  } else if (typeof raw.description === "string") {
    about = raw.description.split(/\n\n+/).map((s: string) => s.trim()).filter(Boolean);
    desc = about[0] || "";
  }

  return {
    slug: raw.slug || "",
    img: getFullUrl(raw.image) || raw.img || "",
    day,
    mon,
    title: raw.heading || raw.title || "",
    desc,
    date: raw.dateText || dateStr,
    time: raw.time || "10:00 AM onwards",
    loc: raw.location || raw.loc || "आरके मिनिस्ट्रीज मुख्य प्रार्थना भवन, आजमगढ़",
    address: raw.address || raw.location || "ग्राम - मुस्तफाबाद, पोस्ट- गूजरपार, आजमगढ़, उत्तर प्रदेश",
    organizer: raw.organizer || "RK MINISTRIES",
    contact: raw.phoneNumber || raw.contact || "+91 94153 14486",
    category: raw.category || raw.sectionTag || "आराधना व चंगाई",
    seats: raw.maxAttendees ? `${raw.maxAttendees} Attendees` : raw.seats || "सभी के लिए खुला है",
    fee: raw.fee || "निःशुल्क (Free)",
    about: about.length > 0 ? about : [desc],
    highlights: highlights.filter(Boolean),
    agenda: raw.agenda || [],
    speakers: raw.speakers || [{ name: "Pastor Ramesh Kumar", role: "Chairman / Senior Pastor" }],
    status: status as "upcoming" | "past",
  };
}

function safeTransformEvent(raw: any, index: number): EventItem | null {
  try { return transformEvent(raw); } catch { return null; }
}

export async function fetchEvents(): Promise<EventItem[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
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

export async function fetchEventBySlug(slug: string): Promise<EventItem | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const { data } = await api.get(`/events/${slug}`, { signal: controller.signal });
    clearTimeout(timeout);
    const raw = data?.data || data;
    if (raw && (raw.slug || raw._id)) {
      return transformEvent(raw);
    }
  } catch { /* fallback */ }
  return null;
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
