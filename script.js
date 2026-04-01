window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

const reveals = document.querySelectorAll('.reveal');
const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        if (entry.target.classList.contains('stat-box')) {
            const counter = entry.target.querySelector('.counter');
            if (counter && !counter.classList.contains('counted')) { updateCount(counter); counter.classList.add('counted'); }
        }
        observer.unobserve(entry.target);
    });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
reveals.forEach(reveal => revealOnScroll.observe(reveal));

function updateCount(el) {
    const target = +el.getAttribute('data-target');
    const inc = target / 100;
    let count = 0;
    const update = () => {
        count += inc;
        if (count < target) { el.innerText = Math.ceil(count) + '+'; setTimeout(update, 20); }
        else { el.innerText = target >= 100000 ? (target / 1000) + 'K+' : target + '+'; }
    };
    update();
}

// ✨ DYNAMIC FORMULATIONS DATA
const formulations = [
    { name: 'Repride DSR', combo: 'Rabeprazole Sodium 20mg + Domperidone 30mg SR', img: '/Product Images RAW/repride dsr.jpeg' },
    { name: 'Ruby DSR', combo: 'Pantoprazole 40mg + Domperidone 30mg SR', img: '/Product Images RAW/ruby dsr.jpeg' },
    { name: 'Tepride 40', combo: 'Telmisartan 40mg Tablets', img: '/Product Images RAW/tepride 40.jpeg' },
    { name: 'Tepride CT', combo: 'Telmisartan 40mg + Cilnidipine 10mg', img: '/Product Images RAW/tepride ct.jpeg' },
    { name: 'Tepride CT 6.25', combo: 'Carvedilol 6.25mg Tablets', img: '/Product Images RAW/tepride ct 6.25.jpeg' },
    { name: 'Tepride AM', combo: 'Telmisartan 40mg + Amlodipine 5mg', img: '/Product Images RAW/tepride am.jpeg' },
    { name: 'Tepride AMH', combo: 'Telmisartan 40mg + Amlodipine 5mg + HCTZ 12.5mg', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop' },
    { name: 'Uristill 0.4', combo: 'Tamsulosin Hydrochloride 0.4mg PR', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop' },
    { name: 'Getin 16', combo: 'Betahistine Hydrochloride 16mg', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop' },
    { name: 'Alphaneuron D', combo: 'Methylcobalamin 1500mcg + ALA + Vitamins', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop' },
    { name: 'Oxypride Plus', combo: 'Antioxidants with Multivitamins & Minerals', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop' },
    { name: 'Omega Pride', combo: 'Omega 3 Fatty Acids Softgel Capsules', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop' },
    { name: 'Shanpride 200', combo: 'Itraconazole 200mg Capsules', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop' },
    { name: 'Giopride 1', combo: 'Glimepiride 1mg Tablets', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop' },
    { name: 'Giopride 2', combo: 'Glimepiride 2mg Tablets', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop' },
    { name: 'Giopride P1', combo: 'Glimepiride 1mg + Pioglitazone 15mg', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop' },
    { name: 'Giopride P2', combo: 'Glimepiride 2mg + Pioglitazone 15mg', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop' },
    { name: 'Sudhaxit M', combo: 'Sitagliptin 50mg + Metformin 500mg', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop' }
];

// ✨ PRODUCT MODAL LOGIC & DYNAMIC INJECTION
const prodModal = document.getElementById('productModal');
const formulationGrid = document.getElementById('formulationGrid');

if (formulationGrid) {
    formulations.forEach((product, idx) => {
        const pill = document.createElement('div');
        pill.className = 'formulation-pill reveal';
        pill.innerHTML = `
            <img src="${product.img}" class="formulation-thumb" alt="${product.name}">
            <span class="formulation-name">${product.name}</span>
        `;

        pill.addEventListener('click', () => {
            document.getElementById('prodModalName').innerText = product.name;
            document.getElementById('prodModalCombo').innerText = product.combo;
            document.getElementById('prodModalImg').src = product.img;
            prodModal.classList.add('active');
        });

        formulationGrid.appendChild(pill);
        if (typeof revealOnScroll !== 'undefined') {
            revealOnScroll.observe(pill);
        }
    });
}

const closeProdBtn = document.querySelector('.js-close-product');
if (closeProdBtn) {
    closeProdBtn.addEventListener('click', () => prodModal.classList.remove('active'));
}

prodModal.addEventListener('click', (e) => {
    if (e.target === prodModal) prodModal.classList.remove('active');
});

// ✨ SLIDER LOGIC
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function setSlide(index) {
    if (!slides.length || !dots.length) return;
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => setSlide(index));
});

if (slides.length > 0) {
    setInterval(() => { setSlide((currentSlide + 1) % slides.length); }, 6000);
}

// ✨ INQUIRY MODAL LOGIC
const inqModal = document.getElementById('inquiryModal');
const openInqBtns = document.querySelectorAll('.js-open-inquiry');
const closeInqBtn = document.querySelector('.js-close-inquiry');

openInqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        inqModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scroll
    });
});

if (closeInqBtn) {
    closeInqBtn.addEventListener('click', () => {
        inqModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore background scroll
    });
}

// Close if user clicks outside the white box
if (inqModal) {
    inqModal.addEventListener('click', (e) => {
        if (e.target === inqModal) {
            inqModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ✨ FORM SUBMIT LOGIC
const inquiryForm = document.getElementById("inquiryForm");
if (inquiryForm) {
    inquiryForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const form = this;
        const status = document.getElementById("formStatus");
        const button = form.querySelector("button");

        button.innerHTML = "Sending...";
        button.disabled = true;
        status.innerHTML = "";

        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/mvzwnaky", {
                method: "POST",
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.innerHTML = "✅ Inquiry sent successfully! Thank you for reaching out.";
                status.style.color = "green";
                form.reset();
                setTimeout(() => {
                    inqModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }, 1500);
            } else {
                status.innerHTML = "❌ Something went wrong. Try again.";
                status.style.color = "red";
            }
        } catch (error) {
            status.innerHTML = "⚠️ Network error. Try again.";
            status.style.color = "orange";
        }

        button.innerHTML = 'Submit Inquiry <i class="fa-solid fa-paper-plane"></i>';
        button.disabled = false;
    });
}

// ✨ WHATSAPP LOGIC
const waPopup = document.getElementById("whatsappPopup");
const closeWaBtn = document.querySelector(".js-close-wa");

if (closeWaBtn && waPopup) {
    closeWaBtn.addEventListener('click', () => {
        waPopup.style.display = "none";
        setTimeout(() => {
            waPopup.style.display = "block";
        }, 60000);
    });
}

// ✨ MAPS LINK LOGIC
const openMapsBtns = document.querySelectorAll(".js-open-maps");
openMapsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lat = 22.694617859978273;
        const lng = 75.93034774441652;
        window.location.href = `geo:${lat},${lng}?q=${lat},${lng}`;
        setTimeout(() => {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
        }, 1000);
    });
});

function toggleChat() {
    const box = document.getElementById("chatbox");
    if (box) {
        box.style.display = box.style.display === "flex" ? "none" : "flex";
    }
}

// Close Inquiry Modal when "Esc" key is pressed
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && inqModal && inqModal.classList.contains('active')) {
        inqModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

window.addEventListener('scroll', function () {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    const progressEl = document.getElementById("scroll-progress");
    if (progressEl) {
        progressEl.style.width = scrolled + "%";
    }
});
    
