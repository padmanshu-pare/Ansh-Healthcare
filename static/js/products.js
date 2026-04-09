/* ================= PRODUCTS.JS — Catalog Page Logic ================= */
document.addEventListener('DOMContentLoaded', function () {

    const mainGrid = document.getElementById('mainGrid');
    const searchInput = document.getElementById('searchInput');
    const filterBar = document.getElementById('filterBar');
    let currentCategory = 'all';

    // =============================================
    // 1. RENDER PRODUCTS
    // =============================================
    function renderProducts() {
        let filtered = formulations;

        // Category filter
        if (currentCategory !== 'all') {
            filtered = filtered.filter(function (p) {
                return p.category === currentCategory;
            });
        }

        // Search filter
        const query = searchInput.value.toLowerCase().trim();
        if (query) {
            filtered = filtered.filter(function (p) {
                return p.name.toLowerCase().includes(query) || p.combo.toLowerCase().includes(query);
            });
        }

        // Clear grid
        mainGrid.innerHTML = '';

        // Populate grid
        filtered.forEach(function (product) {
            const card = document.createElement('div');
            card.className = 'product-card reveal';
            card.style.cursor = 'pointer';
            card.innerHTML =
                '<div class="product-img-box"><img src="' + product.img + '" alt="' + product.name + '" /></div>' +
                '<div class="product-info">' +
                    '<div class="status-row">' +
                        '<span class="category-tag">' + product.category + '</span>' +
                        '<div style="display:flex; align-items:center; gap:6px;">' +
                            '<span class="dot"></span>' +
                            '<span class="stock-text">Stock Available</span>' +
                        '</div>' +
                    '</div>' +
                    '<h3>' + product.name + '</h3>' +
                    '<p class="product-composition">' + product.combo + '</p>' +
                    '<button class="btn-quote">See Details</button>' +
                '</div>';

            card.addEventListener('click', function () {
                openProductModal(product);
            });

            mainGrid.appendChild(card);
        });

        // Run scroll reveal on new cards
        initScrollReveal();
    }

    // =============================================
    // 2. SCROLL REVEAL
    // =============================================
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal:not(.active)');
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        reveals.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    // =============================================
    // 3. SEARCH INPUT
    // =============================================
    searchInput.addEventListener('input', renderProducts);

    // =============================================
    // 4. FILTER BUTTONS
    // =============================================
    filterBar.addEventListener('click', function (e) {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        // Update active state
        filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        currentCategory = btn.getAttribute('data-category');
        renderProducts();
    });

    // =============================================
    // 5. PRODUCT MODAL
    // =============================================
    const productModal = document.getElementById('productModal');
    const productModalClose = document.getElementById('productModalClose');
    const productModalImg = document.getElementById('productModalImg');
    const productModalName = document.getElementById('productModalName');
    const productModalCategory = document.getElementById('productModalCategory');
    const productModalCombo = document.getElementById('productModalCombo');
    const productModalInquire = document.getElementById('productModalInquire');

    function openProductModal(product) {
        productModalImg.src = product.img;
        productModalImg.alt = product.name;
        productModalName.textContent = product.name;
        productModalCategory.textContent = product.category;
        productModalCombo.textContent = product.combo;
        productModal.style.display = 'flex';
    }

    function closeProductModal() {
        productModal.style.display = 'none';
        // Reset zoom
        productModalImg.style.transformOrigin = 'center';
        productModalImg.style.transform = 'scale(1)';
    }

    productModalClose.addEventListener('click', closeProductModal);
    productModal.addEventListener('click', function (e) {
        if (e.target.classList.contains('catalog-modal-overlay')) closeProductModal();
    });

    // Image zoom on hover
    productModalImg.addEventListener('mousemove', function (e) {
        const rect = e.target.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        productModalImg.style.transformOrigin = x + '% ' + y + '%';
        productModalImg.style.transform = 'scale(2.5)';
    });
    productModalImg.addEventListener('mouseleave', function () {
        productModalImg.style.transformOrigin = 'center';
        productModalImg.style.transform = 'scale(1)';
    });

    productModalInquire.addEventListener('click', function () {
        closeProductModal();
        openInquiryModal();
    });

    // =============================================
    // 6. INQUIRY MODAL
    // =============================================
    const inquiryModal = document.getElementById('inquiryModal');
    const closeInquiryBtn = document.getElementById('closeInquiry');
    const inquiryForm = document.getElementById('inquiryForm');
    const formStatus = document.getElementById('formStatus');
    const inquirySubmitBtn = document.getElementById('inquirySubmitBtn');

    function openInquiryModal() {
        inquiryModal.classList.add('active');
    }

    function closeInquiryModal() {
        inquiryModal.classList.remove('active');
        formStatus.textContent = '';
    }

    closeInquiryBtn.addEventListener('click', closeInquiryModal);
    inquiryModal.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal-overlay')) closeInquiryModal();
    });

    inquiryForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        inquirySubmitBtn.disabled = true;
        inquirySubmitBtn.textContent = 'Sending...';
        formStatus.textContent = '';

        const data = new FormData(inquiryForm);

        try {
            // Save to localStorage for admin tracker
            const existingInquiries = JSON.parse(localStorage.getItem('ansh_inquiries') || '[]');
            const newInquiry = {
                name: data.get('name'),
                email: data.get('email'),
                mobile: data.get('mobile'),
                message: data.get('message'),
                date: new Date().toISOString()
            };
            localStorage.setItem('ansh_inquiries', JSON.stringify([newInquiry, ...existingInquiries]));

            const response = await fetch('https://formspree.io/f/mvzwnaky', {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.style.color = 'green';
                formStatus.textContent = '✅ Inquiry sent successfully! Thank you for reaching out.';
                inquiryForm.reset();
                setTimeout(closeInquiryModal, 1500);
            } else {
                formStatus.style.color = 'red';
                formStatus.textContent = '❌ Something went wrong. Try again.';
            }
        } catch (error) {
            formStatus.style.color = 'orange';
            formStatus.textContent = '⚠️ Network error. Try again.';
        }

        inquirySubmitBtn.disabled = false;
        inquirySubmitBtn.innerHTML = 'Submit Inquiry <i class="fa-solid fa-paper-plane"></i>';
    });

    // =============================================
    // INITIAL RENDER
    // =============================================
    renderProducts();
});
