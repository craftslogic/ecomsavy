import LegalLayout from "@/components/LegalLayout";

export const metadata = {
  title: "Disclaimer | Ecomsavy",
  description:
    "Legal disclaimer outlining the limitations, responsibilities, and risks associated with using Ecomsavy’s services and content.",
};

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer" updatedAt="February 5, 2026">
      <p>
        The information, services, strategies, and resources provided by{" "}
        <strong>Ecomsavy</strong> are for educational and informational purposes
        only. While we are committed to helping businesses grow through our
        eCommerce, Daraz, marketing, and digital solutions, we do not and cannot
        guarantee specific outcomes, results, or earnings.
      </p>

      <h2>No Earnings or Results Guarantee</h2>
      <p>
        All sales figures, marketing results, Daraz growth, or Shopify
        performance discussed by us—whether through case studies, testimonials,
        or promotional materials—are examples of what may be possible. They are
        not guarantees of what you or your business will achieve.
      </p>

      <p>Individual results may vary based on multiple factors, including but not limited to:</p>
      <ul>
        <li>Industry competitiveness</li>
        <li>Product pricing and availability</li>
        <li>Client responsiveness and communication</li>
        <li>Advertising budgets and campaign timing</li>
        <li>Execution of recommended strategies</li>
      </ul>

      <p>
        We do not claim that any client will earn a specific amount of revenue or
        reach a particular milestone unless explicitly agreed in writing under a
        special guarantee or performance clause.
      </p>

      <h2>Testimonials &amp; Case Studies</h2>
      <p>
        All testimonials, reviews, and case studies featured on our website or
        marketing materials are from real clients who followed our systems and
        strategies. However, these examples represent exceptional performance
        and are not intended to represent typical results.
      </p>
      <p>
        Your business journey, success rate, and timeline may differ
        significantly based on your circumstances and execution.
      </p>

      <h2>Responsibility &amp; Risk</h2>
      <p>
        By using our services or following our advice, you accept full
        responsibility for your actions and business decisions. Success in any
        digital venture involves inherent risks.
      </p>

      <p>Ecomsavy is not liable for:</p>
      <ul>
        <li>Financial losses</li>
        <li>Business interruptions</li>
        <li>
          Account suspensions or restrictions on third-party platforms such as
          Daraz, Facebook, or Shopify
        </li>
        <li>Failure to implement or execute recommended strategies correctly</li>
      </ul>

      <p>
        You are strongly encouraged to conduct your own due diligence before
        making business, financial, or marketing decisions based on any
        information provided by Ecomsavy.
      </p>

      <h2>Use of Information</h2>
      <p>
        Any content, training, or consulting provided by Ecomsavy should be
        interpreted as guidance only and not as legal, tax, or financial advice.
      </p>

      <p>
        You agree not to hold Ecomsavy, its founders, employees, or partners
        responsible for any damages or losses incurred as a result of using our
        services or relying on our materials.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Except where expressly covered under a specific service-level agreement
        or written contract, Ecomsavy shall not be liable for any:
      </p>
      <ul>
        <li>Loss of profit</li>
        <li>Data breaches</li>
        <li>Changes in third-party platform policies</li>
        <li>Technical errors or system failures</li>
        <li>Account restrictions or terminations by external platforms</li>
      </ul>

      <h2>Final Acknowledgment</h2>
      <p>
        By engaging with our services, content, or platform, you acknowledge
        that you have read, understood, and agreed to this Disclaimer.
      </p>
      <p>
        You also understand that your success depends on your own actions,
        decisions, and commitment—not solely on our input.
      </p>
    </LegalLayout>
  );
}
