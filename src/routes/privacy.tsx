import { useEffect, useState } from "react";
import LegalPage, { LegalSection } from "@/components/LegalPage";
import api from "@/lib/api";

const fallbackSections: LegalSection[] = [
  {
    title: "Introduction",
    body: "RK MINISTRIES is committed to protecting the privacy of donors, members, volunteers and visitors. This policy outlines our practices regarding the collection, use and disclosure of personal information.",
  },
  {
    title: "Information We Collect",
    body: "We may collect the following information:\n- Personal: Name, email, phone, address, PAN (for donations).\n- Payment: Transaction details processed via secure payment gateways. We do not store card or banking credentials.\n- Technical: IP address, browser type, device information and pages visited.\n- Voluntary: Any other information you choose to share via forms, surveys or correspondence.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used to:\n- Process donations, tithes, offerings, and issue receipts.\n- Manage memberships, volunteer enrolments and ministry programs.\n- Send ministry updates, newsletters and prayer reports (you can opt out anytime).\n- Respond to your prayer requests and queries.\n- Comply with legal, regulatory and reporting requirements.",
  },
  {
    title: "Data Sharing",
    body: "We do not sell, rent or trade your personal information. We may share data only:\n- With payment gateways and service providers necessary to complete a transaction.\n- With auditors, regulators or government authorities as required by law.\n- With trusted ministry coordinators under strict confidentiality, only when essential to deliver pastoral care.",
  },
  {
    title: "Cookies & Analytics",
    body: "Our website may use cookies and analytics tools to improve user experience and understand site usage. You can disable cookies in your browser settings, though some site features may not function properly.",
  },
  {
    title: "Data Security",
    body: "We implement reasonable physical, electronic and managerial safeguards to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "Your Rights",
    body: "You have the right to:\n- Access, correct or delete your personal information.\n- Withdraw consent or unsubscribe from communications.\n- Request a copy of the data we hold about you.\nTo exercise these rights, please email us directly or reach out via our contact page.",
  },
  {
    title: "Children's Privacy",
    body: "We do not knowingly collect personal information from children under 13 without parental consent. If you believe we have collected such data inadvertently, please contact us for prompt removal.",
  },
  {
    title: "Policy Updates",
    body: "This policy may be updated periodically. The 'Last updated' date reflects the most recent revision. Please review it from time to time.",
  },
];

export default function PrivacyPage() {
  const [policyData, setPolicyData] = useState<{
    title: string;
    description: string;
    updatedAt: string;
    sections: LegalSection[];
  }>({
    title: "Privacy Policy",
    description: "Your privacy matters to us. This policy explains how we collect, use and protect the information you share with RK MINISTRIES.",
    updatedAt: "01 January 2026",
    sections: fallbackSections,
  });

  useEffect(() => {
    document.title = `${policyData.title} — RK MINISTRIES`;
  }, [policyData.title]);

  useEffect(() => {
    api.get("/policies/privacy-policy")
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
            title: raw.title || "Privacy Policy",
            description: raw.description || "Your privacy matters to us. This policy explains how we collect, use and protect the information you share with RK MINISTRIES.",
            updatedAt: raw.updatedAt || "01 January 2026",
            sections: parsedSections.length > 0 ? parsedSections : fallbackSections,
          });
        }
      })
      .catch((err) => {
        console.warn("Could not load dynamic privacy policy from API, using fallback:", err);
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
