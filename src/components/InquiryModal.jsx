import { useState, useEffect, useRef } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mvzwnaky';
const RATE_LIMIT_KEY = 'ansh_healthcare_inquiry_submissions';
const MAX_SUBMISSIONS = 3;
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000;
const MIN_FORM_TIME = 4000;
const SUBMISSION_COOLDOWN = 30 * 1000;

function getSubmissionTimestamps() {
    try {
        const saved = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '[]');
        if (!Array.isArray(saved)) return [];
        const now = Date.now();
        return saved.filter((timestamp) => Number.isFinite(timestamp) && now - timestamp < RATE_LIMIT_WINDOW);
    } catch {
        return [];
    }
}

export default function InquiryModal({ isOpen, onClose }) {
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formOpenedAt = useRef(Date.now());

    // Start the anti-bot timer whenever the modal opens.
    useEffect(() => {
        if (isOpen) {
            formOpenedAt.current = Date.now();
            setStatus('');
        }
    }, [isOpen]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setStatus('');
        const form = e.currentTarget;
        const data = new FormData(form);
        const now = Date.now();

        // Honeypot: real users never see or fill this field.
        const honeypot = String(data.get('_gotcha') || '').trim();
        if (honeypot) {
            setStatus('❌ Unable to submit this inquiry. Please try again.');
            return;
        }

        // Reject forms submitted unrealistically fast by simple bots/scripts.
        if (now - formOpenedAt.current < MIN_FORM_TIME) {
            setStatus('⚠️ Please take a moment to complete the form and try again.');
            return;
        }

        // Lightweight browser/device rate limit. Only successful submissions are counted.
        const timestamps = getSubmissionTimestamps();
        if (timestamps.length >= MAX_SUBMISSIONS) {
            setStatus('⚠️ You have reached the inquiry limit for today. Please try again tomorrow.');
            return;
        }

        // Prevent rapid repeated submissions even before the 24-hour limit is reached.
        const lastSubmission = timestamps[timestamps.length - 1];
        if (lastSubmission && now - lastSubmission < SUBMISSION_COOLDOWN) {
            setStatus('⚠️ Please wait a little before sending another inquiry.');
            return;
        }

        // Basic client-side validation before anything reaches Formspree.
        const name = String(data.get('name') || '').trim();
        const email = String(data.get('email') || '').trim();
        const mobile = String(data.get('mobile') || '').trim();
        const message = String(data.get('message') || '').trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileDigits = mobile.replace(/\D/g, '');

        if (name.length < 2 || name.length > 100) {
            setStatus('❌ Please enter a valid name or firm name.');
            return;
        }
        if (!emailPattern.test(email)) {
            setStatus('❌ Please enter a valid email address.');
            return;
        }
        if (mobileDigits.length < 10 || mobileDigits.length > 15) {
            setStatus('❌ Please enter a valid mobile number.');
            return;
        }
        if (message.length < 10 || message.length > 2000) {
            setStatus('❌ Please provide a little more detail about your requirements.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' }
            });

            if (response.ok) {
                const updatedTimestamps = [...timestamps, now].slice(-MAX_SUBMISSIONS);
                try {
                    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(updatedTimestamps));
                } catch {
                    // If storage is unavailable, the form can still be submitted normally.
                }

                setStatus('✅ Inquiry sent successfully! Thank you for reaching out.');
                form.reset();
                formOpenedAt.current = Date.now();
                setTimeout(() => {
                    onClose();
                    setStatus('');
                }, 1500);
            } else {
                setStatus('❌ Something went wrong. Please try again.');
            }
        } catch {
            setStatus('⚠️ Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay active" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) onClose(); }}>
            <div className="modal-content inquiry-modal-content">
                <i className="fa-solid fa-xmark close-btn js-close-inquiry" onClick={onClose}></i>
                <h5>Get in Touch</h5>
                <h3>Wholesale Inquiry</h3>

                <form onSubmit={handleSubmit} className="inquiry-form">
                    {/* Honeypot anti-spam field. Hidden from normal visitors; bots often fill it. */}
                    <div className="inquiry-honeypot" aria-hidden="true">
                        <label htmlFor="website">Website</label>
                        <input
                            id="website"
                            type="text"
                            name="_gotcha"
                            tabIndex="-1"
                            autoComplete="off"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="inquiry-name">Full Name / Firm Name</label>
                        <input id="inquiry-name" type="text" name="name" placeholder="e.g. Rajesh Yadav / Apex Pharma" minLength="2" maxLength="100" autoComplete="name" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="inquiry-email">Email Address</label>
                        <input id="inquiry-email" type="email" name="email" placeholder="rajesh@example.com" maxLength="254" autoComplete="email" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="inquiry-mobile">Mobile Number</label>
                        <input id="inquiry-mobile" type="tel" name="mobile" placeholder="+91 98765 43210" inputMode="tel" autoComplete="tel" maxLength="20" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="inquiry-message">Requirements / Description</label>
                        <textarea id="inquiry-message" name="message" rows="4" placeholder="Tell us about the medicines..." minLength="10" maxLength="2000" required></textarea>
                    </div>
                    <button type="submit" className="btn-primary btn-full-width inquiry-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : <>Submit Inquiry <i className="fa-solid fa-paper-plane"></i></>}
                    </button>
                    <p className="form-status-msg" role="status" aria-live="polite" style={{color: status.includes('✅') ? 'green' : (status.includes('❌') ? 'red' : 'orange')}}>{status}</p>
                </form>
            </div>
        </div>
    );
}
