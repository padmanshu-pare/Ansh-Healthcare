import { useState } from 'react';

export default function InquiryModal({ isOpen, onClose }) {
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('');

        const form = e.target;
        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/mvzwnaky", {
                method: "POST",
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                setStatus("✅ Inquiry sent successfully! Thank you for reaching out.");
                form.reset();
                setTimeout(() => {
                    onClose();
                    setStatus('');
                }, 1500);
            } else {
                setStatus("❌ Something went wrong. Try again.");
            }
        } catch (error) {
            setStatus("⚠️ Network error. Try again.");
        }

        setIsSubmitting(false);
    };

    return (
        <div className="modal-overlay active" onClick={(e) => { if(e.target.classList.contains('modal-overlay')) onClose() }}>
            <div className="modal-content inquiry-modal-content">
                <i className="fa-solid fa-xmark close-btn js-close-inquiry" onClick={onClose}></i>
                <h5>Get in Touch</h5>
                <h3>Wholesale Inquiry</h3>

                <form onSubmit={handleSubmit} className="inquiry-form">
                    <div className="input-group">
                        <label>Full Name / Firm Name</label>
                        <input type="text" name="name" placeholder="e.g. Rajesh Yadav / Apex Pharma" required />
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input type="email" name="email" placeholder="rajesh@example.com" required />
                    </div>

                    <div className="input-group">
                        <label>Mobile Number</label>
                        <input type="number" name="mobile" placeholder="+91 98765 43210" required />
                    </div>

                    <div className="input-group">
                        <label>Requirements / Description</label>
                        <textarea name="message" rows="4" placeholder="Tell us about the medicines..." required></textarea>
                    </div>
                    <button type="submit" className="btn-primary btn-full-width inquiry-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : <>Submit Inquiry <i className="fa-solid fa-paper-plane"></i></>}
                    </button>
                    <p className="form-status-msg" style={{color: status.includes('✅') ? 'green' : (status.includes('❌') ? 'red' : 'orange')}}>{status}</p>
                </form>
            </div>
        </div>
    );
}
