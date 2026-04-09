/* ================= MAIN.JS — Home Page Logic ================= */
document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    // 1. HEADER SCROLL EFFECT
    // =============================================
    const header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // =============================================
    // 2. SCROLL PROGRESS BAR
    // =============================================
    window.addEventListener('scroll', function () {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressEl = document.getElementById('scroll-progress');
        if (progressEl) progressEl.style.width = scrolled + '%';
    });

    // =============================================
    // 3. SCROLL REVEAL (IntersectionObserver)
    // =============================================
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('active');

                // Counter animation for stat boxes
                if (entry.target.classList.contains('stat-box')) {
                    const counter = entry.target.querySelector('.counter');
                    if (counter && !counter.classList.contains('counted')) {
                        animateCounter(counter);
                        counter.classList.add('counted');
                    }
                }
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        reveals.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    function animateCounter(el) {
        const target = +el.getAttribute('data-target');
        const inc = target / 100;
        let count = 0;
        function update() {
            count += inc;
            if (count < target) {
                el.innerText = Math.ceil(count) + '+';
                setTimeout(update, 20);
            } else {
                el.innerText = target >= 100000 ? (target / 1000) + 'K+' : target + '+';
            }
        }
        update();
    }

    initScrollReveal();

    // =============================================
    // 4. TESTIMONIAL SLIDER
    // =============================================
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function setSlide(index) {
        slides.forEach(function (s, i) {
            s.classList.toggle('active', i === index);
        });
        dots.forEach(function (d, i) {
            d.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    // Auto-rotate every 6 seconds
    setInterval(function () {
        setSlide((currentSlide + 1) % slides.length);
    }, 6000);

    // Dot clicks
    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            setSlide(parseInt(dot.getAttribute('data-slide')));
        });
    });

    // =============================================
    // 5. FORMULATIONS GRID (dynamic rendering)
    // =============================================
    const formulationGrid = document.getElementById('formulationGrid');
    if (formulationGrid && typeof formulations !== 'undefined') {
        formulations.forEach(function (product, idx) {
            const pill = document.createElement('div');
            pill.className = 'formulation-pill reveal';
            pill.innerHTML =
                '<img src="' + product.img + '" class="formulation-thumb" alt="' + product.name + '" />' +
                '<span class="formulation-name">' + product.name + '</span>';
            pill.addEventListener('click', function () {
                openProductModal(product);
            });
            formulationGrid.appendChild(pill);
        });

        // Re-run observer for dynamically added .reveal elements
        initScrollReveal();
    }

    // =============================================
    // 6. PRODUCT MODAL
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
    }

    productModalClose.addEventListener('click', closeProductModal);
    productModal.addEventListener('click', function (e) {
        if (e.target === productModal) closeProductModal();
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
    // 7. INQUIRY MODAL
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

    // All "open inquiry" buttons
    document.querySelectorAll('.js-open-inquiry').forEach(function (btn) {
        btn.addEventListener('click', openInquiryModal);
    });

    closeInquiryBtn.addEventListener('click', closeInquiryModal);

    inquiryModal.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal-overlay')) closeInquiryModal();
    });

    // Form submission
    inquiryForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        inquirySubmitBtn.disabled = true;
        inquirySubmitBtn.textContent = 'Sending...';
        formStatus.textContent = '';
        formStatus.style.color = 'orange';

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

            // Send to Formspree
            const response = await fetch('https://formspree.io/f/mvzwnaky', {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.style.color = 'green';
                formStatus.textContent = '✅ Inquiry sent successfully! Thank you for reaching out.';
                inquiryForm.reset();
                setTimeout(function () {
                    closeInquiryModal();
                }, 1500);
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
    // 8. WHATSAPP POPUP
    // =============================================
    const whatsappPopup = document.getElementById('whatsappPopup');
    const closeWhatsapp = document.getElementById('closeWhatsapp');

    closeWhatsapp.addEventListener('click', function () {
        whatsappPopup.style.display = 'none';
        // Reappear after 60 seconds
        setTimeout(function () {
            whatsappPopup.style.display = '';
        }, 60000);
    });

    // =============================================
    // 9. MAPS BUTTON
    // =============================================
    const mapsBtn = document.getElementById('open-maps-btn');
    if (mapsBtn) {
        mapsBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const lat = 22.694617859978273;
            const lng = 75.93034774441652;
            window.location.href = 'geo:' + lat + ',' + lng + '?q=' + lat + ',' + lng;
            setTimeout(function () {
                window.open('https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng, '_blank');
            }, 1000);
        });
    }
});
