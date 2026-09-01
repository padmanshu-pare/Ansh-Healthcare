import { Link } from 'react-router-dom';

export default function NotFound() {
  return <main className="not-found-page"><div className="not-found-card"><span className="info-eyebrow">ERROR 404</span><h1>Page not found.</h1><p>The page you're looking for doesn't exist or may have moved.</p><div className="not-found-actions"><Link className="btn-primary" to="/">Back to Home <i className="fa-solid fa-arrow-right" /></Link><Link className="btn-secondary" to="/products">View Portfolio</Link></div></div></main>;
}
