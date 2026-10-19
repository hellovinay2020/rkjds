import api, { getFullUrl } from "@/lib/api";

export type BankAccount = {
  accountName: string;
  accountNumber: string;
  ifsc: string;
  bankName: string;
  branch: string;
  accountType: string;
};

export type DonationSettings = {
  onceAmounts: number[];
  monthlyAmounts: number[];
  upiId: string;
  upiQrCode: string;
  paytmNumber: string;
  qrCode: string;
  bankAccounts: BankAccount[];
  pan: string;
  registrationId: string;
  registrationNumber: string;
  certification: string;
  urn: string;
};

const fallbackBankAccount: BankAccount = {
  accountName: "Mahila Chetna Samiti",
  accountNumber: "50100329633950",
  ifsc: "HDFC0001896",
  bankName: "HDFC Bank",
  branch: "NARAYAN BHAWAN ETAH ROAD SHIKOHABAD UP, SHIKOHABAD-205135, UTTAR PRADESH",
  accountType: "Current Account",
};

const fallbackDonation: DonationSettings = {
  onceAmounts: [1000, 2000, 3000, 5000],
  monthlyAmounts: [500, 1000, 2000, 5000],
  upiId: "",
  upiQrCode: "",
  paytmNumber: "+91 95980 59289",
  qrCode: "",
  bankAccounts: [fallbackBankAccount],
  pan: "AAJAM8783G",
  registrationId: "CSR00050218",
  registrationNumber: "UP/2019/0243662",
  certification: "Church / Ministry Trust",
  urn: "AAJAM8783GE20213",
};

function transformBankAccount(raw: any): BankAccount {
  return {
    accountName: raw.accountName || raw.name || "",
    accountNumber: raw.accountNumber || raw.number || "",
    ifsc: raw.ifsc || raw.ifscCode || "",
    bankName: raw.bankName || raw.bank || "",
    branch: raw.branch || "",
    accountType: raw.accountType || raw.type || "",
  };
}

function transformDonationSettings(raw: any): DonationSettings {
  const ds = raw.donationSettings || {};
  return {
    onceAmounts: Array.isArray(ds.onceAmounts) ? ds.onceAmounts.filter((n: any) => typeof n === "number") : [1000, 2000, 3000, 5000],
    monthlyAmounts: Array.isArray(ds.monthlyAmounts) ? ds.monthlyAmounts.filter((n: any) => typeof n === "number") : [],
    upiId: raw.upiId || ds.upiId || "9598059289@upi",
    upiQrCode: getFullUrl(raw.upiQrCode || ds.upiQrCode || "") || "",
    paytmNumber: raw.paytmNumber || ds.paytmNumber || "+91 95980 59289",
    qrCode: getFullUrl(raw.qrCode || "") || "",
    bankAccounts: Array.isArray(raw.bankAccounts) ? raw.bankAccounts.map(transformBankAccount).filter((b: BankAccount) => b.accountName) : [fallbackBankAccount],
    pan: raw.pan || "",
    registrationId: raw.registrationId || "",
    registrationNumber: raw.registrationNumber || "",
    certification: raw.certification || "",
    urn: raw.urn || "",
  };
}

function safeTransformDonationSettings(raw: any, index: number): DonationSettings | null {
  try { return transformDonationSettings(raw); } catch { return null; }
}

export async function fetchDonationSettings(): Promise<DonationSettings> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const { data } = await api.get("/site-settings", { signal: controller.signal });
    clearTimeout(timeout);
    const raw = data?.data || data || null;
    if (raw) {
      const mapped = safeTransformDonationSettings(raw, 0);
      if (mapped) return mapped;
    }
  } catch { /* fallback */ }
  return fallbackDonation;
}
