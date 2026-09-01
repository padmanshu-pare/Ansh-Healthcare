import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Products from './pages/Products';
import Header from './components/Header';
import Footer from './components/Footer';
import InquiryModal from './components/InquiryModal';
import WhatsAppPopup from './components/WhatsAppPopup';
import { AboutPage, FranchisePage, DistributorPage, ContactPage } from './pages/BusinessPages';
import { PrivacyPage, TermsPage, DisclaimerPage, MedicalDisclaimerPage, CookiePage, AccessibilityPage, SecurityPage } from './pages/LegalPages';
import NotFound from './pages/NotFound';
import './index.css';

function ScrollManager() {
    const { pathname } = useLocation();
    useEffect(() => {
        if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname]);
    return null;
}

function MainLayout({ openInquiry, children }) {
    const location = useLocation();
    const isCatalog = location.pathname === '/products';
    if (isCatalog) return <>{children}</>;
    return (
        <>
            <Header openInquiry={openInquiry} />
            {children}
            <Footer />
        </>
    );
}

function App() {
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);
    const handleOpenInquiry = () => setIsInquiryOpen(true);
    const handleCloseInquiry = () => setIsInquiryOpen(false);

    return (
        <Router>
            <ScrollManager />
            <MainLayout openInquiry={handleOpenInquiry}>
                <Routes>
                    <Route path="/" element={<Home openInquiry={handleOpenInquiry} />} />
                    <Route path="/products" element={<Products openInquiry={handleOpenInquiry} />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/franchise" element={<FranchisePage openInquiry={handleOpenInquiry} />} />
                    <Route path="/distributor" element={<DistributorPage openInquiry={handleOpenInquiry} />} />
                    <Route path="/contact" element={<ContactPage openInquiry={handleOpenInquiry} />} />
                    <Route path="/privacy-policy" element={<PrivacyPage />} />
                    <Route path="/terms-and-conditions" element={<TermsPage />} />
                    <Route path="/disclaimer" element={<DisclaimerPage />} />
                    <Route path="/medical-disclaimer" element={<MedicalDisclaimerPage />} />
                    <Route path="/cookie-policy" element={<CookiePage />} />
                    <Route path="/accessibility" element={<AccessibilityPage />} />
                    <Route path="/security" element={<SecurityPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </MainLayout>
            <WhatsAppPopup />
            <InquiryModal isOpen={isInquiryOpen} onClose={handleCloseInquiry} />
        </Router>
    );
}

export default App;
