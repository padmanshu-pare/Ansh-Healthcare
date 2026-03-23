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

// ✨ PRODUCT MODAL LOGIC
const prodModal = document.getElementById('productModal');
function openProductModal(name, combo, imgSrc) {
    document.getElementById('prodModalName').innerText = name;
    document.getElementById('prodModalCombo').innerText = combo;
    document.getElementById('prodModalImg').src = imgSrc;
    prodModal.classList.add('active');
}
function closeProductModal() {
    prodModal.classList.remove('active');
}
prodModal.addEventListener('click', (e) => {
    if (e.target === prodModal) closeProductModal();
});


let currentSlide = 0; const slides = document.querySelectorAll('.slide'); const dots = document.querySelectorAll('.dot');
function setSlide(index) {
    slides[currentSlide].classList.remove('active'); dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active'); dots[currentSlide].classList.add('active');
}
setInterval(() => { setSlide((currentSlide + 1) % slides.length); }, 6000);
const inqModal = document.getElementById('inquiryModal');

function openInquiryModal() {
    inqModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scroll
}

function closeInquiryModal() {
    inqModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore background scroll
}

// Close if user clicks outside the white box
inqModal.addEventListener('click', (e) => {
    if (e.target === inqModal) closeInquiryModal();
});

// // Handle form submission
// function handleInquirySubmit(event) {
//     event.preventDefault();
//     alert('Inquiry Sent Successfully! Our team at Ansh Healthcare will contact you shortly.');
//     closeInquiryModal();
// }

document.getElementById("inquiryForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = this;
    const status = document.getElementById("formStatus");
    const button = form.querySelector("button");

    // 🔄 Loading state
    button.innerHTML = "Sending...";
    button.disabled = true;
    status.innerHTML = "";

    const data = new FormData(form);

    try {
        const response = await fetch("https://formspree.io/f/mvzwnaky", {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            status.innerHTML = "✅ Inquiry sent successfully! Thank you for reaching out.";
            status.style.color = "green";

            form.reset();

            // Close modal after 1.5 sec
            setTimeout(() => {
                closeInquiryModal();
            }, 1500);

        } else {
            status.innerHTML = "❌ Something went wrong. Try again.";
            status.style.color = "red";
        }

    } catch (error) {
        status.innerHTML = "⚠️ Network error. Try again.";
        status.style.color = "orange";
    }

    // 🔁 Reset button
    button.innerHTML = 'Submit Inquiry <i class="fa-solid fa-paper-plane"></i>';
    button.disabled = false;
});
const waPopup = document.getElementById("whatsappPopup");

function closeWhatsApp() {
    waPopup.style.display = "none";

    // ⏳ Reopen after 1 minute (60000 ms)
    setTimeout(() => {
        waPopup.style.display = "block";
    }, 60000);
}
//////////// MAPS LINK LOGIC
function openMaps(e) {
    e.preventDefault();

    const lat = 22.694617859978273;
    const lng = 75.93034774441652;

    // Try opening app
    window.location.href = `geo:${lat},${lng}?q=${lat},${lng}`;

    // Fallback after 1 sec
    setTimeout(() => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    }, 1000);
}
