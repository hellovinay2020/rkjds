import certificate1 from "@/assets/img-certificate/certificate1.jpeg";
import certificate2 from "@/assets/img-certificate/certificate2.jpeg";
import certificate3 from "@/assets/img-certificate/certificate3.jpeg";
import certificate4 from "@/assets/img-certificate/certificate4.jpeg";
import certificate5 from "@/assets/img-certificate/certificate5.jpeg";
import certificate6 from "@/assets/img-certificate/certificate6.jpeg";
import certificate7 from "@/assets/img-certificate/certificate7.jpeg";
import certificate8 from "@/assets/img-certificate/certificate8.jpeg";
import certificate9 from "@/assets/img-certificate/certificate9.jpeg";

export type DocumentItem = {
  _id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  pdfUrl: string;
};

const documents: DocumentItem[] = [
  { _id: "certificate1", slug: "certificate-1", title: "Certificate 1", category: "Certificate", image: certificate1, pdfUrl: certificate1 },
  { _id: "certificate2", slug: "certificate-2", title: "Certificate 2", category: "Certificate", image: certificate2, pdfUrl: certificate2 },
  { _id: "certificate3", slug: "certificate-3", title: "Certificate 3", category: "Certificate", image: certificate3, pdfUrl: certificate3 },
  { _id: "certificate4", slug: "certificate-4", title: "Certificate 4", category: "Certificate", image: certificate4, pdfUrl: certificate4 },
  { _id: "certificate5", slug: "certificate-5", title: "Certificate 5", category: "Certificate", image: certificate5, pdfUrl: certificate5 },
  { _id: "certificate6", slug: "certificate-6", title: "Certificate 6", category: "Certificate", image: certificate6, pdfUrl: certificate6 },
  { _id: "certificate7", slug: "certificate-7", title: "Certificate 7", category: "Certificate", image: certificate7, pdfUrl: certificate7 },
  { _id: "certificate8", slug: "certificate-8", title: "Certificate 8", category: "Certificate", image: certificate8, pdfUrl: certificate8 },
  { _id: "certificate9", slug: "certificate-9", title: "Certificate 9", category: "Certificate", image: certificate9, pdfUrl: certificate9 },
];

export async function fetchDocuments(): Promise<DocumentItem[]> {
  return documents;
}

export function useDocuments() {
  return { items: documents, loading: false };
}
