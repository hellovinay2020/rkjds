import api, { getFullUrl } from "@/lib/api";

export type HomeHero = { img: string; title: string; accent: string; desc: string; overlayId?: string };
export type HomeFounder = {
  tag: string;
  title: string;
  titleGradient: string;
  name: string;
  photo: string;
  designation: string;
  message: string;
  quote: string;
  paragraphs: string[];
  mission: string;
  vision: string;
  stats: { value: string; label: string }[];
};
export type HomeMissionVision = {
  image: string;
  heading: string;
  paragraphs: string[];
  highlights: { icon: string; title: string; description: string }[];
};
export type HomeAbout = {
  title: string;
  heading: string;
  paragraphs: string[];
  images: string[];
  expNumber: string;
  expLabel: string;
  highlights: { icon: string; title: string; description: string }[];
};
export type HomeCounter = { num: string; label: string; icon: string; color: string; bg: string };
export type HomeProgram = { img: string; title: string; desc: string };
export type HomeProject = { img: string; title: string; desc: string; impact: string };
export type HomeStory = { img: string; name: string; role: string; text: string };
export type HomeEvent = { d: string; m: string; y: string; t: string; l: string; desc: string };
export type HomeBlog = { img: string; cat: string; t: string; d: string; read: string; excerpt: string; slug: string };
export type HomeCause = { I: string; title: string; desc: string; img: string; raised: number };
export type HomeTeam = { name: string; role: string; img: string; accent: string };
export type HomePartner = { name: string; initials: string; color: string; logo?: string };
export type HomeTestimonial = { name: string; role: string; quote: string; img: string };
export type HomeFAQ = { q: string; a: string; category?: string; displayOrder?: number; active?: boolean };
export type HomePhoto = { img: string; h: string; cls: string };
export type HomeVideo = { img: string; title: string; duration: string };
export type HomeVolunteer = { name: string; role: string; img: string; accent: string };

async function fetchArray(url: string, params?: Record<string, unknown>): Promise<any[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const { data } = await api.get(url, { params, signal: controller.signal });
    clearTimeout(timeout);
    const items = data?.data || data || [];
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

const iconColors = ['#2E8B57', '#FF6B00', '#2563EB', '#7C3AED', '#16A34A', '#EC4899', '#0EA5E9', '#B45309'];
const iconBgs = ['#E8F5EE', '#FFF1E5', '#E6EEFB', '#EFE8FB', '#E8F7EE', '#FCE7F3', '#E0F4FD', '#FEF3C7'];

const iconSlug: Record<string, number> = {
  users: 0, home: 1, bookopen: 2, handheart: 3, graduationcap: 4,
  heartpulse: 5, shieldcheck: 6, scale: 7, building2: 8, heart: 9,
};

function pickColor(key: string, i: number) {
  const idx = iconSlug[key?.toLowerCase().replace(/[^a-z]/g, '')] ?? (i % iconColors.length);
  return { color: iconColors[idx % iconColors.length], bg: iconBgs[idx % iconBgs.length] };
}

export async function fetchHomeHero(): Promise<HomeHero[]> {
  const items = await fetchArray('/hero');
  return items
    .filter((h: any) => h.isActive !== false && h.image)
    .map((h: any) => ({
      img: getFullUrl(h.image) || '',
      title: (h.titleLine1 || h.title || '') + ' ',
      accent: h.titleHighlight || '',
      desc: h.titleLine3 || h.description || '',
    }));
}

export async function fetchHomeAbout(): Promise<HomeAbout | null> {
  try {
    const { data } = await api.get('/pages/about-us');
    const page = data?.data || data;
    if (!page) return null;
    const c = page.content || {};
    return {
      title: page.title || '',
      heading: c.heading || '',
      paragraphs: Array.isArray(c.paragraphs) ? c.paragraphs : [],
      images: Array.isArray(c.images) ? c.images : [],
      expNumber: c.expNumber || '',
      expLabel: c.expLabel || '',
      highlights: Array.isArray(c.highlights) ? c.highlights : [],
    };
  } catch {
    return null;
  }
}

export async function fetchHomeMission(): Promise<HomeMissionVision | null> {
  try {
    const { data } = await api.get('/pages/mission');
    const page = data?.data || data;
    if (!page) return null;
    const c = page.content || {};
    return {
      image: page.image || '',
      heading: c.heading || '',
      paragraphs: Array.isArray(c.paragraphs) ? c.paragraphs : [],
      highlights: Array.isArray(c.highlights) ? c.highlights : [],
    };
  } catch {
    return null;
  }
}

export async function fetchHomeVision(): Promise<HomeMissionVision | null> {
  try {
    const { data } = await api.get('/pages/vision');
    const page = data?.data || data;
    if (!page) return null;
    const c = page.content || {};
    return {
      image: page.image || '',
      heading: c.heading || '',
      paragraphs: Array.isArray(c.paragraphs) ? c.paragraphs : [],
      highlights: Array.isArray(c.highlights) ? c.highlights : [],
    };
  } catch {
    return null;
  }
}

export async function fetchHomeFounder(): Promise<HomeFounder | null> {
  try {
    const { data } = await api.get('/pages/founder-message');
    const page = data?.data || data;
    if (!page) return null;
    const c = page.content || {};
    const fd = page.founderData || {};
    return {
      tag: c.tag || '',
      title: c.title || '',
      titleGradient: c.titleGradient || '',
      name: fd.name || '',
      photo: fd.photo || '',
      designation: fd.designation || '',
      message: fd.message || '',
      quote: fd.quote || '',
      paragraphs: Array.isArray(c.paragraphs) ? c.paragraphs : [],
      mission: c.mission || '',
      vision: c.vision || '',
      stats: Array.isArray(c.stats) ? c.stats : [],
    };
  } catch {
    return null;
  }
}

export async function fetchHomeCounters(): Promise<HomeCounter[]> {
  const items = await fetchArray('/counters');
  return items.map((c: any, i: number) => {
    const { color, bg } = pickColor(c.icon, i);
    return { num: c.number || '0', label: c.label || '', icon: c.icon || 'Users', color, bg };
  });
}

export async function fetchHomePrograms(): Promise<HomeProgram[]> {
  const items = await fetchArray('/programs');
  return items.map((p: any) => ({
    img: getFullUrl(p.image) || '',
    title: p.title || '',
    desc: p.description || '',
  }));
}

export async function fetchHomeProjects(): Promise<HomeProject[]> {
  const items = await fetchArray('/projects');
  return items.map((p: any) => ({
    img: getFullUrl(p.image) || '',
    title: p.title || p.heading || '',
    desc: typeof p.description === 'string' ? p.description : p.description?.[0] || '',
    impact: p.impact || p.stats?.[0]?.label || '',
  }));
}

export async function fetchHomeStories(): Promise<HomeStory[]> {
  const items = await fetchArray('/stories');
  return items.map((s: any) => {
    const desc = Array.isArray(s.description) ? s.description : s.description ? [s.description] : [];
    return {
      img: getFullUrl(s.featuredImage || s.image) || '',
      name: s.heading || s.title || s.name || '',
      role: s.sectionTag || s.category || s.program || '',
      text: s.quote || s.excerpt || desc[0] || '',
    };
  });
}

export async function fetchHomeEvents(): Promise<HomeEvent[]> {
  const items = await fetchArray('/events');
  return items.map((e: any) => {
    const d = e.date ? new Date(e.date) : new Date();
    return {
      d: String(d.getDate()).padStart(2, '0'),
      m: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()],
      y: String(d.getFullYear()),
      t: e.heading || e.title || '',
      l: e.location || e.loc || '',
      desc: typeof e.description === 'string' ? e.description : e.description?.[0] || '',
    };
  });
}

export async function fetchHomeBlogs(): Promise<HomeBlog[]> {
  const items = await fetchArray('/blogs');
  return items.map((b: any) => {
    const d = b.createdAt ? new Date(b.createdAt) : new Date();
    const dateStr = `${d.getDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()]} ${d.getFullYear()}`;
    return {
      img: getFullUrl(b.featuredImage) || b.img || '',
      cat: b.category || b.sectionTag || b.tag || '',
      t: b.title || b.heading || '',
      d: dateStr,
      read: b.readTime || '5 min read',
      excerpt: b.excerpt || (Array.isArray(b.description) ? b.description[0] : b.description) || '',
      slug: b.slug || '',
    };
  });
}

export async function fetchHomeCauses(): Promise<HomeCause[]> {
  const items = await fetchArray('/causes');
  return items.map((c: any) => {
    const target = c.targetAmount || 5000000;
    const raised = c.raisedAmount || 0;
    const pct = target > 0 ? Math.round((raised / target) * 100) : 0;
    return {
      I: c.slug || 'heart',
      title: c.title || c.heading || '',
      desc: typeof c.description === 'string' ? c.description : c.description?.[0] || '',
      img: getFullUrl(c.image) || c.img || '',
      raised: Math.min(pct, 100),
    };
  });
}

export async function fetchHomeTeam(): Promise<HomeTeam[]> {
  const items = await fetchArray('/team');
  return items.map((t: any, i: number) => {
    const accent = ['#FF6B00', '#0B1F3A', '#FF8C00', '#2E7D32'][i % 4];
    return {
      name: t.name || '',
      role: t.role || '',
      img: getFullUrl(t.photo) || '',
      accent,
    };
  });
}

export async function fetchHomePartners(): Promise<HomePartner[]> {
  const items = await fetchArray('/partners');
  return items.map((p: any) => {
    const name = p.name || p.organization || '';
    const words = name.split(/\s+/).filter(Boolean);
    const initials = words.length >= 2
      ? (words[0][0] + words[1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
    const color = ['#1E40AF', '#DC2626', '#16A34A', '#1D4ED8', '#EAB308', '#E11D48', '#0EA5E9', '#7C3AED', '#0F766E', '#0B1F3A'][items.indexOf(p) % 10];
    return { name, initials, color, logo: getFullUrl(p.logo) || '' };
  });
}

export async function fetchHomeTestimonials(): Promise<HomeTestimonial[]> {
  const items = await fetchArray('/testimonials');
  return items.map((t: any) => ({
    name: t.name || '',
    role: t.role || '',
    quote: t.quote || '',
    img: getFullUrl(t.photo) || '',
  }));
}

export async function fetchHomeFAQs(): Promise<HomeFAQ[]> {
  const items = await fetchArray('/faqs');
  return items
    .filter((f: any) => f.active !== false)
    .sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0))
    .map((f: any) => ({ q: f.question || '', a: f.answer || '', category: f.category || '', displayOrder: f.displayOrder || 0, active: f.active !== false }));
}

export async function fetchHomeGallery(): Promise<{ photos: HomePhoto[]; videos: HomeVideo[] }> {
  const items = await fetchArray('/gallery');
  const photos: HomePhoto[] = [];
  const videos: HomeVideo[] = [];
  for (const g of items) {
    try {
      const url = getFullUrl(g.mediaUrl || g.thumbnail) || '';
      if (g.type === 'video') {
        videos.push({ img: getFullUrl(g.thumbnail) || url, title: g.title || '', duration: '2:30' });
      } else {
        const h = photos.length % 4 === 0 || photos.length % 4 === 3 ? 'row-span-2' : '';
        const cls = h ? 'h-full min-h-[280px] sm:min-h-[380px]' : 'h-40 sm:h-48';
        photos.push({ img: url, h, cls });
      }
    } catch { /* skip malformed item */ }
  }
  return { photos, videos };
}

export async function fetchHomeVolunteers(): Promise<HomeVolunteer[]> {
  const items = await fetchArray('/volunteers/public');
  return items.map((v: any, i: number) => {
    const accent = ['#FF6B00', '#0B1F3A', '#FF8C00', '#2E7D32'][i % 4];
    return { name: v.name || '', role: v.role || '', img: getFullUrl(v.photo) || '', accent };
  });
}

export type DonationSettings = {
  bankAccounts: { accountName: string; accountNumber: string; ifsc: string; bankName: string; branch: string; accountType: string }[];
  upiId: string;
  upiQrCode: string;
  paytmNumber: string;
  contactEmail: string;
  contactPhone: string;
};

export async function fetchHomeDonationSettings(): Promise<DonationSettings | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const { data } = await api.get('/site-settings', { signal: controller.signal });
    clearTimeout(timeout);
    const raw = data?.data || data;
    if (!raw) return null;
    return {
      bankAccounts: Array.isArray(raw.bankAccounts) ? raw.bankAccounts.map((b: any) => ({
        accountName: b.accountName || b.name || '',
        accountNumber: b.accountNumber || b.number || '',
        ifsc: b.ifsc || b.ifscCode || '',
        bankName: b.bankName || b.bank || '',
        branch: b.branch || '',
        accountType: b.accountType || b.type || '',
      })).filter((b: any) => b.accountName) : [],
      upiId: raw.upiId || raw.donationSettings?.upiId || '9598059289@upi',
      upiQrCode: raw.upiQrCode || raw.donationSettings?.upiQrCode || '',
      paytmNumber: raw.paytmNumber || raw.donationSettings?.paytmNumber || '+91 95980 59289',
      contactEmail: raw.contactEmail || 'azaramesh@gmail.com',
      contactPhone: raw.contactPhone || '+91 95980 59289',
    };
  } catch {
    return null;
  }
}
