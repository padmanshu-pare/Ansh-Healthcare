import { Link } from 'react-router-dom';
import { InfoLayout, CTA } from './InfoPage';
import { portfolioCategories } from '../data/products';

export function AboutPage() {
  return (
    <InfoLayout eyebrow="ABOUT ANSH HEALTHCARE" title="Built for reliable pharmaceutical partnerships." description="A public-facing overview of Ansh Healthcare, our portfolio and our approach to distribution-led healthcare business.">
      <div className="content-grid two-col">
        <section className="content-card feature-card">
          <span className="info-eyebrow">OUR LEGACY</span>
          <h2>Healthcare, distribution and long-term relationships.</h2>
          <p>Ansh Healthcare is presented through this website as a pharmaceutical portfolio and business-partnership platform, helping stockists, distributors, franchise partners and healthcare businesses discover our products and start a conversation.</p>
          <p>Our focus is simple: a clear product portfolio, professional communication and dependable business enquiries.</p>
        </section>
        <section className="content-card dark-card">
          <span className="info-eyebrow">WHAT WE VALUE</span>
          <div className="value-list">
            <div><i className="fa-solid fa-circle-check" /><span><b>Clarity</b><small>Product information should be easy to find and understand.</small></span></div>
            <div><i className="fa-solid fa-handshake" /><span><b>Partnership</b><small>We build business relationships around communication and trust.</small></span></div>
            <div><i className="fa-solid fa-boxes-stacked" /><span><b>Portfolio</b><small>A structured portfolio across multiple therapeutic categories.</small></span></div>
          </div>
        </section>
      </div>
      <section className="content-section">
        <span className="info-eyebrow">OUR THERAPEUTIC PORTFOLIO</span>
        <h2>Categories</h2>
        <div className="category-list-grid">
          {portfolioCategories.map(category => (
            <Link key={category.key} to={`/products?category=${encodeURIComponent(category.key)}`} className="category-list-card">
              <i className={`fa-solid ${category.icon}`} />
              <span>{category.label}</span>
              <i className="fa-solid fa-arrow-right arrow" />
            </Link>
          ))}
        </div>
      </section>
      <CTA />
    </InfoLayout>
  );
}

export function FranchisePage({ openInquiry }) {
  return (
    <InfoLayout eyebrow="FRANCHISE & DISTRIBUTION" title="Partner with Ansh Healthcare." description="A dedicated business page for distributors, franchise partners, stockists and healthcare businesses exploring a partnership.">
      <section className="partner-banner">
        <div>
          <span className="info-eyebrow">BUSINESS OPPORTUNITY</span>
          <h2>Build your pharmaceutical business with a focused product portfolio.</h2>
          <p>Tell us about your market, business and the therapeutic categories you are interested in. Our team can review your enquiry and take the conversation forward.</p>
        </div>
        <button className="btn-primary" onClick={openInquiry}>Become a Partner <i className="fa-solid fa-arrow-right" /></button>
      </section>

      <section className="content-section">
        <span className="info-eyebrow">WHY PARTNER</span>
        <h2>A simple, professional partnership experience.</h2>
        <div className="benefit-grid">
          {[
            ['fa-boxes-stacked', 'Product Portfolio', 'Explore our current formulations across multiple therapeutic categories.'],
            ['fa-map-location-dot', 'Market Focus', 'Share your city, state and business profile so opportunities can be assessed clearly.'],
            ['fa-comments', 'Direct Enquiry', 'Use the enquiry flow to communicate your requirements without unnecessary steps.'],
            ['fa-file-pdf', 'Portfolio PDF', 'Download the complete product portfolio for internal review and business discussions.'],
          ].map(([icon, title, text]) => <div className="benefit-card" key={title}><i className={`fa-solid ${icon}`} /><h3>{title}</h3><p>{text}</p></div>)}
        </div>
      </section>

      <section className="content-section process-section">
        <span className="info-eyebrow">HOW IT WORKS</span>
        <h2>Partnership process</h2>
        <div className="process-grid">
          {['Submit your enquiry', 'Share your business profile', 'Discuss products & market', 'Move forward with the partnership'].map((step, index) => (
            <div className="process-step" key={step}><span>{String(index + 1).padStart(2, '0')}</span><h3>{step}</h3></div>
          ))}
        </div>
      </section>
      <CTA title="Have a distribution or franchise requirement?" text="Send your business details and product interests to start the conversation." button="Start Enquiry" onClick={openInquiry} />
    </InfoLayout>
  );
}

export function DistributorPage({ openInquiry }) {
  return (
    <InfoLayout eyebrow="BECOME A DISTRIBUTOR" title="Let's discuss your market." description="For distributors, PCD/franchise businesses, stockists and other pharmaceutical trade partners.">
      <section className="content-card distributor-intro">
        <span className="info-eyebrow">BUSINESS ENQUIRY</span>
        <h2>Tell us where you operate and what you need.</h2>
        <p>Useful details include your city/state, business type, existing distribution network and the therapeutic categories or products you are interested in.</p>
        <button className="btn-primary" onClick={openInquiry}>Become a Distributor <i className="fa-solid fa-paper-plane" /></button>
      </section>
      <div className="content-grid two-col">
        <section className="content-card"><span className="info-eyebrow">IDEAL FOR</span><ul className="check-list"><li>Pharmaceutical distributors</li><li>PCD / franchise partners</li><li>Stockists and wholesalers</li><li>Retail and institutional healthcare businesses</li></ul></section>
        <section className="content-card"><span className="info-eyebrow">KEEP READY</span><ul className="check-list"><li>Full name and firm name</li><li>Mobile and email</li><li>City and state</li><li>Business type and product interests</li></ul></section>
      </div>
      <CTA title="Need the complete product list?" text="Review the consolidated Ansh Healthcare portfolio before sending your enquiry." button="Download Portfolio" href="/Ansh-Healthcare-Full-Product-Portfolio.pdf" />
    </InfoLayout>
  );
}

export function ContactPage({ openInquiry }) {
  return (
    <InfoLayout eyebrow="CONTACT ANSH HEALTHCARE" title="Start a business conversation." description="For product, wholesale, distribution, franchise and partnership enquiries, use the enquiry form or WhatsApp contact option.">
      <div className="contact-grid">
        <section className="content-card contact-card">
          <span className="info-eyebrow">QUICK CONTACT</span>
          <h2>We're ready to hear from you.</h2>
          <p>For the fastest route, send a structured enquiry with your business details and product requirements.</p>
          <button className="btn-primary" onClick={openInquiry}>Open Enquiry Form <i className="fa-solid fa-arrow-right" /></button>
          <a className="contact-row" href="https://wa.me/919425326084" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp" /><span><b>WhatsApp</b><small>Chat with Ansh Healthcare</small></span><i className="fa-solid fa-arrow-up-right-from-square" /></a>
        </section>
        <section className="content-card contact-card"><span className="info-eyebrow">WHAT TO INCLUDE</span><h2>Help us respond faster.</h2><ul className="check-list"><li>Your name / firm name</li><li>Mobile number and email</li><li>City and state</li><li>Distributor / franchise / stockist requirement</li><li>Products or therapeutic categories of interest</li></ul></section>
      </div>
      <CTA title="Prefer to browse first?" text="Explore the full portfolio and product details before contacting us." button="View Portfolio" />
    </InfoLayout>
  );
}
