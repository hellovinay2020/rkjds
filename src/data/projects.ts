import { useState, useEffect } from "react";
import { format } from "date-fns";
import api, { getFullUrl } from "@/lib/api";
import balSanskarImg from "@/assets/project/Bal Sanskar-Providing Education to Slum Children.png";
import maaAnnapurnaImg from "@/assets/project/Maa Annapurna-Providing free food to the needy.png";
import saharaImg from "@/assets/project/Sahara-Supporting Widows.png";
import sakshamSkillImg from "@/assets/project/Saksham-Skill development project for Women's.png";
import svanaSevaImg from "@/assets/project/SVANA SEVA-Feeding the street Dogs.png";
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
  { slug: "saksham-women-project", img: sakshamSkillImg, title: "Saksham - Skill Development Project for Women", desc: "Skill development project empowering women through vocational training and entrepreneurship support.", impact: "2,500+ Women", loc: "8 States", tag: "Women", started: "2015", about: ["There are many women's who have the capability and ability to work hard and wants to provide financial support to their families but many fail to do so due to lack of skills.", "To empower such women's Mahila Chetna Samiti has taken an initiative to train such women's by providing free Computer Training courses, Stitching courses and Teachers training courses [ECCED].", "We also make sure that after pursuing this courses this women's have a carrier and get a job in the market and can be self dependent."], objectives: ["Provide free Computer Training courses", "Provide free Stitching courses", "Provide Teachers Training courses [ECCED]", "Provide vocational and digital skill training", "Facilitate self-help groups and micro-finance", "Help women get a job and become self dependent"], activities: [{ title: "Computer Training", desc: "Free computer literacy and digital skill courses." }, { title: "Stitching Courses", desc: "Hands-on tailoring and garment making training." }, { title: "Teachers Training [ECCED]", desc: "Early Childhood Care and Education training for careers as teachers." }, { title: "Skill Training Centers", desc: "Hands-on training in tailoring, beauty, computers." }, { title: "Job Placement Support", desc: "Market-linked career guidance and job placement." }, { title: "Entrepreneurship Bootcamps", desc: "Business basics and pitch coaching." }], stats: [{ label: "Women Trained", value: "2,500+" }, { label: "Self-Help Groups", value: "120" }], locations: ["Lucknow", "Kanpur", "Varanasi"] },
  { slug: "bal-sanskar-education", img: balSanskarImg, title: "Bal Sanskar - Providing Education to Slum Children", desc: "Bringing quality education and learning support to children living in slums and underserved areas.", impact: "1,500+ Children", loc: "Mumbai, Dahisar", tag: "Education", started: "2022", about: ["One major project Mahila Chetna Samiti is working on is educating kids in slum by opening a Pre-primary school which is being run under Foundation.", "The major reason to do this is because in today's day the fee structure of private schools have gone so high that the people in slums or remote areas cannot afford to pay that fees due to which many children's miss out the best years of learning.", "So to break this barrier foundation has started this school with all the best facilities.", "We thank you for your support and donations which will help us to provide basic things to students and to open up more centers in the future."], objectives: ["Run a Pre-primary school for slum children", "Provide quality education with the best facilities", "Make education affordable for slum and remote area families", "Enroll out-of-school children", "Provide study material and learning support", "Provide basic things to students", "Open up more centers in the future"], activities: [{ title: "Pre-primary School", desc: "Affordable pre-primary education for slum children." }, { title: "Quality Teaching", desc: "Trained teachers and best learning facilities." }, { title: "Study Kits", desc: "Books, bags and stationery distribution." }, { title: "Basic Needs Support", desc: "Essential items provided to students." }, { title: "Parent Awareness Drives", desc: "Engaging parents on the value of early education." }, { title: "New Centers", desc: "Expanding to open more centers in the future." }], stats: [{ label: "Children Educated", value: "1,500+" }, { label: "Learning Centers", value: "8" }], locations: ["Mumbai", "Dahisar"] },
  { slug: "maa-annapurna-food", img: maaAnnapurnaImg, title: "Maa Annapurna - Providing Free Food to the Needy", desc: "Daily free food distribution to the needy, homeless and marginalized communities.", impact: "50,000+ Meals", loc: "Mumbai", tag: "Food", started: "2020", about: ["A person can survive without any supply but its hard to survive with a Empty Stomach. According to the latest global index India is topping the charts in hunger rate.", "It is one of the biggest issues being faced by many. Many people come from places for the treatment of their loved ones suffering from different diseases.", "The family members are forced to stay out side the hospital and the lack proper access to food and shelter.", "Mahila Chetna Samiti has taken an initiative to feed such poor and people who are in need."], objectives: ["Fight hunger by providing free food to the needy", "Feed families who come to hospitals for their loved ones' treatment", "Provide food and basic support to people in need", "Set up feeding centers and distribution points", "Distribute food kits to marginalized communities", "Expand reach to combat India's hunger rate"], activities: [{ title: "Free Meal Distribution", desc: "Daily cooked meals at distribution points." }, { title: "Hospital Support Meals", desc: "Meals for families staying outside hospitals." }, { title: "Food Kits", desc: "Monthly ration kits for families in need." }, { title: "Feeding Centers", desc: "Community kitchens serving nutritious food." }, { title: "Hygiene & Water Support", desc: "Access to clean water and hygiene essentials." }, { title: "Community Outreach", desc: "Identifying and reaching the neediest families." }], stats: [{ label: "Meals Served", value: "50,000+" }, { label: "Distribution Points", value: "6" }], locations: ["Mumbai"] },
  { slug: "sahara-supporting-widows", img: saharaImg, title: "Sahara - Supporting Widows", desc: "Empowering widows with livelihood support, counseling and social security assistance.", impact: "800+ Women", loc: "Mumbai", tag: "Women", started: "2019", about: ["The loss of a spouse is a loss of a companion, a soul mate, Perhaps of income. Due to this big loss the women who have never stepped out of the house finds very difficult to full fill her basic needs.", "Mahila Chetna Samiti has taken an initiative to help such Widows by providing monthly groceries. With this help the family of the Widow will have one less thing to worry about and take care of her family and try to leave peacefully.", "My Karma also provides an extended support to such Widows in tough times of any emergencies like paying for their medications or their children's school fees."], objectives: ["Provide monthly groceries to widows", "Help widows and their families live peacefully", "Support medication costs during emergencies", "Support children's school fees of widowed families", "Extend help during tough times and emergencies", "Provide counseling and livelihood opportunities"], activities: [{ title: "Monthly Grocery Support", desc: "Monthly ration and groceries for widows." }, { title: "Emergency Medical Aid", desc: "Financial help for medications during emergencies." }, { title: "Children's Education Support", desc: "School fee support for children of widows." }, { title: "Counseling Support", desc: "Emotional and legal counseling for widows." }, { title: "Skill Training", desc: "Vocational training for self-employment." }, { title: "Livelihood Support", desc: "Helping widows become self dependent." }], stats: [{ label: "Women Supported", value: "800+" }, { label: "Skill Trainings", value: "60+" }], locations: ["Mumbai"] },
  { slug: "svana-seva-street-dogs", img: svanaSevaImg, title: "SVANA SEVA - Feeding the Street Dogs", desc: "Feeding and caring for street dogs, promoting compassion towards animals.", impact: "2,000+ Dogs Fed", loc: "Mumbai", tag: "Animal Welfare", started: "2021", about: ["It is said that the Dogs are the body guards of goddess Lakshmi, hairava can be appeased and the goddess blessings is obtained by feeding his vehicle-Dogs", "Even it is said that by feeding the dogs you may raise your financial standing, Draw possibilities and riches and have peace and pleasure in your household. By giving food to Stree dogs you can show you love and kindness and also receive the same from them.", "You can also spread Joy and happiness to others and make this world a better place.", "Mahila Chetna Samiti has taken an initiative to feed this voice less animal with your great support."], objectives: ["Feed street dogs regularly", "Provide food to voiceless animals with public support", "Promote kindness and compassion towards animals", "Raise awareness about animal welfare", "Encourage people to feed and care for street dogs", "Spread joy and happiness through animal care"], activities: [{ title: "Feeding Campaigns", desc: "Daily feeding drives for street dogs." }, { title: "Awareness Drives", desc: "Compassion workshops on animal welfare." }, { title: "Community Feeding Support", desc: "Providing food to people who feed street dogs." }, { title: "Rescue & Care Support", desc: "Helping injured and sick street dogs." }, { title: "School Awareness Programs", desc: "Teaching children kindness towards animals." }], stats: [{ label: "Dogs Fed", value: "2,000+" }, { label: "Feeding Points", value: "5" }], locations: ["Mumbai"] },
  { slug: "health-care", img: healthCareImg, title: "Health Care and Safety Initiative", desc: "Improving access to health awareness, preventive care and essential support for underserved communities.", impact: "5,000+ People", loc: "Communities across India", tag: "Health Care", started: "2021", about: ["Mahila Chetna Samiti works to make essential health information and support more accessible to women, children and families in underserved communities.", "Through awareness activities, health camps and practical guidance, the initiative helps people make informed decisions and access timely care.", "Your support helps us reach more communities with preventive health education and essential assistance."], objectives: ["Promote preventive health awareness", "Support health camps and screenings", "Improve access to essential care information", "Raise awareness about women's health and hygiene", "Connect families with available support"], activities: [{ title: "Health Awareness Camps", desc: "Community sessions on prevention and healthy living." }, { title: "Screening Support", desc: "Helping underserved families access basic screenings." }, { title: "Women's Health Sessions", desc: "Practical education on hygiene and well-being." }, { title: "Care Referrals", desc: "Connecting people with appropriate local services." }], stats: [{ label: "People Reached", value: "5,000+" }, { label: "Health Camps", value: "35+" }], locations: ["Mumbai", "Maharashtra"] },
  { slug: "disaster-relief", img: disasterReliefImg, title: "Disaster Relief and Community Support", desc: "Providing timely essential supplies and recovery support to families affected by emergencies.", impact: "3,000+ Families", loc: "Across India", tag: "Disaster Relief", started: "2020", about: ["When communities face floods, fires or other emergencies, families often need immediate help with food, clothing and basic essentials.", "Mahila Chetna Samiti supports affected communities through relief distribution and coordinated local assistance.", "With continued support, we can respond faster and help families begin rebuilding their lives with dignity."], objectives: ["Provide essential supplies during emergencies", "Support affected families with food and hygiene kits", "Coordinate local relief distribution", "Help communities recover with dignity", "Build rapid response partnerships"], activities: [{ title: "Relief Kit Distribution", desc: "Food, water, hygiene and essential item distribution." }, { title: "Emergency Assistance", desc: "Immediate support for families facing urgent needs." }, { title: "Community Coordination", desc: "Working with local partners to reach affected areas." }, { title: "Recovery Support", desc: "Helping families access continued recovery assistance." }], stats: [{ label: "Families Supported", value: "3,000+" }, { label: "Relief Drives", value: "25+" }], locations: ["Across India"] },
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
    return {
      slug: raw.slug || "",
      img: getFullUrl(raw.image) || raw.img || "",
      title: raw.title || raw.heading || "",
      desc: raw.description || (Array.isArray(raw.description) ? raw.description[0] : "") || "",
      impact: raw.impact || stats[0]?.value || "",
      loc: raw.loc || raw.location || "",
      tag: raw.category || raw.sectionTag || raw.tag || "",
      started: year,
      about: Array.isArray(raw.description) ? raw.description : (raw.description ? [raw.description] : []),
      objectives: raw.keypoints?.items || raw.objectives || [],
      activities: raw.activities || highlights.slice(0, 4).map((h: string) => ({ title: h, desc: "" })),
      stats: stats.slice(0, 4),
      locations: raw.locations || (raw.location ? [raw.location] : []),
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

export function getProject(slug: string, projectsList: Project[]): Project | undefined {
  return projectsList.find((p) => p.slug === slug) || fallbackProjects.find((p) => p.slug === slug);
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchProjects().then(setProjects).finally(() => setLoading(false)); }, []);
  return { projects, loading };
}
