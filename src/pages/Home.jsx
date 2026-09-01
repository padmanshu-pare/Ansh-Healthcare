import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { formulations } from '../data/products';
import ProductModal from '../components/ProductModal';
import ProductName from '../components/ProductName';
import { portfolioCategories } from '../data/products';

export default function Home({ openInquiry }) {
    useScrollReveal();

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const location = useLocation();

    // Initial Scroll Progress logic
    useEffect(() => {
        const handleScroll = () => {
            let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrolled = (winScroll / height) * 100;
            const progressEl = document.getElementById("scroll-progress");
            if (progressEl) progressEl.style.width = scrolled + "%";
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Restore the portfolio scroll position when returning from the catalog.
    useEffect(() => {
        if (!location.state?.restorePortfolioScroll) return;
        const saved = sessionStorage.getItem('ansh-portfolio-scroll');
        if (saved) {
            requestAnimationFrame(() => window.scrollTo({ top: Number(saved), behavior: 'instant' }));
            sessionStorage.removeItem('ansh-portfolio-scroll');
        }
    }, [location.state]);

    // Slider effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(s => (s + 1) % 2);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main>
            <div id="scroll-progress"></div>

            <section id="home" className="hero">
                <div className="hero-content reveal">
                    <h1>Scale Meets<br/><span>Precision.</span></h1>
                    <p>From massive wholesale distribution to world-class personalized healthcare, Ansh Healthcare redefines the medical supply chain.</p>
                    <button className="btn-primary" onClick={openInquiry}>Become a Partner <i className="fa-solid fa-arrow-right"></i></button>
                </div>
                <div className="hero-image reveal">
                    <div className="image-wrapper">
                        <img src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800&auto=format&fit=crop" alt="Premium Healthcare" />
                        <div className="decor-box"></div>
                    </div>
                </div>
            </section>

            <div className="marquee">
                <div className="marquee-content">
                    <span className="solid">PAN-INDIA DISTRIBUTION</span> <span>•</span> WHOLESALE EXCELLENCE <span>•</span> <span className="solid">PREMIUM HEALTHCARE</span> <span>•</span> 200+ SPECIALISTS <span>•</span>
                    <span className="solid">PAN-INDIA DISTRIBUTION</span> <span>•</span> WHOLESALE EXCELLENCE <span>•</span> <span className="solid">PREMIUM HEALTHCARE</span> <span>•</span> 200+ SPECIALISTS <span>•</span>
                </div>
            </div>

            <section id="about" className="about-section">
                <div className="watermark">LEGACY</div>
                <div className="about-content reveal">
                    <h2 className="section-title">A Legacy Since 2013</h2>
                    <p>At Ansh Healthcare, we are a massive medical ecosystem. As a <span className="highlight-text">premier wholesale distributor</span>, we form the backbone of local medical supply chains, ensuring high-quality pharmaceuticals are always accessible.</p>
                    <p>Running successfully for over a decade, we bring clinical excellence and pharmaceutical reliability to <span className="highlight-text">5+ major cities</span>.</p>
                </div>
            </section>

            <section id="stats" className="stats-section">
                <div className="stat-box reveal">
                    <h3 className="counter" data-target="100000">0</h3>
                    <p>Patients (Lakhs+)</p>
                </div>
                <div className="stat-box reveal">
                    <h3 className="counter" data-target="200">0</h3>
                    <p>Specialists</p>
                </div>
                <div className="stat-box reveal">
                    <h3 className="counter" data-target="13">0</h3>
                    <p>Years Strong</p>
                </div>
                <div className="stat-box reveal">
                    <h3 className="counter" data-target="5">0</h3>
                    <p>Major Cities</p>
                </div>
            </section>

            <section id="therapies" className="therapies-section">
                <h2 className="section-title reveal">Therapies</h2>
                <div className="therapies-card reveal">
                    {portfolioCategories.map((category) => (
                        <div className="therapy-item" key={category.key}>
                            <div className="therapy-icon"><i className={`fa-solid ${category.icon}`}></i></div>
                            <p>{category.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="products" className="products-section">
                <div className="watermark watermark-dark">PORTFOLIO</div>
                <h2 className="section-title reveal">Wholesale Products</h2>

                <div className="product-grid">
                    {portfolioCategories.map((category) => {
                        const count = formulations.filter((product) => (product.categories || [product.category]).includes(category.key)).length;
                        return (
                            <div className="product-card reveal" key={category.key}>
                                <span className="product-badge">{count} {count === 1 ? 'Product' : 'Products'}</span>
                                <i className={`fa-solid ${category.icon} product-icon`}></i>
                                <h4>{category.label}</h4>
                                <p>Explore our {category.label.toLowerCase()} formulations.</p>
                                <Link to="/products" state={{ category: category.key, restorePortfolioScroll: true }} onClick={() => sessionStorage.setItem('ansh-portfolio-scroll', String(window.scrollY))} className="product-link">View Portfolio <i className="fa-solid fa-arrow-right"></i></Link>
                            </div>
                        );
                    })}
                </div>

                <div className="formulations-index reveal">
                    <h3>Our Flagship Formulations</h3>
                    <p className="formulations-subtitle">Click any product to view its composition.</p>
                    
                    <div className="pill-grid" id="formulationGrid">
                        {formulations.map((product, idx) => (
                            <div key={idx} className="formulation-pill reveal" onClick={() => setSelectedProduct(product)}>
                                <img src={product.img} className="formulation-thumb" alt={product.name} />
                                <span className="formulation-name"><ProductName product={product} /></span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="portfolio-actions reveal">
                    <Link to="/products" state={{ restorePortfolioScroll: true }} onClick={() => sessionStorage.setItem('ansh-portfolio-scroll', String(window.scrollY))} className="btn-white">See Full Catalog</Link>
                    <a href="/ansh-healthcare-full-portfolio.pdf" download className="btn-white portfolio-pdf-btn"><i className="fa-solid fa-file-pdf"></i> Download Full Portfolio PDF</a>
                </div>
            </section>

            <ProductModal isOpen={!!selectedProduct} product={selectedProduct} onClose={() => setSelectedProduct(null)} onInquire={openInquiry} />

            <section id="stockists" className="stockists">
                <h2 className="section-title reveal">Premier Stockists</h2>
                <div className="stockist-grid">
                    <div className="stockist-card reveal">
                        <div className="stockist-avatar"><i className="fa-solid fa-building"></i></div>
                        <h4>MediCorp Dist.</h4>
                        <p>Mumbai</p>
                    </div>
                    <div className="stockist-card reveal">
                        <div className="stockist-avatar"><i className="fa-solid fa-truck-fast"></i></div>
                        <h4>Apex Supply</h4>
                        <p>Delhi</p>
                    </div>
                    <div className="stockist-card reveal">
                        <div className="stockist-avatar"><i className="fa-solid fa-warehouse"></i></div>
                        <h4>Global Health</h4>
                        <p>Bangalore</p>
                    </div>
                </div>
            </section>

            <section id="testimonials" className="testimonials">
                <div className="slider-container reveal">
                    <div className={`slide ${currentSlide === 0 ? 'active' : ''}`}>
                        <p>"Ansh Healthcare's wholesale medicine supply has been the most reliable partner we've had since 2013. Flawless operations."</p>
                        <h6>— Rahul M., Retail Partner</h6>
                    </div>
                    <div className={`slide ${currentSlide === 1 ? 'active' : ''}`}>
                        <p>"The scale of their network means our hospital is immediately connected with the exact pharmaceutical supplies we need."</p>
                        <h6>— Dr. Priya K., Hospital Director</h6>
                    </div>
                </div>
                <div className="slider-dots reveal">
                    <div className={`dot ${currentSlide === 0 ? 'active' : ''}`} onClick={() => setCurrentSlide(0)}></div>
                    <div className={`dot ${currentSlide === 1 ? 'active' : ''}`} onClick={() => setCurrentSlide(1)}></div>
                </div>
            </section>


        </main>
    );
}
