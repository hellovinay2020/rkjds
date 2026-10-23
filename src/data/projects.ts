import { useState, useEffect } from "react";
import { format } from "date-fns";
import api, { getFullUrl } from "@/lib/api";
import villageGospelImg from "@/assets/project/village-gospel.jpg";
import holyBaptismImg from "@/assets/project/holy-baptism.jpg";
import healingPrayerImg from "@/assets/project/healing-prayer.jpg";
import compassionReliefImg from "@/assets/project/compassion-relief.jpg";
import bibleDistImg from "@/assets/project/bible-distribution.jpg";
import healthCareImg from "@/assets/Our Programs/HealthSafetyCampaign.png";
import disasterReliefImg from "@/assets/Our Programs/EducationSupportInitiative.png";

export type Project = {
  slug: string;
  img: string;
  title: string;
  desc: string;
  impact: string;
  loc: string;
  tag: string;
  started: string;
  about: string[];
  objectives: string[];
  activities: { title: string; desc: string }[];
  stats: { label: string; value: string }[];
  locations: string[];
};

const fallbackProjects: Project[] = [
  {
    slug: "village-gospel-fellowship",
    img: villageGospelImg,
    title: "Village Gospel Outreach & Fellowship (ग्राम संगति व सुसमाचार प्रचार)",
    desc: "Spreading the gospel of Lord Jesus Christ, holding open-air prayer meetings and establishing village fellowships across rural Uttar Pradesh.",
    impact: "3,500+ Believers",
    loc: "Azamgarh & Rural UP",
    tag: "Gospel Fellowship",
    started: "2018",
    about: [
      "Under RK Ministries, Pastor Ramesh Kumar leads village gospel outreaches across remote villages of Azamgarh, Mau, and Eastern Uttar Pradesh.",
      "Weekly village prayer fellowships bring families together to hear the living word of God, find peace in Christ, and experience spiritual renewal.",
      "We provide spiritual guidance, counselling for troubled families, and foster communal harmony and love through Christ's teachings."
    ],
    objectives: [
      "Proclaim the good news of the gospel to remote rural villages",
      "Plant and nurture village prayer fellowship cells",
      "Provide personal pastoral guidance and family counselling",
      "Distribute spiritual literature and Bibles in local languages",
      "Foster unity, peace, and spiritual transformation"
    ],
    activities: [
      { title: "Village Prayer Meetings", desc: "Open-air worship, gospel preaching, and intercession." },
      { title: "Pastoral Visitation", desc: "Visiting village families, praying for homes and peace." },
      { title: "Fellowship Building", desc: "Training local church believers and village prayer leaders." },
      { title: "Spiritual Counselling", desc: "Guidance for families dealing with distress or illness." }
    ],
    stats: [
      { label: "Villages Reached", value: "85+" },
      { label: "Fellowship Groups", value: "40+" }
    ],
    locations: ["Azamgarh", "Mubarakpur", "Mau", "Eastern UP"]
  },
  {
    slug: "healing-prayer-ministry",
    img: healingPrayerImg,
    title: "Healing Prayer & Fasting Deliverance Ministry (चंगाई व उपवास प्रार्थना)",
    desc: "Dedicated weekly Sunday and Friday fasting prayer services interceding for the sick, broken-hearted, and burdened souls.",
    impact: "10,000+ Prayers",
    loc: "Mubarakpur, Azamgarh",
    tag: "Prayer & Healing",
    started: "2016",
    about: [
      "RK Ministries conducts dedicated healing and fasting prayer services where hundreds gather seeking miraculous divine intervention and deliverance.",
      "With laying on of hands and heartfelt corporate intercession in the name of Jesus Christ, believers testify to healing from prolonged illnesses and peace of mind.",
      "A special pastoral prayer helpline supports believers in urgent spiritual, health, or emotional emergencies."
    ],
    objectives: [
      "Conduct weekly Friday fasting prayers and Sunday worship services",
      "Intercede for the sick, terminally ill, and distressed",
      "Provide a sanctuary of hope, spiritual comfort, and healing",
      "Maintain a dedicated pastoral prayer emergency line"
    ],
    activities: [
      { title: "Friday Fasting Prayer", desc: "Deep intercession and repentance for family restoration." },
      { title: "Healing Service", desc: "Prayer with laying of hands for physical and spiritual wholeness." },
      { title: "Testimony Sharing", desc: "Glorifying God through personal testimonies of healing." },
      { title: "Emergency Helpline", desc: "Pastoral telephone prayer for families in distress." }
    ],
    stats: [
      { label: "Weekly Attendees", value: "1,200+" },
      { label: "Documented Testimonies", value: "950+" }
    ],
    locations: ["Mubarakpur", "Azamgarh", "Uttar Pradesh"]
  },
  {
    slug: "holy-baptism-mission",
    img: holyBaptismImg,
    title: "Holy Water Baptism & Spiritual Discipleship (पवित्र जल बपतिस्मा)",
    desc: "Guiding new believers through repentance, water baptism in the name of the Father, Son, and Holy Spirit, and foundational discipleship.",
    impact: "850+ Baptisms",
    loc: "Uttar Pradesh",
    tag: "Discipleship",
    started: "2017",
    about: [
      "Water baptism is a solemn commandment of Lord Jesus Christ, marking the public confession of faith and beginning of a transformed holy life.",
      "RK Ministries provides thorough biblical catechism, pre-baptism counseling, and spiritual mentorship to prepare believers for this sacred commitment.",
      "New believers are welcomed into church fellowship and assigned mentors to grow in prayer, scripture reading, and righteous living."
    ],
    objectives: [
      "Administer biblical water baptism by immersion",
      "Provide foundational biblical teachings and doctrines",
      "Mentor new believers into strong Christian walk and discipleship",
      "Strengthen local church family and spiritual accountability"
    ],
    activities: [
      { title: "Baptism Preparatory Classes", desc: "Weekly classes exploring the biblical significance of baptism." },
      { title: "River & Water Immersion", desc: "Sacred baptism services conducted with solemnity and joy." },
      { title: "Post-Baptism Discipleship", desc: "Systematic Bible study on Christian living and faith." },
      { title: "Certificate of Baptism", desc: "Official church record and ministry documentation." }
    ],
    stats: [
      { label: "Baptisms Administered", value: "850+" },
      { label: "Discipleship Batches", value: "32+" }
    ],
    locations: ["Azamgarh", "Mau", "Varanasi Region"]
  },
  {
    slug: "compassion-widow-relief",
    img: compassionReliefImg,
    title: "Christian Compassion: Widow & Poor Relief (विधवा व निर्धन सहायता)",
    desc: "Following Christ's command to care for widows and fatherless through monthly food ration kits, warm blankets, and medical support.",
    impact: "1,200+ Families",
    loc: "Azamgarh & Eastern UP",
    tag: "Charity & Relief",
    started: "2019",
    about: [
      "Pure and undefiled religion before God is to visit the fatherless and widows in their affliction. RK Ministries puts Christ's love into direct action.",
      "We provide monthly grocery kits containing flour, rice, pulses, oil, spices, and hygiene essentials to destitute widows who have no breadwinner.",
      "During cold winters, we distribute warm blankets, clothes, and arrange free medical consultations and prescription medicines."
    ],
    objectives: [
      "Support destitute widows with dignity and monthly nutrition",
      "Distribute winter blankets and warm clothing in remote colonies",
      "Assist impoverished families with emergency medical funds",
      "Demonstrate Christ's unconditional love through humanitarian relief"
    ],
    activities: [
      { title: "Monthly Grocery Kits", desc: "Flour, rice, dal, cooking oil and essentials for vulnerable widows." },
      { title: "Winter Blanket Drive", desc: "Distributing quality blankets to poor families each winter." },
      { title: "Medical Aid Support", desc: "Financial help for essential medicines and healthcare checkups." },
      { title: "Widow Fellowship & Prayer", desc: "Monthly gathering providing emotional comfort and prayer." }
    ],
    stats: [
      { label: "Widow Families Supported", value: "1,200+" },
      { label: "Blankets Distributed", value: "4,500+" }
    ],
    locations: ["Mubarakpur", "Azamgarh", "Uttar Pradesh"]
  },
  {
    slug: "bible-distribution-education",
    img: bibleDistImg,
    title: "Holy Bible Distribution & Sunday School (पवित्र बाइबिल वितरण व संडे स्कूल)",
    desc: "Providing free Hindi Holy Bibles to seekers, scripture study materials, and Christian moral education to village children.",
    impact: "5,000+ Bibles",
    loc: "Eastern UP",
    tag: "Bible & Education",
    started: "2018",
    about: [
      "'Your word is a lamp to my feet and a light to my path.' RK Ministries distributes free copies of the Holy Bible in Hindi to village seekers and believers.",
      "Our vibrant Sunday School ministry teaches children Bible stories, hymns, scripture memory verses, and Christian moral values.",
      "We supply educational notebooks, stationery kits, and school bags to underprivileged children so they can excel in school and love God."
    ],
    objectives: [
      "Distribute free Holy Bibles and Gospel tracts to rural seekers",
      "Run weekly Sunday school classes with dedicated Christian teachers",
      "Provide school stationery kits and learning materials to poor kids",
      "Organize annual Vacation Bible School (VBS) and youth camps"
    ],
    activities: [
      { title: "Free Bible Distribution", desc: "Providing Holy Bibles and New Testaments to seekers." },
      { title: "Weekly Sunday School", desc: "Scripture lessons, Christian songs, and moral character education." },
      { title: "Student Stationery Kits", desc: "Notebooks, pens, bags for poor students." },
      { title: "Vacation Bible School", desc: "Annual joyful spiritual retreat for rural children and youth." }
    ],
    stats: [
      { label: "Bibles Distributed", value: "5,000+" },
      { label: "Children in Sunday School", value: "1,500+" }
    ],
    locations: ["Azamgarh", "Mau", "Gorakhpur Region"]
  },
  {
    slug: "health-care",
    img: healthCareImg,
    title: "Free Medical Camp & Community Health Initiative",
    desc: "Improving access to health awareness, free doctor checkups and essential medicine for underserved rural communities.",
    impact: "5,000+ People",
    loc: "Rural Uttar Pradesh",
    tag: "Medical Camp",
    started: "2021",
    about: [
      "RK Ministries works to make essential healthcare and free medicines accessible to families in rural and underserved communities.",
      "Through regular health camps and practical health guidance, we help people receive timely medical diagnosis and care.",
      "Our volunteers assist elderly and sick villagers in reaching hospitals for advanced treatment when needed."
    ],
    objectives: [
      "Organize free medical checkup camps in rural villages",
      "Distribute essential basic medicines free of charge",
      "Improve preventive health and hygiene awareness",
      "Assist needy patients with hospital referrals"
    ],
    activities: [
      { title: "Free Medical Camps", desc: "Regular doctor consultations and basic screenings in villages." },
      { title: "Free Medicine Distribution", desc: "Providing prescribed vitamins, fever medicines, and ointments." },
      { title: "Hygiene & Health Awareness", desc: "Practical hygiene education for rural mothers and children." },
      { title: "Hospital Referrals", desc: "Guiding emergency patients to district hospitals." }
    ],
    stats: [
      { label: "Patients Treated", value: "5,000+" },
      { label: "Medical Camps", value: "35+" }
    ],
    locations: ["Azamgarh", "Mau", "Uttar Pradesh"]
  },
  {
    slug: "disaster-relief",
    img: disasterReliefImg,
    title: "Emergency Flood & Disaster Relief Outreach",
    desc: "Providing timely emergency food rations, safe drinking water, and recovery aid to families affected by seasonal floods and emergencies.",
    impact: "3,000+ Families",
    loc: "Eastern Uttar Pradesh",
    tag: "Disaster Relief",
    started: "2020",
    about: [
      "When rural communities face severe flooding or emergencies, families need immediate humanitarian assistance.",
      "RK Ministries team responds swiftly with cooked meals, dry food packets, tarpaulins, and clean drinking water.",
      "We stand with affected families until normalcy is restored, demonstrating the living compassion of Christ."
    ],
    objectives: [
      "Provide immediate food and drinking water in flood-affected villages",
      "Distribute emergency tarpaulin shelters and clothing",
      "Coordinate local relief volunteers and rescue efforts",
      "Help families rebuild their lives with hope and dignity"
    ],
    activities: [
      { title: "Emergency Food Packets", desc: "Supplying dry rations and cooked food to stranded families." },
      { title: "Clean Water Supply", desc: "Distributing water bottles and purification tablets." },
      { title: "Tarpaulin & Clothing", desc: "Shelter assistance for displaced families." },
      { title: "Community Rebuilding", desc: "Helping rural homes restore clean living conditions." }
    ],
    stats: [
      { label: "Families Supported", value: "3,000+" },
      { label: "Relief Outreaches", value: "25+" }
    ],
    locations: ["Eastern Uttar Pradesh", "Azamgarh"]
  },
];

function safeTransform(raw: any): Project | null {
  try {
    let year = raw.started || "";
    if (raw.startDate) {
      const d = new Date(raw.startDate);
      if (!isNaN(d.getTime())) year = format(d, "yyyy");
    }
    const stats = raw.stats?.map((s: any) => ({ label: s.label || "", value: s.number || s.value || "" })) || raw.highlights?.map((h: any) => ({ label: h.title || "", value: h.description || "" })) || [];
    const highlights = raw.highlights?.map((h: any) => h.title || h.description || "") || [];
    const about = Array.isArray(raw.description)
      ? raw.description
      : (typeof raw.description === "string"
          ? raw.description.split(/\n\n+/).filter(Boolean)
          : (raw.description ? [raw.description] : []));
    const activities = (Array.isArray(raw.highlights) && raw.highlights.length > 0 && typeof raw.highlights[0] === 'object')
      ? raw.highlights.map((h: any) => ({ title: h.title || '', desc: h.description || '' })).filter((a: any) => a.title)
      : (raw.activities || highlights.slice(0, 4).map((h: string) => ({ title: h, desc: "" })));
    const objectives = (raw.keypoints?.items && raw.keypoints.items.length > 0)
      ? raw.keypoints.items
      : (raw.objectives || []);

    return {
      slug: raw.slug || "",
      img: getFullUrl(raw.image) || raw.img || "",
      title: raw.title || raw.heading || "",
      desc: typeof raw.description === "string" ? raw.description.split(/\n\n+/)[0] : (Array.isArray(raw.description) ? raw.description[0] : "") || "",
      impact: raw.impact || stats[0]?.value || "",
      loc: raw.loc || raw.location || "Azamgarh & Eastern UP",
      tag: raw.category || raw.sectionTag || raw.tag || "Ministry",
      started: year || "2018",
      about: about.length > 0 ? about : (raw.desc ? [raw.desc] : []),
      objectives,
      activities,
      stats: stats.slice(0, 4),
      locations: raw.locations || (raw.location ? [raw.location] : ["Azamgarh"]),
    };
  } catch {
    return null;
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const { data } = await api.get("/projects", { params: { limit: 100 } });
    const items = data?.data || data || [];
    if (Array.isArray(items) && items.length > 0) {
      const apiProjects: Project[] = [];
      for (const item of items) {
        const p = safeTransform(item);
        if (p) apiProjects.push(p);
      }
      if (apiProjects.length > 0) return apiProjects;
    }
  } catch { /* fallback */ }
  return fallbackProjects;
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const { data } = await api.get(`/projects/${slug}`);
    const item = data?.data || data;
    if (item) {
      const p = safeTransform(item);
      if (p) return p;
    }
  } catch { /* fallback */ }
  return fallbackProjects.find((p) => p.slug === slug) || null;
}

export function getProject(slug: string, projectsList: Project[]): Project | undefined {
  return projectsList.find((p) => p.slug === slug) || fallbackProjects.find((p) => p.slug === slug);
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchProjects().then(setProjects).finally(() => setLoading(false)); }, []);
  return { projects, loading };
}
