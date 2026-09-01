import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header({ openInquiry }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) setScrolled(true);
            else setScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header id="header" className={scrolled ? 'scrolled' : ''}>
            <div className="logo">
                <Link to="/">
                    <img src="/logo.png" alt="Ansh Healthcare Logo" />
                    <span className="logo-subtext">Ansh Healthcare</span>
                </Link>
            </div>
            <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">Legacy</a></li>
                <li><a href="#therapies">Therapies</a></li>
                <li><Link to="/products">Products</Link></li>
                <li><a href="#stockists">Stockists</a></li>
            </ul>
            <button className="btn-primary js-open-inquiry" onClick={openInquiry}>
                Inquiry <i className="fa-solid fa-arrow-right"></i>
            </button>
        </header>
    );
}
