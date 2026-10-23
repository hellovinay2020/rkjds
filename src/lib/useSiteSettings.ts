import { useState, useEffect } from "react";
import api, { getFullUrl } from "@/lib/api";

export type SiteSettings = {
  siteName?: string;
  siteNameLine1?: string;
  siteNameLine2?: string;
  siteNameLine3?: string;
  logo?: string;
  favicon?: string;
  receiptLogo?: string;
  faqImage?: string;
  qrCode?: string;
  upiId?: string;
  paytmNumber?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  mapEmbedUrl?: string;
  mapLatitude?: number;
  mapLongitude?: number;
  mapPopupText?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    whatsapp?: string;
    linkedin?: string;
  };
  bankDetails?: {
    accountName?: string;
    accountNumber?: string;
    ifsc?: string;
    bankName?: string;
    branch?: string;
    accountType?: string;
  };
  bankAccounts?: Array<{
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    ifsc?: string;
    branch?: string;
    accountType?: string;
  }>;
  donationSettings?: {
    onceAmounts?: number[];
    monthlyAmounts?: number[];
  };
  orgName?: string;
  tagline?: string;
  website?: string;
  pan?: string;
  registrationNumber?: string;
  registrationId?: string;
  certification?: string;
  adminUrl?: string;
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api.get('/site-settings')
      .then(({ data }) => {
        if (!cancelled) {
          setSettings(data?.data || null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSettings(null);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  return { settings, loading };
}

export function getSocialUrl(socials: SiteSettings['socialLinks'] | undefined, key: keyof NonNullable<SiteSettings['socialLinks']>): string {
  return socials?.[key] || '';
}

export { getFullUrl };
