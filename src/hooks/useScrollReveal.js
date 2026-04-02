import { useEffect } from 'react';

export function useScrollReveal(dependencies = []) {
    useEffect(() => {
        const reveals = document.querySelectorAll('.reveal');
        const revealOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('active');
                if (entry.target.classList.contains('stat-box')) {
                    const counter = entry.target.querySelector('.counter');
                    if (counter && !counter.classList.contains('counted')) {
                        updateCount(counter);
                        counter.classList.add('counted');
                    }
                }
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

        reveals.forEach(reveal => revealOnScroll.observe(reveal));
        return () => reveals.forEach(reveal => revealOnScroll.unobserve(reveal));
    }, dependencies);

    function updateCount(el) {
        const target = +el.getAttribute('data-target');
        const inc = target / 100;
        let count = 0;
        const update = () => {
            count += inc;
            if (count < target) {
                el.innerText = Math.ceil(count) + '+';
                setTimeout(update, 20);
            } else {
                el.innerText = target >= 100000 ? (target / 1000) + 'K+' : target + '+';
            }
        };
        update();
    }
}
