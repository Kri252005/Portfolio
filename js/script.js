document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Menu Toggle ---
    const nav = document.getElementById('main-nav');
    const toggleButton = document.querySelector('.menu-toggle');

    if (toggleButton && nav) {
        toggleButton.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        // Optional: Close menu when clicking outside (on desktop sizes)
        document.addEventListener('click', (event) => {
            if (!nav.contains(event.target) && !toggleButton.contains(event.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    }

    // --- 2. Dynamic Copyright Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 3. Contact Form Submission (Frontend Logic) ---
    // NOTE: This only handles the *front-end* submission and will FAIL
    // without a *backend* script (e.g., Node/Express) to actually send the email.
    // This part should only be on the contact.html page's linked JS,
    // or you add conditional checks if it's a global script.
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) { // Ensure elements exist on the current page
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            formMessage.textContent = 'Sending...';
            formMessage.style.color = 'gray';

            // IMPORTANT: Replace 'YOUR_BACKEND_ENDPOINT' with your actual server URL
            // This URL will be a backend service that takes the form data and sends an email.
            const endpoint = 'YOUR_BACKEND_ENDPOINT';

            try {
                // --- Uncomment the following block when you have a backend endpoint ---
                /*
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: contactForm.name.value,
                        email: contactForm.email.value,
                        message: contactForm.message.value,
                    }),
                });

                if (response.ok) {
                    formMessage.textContent = 'Message sent successfully! I will reply soon.';
                    formMessage.style.color = 'var(--accent-color)'; // Use theme color
                    contactForm.reset();
                } else {
                    formMessage.textContent = 'Error sending message. Please try again later or email me directly.';
                    formMessage.style.color = 'red';
                }
                */

                // TEMPORARY: Simulate success without a backend (remove this when backend is ready)
                setTimeout(() => {
                    formMessage.textContent = 'Message simulated as sent! (Requires backend for real email)';
                    formMessage.style.color = 'orange';
                    contactForm.reset();
                }, 2000);

            } catch (error) {
                console.error('Submission error:', error);
                formMessage.textContent = 'Network error or backend issue. Check console.';
                formMessage.style.color = 'red';
            }
        });
    }
    
    // Optional: Add active class to current nav link
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('#main-nav a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

});