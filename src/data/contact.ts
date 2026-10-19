import api from "@/lib/api";

export type ContactSettings = {
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  mapEmbedUrl: string;
  mapLatitude: number;
  mapLongitude: number;
  mapPopupText: string;
};

const fallbackContact: ContactSettings = {
  contactPhone: "+91 95980 59289",
  contactEmail: "azaramesh@gmail.com",
  contactAddress: "Village - Mustafabad, Post- Gujarpar, Police station- Mubarakpur, District - Azamgarh, U.P. 276404",
  mapEmbedUrl: "https://maps.google.com/maps?q=Mustafabad,+Mubarakpur,+Azamgarh,+Uttar+Pradesh+276404&hl=en&z=15&output=embed",
  mapLatitude: 26.0913,
  mapLongitude: 83.2922,
  mapPopupText: "RK MINISTRIES, Mubarakpur, Azamgarh",
};

function transformContact(raw: any): ContactSettings {
  return {
    contactPhone: raw.contactPhone || raw.phone || "",
    contactEmail: raw.contactEmail || raw.email || "",
    contactAddress: raw.contactAddress || raw.address || "",
    mapEmbedUrl: raw.mapEmbedUrl || "",
    mapLatitude: parseFloat(raw.mapLatitude) || 0,
    mapLongitude: parseFloat(raw.mapLongitude) || 0,
    mapPopupText: raw.mapPopupText || "",
  };
}

function safeTransformContact(raw: any, index: number): ContactSettings | null {
  try { return transformContact(raw); } catch { return null; }
}

export async function fetchContactSettings(): Promise<ContactSettings> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const { data } = await api.get("/site-settings", { signal: controller.signal });
    clearTimeout(timeout);
    const raw = data?.data || data || null;
    if (raw) {
      const mapped = safeTransformContact(raw, 0);
      if (mapped && mapped.contactPhone) return mapped;
    }
  } catch { /* fallback */ }
  return fallbackContact;
}
