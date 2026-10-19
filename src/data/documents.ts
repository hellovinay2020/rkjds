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

const documents: DocumentItem[] = [
  {
    _id: "doc-registration",
    slug: "trust-registration-order",
    title: "Trust Registration & 12A/80G Order",
    category: "Registration",
    documentNumber: "Order / Ref: AANAR9870K",
    description: "Official Trust Registration, Society Certification & Tax Exemption documents (AANAR9870K).",
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
  return documents;
}

export function useDocuments() {
  return { items: documents, loading: false };
}
