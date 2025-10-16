$(document).ready(function() {
    
    // 1. Footer Year Update
    // Sets the current year dynamically in the footer (Requires an element with id="current-year" in the footer).
    $('#current-year').text(new Date().getFullYear());

    // 2. Pure JavaScript for Mobile Navigation Toggle (Hamburger Menu)
    // IMPORTANT: This replaces the jQuery slideToggle to work with the CSS media query logic.
    const menuToggle = document.getElementById('menu-toggle');
    const header = document.querySelector('header');
    
    if (menuToggle && header) {
        menuToggle.addEventListener('click', () => {
            // Toggles the 'nav-open' class on the <header> element.
            // The CSS media query controls the display of the menu based on this class.
            header.classList.toggle('nav-open');
        });

        // Close menu when a navigation link is clicked (good for single-page sites/multi-page consistency)
        const navLinks = document.querySelectorAll('#main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Ensure the menu closes after navigating
                if (header.classList.contains('nav-open')) {
                    header.classList.remove('nav-open');
                }
            });
        });
    }

    // 3. jQuery AJAX for Formspree Submission (Contact Page)
    var form = $('#contact-form');
    var formMessage = $('#form-message');

    $(form).submit(function(e) {
        // Prevent the default browser form submission
        e.preventDefault(); 
        
        // Convert serialized form data into a JSON object
        var formData = $(form).serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        // Clear any previous messages
        $(formMessage).text('').removeClass('success error');

        $.ajax({
            url: $(form).attr('action'),
            method: 'POST',
            data: JSON.stringify(formData), // Send data as JSON string
            dataType: 'json', 
            contentType: 'application/json', // Crucial for Formspree AJAX
        })
        .done(function(response) {
            // Success: Formspree returns a 200/204 response
            $(formMessage).addClass('success').text('Thank you! Your message has been sent successfully.');
            form[0].reset(); // Clear the form fields
        })
        .fail(function(data) {
            // Failure
            $(formMessage).addClass('error');
            
            if (data.status === 422) {
                $(formMessage).text('Please check your form input. There was a data validation error.');
            } else {
                $(formMessage).text('Oops! An error occurred and your message could not be sent.');
            }
            console.error('AJAX Submission Failed:', data);
        });
    });
});