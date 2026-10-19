import { useEffect } from "react";
import LegalPage from "@/components/LegalPage";

export default function PrivacyPage() {
  useEffect(() => { document.title = "Privacy Policy — Mahila Chetna Samiti "; }, []);

  return (
    <LegalPage
      title="Privacy Policy"
      crumbLabel="Privacy Policy"
      description="Your privacy matters to us. This policy explains how we collect, use and protect the information you share with Mahila Chetna Samiti ."
      updated="01 January 2026"
      sections={[
        {
          title: "Introduction",
          body: <p>Mahila Chetna Samiti  is committed to protecting the privacy of donors, members, volunteers and visitors. This policy outlines our practices regarding the collection, use and disclosure of personal information.</p>,
        },
        {
          title: "Information We Collect",
          body: (
            <>
              <p>We may collect the following information:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Personal:</strong> Name, email, phone, address, PAN (for donations).</li>
                <li><strong>Payment:</strong> Transaction details processed via secure payment gateways. We do not store card or banking credentials.</li>
                <li><strong>Technical:</strong> IP address, browser type, device information and pages visited.</li>
                <li><strong>Voluntary:</strong> Any other information you choose to share via forms, surveys or correspondence.</li>
              </ul>
            </>
          ),
        },
        {
          title: "How We Use Your Information",
          body: (
            <>
              <p>Your information is used to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Process donations and issue 80G receipts.</li>
                <li>Manage memberships, volunteer enrolments and programs.</li>
                <li>Send updates, newsletters and impact reports (you can opt out anytime).</li>
                <li>Respond to your queries and improve our services.</li>
                <li>Comply with legal, regulatory and reporting requirements.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Data Sharing",
          body: (
            <>
              <p>We do not sell, rent or trade your personal information. We may share data only:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>With payment gateways and service providers necessary to complete a transaction.</li>
                <li>With auditors, regulators or government authorities as required by law.</li>
                <li>With trusted partners under strict confidentiality, only when essential to deliver our programs.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Cookies & Analytics",
          body: <p>Our website may use cookies and analytics tools to improve user experience and understand site usage. You can disable cookies in your browser settings, though some site features may not function properly.</p>,
        },
        {
          title: "Data Security",
          body: <p>We implement reasonable physical, electronic and managerial safeguards to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>,
        },
        {
          title: "Your Rights",
          body: (
            <>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access, correct or delete your personal information.</li>
                <li>Withdraw consent or unsubscribe from communications.</li>
                <li>Request a copy of the data we hold about you.</li>
              </ul>
              <p>To exercise these rights, email us at <a className="text-orange font-semibold" href="mailto:azaramesh@gmail.com">azaramesh@gmail.com</a>.</p>
            </>
          ),
        },
        {
          title: "Children's Privacy",
          body: <p>We do not knowingly collect personal information from children under 13 without parental consent. If you believe we have collected such data inadvertently, please contact us for prompt removal.</p>,
        },
        {
          title: "Policy Updates",
          body: <p>This policy may be updated periodically. The "Last updated" date at the top of this page reflects the most recent revision. Please review it from time to time.</p>,
        },
      ]}
    />
  );
}
