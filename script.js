document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        console.log('Hamburger menu clicked'); // Debug log
        navLinks.classList.toggle('active'); // Toggle visibility of nav links
    });

    // Smooth Scrolling for "Lihat Menu" Button
    const btnCTA = document.querySelector('.btn-cta');
    if (btnCTA) {
        btnCTA.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000; // Duration of scrolling (1 second)
                let start = null;

                // Ease function for smooth scroll
                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                // Smooth scrolling animation
                function smoothScroll(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(smoothScroll);
                }

                requestAnimationFrame(smoothScroll); // Initiate smooth scroll
            }
        });
    }

    // Dark Mode Toggle
    const toggleButton = document.getElementById('darkModeToggle');
    const body = document.body;

    // Set dark mode if previously enabled
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        toggleButton.textContent = '☀️ Light Mode';
    }

    // Toggle dark mode on button click
    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        console.log(body.classList); // Debug log to check class list

        // Update localStorage and button text based on dark mode state
        if (body.classList.contains('dark-mode')) {
            toggleButton.textContent = '☀️ Light Mode';
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            toggleButton.textContent = '🌙 Dark Mode';
            localStorage.removeItem('dark-mode');
        }
    });
});