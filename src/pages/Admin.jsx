import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { formulations } from '../data/products';

export default function Admin() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [inquiries, setInquiries] = useState([]);
    
    // Load inquiries from localStorage (Mock Database)
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('ansh_inquiries') || '[]');
        setInquiries(saved.sort((a,b) => new Date(b.date) - new Date(a.date)));
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple security for demo - in production this would use Supabase/Firebase
        if (password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('❌ Unauthorized access attempt logged.');
        }
    };

    const stats = useMemo(() => {
        const total = inquiries.length;
        const today = inquiries.filter(i => new Date(i.date).toDateString() === new Date().toDateString()).length;
        const uniqueFirms = [...new Set(inquiries.map(i => i.name))].length;
        return { total, today, uniqueFirms };
    }, [inquiries]);

    if (!isAuthenticated) {
        return (
            <div className="admin-login-screen">
                <div className="login-card reveal active">
                    <div className="logo" style={{ marginBottom: '20px' }}>ANSH HEALTHCARE<span>.</span></div>
                    <h3>Owner Authorization</h3>
                    <p>Enter administrative credentials to access the ecosystem tracker.</p>
                    <form onSubmit={handleLogin}>
                        <input 
                            type="password" 
                            placeholder="Authorization Code" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                            Unlock Dashboard <i className="fa-solid fa-shield-halved"></i>
                        </button>
                    </form>
                    <button onClick={() => navigate('/')} className="back-to-site">Return to Public Portal</button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <aside className="admin-sidebar">
                <div className="sidebar-brand">ANSH<span>.</span>ADMIN</div>
                <nav>
                    <div className="nav-item active"><i className="fa-solid fa-chart-line"></i> Analytics Overview</div>
                    <div className="nav-item"><i className="fa-solid fa-inbox"></i> Inquiries ({inquiries.length})</div>
                    <div className="nav-item"><i className="fa-solid fa-capsules"></i> Product Inventory</div>
                    <div className="nav-item"><i className="fa-solid fa-gear"></i> System Settings</div>
                </nav>
                <div className="sidebar-footer" onClick={() => setIsAuthenticated(false)}>
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <h2>Analytics Dashboard</h2>
                    <div className="admin-profile">
                        <span>Ansh Healthcare Admin</span>
                        <div className="avatar">A</div>
                    </div>
                </header>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-label">Total Inquiries</div>
                        <div className="stat-value">{stats.total}</div>
                        <div className="stat-trend green"><i className="fa-solid fa-arrow-up"></i> +12% from last week</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">Active Partners</div>
                        <div className="stat-value">{stats.uniqueFirms}</div>
                        <div className="stat-trend"><i className="fa-solid fa-handshake"></i> Verified Firms</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">Inquiries Today</div>
                        <div className="stat-value">{stats.today}</div>
                        <div className="stat-trend orange"><i className="fa-solid fa-bolt"></i> Urgent Attention Red</div>
                    </div>
                </div>

                <section className="inquiry-section">
                    <h3>Recent Wholesale Leads</h3>
                    <div className="table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Firm / Name</th>
                                    <th>Contact Information</th>
                                    <th>Therapy Interest</th>
                                    <th>Date Received</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inquiries.map((inq, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <div className="firm-name">{inq.name}</div>
                                            <div className="firm-meta">Verified Healthcare Partner</div>
                                        </td>
                                        <td>
                                            <div>{inq.email}</div>
                                            <div className="sub-val">{inq.mobile}</div>
                                        </td>
                                        <td>
                                            <span className="badge-pill">Wholesale Supply</span>
                                        </td>
                                        <td>{new Date(inq.date).toLocaleDateString()}</td>
                                        <td><span className="status-badge">New</span></td>
                                    </tr>
                                ))}
                                {inquiries.length === 0 && (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '100px' }}>
                                            <i className="fa-solid fa-inbox" style={{ fontSize: '40px', color: '#eee', display: 'block', marginBottom: '10px' }}></i>
                                            Waiting for new leads...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}
