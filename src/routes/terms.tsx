import { useEffect, useState } from "react";
import LegalPage, { LegalSection } from "@/components/LegalPage";
import api from "@/lib/api";

const fallbackSections: LegalSection[] = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using the website of RK MINISTRIES (\"we\", \"us\", \"our\"), you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of the site.\nWe reserve the right to update or modify these terms at any time without prior notice. Continued use of the site after changes are posted constitutes your acceptance of the revised terms.",
  },
  {
    title: "Use of the Website",
    body: "You agree to use this website only for lawful purposes and in a manner consistent with the faith and mission of RK MINISTRIES. You will not:\n- Misuse, hack or disrupt the website or its services.\n- Upload or transmit any harmful, defamatory or illegal content.\n- Impersonate any person or entity, including ministry leaders.\n- Attempt to gain unauthorized access to our systems or data.",
  },
  {
    title: "Contributions & Offerings",
    body: "All contributions, tithes, and offerings made through our website or offline are voluntary and used solely to further the spiritual and charitable ministry work of RK MINISTRIES.\nOfferings are non-refundable once successfully processed.",
  },
  {
    title: "Intellectual Property",
    body: "All content on this website — including text, sermons, graphics, logos, images and videos — is the property of RK MINISTRIES or its licensors and is protected by applicable laws.\nYou may not reproduce, distribute, modify or publicly display any content without prior written consent.",
  },
  {
    title: "Limitation of Liability",
    body: "RK MINISTRIES shall not be liable for any direct, indirect, incidental or consequential damages arising out of your use of, or inability to use, the website or our services.\nWe do not warrant uninterrupted, error-free or fully secure operation of the website.",
  },
  {
    title: "Third-Party Links",
    body: "Our website may include links to external websites (such as YouTube, Facebook, Instagram) for your convenience. We are not responsible for the content, accuracy or privacy practices of these third-party platforms.",
  },
  {
    title: "Governing Law",
    body: "These terms are governed by the laws of India. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts in Azamgarh, Uttar Pradesh.",
  },
  {
    title: "Contact",
    body: "For any questions or concerns regarding these Terms & Conditions, please contact us through our website contact form or email us directly.",
  },
];

export default function TermsPage() {
  const [policyData, setPolicyData] = useState<{
    title: string;
    description: string;
    updatedAt: string;
    sections: LegalSection[];
  }>({
    title: "Terms & Conditions",
    description: "Please read these terms carefully before using our website, services or making a contribution to RK MINISTRIES.",
    updatedAt: "01 January 2026",
    sections: fallbackSections,
  });

  useEffect(() => {
    document.title = `${policyData.title} — RK MINISTRIES`;
  }, [policyData.title]);

  useEffect(() => {
    api.get("/policies/terms-and-conditions")
      .then((res) => {
        const raw = res.data?.data;
        if (raw) {
          let parsedSections: LegalSection[] = [];
          if (raw.content) {
            try {
              const parsed = JSON.parse(raw.content);
              if (Array.isArray(parsed?.sections) && parsed.sections.length > 0) {
                parsedSections = parsed.sections.filter((s: any) => s && (s.title || s.body));
              }
            } catch {
              // Markdown/text fallback
              const lines = String(raw.content).split(/\r?\n/);
              let cur: any = null;
              for (const line of lines) {
                const t = line.trim();
                if (t.startsWith("## ")) {
                  if (cur) parsedSections.push(cur);
                  cur = { title: t.slice(3).trim(), body: "" };
                } else if (cur) {
                  cur.body = cur.body ? cur.body + "\n" + line : line;
                }
              }
              if (cur) parsedSections.push(cur);
            }
          }

          setPolicyData({
            title: raw.title || "Terms & Conditions",
            description: raw.description || "Please read these terms carefully before using our website, services or making a contribution to RK MINISTRIES.",
            updatedAt: raw.updatedAt || "01 January 2026",
            sections: parsedSections.length > 0 ? parsedSections : fallbackSections,
          });
        }
      })
      .catch((err) => {
        console.warn("Could not load dynamic terms & conditions from API, using fallback:", err);
      });
  }, []);

  return (
    <LegalPage
      title={policyData.title}
      crumbLabel={policyData.title}
      description={policyData.description}
      updated={policyData.updatedAt}
      sections={policyData.sections}
    />
  );
}
