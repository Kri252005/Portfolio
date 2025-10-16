$(document).ready(function() {
    
    // 1. Footer Year Update (Ensure <span id="current-year"> is in footer)
    $('#current-year').text(new Date().getFullYear());

    // 2. jQuery for Mobile Navigation Toggle (Hamburger Menu)
    const $header = $('header');
    const $mainNavUl = $('#main-nav ul');

    $('#menu-toggle').on('click', function() {
        
        // A. Toggle the 'nav-open' class on the header immediately. 
        // This is crucial for the CSS to change the menu's *state*.
        $header.toggleClass('nav-open');
        
        // B. Use jQuery slideToggle on the UL for the animated effect.
        // We target the <ul> inside the <nav id="main-nav">
        $mainNavUl.stop().slideToggle(300); 
    });

    // 3. Close menu when a navigation link is clicked (optional but good practice)
    $('#main-nav a').on('click', function() {
        // Only collapse if the menu is visible (i.e., 'nav-open' class is present)
        if ($header.hasClass('nav-open')) {
            $header.removeClass('nav-open');
            $mainNavUl.slideUp(300); // Collapse the menu list smoothly
        }
    });

    // 4. jQuery AJAX for Formspree Submission (No changes needed here, keeping it functional)
    var form = $('#contact-form');
    var formMessage = $('#form-message');

    $(form).submit(function(e) {
        e.preventDefault(); 
        var formData = $(form).serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        $(formMessage).text('').removeClass('success error');
        $.ajax({
            url: $(form).attr('action'),
            method: 'POST',
            data: JSON.stringify(formData), 
            dataType: 'json', 
            contentType: 'application/json',
        })
        .done(function() {
            $(formMessage).addClass('success').text('Thank you! Your message has been sent successfully.');
            form[0].reset();
        })
        .fail(function(data) {
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