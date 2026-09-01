import { useState } from 'react';
import ProductName from './ProductName';

export default function ProductModal({ isOpen, product, onClose, onInquire }) {
    const [zoomed, setZoomed] = useState(false);
    if (!isOpen || !product) return null;

    return (
        <div className="modal-overlay active" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) onClose(); }}>
            <div className="modal-content">
                <i className="fa-solid fa-xmark close-btn" onClick={onClose}></i>
                <button className="image-preview-button" type="button" onClick={() => setZoomed(true)} aria-label={`View ${product.name} image larger`}>
                    <img src={product.img} alt={product.name} className="modal-product-img" />
                    <span className="image-preview-hint"><i className="fa-solid fa-magnifying-glass-plus"></i> Click image to enlarge</span>
                </button>
                <h5 className="modal-product-label">Formulation</h5>
                <h3><ProductName product={product} /></h3>
                <p className="modal-product-combo">{product.combo}</p>
                <div className="modal-actions">
                    <button className="btn-primary btn-full-width" onClick={() => { onClose(); if (onInquire) onInquire(); }}>
                        Request Details <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>

            {zoomed && (
                <div className="image-lightbox" onClick={() => setZoomed(false)}>
                    <button className="image-lightbox-close" type="button" onClick={() => setZoomed(false)} aria-label="Close image">&times;</button>
                    <img src={product.img} alt={`${product.name} enlarged`} onClick={(e) => e.stopPropagation()} />
                </div>
            )}
        </div>
    );
}
