import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header({ openInquiry }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header id="header" className={`${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
            <div className="logo">
                <Link to="/" onClick={closeMenu}>
                    <img src="/logo.png" alt="Ansh Healthcare Logo" />
                    <span className="logo-subtext">Ansh Healthcare</span>
                </Link>
            </div>
            <button className="mobile-menu-btn" aria-label="Toggle navigation" onClick={() => setMenuOpen(v => !v)}>
                <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} />
            </button>
            <ul className="nav-links">
                <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                <li><a href="/#therapies" onClick={closeMenu}>Therapies</a></li>
                <li><Link to="/products" onClick={closeMenu}>Products</Link></li>
                <li><Link to="/franchise" onClick={closeMenu}>Partner</Link></li>
                <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
            </ul>
            <button className="btn-primary js-open-inquiry header-inquiry" onClick={() => { closeMenu(); openInquiry(); }}>
                Inquiry <i className="fa-solid fa-arrow-right"></i>
            </button>
        </header>
    );
}
