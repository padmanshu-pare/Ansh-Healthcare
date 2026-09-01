import { LegalPage } from './InfoPage';

export function PrivacyPage() {
  return <LegalPage title="Privacy Policy" description="How Ansh Healthcare handles information submitted through this website.">
    <h2>1. Scope</h2><p>This Privacy Policy applies to information you submit through Ansh Healthcare website forms, enquiries and business communications initiated from this website.</p>
    <h2>2. Information we may receive</h2><p>Depending on your interaction, this may include your name, firm name, email address, mobile number, city/state, business type, product interests and the contents of your enquiry.</p>
    <h2>3. How information is used</h2><ul><li>To respond to product, wholesale, franchise and distribution enquiries.</li><li>To communicate about your requested business opportunity.</li><li>To maintain enquiry records and improve website/service communication.</li><li>To protect the website and prevent misuse.</li></ul>
    <h2>4. Third-party services</h2><p>Website forms or communication tools may use third-party service providers to transmit enquiries. Information is handled according to the applicable provider's terms and privacy practices.</p>
    <h2>5. Retention and security</h2><p>We take reasonable measures to protect submitted information and retain it only as reasonably necessary for legitimate business, operational or legal purposes.</p>
    <h2>6. Your choices</h2><p>You may contact Ansh Healthcare to request clarification about information you have submitted or to raise a privacy concern.</p>
    <h2>7. Updates</h2><p>This policy may be updated when website functionality or legal requirements change. The latest version will be published on this page.</p>
  </LegalPage>;
}

export function TermsPage() {
  return <LegalPage title="Terms & Conditions" description="Terms governing use of the Ansh Healthcare website and its public product information.">
    <h2>1. Website use</h2><p>By using this website, you agree to use it lawfully and not to interfere with its operation, security or availability.</p>
    <h2>2. Product information</h2><p>Product names, categories, compositions and other information are provided for general business and informational purposes. Always verify product information and applicable requirements with the appropriate professional or Ansh Healthcare representative before making a commercial or clinical decision.</p>
    <h2>3. No guarantee of availability</h2><p>Listing a product on the website does not guarantee stock, pricing, territory availability, appointment of a distributor or acceptance of an enquiry.</p>
    <h2>4. Intellectual property</h2><p>Website design, branding, text, product presentation and original assets are protected by applicable intellectual property laws. Do not reproduce them for commercial use without permission.</p>
    <h2>5. External services</h2><p>The website may link to third-party services such as WhatsApp or enquiry-processing tools. Their own terms apply when you use those services.</p>
    <h2>6. Changes</h2><p>Ansh Healthcare may update website content, product information, features or these terms without prior notice.</p>
  </LegalPage>;
}

export function DisclaimerPage() {
  return <LegalPage title="Website Disclaimer" description="Important information about the purpose and limitations of content published on this website.">
    <h2>Informational and business use</h2><p>This website is intended to present Ansh Healthcare, its product portfolio and business partnership opportunities. Website content should not be interpreted as a substitute for professional medical advice, diagnosis or treatment.</p>
    <h2>Product decisions</h2><p>Do not rely solely on website content for prescribing, dispensing, dosing or treatment decisions. Healthcare professionals should consult current approved product information and applicable regulations.</p>
    <h2>Commercial enquiries</h2><p>Submitting an enquiry does not create a distribution agreement, franchise appointment, purchase order or other binding commercial relationship.</p>
    <h2>Accuracy</h2><p>We aim to keep information useful and current, but website content can change and may contain inadvertent errors. Please confirm critical product or commercial information with Ansh Healthcare before acting on it.</p>
  </LegalPage>;
}

export function MedicalDisclaimerPage() {
  return <LegalPage title="Medical & Product Disclaimer" description="Important safety notice for pharmaceutical product information published on this website.">
    <h2>For healthcare professionals</h2><p>Product information on this website is provided for general informational and portfolio purposes. It is not intended to replace the approved prescribing information, professional judgement, diagnosis or treatment plan of a qualified healthcare professional.</p>
    <h2>Patients and consumers</h2><p>Do not start, stop or change a medicine based solely on information displayed on this website. Consult a qualified healthcare professional for advice relevant to your condition and medicines.</p>
    <h2>Composition and availability</h2><p>Formulations, packaging, strengths, availability and other product details may change. Confirm the current approved information before prescribing, dispensing, purchasing or distributing any product.</p>
    <h2>Emergency situations</h2><p>This website is not an emergency medical service. For urgent medical concerns, contact an appropriate emergency or healthcare service.</p>
  </LegalPage>;
}

export function CookiePage() {
  return <LegalPage title="Cookie Policy" description="Information about cookies and similar technologies used by this website.">
    <h2>What cookies are</h2><p>Cookies are small data files stored by a browser to remember preferences or support website functionality.</p>
    <h2>How this website may use them</h2><p>The website may use strictly necessary browser storage or similar technologies to support functionality such as remembering interface state. If analytics or other non-essential tracking is introduced, this policy will be updated accordingly.</p>
    <h2>Managing cookies</h2><p>You can control or delete cookies through your browser settings. Blocking necessary storage may affect some website features.</p>
    <h2>Third-party links</h2><p>External services opened from this website, such as WhatsApp, may use their own cookies or tracking technologies under their own policies.</p>
  </LegalPage>;
}

export function AccessibilityPage() {
  return <LegalPage title="Accessibility Statement" description="Our commitment to making the Ansh Healthcare website usable by as many people as possible.">
    <h2>Our commitment</h2><p>We aim to provide a website that is clear, readable and usable across modern devices and assistive technologies.</p>
    <h2>Accessibility practices</h2><ul><li>Meaningful headings and structured content.</li><li>Keyboard-friendly controls where practical.</li><li>Readable text and contrast-conscious interface elements.</li><li>Alternative text for meaningful images.</li><li>Responsive layouts for desktop and mobile screens.</li></ul>
    <h2>Feedback</h2><p>If you encounter an accessibility barrier, please use the Contact / Enquiry option and describe the page and issue so it can be reviewed.</p>
  </LegalPage>;
}

export function SecurityPage() {
  return <LegalPage title="Security & Responsible Disclosure" description="Basic security practices and a responsible route for reporting website security concerns.">
    <h2>Security approach</h2><p>We aim to use reasonable technical and operational safeguards for the website and information submitted through it.</p>
    <h2>Report a security concern</h2><p>If you discover a suspected vulnerability, please report it privately through the website's contact/enquiry route with enough information to reproduce the issue. Please do not publicly disclose or exploit a suspected vulnerability while it is being reviewed.</p>
    <h2>Scope</h2><p>This page covers the public website. Third-party services linked from the website may have separate security practices and reporting processes.</p>
  </LegalPage>;
}
