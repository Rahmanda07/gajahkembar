// Event Listener untuk Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        console.log('Hamburger menu clicked'); // Debug log
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling only for the "Lihat Menu" button
    const btnCTA = document.querySelector('.btn-cta');
    if (btnCTA) {
        btnCTA.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 100; // Adjust duration (in milliseconds) for smoother scrolling
                let start = null;

                function smoothScroll(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(smoothScroll);
                }

                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(smoothScroll);
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('backToTopBtn');

    // Menampilkan tombol Kembali ke Atas saat scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) { // Menampilkan tombol jika scroll lebih dari 200px
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Menambahkan aksi klik untuk tombol Kembali ke Atas
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    let index = 0;

    function showSlide(n) {
        if (n >= slides.length) index = 0;
        if (n < 0) index = slides.length - 1;
        sliderContainer.style.transform = `translateX(${-index * 100}%)`;
    }

    function nextSlide() {
        index++;
        showSlide(index);
    }

    function prevSlide() {
        index--;
        showSlide(index);
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Optional: Auto slide every 3 seconds
    setInterval(nextSlide, 3000);
});