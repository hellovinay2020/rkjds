import api, { getFullUrl } from "@/lib/api";
import registrationPdf from "@/assets/img-certificate/AANAR9870K_registration.pdf";
import panCardImg from "@/assets/img-certificate/pancard.jpeg";

export type DocumentItem = {
  _id: string;
  slug: string;
  title: string;
  category: string;
  image?: string;
  pdfUrl: string;
  documentNumber?: string;
  description?: string;
  fileSize?: string;
};

export const defaultDocuments: DocumentItem[] = [
  {
    _id: "doc-registration",
    slug: "trust-registration-order",
    title: "Trust Registration & 12A/80G Order",
    category: "Registration",
    documentNumber: "Reg. No.: 45/2026",
    description: "Official Trust Registration Certificate (Reg. No. 45/2026), Society Certification & Tax Exemption documents (PAN: AANAR9870K).",
    pdfUrl: registrationPdf,
    fileSize: "Official PDF Document",
  },
  {
    _id: "doc-pancard",
    slug: "trust-pan-card",
    title: "Trust PAN Card",
    category: "PAN Card",
    documentNumber: "PAN: AANAR9870K",
    description: "Permanent Account Number (PAN) Card of the Trust registered with Income Tax Department, Govt. of India.",
    image: panCardImg,
    pdfUrl: panCardImg,
    fileSize: "Verified Photo Document",
  },
];

export async function fetchDocuments(): Promise<DocumentItem[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const { data: res } = await api.get("/certificates", { signal: controller.signal });
    clearTimeout(timeout);

    const list = res?.data || (Array.isArray(res) ? res : []);
    if (Array.isArray(list) && list.length > 0) {
      const activeList = list.filter((item: any) => item.isActive !== false);
      if (activeList.length > 0) {
        return activeList
          .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
          .map((item: any) => {
            const fileUrl = item.fileUrl ? getFullUrl(item.fileUrl) : "";
            const isImg = fileUrl && /\.(jpg|jpeg|png|webp|svg)$/i.test(fileUrl);
            const image = item.image
              ? getFullUrl(item.image)
              : (isImg ? fileUrl : undefined);

            const slug = (item.title || "doc")
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-");

            return {
              _id: item._id,
              slug,
              title: item.title,
              category: item.category || "Registration",
              documentNumber: item.documentNumber || "",
              description: item.description || "",
              image,
              pdfUrl: fileUrl,
              fileSize: !isImg ? "Official PDF Document" : "Verified Photo Document",
            };
          });
      }
    }
  } catch (err) {
    console.error("Failed to fetch documents from /certificates API:", err);
  }
  return defaultDocuments;
}

export function useDocuments() {
  return { items: defaultDocuments, loading: false };
}
