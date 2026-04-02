import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Admin from './pages/Admin';
import Header from './components/Header';
import Footer from './components/Footer';
import InquiryModal from './components/InquiryModal';
import WhatsAppPopup from './components/WhatsAppPopup';
import { useState } from 'react';
import './index.css';

function MainLayout({ openInquiry, children }) {
    const location = useLocation();
    const isSpecialPage = ['/products', '/admin'].includes(location.pathname);
    
    if (isSpecialPage) return <>{children}</>;

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
            <MainLayout openInquiry={handleOpenInquiry}>
                <Routes>
                    <Route path="/" element={<Home openInquiry={handleOpenInquiry} />} />
                    <Route path="/products" element={<Products openInquiry={handleOpenInquiry} />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </MainLayout>
            <WhatsAppPopup />
            <InquiryModal isOpen={isInquiryOpen} onClose={handleCloseInquiry} />
        </Router>
    );
}

export default App;
