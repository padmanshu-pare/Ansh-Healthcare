import { useState, useEffect } from 'react';

export default function WhatsAppPopup() {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        // It used to reappear after 60 seconds
        setTimeout(() => {
            setIsVisible(true);
        }, 60000);
    };

    return (
        <>
            <a href="https://wa.me/+919425326084" target="_blank" rel="noreferrer" className="emergency-btn">
                <i className="fa-brands fa-whatsapp"></i>
            </a>

            {isVisible && (
                <div className="contact-cloud" id="whatsappPopup">
                    <span className="close-wa js-close-wa" onClick={handleClose}>✕</span>
                    <i className="fa-brands fa-whatsapp"></i> Contact on WhatsApp
                </div>
            )}
        </>
    );
}
