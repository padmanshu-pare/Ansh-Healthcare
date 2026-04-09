export default function ProductModal({ isOpen, product, onClose, onInquire }) {
    if (!isOpen || !product) return null;

    return (
        <div className="modal-overlay active" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) onClose(); }}>
            <div className="modal-content">
                <i className="fa-solid fa-xmark close-btn" onClick={onClose}></i>
                <img src={product.img} alt={product.name} className="modal-product-img" />
                <h5 className="modal-product-label">Formulation</h5>
                <h3>{product.name}</h3>
                <p className="modal-product-combo">{product.combo}</p>
                <button className="btn-primary btn-full-width" onClick={() => { onClose(); if (onInquire) onInquire(); }}>
                    Request Details <i className="fa-solid fa-paper-plane"></i>
                </button>
            </div>
        </div>
    );
}
