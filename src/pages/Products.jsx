import { useState, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { formulations, portfolioCategories } from '../data/products';
import ProductName from '../components/ProductName';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Products({ openInquiry }) {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentCategory, setCurrentCategory] = useState(location.state?.category || 'all');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [zoomed, setZoomed] = useState(false);
    const modalImgRef = useRef(null);

    const filteredProducts = useMemo(() => {
        let filtered = formulations;
        if (currentCategory !== 'all') {
            filtered = filtered.filter(p => (p.categories || [p.category]).includes(currentCategory));
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.combo.toLowerCase().includes(query));
        }
        return filtered;
    }, [searchQuery, currentCategory]);

    useScrollReveal([filteredProducts]);

    const openModal = (product) => {
        setSelectedProduct(product);
        setZoomed(false);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setZoomed(false);
        document.body.style.overflow = 'auto';
    };

    const handleMouseMove = (e) => {
        if (!modalImgRef.current) return;
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        modalImgRef.current.style.transformOrigin = `${x}% ${y}%`;
        modalImgRef.current.style.transform = "scale(2.5)";
    };

    const handleMouseLeave = () => {
        if (!modalImgRef.current) return;
        modalImgRef.current.style.transformOrigin = "center";
        modalImgRef.current.style.transform = "scale(1)";
    };

    return (
        <div className="catalog-page" style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
            <header className="catalog-nav">
                <div className="logo">ANSH HEALTHCARE<span>.</span></div>
                <Link to="/" state={{ restorePortfolioScroll: true }} className="back-link"><i className="fa-solid fa-arrow-left"></i> Back to Home</Link>
            </header>

            <section className="catalog-hero">
                <div className="catalog-hero-inner">
                    <div className="hero-badge">OUR FORMULARIES</div>
                    <h1>Premium <span>Portfolio</span></h1>
                    <p>Discover our comprehensive range of high-quality formulations, tailored for maximum efficacy across all major therapies.</p>

                    <div className="modern-search">
                        <input 
                            type="text" 
                            id="searchInput"
                            placeholder="Search brands, compositions..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <i className="fa-solid fa-search search-icon"></i>
                    </div>
                </div>
            </section>

            <div className="modern-filters">
                <button className={`filter-btn ${currentCategory === 'all' ? 'active' : ''}`} onClick={() => setCurrentCategory('all')}>View All</button>
                {portfolioCategories.map((category) => (
                    <button key={category.key} className={`filter-btn ${currentCategory === category.key ? 'active' : ''}`} onClick={() => setCurrentCategory(category.key)}>
                        <i className={`fa-solid ${category.icon}`}></i> {category.label}
                    </button>
                ))}
            </div>

            <main className="product-grid" id="mainGrid" style={{ padding: "40px 5%" }}>
                {filteredProducts.map((product, idx) => (
                    <div key={idx} className="product-card reveal" onClick={() => openModal(product)} style={{ cursor: 'pointer' }}>
                        <div className="product-img-box"><img src={product.img} alt={product.name} /></div>
                        <div className="product-info">
                            <div className="status-row">
                                <span className="category-tag">{currentCategory === 'all' ? product.category : currentCategory}</span>
                                <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                                    <span className="dot"></span>
                                    <span className="stock-text">Stock Available</span>
                                </div>
                            </div>
                            <h3><ProductName product={product} /></h3>
                            <p className="product-composition">{product.combo}</p>
                            <button className="btn-quote">See Details</button>
                        </div>
                    </div>
                ))}
            </main>

            {/* Catalog Product Modal */}
            {selectedProduct && (
                <div className="catalog-modal-overlay" style={{ display: 'flex' }} onClick={(e) => { if (e.target.className === 'catalog-modal-overlay') closeModal(); }}>
                    <div className="catalog-modal-content">
                        <span className="catalog-modal-close" onClick={closeModal}>&times;</span>
                        <div className="catalog-modal-left">
                            <button type="button" className="catalog-image-button" onClick={() => setZoomed(true)} aria-label={`View ${selectedProduct.name} image larger`}>
                                <img 
                                    ref={modalImgRef}
                                    src={selectedProduct.img} 
                                    alt={selectedProduct.name}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                />
                                <span><i className="fa-solid fa-magnifying-glass-plus"></i> Click to enlarge</span>
                            </button>
                        </div>
                        <div className="catalog-modal-right">
                            <span className="category-tag">{selectedProduct.category}</span>
                            <h2><ProductName product={selectedProduct} /></h2>
                            <p style={{ margin: "20px 0", color: "#4b5563", fontSize: "18px" }}>{selectedProduct.combo}</p>
                            <div className="catalog-modal-actions">
                                {selectedProduct.pdf && <a className="btn-secondary" href={selectedProduct.pdf} target="_blank" rel="noreferrer"><i className="fa-solid fa-file-pdf"></i> Product PDF</a>}
                                <button className="btn-quote" onClick={() => { closeModal(); if(openInquiry) openInquiry(); }}>
                                    Inquire Now <i className="fa-solid fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {zoomed && selectedProduct && (
                <div className="image-lightbox catalog-lightbox" onClick={() => setZoomed(false)}>
                    <button className="image-lightbox-close" type="button" onClick={() => setZoomed(false)} aria-label="Close image">&times;</button>
                    <img src={selectedProduct.img} alt={`${selectedProduct.name} enlarged`} onClick={(e) => e.stopPropagation()} />
                </div>
            )}

            <footer style={{textAlign: "center", padding: "40px", fontSize: "12px", fontWeight: "800", textTransform: "uppercase"}}>
                COPYRIGHT © 2026 ANSH HEALTHCARE LTD.
            </footer>
        </div>
    );
}
