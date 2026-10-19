import { useEffect } from "react";
import LegalPage from "@/components/LegalPage";

export default function RefundPage() {
  useEffect(() => { document.title = "Refund Policy — Mahila Chetna Samiti "; }, []);

  return (
    <LegalPage
      title="Refund Policy"
      crumbLabel="Refund Policy"
      description="Mahila Chetna Samiti  values every contribution. Please read our refund policy carefully before donating."
      updated="01 January 2026"
      sections={[
        {
          title: "General Policy",
          body: <p>All donations made to Mahila Chetna Samiti  are considered voluntary contributions in support of our charitable mission. As such, donations are generally non-refundable once successfully processed.</p>,
        },
        {
          title: "Eligibility for Refund",
          body: (
            <>
              <p>A refund may be considered only under the following circumstances:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Duplicate transaction caused by a technical or payment-gateway error.</li>
                <li>Incorrect donation amount entered due to a verifiable typing error.</li>
                <li>Unauthorized transaction reported within 7 days of the charge.</li>
                <li>Failed transactions where the amount has been debited but no receipt was issued.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Refund Request Procedure",
          body: (
            <>
              <p>To request a refund, please email us at <a className="text-orange font-semibold" href="mailto:azaramesh@gmail.com">azaramesh@gmail.com</a> within 7 days of the transaction with the following details:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Full name and contact details of the donor.</li>
                <li>Date and amount of the donation.</li>
                <li>Transaction reference / receipt number.</li>
                <li>Reason for the refund request.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Processing Timeline",
          body: <p>Approved refunds will be processed within 7–14 working days and credited back to the original payment method. Bank or gateway charges, if any, may be deducted from the refund amount.</p>,
        },
        {
          title: "Tax Receipts on Refunds",
          body: <p>If a tax-exemption receipt has already been issued for a donation that is later refunded, the donor must return or surrender the original receipt. We are obligated to report such reversals in compliance with applicable tax laws.</p>,
        },
        {
          title: "Non-Refundable Contributions",
          body: (
            <>
              <p>The following contributions are not eligible for refund:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Donations made for completed or in-progress program implementation.</li>
                <li>Recurring donations already processed for past months.</li>
                <li>Membership fees once issued with an ID card or welcome kit.</li>
                <li>Donations made in someone else's name without consent.</li>
              </ul>
            </>
          ),
        },
        {
          title: "Contact for Refunds",
          body: <p>For any refund-related queries, please write to <a className="text-orange font-semibold" href="mailto:azaramesh@gmail.com">azaramesh@gmail.com</a> or call +91 95980 59289 during office hours (Mon–Sat, 10am–6pm IST).</p>,
        },
      ]}
    />
  );
}
