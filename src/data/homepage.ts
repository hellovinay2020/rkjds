import api, { getFullUrl } from "@/lib/api";

export type HomeHero = {
  img: string;
  title: string;
  accent: string;
  desc: string;
  overlayId?: string;
  badge?: string;
  primaryBtnLabel?: string;
  primaryBtnLink?: string;
  secondaryBtnLabel?: string;
  secondaryBtnLink?: string;
  displayOrder?: number;
  showOverlay?: boolean;
};
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
  badge?: string;
  imageBadge?: string;
  paragraphs: string[];
  highlights: any[];
};
export type HomeAbout = {
  title: string;
  heading: string;
  paragraphs: string[];
  images: string[];
  expNumber: string;
  expLabel: string;
  highlights: { icon: string; title: string; description: string }[];
  eyebrow?: string;
  impactTitle?: string;
  impactSubtitle?: string;
  stats?: { num?: string; value?: string; label: string }[];
  mainImage?: string;
};
export type HomeCounter = { num: string; label: string; icon: string; color: string; bg: string };
export type HomeProgram = { img: string; title: string; desc: string };
export type HomeProject = { img: string; title: string; desc: string; impact: string; slug?: string };
export type HomeStory = { img: string; name: string; role: string; text: string };
export type HomeEvent = {
  title: string;
  desc: string;
  date: string;
  location: string;
  category: string;
  slug: string;
  img: string;
  day?: string;
  month?: string;
  d?: string;
  m?: string;
  y?: string;
  t?: string;
  l?: string;
};
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
    const timeout = setTimeout(() => controller.abort(), 8000);
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
    .filter((h: any) => h.isActive !== false && (h.image || h.images?.length > 0))
    .map((h: any) => ({
      img: getFullUrl(h.image || (h.images && h.images[0]) || '') || '',
      badge: h.badge || '',
      title: (h.titleLine1 || h.title || '') + (h.titleHighlight ? ' ' : ''),
      accent: h.titleHighlight || '',
      desc: h.titleLine3 || h.description || '',
      primaryBtnLabel: h.primaryBtnLabel || h.ctaText || '',
      primaryBtnLink: h.primaryBtnLink || h.ctaLink || '',
      secondaryBtnLabel: h.secondaryBtnLabel || '',
      secondaryBtnLink: h.secondaryBtnLink || '',
      displayOrder: h.displayOrder ?? 0,
      showOverlay: typeof h.showOverlay === 'boolean'
        ? h.showOverlay
        : (!String(h.image || '').toLowerCase().includes('banner') && !!(h.titleLine1 || h.badge || h.primaryBtnLabel)),
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
      eyebrow: c.eyebrow || '',
      impactTitle: c.impactTitle || '',
      impactSubtitle: c.impactSubtitle || '',
      stats: Array.isArray(c.stats) ? c.stats : [],
      mainImage: page.image || (c.images && c.images[0]) || '',
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
      badge: c.badge || '',
      imageBadge: c.imageBadge || '',
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
      badge: c.badge || '',
      imageBadge: c.imageBadge || '',
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
  return items.map((p: any) => {
    const rawDesc = typeof p.description === 'string' ? p.description : Array.isArray(p.description) ? p.description[0] : '';
    const firstPara = rawDesc.split(/\n\n+/)[0]?.trim() || '';
    const stat0 = p.stats?.[0];
    const statImpact = stat0 ? `${stat0.number || stat0.value || ''} ${stat0.label || ''}`.trim() : '';

    return {
      slug: p.slug || '',
      img: getFullUrl(p.image) || '',
      title: p.title || p.heading || '',
      desc: firstPara,
      impact: p.impact || statImpact || 'Community Impact',
    };
  });
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
    let day = "Sun";
    let month = "Worship";
    let dateStr = "Every Sunday";
    let year = "2026";
    if (e.date) {
      const d = new Date(e.date);
      if (!isNaN(d.getTime())) {
        day = String(d.getDate()).padStart(2, '0');
        month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
        year = String(d.getFullYear());
        dateStr = `${day} ${month} ${year}`;
      }
    }
    const rawDesc = typeof e.description === 'string' ? e.description : Array.isArray(e.description) ? e.description[0] : '';
    const firstPara = rawDesc.split(/\n\n+/)[0]?.trim() || '';

    return {
      title: e.title || e.heading || '',
      desc: firstPara,
      date: e.dateText || dateStr,
      location: e.location || e.address || 'आरके मिनिस्ट्रीज मुख्य प्रार्थना भवन, आजमगढ़',
      category: e.category || e.sectionTag || 'आराधना व चंगाई',
      slug: e.slug || '',
      img: getFullUrl(e.image) || '',
      day,
      month,
      d: day,
      m: month,
      y: year,
      t: e.title || e.heading || '',
      l: e.location || '',
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
    .filter((f: any) => f.isActive !== false && f.active !== false)
    .sort((a: any, b: any) => (a.order ?? a.displayOrder ?? 0) - (b.order ?? b.displayOrder ?? 0))
    .map((f: any) => ({
      q: f.question || '',
      a: f.answer || '',
      category: f.category || '',
      displayOrder: f.order ?? f.displayOrder ?? 0,
      active: f.isActive !== false && f.active !== false,
    }));
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
  onceAmounts?: number[];
  monthlyAmounts?: number[];
  upiId: string;
  upiQrCode: string;
  paytmNumber: string;
  contactEmail: string;
  contactPhone: string;
  faqImage?: string;
  rawSettings?: any;
};

export async function fetchHomeDonationSettings(): Promise<DonationSettings | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const { data } = await api.get('/site-settings', { signal: controller.signal });
    clearTimeout(timeout);
    const raw = data?.data || data;
    if (!raw) return null;

    const accounts: any[] = [];
    if (raw.bankDetails && (raw.bankDetails.accountName || raw.bankDetails.accountNumber || raw.bankDetails.bankName)) {
      accounts.push({
        accountName: raw.bankDetails.accountName || '',
        accountNumber: raw.bankDetails.accountNumber || '',
        ifsc: raw.bankDetails.ifsc || '',
        bankName: raw.bankDetails.bankName || '',
        branch: raw.bankDetails.branch || '',
        accountType: raw.bankDetails.accountType || 'Current Account',
      });
    }
    if (Array.isArray(raw.bankAccounts)) {
      raw.bankAccounts.forEach((b: any) => {
        if (b.accountName || b.accountNumber || b.bankName) {
          accounts.push({
            accountName: b.accountName || b.name || '',
            accountNumber: b.accountNumber || b.number || '',
            ifsc: b.ifsc || b.ifscCode || '',
            bankName: b.bankName || b.bank || '',
            branch: b.branch || '',
            accountType: b.accountType || b.type || '',
          });
        }
      });
    }

    const effectiveQr = raw.qrCode || raw.upiQrCode || raw.donationSettings?.upiQrCode || '';

    const once = Array.isArray(raw.donationSettings?.onceAmounts) && raw.donationSettings.onceAmounts.length > 0
      ? raw.donationSettings.onceAmounts.filter((n: any) => typeof n === 'number' && n > 0)
      : [500, 1000, 2500, 5000, 30000];
    const monthly = Array.isArray(raw.donationSettings?.monthlyAmounts) && raw.donationSettings.monthlyAmounts.length > 0
      ? raw.donationSettings.monthlyAmounts.filter((n: any) => typeof n === 'number' && n > 0)
      : [500, 1000, 1500, 3000];

    return {
      bankAccounts: accounts,
      onceAmounts: once,
      monthlyAmounts: monthly,
      upiId: raw.upiId || raw.donationSettings?.upiId || '9415314486@upi',
      upiQrCode: getFullUrl(effectiveQr) || '',
      paytmNumber: raw.paytmNumber || raw.donationSettings?.paytmNumber || '+91 94153 14486',
      contactEmail: raw.contactEmail || 'azaramesh@gmail.com',
      contactPhone: raw.contactPhone || '+91 94153 14486',
      faqImage: getFullUrl(raw.faqImage) || '',
      rawSettings: raw,
    };
  } catch {
    return null;
  }
}
