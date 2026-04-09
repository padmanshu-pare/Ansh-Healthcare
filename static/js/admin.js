/* ================= ADMIN.JS — Admin Dashboard Logic ================= */
document.addEventListener('DOMContentLoaded', function () {

    const loginScreen = document.getElementById('loginScreen');
    const dashboardScreen = document.getElementById('dashboardScreen');
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('passwordInput');
    const logoutBtn = document.getElementById('logoutBtn');

    const statTotal = document.getElementById('statTotal');
    const statPartners = document.getElementById('statPartners');
    const statToday = document.getElementById('statToday');
    const sidebarCount = document.getElementById('sidebarCount');
    const inquiryTableBody = document.getElementById('inquiryTableBody');

    let isAuthenticated = false;

    // =============================================
    // 1. LOGIN
    // =============================================
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (passwordInput.value === 'admin123') {
            isAuthenticated = true;
            loginScreen.style.display = 'none';
            dashboardScreen.style.display = 'flex';
            loadDashboard();
        } else {
            alert('❌ Unauthorized access attempt logged.');
        }
    });

    // =============================================
    // 2. LOGOUT
    // =============================================
    logoutBtn.addEventListener('click', function () {
        isAuthenticated = false;
        dashboardScreen.style.display = 'none';
        loginScreen.style.display = 'flex';
        passwordInput.value = '';
    });

    // =============================================
    // 3. LOAD DASHBOARD DATA
    // =============================================
    function loadDashboard() {
        const inquiries = JSON.parse(localStorage.getItem('ansh_inquiries') || '[]');
        inquiries.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });

        // Compute stats
        const total = inquiries.length;
        const today = inquiries.filter(function (i) {
            return new Date(i.date).toDateString() === new Date().toDateString();
        }).length;

        const firmNames = {};
        inquiries.forEach(function (i) {
            firmNames[i.name] = true;
        });
        const uniqueFirms = Object.keys(firmNames).length;

        // Update stat cards
        statTotal.textContent = total;
        statPartners.textContent = uniqueFirms;
        statToday.textContent = today;
        sidebarCount.textContent = total;

        // Render table
        inquiryTableBody.innerHTML = '';

        if (inquiries.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML =
                '<td colspan="5" style="text-align: center; padding: 100px;">' +
                    '<i class="fa-solid fa-inbox" style="font-size: 40px; color: #eee; display: block; margin-bottom: 10px;"></i>' +
                    'Waiting for new leads...' +
                '</td>';
            inquiryTableBody.appendChild(tr);
            return;
        }

        inquiries.forEach(function (inq) {
            const tr = document.createElement('tr');
            tr.innerHTML =
                '<td>' +
                    '<div class="firm-name">' + escapeHtml(inq.name) + '</div>' +
                    '<div class="firm-meta">Verified Healthcare Partner</div>' +
                '</td>' +
                '<td>' +
                    '<div>' + escapeHtml(inq.email) + '</div>' +
                    '<div class="sub-val">' + escapeHtml(inq.mobile) + '</div>' +
                '</td>' +
                '<td><span class="badge-pill">Wholesale Supply</span></td>' +
                '<td>' + new Date(inq.date).toLocaleDateString() + '</td>' +
                '<td><span class="status-badge">New</span></td>';
            inquiryTableBody.appendChild(tr);
        });
    }

    // =============================================
    // UTILITY: Escape HTML to prevent XSS
    // =============================================
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(text));
        return div.innerHTML;
    }
});
