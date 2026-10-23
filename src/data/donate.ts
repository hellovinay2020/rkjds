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
  accountName: "XXXXXX",
  accountNumber: "XXXXXXXXXXXX",
  ifsc: "XXXX000XXXX",
  bankName: "XXXXXX Bank",
  branch: "XXXXXX",
  accountType: "Current / Savings Account",
};

const fallbackDonation: DonationSettings = {
  onceAmounts: [1000, 2000, 3000, 5000],
  monthlyAmounts: [500, 1000, 2000, 5000],
  upiId: "XXXXXX@upi",
  upiQrCode: "",
  paytmNumber: "XXXXXX",
  qrCode: "",
  bankAccounts: [fallbackBankAccount],
  pan: "AANAR9870K",
  registrationId: "45/2026",
  registrationNumber: "45/2026",
  certification: "Church / Ministry Trust (DARPAN ID: UP/2026/1218239)",
  urn: "45/2026",
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

  const accounts: BankAccount[] = [];
  if (raw.bankDetails && (raw.bankDetails.accountName || raw.bankDetails.accountNumber || raw.bankDetails.bankName)) {
    accounts.push(transformBankAccount(raw.bankDetails));
  }
  if (Array.isArray(raw.bankAccounts)) {
    raw.bankAccounts.forEach((b: any) => {
      if (b.accountName || b.accountNumber || b.bankName) {
        accounts.push(transformBankAccount(b));
      }
    });
  }

  const effectiveQr = raw.qrCode || raw.upiQrCode || ds.upiQrCode || "";

  return {
    onceAmounts: Array.isArray(ds.onceAmounts) && ds.onceAmounts.length > 0 ? ds.onceAmounts.filter((n: any) => typeof n === "number") : [500, 1000, 2500, 5000, 30000],
    monthlyAmounts: Array.isArray(ds.monthlyAmounts) && ds.monthlyAmounts.length > 0 ? ds.monthlyAmounts.filter((n: any) => typeof n === "number") : [500, 1000, 1500, 3000],
    upiId: raw.upiId || ds.upiId || "9415314486@upi",
    upiQrCode: getFullUrl(effectiveQr) || "",
    paytmNumber: raw.paytmNumber || ds.paytmNumber || "+91 94153 14486",
    qrCode: getFullUrl(effectiveQr) || "",
    bankAccounts: accounts.length > 0 ? accounts : [fallbackBankAccount],
    pan: raw.pan || "AANAR9870K",
    registrationId: raw.registrationId || "UP/2026/1218239",
    registrationNumber: raw.registrationNumber || "45/2026",
    certification: raw.certification || "Church / Ministry Trust (DARPAN ID: UP/2026/1218239)",
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
