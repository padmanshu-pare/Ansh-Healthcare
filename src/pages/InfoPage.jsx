import { Link } from 'react-router-dom';

export function PageHero({ eyebrow, title, description }) {
  return (
    <section className="info-hero">
      <div className="info-hero-inner">
        <span className="info-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

export function InfoLayout({ eyebrow, title, description, children }) {
  return (
    <main className="info-page">
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <div className="info-container">{children}</div>
    </main>
  );
}

export function LegalPage({ eyebrow = 'ANSH HEALTHCARE', title, description, updated = 'September 2026', children }) {
  return (
    <InfoLayout eyebrow={eyebrow} title={title} description={description}>
      <div className="legal-meta">Last updated: {updated}</div>
      <article className="legal-card">{children}</article>
    </InfoLayout>
  );
}

export function CTA({ title = 'Ready to work with Ansh Healthcare?', text = 'Explore our portfolio or send us a business enquiry.', button = 'Send an Enquiry' , onClick, href, to = '/contact' }) {
  return (
    <section className="info-cta">
      <div>
        <span className="info-eyebrow">PARTNER WITH US</span>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      {onClick ? (
        <button className="btn-primary" onClick={onClick}>{button} <i className="fa-solid fa-arrow-right" /></button>
      ) : href ? (
        <a className="btn-primary" href={href} target="_blank" rel="noreferrer">{button} <i className="fa-solid fa-arrow-right" /></a>
      ) : (
        <Link className="btn-primary" to={to}>{button} <i className="fa-solid fa-arrow-right" /></Link>
      )}
    </section>
  );
}
