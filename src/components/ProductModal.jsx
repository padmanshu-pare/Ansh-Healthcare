import { useRef } from 'react';

export default function ProductModal({ isOpen, product, onClose, onInquire }) {
    const imgRef = useRef(null);

    if (!isOpen || !product) return null;

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        // Calculate percentages based on mouse location inside the image
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        
        imgRef.current.style.transformOrigin = `${x}% ${y}%`;
        imgRef.current.style.transform = "scale(2.5)";
    };

    const handleMouseLeave = () => {
        imgRef.current.style.transformOrigin = "center";
        imgRef.current.style.transform = "scale(1)";
    };

    return (
        <div className="catalog-modal-overlay" style={{ display: 'flex' }} onClick={(e) => { if(e.target.className === 'catalog-modal-overlay') onClose(); }}>
            <div className="catalog-modal-content">
                <span className="catalog-modal-close" onClick={onClose}>&times;</span>
                <div className="catalog-modal-left">
                    <img 
                        ref={imgRef}
                        src={product.img} 
                        alt={product.name}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>
                <div className="catalog-modal-right">
                    <span className="category-tag">{product.category}</span>
                    <h2>{product.name}</h2>
                    <p style={{ margin: "20px 0", color: "#4b5563", fontSize: "18px" }}>{product.combo}</p>
                    <button className="btn-quote" onClick={() => { onClose(); if(onInquire) onInquire(); }}>
                        Inquire Now <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
