import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Privacy Policy | Ecomsavy",
  description:
    "Learn how Ecomsavy collects, uses, and protects your personal and business information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" updatedAt="February 5, 2026">
      <p>
        This Privacy Policy explains how <strong>Ecomsavy</strong> collects,
        uses, discloses, and protects your information when you access our
        website or use our services.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We may collect the following types of data:</p>
      <ul>
        <li>
          <strong>Personal Information:</strong> Name, phone number, email
          address, business name, payment details, and other data provided when
          filling out forms, making inquiries, or purchasing services.
        </li>
        <li>
          <strong>Business Information:</strong> Store credentials (e.g., Daraz,
          Shopify), product details, marketing data, and service preferences
          shared during our working relationship.
        </li>
        <li>
          <strong>Technical Data:</strong> IP address, browser type, device
          identifiers, cookies, and site usage patterns.
        </li>
        <li>
          <strong>Communication Records:</strong> Emails, chats, call summaries,
          and client feedback for service tracking and quality assurance.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use collected data to:</p>
      <ul>
        <li>
          Deliver and manage our services, including Daraz account handling,
          marketing campaigns, web development, warehousing, and related
          services.
        </li>
        <li>
          Communicate service updates, project requirements, or billing-related
          notices.
        </li>
        <li>
          Optimize performance using data-driven improvements and reporting.
        </li>
        <li>
          Send promotional or informational messages unless you choose to opt
          out.
        </li>
        <li>
          Monitor site activity for analytics, performance optimization, and
          security.
        </li>
        <li>Fulfill legal and regulatory obligations.</li>
      </ul>

      <h2>3. Data Sharing and Disclosure</h2>
      <p>We do not sell your personal data. We may share data in the following circumstances:</p>
      <ul>
        <li>
          <strong>With Trusted Partners:</strong> Hosting providers, payment
          gateways, advertising platforms, and internal contractors, solely for
          service delivery.
        </li>
        <li>
          <strong>Legal Compliance:</strong> When required by law, court order,
          or to protect the rights, property, or safety of Ecomsavy.
        </li>
        <li>
          <strong>Business Transfers:</strong> In the event of a merger,
          acquisition, or restructuring, your data may be transferred to a
          successor entity.
        </li>
      </ul>

      <h2>4. Data Security</h2>
      <p>
        We implement commercially reasonable safeguards such as SSL encryption,
        access controls, and internal confidentiality practices. However, no
        system is completely secure, and we cannot guarantee absolute data
        protection.
      </p>

      <h2>5. Cookies &amp; Tracking</h2>
      <p>We use cookies and similar technologies to:</p>
      <ul>
        <li>Enhance your browsing experience</li>
        <li>Understand visitor behavior on our website</li>
        <li>Run remarketing and retargeting campaigns</li>
      </ul>
      <p>
        You may control cookie preferences through your browser settings.
      </p>

      <h2>6. Your Rights</h2>
      <p>Depending on your region, you may have the right to:</p>
      <ul>
        <li>Request access to or a copy of your personal data</li>
        <li>Request correction or deletion of your data</li>
        <li>Object to certain data processing practices</li>
        <li>Withdraw consent where applicable</li>
      </ul>
      <p>
        To exercise these rights, contact us at{" "}
        <a href="mailto:support@ecomsavy.com">support@ecomsavy.com</a>.
      </p>

      <h2>7. Children’s Privacy</h2>
      <p>
        Ecomsavy does not knowingly collect data from individuals under the age
        of 13. If such data is identified, it will be deleted immediately.
      </p>

      <h2>8. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites. We are not
        responsible for their privacy practices or content. Please review their
        policies independently.
      </p>

      <h2>9. Policy Updates</h2>
      <p>
        We may update this Privacy Policy periodically. Any changes will be
        posted on this page with an updated effective date.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        For questions, feedback, or data-related requests, contact us:
      </p>
      <ul>
        <li>
          Email:{" "}
          <a href="mailto:info@ecomsavy.com">info@ecomsavy.com</a>
        </li>
        <li>Phone: +92-335-3866461</li>
        <li>
          Website:{" "}
          <a href="https://ecomsavy.com" target="_blank" rel="noopener noreferrer">
            https://ecomsavy.com
          </a>
        </li>
      </ul>
    </LegalLayout>
  );
}
