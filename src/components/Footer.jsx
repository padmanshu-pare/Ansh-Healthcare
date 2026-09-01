import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="mega-footer">
            <div className="footer-brand-row">
                <div>
                    <img src="/logo.png" alt="Ansh Healthcare" className="footer-logo" />
                    <h3>ANSH HEALTHCARE</h3>
                    <p>Pharmaceutical portfolio & business partnerships.</p>
                </div>
                <a className="footer-pdf-link" href="/Ansh-Healthcare-Full-Product-Portfolio.pdf" target="_blank" rel="noreferrer"><i className="fa-solid fa-file-pdf" /> Download Full Portfolio PDF</a>
            </div>
            <div className="footer-grid">
                <div className="footer-col"><h5>Company</h5><Link to="/about">About Us</Link><Link to="/products">Portfolio</Link><Link to="/contact">Contact</Link></div>
                <div className="footer-col"><h5>Business</h5><Link to="/franchise">Franchise & Distribution</Link><Link to="/distributor">Become a Distributor</Link><Link to="/contact">Business Enquiry</Link></div>
                <div className="footer-col"><h5>Resources</h5><a href="/Ansh-Healthcare-Full-Product-Portfolio.pdf" target="_blank" rel="noreferrer">Full Portfolio PDF</a><Link to="/medical-disclaimer">Medical Disclaimer</Link><Link to="/accessibility">Accessibility</Link></div>
                <div className="footer-col"><h5>Legal & Security</h5><Link to="/privacy-policy">Privacy Policy</Link><Link to="/terms-and-conditions">Terms & Conditions</Link><Link to="/disclaimer">Website Disclaimer</Link><Link to="/cookie-policy">Cookie Policy</Link><Link to="/security">Security</Link></div>
            </div>
            <div className="footer-bottom">
                <div className="footer-copy">Copyright © 2026 Ansh Healthcare Ltd. <span>•</span> <Link to="/privacy-policy">Privacy</Link> <span>•</span> <Link to="/terms-and-conditions">Terms</Link></div>
                <div className="social-icons"><a href="https://wa.me/919425326084" target="_blank" rel="noreferrer" title="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a></div>
            </div>
        </footer>
    );
}
