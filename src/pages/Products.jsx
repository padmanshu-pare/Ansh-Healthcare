import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formulations } from '../data/products';
import ProductModal from '../components/ProductModal';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Products({ openInquiry }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentCategory, setCurrentCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const filteredProducts = useMemo(() => {
        let filtered = formulations;
        if (currentCategory !== 'all') {
            filtered = filtered.filter(p => p.category === currentCategory);
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.combo.toLowerCase().includes(query));
        }
        return filtered;
    }, [searchQuery, currentCategory]);

    useScrollReveal([filteredProducts]);

    return (
        <div className="catalog-page" style={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
            <header className="catalog-nav">
                <div className="logo">ANSH HEALTHCARE<span>.</span></div>
                <Link to="/" className="back-link"><i className="fa-solid fa-arrow-left"></i> Back to Home</Link>
            </header>

            <section className="catalog-hero">
                <div className="catalog-hero-inner">
                    <div className="hero-badge">OUR FORMULARIES</div>
                    <h1>Premium <span>Portfolio</span></h1>
                    <p>Discover our comprehensive range of high-quality formulations, tailored for maximum efficacy across all major therapies.</p>

                    <div className="modern-search">
                        <input 
                            type="text" 
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
                <button className={`filter-btn ${currentCategory === 'Gastro' ? 'active' : ''}`} onClick={() => setCurrentCategory('Gastro')}><i className="fa-solid fa-pills"></i> Gastroenterology</button>
                <button className={`filter-btn ${currentCategory === 'Cardio' ? 'active' : ''}`} onClick={() => setCurrentCategory('Cardio')}><i className="fa-solid fa-heart-pulse"></i> Cardiology</button>
                <button className={`filter-btn ${currentCategory === 'Neuro' ? 'active' : ''}`} onClick={() => setCurrentCategory('Neuro')}>Neurology</button>
                <button className={`filter-btn ${currentCategory === 'Diabetic' ? 'active' : ''}`} onClick={() => setCurrentCategory('Diabetic')}>Diabetology</button>
                <button className={`filter-btn ${currentCategory === 'Other' ? 'active' : ''}`} onClick={() => setCurrentCategory('Other')}>Specialty</button>
            </div>

            <main className="product-grid" id="mainGrid" style={{ padding: "40px 5%" }}>
                {filteredProducts.map((product, idx) => (
                    <div key={idx} className="product-card reveal" onClick={() => setSelectedProduct(product)} style={{ cursor: 'pointer' }}>
                        <div className="product-img-box"><img src={product.img} alt={product.name} /></div>
                        <div className="product-info">
                            <div className="status-row">
                                <span className="category-tag">{product.category}</span>
                                <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                                    <span className="dot"></span>
                                    <span className="stock-text">Stock Available</span>
                                </div>
                            </div>
                            <h3>{product.name}</h3>
                            <p className="product-composition">{product.combo}</p>
                            <button className="btn-quote">See Details</button>
                        </div>
                    </div>
                ))}
            </main>

            <ProductModal isOpen={!!selectedProduct} product={selectedProduct} onClose={() => setSelectedProduct(null)} onInquire={openInquiry} />

            <footer style={{textAlign: "center", padding: "40px", fontSize: "12px", fontWeight: "800", textTransform: "uppercase"}}>
                COPYRIGHT © 2026 ANSH HEALTHCARE LTD.
            </footer>
        </div>
    );
}
